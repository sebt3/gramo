import k8s from '@kubernetes/client-node';
import rfc6902  from 'rfc6902';
import {kc, cache, applyFilter, applyFieldSelection, getByPath, getMetaNS } from '../k8slibs.js';
import { lists as listCluster } from '../cnpg/Cluster.js';
import { lists as listPooler } from '../cnpg/Pooler.js';
import { lists as listRoleBinding } from '../k8s/RoleBinding.js';

const k8sApi = kc.makeApiClient(k8s.RbacAuthorizationV1Api);

export const mutations = {
    k8sRoleCreate: async (_parent, args: object) => {
        const payload = {
            apiVersion: 'rbac.authorization.k8s.io/v1',
            kind: 'io.k8s.api.rbac.v1.Role',
            metadata: getMetaNS(args),
            "rules": args['rules'],
        }
        try {
            const res = await k8sApi.createNamespacedRole(args['namespace'], payload)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    k8sRoleDelete: async (_parent, args: object) => {
    try {
        const res = await k8sApi.deleteNamespacedRole(args['namespace'], args['name'])
        return res.body
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
  },
    k8sRolePatch: async (_parent, args: object) => {
        const request = {
            apiVersion: 'rbac.authorization.k8s.io/v1',
            kind: 'io.k8s.api.rbac.v1.Role',
            metadata: getMetaNS(args),
        }
        if (args['rules'] != undefined && args['rules'] != null)
            request["rules"] =  args['rules'];
        try {
            const resGet = await k8sApi.readNamespacedRole(args['namespace'], args['name'])
            const payload = rfc6902.createPatch(resGet.body,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await k8sApi.patchNamespacedRole(args['namespace'], args['name'], payload, undefined, undefined, undefined, undefined, undefined, options)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
export const lists = {
    k8sRole: async (_parent, args: object) => {
        let lst:Array<object>|undefined = cache.get(`Role.${args['namespace']}`)
        if (lst==undefined) {
            try {
                const res = await k8sApi.listNamespacedRole(args['namespace'])
                lst = (res as object)['body']['items'] as Array<object>
                cache.set(`Role.${args['namespace']}`, lst, 2);
            } catch (err) {
                console.error((err as object)['body']);
                return []
            }
        }
        return lst.filter(o=>applyFilter(o,args)).map(o=>applyFieldSelection(o,args))
    }
};
export const resolvers = {
    k8sRole: {
        parentCluster: async (child, args: object) => {
            if (child.metadata['ownerReferences']==null || child.metadata['ownerReferences']==undefined || child.metadata['ownerReferences'].filter(r=>r.kind=='Cluster').length<1) return null;
            const lst = await listCluster.cnpgCluster(child,{namespace: child['metadata']['namespace'], ...args})
            return lst.filter(o=>child.metadata['ownerReferences'].filter(r=>r.kind=='Cluster'&&r.name==o['metadata']['name']).length>0)
        },
        parentPooler: async (child, args: object) => {
            if (child.metadata['ownerReferences']==null || child.metadata['ownerReferences']==undefined || child.metadata['ownerReferences'].filter(r=>r.kind=='Pooler').length<1) return null;
            const lst = await listPooler.cnpgPooler(child,{namespace: child['metadata']['namespace'], ...args})
            return lst.filter(o=>child.metadata['ownerReferences'].filter(r=>r.kind=='Pooler'&&r.name==o['metadata']['name']).length>0)
        },
        providedToRoleBinding: async (used, args: object) => {
            const lst = await listRoleBinding.k8sRoleBinding(used,{namespace: used['metadata']['namespace'], ...args})
            return lst.filter(r=>r['roleRef']['name']==used['metadata']['name'])
        },
    }
};
export const nsResolver = {
    k8sRole: async (parent, args: object) => {
        return lists.k8sRole(parent,{namespace: parent.metadata.name, ...args})
    }
};

