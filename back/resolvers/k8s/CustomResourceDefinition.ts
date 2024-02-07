import k8s from '@kubernetes/client-node';
import rfc6902  from 'rfc6902';
import {kc, cache, applyFilter, applyFieldSelection, getByPath, getMeta } from '../k8slibs.js';
import { lists as listAPIService } from '../k8s/APIService.js';

const k8sApi = kc.makeApiClient(k8s.ApiextensionsV1Api);

export const mutations = {
    k8sCustomResourceDefinitionCreate: async (_parent, args: object) => {
        const payload = {
            apiVersion: 'apiextensions.k8s.io/v1',
            kind: 'io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1.CustomResourceDefinition',
            metadata: getMeta(args),
            "spec": args['spec'],
        }
        try {
            const res = await k8sApi.createCustomResourceDefinition(payload)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    k8sCustomResourceDefinitionDelete: async (_parent, args: object) => {
    try {
        const res = await k8sApi.deleteCustomResourceDefinition(args['name'])
        return res.body
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
  },
    k8sCustomResourceDefinitionPatch: async (_parent, args: object) => {
        const request = {
            apiVersion: 'apiextensions.k8s.io/v1',
            kind: 'io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1.CustomResourceDefinition',
            metadata: getMeta(args),
        }
        if (args['spec'] != undefined && args['spec'] != null)
            request["spec"] =  args['spec'];
        try {
            const resGet = await k8sApi.readCustomResourceDefinition(args['name'])
            const payload = rfc6902.createPatch(resGet.body,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await k8sApi.patchCustomResourceDefinition(args['name'], payload, undefined, undefined, undefined, undefined, undefined, options)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
export const lists = {
    k8sCustomResourceDefinition: async (_parent, args: object) => {
        let lst:Array<object>|undefined = cache.get('CustomResourceDefinition')
        if (lst==undefined) {
            try {
                const res = await k8sApi.listCustomResourceDefinition()
                lst = (res as object)['body']['items'] as Array<object>
                cache.set('CustomResourceDefinition', lst, 2);
            } catch (err) {
                console.error((err as object)['body']);
                return []
            }
        }
        return lst.filter(o=>applyFilter(o,args)).map(o=>applyFieldSelection(o,args))
    }
};
export const queries = {
    k8sCustomResourceDefinition: lists.k8sCustomResourceDefinition,
};
export const resolvers = {
    k8sCustomResourceDefinition: {
        providedToAPIService: async (parent, args: object) => {
            const lst = await listAPIService.k8sAPIService(parent, args)
            return lst.filter(o=>parent['spec']['group']==o['spec']['group'])
        },    }
};

