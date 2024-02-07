import k8s from '@kubernetes/client-node';
import rfc6902  from 'rfc6902';
import {kc, cache, applyFilter, applyFieldSelection, getByPath, getMetaNS } from '../k8slibs.js';

const k8sApi = kc.makeApiClient(k8s.CustomObjectsApi);

export const mutations = {
    k8upRestoreCreate: async (_parent, args: object) => {
        const payload = {
            apiVersion: 'k8up.io/v1',
            kind: 'io.k8up.v1.Restore',
            metadata: getMetaNS(args),
            "spec": args['spec'],
        }
        try {
            const res = await k8sApi.createNamespacedCustomObject('k8up.io','v1',args['namespace'],'restores', payload)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    k8upRestoreDelete: async (_parent, args: object) => {
    try {
        const res = await k8sApi.deleteNamespacedCustomObject('k8up.io','v1',args['namespace'],'restores', args['name'])
        return res.body
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
  },
    k8upRestorePatch: async (_parent, args: object) => {
        const request = {
            apiVersion: 'k8up.io/v1',
            kind: 'io.k8up.v1.Restore',
            metadata: getMetaNS(args),
        }
        if (args['spec'] != undefined && args['spec'] != null)
            request["spec"] =  args['spec'];
        try {
            const resGet = await k8sApi.getNamespacedCustomObject('k8up.io','v1',args['namespace'],'restores', args['name'])
            const payload = rfc6902.createPatch(resGet.body,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await k8sApi.patchNamespacedCustomObject('k8up.io','v1',args['namespace'],'restores', args['name'], payload, undefined, undefined, undefined, options)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
export const lists = {
    k8upRestore: async (_parent, args: object) => {
        let lst:Array<object>|undefined = cache.get(`Restore.${args['namespace']}`)
        if (lst==undefined) {
            try {
                const res = await k8sApi.listNamespacedCustomObject('k8up.io','v1',args['namespace'],'restores')
                lst = (res as object)['body']['items'] as Array<object>
                cache.set(`Restore.${args['namespace']}`, lst, 2);
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
    k8upRestore: async (parent, args: object) => {
        return lists.k8upRestore(parent,{namespace: parent.metadata.name, ...args})
    }
};

