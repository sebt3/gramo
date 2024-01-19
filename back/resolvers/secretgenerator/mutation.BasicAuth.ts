import {kc, k8s, getMetadata} from '../core/libs.js';
import { SecretgeneratorBasicAuth } from './type.BasicAuth.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createSecretgeneratorBasicAuth: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['data'] !== undefined && typeof args['spec']['data'] == 'object') spec['data'] = args['spec']['data'];
        if (args['spec']['encoding'] !== undefined && typeof args['spec']['encoding'] == 'string') spec['encoding'] = args['spec']['encoding'];
        if (args['spec']['forceRegenerate'] !== undefined && typeof args['spec']['forceRegenerate'] == 'boolean') spec['forceRegenerate'] = args['spec']['forceRegenerate'];
        if (args['spec']['length'] !== undefined && typeof args['spec']['length'] == 'string') spec['length'] = args['spec']['length'];
        spec['username'] = args['spec']['username'];
        const payload = {
            apiVersion: 'secretgenerator.mittwald.de/v1alpha1',
            kind: 'BasicAuth',
            metadata: {
              namespace: args['namespace'],
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createNamespacedCustomObject('secretgenerator.mittwald.de','v1alpha1',args['namespace'],'basicauths', payload)
            const ext = res.body as SecretgeneratorBasicAuth
            return {
                metadata: getMetadata(ext.metadata),
                "data": ext.spec['data'],
                "encoding": ext.spec['encoding'],
                "forceRegenerate": ext.spec['forceRegenerate'],
                "length": ext.spec['length'],
                "username": ext.spec['username'],
                status: ext.status==undefined?null:{
                    "secret": ext.status['secret'],
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    patchSecretgeneratorBasicAuth: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['data'] !== undefined && typeof args['spec']['data'] == 'object') spec['data'] = args['spec']['data'];
        if (args['spec']['encoding'] !== undefined && typeof args['spec']['encoding'] == 'string') spec['encoding'] = args['spec']['encoding'];
        if (args['spec']['forceRegenerate'] !== undefined && typeof args['spec']['forceRegenerate'] == 'boolean') spec['forceRegenerate'] = args['spec']['forceRegenerate'];
        if (args['spec']['length'] !== undefined && typeof args['spec']['length'] == 'string') spec['length'] = args['spec']['length'];
        spec['username'] = args['spec']['username'];
        const request = {
            apiVersion: 'secretgenerator.mittwald.de/v1alpha1',
            kind: 'BasicAuth',
            metadata: {
                namespace: args['namespace'],
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getNamespacedCustomObject('secretgenerator.mittwald.de','v1alpha1',args['namespace'],'basicauths', args['name'])
            const extGet = resGet.body as SecretgeneratorBasicAuth
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchNamespacedCustomObject('secretgenerator.mittwald.de','v1alpha1',args['namespace'],'basicauths', args['name'], payload, undefined, undefined, undefined, options)
            const ext = res.body as SecretgeneratorBasicAuth
            return {
                metadata: getMetadata(ext.metadata),
                "data": ext.spec['data'],
                "encoding": ext.spec['encoding'],
                "forceRegenerate": ext.spec['forceRegenerate'],
                "length": ext.spec['length'],
                "username": ext.spec['username'],
                status: ext.status==undefined?null:{
                    "secret": ext.status['secret'],
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    deleteSecretgeneratorBasicAuth: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteNamespacedCustomObject('secretgenerator.mittwald.de','v1alpha1',args['namespace'],'basicauths', args['name'])
        const ext = res.body as SecretgeneratorBasicAuth
        return {
            metadata: getMetadata(ext.metadata),
            "data": ext.spec['data'],
            "encoding": ext.spec['encoding'],
            "forceRegenerate": ext.spec['forceRegenerate'],
            "length": ext.spec['length'],
            "username": ext.spec['username'],
            status: ext.status==undefined?null:{
                "secret": ext.status['secret'],
            }
        }
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
},
};
