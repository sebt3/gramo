import k8s from '@kubernetes/client-node';
import rfc6902  from 'rfc6902';
import {kc, cache, applyFilter, applyFieldSelection, getByPath, getMeta } from '../k8slibs.js';
import { lists as listPod } from '../k8s/Pod.js';
import { lists as listNamespace } from '../k8s/Namespace.js';

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

export const mutations = {
    k8sNodeCreate: async (_parent, args: object) => {
        const payload = {
            apiVersion: '/v1',
            kind: 'io.k8s.api.core.v1.Node',
            metadata: getMeta(args),
            "spec": args['spec'],
        }
        try {
            const res = await k8sApi.createNode(payload)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    k8sNodeDelete: async (_parent, args: object) => {
    try {
        const res = await k8sApi.deleteNode(args['name'])
        return res.body
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
  },
    k8sNodePatch: async (_parent, args: object) => {
        const request = {
            apiVersion: '/v1',
            kind: 'io.k8s.api.core.v1.Node',
            metadata: getMeta(args),
        }
        if (args['spec'] != undefined && args['spec'] != null)
            request["spec"] =  args['spec'];
        try {
            const resGet = await k8sApi.readNode(args['name'])
            const payload = rfc6902.createPatch(resGet.body,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await k8sApi.patchNode(args['name'], payload, undefined, undefined, undefined, undefined, undefined, options)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
export const lists = {
    k8sNode: async (_parent, args: object) => {
        let lst:Array<object>|undefined = cache.get('Node')
        if (lst==undefined) {
            try {
                const res = await k8sApi.listNode()
                lst = (res as object)['body']['items'] as Array<object>
                cache.set('Node', lst, 2);
            } catch (err) {
                console.error((err as object)['body']);
                return []
            }
        }
        return lst.filter(o=>applyFilter(o,args)).map(o=>applyFieldSelection(o,args))
    }
};
export const queries = {
    k8sNode: lists.k8sNode,
};
export const resolvers = {
    k8sNode: {
        usedByPod: async (node, args: object) => {
            const nss = await listNamespace.k8sNamespace(node, args)
            return (await Promise.all(nss.map(n=>n['metadata']['name']).map(async (ns)=>{
                const lst = await listPod.k8sPod(node, {namespace: ns, ...args})
                return lst.filter(pod=> pod['spec']['nodeName']==node['metadata']['name'])
            }))).flat()
        },
    }
};

