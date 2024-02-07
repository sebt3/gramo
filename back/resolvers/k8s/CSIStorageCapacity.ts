import k8s from '@kubernetes/client-node';
import rfc6902  from 'rfc6902';
import {kc, cache, applyFilter, applyFieldSelection, getByPath, getMetaNS } from '../k8slibs.js';

const k8sApi = kc.makeApiClient(k8s.StorageV1Api);

export const mutations = {
    k8sCSIStorageCapacityCreate: async (_parent, args: object) => {
        const payload = {
            apiVersion: 'storage.k8s.io/v1',
            kind: 'io.k8s.api.storage.v1.CSIStorageCapacity',
            metadata: getMetaNS(args),
            "capacity": args['capacity'],
            "maximumVolumeSize": args['maximumVolumeSize'],
            "nodeTopology": args['nodeTopology'],
            "storageClassName": args['storageClassName'],
        }
        try {
            const res = await k8sApi.createNamespacedCSIStorageCapacity(args['namespace'], payload)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    k8sCSIStorageCapacityDelete: async (_parent, args: object) => {
    try {
        const res = await k8sApi.deleteNamespacedCSIStorageCapacity(args['namespace'], args['name'])
        return res.body
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
  },
    k8sCSIStorageCapacityPatch: async (_parent, args: object) => {
        const request = {
            apiVersion: 'storage.k8s.io/v1',
            kind: 'io.k8s.api.storage.v1.CSIStorageCapacity',
            metadata: getMetaNS(args),
        }
        if (args['capacity'] != undefined && args['capacity'] != null)
            request["capacity"] =  args['capacity'];
        if (args['maximumVolumeSize'] != undefined && args['maximumVolumeSize'] != null)
            request["maximumVolumeSize"] =  args['maximumVolumeSize'];
        if (args['nodeTopology'] != undefined && args['nodeTopology'] != null)
            request["nodeTopology"] =  args['nodeTopology'];
        if (args['storageClassName'] != undefined && args['storageClassName'] != null)
            request["storageClassName"] =  args['storageClassName'];
        try {
            const resGet = await k8sApi.readNamespacedCSIStorageCapacity(args['namespace'], args['name'])
            const payload = rfc6902.createPatch(resGet.body,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await k8sApi.patchNamespacedCSIStorageCapacity(args['namespace'], args['name'], payload, undefined, undefined, undefined, undefined, undefined, options)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
export const lists = {
    k8sCSIStorageCapacity: async (_parent, args: object) => {
        let lst:Array<object>|undefined = cache.get(`CSIStorageCapacity.${args['namespace']}`)
        if (lst==undefined) {
            try {
                const res = await k8sApi.listNamespacedCSIStorageCapacity(args['namespace'])
                lst = (res as object)['body']['items'] as Array<object>
                cache.set(`CSIStorageCapacity.${args['namespace']}`, lst, 2);
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
    k8sCSIStorageCapacity: async (parent, args: object) => {
        return lists.k8sCSIStorageCapacity(parent,{namespace: parent.metadata.name, ...args})
    }
};

