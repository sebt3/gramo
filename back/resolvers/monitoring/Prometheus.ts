import k8s from '@kubernetes/client-node';
import rfc6902  from 'rfc6902';
import {kc, cache, applyFilter, applyFieldSelection, getByPath, getMetaNS } from '../k8slibs.js';
import { lists as listService } from '../k8s/Service.js';
import { lists as listStatefulSet } from '../k8s/StatefulSet.js';
import { lists as listConfigMap } from '../k8s/ConfigMap.js';

const k8sApi = kc.makeApiClient(k8s.CustomObjectsApi);

export const mutations = {
    monitoringPrometheusCreate: async (_parent, args: object) => {
        const payload = {
            apiVersion: 'monitoring.coreos.com/v1',
            kind: 'com.coreos.monitoring.v1.Prometheus',
            metadata: getMetaNS(args),
            "spec": args['spec'],
        }
        try {
            const res = await k8sApi.createNamespacedCustomObject('monitoring.coreos.com','v1',args['namespace'],'prometheuses', payload)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    monitoringPrometheusDelete: async (_parent, args: object) => {
    try {
        const res = await k8sApi.deleteNamespacedCustomObject('monitoring.coreos.com','v1',args['namespace'],'prometheuses', args['name'])
        return res.body
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
  },
    monitoringPrometheusPatch: async (_parent, args: object) => {
        const request = {
            apiVersion: 'monitoring.coreos.com/v1',
            kind: 'com.coreos.monitoring.v1.Prometheus',
            metadata: getMetaNS(args),
        }
        if (args['spec'] != undefined && args['spec'] != null)
            request["spec"] =  args['spec'];
        try {
            const resGet = await k8sApi.getNamespacedCustomObject('monitoring.coreos.com','v1',args['namespace'],'prometheuses', args['name'])
            const payload = rfc6902.createPatch(resGet.body,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await k8sApi.patchNamespacedCustomObject('monitoring.coreos.com','v1',args['namespace'],'prometheuses', args['name'], payload, undefined, undefined, undefined, options)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
export const lists = {
    monitoringPrometheus: async (_parent, args: object) => {
        let lst:Array<object>|undefined = cache.get(`Prometheus.${args['namespace']}`)
        if (lst==undefined) {
            try {
                const res = await k8sApi.listNamespacedCustomObject('monitoring.coreos.com','v1',args['namespace'],'prometheuses')
                lst = (res as object)['body']['items'] as Array<object>
                cache.set(`Prometheus.${args['namespace']}`, lst, 2);
            } catch (err) {
                console.error((err as object)['body']);
                return []
            }
        }
        return lst.filter(o=>applyFilter(o,args)).map(o=>applyFieldSelection(o,args))
    }
};
export const resolvers = {
    monitoringPrometheus: {
        childService: async (parent, args: object) => {
            const lst = await listService.k8sService(parent,{namespace: parent['metadata']['namespace'], ...args})
            return lst.filter(r=>
                r.metadata['ownerReferences']!=null && r.metadata['ownerReferences']!=undefined &&
                r.metadata['ownerReferences'].filter(r=>r.kind=='Prometheus' && r.name == parent['metadata']['name']).length>0
            )
        },
        childStatefulSet: async (parent, args: object) => {
            const lst = await listStatefulSet.k8sStatefulSet(parent,{namespace: parent['metadata']['namespace'], ...args})
            return lst.filter(r=>
                r.metadata['ownerReferences']!=null && r.metadata['ownerReferences']!=undefined &&
                r.metadata['ownerReferences'].filter(r=>r.kind=='Prometheus' && r.name == parent['metadata']['name']).length>0
            )
        },
        childConfigMap: async (parent, args: object) => {
            const lst = await listConfigMap.k8sConfigMap(parent,{namespace: parent['metadata']['namespace'], ...args})
            return lst.filter(r=>
                r.metadata['ownerReferences']!=null && r.metadata['ownerReferences']!=undefined &&
                r.metadata['ownerReferences'].filter(r=>r.kind=='Prometheus' && r.name == parent['metadata']['name']).length>0
            )
        },
    }
};
export const nsResolver = {
    monitoringPrometheus: async (parent, args: object) => {
        return lists.monitoringPrometheus(parent,{namespace: parent.metadata.name, ...args})
    }
};

