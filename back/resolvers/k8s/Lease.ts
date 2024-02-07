import k8s from '@kubernetes/client-node';
import rfc6902  from 'rfc6902';
import {kc, cache, applyFilter, applyFieldSelection, getByPath, getMetaNS } from '../k8slibs.js';

const k8sApi = kc.makeApiClient(k8s.CoordinationV1Api);

export const mutations = {
    k8sLeaseCreate: async (_parent, args: object) => {
        const payload = {
            apiVersion: 'coordination.k8s.io/v1',
            kind: 'io.k8s.api.coordination.v1.Lease',
            metadata: getMetaNS(args),
            "spec": args['spec'],
        }
        try {
            const res = await k8sApi.createNamespacedLease(args['namespace'], payload)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    k8sLeaseDelete: async (_parent, args: object) => {
    try {
        const res = await k8sApi.deleteNamespacedLease(args['namespace'], args['name'])
        return res.body
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
  },
    k8sLeasePatch: async (_parent, args: object) => {
        const request = {
            apiVersion: 'coordination.k8s.io/v1',
            kind: 'io.k8s.api.coordination.v1.Lease',
            metadata: getMetaNS(args),
        }
        if (args['spec'] != undefined && args['spec'] != null)
            request["spec"] =  args['spec'];
        try {
            const resGet = await k8sApi.readNamespacedLease(args['namespace'], args['name'])
            const payload = rfc6902.createPatch(resGet.body,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await k8sApi.patchNamespacedLease(args['namespace'], args['name'], payload, undefined, undefined, undefined, undefined, undefined, options)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
export const lists = {
    k8sLease: async (_parent, args: object) => {
        let lst:Array<object>|undefined = cache.get(`Lease.${args['namespace']}`)
        if (lst==undefined) {
            try {
                const res = await k8sApi.listNamespacedLease(args['namespace'])
                lst = (res as object)['body']['items'] as Array<object>
                cache.set(`Lease.${args['namespace']}`, lst, 2);
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
    k8sLease: async (parent, args: object) => {
        return lists.k8sLease(parent,{namespace: parent.metadata.name, ...args})
    }
};

