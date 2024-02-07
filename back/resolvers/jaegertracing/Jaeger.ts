import k8s from '@kubernetes/client-node';
import rfc6902  from 'rfc6902';
import {kc, cache, applyFilter, applyFieldSelection, getByPath, getMetaNS } from '../k8slibs.js';

const k8sApi = kc.makeApiClient(k8s.CustomObjectsApi);

export const mutations = {
    jaegertracingJaegerCreate: async (_parent, args: object) => {
        const payload = {
            apiVersion: 'jaegertracing.io/v1',
            kind: 'io.jaegertracing.v1.Jaeger',
            metadata: getMetaNS(args),
            "spec": args['spec'],
        }
        try {
            const res = await k8sApi.createNamespacedCustomObject('jaegertracing.io','v1',args['namespace'],'jaegers', payload)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    jaegertracingJaegerDelete: async (_parent, args: object) => {
    try {
        const res = await k8sApi.deleteNamespacedCustomObject('jaegertracing.io','v1',args['namespace'],'jaegers', args['name'])
        return res.body
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
  },
    jaegertracingJaegerPatch: async (_parent, args: object) => {
        const request = {
            apiVersion: 'jaegertracing.io/v1',
            kind: 'io.jaegertracing.v1.Jaeger',
            metadata: getMetaNS(args),
        }
        if (args['spec'] != undefined && args['spec'] != null)
            request["spec"] =  args['spec'];
        try {
            const resGet = await k8sApi.getNamespacedCustomObject('jaegertracing.io','v1',args['namespace'],'jaegers', args['name'])
            const payload = rfc6902.createPatch(resGet.body,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await k8sApi.patchNamespacedCustomObject('jaegertracing.io','v1',args['namespace'],'jaegers', args['name'], payload, undefined, undefined, undefined, options)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
export const lists = {
    jaegertracingJaeger: async (_parent, args: object) => {
        let lst:Array<object>|undefined = cache.get(`Jaeger.${args['namespace']}`)
        if (lst==undefined) {
            try {
                const res = await k8sApi.listNamespacedCustomObject('jaegertracing.io','v1',args['namespace'],'jaegers')
                lst = (res as object)['body']['items'] as Array<object>
                cache.set(`Jaeger.${args['namespace']}`, lst, 2);
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
    jaegertracingJaeger: async (parent, args: object) => {
        return lists.jaegertracingJaeger(parent,{namespace: parent.metadata.name, ...args})
    }
};

