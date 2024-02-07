import k8s from '@kubernetes/client-node';
import rfc6902  from 'rfc6902';
import {kc, cache, applyFilter, applyFieldSelection, getByPath, getMetaNS } from '../k8slibs.js';

const k8sApi = kc.makeApiClient(k8s.CustomObjectsApi);

export const mutations = {
    mariadbSqlJobCreate: async (_parent, args: object) => {
        const payload = {
            apiVersion: 'mariadb.mmontes.io/v1alpha1',
            kind: 'io.mmontes.mariadb.v1alpha1.SqlJob',
            metadata: getMetaNS(args),
            "spec": args['spec'],
        }
        try {
            const res = await k8sApi.createNamespacedCustomObject('mariadb.mmontes.io','v1alpha1',args['namespace'],'sqljobs', payload)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    mariadbSqlJobDelete: async (_parent, args: object) => {
    try {
        const res = await k8sApi.deleteNamespacedCustomObject('mariadb.mmontes.io','v1alpha1',args['namespace'],'sqljobs', args['name'])
        return res.body
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
  },
    mariadbSqlJobPatch: async (_parent, args: object) => {
        const request = {
            apiVersion: 'mariadb.mmontes.io/v1alpha1',
            kind: 'io.mmontes.mariadb.v1alpha1.SqlJob',
            metadata: getMetaNS(args),
        }
        if (args['spec'] != undefined && args['spec'] != null)
            request["spec"] =  args['spec'];
        try {
            const resGet = await k8sApi.getNamespacedCustomObject('mariadb.mmontes.io','v1alpha1',args['namespace'],'sqljobs', args['name'])
            const payload = rfc6902.createPatch(resGet.body,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await k8sApi.patchNamespacedCustomObject('mariadb.mmontes.io','v1alpha1',args['namespace'],'sqljobs', args['name'], payload, undefined, undefined, undefined, options)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
export const lists = {
    mariadbSqlJob: async (_parent, args: object) => {
        let lst:Array<object>|undefined = cache.get(`SqlJob.${args['namespace']}`)
        if (lst==undefined) {
            try {
                const res = await k8sApi.listNamespacedCustomObject('mariadb.mmontes.io','v1alpha1',args['namespace'],'sqljobs')
                lst = (res as object)['body']['items'] as Array<object>
                cache.set(`SqlJob.${args['namespace']}`, lst, 2);
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
    mariadbSqlJob: async (parent, args: object) => {
        return lists.mariadbSqlJob(parent,{namespace: parent.metadata.name, ...args})
    }
};

