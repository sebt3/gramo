import k8s from '@kubernetes/client-node';
import rfc6902  from 'rfc6902';
import {kc, cache, applyFilter, applyFieldSelection, getByPath, getMetaNS } from '../k8slibs.js';
import { lists as listService } from '../k8s/Service.js';

const k8sApi = kc.makeApiClient(k8s.NetworkingV1Api);

export const mutations = {
    k8sIngressCreate: async (_parent, args: object) => {
        const payload = {
            apiVersion: 'networking.k8s.io/v1',
            kind: 'io.k8s.api.networking.v1.Ingress',
            metadata: getMetaNS(args),
            "spec": args['spec'],
        }
        try {
            const res = await k8sApi.createNamespacedIngress(args['namespace'], payload)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    k8sIngressDelete: async (_parent, args: object) => {
    try {
        const res = await k8sApi.deleteNamespacedIngress(args['namespace'], args['name'])
        return res.body
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
  },
    k8sIngressPatch: async (_parent, args: object) => {
        const request = {
            apiVersion: 'networking.k8s.io/v1',
            kind: 'io.k8s.api.networking.v1.Ingress',
            metadata: getMetaNS(args),
        }
        if (args['spec'] != undefined && args['spec'] != null)
            request["spec"] =  args['spec'];
        try {
            const resGet = await k8sApi.readNamespacedIngress(args['namespace'], args['name'])
            const payload = rfc6902.createPatch(resGet.body,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await k8sApi.patchNamespacedIngress(args['namespace'], args['name'], payload, undefined, undefined, undefined, undefined, undefined, options)
            return res.body
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
export const lists = {
    k8sIngress: async (_parent, args: object) => {
        let lst:Array<object>|undefined = cache.get(`Ingress.${args['namespace']}`)
        if (lst==undefined) {
            try {
                const res = await k8sApi.listNamespacedIngress(args['namespace'])
                lst = (res as object)['body']['items'] as Array<object>
                cache.set(`Ingress.${args['namespace']}`, lst, 2);
            } catch (err) {
                console.error((err as object)['body']);
                return []
            }
        }
        return lst.filter(o=>applyFilter(o,args)).map(o=>applyFieldSelection(o,args))
    }
};
export const resolvers = {
    k8sIngress: {
        useService: async (ing, args: object) => {
            if (!Array.isArray(ing['spec']['rules'])) return null;
            const svcs = ing['spec']['rules']
                            .filter(r=>
                                r['http'] != undefined &&
                                Array.isArray(r['http']['paths']) &&
                                r['http']['paths'].filter(p=>p['backend'] != undefined && p['backend']['service'] != undefined).length>0
                            ).map(r=>r['http']['paths']
                                .filter(p=>p['backend'] != undefined && p['backend']['service'] != undefined)
                                .map(p=>p['backend']['service']['name'])
                            ).flat()
            if (svcs.length<1) return null;
            const lst = await listService.k8sService(ing, {namespace: ing['metadata']['namespace'], ...args})
            return lst.filter(svc=>svcs.includes(svc['metadata']['name']))
        },
    }
};
export const nsResolver = {
    k8sIngress: async (parent, args: object) => {
        return lists.k8sIngress(parent,{namespace: parent.metadata.name, ...args})
    }
};

