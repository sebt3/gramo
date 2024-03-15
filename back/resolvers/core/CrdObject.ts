import k8s from '@kubernetes/client-node';
import rfc6902  from 'rfc6902';
import {kc, getMeta, getMetaNS } from '../k8slibs.js';
const k8sApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    clusteredCrdObjectCreate: async (_parent, args: object) => {
        const payload = {
            apiVersion: `${args['group']}/${args['version']}`,
            kind: args['kind'],
            metadata: getMeta(args),
            "spec": args['spec'],
        }
        try {
            const res = await k8sApi.createClusterCustomObject(args['group'],args['version'],args['plural'], payload)
            return res.body
        } catch (err) {
          if (typeof err === 'object' && (err as object)['body'] !=undefined && (err as object)['statusCode'] !=undefined) {
            if ((err as object)['statusCode'] != 404 && (err as object)['body']['reason']!='Forbidden') {
              console.error('error', (err as object)['body']);
            }
          } else {console.error('error', err)}
        }
        return null
    },
    clusteredCrdObjectDelete: async (_parent, args: object) => {
        try {
            const res = await k8sApi.deleteClusterCustomObject(args['group'],args['version'],args['plural'], args['name'])
            return res.body
        } catch (err) {
          if (typeof err === 'object' && (err as object)['body'] !=undefined && (err as object)['statusCode'] !=undefined) {
            if ((err as object)['statusCode'] != 404 && (err as object)['body']['reason']!='Forbidden') {
              console.error('error', (err as object)['body']);
            }
          } else {console.error('error', err)}
        }
        return null
    },
    clusteredCrdObjectPatch: async (_parent, args: object) => {
        const request = {
            apiVersion: `${args['group']}/${args['version']}`,
            kind: args['kind'],
            metadata: getMeta(args),
        }
        if (args['spec'] != undefined && args['spec'] != null)
            request["spec"] =  args['spec'];
        try {
            const resGet = await k8sApi.getClusterCustomObject(args['group'],args['version'],args['plural'], args['metadata']['name'])
            const payload = rfc6902.createPatch(resGet.body,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await k8sApi.patchClusterCustomObject(args['group'],args['version'],args['plural'], args['metadata']['name'], payload, undefined, undefined, undefined, options)
            return res.body
        } catch (err) {
          if (typeof err === 'object' && (err as object)['body'] !=undefined && (err as object)['statusCode'] !=undefined) {
            if ((err as object)['statusCode'] != 404 && (err as object)['body']['reason']!='Forbidden') {
              console.error('error', (err as object)['body']);
            }
          } else {console.error('error', err)}
        }
        return null
    },
    namespacedCrdObjectCreate: async (_parent, args: object) => {
        const payload = {
            apiVersion: `${args['group']}/${args['version']}`,
            kind: args['kind'],
            metadata: getMetaNS(args),
            "spec": args['spec'],
        }
        try {
            const res = await k8sApi.createNamespacedCustomObject(args['group'],args['version'],args['metadata']['namespace'],args['plural'], payload)
            return res.body
        } catch (err) {
          if (typeof err === 'object' && (err as object)['body'] !=undefined && (err as object)['statusCode'] !=undefined) {
            if ((err as object)['statusCode'] != 404 && (err as object)['body']['reason']!='Forbidden') {
              console.error('error', (err as object)['body']);
            }
          } else {console.error('error', err)}
        }
        return null
    },
    namespacedCrdObjectDelete: async (_parent, args: object) => {
        try {
            const res = await k8sApi.deleteNamespacedCustomObject(args['group'],args['version'],args['namespace'],args['plural'], args['name'])
            return res.body
        } catch (err) {
          if (typeof err === 'object' && (err as object)['body'] !=undefined && (err as object)['statusCode'] !=undefined) {
            if ((err as object)['statusCode'] != 404 && (err as object)['body']['reason']!='Forbidden') {
              console.error('error', (err as object)['body']);
            }
          } else {console.error('error', err)}
        }
        return null
    },
    namespacedCrdObjectPatch: async (_parent, args: object) => {
        const request = {
            apiVersion: `${args['group']}/${args['version']}`,
            kind: args['kind'],
            metadata: getMetaNS(args),
        }
        if (args['spec'] != undefined && args['spec'] != null)
            request["spec"] =  args['spec'];
        try {
            const resGet = await k8sApi.getNamespacedCustomObject(args['group'],args['version'],args['metadata']['namespace'],args['plural'], args['metadata']['name'])
            const payload = rfc6902.createPatch(resGet.body,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await k8sApi.patchNamespacedCustomObject(args['group'],args['version'],args['metadata']['namespace'],args['plural'], args['metadata']['name'], payload, undefined, undefined, undefined, options)
            return res.body
        } catch (err) {
          if (typeof err === 'object' && (err as object)['body'] !=undefined && (err as object)['statusCode'] !=undefined) {
            if ((err as object)['statusCode'] != 404 && (err as object)['body']['reason']!='Forbidden') {
              console.error('error', (err as object)['body']);
            }
          } else {console.error('error', err)}
        }
        return null
    },
};
export const lists = {
};
export const queries = {
};
export const resolvers = {
};
