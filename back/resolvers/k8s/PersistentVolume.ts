import k8s from '@kubernetes/client-node';
import rfc6902  from 'rfc6902';
import {kc, cache, applyFilter, applyFieldSelection, getByPath, getMeta } from '../k8slibs.js';
import { lists as listStorageClass } from '../k8s/StorageClass.js';
import { lists as listPersistentVolumeClaim } from '../k8s/PersistentVolumeClaim.js';

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

export const mutations = {
    k8sPersistentVolumeCreate: async (_parent, args: object) => {
        const payload = {
            apiVersion: '/v1',
            kind: 'io.k8s.api.core.v1.PersistentVolume',
            metadata: getMeta(args),
            "spec": args['spec'],
        }
        try {
            const res = await k8sApi.createPersistentVolume(payload)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    k8sPersistentVolumeDelete: async (_parent, args: object) => {
    try {
        const res = await k8sApi.deletePersistentVolume(args['name'])
        return res.body
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
  },
    k8sPersistentVolumePatch: async (_parent, args: object) => {
        const request = {
            apiVersion: '/v1',
            kind: 'io.k8s.api.core.v1.PersistentVolume',
            metadata: getMeta(args),
        }
        if (args['spec'] != undefined && args['spec'] != null)
            request["spec"] =  args['spec'];
        try {
            const resGet = await k8sApi.readPersistentVolume(args['name'])
            const payload = rfc6902.createPatch(resGet.body,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await k8sApi.patchPersistentVolume(args['name'], payload, undefined, undefined, undefined, undefined, undefined, options)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
export const lists = {
    k8sPersistentVolume: async (_parent, args: object) => {
        let lst:Array<object>|undefined = cache.get('PersistentVolume')
        if (lst==undefined) {
            try {
                const res = await k8sApi.listPersistentVolume()
                lst = (res as object)['body']['items'] as Array<object>
                cache.set('PersistentVolume', lst, 2);
            } catch (err) {
                console.error((err as object)['body']);
                return []
            }
        }
        return lst.filter(o=>applyFilter(o,args)).map(o=>applyFieldSelection(o,args))
    }
};
export const queries = {
    k8sPersistentVolume: lists.k8sPersistentVolume,
};
export const resolvers = {
    k8sPersistentVolume: {
        providedToStorageClass: async (used, args: object) => {
            const lst = await listStorageClass.k8sStorageClass(used,args)
            return lst.filter(r=>r['metadata']['name']==used['spec']['storageClassName'])
        },
        usedByPersistentVolumeClaim: async (parent, args: object) => {
            if(parent['spec']['claimRef']['kind']!='PersistentVolumeClaim') return null;
            const lst = await listPersistentVolumeClaim.k8sPersistentVolumeClaim(parent,{namespace: parent['spec']['claimRef']['namespace'], ...args})
            return lst.filter(r=>r['metadata']['name']==parent['spec']['claimRef']['name'])
        },
    }
};

