import k8s from '@kubernetes/client-node';
import rfc6902  from 'rfc6902';
import {kc, cache, applyFilter, applyFieldSelection, getByPath, getMetaNS } from '../k8slibs.js';
import { lists as listPrometheus } from '../monitoring/Prometheus.js';
import { lists as listPod } from '../k8s/Pod.js';
import { lists as listReplicaSet } from '../k8s/ReplicaSet.js';
import { lists as listJob } from '../k8s/Job.js';
import { lists as listCronJob } from '../k8s/CronJob.js';
import { lists as listDeployment } from '../k8s/Deployment.js';
import { lists as listDaemonSet } from '../k8s/DaemonSet.js';
import { lists as listPodTemplate } from '../k8s/PodTemplate.js';

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

export const mutations = {
    k8sConfigMapCreate: async (_parent, args: object) => {
        const payload = {
            apiVersion: '/v1',
            kind: 'io.k8s.api.core.v1.ConfigMap',
            metadata: getMetaNS(args),
            "binaryData": args['binaryData'],
            "data": args['data'],
            "immutable": args['immutable'],
        }
        try {
            const res = await k8sApi.createNamespacedConfigMap(args['namespace'], payload)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    k8sConfigMapDelete: async (_parent, args: object) => {
    try {
        const res = await k8sApi.deleteNamespacedConfigMap(args['namespace'], args['name'])
        return res.body
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
  },
    k8sConfigMapPatch: async (_parent, args: object) => {
        const request = {
            apiVersion: '/v1',
            kind: 'io.k8s.api.core.v1.ConfigMap',
            metadata: getMetaNS(args),
        }
        if (args['binaryData'] != undefined && args['binaryData'] != null)
            request["binaryData"] =  args['binaryData'];
        if (args['data'] != undefined && args['data'] != null)
            request["data"] =  args['data'];
        if (args['immutable'] != undefined && args['immutable'] != null)
            request["immutable"] =  args['immutable'];
        try {
            const resGet = await k8sApi.readNamespacedConfigMap(args['namespace'], args['name'])
            const payload = rfc6902.createPatch(resGet.body,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await k8sApi.patchNamespacedConfigMap(args['namespace'], args['name'], payload, undefined, undefined, undefined, undefined, undefined, options)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
export const lists = {
    k8sConfigMap: async (_parent, args: object) => {
        let lst:Array<object>|undefined = cache.get(`ConfigMap.${args['namespace']}`)
        if (lst==undefined) {
            try {
                const res = await k8sApi.listNamespacedConfigMap(args['namespace'])
                lst = (res as object)['body']['items'] as Array<object>
                cache.set(`ConfigMap.${args['namespace']}`, lst, 2);
            } catch (err) {
                console.error((err as object)['body']);
                return []
            }
        }
        return lst.filter(o=>applyFilter(o,args)).map(o=>applyFieldSelection(o,args))
    }
};
export const resolvers = {
    k8sConfigMap: {
        parentPrometheus: async (child, args: object) => {
            if (child.metadata['ownerReferences']==null || child.metadata['ownerReferences']==undefined || child.metadata['ownerReferences'].filter(r=>r.kind=='Prometheus').length<1) return null;
            const lst = await listPrometheus.monitoringPrometheus(child,{namespace: child['metadata']['namespace'], ...args})
            return lst.filter(o=>child.metadata['ownerReferences'].filter(r=>r.kind=='Prometheus'&&r.name==o['metadata']['name']).length>0)
        },
        usedByPod: async (parent, args: object) => {
            const lst = await listPod.k8sPod(parent,{namespace: parent['metadata']['namespace'], ...args})
            return lst.filter(w=>{
                const spec = getByPath(w, 'spec');
                return spec['containers'].filter(c=>Array.isArray(c['env'])&&c['env'].filter(e=>e['valueFrom']!=undefined&&e['valueFrom']['configMapKeyRef']!=undefined && e['valueFrom']['configMapKeyRef']==parent['metadata']['name']).length>0).length>0 ||
                        spec['containers'].filter(c=>Array.isArray(c['envFrom'])&&c['envFrom'].filter(e=>e['configMapRef']!=undefined && e['configMapRef']['name']==parent['metadata']['name']).length>0).length>0 ||
                        (Array.isArray(spec['volumes']) &&
                            spec['volumes'].filter(v=>
                                v['configMap']!=undefined &&
                                v['configMap']['name']==parent['metadata']['name']
                            ).length>0)
            })
        },
        usedByReplicaSet: async (parent, args: object) => {
            const lst = await listReplicaSet.k8sReplicaSet(parent,{namespace: parent['metadata']['namespace'], ...args})
            return lst.filter(w=>{
                const spec = getByPath(w, 'spec/template/spec');
                return spec['containers'].filter(c=>Array.isArray(c['env'])&&c['env'].filter(e=>e['valueFrom']!=undefined&&e['valueFrom']['configMapKeyRef']!=undefined && e['valueFrom']['configMapKeyRef']==parent['metadata']['name']).length>0).length>0 ||
                        spec['containers'].filter(c=>Array.isArray(c['envFrom'])&&c['envFrom'].filter(e=>e['configMapRef']!=undefined && e['configMapRef']['name']==parent['metadata']['name']).length>0).length>0 ||
                        (Array.isArray(spec['volumes']) &&
                            spec['volumes'].filter(v=>
                                v['configMap']!=undefined &&
                                v['configMap']['name']==parent['metadata']['name']
                            ).length>0)
            })
        },
        usedByJob: async (parent, args: object) => {
            const lst = await listJob.k8sJob(parent,{namespace: parent['metadata']['namespace'], ...args})
            return lst.filter(w=>{
                const spec = getByPath(w, 'spec/template/spec');
                return spec['containers'].filter(c=>Array.isArray(c['env'])&&c['env'].filter(e=>e['valueFrom']!=undefined&&e['valueFrom']['configMapKeyRef']!=undefined && e['valueFrom']['configMapKeyRef']==parent['metadata']['name']).length>0).length>0 ||
                        spec['containers'].filter(c=>Array.isArray(c['envFrom'])&&c['envFrom'].filter(e=>e['configMapRef']!=undefined && e['configMapRef']['name']==parent['metadata']['name']).length>0).length>0 ||
                        (Array.isArray(spec['volumes']) &&
                            spec['volumes'].filter(v=>
                                v['configMap']!=undefined &&
                                v['configMap']['name']==parent['metadata']['name']
                            ).length>0)
            })
        },
        usedByCronJob: async (parent, args: object) => {
            const lst = await listCronJob.k8sCronJob(parent,{namespace: parent['metadata']['namespace'], ...args})
            return lst.filter(w=>{
                const spec = getByPath(w, 'spec/jobTemplate/spec/template/spec');
                return spec['containers'].filter(c=>Array.isArray(c['env'])&&c['env'].filter(e=>e['valueFrom']!=undefined&&e['valueFrom']['configMapKeyRef']!=undefined && e['valueFrom']['configMapKeyRef']==parent['metadata']['name']).length>0).length>0 ||
                        spec['containers'].filter(c=>Array.isArray(c['envFrom'])&&c['envFrom'].filter(e=>e['configMapRef']!=undefined && e['configMapRef']['name']==parent['metadata']['name']).length>0).length>0 ||
                        (Array.isArray(spec['volumes']) &&
                            spec['volumes'].filter(v=>
                                v['configMap']!=undefined &&
                                v['configMap']['name']==parent['metadata']['name']
                            ).length>0)
            })
        },
        usedByDeployment: async (parent, args: object) => {
            const lst = await listDeployment.k8sDeployment(parent,{namespace: parent['metadata']['namespace'], ...args})
            return lst.filter(w=>{
                const spec = getByPath(w, 'spec/template/spec');
                return spec['containers'].filter(c=>Array.isArray(c['env'])&&c['env'].filter(e=>e['valueFrom']!=undefined&&e['valueFrom']['configMapKeyRef']!=undefined && e['valueFrom']['configMapKeyRef']==parent['metadata']['name']).length>0).length>0 ||
                        spec['containers'].filter(c=>Array.isArray(c['envFrom'])&&c['envFrom'].filter(e=>e['configMapRef']!=undefined && e['configMapRef']['name']==parent['metadata']['name']).length>0).length>0 ||
                        (Array.isArray(spec['volumes']) &&
                            spec['volumes'].filter(v=>
                                v['configMap']!=undefined &&
                                v['configMap']['name']==parent['metadata']['name']
                            ).length>0)
            })
        },
        usedByDaemonSet: async (parent, args: object) => {
            const lst = await listDaemonSet.k8sDaemonSet(parent,{namespace: parent['metadata']['namespace'], ...args})
            return lst.filter(w=>{
                const spec = getByPath(w, 'spec/template/spec');
                return spec['containers'].filter(c=>Array.isArray(c['env'])&&c['env'].filter(e=>e['valueFrom']!=undefined&&e['valueFrom']['configMapKeyRef']!=undefined && e['valueFrom']['configMapKeyRef']==parent['metadata']['name']).length>0).length>0 ||
                        spec['containers'].filter(c=>Array.isArray(c['envFrom'])&&c['envFrom'].filter(e=>e['configMapRef']!=undefined && e['configMapRef']['name']==parent['metadata']['name']).length>0).length>0 ||
                        (Array.isArray(spec['volumes']) &&
                            spec['volumes'].filter(v=>
                                v['configMap']!=undefined &&
                                v['configMap']['name']==parent['metadata']['name']
                            ).length>0)
            })
        },
        usedByPodTemplate: async (parent, args: object) => {
            const lst = await listPodTemplate.k8sPodTemplate(parent,{namespace: parent['metadata']['namespace'], ...args})
            return lst.filter(w=>{
                const spec = getByPath(w, 'template/spec');
                return spec['containers'].filter(c=>Array.isArray(c['env'])&&c['env'].filter(e=>e['valueFrom']!=undefined&&e['valueFrom']['configMapKeyRef']!=undefined && e['valueFrom']['configMapKeyRef']==parent['metadata']['name']).length>0).length>0 ||
                        spec['containers'].filter(c=>Array.isArray(c['envFrom'])&&c['envFrom'].filter(e=>e['configMapRef']!=undefined && e['configMapRef']['name']==parent['metadata']['name']).length>0).length>0 ||
                        (Array.isArray(spec['volumes']) &&
                            spec['volumes'].filter(v=>
                                v['configMap']!=undefined &&
                                v['configMap']['name']==parent['metadata']['name']
                            ).length>0)
            })
        },
    }
};
export const nsResolver = {
    k8sConfigMap: async (parent, args: object) => {
        return lists.k8sConfigMap(parent,{namespace: parent.metadata.name, ...args})
    }
};

