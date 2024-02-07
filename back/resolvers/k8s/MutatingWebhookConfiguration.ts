import k8s from '@kubernetes/client-node';
import rfc6902  from 'rfc6902';
import {kc, cache, applyFilter, applyFieldSelection, getByPath, getMeta } from '../k8slibs.js';

const k8sApi = kc.makeApiClient(k8s.AdmissionregistrationV1Api);

export const mutations = {
    k8sMutatingWebhookConfigurationCreate: async (_parent, args: object) => {
        const payload = {
            apiVersion: 'admissionregistration.k8s.io/v1',
            kind: 'io.k8s.api.admissionregistration.v1.MutatingWebhookConfiguration',
            metadata: getMeta(args),
            "webhooks": args['webhooks'],
        }
        try {
            const res = await k8sApi.createMutatingWebhookConfiguration(payload)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    k8sMutatingWebhookConfigurationDelete: async (_parent, args: object) => {
    try {
        const res = await k8sApi.deleteMutatingWebhookConfiguration(args['name'])
        return res.body
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
  },
    k8sMutatingWebhookConfigurationPatch: async (_parent, args: object) => {
        const request = {
            apiVersion: 'admissionregistration.k8s.io/v1',
            kind: 'io.k8s.api.admissionregistration.v1.MutatingWebhookConfiguration',
            metadata: getMeta(args),
        }
        if (args['webhooks'] != undefined && args['webhooks'] != null)
            request["webhooks"] =  args['webhooks'];
        try {
            const resGet = await k8sApi.readMutatingWebhookConfiguration(args['name'])
            const payload = rfc6902.createPatch(resGet.body,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await k8sApi.patchMutatingWebhookConfiguration(args['name'], payload, undefined, undefined, undefined, undefined, undefined, options)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
export const lists = {
    k8sMutatingWebhookConfiguration: async (_parent, args: object) => {
        let lst:Array<object>|undefined = cache.get('MutatingWebhookConfiguration')
        if (lst==undefined) {
            try {
                const res = await k8sApi.listMutatingWebhookConfiguration()
                lst = (res as object)['body']['items'] as Array<object>
                cache.set('MutatingWebhookConfiguration', lst, 2);
            } catch (err) {
                console.error((err as object)['body']);
                return []
            }
        }
        return lst.filter(o=>applyFilter(o,args)).map(o=>applyFieldSelection(o,args))
    }
};
export const queries = {
    k8sMutatingWebhookConfiguration: lists.k8sMutatingWebhookConfiguration,
};
export const resolvers = {
};

