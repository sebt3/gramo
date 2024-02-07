import k8s from '@kubernetes/client-node';
import rfc6902  from 'rfc6902';
import {kc, cache, applyFilter, applyFieldSelection, getByPath, getMeta } from '../k8slibs.js';

const k8sApi = kc.makeApiClient(k8s.SchedulingV1Api);

export const mutations = {
    k8sPriorityClassCreate: async (_parent, args: object) => {
        const payload = {
            apiVersion: 'scheduling.k8s.io/v1',
            kind: 'io.k8s.api.scheduling.v1.PriorityClass',
            metadata: getMeta(args),
            "description": args['description'],
            "globalDefault": args['globalDefault'],
            "preemptionPolicy": args['preemptionPolicy'],
            "value": args['value'],
        }
        try {
            const res = await k8sApi.createPriorityClass(payload)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    k8sPriorityClassDelete: async (_parent, args: object) => {
    try {
        const res = await k8sApi.deletePriorityClass(args['name'])
        return res.body
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
  },
    k8sPriorityClassPatch: async (_parent, args: object) => {
        const request = {
            apiVersion: 'scheduling.k8s.io/v1',
            kind: 'io.k8s.api.scheduling.v1.PriorityClass',
            metadata: getMeta(args),
        }
        if (args['description'] != undefined && args['description'] != null)
            request["description"] =  args['description'];
        if (args['globalDefault'] != undefined && args['globalDefault'] != null)
            request["globalDefault"] =  args['globalDefault'];
        if (args['preemptionPolicy'] != undefined && args['preemptionPolicy'] != null)
            request["preemptionPolicy"] =  args['preemptionPolicy'];
        if (args['value'] != undefined && args['value'] != null)
            request["value"] =  args['value'];
        try {
            const resGet = await k8sApi.readPriorityClass(args['name'])
            const payload = rfc6902.createPatch(resGet.body,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await k8sApi.patchPriorityClass(args['name'], payload, undefined, undefined, undefined, undefined, undefined, options)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
export const lists = {
    k8sPriorityClass: async (_parent, args: object) => {
        let lst:Array<object>|undefined = cache.get('PriorityClass')
        if (lst==undefined) {
            try {
                const res = await k8sApi.listPriorityClass()
                lst = (res as object)['body']['items'] as Array<object>
                cache.set('PriorityClass', lst, 2);
            } catch (err) {
                console.error((err as object)['body']);
                return []
            }
        }
        return lst.filter(o=>applyFilter(o,args)).map(o=>applyFieldSelection(o,args))
    }
};
export const queries = {
    k8sPriorityClass: lists.k8sPriorityClass,
};
export const resolvers = {
};

