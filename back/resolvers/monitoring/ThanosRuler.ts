import k8s from '@kubernetes/client-node';
import rfc6902  from 'rfc6902';
import {kc, cache, applyFilter, applyFieldSelection, getByPath, getMetaNS } from '../k8slibs.js';

const k8sApi = kc.makeApiClient(k8s.CustomObjectsApi);

export const mutations = {
    monitoringThanosRulerCreate: async (_parent, args: object) => {
        const payload = {
            apiVersion: 'monitoring.coreos.com/v1',
            kind: 'com.coreos.monitoring.v1.ThanosRuler',
            metadata: getMetaNS(args),
            "spec": args['spec'],
        }
        try {
            const res = await k8sApi.createNamespacedCustomObject('monitoring.coreos.com','v1',args['namespace'],'thanosrulers', payload)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    monitoringThanosRulerDelete: async (_parent, args: object) => {
    try {
        const res = await k8sApi.deleteNamespacedCustomObject('monitoring.coreos.com','v1',args['namespace'],'thanosrulers', args['name'])
        return res.body
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
  },
    monitoringThanosRulerPatch: async (_parent, args: object) => {
        const request = {
            apiVersion: 'monitoring.coreos.com/v1',
            kind: 'com.coreos.monitoring.v1.ThanosRuler',
            metadata: getMetaNS(args),
        }
        if (args['spec'] != undefined && args['spec'] != null)
            request["spec"] =  args['spec'];
        try {
            const resGet = await k8sApi.getNamespacedCustomObject('monitoring.coreos.com','v1',args['namespace'],'thanosrulers', args['name'])
            const payload = rfc6902.createPatch(resGet.body,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await k8sApi.patchNamespacedCustomObject('monitoring.coreos.com','v1',args['namespace'],'thanosrulers', args['name'], payload, undefined, undefined, undefined, options)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
export const lists = {
    monitoringThanosRuler: async (_parent, args: object) => {
        let lst:Array<object>|undefined = cache.get(`ThanosRuler.${args['namespace']}`)
        if (lst==undefined) {
            try {
                const res = await k8sApi.listNamespacedCustomObject('monitoring.coreos.com','v1',args['namespace'],'thanosrulers')
                lst = (res as object)['body']['items'] as Array<object>
                cache.set(`ThanosRuler.${args['namespace']}`, lst, 2);
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
    monitoringThanosRuler: async (parent, args: object) => {
        return lists.monitoringThanosRuler(parent,{namespace: parent.metadata.name, ...args})
    }
};

