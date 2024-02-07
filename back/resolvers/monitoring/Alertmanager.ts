import k8s from '@kubernetes/client-node';
import rfc6902  from 'rfc6902';
import {kc, cache, applyFilter, applyFieldSelection, getByPath, getMetaNS } from '../k8slibs.js';
import { lists as listService } from '../k8s/Service.js';
import { lists as listStatefulSet } from '../k8s/StatefulSet.js';

const k8sApi = kc.makeApiClient(k8s.CustomObjectsApi);

export const mutations = {
    monitoringAlertmanagerCreate: async (_parent, args: object) => {
        const payload = {
            apiVersion: 'monitoring.coreos.com/v1',
            kind: 'com.coreos.monitoring.v1.Alertmanager',
            metadata: getMetaNS(args),
            "spec": args['spec'],
        }
        try {
            const res = await k8sApi.createNamespacedCustomObject('monitoring.coreos.com','v1',args['namespace'],'alertmanagers', payload)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    monitoringAlertmanagerDelete: async (_parent, args: object) => {
    try {
        const res = await k8sApi.deleteNamespacedCustomObject('monitoring.coreos.com','v1',args['namespace'],'alertmanagers', args['name'])
        return res.body
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
  },
    monitoringAlertmanagerPatch: async (_parent, args: object) => {
        const request = {
            apiVersion: 'monitoring.coreos.com/v1',
            kind: 'com.coreos.monitoring.v1.Alertmanager',
            metadata: getMetaNS(args),
        }
        if (args['spec'] != undefined && args['spec'] != null)
            request["spec"] =  args['spec'];
        try {
            const resGet = await k8sApi.getNamespacedCustomObject('monitoring.coreos.com','v1',args['namespace'],'alertmanagers', args['name'])
            const payload = rfc6902.createPatch(resGet.body,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await k8sApi.patchNamespacedCustomObject('monitoring.coreos.com','v1',args['namespace'],'alertmanagers', args['name'], payload, undefined, undefined, undefined, options)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
export const lists = {
    monitoringAlertmanager: async (_parent, args: object) => {
        let lst:Array<object>|undefined = cache.get(`Alertmanager.${args['namespace']}`)
        if (lst==undefined) {
            try {
                const res = await k8sApi.listNamespacedCustomObject('monitoring.coreos.com','v1',args['namespace'],'alertmanagers')
                lst = (res as object)['body']['items'] as Array<object>
                cache.set(`Alertmanager.${args['namespace']}`, lst, 2);
            } catch (err) {
                console.error((err as object)['body']);
                return []
            }
        }
        return lst.filter(o=>applyFilter(o,args)).map(o=>applyFieldSelection(o,args))
    }
};
export const resolvers = {
    monitoringAlertmanager: {
        childService: async (parent, args: object) => {
            const lst = await listService.k8sService(parent,{namespace: parent['metadata']['namespace'], ...args})
            return lst.filter(r=>
                r.metadata['ownerReferences']!=null && r.metadata['ownerReferences']!=undefined &&
                r.metadata['ownerReferences'].filter(r=>r.kind=='Alertmanager' && r.name == parent['metadata']['name']).length>0
            )
        },
        childStatefulSet: async (parent, args: object) => {
            const lst = await listStatefulSet.k8sStatefulSet(parent,{namespace: parent['metadata']['namespace'], ...args})
            return lst.filter(r=>
                r.metadata['ownerReferences']!=null && r.metadata['ownerReferences']!=undefined &&
                r.metadata['ownerReferences'].filter(r=>r.kind=='Alertmanager' && r.name == parent['metadata']['name']).length>0
            )
        },
    }
};
export const nsResolver = {
    monitoringAlertmanager: async (parent, args: object) => {
        return lists.monitoringAlertmanager(parent,{namespace: parent.metadata.name, ...args})
    }
};

