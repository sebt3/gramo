import k8s from '@kubernetes/client-node';
import rfc6902  from 'rfc6902';
import {kc, cache, applyFilter, applyFieldSelection, getByPath, getMetaNS } from '../k8slibs.js';

const k8sApi = kc.makeApiClient(k8s.CustomObjectsApi);

export const mutations = {
    oracleMySQLBackupCreate: async (_parent, args: object) => {
        const payload = {
            apiVersion: 'mysql.oracle.com/v2',
            kind: 'com.oracle.mysql.v2.MySQLBackup',
            metadata: getMetaNS(args),
            "spec": args['spec'],
        }
        try {
            const res = await k8sApi.createNamespacedCustomObject('mysql.oracle.com','v2',args['namespace'],'mysqlbackups', payload)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    oracleMySQLBackupDelete: async (_parent, args: object) => {
    try {
        const res = await k8sApi.deleteNamespacedCustomObject('mysql.oracle.com','v2',args['namespace'],'mysqlbackups', args['name'])
        return res.body
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
  },
    oracleMySQLBackupPatch: async (_parent, args: object) => {
        const request = {
            apiVersion: 'mysql.oracle.com/v2',
            kind: 'com.oracle.mysql.v2.MySQLBackup',
            metadata: getMetaNS(args),
        }
        if (args['spec'] != undefined && args['spec'] != null)
            request["spec"] =  args['spec'];
        try {
            const resGet = await k8sApi.getNamespacedCustomObject('mysql.oracle.com','v2',args['namespace'],'mysqlbackups', args['name'])
            const payload = rfc6902.createPatch(resGet.body,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await k8sApi.patchNamespacedCustomObject('mysql.oracle.com','v2',args['namespace'],'mysqlbackups', args['name'], payload, undefined, undefined, undefined, options)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
export const lists = {
    oracleMySQLBackup: async (_parent, args: object) => {
        let lst:Array<object>|undefined = cache.get(`MySQLBackup.${args['namespace']}`)
        if (lst==undefined) {
            try {
                const res = await k8sApi.listNamespacedCustomObject('mysql.oracle.com','v2',args['namespace'],'mysqlbackups')
                lst = (res as object)['body']['items'] as Array<object>
                cache.set(`MySQLBackup.${args['namespace']}`, lst, 2);
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
    oracleMySQLBackup: async (parent, args: object) => {
        return lists.oracleMySQLBackup(parent,{namespace: parent.metadata.name, ...args})
    }
};

