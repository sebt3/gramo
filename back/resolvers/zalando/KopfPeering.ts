import k8s from '@kubernetes/client-node';
import rfc6902  from 'rfc6902';
import {kc, cache, applyFilter, applyFieldSelection, getByPath, getMetaNS } from '../k8slibs.js';

const k8sApi = kc.makeApiClient(k8s.CustomObjectsApi);

export const mutations = {
    zalandoKopfPeeringCreate: async (_parent, args: object) => {
        const payload = {
            apiVersion: 'zalando.org/v1',
            kind: 'org.zalando.v1.KopfPeering',
            metadata: getMetaNS(args),
        }
        try {
            const res = await k8sApi.createNamespacedCustomObject('zalando.org','v1',args['namespace'],'kopfpeerings', payload)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    zalandoKopfPeeringDelete: async (_parent, args: object) => {
    try {
        const res = await k8sApi.deleteNamespacedCustomObject('zalando.org','v1',args['namespace'],'kopfpeerings', args['name'])
        return res.body
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
  },
    zalandoKopfPeeringPatch: async (_parent, args: object) => {
        const request = {
            apiVersion: 'zalando.org/v1',
            kind: 'org.zalando.v1.KopfPeering',
            metadata: getMetaNS(args),
        }
        try {
            const resGet = await k8sApi.getNamespacedCustomObject('zalando.org','v1',args['namespace'],'kopfpeerings', args['name'])
            const payload = rfc6902.createPatch(resGet.body,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await k8sApi.patchNamespacedCustomObject('zalando.org','v1',args['namespace'],'kopfpeerings', args['name'], payload, undefined, undefined, undefined, options)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
export const lists = {
    zalandoKopfPeering: async (_parent, args: object) => {
        let lst:Array<object>|undefined = cache.get(`KopfPeering.${args['namespace']}`)
        if (lst==undefined) {
            try {
                const res = await k8sApi.listNamespacedCustomObject('zalando.org','v1',args['namespace'],'kopfpeerings')
                lst = (res as object)['body']['items'] as Array<object>
                cache.set(`KopfPeering.${args['namespace']}`, lst, 2);
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
    zalandoKopfPeering: async (parent, args: object) => {
        return lists.zalandoKopfPeering(parent,{namespace: parent.metadata.name, ...args})
    }
};

