import k8s from '@kubernetes/client-node';
import rfc6902  from 'rfc6902';
import {kc, cache, applyFilter, applyFieldSelection, getByPath, getMeta } from '../k8slibs.js';

const k8sApi = kc.makeApiClient(k8s.StorageV1Api);

export const mutations = {
    k8sVolumeAttachmentCreate: async (_parent, args: object) => {
        const payload = {
            apiVersion: 'storage.k8s.io/v1',
            kind: 'io.k8s.api.storage.v1.VolumeAttachment',
            metadata: getMeta(args),
            "spec": args['spec'],
        }
        try {
            const res = await k8sApi.createVolumeAttachment(payload)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    k8sVolumeAttachmentDelete: async (_parent, args: object) => {
    try {
        const res = await k8sApi.deleteVolumeAttachment(args['name'])
        return res.body
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
  },
    k8sVolumeAttachmentPatch: async (_parent, args: object) => {
        const request = {
            apiVersion: 'storage.k8s.io/v1',
            kind: 'io.k8s.api.storage.v1.VolumeAttachment',
            metadata: getMeta(args),
        }
        if (args['spec'] != undefined && args['spec'] != null)
            request["spec"] =  args['spec'];
        try {
            const resGet = await k8sApi.readVolumeAttachment(args['name'])
            const payload = rfc6902.createPatch(resGet.body,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await k8sApi.patchVolumeAttachment(args['name'], payload, undefined, undefined, undefined, undefined, undefined, options)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
export const lists = {
    k8sVolumeAttachment: async (_parent, args: object) => {
        let lst:Array<object>|undefined = cache.get('VolumeAttachment')
        if (lst==undefined) {
            try {
                const res = await k8sApi.listVolumeAttachment()
                lst = (res as object)['body']['items'] as Array<object>
                cache.set('VolumeAttachment', lst, 2);
            } catch (err) {
                console.error((err as object)['body']);
                return []
            }
        }
        return lst.filter(o=>applyFilter(o,args)).map(o=>applyFieldSelection(o,args))
    }
};
export const queries = {
    k8sVolumeAttachment: lists.k8sVolumeAttachment,
};
export const resolvers = {
};

