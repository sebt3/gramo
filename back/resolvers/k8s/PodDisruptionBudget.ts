import k8s from '@kubernetes/client-node';
import rfc6902  from 'rfc6902';
import {kc, cache, applyFilter, applyFieldSelection, getByPath, getMetaNS } from '../k8slibs.js';
import { lists as listCluster } from '../cnpg/Cluster.js';

const k8sApi = kc.makeApiClient(k8s.PolicyV1Api);

export const mutations = {
    k8sPodDisruptionBudgetCreate: async (_parent, args: object) => {
        const payload = {
            apiVersion: 'policy/v1',
            kind: 'io.k8s.api.policy.v1.PodDisruptionBudget',
            metadata: getMetaNS(args),
            "spec": args['spec'],
        }
        try {
            const res = await k8sApi.createNamespacedPodDisruptionBudget(args['namespace'], payload)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    k8sPodDisruptionBudgetDelete: async (_parent, args: object) => {
    try {
        const res = await k8sApi.deleteNamespacedPodDisruptionBudget(args['namespace'], args['name'])
        return res.body
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
  },
    k8sPodDisruptionBudgetPatch: async (_parent, args: object) => {
        const request = {
            apiVersion: 'policy/v1',
            kind: 'io.k8s.api.policy.v1.PodDisruptionBudget',
            metadata: getMetaNS(args),
        }
        if (args['spec'] != undefined && args['spec'] != null)
            request["spec"] =  args['spec'];
        try {
            const resGet = await k8sApi.readNamespacedPodDisruptionBudget(args['namespace'], args['name'])
            const payload = rfc6902.createPatch(resGet.body,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await k8sApi.patchNamespacedPodDisruptionBudget(args['namespace'], args['name'], payload, undefined, undefined, undefined, undefined, undefined, options)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
export const lists = {
    k8sPodDisruptionBudget: async (_parent, args: object) => {
        let lst:Array<object>|undefined = cache.get(`PodDisruptionBudget.${args['namespace']}`)
        if (lst==undefined) {
            try {
                const res = await k8sApi.listNamespacedPodDisruptionBudget(args['namespace'])
                lst = (res as object)['body']['items'] as Array<object>
                cache.set(`PodDisruptionBudget.${args['namespace']}`, lst, 2);
            } catch (err) {
                console.error((err as object)['body']);
                return []
            }
        }
        return lst.filter(o=>applyFilter(o,args)).map(o=>applyFieldSelection(o,args))
    }
};
export const resolvers = {
    k8sPodDisruptionBudget: {
        parentCluster: async (child, args: object) => {
            if (child.metadata['ownerReferences']==null || child.metadata['ownerReferences']==undefined || child.metadata['ownerReferences'].filter(r=>r.kind=='Cluster').length<1) return null;
            const lst = await listCluster.cnpgCluster(child,{namespace: child['metadata']['namespace'], ...args})
            return lst.filter(o=>child.metadata['ownerReferences'].filter(r=>r.kind=='Cluster'&&r.name==o['metadata']['name']).length>0)
        },
    }
};
export const nsResolver = {
    k8sPodDisruptionBudget: async (parent, args: object) => {
        return lists.k8sPodDisruptionBudget(parent,{namespace: parent.metadata.name, ...args})
    }
};

