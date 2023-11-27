import {kc, k8s, getMetadata} from '../core/libs.js';
import { FluxcdKustomization } from './type.Kustomization.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createFluxcdKustomization: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['commonMetadata'] !== undefined && typeof args['spec']['commonMetadata'] == 'object') spec['commonMetadata'] = args['spec']['commonMetadata'];
        if (args['spec']['components'] !== undefined && Array.isArray(args['spec']['components'])) spec['components'] = args['spec']['components'];
        if (args['spec']['decryption'] !== undefined && typeof args['spec']['decryption'] == 'object') spec['decryption'] = args['spec']['decryption'];
        if (args['spec']['dependsOn'] !== undefined && Array.isArray(args['spec']['dependsOn'])) spec['dependsOn'] = args['spec']['dependsOn'];
        if (args['spec']['force'] !== undefined && typeof args['spec']['force'] == 'boolean') spec['force'] = args['spec']['force'];
        if (args['spec']['healthChecks'] !== undefined && Array.isArray(args['spec']['healthChecks'])) spec['healthChecks'] = args['spec']['healthChecks'];
        if (args['spec']['images'] !== undefined && Array.isArray(args['spec']['images'])) spec['images'] = args['spec']['images'];
        spec['interval'] = args['spec']['interval'];
        if (args['spec']['kubeConfig'] !== undefined && typeof args['spec']['kubeConfig'] == 'object') spec['kubeConfig'] = args['spec']['kubeConfig'];
        if (args['spec']['patches'] !== undefined && Array.isArray(args['spec']['patches'])) spec['patches'] = args['spec']['patches'];
        if (args['spec']['path'] !== undefined && typeof args['spec']['path'] == 'string') spec['path'] = args['spec']['path'];
        if (args['spec']['postBuild'] !== undefined && typeof args['spec']['postBuild'] == 'object') spec['postBuild'] = args['spec']['postBuild'];
        spec['prune'] = args['spec']['prune'];
        if (args['spec']['retryInterval'] !== undefined && typeof args['spec']['retryInterval'] == 'string') spec['retryInterval'] = args['spec']['retryInterval'];
        if (args['spec']['serviceAccountName'] !== undefined && typeof args['spec']['serviceAccountName'] == 'string') spec['serviceAccountName'] = args['spec']['serviceAccountName'];
        spec['sourceRef'] = args['spec']['sourceRef'];
        if (args['spec']['suspend'] !== undefined && typeof args['spec']['suspend'] == 'boolean') spec['suspend'] = args['spec']['suspend'];
        if (args['spec']['targetNamespace'] !== undefined && typeof args['spec']['targetNamespace'] == 'string') spec['targetNamespace'] = args['spec']['targetNamespace'];
        if (args['spec']['timeout'] !== undefined && typeof args['spec']['timeout'] == 'string') spec['timeout'] = args['spec']['timeout'];
        if (args['spec']['wait'] !== undefined && typeof args['spec']['wait'] == 'boolean') spec['wait'] = args['spec']['wait'];
        const payload = {
            apiVersion: 'kustomize.toolkit.fluxcd.io/v1',
            kind: 'Kustomization',
            metadata: {
              namespace: args['namespace'],
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createNamespacedCustomObject('kustomize.toolkit.fluxcd.io','v1',args['namespace'],'kustomizations', payload)
            const ext = res.body as FluxcdKustomization
            return {
                metadata: getMetadata(ext.metadata),
                commonMetadata: ext.spec.commonMetadata,
                components: ext.spec.components,
                decryption: ext.spec.decryption,
                dependsOn: ext.spec.dependsOn,
                force: ext.spec.force,
                healthChecks: ext.spec.healthChecks,
                images: ext.spec.images,
                interval: ext.spec.interval,
                kubeConfig: ext.spec.kubeConfig,
                patches: ext.spec.patches,
                path: ext.spec.path,
                postBuild: ext.spec.postBuild,
                prune: ext.spec.prune,
                retryInterval: ext.spec.retryInterval,
                serviceAccountName: ext.spec.serviceAccountName,
                sourceRef: ext.spec.sourceRef,
                suspend: ext.spec.suspend,
                targetNamespace: ext.spec.targetNamespace,
                timeout: ext.spec.timeout,
                wait: ext.spec.wait,
                status: ext.status==undefined?null:{
                    conditions: ext.status.conditions,
                    inventory: ext.status.inventory,
                    lastAppliedRevision: ext.status.lastAppliedRevision,
                    lastAttemptedRevision: ext.status.lastAttemptedRevision,
                    lastHandledReconcileAt: ext.status.lastHandledReconcileAt,
                    observedGeneration: ext.status.observedGeneration,
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    patchFluxcdKustomization: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['commonMetadata'] !== undefined && typeof args['spec']['commonMetadata'] == 'object') spec['commonMetadata'] = args['spec']['commonMetadata'];
        if (args['spec']['components'] !== undefined && Array.isArray(args['spec']['components'])) spec['components'] = args['spec']['components'];
        if (args['spec']['decryption'] !== undefined && typeof args['spec']['decryption'] == 'object') spec['decryption'] = args['spec']['decryption'];
        if (args['spec']['dependsOn'] !== undefined && Array.isArray(args['spec']['dependsOn'])) spec['dependsOn'] = args['spec']['dependsOn'];
        if (args['spec']['force'] !== undefined && typeof args['spec']['force'] == 'boolean') spec['force'] = args['spec']['force'];
        if (args['spec']['healthChecks'] !== undefined && Array.isArray(args['spec']['healthChecks'])) spec['healthChecks'] = args['spec']['healthChecks'];
        if (args['spec']['images'] !== undefined && Array.isArray(args['spec']['images'])) spec['images'] = args['spec']['images'];
        spec['interval'] = args['spec']['interval'];
        if (args['spec']['kubeConfig'] !== undefined && typeof args['spec']['kubeConfig'] == 'object') spec['kubeConfig'] = args['spec']['kubeConfig'];
        if (args['spec']['patches'] !== undefined && Array.isArray(args['spec']['patches'])) spec['patches'] = args['spec']['patches'];
        if (args['spec']['path'] !== undefined && typeof args['spec']['path'] == 'string') spec['path'] = args['spec']['path'];
        if (args['spec']['postBuild'] !== undefined && typeof args['spec']['postBuild'] == 'object') spec['postBuild'] = args['spec']['postBuild'];
        spec['prune'] = args['spec']['prune'];
        if (args['spec']['retryInterval'] !== undefined && typeof args['spec']['retryInterval'] == 'string') spec['retryInterval'] = args['spec']['retryInterval'];
        if (args['spec']['serviceAccountName'] !== undefined && typeof args['spec']['serviceAccountName'] == 'string') spec['serviceAccountName'] = args['spec']['serviceAccountName'];
        spec['sourceRef'] = args['spec']['sourceRef'];
        if (args['spec']['suspend'] !== undefined && typeof args['spec']['suspend'] == 'boolean') spec['suspend'] = args['spec']['suspend'];
        if (args['spec']['targetNamespace'] !== undefined && typeof args['spec']['targetNamespace'] == 'string') spec['targetNamespace'] = args['spec']['targetNamespace'];
        if (args['spec']['timeout'] !== undefined && typeof args['spec']['timeout'] == 'string') spec['timeout'] = args['spec']['timeout'];
        if (args['spec']['wait'] !== undefined && typeof args['spec']['wait'] == 'boolean') spec['wait'] = args['spec']['wait'];
        const request = {
            apiVersion: 'kustomize.toolkit.fluxcd.io/v1',
            kind: 'Distrib',
            metadata: {
                namespace: args['namespace'],
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getNamespacedCustomObject('kustomize.toolkit.fluxcd.io','v1',args['namespace'],'kustomizations', args['name'])
            const extGet = resGet.body as FluxcdKustomization
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchNamespacedCustomObject('kustomize.toolkit.fluxcd.io','v1',args['namespace'],'kustomizations', args['name'], payload, undefined, undefined, undefined, options)
            const ext = res.body as FluxcdKustomization
            return {
                metadata: getMetadata(ext.metadata),
                commonMetadata: ext.spec.commonMetadata,
                components: ext.spec.components,
                decryption: ext.spec.decryption,
                dependsOn: ext.spec.dependsOn,
                force: ext.spec.force,
                healthChecks: ext.spec.healthChecks,
                images: ext.spec.images,
                interval: ext.spec.interval,
                kubeConfig: ext.spec.kubeConfig,
                patches: ext.spec.patches,
                path: ext.spec.path,
                postBuild: ext.spec.postBuild,
                prune: ext.spec.prune,
                retryInterval: ext.spec.retryInterval,
                serviceAccountName: ext.spec.serviceAccountName,
                sourceRef: ext.spec.sourceRef,
                suspend: ext.spec.suspend,
                targetNamespace: ext.spec.targetNamespace,
                timeout: ext.spec.timeout,
                wait: ext.spec.wait,
                status: ext.status==undefined?null:{
                    conditions: ext.status.conditions,
                    inventory: ext.status.inventory,
                    lastAppliedRevision: ext.status.lastAppliedRevision,
                    lastAttemptedRevision: ext.status.lastAttemptedRevision,
                    lastHandledReconcileAt: ext.status.lastHandledReconcileAt,
                    observedGeneration: ext.status.observedGeneration,
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    deleteFluxcdKustomization: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteNamespacedCustomObject('kustomize.toolkit.fluxcd.io','v1',args['namespace'],'kustomizations', args['name'])
        const ext = res.body as FluxcdKustomization
        return {
            metadata: getMetadata(ext.metadata),
            commonMetadata: ext.spec.commonMetadata,
            components: ext.spec.components,
            decryption: ext.spec.decryption,
            dependsOn: ext.spec.dependsOn,
            force: ext.spec.force,
            healthChecks: ext.spec.healthChecks,
            images: ext.spec.images,
            interval: ext.spec.interval,
            kubeConfig: ext.spec.kubeConfig,
            patches: ext.spec.patches,
            path: ext.spec.path,
            postBuild: ext.spec.postBuild,
            prune: ext.spec.prune,
            retryInterval: ext.spec.retryInterval,
            serviceAccountName: ext.spec.serviceAccountName,
            sourceRef: ext.spec.sourceRef,
            suspend: ext.spec.suspend,
            targetNamespace: ext.spec.targetNamespace,
            timeout: ext.spec.timeout,
            wait: ext.spec.wait,
            status: ext.status==undefined?null:{
                conditions: ext.status.conditions,
                inventory: ext.status.inventory,
                lastAppliedRevision: ext.status.lastAppliedRevision,
                lastAttemptedRevision: ext.status.lastAttemptedRevision,
                lastHandledReconcileAt: ext.status.lastHandledReconcileAt,
                observedGeneration: ext.status.observedGeneration,
            }
        }
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
},
};
