import k8s from '@kubernetes/client-node';
import rfc6902  from 'rfc6902';
import {kc, cache, applyFilter, applyFieldSelection, getByPath, getMeta } from '../k8slibs.js';

const k8sApi = kc.makeApiClient(k8s.NodeV1Api);

export const mutations = {
    k8sRuntimeClassCreate: async (_parent, args: object) => {
        const payload = {
            apiVersion: 'node.k8s.io/v1',
            kind: 'io.k8s.api.node.v1.RuntimeClass',
            metadata: getMeta(args),
            "handler": args['handler'],
            "overhead": args['overhead'],
            "scheduling": args['scheduling'],
        }
        try {
            const res = await k8sApi.createRuntimeClass(payload)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    k8sRuntimeClassDelete: async (_parent, args: object) => {
    try {
        const res = await k8sApi.deleteRuntimeClass(args['name'])
        return res.body
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
  },
    k8sRuntimeClassPatch: async (_parent, args: object) => {
        const request = {
            apiVersion: 'node.k8s.io/v1',
            kind: 'io.k8s.api.node.v1.RuntimeClass',
            metadata: getMeta(args),
        }
        if (args['handler'] != undefined && args['handler'] != null)
            request["handler"] =  args['handler'];
        if (args['overhead'] != undefined && args['overhead'] != null)
            request["overhead"] =  args['overhead'];
        if (args['scheduling'] != undefined && args['scheduling'] != null)
            request["scheduling"] =  args['scheduling'];
        try {
            const resGet = await k8sApi.readRuntimeClass(args['name'])
            const payload = rfc6902.createPatch(resGet.body,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await k8sApi.patchRuntimeClass(args['name'], payload, undefined, undefined, undefined, undefined, undefined, options)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
export const lists = {
    k8sRuntimeClass: async (_parent, args: object) => {
        let lst:Array<object>|undefined = cache.get('RuntimeClass')
        if (lst==undefined) {
            try {
                const res = await k8sApi.listRuntimeClass()
                lst = (res as object)['body']['items'] as Array<object>
                cache.set('RuntimeClass', lst, 2);
            } catch (err) {
                console.error((err as object)['body']);
                return []
            }
        }
        return lst.filter(o=>applyFilter(o,args)).map(o=>applyFieldSelection(o,args))
    }
};
export const queries = {
    k8sRuntimeClass: lists.k8sRuntimeClass,
};
export const resolvers = {
};

