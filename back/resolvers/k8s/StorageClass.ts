import k8s from '@kubernetes/client-node';
import rfc6902  from 'rfc6902';
import {kc, cache, applyFilter, applyFieldSelection, getByPath, getMeta } from '../k8slibs.js';
import { lists as listPersistentVolume } from '../k8s/PersistentVolume.js';
import { lists as listPersistentVolumeClaim } from '../k8s/PersistentVolumeClaim.js';
import { lists as listNamespace } from '../k8s/Namespace.js';

const k8sApi = kc.makeApiClient(k8s.StorageV1Api);

export const mutations = {
    k8sStorageClassCreate: async (_parent, args: object) => {
        const payload = {
            apiVersion: 'storage.k8s.io/v1',
            kind: 'io.k8s.api.storage.v1.StorageClass',
            metadata: getMeta(args),
            "allowVolumeExpansion": args['allowVolumeExpansion'],
            "allowedTopologies": args['allowedTopologies'],
            "mountOptions": args['mountOptions'],
            "parameters": args['parameters'],
            "provisioner": args['provisioner'],
            "reclaimPolicy": args['reclaimPolicy'],
            "volumeBindingMode": args['volumeBindingMode'],
        }
        try {
            const res = await k8sApi.createStorageClass(payload)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    k8sStorageClassDelete: async (_parent, args: object) => {
    try {
        const res = await k8sApi.deleteStorageClass(args['name'])
        return res.body
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
  },
    k8sStorageClassPatch: async (_parent, args: object) => {
        const request = {
            apiVersion: 'storage.k8s.io/v1',
            kind: 'io.k8s.api.storage.v1.StorageClass',
            metadata: getMeta(args),
        }
        if (args['allowVolumeExpansion'] != undefined && args['allowVolumeExpansion'] != null)
            request["allowVolumeExpansion"] =  args['allowVolumeExpansion'];
        if (args['allowedTopologies'] != undefined && args['allowedTopologies'] != null)
            request["allowedTopologies"] =  args['allowedTopologies'];
        if (args['mountOptions'] != undefined && args['mountOptions'] != null)
            request["mountOptions"] =  args['mountOptions'];
        if (args['parameters'] != undefined && args['parameters'] != null)
            request["parameters"] =  args['parameters'];
        if (args['provisioner'] != undefined && args['provisioner'] != null)
            request["provisioner"] =  args['provisioner'];
        if (args['reclaimPolicy'] != undefined && args['reclaimPolicy'] != null)
            request["reclaimPolicy"] =  args['reclaimPolicy'];
        if (args['volumeBindingMode'] != undefined && args['volumeBindingMode'] != null)
            request["volumeBindingMode"] =  args['volumeBindingMode'];
        try {
            const resGet = await k8sApi.readStorageClass(args['name'])
            const payload = rfc6902.createPatch(resGet.body,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await k8sApi.patchStorageClass(args['name'], payload, undefined, undefined, undefined, undefined, undefined, options)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
export const lists = {
    k8sStorageClass: async (_parent, args: object) => {
        let lst:Array<object>|undefined = cache.get('StorageClass')
        if (lst==undefined) {
            try {
                const res = await k8sApi.listStorageClass()
                lst = (res as object)['body']['items'] as Array<object>
                cache.set('StorageClass', lst, 2);
            } catch (err) {
                console.error((err as object)['body']);
                return []
            }
        }
        return lst.filter(o=>applyFilter(o,args)).map(o=>applyFieldSelection(o,args))
    }
};
export const queries = {
    k8sStorageClass: lists.k8sStorageClass,
};
export const resolvers = {
    k8sStorageClass: {
        providePersistentVolume: async (user, args: object) => {
            const lst = await listPersistentVolume.k8sPersistentVolume(user, args)
            return lst.filter(r=>r['spec']['storageClassName']==user['metadata']['name'])
        },
        providePersistentVolumeClaim: async (user, args: object) => {
            const nss = await listNamespace.k8sNamespace(user, args)
            return (await Promise.all(nss.map(n=>n['metadata']['name']).map(async (ns)=>{
                const lst = await listPersistentVolumeClaim.k8sPersistentVolumeClaim(user, {namespace: ns, ...args})
                return lst.filter(r=>r['spec']['storageClassName']==user['metadata']['name'])
            }))).flat().filter((v)=>v!=null)
        },
    }
};

