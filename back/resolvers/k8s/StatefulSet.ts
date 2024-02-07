import k8s from '@kubernetes/client-node';
import rfc6902  from 'rfc6902';
import {kc, cache, applyFilter, applyFieldSelection, getByPath, getMetaNS } from '../k8slibs.js';
import { lists as listMongoDBCommunity } from '../mongodb/MongoDBCommunity.js';
import { lists as listRedis } from '../redis/Redis.js';
import { lists as listPrometheus } from '../monitoring/Prometheus.js';
import { lists as listAlertmanager } from '../monitoring/Alertmanager.js';
import { lists as listPod } from '../k8s/Pod.js';
import { lists as listPersistentVolumeClaim } from '../k8s/PersistentVolumeClaim.js';

const k8sApi = kc.makeApiClient(k8s.AppsV1Api);

export const mutations = {
    k8sStatefulSetCreate: async (_parent, args: object) => {
        const payload = {
            apiVersion: 'apps/v1',
            kind: 'io.k8s.api.apps.v1.StatefulSet',
            metadata: getMetaNS(args),
            "spec": args['spec'],
        }
        try {
            const res = await k8sApi.createNamespacedStatefulSet(args['namespace'], payload)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    k8sStatefulSetDelete: async (_parent, args: object) => {
    try {
        const res = await k8sApi.deleteNamespacedStatefulSet(args['namespace'], args['name'])
        return res.body
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
  },
    k8sStatefulSetPatch: async (_parent, args: object) => {
        const request = {
            apiVersion: 'apps/v1',
            kind: 'io.k8s.api.apps.v1.StatefulSet',
            metadata: getMetaNS(args),
        }
        if (args['spec'] != undefined && args['spec'] != null)
            request["spec"] =  args['spec'];
        try {
            const resGet = await k8sApi.readNamespacedStatefulSet(args['namespace'], args['name'])
            const payload = rfc6902.createPatch(resGet.body,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await k8sApi.patchNamespacedStatefulSet(args['namespace'], args['name'], payload, undefined, undefined, undefined, undefined, undefined, options)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
export const lists = {
    k8sStatefulSet: async (_parent, args: object) => {
        let lst:Array<object>|undefined = cache.get(`StatefulSet.${args['namespace']}`)
        if (lst==undefined) {
            try {
                const res = await k8sApi.listNamespacedStatefulSet(args['namespace'])
                lst = (res as object)['body']['items'] as Array<object>
                cache.set(`StatefulSet.${args['namespace']}`, lst, 2);
            } catch (err) {
                console.error((err as object)['body']);
                return []
            }
        }
        return lst.filter(o=>applyFilter(o,args)).map(o=>applyFieldSelection(o,args))
    }
};
export const resolvers = {
    k8sStatefulSet: {
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
        childPod: async (parent, args: object) => {
            const lst = await listPod.k8sPod(parent,{namespace: parent['metadata']['namespace'], ...args})
            return lst.filter(r=>
                r.metadata['ownerReferences']!=null && r.metadata['ownerReferences']!=undefined &&
                r.metadata['ownerReferences'].filter(r=>r.kind=='StatefulSet' && r.name == parent['metadata']['name']).length>0
            )
        },
        childPersistentVolumeClaim: async (parent, args: object) => {
            const lst = await listPersistentVolumeClaim.k8sPersistentVolumeClaim(parent,{namespace: parent['metadata']['namespace'], ...args})
            return lst.filter(r=>
                r.metadata['ownerReferences']!=null && r.metadata['ownerReferences']!=undefined &&
                r.metadata['ownerReferences'].filter(r=>r.kind=='StatefulSet' && r.name == parent['metadata']['name']).length>0
            )
        },
    }
};
export const nsResolver = {
    k8sStatefulSet: async (parent, args: object) => {
        return lists.k8sStatefulSet(parent,{namespace: parent.metadata.name, ...args})
    }
};

