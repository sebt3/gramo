import {kc, k8s, getMetadata} from '../core/libs.js';
import { FluxcdImageRepository } from './type.ImageRepository.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createFluxcdImageRepository: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['accessFrom'] !== undefined && typeof args['spec']['accessFrom'] == 'object') spec['accessFrom'] = args['spec']['accessFrom'];
        if (args['spec']['certSecretRef'] !== undefined && typeof args['spec']['certSecretRef'] == 'object') spec['certSecretRef'] = args['spec']['certSecretRef'];
        if (args['spec']['exclusionList'] !== undefined && Array.isArray(args['spec']['exclusionList'])) spec['exclusionList'] = args['spec']['exclusionList'];
        if (args['spec']['image'] !== undefined && typeof args['spec']['image'] == 'string') spec['image'] = args['spec']['image'];
        if (args['spec']['interval'] !== undefined && typeof args['spec']['interval'] == 'string') spec['interval'] = args['spec']['interval'];
        if (args['spec']['provider'] !== undefined && typeof args['spec']['provider'] == 'string') spec['provider'] = args['spec']['provider'];
        if (args['spec']['secretRef'] !== undefined && typeof args['spec']['secretRef'] == 'object') spec['secretRef'] = args['spec']['secretRef'];
        if (args['spec']['serviceAccountName'] !== undefined && typeof args['spec']['serviceAccountName'] == 'string') spec['serviceAccountName'] = args['spec']['serviceAccountName'];
        if (args['spec']['suspend'] !== undefined && typeof args['spec']['suspend'] == 'boolean') spec['suspend'] = args['spec']['suspend'];
        if (args['spec']['timeout'] !== undefined && typeof args['spec']['timeout'] == 'string') spec['timeout'] = args['spec']['timeout'];
        const payload = {
            apiVersion: 'image.toolkit.fluxcd.io/v1beta2',
            kind: 'ImageRepository',
            metadata: {
              namespace: args['namespace'],
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createNamespacedCustomObject('image.toolkit.fluxcd.io','v1beta2',args['namespace'],'imagerepositories', payload)
            const ext = res.body as FluxcdImageRepository
            return {
                metadata: getMetadata(ext.metadata),
                accessFrom: ext.spec.accessFrom,
                certSecretRef: ext.spec.certSecretRef,
                exclusionList: ext.spec.exclusionList,
                image: ext.spec.image,
                interval: ext.spec.interval,
                provider: ext.spec.provider,
                secretRef: ext.spec.secretRef,
                serviceAccountName: ext.spec.serviceAccountName,
                suspend: ext.spec.suspend,
                timeout: ext.spec.timeout,
                status: ext.status==undefined?null:{
                    canonicalImageName: ext.status.canonicalImageName,
                    conditions: ext.status.conditions,
                    lastHandledReconcileAt: ext.status.lastHandledReconcileAt,
                    lastScanResult: ext.status.lastScanResult,
                    observedExclusionList: ext.status.observedExclusionList,
                    observedGeneration: ext.status.observedGeneration,
                }
            }
        } catch (err) {
            console.error(err);
        }
        return null
    },
    patchFluxcdImageRepository: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['accessFrom'] !== undefined && typeof args['spec']['accessFrom'] == 'object') spec['accessFrom'] = args['spec']['accessFrom'];
        if (args['spec']['certSecretRef'] !== undefined && typeof args['spec']['certSecretRef'] == 'object') spec['certSecretRef'] = args['spec']['certSecretRef'];
        if (args['spec']['exclusionList'] !== undefined && Array.isArray(args['spec']['exclusionList'])) spec['exclusionList'] = args['spec']['exclusionList'];
        if (args['spec']['image'] !== undefined && typeof args['spec']['image'] == 'string') spec['image'] = args['spec']['image'];
        if (args['spec']['interval'] !== undefined && typeof args['spec']['interval'] == 'string') spec['interval'] = args['spec']['interval'];
        if (args['spec']['provider'] !== undefined && typeof args['spec']['provider'] == 'string') spec['provider'] = args['spec']['provider'];
        if (args['spec']['secretRef'] !== undefined && typeof args['spec']['secretRef'] == 'object') spec['secretRef'] = args['spec']['secretRef'];
        if (args['spec']['serviceAccountName'] !== undefined && typeof args['spec']['serviceAccountName'] == 'string') spec['serviceAccountName'] = args['spec']['serviceAccountName'];
        if (args['spec']['suspend'] !== undefined && typeof args['spec']['suspend'] == 'boolean') spec['suspend'] = args['spec']['suspend'];
        if (args['spec']['timeout'] !== undefined && typeof args['spec']['timeout'] == 'string') spec['timeout'] = args['spec']['timeout'];
        const request = {
            apiVersion: 'image.toolkit.fluxcd.io/v1beta2',
            kind: 'Distrib',
            metadata: {
                namespace: args['namespace'],
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getNamespacedCustomObject('image.toolkit.fluxcd.io','v1beta2',args['namespace'],'imagerepositories', args['name'])
            const extGet = resGet.body as FluxcdImageRepository
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchNamespacedCustomObject('image.toolkit.fluxcd.io','v1beta2',args['namespace'],'imagerepositories', args['name'], payload, undefined, undefined, undefined, options)
            const ext = res.body as FluxcdImageRepository
            return {
                metadata: getMetadata(ext.metadata),
                accessFrom: ext.spec.accessFrom,
                certSecretRef: ext.spec.certSecretRef,
                exclusionList: ext.spec.exclusionList,
                image: ext.spec.image,
                interval: ext.spec.interval,
                provider: ext.spec.provider,
                secretRef: ext.spec.secretRef,
                serviceAccountName: ext.spec.serviceAccountName,
                suspend: ext.spec.suspend,
                timeout: ext.spec.timeout,
                status: ext.status==undefined?null:{
                    canonicalImageName: ext.status.canonicalImageName,
                    conditions: ext.status.conditions,
                    lastHandledReconcileAt: ext.status.lastHandledReconcileAt,
                    lastScanResult: ext.status.lastScanResult,
                    observedExclusionList: ext.status.observedExclusionList,
                    observedGeneration: ext.status.observedGeneration,
                }
            }
        } catch (err) {
            console.error(err);
        }
        return null
    },
    deleteFluxcdImageRepository: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteNamespacedCustomObject('image.toolkit.fluxcd.io','v1beta2',args['namespace'],'imagerepositories', args['name'])
        const ext = res.body as FluxcdImageRepository
        return {
            metadata: getMetadata(ext.metadata),
            accessFrom: ext.spec.accessFrom,
            certSecretRef: ext.spec.certSecretRef,
            exclusionList: ext.spec.exclusionList,
            image: ext.spec.image,
            interval: ext.spec.interval,
            provider: ext.spec.provider,
            secretRef: ext.spec.secretRef,
            serviceAccountName: ext.spec.serviceAccountName,
            suspend: ext.spec.suspend,
            timeout: ext.spec.timeout,
            status: ext.status==undefined?null:{
                canonicalImageName: ext.status.canonicalImageName,
                conditions: ext.status.conditions,
                lastHandledReconcileAt: ext.status.lastHandledReconcileAt,
                lastScanResult: ext.status.lastScanResult,
                observedExclusionList: ext.status.observedExclusionList,
                observedGeneration: ext.status.observedGeneration,
            }
        }
    } catch (err) {
        console.error(err);
    }
    return null
},
};
