import k8s from '@kubernetes/client-node';
import rfc6902  from 'rfc6902';
import {kc, cache, applyFilter, applyFieldSelection, getByPath, getMetaNS } from '../k8slibs.js';

const k8sApi = kc.makeApiClient(k8s.CustomObjectsApi);

export const mutations = {
    redisRedisClusterCreate: async (_parent, args: object) => {
        const payload = {
            apiVersion: 'redis.redis.opstreelabs.in/v1beta1',
            kind: 'in.opstreelabs.redis.redis.v1beta1.RedisCluster',
            metadata: getMetaNS(args),
            "spec": args['spec'],
        }
        try {
            const res = await k8sApi.createNamespacedCustomObject('redis.redis.opstreelabs.in','v1beta1',args['namespace'],'redisclusters', payload)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    redisRedisClusterDelete: async (_parent, args: object) => {
    try {
        const res = await k8sApi.deleteNamespacedCustomObject('redis.redis.opstreelabs.in','v1beta1',args['namespace'],'redisclusters', args['name'])
        return res.body
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
  },
    redisRedisClusterPatch: async (_parent, args: object) => {
        const request = {
            apiVersion: 'redis.redis.opstreelabs.in/v1beta1',
            kind: 'in.opstreelabs.redis.redis.v1beta1.RedisCluster',
            metadata: getMetaNS(args),
        }
        if (args['spec'] != undefined && args['spec'] != null)
            request["spec"] =  args['spec'];
        try {
            const resGet = await k8sApi.getNamespacedCustomObject('redis.redis.opstreelabs.in','v1beta1',args['namespace'],'redisclusters', args['name'])
            const payload = rfc6902.createPatch(resGet.body,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await k8sApi.patchNamespacedCustomObject('redis.redis.opstreelabs.in','v1beta1',args['namespace'],'redisclusters', args['name'], payload, undefined, undefined, undefined, options)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
export const lists = {
    redisRedisCluster: async (_parent, args: object) => {
        let lst:Array<object>|undefined = cache.get(`RedisCluster.${args['namespace']}`)
        if (lst==undefined) {
            try {
                const res = await k8sApi.listNamespacedCustomObject('redis.redis.opstreelabs.in','v1beta1',args['namespace'],'redisclusters')
                lst = (res as object)['body']['items'] as Array<object>
                cache.set(`RedisCluster.${args['namespace']}`, lst, 2);
            } catch (err) {
                console.error((err as object)['body']);
                return []
            }
        }
        return lst.filter(o=>applyFilter(o,args)).map(o=>applyFieldSelection(o,args))
    }
};
export const resolvers = {
};
export const nsResolver = {
    redisRedisCluster: async (parent, args: object) => {
        return lists.redisRedisCluster(parent,{namespace: parent.metadata.name, ...args})
    }
};

