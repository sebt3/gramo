import k8s from '@kubernetes/client-node';
import rfc6902  from 'rfc6902';
import {kc, cache, applyFilter, applyFieldSelection, getByPath, getMetaNS } from '../k8slibs.js';
import { lists as listPackage } from '../vynil/Package.js';
import { lists as listDistrib } from '../vynil/Distrib.js';
import { lists as listCategory } from '../vynil/Category.js';

const k8sApi = kc.makeApiClient(k8s.CustomObjectsApi);

export const mutations = {
    vynilInstallCreate: async (_parent, args: object) => {
        const payload = {
            apiVersion: 'vynil.solidite.fr/v1',
            kind: 'fr.solidite.vynil.v1.Install',
            metadata: getMetaNS(args),
            "spec": args['spec'],
        }
        try {
            const res = await k8sApi.createNamespacedCustomObject('vynil.solidite.fr','v1',args['namespace'],'installs', payload)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    vynilInstallDelete: async (_parent, args: object) => {
    try {
        const res = await k8sApi.deleteNamespacedCustomObject('vynil.solidite.fr','v1',args['namespace'],'installs', args['name'])
        return res.body
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
  },
    vynilInstallPatch: async (_parent, args: object) => {
        const request = {
            apiVersion: 'vynil.solidite.fr/v1',
            kind: 'fr.solidite.vynil.v1.Install',
            metadata: getMetaNS(args),
        }
        if (args['spec'] != undefined && args['spec'] != null)
            request["spec"] =  args['spec'];
        try {
            const resGet = await k8sApi.getNamespacedCustomObject('vynil.solidite.fr','v1',args['namespace'],'installs', args['name'])
            const payload = rfc6902.createPatch(resGet.body,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await k8sApi.patchNamespacedCustomObject('vynil.solidite.fr','v1',args['namespace'],'installs', args['name'], payload, undefined, undefined, undefined, options)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
export const lists = {
    vynilInstall: async (_parent, args: object) => {
        let lst:Array<object>|undefined = cache.get(`Install.${args['namespace']}`)
        if (lst==undefined) {
            try {
                const res = await k8sApi.listNamespacedCustomObject('vynil.solidite.fr','v1',args['namespace'],'installs')
                lst = (res as object)['body']['items'] as Array<object>
                cache.set(`Install.${args['namespace']}`, lst, 2);
            } catch (err) {
                console.error((err as object)['body']);
                return []
            }
        }
        return lst.filter(o=>applyFilter(o,args)).map(o=>applyFieldSelection(o,args))
    }
};
export const resolvers = {
    vynilInstall: {
        usePackage: async (parent, args: object) => {
            const packages = await listPackage.vynilPackage(parent, args)
            const lstPkg = packages.filter((pck) => pck['name'] == parent.spec.component && pck['category']  == parent.spec.category && pck['distrib']  == parent.spec.distrib);
            if (lstPkg.length>0) return lstPkg;
            return null;
        },
        useDistrib: async (parent, args: object) => {
            const lst = (await listDistrib.vynilDistrib(parent,{})).filter((i) => i.metadata.name == parent.spec.distrib)
            if (lst.length>0) return lst;
            return [{
                metadata: {
                    name: parent.spec.distrib,
                },
            }];
        },
        useCategory: async (parent, args: object) => {
            return [{
                name: parent.spec.category,
            }];
        },
    }
};
export const nsResolver = {
    vynilInstall: async (parent, args: object) => {
        return lists.vynilInstall(parent,{namespace: parent.metadata.name, ...args})
    }
};

