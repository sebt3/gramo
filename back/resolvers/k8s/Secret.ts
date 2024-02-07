import k8s from '@kubernetes/client-node';
import rfc6902  from 'rfc6902';
import {kc, cache, applyFilter, applyFieldSelection, getByPath, getMetaNS } from '../k8slibs.js';
import { lists as listBasicAuth } from '../secretgenerator/BasicAuth.js';
import { lists as listSSHKeyPair } from '../secretgenerator/SSHKeyPair.js';
import { lists as listStringSecret } from '../secretgenerator/StringSecret.js';
import { lists as listCluster } from '../cnpg/Cluster.js';
import { lists as listMongoDBCommunity } from '../mongodb/MongoDBCommunity.js';
import { lists as listPod } from '../k8s/Pod.js';
import { lists as listReplicaSet } from '../k8s/ReplicaSet.js';
import { lists as listJob } from '../k8s/Job.js';
import { lists as listCronJob } from '../k8s/CronJob.js';
import { lists as listDeployment } from '../k8s/Deployment.js';
import { lists as listDaemonSet } from '../k8s/DaemonSet.js';
import { lists as listPodTemplate } from '../k8s/PodTemplate.js';

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

export const mutations = {
    k8sSecretCreate: async (_parent, args: object) => {
        const payload = {
            apiVersion: '/v1',
            kind: 'io.k8s.api.core.v1.Secret',
            metadata: getMetaNS(args),
            "data": args['data'],
            "immutable": args['immutable'],
            "stringData": args['stringData'],
            "type": args['type'],
        }
        try {
            const res = await k8sApi.createNamespacedSecret(args['namespace'], payload)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    k8sSecretDelete: async (_parent, args: object) => {
    try {
        const res = await k8sApi.deleteNamespacedSecret(args['namespace'], args['name'])
        return res.body
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
  },
    k8sSecretPatch: async (_parent, args: object) => {
        const request = {
            apiVersion: '/v1',
            kind: 'io.k8s.api.core.v1.Secret',
            metadata: getMetaNS(args),
        }
        if (args['data'] != undefined && args['data'] != null)
            request["data"] =  args['data'];
        if (args['immutable'] != undefined && args['immutable'] != null)
            request["immutable"] =  args['immutable'];
        if (args['stringData'] != undefined && args['stringData'] != null)
            request["stringData"] =  args['stringData'];
        if (args['type'] != undefined && args['type'] != null)
            request["type"] =  args['type'];
        try {
            const resGet = await k8sApi.readNamespacedSecret(args['namespace'], args['name'])
            const payload = rfc6902.createPatch(resGet.body,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await k8sApi.patchNamespacedSecret(args['namespace'], args['name'], payload, undefined, undefined, undefined, undefined, undefined, options)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
export const lists = {
    k8sSecret: async (_parent, args: object) => {
        let lst:Array<object>|undefined = cache.get(`Secret.${args['namespace']}`)
        if (lst==undefined) {
            try {
                const res = await k8sApi.listNamespacedSecret(args['namespace'])
                lst = (res as object)['body']['items'] as Array<object>
                cache.set(`Secret.${args['namespace']}`, lst, 2);
            } catch (err) {
                console.error((err as object)['body']);
                return []
            }
        }
        return lst.filter(o=>applyFilter(o,args)).map(o=>applyFieldSelection(o,args))
    }
};
export const resolvers = {
    k8sSecret: {
        parentBasicAuth: async (child, args: object) => {
            if (child.metadata['ownerReferences']==null || child.metadata['ownerReferences']==undefined || child.metadata['ownerReferences'].filter(r=>r.kind=='BasicAuth').length<1) return null;
            const lst = await listBasicAuth.secretgeneratorBasicAuth(child,{namespace: child['metadata']['namespace'], ...args})
            return lst.filter(o=>child.metadata['ownerReferences'].filter(r=>r.kind=='BasicAuth'&&r.name==o['metadata']['name']).length>0)
        },
        parentSSHKeyPair: async (child, args: object) => {
            if (child.metadata['ownerReferences']==null || child.metadata['ownerReferences']==undefined || child.metadata['ownerReferences'].filter(r=>r.kind=='SSHKeyPair').length<1) return null;
            const lst = await listSSHKeyPair.secretgeneratorSSHKeyPair(child,{namespace: child['metadata']['namespace'], ...args})
            return lst.filter(o=>child.metadata['ownerReferences'].filter(r=>r.kind=='SSHKeyPair'&&r.name==o['metadata']['name']).length>0)
        },
        parentStringSecret: async (child, args: object) => {
            if (child.metadata['ownerReferences']==null || child.metadata['ownerReferences']==undefined || child.metadata['ownerReferences'].filter(r=>r.kind=='StringSecret').length<1) return null;
            const lst = await listStringSecret.secretgeneratorStringSecret(child,{namespace: child['metadata']['namespace'], ...args})
            return lst.filter(o=>child.metadata['ownerReferences'].filter(r=>r.kind=='StringSecret'&&r.name==o['metadata']['name']).length>0)
        },
        parentCluster: async (child, args: object) => {
            if (child.metadata['ownerReferences']==null || child.metadata['ownerReferences']==undefined || child.metadata['ownerReferences'].filter(r=>r.kind=='Cluster').length<1) return null;
            const lst = await listCluster.cnpgCluster(child,{namespace: child['metadata']['namespace'], ...args})
            return lst.filter(o=>child.metadata['ownerReferences'].filter(r=>r.kind=='Cluster'&&r.name==o['metadata']['name']).length>0)
        },
        parentMongoDBCommunity: async (child, args: object) => {
            if (child.metadata['ownerReferences']==null || child.metadata['ownerReferences']==undefined || child.metadata['ownerReferences'].filter(r=>r.kind=='MongoDBCommunity').length<1) return null;
            const lst = await listMongoDBCommunity.mongodbMongoDBCommunity(child,{namespace: child['metadata']['namespace'], ...args})
            return lst.filter(o=>child.metadata['ownerReferences'].filter(r=>r.kind=='MongoDBCommunity'&&r.name==o['metadata']['name']).length>0)
        },
        usedByPod: async (parent, args: object) => {
            const lst = await listPod.k8sPod(parent,{namespace: parent['metadata']['namespace'], ...args})
            return lst.filter(w=>{
                const spec = getByPath(w, 'spec');
                return spec['containers'].filter(c=>Array.isArray(c['env'])&&c['env'].filter(e=>e['valueFrom']!=undefined&&e['valueFrom']['secretKeyRef']!=undefined && e['valueFrom']['secretKeyRef']==parent['metadata']['name']).length>0).length>0 ||
                        spec['containers'].filter(c=>Array.isArray(c['envFrom'])&&c['envFrom'].filter(e=>e['secretRef']!=undefined && e['secretRef']['name']==parent['metadata']['name']).length>0).length>0 ||
                        (Array.isArray(spec['volumes']) &&
                            spec['volumes'].filter(v=>
                                v['secret']!=undefined &&
                                v['secret']['secretName']==parent['metadata']['name']
                            ).length>0)
            })
        },
        usedByReplicaSet: async (parent, args: object) => {
            const lst = await listReplicaSet.k8sReplicaSet(parent,{namespace: parent['metadata']['namespace'], ...args})
            return lst.filter(w=>{
                const spec = getByPath(w, 'spec/template/spec');
                return spec['containers'].filter(c=>Array.isArray(c['env'])&&c['env'].filter(e=>e['valueFrom']!=undefined&&e['valueFrom']['secretKeyRef']!=undefined && e['valueFrom']['secretKeyRef']==parent['metadata']['name']).length>0).length>0 ||
                        spec['containers'].filter(c=>Array.isArray(c['envFrom'])&&c['envFrom'].filter(e=>e['secretRef']!=undefined && e['secretRef']['name']==parent['metadata']['name']).length>0).length>0 ||
                        (Array.isArray(spec['volumes']) &&
                            spec['volumes'].filter(v=>
                                v['secret']!=undefined &&
                                v['secret']['secretName']==parent['metadata']['name']
                            ).length>0)
            })
        },
        usedByJob: async (parent, args: object) => {
            const lst = await listJob.k8sJob(parent,{namespace: parent['metadata']['namespace'], ...args})
            return lst.filter(w=>{
                const spec = getByPath(w, 'spec/template/spec');
                return spec['containers'].filter(c=>Array.isArray(c['env'])&&c['env'].filter(e=>e['valueFrom']!=undefined&&e['valueFrom']['secretKeyRef']!=undefined && e['valueFrom']['secretKeyRef']==parent['metadata']['name']).length>0).length>0 ||
                        spec['containers'].filter(c=>Array.isArray(c['envFrom'])&&c['envFrom'].filter(e=>e['secretRef']!=undefined && e['secretRef']['name']==parent['metadata']['name']).length>0).length>0 ||
                        (Array.isArray(spec['volumes']) &&
                            spec['volumes'].filter(v=>
                                v['secret']!=undefined &&
                                v['secret']['secretName']==parent['metadata']['name']
                            ).length>0)
            })
        },
        usedByCronJob: async (parent, args: object) => {
            const lst = await listCronJob.k8sCronJob(parent,{namespace: parent['metadata']['namespace'], ...args})
            return lst.filter(w=>{
                const spec = getByPath(w, 'spec/jobTemplate/spec/template/spec');
                return spec['containers'].filter(c=>Array.isArray(c['env'])&&c['env'].filter(e=>e['valueFrom']!=undefined&&e['valueFrom']['secretKeyRef']!=undefined && e['valueFrom']['secretKeyRef']==parent['metadata']['name']).length>0).length>0 ||
                        spec['containers'].filter(c=>Array.isArray(c['envFrom'])&&c['envFrom'].filter(e=>e['secretRef']!=undefined && e['secretRef']['name']==parent['metadata']['name']).length>0).length>0 ||
                        (Array.isArray(spec['volumes']) &&
                            spec['volumes'].filter(v=>
                                v['secret']!=undefined &&
                                v['secret']['secretName']==parent['metadata']['name']
                            ).length>0)
            })
        },
        usedByDeployment: async (parent, args: object) => {
            const lst = await listDeployment.k8sDeployment(parent,{namespace: parent['metadata']['namespace'], ...args})
            return lst.filter(w=>{
                const spec = getByPath(w, 'spec/template/spec');
                return spec['containers'].filter(c=>Array.isArray(c['env'])&&c['env'].filter(e=>e['valueFrom']!=undefined&&e['valueFrom']['secretKeyRef']!=undefined && e['valueFrom']['secretKeyRef']==parent['metadata']['name']).length>0).length>0 ||
                        spec['containers'].filter(c=>Array.isArray(c['envFrom'])&&c['envFrom'].filter(e=>e['secretRef']!=undefined && e['secretRef']['name']==parent['metadata']['name']).length>0).length>0 ||
                        (Array.isArray(spec['volumes']) &&
                            spec['volumes'].filter(v=>
                                v['secret']!=undefined &&
                                v['secret']['secretName']==parent['metadata']['name']
                            ).length>0)
            })
        },
        usedByDaemonSet: async (parent, args: object) => {
            const lst = await listDaemonSet.k8sDaemonSet(parent,{namespace: parent['metadata']['namespace'], ...args})
            return lst.filter(w=>{
                const spec = getByPath(w, 'spec/template/spec');
                return spec['containers'].filter(c=>Array.isArray(c['env'])&&c['env'].filter(e=>e['valueFrom']!=undefined&&e['valueFrom']['secretKeyRef']!=undefined && e['valueFrom']['secretKeyRef']==parent['metadata']['name']).length>0).length>0 ||
                        spec['containers'].filter(c=>Array.isArray(c['envFrom'])&&c['envFrom'].filter(e=>e['secretRef']!=undefined && e['secretRef']['name']==parent['metadata']['name']).length>0).length>0 ||
                        (Array.isArray(spec['volumes']) &&
                            spec['volumes'].filter(v=>
                                v['secret']!=undefined &&
                                v['secret']['secretName']==parent['metadata']['name']
                            ).length>0)
            })
        },
        usedByPodTemplate: async (parent, args: object) => {
            const lst = await listPodTemplate.k8sPodTemplate(parent,{namespace: parent['metadata']['namespace'], ...args})
            return lst.filter(w=>{
                const spec = getByPath(w, 'template/spec');
                return spec['containers'].filter(c=>Array.isArray(c['env'])&&c['env'].filter(e=>e['valueFrom']!=undefined&&e['valueFrom']['secretKeyRef']!=undefined && e['valueFrom']['secretKeyRef']==parent['metadata']['name']).length>0).length>0 ||
                        spec['containers'].filter(c=>Array.isArray(c['envFrom'])&&c['envFrom'].filter(e=>e['secretRef']!=undefined && e['secretRef']['name']==parent['metadata']['name']).length>0).length>0 ||
                        (Array.isArray(spec['volumes']) &&
                            spec['volumes'].filter(v=>
                                v['secret']!=undefined &&
                                v['secret']['secretName']==parent['metadata']['name']
                            ).length>0)
            })
        },
    }
};
export const nsResolver = {
    k8sSecret: async (parent, args: object) => {
        return lists.k8sSecret(parent,{namespace: parent.metadata.name, ...args})
    }
};

