import k8s from '@kubernetes/client-node';
import rfc6902  from 'rfc6902';
import {kc, cache, applyFilter, applyFieldSelection, getByPath, getMetaNS } from '../k8slibs.js';
import { lists as listSecret } from '../k8s/Secret.js';

const k8sApi = kc.makeApiClient(k8s.CustomObjectsApi);

export const mutations = {
    secretgeneratorBasicAuthCreate: async (_parent, args: object) => {
        const payload = {
            apiVersion: 'secretgenerator.mittwald.de/v1alpha1',
            kind: 'de.mittwald.secretgenerator.v1alpha1.BasicAuth',
            metadata: getMetaNS(args),
            "spec": args['spec'],
        }
        try {
            const res = await k8sApi.createNamespacedCustomObject('secretgenerator.mittwald.de','v1alpha1',args['namespace'],'basicauths', payload)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    secretgeneratorBasicAuthDelete: async (_parent, args: object) => {
    try {
        const res = await k8sApi.deleteNamespacedCustomObject('secretgenerator.mittwald.de','v1alpha1',args['namespace'],'basicauths', args['name'])
        return res.body
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
  },
    secretgeneratorBasicAuthPatch: async (_parent, args: object) => {
        const request = {
            apiVersion: 'secretgenerator.mittwald.de/v1alpha1',
            kind: 'de.mittwald.secretgenerator.v1alpha1.BasicAuth',
            metadata: getMetaNS(args),
        }
        if (args['spec'] != undefined && args['spec'] != null)
            request["spec"] =  args['spec'];
        try {
            const resGet = await k8sApi.getNamespacedCustomObject('secretgenerator.mittwald.de','v1alpha1',args['namespace'],'basicauths', args['name'])
            const payload = rfc6902.createPatch(resGet.body,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await k8sApi.patchNamespacedCustomObject('secretgenerator.mittwald.de','v1alpha1',args['namespace'],'basicauths', args['name'], payload, undefined, undefined, undefined, options)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
export const lists = {
    secretgeneratorBasicAuth: async (_parent, args: object) => {
        let lst:Array<object>|undefined = cache.get(`BasicAuth.${args['namespace']}`)
        if (lst==undefined) {
            try {
                const res = await k8sApi.listNamespacedCustomObject('secretgenerator.mittwald.de','v1alpha1',args['namespace'],'basicauths')
                lst = (res as object)['body']['items'] as Array<object>
                cache.set(`BasicAuth.${args['namespace']}`, lst, 2);
            } catch (err) {
                console.error((err as object)['body']);
                return []
            }
        }
        return lst.filter(o=>applyFilter(o,args)).map(o=>applyFieldSelection(o,args))
    }
};
export const resolvers = {
    secretgeneratorBasicAuth: {
        childSecret: async (parent, args: object) => {
            const lst = await listSecret.k8sSecret(parent,{namespace: parent['metadata']['namespace'], ...args})
            return lst.filter(r=>
                r.metadata['ownerReferences']!=null && r.metadata['ownerReferences']!=undefined &&
                r.metadata['ownerReferences'].filter(r=>r.kind=='BasicAuth' && r.name == parent['metadata']['name']).length>0
            )
        },
    }
};
export const nsResolver = {
    secretgeneratorBasicAuth: async (parent, args: object) => {
        return lists.secretgeneratorBasicAuth(parent,{namespace: parent.metadata.name, ...args})
    }
};
