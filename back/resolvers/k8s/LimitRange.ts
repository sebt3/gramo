import k8s from '@kubernetes/client-node';
import rfc6902  from 'rfc6902';
import {kc, cache, applyFilter, applyFieldSelection, getByPath, getMetaNS } from '../k8slibs.js';

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

export const mutations = {
    k8sLimitRangeCreate: async (_parent, args: object) => {
        const payload = {
            apiVersion: '/v1',
            kind: 'io.k8s.api.core.v1.LimitRange',
            metadata: getMetaNS(args),
            "spec": args['spec'],
        }
        try {
            const res = await k8sApi.createNamespacedLimitRange(args['namespace'], payload)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    k8sLimitRangeDelete: async (_parent, args: object) => {
    try {
        const res = await k8sApi.deleteNamespacedLimitRange(args['namespace'], args['name'])
        return res.body
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
  },
    k8sLimitRangePatch: async (_parent, args: object) => {
        const request = {
            apiVersion: '/v1',
            kind: 'io.k8s.api.core.v1.LimitRange',
            metadata: getMetaNS(args),
        }
        if (args['spec'] != undefined && args['spec'] != null)
            request["spec"] =  args['spec'];
        try {
            const resGet = await k8sApi.readNamespacedLimitRange(args['namespace'], args['name'])
            const payload = rfc6902.createPatch(resGet.body,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await k8sApi.patchNamespacedLimitRange(args['namespace'], args['name'], payload, undefined, undefined, undefined, undefined, undefined, options)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
export const lists = {
    k8sLimitRange: async (_parent, args: object) => {
        let lst:Array<object>|undefined = cache.get(`LimitRange.${args['namespace']}`)
        if (lst==undefined) {
            try {
                const res = await k8sApi.listNamespacedLimitRange(args['namespace'])
                lst = (res as object)['body']['items'] as Array<object>
                cache.set(`LimitRange.${args['namespace']}`, lst, 2);
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
    k8sLimitRange: async (parent, args: object) => {
        return lists.k8sLimitRange(parent,{namespace: parent.metadata.name, ...args})
    }
};

