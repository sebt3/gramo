import k8s from '@kubernetes/client-node';
import rfc6902  from 'rfc6902';
import {kc, cache, applyFilter, applyFieldSelection, getByPath, getMetaNS } from '../k8slibs.js';
import { lists as listMongoDBCommunity } from '../mongodb/MongoDBCommunity.js';
import { lists as listRedis } from '../redis/Redis.js';
import { lists as listPooler } from '../cnpg/Pooler.js';
import { lists as listCluster } from '../cnpg/Cluster.js';
import { lists as listPrometheus } from '../monitoring/Prometheus.js';
import { lists as listAlertmanager } from '../monitoring/Alertmanager.js';
import { lists as listEndpointSlice } from '../k8s/EndpointSlice.js';
import { lists as listPod } from '../k8s/Pod.js';
import { lists as listReplicaSet } from '../k8s/ReplicaSet.js';
import { lists as listDeployment } from '../k8s/Deployment.js';
import { lists as listDaemonSet } from '../k8s/DaemonSet.js';
import { lists as listPodTemplate } from '../k8s/PodTemplate.js';
import { lists as listIngress } from '../k8s/Ingress.js';

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

export const mutations = {
    k8sServiceCreate: async (_parent, args: object) => {
        const payload = {
            apiVersion: '/v1',
            kind: 'io.k8s.api.core.v1.Service',
            metadata: getMetaNS(args),
            "spec": args['spec'],
        }
        try {
            const res = await k8sApi.createNamespacedService(args['namespace'], payload)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    k8sServiceDelete: async (_parent, args: object) => {
    try {
        const res = await k8sApi.deleteNamespacedService(args['namespace'], args['name'])
        return res.body
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
  },
    k8sServicePatch: async (_parent, args: object) => {
        const request = {
            apiVersion: '/v1',
            kind: 'io.k8s.api.core.v1.Service',
            metadata: getMetaNS(args),
        }
        if (args['spec'] != undefined && args['spec'] != null)
            request["spec"] =  args['spec'];
        try {
            const resGet = await k8sApi.readNamespacedService(args['namespace'], args['name'])
            const payload = rfc6902.createPatch(resGet.body,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await k8sApi.patchNamespacedService(args['namespace'], args['name'], payload, undefined, undefined, undefined, undefined, undefined, options)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
export const lists = {
    k8sService: async (_parent, args: object) => {
        let lst:Array<object>|undefined = cache.get(`Service.${args['namespace']}`)
        if (lst==undefined) {
            try {
                const res = await k8sApi.listNamespacedService(args['namespace'])
                lst = (res as object)['body']['items'] as Array<object>
                cache.set(`Service.${args['namespace']}`, lst, 2);
            } catch (err) {
                console.error((err as object)['body']);
                return []
            }
        }
        return lst.filter(o=>applyFilter(o,args)).map(o=>applyFieldSelection(o,args))
    }
};
export const resolvers = {
    k8sService: {
        parentMongoDBCommunity: async (child, args: object) => {
            if (child.metadata['ownerReferences']==null || child.metadata['ownerReferences']==undefined || child.metadata['ownerReferences'].filter(r=>r.kind=='MongoDBCommunity').length<1) return null;
            const lst = await listMongoDBCommunity.mongodbMongoDBCommunity(child,{namespace: child['metadata']['namespace'], ...args})
            return lst.filter(o=>child.metadata['ownerReferences'].filter(r=>r.kind=='MongoDBCommunity'&&r.name==o['metadata']['name']).length>0)
        },
        parentRedis: async (child, args: object) => {
            if (child.metadata['ownerReferences']==null || child.metadata['ownerReferences']==undefined || child.metadata['ownerReferences'].filter(r=>r.kind=='Redis').length<1) return null;
            const lst = await listRedis.redisRedis(child,{namespace: child['metadata']['namespace'], ...args})
            return lst.filter(o=>child.metadata['ownerReferences'].filter(r=>r.kind=='Redis'&&r.name==o['metadata']['name']).length>0)
        },
        parentPooler: async (child, args: object) => {
            if (child.metadata['ownerReferences']==null || child.metadata['ownerReferences']==undefined || child.metadata['ownerReferences'].filter(r=>r.kind=='Pooler').length<1) return null;
            const lst = await listPooler.cnpgPooler(child,{namespace: child['metadata']['namespace'], ...args})
            return lst.filter(o=>child.metadata['ownerReferences'].filter(r=>r.kind=='Pooler'&&r.name==o['metadata']['name']).length>0)
        },
        parentCluster: async (child, args: object) => {
            if (child.metadata['ownerReferences']==null || child.metadata['ownerReferences']==undefined || child.metadata['ownerReferences'].filter(r=>r.kind=='Cluster').length<1) return null;
            const lst = await listCluster.cnpgCluster(child,{namespace: child['metadata']['namespace'], ...args})
            return lst.filter(o=>child.metadata['ownerReferences'].filter(r=>r.kind=='Cluster'&&r.name==o['metadata']['name']).length>0)
        },
        parentPrometheus: async (child, args: object) => {
            if (child.metadata['ownerReferences']==null || child.metadata['ownerReferences']==undefined || child.metadata['ownerReferences'].filter(r=>r.kind=='Prometheus').length<1) return null;
            const lst = await listPrometheus.monitoringPrometheus(child,{namespace: child['metadata']['namespace'], ...args})
            return lst.filter(o=>child.metadata['ownerReferences'].filter(r=>r.kind=='Prometheus'&&r.name==o['metadata']['name']).length>0)
        },
        parentAlertmanager: async (child, args: object) => {
            if (child.metadata['ownerReferences']==null || child.metadata['ownerReferences']==undefined || child.metadata['ownerReferences'].filter(r=>r.kind=='Alertmanager').length<1) return null;
            const lst = await listAlertmanager.monitoringAlertmanager(child,{namespace: child['metadata']['namespace'], ...args})
            return lst.filter(o=>child.metadata['ownerReferences'].filter(r=>r.kind=='Alertmanager'&&r.name==o['metadata']['name']).length>0)
        },
        childEndpointSlice: async (parent, args: object) => {
            const lst = await listEndpointSlice.k8sEndpointSlice(parent,{namespace: parent['metadata']['namespace'], ...args})
            return lst.filter(r=>
                r.metadata['ownerReferences']!=null && r.metadata['ownerReferences']!=undefined &&
                r.metadata['ownerReferences'].filter(r=>r.kind=='Service' && r.name == parent['metadata']['name']).length>0
            )
        },
        usePod: async (svc, args: object) => {
            if (svc['spec']['selector'] == undefined || Object.keys(svc['spec']['selector']).length<1) return null;
            const targetCnt = Object.keys(svc['spec']['selector']).length;
            const lst = await listPod.k8sPod(svc,{namespace: svc['metadata']['namespace'], ...args})
            return lst.filter(w=>{
                const meta = getByPath(w, 'metadata');
                if (meta['labels'] == undefined || Object.keys(meta['labels']).length<1) return false;
                return targetCnt == Object.entries(svc['spec']['selector'])
                    .reduce((acc,[name, value]) =>acc+Object.entries(meta['labels']).reduce(
                        (inAcc,[inName,inValue]) => inAcc+((name==inName&&value==inValue)?1:0)
                    ,0),0)
            })
        },
        useReplicaSet: async (svc, args: object) => {
            if (svc['spec']['selector'] == undefined || Object.keys(svc['spec']['selector']).length<1) return null;
            const targetCnt = Object.keys(svc['spec']['selector']).length;
            const lst = await listReplicaSet.k8sReplicaSet(svc,{namespace: svc['metadata']['namespace'], ...args})
            return lst.filter(w=>{
                const meta = getByPath(w, 'spec/template/metadata');
                if (meta['labels'] == undefined || Object.keys(meta['labels']).length<1) return false;
                return targetCnt == Object.entries(svc['spec']['selector'])
                    .reduce((acc,[name, value]) =>acc+Object.entries(meta['labels']).reduce(
                        (inAcc,[inName,inValue]) => inAcc+((name==inName&&value==inValue)?1:0)
                    ,0),0)
            })
        },
        useDeployment: async (svc, args: object) => {
            if (svc['spec']['selector'] == undefined || Object.keys(svc['spec']['selector']).length<1) return null;
            const targetCnt = Object.keys(svc['spec']['selector']).length;
            const lst = await listDeployment.k8sDeployment(svc,{namespace: svc['metadata']['namespace'], ...args})
            return lst.filter(w=>{
                const meta = getByPath(w, 'spec/template/metadata');
                if (meta['labels'] == undefined || Object.keys(meta['labels']).length<1) return false;
                return targetCnt == Object.entries(svc['spec']['selector'])
                    .reduce((acc,[name, value]) =>acc+Object.entries(meta['labels']).reduce(
                        (inAcc,[inName,inValue]) => inAcc+((name==inName&&value==inValue)?1:0)
                    ,0),0)
            })
        },
        useDaemonSet: async (svc, args: object) => {
            if (svc['spec']['selector'] == undefined || Object.keys(svc['spec']['selector']).length<1) return null;
            const targetCnt = Object.keys(svc['spec']['selector']).length;
            const lst = await listDaemonSet.k8sDaemonSet(svc,{namespace: svc['metadata']['namespace'], ...args})
            return lst.filter(w=>{
                const meta = getByPath(w, 'spec/template/metadata');
                if (meta['labels'] == undefined || Object.keys(meta['labels']).length<1) return false;
                return targetCnt == Object.entries(svc['spec']['selector'])
                    .reduce((acc,[name, value]) =>acc+Object.entries(meta['labels']).reduce(
                        (inAcc,[inName,inValue]) => inAcc+((name==inName&&value==inValue)?1:0)
                    ,0),0)
            })
        },
        usePodTemplate: async (svc, args: object) => {
            if (svc['spec']['selector'] == undefined || Object.keys(svc['spec']['selector']).length<1) return null;
            const targetCnt = Object.keys(svc['spec']['selector']).length;
            const lst = await listPodTemplate.k8sPodTemplate(svc,{namespace: svc['metadata']['namespace'], ...args})
            return lst.filter(w=>{
                const meta = getByPath(w, 'template/metadata');
                if (meta['labels'] == undefined || Object.keys(meta['labels']).length<1) return false;
                return targetCnt == Object.entries(svc['spec']['selector'])
                    .reduce((acc,[name, value]) =>acc+Object.entries(meta['labels']).reduce(
                        (inAcc,[inName,inValue]) => inAcc+((name==inName&&value==inValue)?1:0)
                    ,0),0)
            })
        },
        usedByIngress: async (svc, args: object) => {
            const lst = await listIngress.k8sIngress(svc, {namespace: svc['metadata']['namespace'], ...args})
            return lst.filter(ing=>Array.isArray(ing['spec']['rules']) && ing['spec']['rules'].filter(r=>
                r['http'] != undefined &&
                Array.isArray(r['http']['paths']) &&
                r['http']['paths'].filter(p=>
                    p['backend'] != undefined &&
                    p['backend']['service'] != undefined &&
                    p['backend']['service']['name'] == svc['metadata']['name']
                ).length>0
            ))
        },
    }
};
export const nsResolver = {
    k8sService: async (parent, args: object) => {
        return lists.k8sService(parent,{namespace: parent.metadata.name, ...args})
    }
};

