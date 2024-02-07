import k8s from '@kubernetes/client-node';
import rfc6902  from 'rfc6902';
import {kc, cache, applyFilter, applyFieldSelection, getByPath, getMeta } from '../k8slibs.js';

const k8sApi = kc.makeApiClient(k8s.CustomObjectsApi);

export const mutations = {
    certmanagerClusterIssuerCreate: async (_parent, args: object) => {
        const payload = {
            apiVersion: 'cert-manager.io/v1',
            kind: 'io.cert-manager.v1.ClusterIssuer',
            metadata: getMeta(args),
            "spec": args['spec'],
        }
        try {
            const res = await k8sApi.createClusterCustomObject('cert-manager.io','v1','clusterissuers', payload)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    certmanagerClusterIssuerDelete: async (_parent, args: object) => {
    try {
        const res = await k8sApi.deleteClusterCustomObject('cert-manager.io','v1','clusterissuers', args['name'])
        return res.body
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
  },
    certmanagerClusterIssuerPatch: async (_parent, args: object) => {
        const request = {
            apiVersion: 'cert-manager.io/v1',
            kind: 'io.cert-manager.v1.ClusterIssuer',
            metadata: getMeta(args),
        }
        if (args['spec'] != undefined && args['spec'] != null)
            request["spec"] =  args['spec'];
        try {
            const resGet = await k8sApi.getClusterCustomObject('cert-manager.io','v1','clusterissuers', args['name'])
            const payload = rfc6902.createPatch(resGet.body,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await k8sApi.patchClusterCustomObject('cert-manager.io','v1','clusterissuers', args['name'], payload, undefined, undefined, undefined, options)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
export const lists = {
    certmanagerClusterIssuer: async (_parent, args: object) => {
        let lst:Array<object>|undefined = cache.get('ClusterIssuer')
        if (lst==undefined) {
            try {
                const res = await k8sApi.listClusterCustomObject('cert-manager.io','v1','clusterissuers')
                lst = (res as object)['body']['items'] as Array<object>
                cache.set('ClusterIssuer', lst, 2);
            } catch (err) {
                console.error((err as object)['body']);
                return []
            }
        }
        return lst.filter(o=>applyFilter(o,args)).map(o=>applyFieldSelection(o,args))
    }
};
export const queries = {
    certmanagerClusterIssuer: lists.certmanagerClusterIssuer,
};
export const resolvers = {
};

