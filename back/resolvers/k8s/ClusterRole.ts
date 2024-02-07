import k8s from '@kubernetes/client-node';
import rfc6902  from 'rfc6902';
import {kc, cache, applyFilter, applyFieldSelection, getByPath, getMeta } from '../k8slibs.js';
import { lists as listClusterRoleBinding } from '../k8s/ClusterRoleBinding.js';

const k8sApi = kc.makeApiClient(k8s.RbacAuthorizationV1Api);

export const mutations = {
    k8sClusterRoleCreate: async (_parent, args: object) => {
        const payload = {
            apiVersion: 'rbac.authorization.k8s.io/v1',
            kind: 'io.k8s.api.rbac.v1.ClusterRole',
            metadata: getMeta(args),
            "aggregationRule": args['aggregationRule'],
            "rules": args['rules'],
        }
        try {
            const res = await k8sApi.createClusterRole(payload)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    k8sClusterRoleDelete: async (_parent, args: object) => {
    try {
        const res = await k8sApi.deleteClusterRole(args['name'])
        return res.body
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
  },
    k8sClusterRolePatch: async (_parent, args: object) => {
        const request = {
            apiVersion: 'rbac.authorization.k8s.io/v1',
            kind: 'io.k8s.api.rbac.v1.ClusterRole',
            metadata: getMeta(args),
        }
        if (args['aggregationRule'] != undefined && args['aggregationRule'] != null)
            request["aggregationRule"] =  args['aggregationRule'];
        if (args['rules'] != undefined && args['rules'] != null)
            request["rules"] =  args['rules'];
        try {
            const resGet = await k8sApi.readClusterRole(args['name'])
            const payload = rfc6902.createPatch(resGet.body,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await k8sApi.patchClusterRole(args['name'], payload, undefined, undefined, undefined, undefined, undefined, options)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
export const lists = {
    k8sClusterRole: async (_parent, args: object) => {
        let lst:Array<object>|undefined = cache.get('ClusterRole')
        if (lst==undefined) {
            try {
                const res = await k8sApi.listClusterRole()
                lst = (res as object)['body']['items'] as Array<object>
                cache.set('ClusterRole', lst, 2);
            } catch (err) {
                console.error((err as object)['body']);
                return []
            }
        }
        return lst.filter(o=>applyFilter(o,args)).map(o=>applyFieldSelection(o,args))
    }
};
export const queries = {
    k8sClusterRole: lists.k8sClusterRole,
};
export const resolvers = {
    k8sClusterRole: {
        providedToClusterRoleBinding: async (used, args: object) => {
            const lst = await listClusterRoleBinding.k8sClusterRoleBinding(used,{namespace: used['metadata']['namespace'], ...args})
            return lst.filter(r=>r['roleRef']['name']==used['metadata']['name'])
        },
    }
};

