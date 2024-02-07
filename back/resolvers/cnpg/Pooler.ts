import k8s from '@kubernetes/client-node';
import rfc6902  from 'rfc6902';
import {kc, cache, applyFilter, applyFieldSelection, getByPath, getMetaNS } from '../k8slibs.js';
import { lists as listService } from '../k8s/Service.js';
import { lists as listServiceAccount } from '../k8s/ServiceAccount.js';
import { lists as listDeployment } from '../k8s/Deployment.js';
import { lists as listRole } from '../k8s/Role.js';
import { lists as listRoleBinding } from '../k8s/RoleBinding.js';

const k8sApi = kc.makeApiClient(k8s.CustomObjectsApi);

export const mutations = {
    cnpgPoolerCreate: async (_parent, args: object) => {
        const payload = {
            apiVersion: 'postgresql.cnpg.io/v1',
            kind: 'io.cnpg.postgresql.v1.Pooler',
            metadata: getMetaNS(args),
            "spec": args['spec'],
        }
        try {
            const res = await k8sApi.createNamespacedCustomObject('postgresql.cnpg.io','v1',args['namespace'],'poolers', payload)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    cnpgPoolerDelete: async (_parent, args: object) => {
    try {
        const res = await k8sApi.deleteNamespacedCustomObject('postgresql.cnpg.io','v1',args['namespace'],'poolers', args['name'])
        return res.body
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
  },
    cnpgPoolerPatch: async (_parent, args: object) => {
        const request = {
            apiVersion: 'postgresql.cnpg.io/v1',
            kind: 'io.cnpg.postgresql.v1.Pooler',
            metadata: getMetaNS(args),
        }
        if (args['spec'] != undefined && args['spec'] != null)
            request["spec"] =  args['spec'];
        try {
            const resGet = await k8sApi.getNamespacedCustomObject('postgresql.cnpg.io','v1',args['namespace'],'poolers', args['name'])
            const payload = rfc6902.createPatch(resGet.body,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await k8sApi.patchNamespacedCustomObject('postgresql.cnpg.io','v1',args['namespace'],'poolers', args['name'], payload, undefined, undefined, undefined, options)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
export const lists = {
    cnpgPooler: async (_parent, args: object) => {
        let lst:Array<object>|undefined = cache.get(`Pooler.${args['namespace']}`)
        if (lst==undefined) {
            try {
                const res = await k8sApi.listNamespacedCustomObject('postgresql.cnpg.io','v1',args['namespace'],'poolers')
                lst = (res as object)['body']['items'] as Array<object>
                cache.set(`Pooler.${args['namespace']}`, lst, 2);
            } catch (err) {
                console.error((err as object)['body']);
                return []
            }
        }
        return lst.filter(o=>applyFilter(o,args)).map(o=>applyFieldSelection(o,args))
    }
};
export const resolvers = {
    cnpgPooler: {
        childService: async (parent, args: object) => {
            const lst = await listService.k8sService(parent,{namespace: parent['metadata']['namespace'], ...args})
            return lst.filter(r=>
                r.metadata['ownerReferences']!=null && r.metadata['ownerReferences']!=undefined &&
                r.metadata['ownerReferences'].filter(r=>r.kind=='Pooler' && r.name == parent['metadata']['name']).length>0
            )
        },
        childServiceAccount: async (parent, args: object) => {
            const lst = await listServiceAccount.k8sServiceAccount(parent,{namespace: parent['metadata']['namespace'], ...args})
            return lst.filter(r=>
                r.metadata['ownerReferences']!=null && r.metadata['ownerReferences']!=undefined &&
                r.metadata['ownerReferences'].filter(r=>r.kind=='Pooler' && r.name == parent['metadata']['name']).length>0
            )
        },
        childDeployment: async (parent, args: object) => {
            const lst = await listDeployment.k8sDeployment(parent,{namespace: parent['metadata']['namespace'], ...args})
            return lst.filter(r=>
                r.metadata['ownerReferences']!=null && r.metadata['ownerReferences']!=undefined &&
                r.metadata['ownerReferences'].filter(r=>r.kind=='Pooler' && r.name == parent['metadata']['name']).length>0
            )
        },
        childRole: async (parent, args: object) => {
            const lst = await listRole.k8sRole(parent,{namespace: parent['metadata']['namespace'], ...args})
            return lst.filter(r=>
                r.metadata['ownerReferences']!=null && r.metadata['ownerReferences']!=undefined &&
                r.metadata['ownerReferences'].filter(r=>r.kind=='Pooler' && r.name == parent['metadata']['name']).length>0
            )
        },
        childRoleBinding: async (parent, args: object) => {
            const lst = await listRoleBinding.k8sRoleBinding(parent,{namespace: parent['metadata']['namespace'], ...args})
            return lst.filter(r=>
                r.metadata['ownerReferences']!=null && r.metadata['ownerReferences']!=undefined &&
                r.metadata['ownerReferences'].filter(r=>r.kind=='Pooler' && r.name == parent['metadata']['name']).length>0
            )
        },
    }
};
export const nsResolver = {
    cnpgPooler: async (parent, args: object) => {
        return lists.cnpgPooler(parent,{namespace: parent.metadata.name, ...args})
    }
};

