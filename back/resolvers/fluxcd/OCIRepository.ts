import k8s from '@kubernetes/client-node';
import rfc6902  from 'rfc6902';
import {kc, cache, applyFilter, applyFieldSelection, getByPath, getMetaNS } from '../k8slibs.js';

const k8sApi = kc.makeApiClient(k8s.CustomObjectsApi);

export const mutations = {
    fluxcdOCIRepositoryCreate: async (_parent, args: object) => {
        const payload = {
            apiVersion: 'source.toolkit.fluxcd.io/v1beta2',
            kind: 'io.fluxcd.toolkit.source.v1beta2.OCIRepository',
            metadata: getMetaNS(args),
            "spec": args['spec'],
        }
        try {
            const res = await k8sApi.createNamespacedCustomObject('source.toolkit.fluxcd.io','v1beta2',args['namespace'],'ocirepositories', payload)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    fluxcdOCIRepositoryDelete: async (_parent, args: object) => {
    try {
        const res = await k8sApi.deleteNamespacedCustomObject('source.toolkit.fluxcd.io','v1beta2',args['namespace'],'ocirepositories', args['name'])
        return res.body
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
  },
    fluxcdOCIRepositoryPatch: async (_parent, args: object) => {
        const request = {
            apiVersion: 'source.toolkit.fluxcd.io/v1beta2',
            kind: 'io.fluxcd.toolkit.source.v1beta2.OCIRepository',
            metadata: getMetaNS(args),
        }
        if (args['spec'] != undefined && args['spec'] != null)
            request["spec"] =  args['spec'];
        try {
            const resGet = await k8sApi.getNamespacedCustomObject('source.toolkit.fluxcd.io','v1beta2',args['namespace'],'ocirepositories', args['name'])
            const payload = rfc6902.createPatch(resGet.body,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await k8sApi.patchNamespacedCustomObject('source.toolkit.fluxcd.io','v1beta2',args['namespace'],'ocirepositories', args['name'], payload, undefined, undefined, undefined, options)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
export const lists = {
    fluxcdOCIRepository: async (_parent, args: object) => {
        let lst:Array<object>|undefined = cache.get(`OCIRepository.${args['namespace']}`)
        if (lst==undefined) {
            try {
                const res = await k8sApi.listNamespacedCustomObject('source.toolkit.fluxcd.io','v1beta2',args['namespace'],'ocirepositories')
                lst = (res as object)['body']['items'] as Array<object>
                cache.set(`OCIRepository.${args['namespace']}`, lst, 2);
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
    fluxcdOCIRepository: async (parent, args: object) => {
        return lists.fluxcdOCIRepository(parent,{namespace: parent.metadata.name, ...args})
    }
};

