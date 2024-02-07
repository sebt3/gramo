import k8s from '@kubernetes/client-node';
import rfc6902  from 'rfc6902';
import {kc, cache, applyFilter, applyFieldSelection, getByPath, getMetaNS } from '../k8slibs.js';
import { lists as listService } from '../k8s/Service.js';

const k8sApi = kc.makeApiClient(k8s.DiscoveryV1Api);

export const mutations = {
    k8sEndpointSliceCreate: async (_parent, args: object) => {
        const payload = {
            apiVersion: 'discovery.k8s.io/v1',
            kind: 'io.k8s.api.discovery.v1.EndpointSlice',
            metadata: getMetaNS(args),
            "addressType": args['addressType'],
            "endpoints": args['endpoints'],
            "ports": args['ports'],
        }
        try {
            const res = await k8sApi.createNamespacedEndpointSlice(args['namespace'], payload)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    k8sEndpointSliceDelete: async (_parent, args: object) => {
    try {
        const res = await k8sApi.deleteNamespacedEndpointSlice(args['namespace'], args['name'])
        return res.body
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
  },
    k8sEndpointSlicePatch: async (_parent, args: object) => {
        const request = {
            apiVersion: 'discovery.k8s.io/v1',
            kind: 'io.k8s.api.discovery.v1.EndpointSlice',
            metadata: getMetaNS(args),
        }
        if (args['addressType'] != undefined && args['addressType'] != null)
            request["addressType"] =  args['addressType'];
        if (args['endpoints'] != undefined && args['endpoints'] != null)
            request["endpoints"] =  args['endpoints'];
        if (args['ports'] != undefined && args['ports'] != null)
            request["ports"] =  args['ports'];
        try {
            const resGet = await k8sApi.readNamespacedEndpointSlice(args['namespace'], args['name'])
            const payload = rfc6902.createPatch(resGet.body,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await k8sApi.patchNamespacedEndpointSlice(args['namespace'], args['name'], payload, undefined, undefined, undefined, undefined, undefined, options)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
export const lists = {
    k8sEndpointSlice: async (_parent, args: object) => {
        let lst:Array<object>|undefined = cache.get(`EndpointSlice.${args['namespace']}`)
        if (lst==undefined) {
            try {
                const res = await k8sApi.listNamespacedEndpointSlice(args['namespace'])
                lst = (res as object)['body']['items'] as Array<object>
                cache.set(`EndpointSlice.${args['namespace']}`, lst, 2);
            } catch (err) {
                console.error((err as object)['body']);
                return []
            }
        }
        return lst.filter(o=>applyFilter(o,args)).map(o=>applyFieldSelection(o,args))
    }
};
export const resolvers = {
    k8sEndpointSlice: {
        parentService: async (child, args: object) => {
            if (child.metadata['ownerReferences']==null || child.metadata['ownerReferences']==undefined || child.metadata['ownerReferences'].filter(r=>r.kind=='Service').length<1) return null;
            const lst = await listService.k8sService(child,{namespace: child['metadata']['namespace'], ...args})
            return lst.filter(o=>child.metadata['ownerReferences'].filter(r=>r.kind=='Service'&&r.name==o['metadata']['name']).length>0)
        },
    }
};
export const nsResolver = {
    k8sEndpointSlice: async (parent, args: object) => {
        return lists.k8sEndpointSlice(parent,{namespace: parent.metadata.name, ...args})
    }
};

