import k8s from '@kubernetes/client-node';
import rfc6902  from 'rfc6902';
import {kc, cache, applyFilter, applyFieldSelection, getByPath, getMeta } from '../k8slibs.js';
import { lists as listClusterRole } from '../k8s/ClusterRole.js';
import { lists as listServiceAccount } from '../k8s/ServiceAccount.js';

const k8sApi = kc.makeApiClient(k8s.RbacAuthorizationV1Api);

export const mutations = {
    k8sClusterRoleBindingCreate: async (_parent, args: object) => {
        const payload = {
            apiVersion: 'rbac.authorization.k8s.io/v1',
            kind: 'io.k8s.api.rbac.v1.ClusterRoleBinding',
            metadata: getMeta(args),
            "roleRef": args['roleRef'],
            "subjects": args['subjects'],
        }
        try {
            const res = await k8sApi.createClusterRoleBinding(payload)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    k8sClusterRoleBindingDelete: async (_parent, args: object) => {
    try {
        const res = await k8sApi.deleteClusterRoleBinding(args['name'])
        return res.body
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
  },
    k8sClusterRoleBindingPatch: async (_parent, args: object) => {
        const request = {
            apiVersion: 'rbac.authorization.k8s.io/v1',
            kind: 'io.k8s.api.rbac.v1.ClusterRoleBinding',
            metadata: getMeta(args),
        }
        if (args['roleRef'] != undefined && args['roleRef'] != null)
            request["roleRef"] =  args['roleRef'];
        if (args['subjects'] != undefined && args['subjects'] != null)
            request["subjects"] =  args['subjects'];
        try {
            const resGet = await k8sApi.readClusterRoleBinding(args['name'])
            const payload = rfc6902.createPatch(resGet.body,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await k8sApi.patchClusterRoleBinding(args['name'], payload, undefined, undefined, undefined, undefined, undefined, options)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
export const lists = {
    k8sClusterRoleBinding: async (_parent, args: object) => {
        let lst:Array<object>|undefined = cache.get('ClusterRoleBinding')
        if (lst==undefined) {
            try {
                const res = await k8sApi.listClusterRoleBinding()
                lst = (res as object)['body']['items'] as Array<object>
                cache.set('ClusterRoleBinding', lst, 2);
            } catch (err) {
                console.error((err as object)['body']);
                return []
            }
        }
        return lst.filter(o=>applyFilter(o,args)).map(o=>applyFieldSelection(o,args))
    }
};
export const queries = {
    k8sClusterRoleBinding: lists.k8sClusterRoleBinding,
};
export const resolvers = {
    k8sClusterRoleBinding: {
        provideClusterRole: async (user, args: object) => {
            if (user['roleRef']['kind'] != 'ClusterRole') return null;
            const lst = await listClusterRole.k8sClusterRole(user,{namespace: user['metadata']['namespace'], ...args})
            return lst.filter(r=>r['metadata']['name']==user['roleRef']['name'])
        },
        providedToServiceAccount: async (used, args: object) => {
            if (used['subjects']==null) return null;
            const ret = (await Promise.all(used['subjects'].filter(s=>s['kind']=='ServiceAccount').map(s=>s['namespace']).filter((v,i,a)=>a.indexOf(v) === i).map(async (ns)=>{
                const lst = await listServiceAccount.k8sServiceAccount(used, {namespace: ns, ...args})
                const subs = used['subjects'].filter(s=>s['kind']=='ServiceAccount' && s['namespace']==ns).map(s=>s['name'])
                return lst.filter(r=>subs.includes(r['metadata']['name']))
            }))).flat().filter((v)=>v!=null)
            if(ret.length==0) return null;
            return ret
        },
    }
};

