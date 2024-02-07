import k8s from '@kubernetes/client-node';
import rfc6902  from 'rfc6902';
import {kc, cache, applyFilter, applyFieldSelection, getByPath, getMetaNS } from '../k8slibs.js';

const k8sApi = kc.makeApiClient(k8s.CustomObjectsApi);

export const mutations = {
    traefikIngressRouteCreate: async (_parent, args: object) => {
        const payload = {
            apiVersion: 'traefik.io/v1alpha1',
            kind: 'io.traefik.v1alpha1.IngressRoute',
            metadata: getMetaNS(args),
            "spec": args['spec'],
        }
        try {
            const res = await k8sApi.createNamespacedCustomObject('traefik.io','v1alpha1',args['namespace'],'ingressroutes', payload)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    traefikIngressRouteDelete: async (_parent, args: object) => {
    try {
        const res = await k8sApi.deleteNamespacedCustomObject('traefik.io','v1alpha1',args['namespace'],'ingressroutes', args['name'])
        return res.body
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
  },
    traefikIngressRoutePatch: async (_parent, args: object) => {
        const request = {
            apiVersion: 'traefik.io/v1alpha1',
            kind: 'io.traefik.v1alpha1.IngressRoute',
            metadata: getMetaNS(args),
        }
        if (args['spec'] != undefined && args['spec'] != null)
            request["spec"] =  args['spec'];
        try {
            const resGet = await k8sApi.getNamespacedCustomObject('traefik.io','v1alpha1',args['namespace'],'ingressroutes', args['name'])
            const payload = rfc6902.createPatch(resGet.body,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await k8sApi.patchNamespacedCustomObject('traefik.io','v1alpha1',args['namespace'],'ingressroutes', args['name'], payload, undefined, undefined, undefined, options)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
export const lists = {
    traefikIngressRoute: async (_parent, args: object) => {
        let lst:Array<object>|undefined = cache.get(`IngressRoute.${args['namespace']}`)
        if (lst==undefined) {
            try {
                const res = await k8sApi.listNamespacedCustomObject('traefik.io','v1alpha1',args['namespace'],'ingressroutes')
                lst = (res as object)['body']['items'] as Array<object>
                cache.set(`IngressRoute.${args['namespace']}`, lst, 2);
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
    traefikIngressRoute: async (parent, args: object) => {
        return lists.traefikIngressRoute(parent,{namespace: parent.metadata.name, ...args})
    }
};

