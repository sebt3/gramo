import k8s from '@kubernetes/client-node';
import rfc6902  from 'rfc6902';
import {kc, cache, applyFilter, applyFieldSelection, getByPath, getMetaNS } from '../k8slibs.js';

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

export const mutations = {
    k8sEndpointsCreate: async (_parent, args: object) => {
        const payload = {
            apiVersion: '/v1',
            kind: 'io.k8s.api.core.v1.Endpoints',
            metadata: getMetaNS(args),
            "subsets": args['subsets'],
        }
        try {
            const res = await k8sApi.createNamespacedEndpoints(args['namespace'], payload)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    k8sEndpointsDelete: async (_parent, args: object) => {
    try {
        const res = await k8sApi.deleteNamespacedEndpoints(args['namespace'], args['name'])
        return res.body
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
  },
    k8sEndpointsPatch: async (_parent, args: object) => {
        const request = {
            apiVersion: '/v1',
            kind: 'io.k8s.api.core.v1.Endpoints',
            metadata: getMetaNS(args),
        }
        if (args['subsets'] != undefined && args['subsets'] != null)
            request["subsets"] =  args['subsets'];
        try {
            const resGet = await k8sApi.readNamespacedEndpoints(args['namespace'], args['name'])
            const payload = rfc6902.createPatch(resGet.body,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await k8sApi.patchNamespacedEndpoints(args['namespace'], args['name'], payload, undefined, undefined, undefined, undefined, undefined, options)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
export const lists = {
    k8sEndpoints: async (_parent, args: object) => {
        let lst:Array<object>|undefined = cache.get(`Endpoints.${args['namespace']}`)
        if (lst==undefined) {
            try {
                const res = await k8sApi.listNamespacedEndpoints(args['namespace'])
                lst = (res as object)['body']['items'] as Array<object>
                cache.set(`Endpoints.${args['namespace']}`, lst, 2);
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
    k8sEndpoints: async (parent, args: object) => {
        return lists.k8sEndpoints(parent,{namespace: parent.metadata.name, ...args})
    }
};

