import k8s from '@kubernetes/client-node';
import rfc6902  from 'rfc6902';
import {kc, cache, applyFilter, applyFieldSelection, getByPath, getMetaNS } from '../k8slibs.js';

const k8sApi = kc.makeApiClient(k8s.CustomObjectsApi);

export const mutations = {
    fluxcdProviderCreate: async (_parent, args: object) => {
        const payload = {
            apiVersion: 'notification.toolkit.fluxcd.io/v1beta2',
            kind: 'io.fluxcd.toolkit.notification.v1beta2.Provider',
            metadata: getMetaNS(args),
            "spec": args['spec'],
        }
        try {
            const res = await k8sApi.createNamespacedCustomObject('notification.toolkit.fluxcd.io','v1beta2',args['namespace'],'providers', payload)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    fluxcdProviderDelete: async (_parent, args: object) => {
    try {
        const res = await k8sApi.deleteNamespacedCustomObject('notification.toolkit.fluxcd.io','v1beta2',args['namespace'],'providers', args['name'])
        return res.body
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
  },
    fluxcdProviderPatch: async (_parent, args: object) => {
        const request = {
            apiVersion: 'notification.toolkit.fluxcd.io/v1beta2',
            kind: 'io.fluxcd.toolkit.notification.v1beta2.Provider',
            metadata: getMetaNS(args),
        }
        if (args['spec'] != undefined && args['spec'] != null)
            request["spec"] =  args['spec'];
        try {
            const resGet = await k8sApi.getNamespacedCustomObject('notification.toolkit.fluxcd.io','v1beta2',args['namespace'],'providers', args['name'])
            const payload = rfc6902.createPatch(resGet.body,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await k8sApi.patchNamespacedCustomObject('notification.toolkit.fluxcd.io','v1beta2',args['namespace'],'providers', args['name'], payload, undefined, undefined, undefined, options)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
export const lists = {
    fluxcdProvider: async (_parent, args: object) => {
        let lst:Array<object>|undefined = cache.get(`Provider.${args['namespace']}`)
        if (lst==undefined) {
            try {
                const res = await k8sApi.listNamespacedCustomObject('notification.toolkit.fluxcd.io','v1beta2',args['namespace'],'providers')
                lst = (res as object)['body']['items'] as Array<object>
                cache.set(`Provider.${args['namespace']}`, lst, 2);
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
    fluxcdProvider: async (parent, args: object) => {
        return lists.fluxcdProvider(parent,{namespace: parent.metadata.name, ...args})
    }
};

