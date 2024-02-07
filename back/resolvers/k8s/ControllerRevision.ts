import k8s from '@kubernetes/client-node';
import {kc, applyFilter, applyFieldSelection, getMetaNS } from '../k8slibs.js';
import { lists as listDaemonSet } from '../k8s/DaemonSet.js';
import { lists as listStatefulSet } from '../k8s/StatefulSet.js';
import rfc6902  from 'rfc6902';

const k8sApi = kc.makeApiClient(k8s.AppsV1Api);

export const mutations = {
    k8sControllerRevisionCreate: async (_parent, args: object) => {
        const payload = {
            apiVersion: 'apps/v1',
            kind: 'io.k8s.api.apps.v1.ControllerRevision',
            metadata: getMetaNS(args),
            "data": args['data'],
            "revision": args['revision'],
        }
        try {
            const res = await k8sApi.createNamespacedControllerRevision(args['namespace'], payload)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    k8sControllerRevisionPatch: async (_parent, args: object) => {
        const request = {
            apiVersion: 'apps/v1',
            kind: 'io.k8s.api.apps.v1.ControllerRevision',
            metadata: getMetaNS(args),
        }
        if (args['data'] != undefined && args['data'] != null)
            request["data"] =  args['data'];
        if (args['revision'] != undefined && args['revision'] != null)
            request["revision"] =  args['revision'];
        try {
            const resGet = await k8sApi.readNamespacedControllerRevision(args['namespace'], args['name'])
            const payload = rfc6902.createPatch(resGet.body,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await k8sApi.patchNamespacedControllerRevision(args['namespace'], args['name'], payload, undefined, undefined, undefined, undefined, undefined, options)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    k8sControllerRevisionDelete: async (_parent, args: object) => {
    try {
        const res = await k8sApi.deleteNamespacedControllerRevision(args['namespace'], args['name'])
        return res.body
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
},
};
export const lists = {
    k8sControllerRevision: async (_parent, args: object) => {
        try {
            const res = await k8sApi.listNamespacedControllerRevision(args['namespace'])
            return res.body['items'].filter(o=>applyFilter(o,args)).map(o=>applyFieldSelection(o,args))
        } catch (err) {
          console.error((err as object)['body']);
        }
        return []
    }
};
export const resolvers = {
    k8sControllerRevision: {
        parentDaemonSet: async (child, args: object) => {
            if (child.metadata['ownerReferences']==null || child.metadata['ownerReferences']==undefined || child.metadata['ownerReferences'].filter(r=>r.kind=='DaemonSet').length<1) return null;
            const lst = await listDaemonSet.k8sDaemonSet(child,{namespace: child.metadata.namespace, ...args})
            return lst.filter(o=>child.metadata['ownerReferences'].filter(r=>r.kind=='DaemonSet'&&r.name==o.metadata.name).length>0)
        },
        parentStatefulSet: async (child, args: object) => {
            if (child.metadata['ownerReferences']==null || child.metadata['ownerReferences']==undefined || child.metadata['ownerReferences'].filter(r=>r.kind=='StatefulSet').length<1) return null;
            const lst = await listStatefulSet.k8sStatefulSet(child,{namespace: child.metadata.namespace, ...args})
            return lst.filter(o=>child.metadata['ownerReferences'].filter(r=>r.kind=='StatefulSet'&&r.name==o.metadata.name).length>0)
        },
    }
};
export const nsResolver = {
    k8sControllerRevision: async (parent, args: object) => {
        return lists.k8sControllerRevision(parent,{namespace: parent.metadata.name, ...args})
    }
};

