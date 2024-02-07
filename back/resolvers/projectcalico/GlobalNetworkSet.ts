import k8s from '@kubernetes/client-node';
import rfc6902  from 'rfc6902';
import {kc, cache, applyFilter, applyFieldSelection, getByPath, getMeta } from '../k8slibs.js';

const k8sApi = kc.makeApiClient(k8s.CustomObjectsApi);

export const mutations = {
    projectcalicoGlobalNetworkSetCreate: async (_parent, args: object) => {
        const payload = {
            apiVersion: 'crd.projectcalico.org/v1',
            kind: 'org.projectcalico.crd.v1.GlobalNetworkSet',
            metadata: getMeta(args),
            "spec": args['spec'],
        }
        try {
            const res = await k8sApi.createClusterCustomObject('crd.projectcalico.org','v1','globalnetworksets', payload)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    projectcalicoGlobalNetworkSetDelete: async (_parent, args: object) => {
    try {
        const res = await k8sApi.deleteClusterCustomObject('crd.projectcalico.org','v1','globalnetworksets', args['name'])
        return res.body
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
  },
    projectcalicoGlobalNetworkSetPatch: async (_parent, args: object) => {
        const request = {
            apiVersion: 'crd.projectcalico.org/v1',
            kind: 'org.projectcalico.crd.v1.GlobalNetworkSet',
            metadata: getMeta(args),
        }
        if (args['spec'] != undefined && args['spec'] != null)
            request["spec"] =  args['spec'];
        try {
            const resGet = await k8sApi.getClusterCustomObject('crd.projectcalico.org','v1','globalnetworksets', args['name'])
            const payload = rfc6902.createPatch(resGet.body,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await k8sApi.patchClusterCustomObject('crd.projectcalico.org','v1','globalnetworksets', args['name'], payload, undefined, undefined, undefined, options)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
export const lists = {
    projectcalicoGlobalNetworkSet: async (_parent, args: object) => {
        let lst:Array<object>|undefined = cache.get('GlobalNetworkSet')
        if (lst==undefined) {
            try {
                const res = await k8sApi.listClusterCustomObject('crd.projectcalico.org','v1','globalnetworksets')
                lst = (res as object)['body']['items'] as Array<object>
                cache.set('GlobalNetworkSet', lst, 2);
            } catch (err) {
                console.error((err as object)['body']);
                return []
            }
        }
        return lst.filter(o=>applyFilter(o,args)).map(o=>applyFieldSelection(o,args))
    }
};
export const queries = {
    projectcalicoGlobalNetworkSet: lists.projectcalicoGlobalNetworkSet,
};
export const resolvers = {
};

