import {kc, k8s, getMetadata} from '../core/libs.js';
import { SecretgeneratorStringSecret } from './type.StringSecret.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createSecretgeneratorStringSecret: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['data'] !== undefined && typeof args['spec']['data'] == 'object') spec['data'] = args['spec']['data'];
        spec['fields'] = args['spec']['fields'];
        if (args['spec']['forceRegenerate'] !== undefined && typeof args['spec']['forceRegenerate'] == 'boolean') spec['forceRegenerate'] = args['spec']['forceRegenerate'];
        if (args['spec']['type'] !== undefined && typeof args['spec']['type'] == 'string') spec['type'] = args['spec']['type'];
        const payload = {
            apiVersion: 'secretgenerator.mittwald.de/v1alpha1',
            kind: 'StringSecret',
            metadata: {
              namespace: args['namespace'],
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createNamespacedCustomObject('secretgenerator.mittwald.de','v1alpha1',args['namespace'],'stringsecrets', payload)
            const ext = res.body as SecretgeneratorStringSecret
            return {
                metadata: getMetadata(ext.metadata),
                data: ext.spec.data,
                fields: ext.spec.fields,
                forceRegenerate: ext.spec.forceRegenerate,
                type: ext.spec.type,
                status: ext.status==undefined?null:{
                    secret: ext.status.secret,
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    patchSecretgeneratorStringSecret: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['data'] !== undefined && typeof args['spec']['data'] == 'object') spec['data'] = args['spec']['data'];
        spec['fields'] = args['spec']['fields'];
        if (args['spec']['forceRegenerate'] !== undefined && typeof args['spec']['forceRegenerate'] == 'boolean') spec['forceRegenerate'] = args['spec']['forceRegenerate'];
        if (args['spec']['type'] !== undefined && typeof args['spec']['type'] == 'string') spec['type'] = args['spec']['type'];
        const request = {
            apiVersion: 'secretgenerator.mittwald.de/v1alpha1',
            kind: 'StringSecret',
            metadata: {
                namespace: args['namespace'],
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getNamespacedCustomObject('secretgenerator.mittwald.de','v1alpha1',args['namespace'],'stringsecrets', args['name'])
            const extGet = resGet.body as SecretgeneratorStringSecret
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchNamespacedCustomObject('secretgenerator.mittwald.de','v1alpha1',args['namespace'],'stringsecrets', args['name'], payload, undefined, undefined, undefined, options)
            const ext = res.body as SecretgeneratorStringSecret
            return {
                metadata: getMetadata(ext.metadata),
                data: ext.spec.data,
                fields: ext.spec.fields,
                forceRegenerate: ext.spec.forceRegenerate,
                type: ext.spec.type,
                status: ext.status==undefined?null:{
                    secret: ext.status.secret,
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    deleteSecretgeneratorStringSecret: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteNamespacedCustomObject('secretgenerator.mittwald.de','v1alpha1',args['namespace'],'stringsecrets', args['name'])
        const ext = res.body as SecretgeneratorStringSecret
        return {
            metadata: getMetadata(ext.metadata),
            data: ext.spec.data,
            fields: ext.spec.fields,
            forceRegenerate: ext.spec.forceRegenerate,
            type: ext.spec.type,
            status: ext.status==undefined?null:{
                secret: ext.status.secret,
            }
        }
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
},
};
