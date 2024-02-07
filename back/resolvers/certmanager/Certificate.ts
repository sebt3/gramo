import k8s from '@kubernetes/client-node';
import rfc6902  from 'rfc6902';
import {kc, cache, applyFilter, applyFieldSelection, getByPath, getMetaNS } from '../k8slibs.js';

const k8sApi = kc.makeApiClient(k8s.CustomObjectsApi);

export const mutations = {
    certmanagerCertificateCreate: async (_parent, args: object) => {
        const payload = {
            apiVersion: 'cert-manager.io/v1',
            kind: 'io.cert-manager.v1.Certificate',
            metadata: getMetaNS(args),
            "spec": args['spec'],
        }
        try {
            const res = await k8sApi.createNamespacedCustomObject('cert-manager.io','v1',args['namespace'],'certificates', payload)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    certmanagerCertificateDelete: async (_parent, args: object) => {
    try {
        const res = await k8sApi.deleteNamespacedCustomObject('cert-manager.io','v1',args['namespace'],'certificates', args['name'])
        return res.body
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
  },
    certmanagerCertificatePatch: async (_parent, args: object) => {
        const request = {
            apiVersion: 'cert-manager.io/v1',
            kind: 'io.cert-manager.v1.Certificate',
            metadata: getMetaNS(args),
        }
        if (args['spec'] != undefined && args['spec'] != null)
            request["spec"] =  args['spec'];
        try {
            const resGet = await k8sApi.getNamespacedCustomObject('cert-manager.io','v1',args['namespace'],'certificates', args['name'])
            const payload = rfc6902.createPatch(resGet.body,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await k8sApi.patchNamespacedCustomObject('cert-manager.io','v1',args['namespace'],'certificates', args['name'], payload, undefined, undefined, undefined, options)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
export const lists = {
    certmanagerCertificate: async (_parent, args: object) => {
        let lst:Array<object>|undefined = cache.get(`Certificate.${args['namespace']}`)
        if (lst==undefined) {
            try {
                const res = await k8sApi.listNamespacedCustomObject('cert-manager.io','v1',args['namespace'],'certificates')
                lst = (res as object)['body']['items'] as Array<object>
                cache.set(`Certificate.${args['namespace']}`, lst, 2);
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
    certmanagerCertificate: async (parent, args: object) => {
        return lists.certmanagerCertificate(parent,{namespace: parent.metadata.name, ...args})
    }
};

