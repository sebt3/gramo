import k8s from '@kubernetes/client-node';
import rfc6902  from 'rfc6902';
import {kc, cache, applyFilter, applyFieldSelection, getByPath, getMetaNS } from '../k8slibs.js';
import { lists as listService } from '../k8s/Service.js';
import { lists as listStatefulSet } from '../k8s/StatefulSet.js';

const k8sApi = kc.makeApiClient(k8s.CustomObjectsApi);

export const mutations = {
    redisRedisCreate: async (_parent, args: object) => {
        const payload = {
            apiVersion: 'redis.redis.opstreelabs.in/v1beta1',
            kind: 'in.opstreelabs.redis.redis.v1beta1.Redis',
            metadata: getMetaNS(args),
            "spec": args['spec'],
        }
        try {
            const res = await k8sApi.createNamespacedCustomObject('redis.redis.opstreelabs.in','v1beta1',args['namespace'],'redis', payload)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    redisRedisDelete: async (_parent, args: object) => {
    try {
        const res = await k8sApi.deleteNamespacedCustomObject('redis.redis.opstreelabs.in','v1beta1',args['namespace'],'redis', args['name'])
        return res.body
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
  },
    redisRedisPatch: async (_parent, args: object) => {
        const request = {
            apiVersion: 'redis.redis.opstreelabs.in/v1beta1',
            kind: 'in.opstreelabs.redis.redis.v1beta1.Redis',
            metadata: getMetaNS(args),
        }
        if (args['spec'] != undefined && args['spec'] != null)
            request["spec"] =  args['spec'];
        try {
            const resGet = await k8sApi.getNamespacedCustomObject('redis.redis.opstreelabs.in','v1beta1',args['namespace'],'redis', args['name'])
            const payload = rfc6902.createPatch(resGet.body,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await k8sApi.patchNamespacedCustomObject('redis.redis.opstreelabs.in','v1beta1',args['namespace'],'redis', args['name'], payload, undefined, undefined, undefined, options)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
export const lists = {
    redisRedis: async (_parent, args: object) => {
        let lst:Array<object>|undefined = cache.get(`Redis.${args['namespace']}`)
        if (lst==undefined) {
            try {
                const res = await k8sApi.listNamespacedCustomObject('redis.redis.opstreelabs.in','v1beta1',args['namespace'],'redis')
                lst = (res as object)['body']['items'] as Array<object>
                cache.set(`Redis.${args['namespace']}`, lst, 2);
            } catch (err) {
                console.error((err as object)['body']);
                return []
            }
        }
        return lst.filter(o=>applyFilter(o,args)).map(o=>applyFieldSelection(o,args))
    }
};
export const resolvers = {
    redisRedis: {
        childService: async (parent, args: object) => {
            const lst = await listService.k8sService(parent,{namespace: parent['metadata']['namespace'], ...args})
            return lst.filter(r=>
                r.metadata['ownerReferences']!=null && r.metadata['ownerReferences']!=undefined &&
                r.metadata['ownerReferences'].filter(r=>r.kind=='Redis' && r.name == parent['metadata']['name']).length>0
            )
        },
        childStatefulSet: async (parent, args: object) => {
            const lst = await listStatefulSet.k8sStatefulSet(parent,{namespace: parent['metadata']['namespace'], ...args})
            return lst.filter(r=>
                r.metadata['ownerReferences']!=null && r.metadata['ownerReferences']!=undefined &&
                r.metadata['ownerReferences'].filter(r=>r.kind=='Redis' && r.name == parent['metadata']['name']).length>0
            )
        },
    }
};
export const nsResolver = {
    redisRedis: async (parent, args: object) => {
        return lists.redisRedis(parent,{namespace: parent.metadata.name, ...args})
    }
};

