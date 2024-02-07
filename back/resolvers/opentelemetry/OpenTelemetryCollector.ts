import k8s from '@kubernetes/client-node';
import rfc6902  from 'rfc6902';
import {kc, cache, applyFilter, applyFieldSelection, getByPath, getMetaNS } from '../k8slibs.js';

const k8sApi = kc.makeApiClient(k8s.CustomObjectsApi);

export const mutations = {
    opentelemetryOpenTelemetryCollectorCreate: async (_parent, args: object) => {
        const payload = {
            apiVersion: 'opentelemetry.io/v1alpha1',
            kind: 'io.opentelemetry.v1alpha1.OpenTelemetryCollector',
            metadata: getMetaNS(args),
            "spec": args['spec'],
        }
        try {
            const res = await k8sApi.createNamespacedCustomObject('opentelemetry.io','v1alpha1',args['namespace'],'opentelemetrycollectors', payload)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    opentelemetryOpenTelemetryCollectorDelete: async (_parent, args: object) => {
    try {
        const res = await k8sApi.deleteNamespacedCustomObject('opentelemetry.io','v1alpha1',args['namespace'],'opentelemetrycollectors', args['name'])
        return res.body
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
  },
    opentelemetryOpenTelemetryCollectorPatch: async (_parent, args: object) => {
        const request = {
            apiVersion: 'opentelemetry.io/v1alpha1',
            kind: 'io.opentelemetry.v1alpha1.OpenTelemetryCollector',
            metadata: getMetaNS(args),
        }
        if (args['spec'] != undefined && args['spec'] != null)
            request["spec"] =  args['spec'];
        try {
            const resGet = await k8sApi.getNamespacedCustomObject('opentelemetry.io','v1alpha1',args['namespace'],'opentelemetrycollectors', args['name'])
            const payload = rfc6902.createPatch(resGet.body,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await k8sApi.patchNamespacedCustomObject('opentelemetry.io','v1alpha1',args['namespace'],'opentelemetrycollectors', args['name'], payload, undefined, undefined, undefined, options)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
export const lists = {
    opentelemetryOpenTelemetryCollector: async (_parent, args: object) => {
        let lst:Array<object>|undefined = cache.get(`OpenTelemetryCollector.${args['namespace']}`)
        if (lst==undefined) {
            try {
                const res = await k8sApi.listNamespacedCustomObject('opentelemetry.io','v1alpha1',args['namespace'],'opentelemetrycollectors')
                lst = (res as object)['body']['items'] as Array<object>
                cache.set(`OpenTelemetryCollector.${args['namespace']}`, lst, 2);
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
    opentelemetryOpenTelemetryCollector: async (parent, args: object) => {
        return lists.opentelemetryOpenTelemetryCollector(parent,{namespace: parent.metadata.name, ...args})
    }
};

