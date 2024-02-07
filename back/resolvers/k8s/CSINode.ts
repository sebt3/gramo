import k8s from '@kubernetes/client-node';
import rfc6902  from 'rfc6902';
import {kc, cache, applyFilter, applyFieldSelection, getByPath, getMeta } from '../k8slibs.js';

const k8sApi = kc.makeApiClient(k8s.StorageV1Api);

export const mutations = {
    k8sCSINodeCreate: async (_parent, args: object) => {
        const payload = {
            apiVersion: 'storage.k8s.io/v1',
            kind: 'io.k8s.api.storage.v1.CSINode',
            metadata: getMeta(args),
            "spec": args['spec'],
        }
        try {
            const res = await k8sApi.createCSINode(payload)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    k8sCSINodeDelete: async (_parent, args: object) => {
    try {
        const res = await k8sApi.deleteCSINode(args['name'])
        return res.body
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
  },
    k8sCSINodePatch: async (_parent, args: object) => {
        const request = {
            apiVersion: 'storage.k8s.io/v1',
            kind: 'io.k8s.api.storage.v1.CSINode',
            metadata: getMeta(args),
        }
        if (args['spec'] != undefined && args['spec'] != null)
            request["spec"] =  args['spec'];
        try {
            const resGet = await k8sApi.readCSINode(args['name'])
            const payload = rfc6902.createPatch(resGet.body,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await k8sApi.patchCSINode(args['name'], payload, undefined, undefined, undefined, undefined, undefined, options)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
export const lists = {
    k8sCSINode: async (_parent, args: object) => {
        let lst:Array<object>|undefined = cache.get('CSINode')
        if (lst==undefined) {
            try {
                const res = await k8sApi.listCSINode()
                lst = (res as object)['body']['items'] as Array<object>
                cache.set('CSINode', lst, 2);
            } catch (err) {
                console.error((err as object)['body']);
                return []
            }
        }
        return lst.filter(o=>applyFilter(o,args)).map(o=>applyFieldSelection(o,args))
    }
};
export const queries = {
    k8sCSINode: lists.k8sCSINode,
};
export const resolvers = {
};

