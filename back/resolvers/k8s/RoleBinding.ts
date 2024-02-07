import k8s from '@kubernetes/client-node';
import rfc6902  from 'rfc6902';
import {kc, cache, applyFilter, applyFieldSelection, getByPath, getMetaNS } from '../k8slibs.js';
import { lists as listCluster } from '../cnpg/Cluster.js';
import { lists as listPooler } from '../cnpg/Pooler.js';
import { lists as listRole } from '../k8s/Role.js';
import { lists as listServiceAccount } from '../k8s/ServiceAccount.js';

const k8sApi = kc.makeApiClient(k8s.RbacAuthorizationV1Api);

export const mutations = {
    k8sRoleBindingCreate: async (_parent, args: object) => {
        const payload = {
            apiVersion: 'rbac.authorization.k8s.io/v1',
            kind: 'io.k8s.api.rbac.v1.RoleBinding',
            metadata: getMetaNS(args),
            "roleRef": args['roleRef'],
            "subjects": args['subjects'],
        }
        try {
            const res = await k8sApi.createNamespacedRoleBinding(args['namespace'], payload)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    k8sRoleBindingDelete: async (_parent, args: object) => {
    try {
        const res = await k8sApi.deleteNamespacedRoleBinding(args['namespace'], args['name'])
        return res.body
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
  },
    k8sRoleBindingPatch: async (_parent, args: object) => {
        const request = {
            apiVersion: 'rbac.authorization.k8s.io/v1',
            kind: 'io.k8s.api.rbac.v1.RoleBinding',
            metadata: getMetaNS(args),
        }
        if (args['roleRef'] != undefined && args['roleRef'] != null)
            request["roleRef"] =  args['roleRef'];
        if (args['subjects'] != undefined && args['subjects'] != null)
            request["subjects"] =  args['subjects'];
        try {
            const resGet = await k8sApi.readNamespacedRoleBinding(args['namespace'], args['name'])
            const payload = rfc6902.createPatch(resGet.body,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await k8sApi.patchNamespacedRoleBinding(args['namespace'], args['name'], payload, undefined, undefined, undefined, undefined, undefined, options)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
export const lists = {
    k8sRoleBinding: async (_parent, args: object) => {
        let lst:Array<object>|undefined = cache.get(`RoleBinding.${args['namespace']}`)
        if (lst==undefined) {
            try {
                const res = await k8sApi.listNamespacedRoleBinding(args['namespace'])
                lst = (res as object)['body']['items'] as Array<object>
                cache.set(`RoleBinding.${args['namespace']}`, lst, 2);
            } catch (err) {
                console.error((err as object)['body']);
                return []
            }
        }
        return lst.filter(o=>applyFilter(o,args)).map(o=>applyFieldSelection(o,args))
    }
};
export const resolvers = {
    k8sRoleBinding: {
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
        provideRole: async (user, args: object) => {
            if (user['roleRef']['kind'] != 'Role') return null;
            const lst = await listRole.k8sRole(user,{namespace: user['metadata']['namespace'], ...args})
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
export const nsResolver = {
    k8sRoleBinding: async (parent, args: object) => {
        return lists.k8sRoleBinding(parent,{namespace: parent.metadata.name, ...args})
    }
};

