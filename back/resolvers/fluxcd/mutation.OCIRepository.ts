import {kc, k8s, getMetadata} from '../core/libs.js';
import { FluxcdOCIRepository } from './type.OCIRepository.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createFluxcdOCIRepository: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['certSecretRef'] !== undefined && typeof args['spec']['certSecretRef'] == 'object') spec['certSecretRef'] = args['spec']['certSecretRef'];
        if (args['spec']['ignore'] !== undefined && typeof args['spec']['ignore'] == 'string') spec['ignore'] = args['spec']['ignore'];
        if (args['spec']['insecure'] !== undefined && typeof args['spec']['insecure'] == 'boolean') spec['insecure'] = args['spec']['insecure'];
        spec['interval'] = args['spec']['interval'];
        if (args['spec']['layerSelector'] !== undefined && typeof args['spec']['layerSelector'] == 'object') spec['layerSelector'] = args['spec']['layerSelector'];
        if (args['spec']['provider'] !== undefined && typeof args['spec']['provider'] == 'string') spec['provider'] = args['spec']['provider'];
        if (args['spec']['ref'] !== undefined && typeof args['spec']['ref'] == 'object') spec['ref'] = args['spec']['ref'];
        if (args['spec']['secretRef'] !== undefined && typeof args['spec']['secretRef'] == 'object') spec['secretRef'] = args['spec']['secretRef'];
        if (args['spec']['serviceAccountName'] !== undefined && typeof args['spec']['serviceAccountName'] == 'string') spec['serviceAccountName'] = args['spec']['serviceAccountName'];
        if (args['spec']['suspend'] !== undefined && typeof args['spec']['suspend'] == 'boolean') spec['suspend'] = args['spec']['suspend'];
        if (args['spec']['timeout'] !== undefined && typeof args['spec']['timeout'] == 'string') spec['timeout'] = args['spec']['timeout'];
        spec['url'] = args['spec']['url'];
        if (args['spec']['verify'] !== undefined && typeof args['spec']['verify'] == 'object') spec['verify'] = args['spec']['verify'];
        const payload = {
            apiVersion: 'source.toolkit.fluxcd.io/v1beta2',
            kind: 'OCIRepository',
            metadata: {
              namespace: args['namespace'],
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createNamespacedCustomObject('source.toolkit.fluxcd.io','v1beta2',args['namespace'],'ocirepositories', payload)
            const ext = res.body as FluxcdOCIRepository
            return {
                metadata: getMetadata(ext.metadata),
                certSecretRef: ext.spec.certSecretRef,
                ignore: ext.spec.ignore,
                insecure: ext.spec.insecure,
                interval: ext.spec.interval,
                layerSelector: ext.spec.layerSelector,
                provider: ext.spec.provider,
                ref: ext.spec.ref,
                secretRef: ext.spec.secretRef,
                serviceAccountName: ext.spec.serviceAccountName,
                suspend: ext.spec.suspend,
                timeout: ext.spec.timeout,
                url: ext.spec.url,
                verify: ext.spec.verify,
                status: ext.status==undefined?null:{
                    artifact: ext.status.artifact,
                    conditions: ext.status.conditions,
                    contentConfigChecksum: ext.status.contentConfigChecksum,
                    lastHandledReconcileAt: ext.status.lastHandledReconcileAt,
                    observedGeneration: ext.status.observedGeneration,
                    observedIgnore: ext.status.observedIgnore,
                    observedLayerSelector: ext.status.observedLayerSelector,
                    url: ext.status.url,
                }
            }
        } catch (err) {
            console.error(err);
        }
        return null
    },
    patchFluxcdOCIRepository: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['certSecretRef'] !== undefined && typeof args['spec']['certSecretRef'] == 'object') spec['certSecretRef'] = args['spec']['certSecretRef'];
        if (args['spec']['ignore'] !== undefined && typeof args['spec']['ignore'] == 'string') spec['ignore'] = args['spec']['ignore'];
        if (args['spec']['insecure'] !== undefined && typeof args['spec']['insecure'] == 'boolean') spec['insecure'] = args['spec']['insecure'];
        spec['interval'] = args['spec']['interval'];
        if (args['spec']['layerSelector'] !== undefined && typeof args['spec']['layerSelector'] == 'object') spec['layerSelector'] = args['spec']['layerSelector'];
        if (args['spec']['provider'] !== undefined && typeof args['spec']['provider'] == 'string') spec['provider'] = args['spec']['provider'];
        if (args['spec']['ref'] !== undefined && typeof args['spec']['ref'] == 'object') spec['ref'] = args['spec']['ref'];
        if (args['spec']['secretRef'] !== undefined && typeof args['spec']['secretRef'] == 'object') spec['secretRef'] = args['spec']['secretRef'];
        if (args['spec']['serviceAccountName'] !== undefined && typeof args['spec']['serviceAccountName'] == 'string') spec['serviceAccountName'] = args['spec']['serviceAccountName'];
        if (args['spec']['suspend'] !== undefined && typeof args['spec']['suspend'] == 'boolean') spec['suspend'] = args['spec']['suspend'];
        if (args['spec']['timeout'] !== undefined && typeof args['spec']['timeout'] == 'string') spec['timeout'] = args['spec']['timeout'];
        spec['url'] = args['spec']['url'];
        if (args['spec']['verify'] !== undefined && typeof args['spec']['verify'] == 'object') spec['verify'] = args['spec']['verify'];
        const request = {
            apiVersion: 'source.toolkit.fluxcd.io/v1beta2',
            kind: 'Distrib',
            metadata: {
                namespace: args['namespace'],
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getNamespacedCustomObject('source.toolkit.fluxcd.io','v1beta2',args['namespace'],'ocirepositories', args['name'])
            const extGet = resGet.body as FluxcdOCIRepository
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchNamespacedCustomObject('source.toolkit.fluxcd.io','v1beta2',args['namespace'],'ocirepositories', args['name'], payload, undefined, undefined, undefined, options)
            const ext = res.body as FluxcdOCIRepository
            return {
                metadata: getMetadata(ext.metadata),
                certSecretRef: ext.spec.certSecretRef,
                ignore: ext.spec.ignore,
                insecure: ext.spec.insecure,
                interval: ext.spec.interval,
                layerSelector: ext.spec.layerSelector,
                provider: ext.spec.provider,
                ref: ext.spec.ref,
                secretRef: ext.spec.secretRef,
                serviceAccountName: ext.spec.serviceAccountName,
                suspend: ext.spec.suspend,
                timeout: ext.spec.timeout,
                url: ext.spec.url,
                verify: ext.spec.verify,
                status: ext.status==undefined?null:{
                    artifact: ext.status.artifact,
                    conditions: ext.status.conditions,
                    contentConfigChecksum: ext.status.contentConfigChecksum,
                    lastHandledReconcileAt: ext.status.lastHandledReconcileAt,
                    observedGeneration: ext.status.observedGeneration,
                    observedIgnore: ext.status.observedIgnore,
                    observedLayerSelector: ext.status.observedLayerSelector,
                    url: ext.status.url,
                }
            }
        } catch (err) {
            console.error(err);
        }
        return null
    },
    deleteFluxcdOCIRepository: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteNamespacedCustomObject('source.toolkit.fluxcd.io','v1beta2',args['namespace'],'ocirepositories', args['name'])
        const ext = res.body as FluxcdOCIRepository
        return {
            metadata: getMetadata(ext.metadata),
            certSecretRef: ext.spec.certSecretRef,
            ignore: ext.spec.ignore,
            insecure: ext.spec.insecure,
            interval: ext.spec.interval,
            layerSelector: ext.spec.layerSelector,
            provider: ext.spec.provider,
            ref: ext.spec.ref,
            secretRef: ext.spec.secretRef,
            serviceAccountName: ext.spec.serviceAccountName,
            suspend: ext.spec.suspend,
            timeout: ext.spec.timeout,
            url: ext.spec.url,
            verify: ext.spec.verify,
            status: ext.status==undefined?null:{
                artifact: ext.status.artifact,
                conditions: ext.status.conditions,
                contentConfigChecksum: ext.status.contentConfigChecksum,
                lastHandledReconcileAt: ext.status.lastHandledReconcileAt,
                observedGeneration: ext.status.observedGeneration,
                observedIgnore: ext.status.observedIgnore,
                observedLayerSelector: ext.status.observedLayerSelector,
                url: ext.status.url,
            }
        }
    } catch (err) {
        console.error(err);
    }
    return null
},
};
