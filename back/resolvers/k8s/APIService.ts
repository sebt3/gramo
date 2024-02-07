import k8s from '@kubernetes/client-node';
import rfc6902  from 'rfc6902';
import {kc, cache, applyFilter, applyFieldSelection, getByPath, getMeta } from '../k8slibs.js';
import { lists as listCustomResourceDefinition } from '../k8s/CustomResourceDefinition.js';

const k8sApi = kc.makeApiClient(k8s.ApiregistrationV1Api);

export const mutations = {
    k8sAPIServiceCreate: async (_parent, args: object) => {
        const payload = {
            apiVersion: 'apiregistration.k8s.io/v1',
            kind: 'io.k8s.kube-aggregator.pkg.apis.apiregistration.v1.APIService',
            metadata: getMeta(args),
            "spec": args['spec'],
        }
        try {
            const res = await k8sApi.createAPIService(payload)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    k8sAPIServiceDelete: async (_parent, args: object) => {
    try {
        const res = await k8sApi.deleteAPIService(args['name'])
        return res.body
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
  },
    k8sAPIServicePatch: async (_parent, args: object) => {
        const request = {
            apiVersion: 'apiregistration.k8s.io/v1',
            kind: 'io.k8s.kube-aggregator.pkg.apis.apiregistration.v1.APIService',
            metadata: getMeta(args),
        }
        if (args['spec'] != undefined && args['spec'] != null)
            request["spec"] =  args['spec'];
        try {
            const resGet = await k8sApi.readAPIService(args['name'])
            const payload = rfc6902.createPatch(resGet.body,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await k8sApi.patchAPIService(args['name'], payload, undefined, undefined, undefined, undefined, undefined, options)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
export const lists = {
    k8sAPIService: async (_parent, args: object) => {
        let lst:Array<object>|undefined = cache.get('APIService')
        if (lst==undefined) {
            try {
                const res = await k8sApi.listAPIService()
                lst = (res as object)['body']['items'] as Array<object>
                cache.set('APIService', lst, 2);
            } catch (err) {
                console.error((err as object)['body']);
                return []
            }
        }
        return lst.filter(o=>applyFilter(o,args)).map(o=>applyFieldSelection(o,args))
    }
};
export const queries = {
    k8sAPIService: lists.k8sAPIService,
};
export const resolvers = {
    k8sAPIService: {
        provideCustomResourceDefinition: async (parent, args: object) => {
            const lst = await listCustomResourceDefinition.k8sCustomResourceDefinition(parent, args)
            return lst.filter(o=>parent['spec']['group']==o['spec']['group'])
        },    }
};

