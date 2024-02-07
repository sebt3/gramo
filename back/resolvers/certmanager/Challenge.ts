import k8s from '@kubernetes/client-node';
import rfc6902  from 'rfc6902';
import {kc, cache, applyFilter, applyFieldSelection, getByPath, getMetaNS } from '../k8slibs.js';

const k8sApi = kc.makeApiClient(k8s.CustomObjectsApi);

export const mutations = {
    certmanagerChallengeCreate: async (_parent, args: object) => {
        const payload = {
            apiVersion: 'acme.cert-manager.io/v1',
            kind: 'io.cert-manager.acme.v1.Challenge',
            metadata: getMetaNS(args),
            "spec": args['spec'],
        }
        try {
            const res = await k8sApi.createNamespacedCustomObject('acme.cert-manager.io','v1',args['namespace'],'challenges', payload)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    certmanagerChallengeDelete: async (_parent, args: object) => {
    try {
        const res = await k8sApi.deleteNamespacedCustomObject('acme.cert-manager.io','v1',args['namespace'],'challenges', args['name'])
        return res.body
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
  },
    certmanagerChallengePatch: async (_parent, args: object) => {
        const request = {
            apiVersion: 'acme.cert-manager.io/v1',
            kind: 'io.cert-manager.acme.v1.Challenge',
            metadata: getMetaNS(args),
        }
        if (args['spec'] != undefined && args['spec'] != null)
            request["spec"] =  args['spec'];
        try {
            const resGet = await k8sApi.getNamespacedCustomObject('acme.cert-manager.io','v1',args['namespace'],'challenges', args['name'])
            const payload = rfc6902.createPatch(resGet.body,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await k8sApi.patchNamespacedCustomObject('acme.cert-manager.io','v1',args['namespace'],'challenges', args['name'], payload, undefined, undefined, undefined, options)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
export const lists = {
    certmanagerChallenge: async (_parent, args: object) => {
        let lst:Array<object>|undefined = cache.get(`Challenge.${args['namespace']}`)
        if (lst==undefined) {
            try {
                const res = await k8sApi.listNamespacedCustomObject('acme.cert-manager.io','v1',args['namespace'],'challenges')
                lst = (res as object)['body']['items'] as Array<object>
                cache.set(`Challenge.${args['namespace']}`, lst, 2);
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
    certmanagerChallenge: async (parent, args: object) => {
        return lists.certmanagerChallenge(parent,{namespace: parent.metadata.name, ...args})
    }
};

