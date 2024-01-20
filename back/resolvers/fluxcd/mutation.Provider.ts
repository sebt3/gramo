import {kc, k8s, getMetadata} from '../core/libs.js';
import { FluxcdProvider } from './type.Provider.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createFluxcdProvider: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['address'] !== undefined && typeof args['spec']['address'] == 'string') spec['address'] = args['spec']['address'];
        if (args['spec']['certSecretRef'] !== undefined && typeof args['spec']['certSecretRef'] == 'object') spec['certSecretRef'] = args['spec']['certSecretRef'];
        if (args['spec']['channel'] !== undefined && typeof args['spec']['channel'] == 'string') spec['channel'] = args['spec']['channel'];
        if (args['spec']['interval'] !== undefined && typeof args['spec']['interval'] == 'string') spec['interval'] = args['spec']['interval'];
        if (args['spec']['proxy'] !== undefined && typeof args['spec']['proxy'] == 'string') spec['proxy'] = args['spec']['proxy'];
        if (args['spec']['secretRef'] !== undefined && typeof args['spec']['secretRef'] == 'object') spec['secretRef'] = args['spec']['secretRef'];
        if (args['spec']['suspend'] !== undefined && typeof args['spec']['suspend'] == 'boolean') spec['suspend'] = args['spec']['suspend'];
        if (args['spec']['timeout'] !== undefined && typeof args['spec']['timeout'] == 'string') spec['timeout'] = args['spec']['timeout'];
        spec['type'] = args['spec']['type'];
        if (args['spec']['username'] !== undefined && typeof args['spec']['username'] == 'string') spec['username'] = args['spec']['username'];
        const payload = {
            apiVersion: 'notification.toolkit.fluxcd.io/v1beta2',
            kind: 'Provider',
            metadata: {
              namespace: args['namespace'],
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createNamespacedCustomObject('notification.toolkit.fluxcd.io','v1beta2',args['namespace'],'providers', payload)
            const ext = res.body as FluxcdProvider
            return {
                metadata: getMetadata(ext.metadata, ext),
                "address": ext.spec['address'],
                "certSecretRef": ext.spec['certSecretRef'],
                "channel": ext.spec['channel'],
                "interval": ext.spec['interval'],
                "proxy": ext.spec['proxy'],
                "secretRef": ext.spec['secretRef'],
                "suspend": ext.spec['suspend'],
                "timeout": ext.spec['timeout'],
                "type": ext.spec['type'],
                "username": ext.spec['username'],
                status: ext.status==undefined?null:{
                    "conditions": ext.status['conditions'],
                    "lastHandledReconcileAt": ext.status['lastHandledReconcileAt'],
                    "observedGeneration": ext.status['observedGeneration'],
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    patchFluxcdProvider: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['address'] !== undefined && typeof args['spec']['address'] == 'string') spec['address'] = args['spec']['address'];
        if (args['spec']['certSecretRef'] !== undefined && typeof args['spec']['certSecretRef'] == 'object') spec['certSecretRef'] = args['spec']['certSecretRef'];
        if (args['spec']['channel'] !== undefined && typeof args['spec']['channel'] == 'string') spec['channel'] = args['spec']['channel'];
        if (args['spec']['interval'] !== undefined && typeof args['spec']['interval'] == 'string') spec['interval'] = args['spec']['interval'];
        if (args['spec']['proxy'] !== undefined && typeof args['spec']['proxy'] == 'string') spec['proxy'] = args['spec']['proxy'];
        if (args['spec']['secretRef'] !== undefined && typeof args['spec']['secretRef'] == 'object') spec['secretRef'] = args['spec']['secretRef'];
        if (args['spec']['suspend'] !== undefined && typeof args['spec']['suspend'] == 'boolean') spec['suspend'] = args['spec']['suspend'];
        if (args['spec']['timeout'] !== undefined && typeof args['spec']['timeout'] == 'string') spec['timeout'] = args['spec']['timeout'];
        spec['type'] = args['spec']['type'];
        if (args['spec']['username'] !== undefined && typeof args['spec']['username'] == 'string') spec['username'] = args['spec']['username'];
        const request = {
            apiVersion: 'notification.toolkit.fluxcd.io/v1beta2',
            kind: 'Provider',
            metadata: {
                namespace: args['namespace'],
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getNamespacedCustomObject('notification.toolkit.fluxcd.io','v1beta2',args['namespace'],'providers', args['name'])
            const extGet = resGet.body as FluxcdProvider
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchNamespacedCustomObject('notification.toolkit.fluxcd.io','v1beta2',args['namespace'],'providers', args['name'], payload, undefined, undefined, undefined, options)
            const ext = res.body as FluxcdProvider
            return {
                metadata: getMetadata(ext.metadata, ext),
                "address": ext.spec['address'],
                "certSecretRef": ext.spec['certSecretRef'],
                "channel": ext.spec['channel'],
                "interval": ext.spec['interval'],
                "proxy": ext.spec['proxy'],
                "secretRef": ext.spec['secretRef'],
                "suspend": ext.spec['suspend'],
                "timeout": ext.spec['timeout'],
                "type": ext.spec['type'],
                "username": ext.spec['username'],
                status: ext.status==undefined?null:{
                    "conditions": ext.status['conditions'],
                    "lastHandledReconcileAt": ext.status['lastHandledReconcileAt'],
                    "observedGeneration": ext.status['observedGeneration'],
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    deleteFluxcdProvider: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteNamespacedCustomObject('notification.toolkit.fluxcd.io','v1beta2',args['namespace'],'providers', args['name'])
        const ext = res.body as FluxcdProvider
        return {
            metadata: getMetadata(ext.metadata, ext),
            "address": ext.spec['address'],
            "certSecretRef": ext.spec['certSecretRef'],
            "channel": ext.spec['channel'],
            "interval": ext.spec['interval'],
            "proxy": ext.spec['proxy'],
            "secretRef": ext.spec['secretRef'],
            "suspend": ext.spec['suspend'],
            "timeout": ext.spec['timeout'],
            "type": ext.spec['type'],
            "username": ext.spec['username'],
            status: ext.status==undefined?null:{
                "conditions": ext.status['conditions'],
                "lastHandledReconcileAt": ext.status['lastHandledReconcileAt'],
                "observedGeneration": ext.status['observedGeneration'],
            }
        }
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
},
};
