import k8s from '@kubernetes/client-node';
import rfc6902  from 'rfc6902';
import {kc, cache, applyFilter, applyFieldSelection, getByPath, getMetaNS } from '../k8slibs.js';

const k8sApi = kc.makeApiClient(k8s.CustomObjectsApi);

export const mutations = {
    fluxcdImageUpdateAutomationCreate: async (_parent, args: object) => {
        const payload = {
            apiVersion: 'image.toolkit.fluxcd.io/v1beta1',
            kind: 'io.fluxcd.toolkit.image.v1beta1.ImageUpdateAutomation',
            metadata: getMetaNS(args),
            "spec": args['spec'],
        }
        try {
            const res = await k8sApi.createNamespacedCustomObject('image.toolkit.fluxcd.io','v1beta1',args['namespace'],'imageupdateautomations', payload)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    fluxcdImageUpdateAutomationDelete: async (_parent, args: object) => {
    try {
        const res = await k8sApi.deleteNamespacedCustomObject('image.toolkit.fluxcd.io','v1beta1',args['namespace'],'imageupdateautomations', args['name'])
        return res.body
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
  },
    fluxcdImageUpdateAutomationPatch: async (_parent, args: object) => {
        const request = {
            apiVersion: 'image.toolkit.fluxcd.io/v1beta1',
            kind: 'io.fluxcd.toolkit.image.v1beta1.ImageUpdateAutomation',
            metadata: getMetaNS(args),
        }
        if (args['spec'] != undefined && args['spec'] != null)
            request["spec"] =  args['spec'];
        try {
            const resGet = await k8sApi.getNamespacedCustomObject('image.toolkit.fluxcd.io','v1beta1',args['namespace'],'imageupdateautomations', args['name'])
            const payload = rfc6902.createPatch(resGet.body,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await k8sApi.patchNamespacedCustomObject('image.toolkit.fluxcd.io','v1beta1',args['namespace'],'imageupdateautomations', args['name'], payload, undefined, undefined, undefined, options)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
export const lists = {
    fluxcdImageUpdateAutomation: async (_parent, args: object) => {
        let lst:Array<object>|undefined = cache.get(`ImageUpdateAutomation.${args['namespace']}`)
        if (lst==undefined) {
            try {
                const res = await k8sApi.listNamespacedCustomObject('image.toolkit.fluxcd.io','v1beta1',args['namespace'],'imageupdateautomations')
                lst = (res as object)['body']['items'] as Array<object>
                cache.set(`ImageUpdateAutomation.${args['namespace']}`, lst, 2);
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
    fluxcdImageUpdateAutomation: async (parent, args: object) => {
        return lists.fluxcdImageUpdateAutomation(parent,{namespace: parent.metadata.name, ...args})
    }
};

