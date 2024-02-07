import k8s from '@kubernetes/client-node';
import rfc6902  from 'rfc6902';
import {kc, cache, applyFilter, applyFieldSelection, getByPath, getMetaNS } from '../k8slibs.js';

const k8sApi = kc.makeApiClient(k8s.CustomObjectsApi);

export const mutations = {
    zalandopostgresqlCreate: async (_parent, args: object) => {
        const payload = {
            apiVersion: 'acid.zalan.do/v1',
            kind: 'do.zalan.acid.v1.postgresql',
            metadata: getMetaNS(args),
            "spec": args['spec'],
        }
        try {
            const res = await k8sApi.createNamespacedCustomObject('acid.zalan.do','v1',args['namespace'],'postgresqls', payload)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    zalandopostgresqlDelete: async (_parent, args: object) => {
    try {
        const res = await k8sApi.deleteNamespacedCustomObject('acid.zalan.do','v1',args['namespace'],'postgresqls', args['name'])
        return res.body
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
  },
    zalandopostgresqlPatch: async (_parent, args: object) => {
        const request = {
            apiVersion: 'acid.zalan.do/v1',
            kind: 'do.zalan.acid.v1.postgresql',
            metadata: getMetaNS(args),
        }
        if (args['spec'] != undefined && args['spec'] != null)
            request["spec"] =  args['spec'];
        try {
            const resGet = await k8sApi.getNamespacedCustomObject('acid.zalan.do','v1',args['namespace'],'postgresqls', args['name'])
            const payload = rfc6902.createPatch(resGet.body,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await k8sApi.patchNamespacedCustomObject('acid.zalan.do','v1',args['namespace'],'postgresqls', args['name'], payload, undefined, undefined, undefined, options)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
export const lists = {
    zalandopostgresql: async (_parent, args: object) => {
        let lst:Array<object>|undefined = cache.get(`postgresql.${args['namespace']}`)
        if (lst==undefined) {
            try {
                const res = await k8sApi.listNamespacedCustomObject('acid.zalan.do','v1',args['namespace'],'postgresqls')
                lst = (res as object)['body']['items'] as Array<object>
                cache.set(`postgresql.${args['namespace']}`, lst, 2);
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
    zalandopostgresql: async (parent, args: object) => {
        return lists.zalandopostgresql(parent,{namespace: parent.metadata.name, ...args})
    }
};

