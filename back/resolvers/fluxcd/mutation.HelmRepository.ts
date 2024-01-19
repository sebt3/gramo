import {kc, k8s, getMetadata} from '../core/libs.js';
import { FluxcdHelmRepository } from './type.HelmRepository.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createFluxcdHelmRepository: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['accessFrom'] !== undefined && typeof args['spec']['accessFrom'] == 'object') spec['accessFrom'] = args['spec']['accessFrom'];
        spec['interval'] = args['spec']['interval'];
        if (args['spec']['passCredentials'] !== undefined && typeof args['spec']['passCredentials'] == 'boolean') spec['passCredentials'] = args['spec']['passCredentials'];
        if (args['spec']['provider'] !== undefined && typeof args['spec']['provider'] == 'string') spec['provider'] = args['spec']['provider'];
        if (args['spec']['secretRef'] !== undefined && typeof args['spec']['secretRef'] == 'object') spec['secretRef'] = args['spec']['secretRef'];
        if (args['spec']['suspend'] !== undefined && typeof args['spec']['suspend'] == 'boolean') spec['suspend'] = args['spec']['suspend'];
        if (args['spec']['timeout'] !== undefined && typeof args['spec']['timeout'] == 'string') spec['timeout'] = args['spec']['timeout'];
        if (args['spec']['type'] !== undefined && typeof args['spec']['type'] == 'string') spec['type'] = args['spec']['type'];
        spec['url'] = args['spec']['url'];
        const payload = {
            apiVersion: 'source.toolkit.fluxcd.io/v1beta2',
            kind: 'HelmRepository',
            metadata: {
              namespace: args['namespace'],
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createNamespacedCustomObject('source.toolkit.fluxcd.io','v1beta2',args['namespace'],'helmrepositories', payload)
            const ext = res.body as FluxcdHelmRepository
            return {
                metadata: getMetadata(ext.metadata),
                "accessFrom": ext.spec['accessFrom'],
                "interval": ext.spec['interval'],
                "passCredentials": ext.spec['passCredentials'],
                "provider": ext.spec['provider'],
                "secretRef": ext.spec['secretRef'],
                "suspend": ext.spec['suspend'],
                "timeout": ext.spec['timeout'],
                "type": ext.spec['type'],
                "url": ext.spec['url'],
                status: ext.status==undefined?null:{
                    "artifact": ext.status['artifact'],
                    "conditions": ext.status['conditions'],
                    "lastHandledReconcileAt": ext.status['lastHandledReconcileAt'],
                    "observedGeneration": ext.status['observedGeneration'],
                    "url": ext.status['url'],
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    patchFluxcdHelmRepository: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['accessFrom'] !== undefined && typeof args['spec']['accessFrom'] == 'object') spec['accessFrom'] = args['spec']['accessFrom'];
        spec['interval'] = args['spec']['interval'];
        if (args['spec']['passCredentials'] !== undefined && typeof args['spec']['passCredentials'] == 'boolean') spec['passCredentials'] = args['spec']['passCredentials'];
        if (args['spec']['provider'] !== undefined && typeof args['spec']['provider'] == 'string') spec['provider'] = args['spec']['provider'];
        if (args['spec']['secretRef'] !== undefined && typeof args['spec']['secretRef'] == 'object') spec['secretRef'] = args['spec']['secretRef'];
        if (args['spec']['suspend'] !== undefined && typeof args['spec']['suspend'] == 'boolean') spec['suspend'] = args['spec']['suspend'];
        if (args['spec']['timeout'] !== undefined && typeof args['spec']['timeout'] == 'string') spec['timeout'] = args['spec']['timeout'];
        if (args['spec']['type'] !== undefined && typeof args['spec']['type'] == 'string') spec['type'] = args['spec']['type'];
        spec['url'] = args['spec']['url'];
        const request = {
            apiVersion: 'source.toolkit.fluxcd.io/v1beta2',
            kind: 'HelmRepository',
            metadata: {
                namespace: args['namespace'],
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getNamespacedCustomObject('source.toolkit.fluxcd.io','v1beta2',args['namespace'],'helmrepositories', args['name'])
            const extGet = resGet.body as FluxcdHelmRepository
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchNamespacedCustomObject('source.toolkit.fluxcd.io','v1beta2',args['namespace'],'helmrepositories', args['name'], payload, undefined, undefined, undefined, options)
            const ext = res.body as FluxcdHelmRepository
            return {
                metadata: getMetadata(ext.metadata),
                "accessFrom": ext.spec['accessFrom'],
                "interval": ext.spec['interval'],
                "passCredentials": ext.spec['passCredentials'],
                "provider": ext.spec['provider'],
                "secretRef": ext.spec['secretRef'],
                "suspend": ext.spec['suspend'],
                "timeout": ext.spec['timeout'],
                "type": ext.spec['type'],
                "url": ext.spec['url'],
                status: ext.status==undefined?null:{
                    "artifact": ext.status['artifact'],
                    "conditions": ext.status['conditions'],
                    "lastHandledReconcileAt": ext.status['lastHandledReconcileAt'],
                    "observedGeneration": ext.status['observedGeneration'],
                    "url": ext.status['url'],
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    deleteFluxcdHelmRepository: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteNamespacedCustomObject('source.toolkit.fluxcd.io','v1beta2',args['namespace'],'helmrepositories', args['name'])
        const ext = res.body as FluxcdHelmRepository
        return {
            metadata: getMetadata(ext.metadata),
            "accessFrom": ext.spec['accessFrom'],
            "interval": ext.spec['interval'],
            "passCredentials": ext.spec['passCredentials'],
            "provider": ext.spec['provider'],
            "secretRef": ext.spec['secretRef'],
            "suspend": ext.spec['suspend'],
            "timeout": ext.spec['timeout'],
            "type": ext.spec['type'],
            "url": ext.spec['url'],
            status: ext.status==undefined?null:{
                "artifact": ext.status['artifact'],
                "conditions": ext.status['conditions'],
                "lastHandledReconcileAt": ext.status['lastHandledReconcileAt'],
                "observedGeneration": ext.status['observedGeneration'],
                "url": ext.status['url'],
            }
        }
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
},
};
