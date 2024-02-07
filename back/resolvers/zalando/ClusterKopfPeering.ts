import k8s from '@kubernetes/client-node';
import rfc6902  from 'rfc6902';
import {kc, cache, applyFilter, applyFieldSelection, getByPath, getMeta } from '../k8slibs.js';

const k8sApi = kc.makeApiClient(k8s.CustomObjectsApi);

export const mutations = {
    zalandoClusterKopfPeeringCreate: async (_parent, args: object) => {
        const payload = {
            apiVersion: 'zalando.org/v1',
            kind: 'org.zalando.v1.ClusterKopfPeering',
            metadata: getMeta(args),
        }
        try {
            const res = await k8sApi.createClusterCustomObject('zalando.org','v1','clusterkopfpeerings', payload)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    zalandoClusterKopfPeeringDelete: async (_parent, args: object) => {
    try {
        const res = await k8sApi.deleteClusterCustomObject('zalando.org','v1','clusterkopfpeerings', args['name'])
        return res.body
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
  },
    zalandoClusterKopfPeeringPatch: async (_parent, args: object) => {
        const request = {
            apiVersion: 'zalando.org/v1',
            kind: 'org.zalando.v1.ClusterKopfPeering',
            metadata: getMeta(args),
        }
        try {
            const resGet = await k8sApi.getClusterCustomObject('zalando.org','v1','clusterkopfpeerings', args['name'])
            const payload = rfc6902.createPatch(resGet.body,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await k8sApi.patchClusterCustomObject('zalando.org','v1','clusterkopfpeerings', args['name'], payload, undefined, undefined, undefined, options)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
export const lists = {
    zalandoClusterKopfPeering: async (_parent, args: object) => {
        let lst:Array<object>|undefined = cache.get('ClusterKopfPeering')
        if (lst==undefined) {
            try {
                const res = await k8sApi.listClusterCustomObject('zalando.org','v1','clusterkopfpeerings')
                lst = (res as object)['body']['items'] as Array<object>
                cache.set('ClusterKopfPeering', lst, 2);
            } catch (err) {
                console.error((err as object)['body']);
                return []
            }
        }
        return lst.filter(o=>applyFilter(o,args)).map(o=>applyFieldSelection(o,args))
    }
};
export const queries = {
    zalandoClusterKopfPeering: lists.zalandoClusterKopfPeering,
};
export const resolvers = {
};

