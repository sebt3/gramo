import k8s from '@kubernetes/client-node';
import rfc6902  from 'rfc6902';
import {kc, cache, applyFilter, applyFieldSelection, getByPath, getMetaNS } from '../k8slibs.js';

const k8sApi = kc.makeApiClient(k8s.CustomObjectsApi);

export const mutations = {
    mariadbConnectionCreate: async (_parent, args: object) => {
        const payload = {
            apiVersion: 'mariadb.mmontes.io/v1alpha1',
            kind: 'io.mmontes.mariadb.v1alpha1.Connection',
            metadata: getMetaNS(args),
            "spec": args['spec'],
        }
        try {
            const res = await k8sApi.createNamespacedCustomObject('mariadb.mmontes.io','v1alpha1',args['namespace'],'connections', payload)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    mariadbConnectionDelete: async (_parent, args: object) => {
    try {
        const res = await k8sApi.deleteNamespacedCustomObject('mariadb.mmontes.io','v1alpha1',args['namespace'],'connections', args['name'])
        return res.body
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
  },
    mariadbConnectionPatch: async (_parent, args: object) => {
        const request = {
            apiVersion: 'mariadb.mmontes.io/v1alpha1',
            kind: 'io.mmontes.mariadb.v1alpha1.Connection',
            metadata: getMetaNS(args),
        }
        if (args['spec'] != undefined && args['spec'] != null)
            request["spec"] =  args['spec'];
        try {
            const resGet = await k8sApi.getNamespacedCustomObject('mariadb.mmontes.io','v1alpha1',args['namespace'],'connections', args['name'])
            const payload = rfc6902.createPatch(resGet.body,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await k8sApi.patchNamespacedCustomObject('mariadb.mmontes.io','v1alpha1',args['namespace'],'connections', args['name'], payload, undefined, undefined, undefined, options)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
export const lists = {
    mariadbConnection: async (_parent, args: object) => {
        let lst:Array<object>|undefined = cache.get(`Connection.${args['namespace']}`)
        if (lst==undefined) {
            try {
                const res = await k8sApi.listNamespacedCustomObject('mariadb.mmontes.io','v1alpha1',args['namespace'],'connections')
                lst = (res as object)['body']['items'] as Array<object>
                cache.set(`Connection.${args['namespace']}`, lst, 2);
            } catch (err) {
                console.error((err as object)['body']);
                return []
            }
        }
        return lst.filter(o=>applyFilter(o,args)).map(o=>applyFieldSelection(o,args))
    }
};
export const resolvers = {
};
export const nsResolver = {
    mariadbConnection: async (parent, args: object) => {
        return lists.mariadbConnection(parent,{namespace: parent.metadata.name, ...args})
    }
};

