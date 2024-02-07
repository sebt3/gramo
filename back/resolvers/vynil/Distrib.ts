import k8s from '@kubernetes/client-node';
import rfc6902  from 'rfc6902';
import {kc, cache, applyFilter, applyFieldSelection, getByPath, getMeta } from '../k8slibs.js';
import { lists as listPackage } from '../vynil/Package.js';
import { gramoConfig } from '../../config.js'
import { lists as listCategory } from '../vynil/Category.js';
import { lists as listInstall } from '../vynil/Install.js';
import { lists as listNamespace } from '../k8s/Namespace.js';

const k8sApi = kc.makeApiClient(k8s.CustomObjectsApi);

export const mutations = {
    vynilDistribCreate: async (_parent, args: object) => {
        const payload = {
            apiVersion: 'vynil.solidite.fr/v1',
            kind: 'fr.solidite.vynil.v1.Distrib',
            metadata: getMeta(args),
            "spec": args['spec'],
        }
        try {
            const res = await k8sApi.createClusterCustomObject('vynil.solidite.fr','v1','distribs', payload)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    vynilDistribDelete: async (_parent, args: object) => {
    try {
        const res = await k8sApi.deleteClusterCustomObject('vynil.solidite.fr','v1','distribs', args['name'])
        return res.body
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
  },
    vynilDistribPatch: async (_parent, args: object) => {
        const request = {
            apiVersion: 'vynil.solidite.fr/v1',
            kind: 'fr.solidite.vynil.v1.Distrib',
            metadata: getMeta(args),
        }
        if (args['spec'] != undefined && args['spec'] != null)
            request["spec"] =  args['spec'];
        try {
            const resGet = await k8sApi.getClusterCustomObject('vynil.solidite.fr','v1','distribs', args['name'])
            const payload = rfc6902.createPatch(resGet.body,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await k8sApi.patchClusterCustomObject('vynil.solidite.fr','v1','distribs', args['name'], payload, undefined, undefined, undefined, options)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
export const lists = {
    vynilDistrib: async (_parent, args: object) => {
        let lst:Array<object>|undefined = cache.get('Distrib')
        if (lst==undefined) {
            try {
                const res = await k8sApi.listClusterCustomObject('vynil.solidite.fr','v1','distribs')
                lst = (res as object)['body']['items'] as Array<object>
                cache.set('Distrib', lst, 2);
            } catch (err) {
                console.error((err as object)['body']);
                return []
            }
        }
        return lst.filter(o=>applyFilter(o,args)).map(o=>applyFieldSelection(o,args))
    }
};
export const queries = {
    vynilDistrib: lists.vynilDistrib,
};
export const resolvers = {
    vynilDistrib: {
        providePackage: async (dist, args: object) => {
            const packages = await listPackage.vynilPackage(dist, args)
            return packages.filter(pkg => {
                if ((gramoConfig.limitVynilDistrib != ""  && pkg['distrib'] != gramoConfig.limitVynilDistrib) ||
                    (gramoConfig.limitVynilCategory != "" && pkg['category'] != gramoConfig.limitVynilCategory)) return false;
                return pkg['distrib'] === dist['metadata']['name']
            });
        },
        provideCategory: async (dist, args: object) => {
            return (await listPackage.vynilPackage(dist, args)).filter(pkg => {
                if ((gramoConfig.limitVynilDistrib != ""  && pkg['distrib'] != gramoConfig.limitVynilDistrib) ||
                    (gramoConfig.limitVynilCategory != "" && pkg['category'] != gramoConfig.limitVynilCategory)) return false;
                return pkg['distrib'] === dist['metadata']['name']
            }).map(p=>p.category).filter((v,i,a)=>a.indexOf(v) === i).map(name=>{return {name:name} })
        },
        usedByInstall: async (dist, args: object) => {
            const nss = await listNamespace.k8sNamespace(dist, args)
            return (await Promise.all(nss.map(n=>n['metadata']['name']).map(async (ns)=>{
                const lst = await listInstall.vynilInstall(dist, {namespace: ns, ...args})
                return lst.filter(r=>r['spec']['distrib']==dist['metadata']['name'])
            }))).flat().filter((v)=>v!=null)
        },
    }
};

