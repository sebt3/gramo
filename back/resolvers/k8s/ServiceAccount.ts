import k8s from '@kubernetes/client-node';
import rfc6902  from 'rfc6902';
import {kc, cache, applyFilter, applyFieldSelection, getByPath, getMetaNS } from '../k8slibs.js';
import { lists as listPooler } from '../cnpg/Pooler.js';
import { lists as listCluster } from '../cnpg/Cluster.js';
import { lists as listRoleBinding } from '../k8s/RoleBinding.js';
import { lists as listNamespace } from '../k8s/Namespace.js';
import { lists as listClusterRoleBinding } from '../k8s/ClusterRoleBinding.js';
import { lists as listPod } from '../k8s/Pod.js';

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

export const mutations = {
    k8sServiceAccountCreate: async (_parent, args: object) => {
        const payload = {
            apiVersion: '/v1',
            kind: 'io.k8s.api.core.v1.ServiceAccount',
            metadata: getMetaNS(args),
            "automountServiceAccountToken": args['automountServiceAccountToken'],
            "imagePullSecrets": args['imagePullSecrets'],
            "secrets": args['secrets'],
        }
        try {
            const res = await k8sApi.createNamespacedServiceAccount(args['namespace'], payload)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    k8sServiceAccountDelete: async (_parent, args: object) => {
    try {
        const res = await k8sApi.deleteNamespacedServiceAccount(args['namespace'], args['name'])
        return res.body
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
  },
    k8sServiceAccountPatch: async (_parent, args: object) => {
        const request = {
            apiVersion: '/v1',
            kind: 'io.k8s.api.core.v1.ServiceAccount',
            metadata: getMetaNS(args),
        }
        if (args['automountServiceAccountToken'] != undefined && args['automountServiceAccountToken'] != null)
            request["automountServiceAccountToken"] =  args['automountServiceAccountToken'];
        if (args['imagePullSecrets'] != undefined && args['imagePullSecrets'] != null)
            request["imagePullSecrets"] =  args['imagePullSecrets'];
        if (args['secrets'] != undefined && args['secrets'] != null)
            request["secrets"] =  args['secrets'];
        try {
            const resGet = await k8sApi.readNamespacedServiceAccount(args['namespace'], args['name'])
            const payload = rfc6902.createPatch(resGet.body,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await k8sApi.patchNamespacedServiceAccount(args['namespace'], args['name'], payload, undefined, undefined, undefined, undefined, undefined, options)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
export const lists = {
    k8sServiceAccount: async (_parent, args: object) => {
        let lst:Array<object>|undefined = cache.get(`ServiceAccount.${args['namespace']}`)
        if (lst==undefined) {
            try {
                const res = await k8sApi.listNamespacedServiceAccount(args['namespace'])
                lst = (res as object)['body']['items'] as Array<object>
                cache.set(`ServiceAccount.${args['namespace']}`, lst, 2);
            } catch (err) {
                console.error((err as object)['body']);
                return []
            }
        }
        return lst.filter(o=>applyFilter(o,args)).map(o=>applyFieldSelection(o,args))
    }
};
export const resolvers = {
    k8sServiceAccount: {
        parentPooler: async (child, args: object) => {
            if (child.metadata['ownerReferences']==null || child.metadata['ownerReferences']==undefined || child.metadata['ownerReferences'].filter(r=>r.kind=='Pooler').length<1) return null;
            const lst = await listPooler.cnpgPooler(child,{namespace: child['metadata']['namespace'], ...args})
            return lst.filter(o=>child.metadata['ownerReferences'].filter(r=>r.kind=='Pooler'&&r.name==o['metadata']['name']).length>0)
        },
        parentCluster: async (child, args: object) => {
            if (child.metadata['ownerReferences']==null || child.metadata['ownerReferences']==undefined || child.metadata['ownerReferences'].filter(r=>r.kind=='Cluster').length<1) return null;
            const lst = await listCluster.cnpgCluster(child,{namespace: child['metadata']['namespace'], ...args})
            return lst.filter(o=>child.metadata['ownerReferences'].filter(r=>r.kind=='Cluster'&&r.name==o['metadata']['name']).length>0)
        },
        provideRoleBinding: async (user, args: object) => {
            const nss = await listNamespace.k8sNamespace(user, args)
            return (await Promise.all(nss.map(n=>n['metadata']['name']).map(async (ns)=>{
                const lst = await listRoleBinding.k8sRoleBinding(user, {namespace: ns, ...args})
                return lst.filter(r=>r['subjects']!=null&&r['subjects'].filter(s=>s['kind']==''&&s['name']==user['metadata']['name'] && s['namespace']==user['metadata']['namespace']).length>0)
            }))).flat().filter((v)=>v!=null)
        },
        provideClusterRoleBinding: async (user, args: object) => {
            const lst = await listClusterRoleBinding.k8sClusterRoleBinding(user, args)
            return lst.filter(r=>r['subjects']!=null&&r['subjects'].filter(s=>s['kind']==''&&s['name']==user['metadata']['name'] && s['namespace']==user['metadata']['namespace']).length>0)
        },
        usedByPod: async (sa, args: object) => {
            const lst = await listPod.k8sPod(sa, {namespace: sa['metadata']['namespace'], ...args})
            return lst.filter(pod=>pod['spec']['serviceAccountName']==sa['metadata']['name'] || pod['spec']['serviceAccount']==sa['metadata']['name'])
        },
    }
};
export const nsResolver = {
    k8sServiceAccount: async (parent, args: object) => {
        return lists.k8sServiceAccount(parent,{namespace: parent.metadata.name, ...args})
    }
};

