import k8s from '@kubernetes/client-node';
import rfc6902  from 'rfc6902';
import {kc, cache, applyFilter, applyFieldSelection, getByPath, getMetaNS } from '../k8slibs.js';

const k8sApi = kc.makeApiClient(k8s.CustomObjectsApi);

export const mutations = {
    fluxcdHelmReleaseCreate: async (_parent, args: object) => {
        const payload = {
            apiVersion: 'helm.toolkit.fluxcd.io/v2beta1',
            kind: 'io.fluxcd.toolkit.helm.v2beta1.HelmRelease',
            metadata: getMetaNS(args),
            "spec": args['spec'],
        }
        try {
            const res = await k8sApi.createNamespacedCustomObject('helm.toolkit.fluxcd.io','v2beta1',args['namespace'],'helmreleases', payload)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    fluxcdHelmReleaseDelete: async (_parent, args: object) => {
    try {
        const res = await k8sApi.deleteNamespacedCustomObject('helm.toolkit.fluxcd.io','v2beta1',args['namespace'],'helmreleases', args['name'])
        return res.body
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
  },
    fluxcdHelmReleasePatch: async (_parent, args: object) => {
        const request = {
            apiVersion: 'helm.toolkit.fluxcd.io/v2beta1',
            kind: 'io.fluxcd.toolkit.helm.v2beta1.HelmRelease',
            metadata: getMetaNS(args),
        }
        if (args['spec'] != undefined && args['spec'] != null)
            request["spec"] =  args['spec'];
        try {
            const resGet = await k8sApi.getNamespacedCustomObject('helm.toolkit.fluxcd.io','v2beta1',args['namespace'],'helmreleases', args['name'])
            const payload = rfc6902.createPatch(resGet.body,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await k8sApi.patchNamespacedCustomObject('helm.toolkit.fluxcd.io','v2beta1',args['namespace'],'helmreleases', args['name'], payload, undefined, undefined, undefined, options)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
export const lists = {
    fluxcdHelmRelease: async (_parent, args: object) => {
        let lst:Array<object>|undefined = cache.get(`HelmRelease.${args['namespace']}`)
        if (lst==undefined) {
            try {
                const res = await k8sApi.listNamespacedCustomObject('helm.toolkit.fluxcd.io','v2beta1',args['namespace'],'helmreleases')
                lst = (res as object)['body']['items'] as Array<object>
                cache.set(`HelmRelease.${args['namespace']}`, lst, 2);
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
    fluxcdHelmRelease: async (parent, args: object) => {
        return lists.fluxcdHelmRelease(parent,{namespace: parent.metadata.name, ...args})
    }
};

