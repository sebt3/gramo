import {kc, k8s, getMetadata} from '../core/libs.js';
import { FluxcdHelmRelease } from './type.HelmRelease.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createFluxcdHelmRelease: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        spec['chart'] = args['spec']['chart'];
        if (args['spec']['dependsOn'] !== undefined && Array.isArray(args['spec']['dependsOn'])) spec['dependsOn'] = args['spec']['dependsOn'];
        if (args['spec']['install'] !== undefined && typeof args['spec']['install'] == 'object') spec['install'] = args['spec']['install'];
        spec['interval'] = args['spec']['interval'];
        if (args['spec']['kubeConfig'] !== undefined && typeof args['spec']['kubeConfig'] == 'object') spec['kubeConfig'] = args['spec']['kubeConfig'];
        if (args['spec']['maxHistory'] !== undefined && typeof args['spec']['maxHistory'] == 'number') spec['maxHistory'] = args['spec']['maxHistory'];
        if (args['spec']['persistentClient'] !== undefined && typeof args['spec']['persistentClient'] == 'boolean') spec['persistentClient'] = args['spec']['persistentClient'];
        if (args['spec']['postRenderers'] !== undefined && Array.isArray(args['spec']['postRenderers'])) spec['postRenderers'] = args['spec']['postRenderers'];
        if (args['spec']['releaseName'] !== undefined && typeof args['spec']['releaseName'] == 'string') spec['releaseName'] = args['spec']['releaseName'];
        if (args['spec']['rollback'] !== undefined && typeof args['spec']['rollback'] == 'object') spec['rollback'] = args['spec']['rollback'];
        if (args['spec']['serviceAccountName'] !== undefined && typeof args['spec']['serviceAccountName'] == 'string') spec['serviceAccountName'] = args['spec']['serviceAccountName'];
        if (args['spec']['storageNamespace'] !== undefined && typeof args['spec']['storageNamespace'] == 'string') spec['storageNamespace'] = args['spec']['storageNamespace'];
        if (args['spec']['suspend'] !== undefined && typeof args['spec']['suspend'] == 'boolean') spec['suspend'] = args['spec']['suspend'];
        if (args['spec']['targetNamespace'] !== undefined && typeof args['spec']['targetNamespace'] == 'string') spec['targetNamespace'] = args['spec']['targetNamespace'];
        if (args['spec']['test'] !== undefined && typeof args['spec']['test'] == 'object') spec['test'] = args['spec']['test'];
        if (args['spec']['timeout'] !== undefined && typeof args['spec']['timeout'] == 'string') spec['timeout'] = args['spec']['timeout'];
        if (args['spec']['uninstall'] !== undefined && typeof args['spec']['uninstall'] == 'object') spec['uninstall'] = args['spec']['uninstall'];
        if (args['spec']['upgrade'] !== undefined && typeof args['spec']['upgrade'] == 'object') spec['upgrade'] = args['spec']['upgrade'];
        if (args['spec']['values'] !== undefined) spec['values'] = args['spec']['values'];
        if (args['spec']['valuesFrom'] !== undefined && Array.isArray(args['spec']['valuesFrom'])) spec['valuesFrom'] = args['spec']['valuesFrom'];
        const payload = {
            apiVersion: 'helm.toolkit.fluxcd.io/v2beta1',
            kind: 'HelmRelease',
            metadata: {
              namespace: args['namespace'],
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createNamespacedCustomObject('helm.toolkit.fluxcd.io','v2beta1',args['namespace'],'helmreleases', payload)
            const ext = res.body as FluxcdHelmRelease
            return {
                metadata: getMetadata(ext.metadata),
                chart: ext.spec.chart,
                dependsOn: ext.spec.dependsOn,
                install: ext.spec.install,
                interval: ext.spec.interval,
                kubeConfig: ext.spec.kubeConfig,
                maxHistory: ext.spec.maxHistory,
                persistentClient: ext.spec.persistentClient,
                postRenderers: ext.spec.postRenderers,
                releaseName: ext.spec.releaseName,
                rollback: ext.spec.rollback,
                serviceAccountName: ext.spec.serviceAccountName,
                storageNamespace: ext.spec.storageNamespace,
                suspend: ext.spec.suspend,
                targetNamespace: ext.spec.targetNamespace,
                test: ext.spec.test,
                timeout: ext.spec.timeout,
                uninstall: ext.spec.uninstall,
                upgrade: ext.spec.upgrade,
                values: ext.spec.values,
                valuesFrom: ext.spec.valuesFrom,
                status: ext.status==undefined?null:{
                    conditions: ext.status.conditions,
                    failures: ext.status.failures,
                    helmChart: ext.status.helmChart,
                    installFailures: ext.status.installFailures,
                    lastAppliedRevision: ext.status.lastAppliedRevision,
                    lastAttemptedRevision: ext.status.lastAttemptedRevision,
                    lastAttemptedValuesChecksum: ext.status.lastAttemptedValuesChecksum,
                    lastHandledReconcileAt: ext.status.lastHandledReconcileAt,
                    lastReleaseRevision: ext.status.lastReleaseRevision,
                    observedGeneration: ext.status.observedGeneration,
                    upgradeFailures: ext.status.upgradeFailures,
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    patchFluxcdHelmRelease: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        spec['chart'] = args['spec']['chart'];
        if (args['spec']['dependsOn'] !== undefined && Array.isArray(args['spec']['dependsOn'])) spec['dependsOn'] = args['spec']['dependsOn'];
        if (args['spec']['install'] !== undefined && typeof args['spec']['install'] == 'object') spec['install'] = args['spec']['install'];
        spec['interval'] = args['spec']['interval'];
        if (args['spec']['kubeConfig'] !== undefined && typeof args['spec']['kubeConfig'] == 'object') spec['kubeConfig'] = args['spec']['kubeConfig'];
        if (args['spec']['maxHistory'] !== undefined && typeof args['spec']['maxHistory'] == 'number') spec['maxHistory'] = args['spec']['maxHistory'];
        if (args['spec']['persistentClient'] !== undefined && typeof args['spec']['persistentClient'] == 'boolean') spec['persistentClient'] = args['spec']['persistentClient'];
        if (args['spec']['postRenderers'] !== undefined && Array.isArray(args['spec']['postRenderers'])) spec['postRenderers'] = args['spec']['postRenderers'];
        if (args['spec']['releaseName'] !== undefined && typeof args['spec']['releaseName'] == 'string') spec['releaseName'] = args['spec']['releaseName'];
        if (args['spec']['rollback'] !== undefined && typeof args['spec']['rollback'] == 'object') spec['rollback'] = args['spec']['rollback'];
        if (args['spec']['serviceAccountName'] !== undefined && typeof args['spec']['serviceAccountName'] == 'string') spec['serviceAccountName'] = args['spec']['serviceAccountName'];
        if (args['spec']['storageNamespace'] !== undefined && typeof args['spec']['storageNamespace'] == 'string') spec['storageNamespace'] = args['spec']['storageNamespace'];
        if (args['spec']['suspend'] !== undefined && typeof args['spec']['suspend'] == 'boolean') spec['suspend'] = args['spec']['suspend'];
        if (args['spec']['targetNamespace'] !== undefined && typeof args['spec']['targetNamespace'] == 'string') spec['targetNamespace'] = args['spec']['targetNamespace'];
        if (args['spec']['test'] !== undefined && typeof args['spec']['test'] == 'object') spec['test'] = args['spec']['test'];
        if (args['spec']['timeout'] !== undefined && typeof args['spec']['timeout'] == 'string') spec['timeout'] = args['spec']['timeout'];
        if (args['spec']['uninstall'] !== undefined && typeof args['spec']['uninstall'] == 'object') spec['uninstall'] = args['spec']['uninstall'];
        if (args['spec']['upgrade'] !== undefined && typeof args['spec']['upgrade'] == 'object') spec['upgrade'] = args['spec']['upgrade'];
        if (args['spec']['values'] !== undefined) spec['values'] = args['spec']['values'];
        if (args['spec']['valuesFrom'] !== undefined && Array.isArray(args['spec']['valuesFrom'])) spec['valuesFrom'] = args['spec']['valuesFrom'];
        const request = {
            apiVersion: 'helm.toolkit.fluxcd.io/v2beta1',
            kind: 'HelmRelease',
            metadata: {
                namespace: args['namespace'],
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getNamespacedCustomObject('helm.toolkit.fluxcd.io','v2beta1',args['namespace'],'helmreleases', args['name'])
            const extGet = resGet.body as FluxcdHelmRelease
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchNamespacedCustomObject('helm.toolkit.fluxcd.io','v2beta1',args['namespace'],'helmreleases', args['name'], payload, undefined, undefined, undefined, options)
            const ext = res.body as FluxcdHelmRelease
            return {
                metadata: getMetadata(ext.metadata),
                chart: ext.spec.chart,
                dependsOn: ext.spec.dependsOn,
                install: ext.spec.install,
                interval: ext.spec.interval,
                kubeConfig: ext.spec.kubeConfig,
                maxHistory: ext.spec.maxHistory,
                persistentClient: ext.spec.persistentClient,
                postRenderers: ext.spec.postRenderers,
                releaseName: ext.spec.releaseName,
                rollback: ext.spec.rollback,
                serviceAccountName: ext.spec.serviceAccountName,
                storageNamespace: ext.spec.storageNamespace,
                suspend: ext.spec.suspend,
                targetNamespace: ext.spec.targetNamespace,
                test: ext.spec.test,
                timeout: ext.spec.timeout,
                uninstall: ext.spec.uninstall,
                upgrade: ext.spec.upgrade,
                values: ext.spec.values,
                valuesFrom: ext.spec.valuesFrom,
                status: ext.status==undefined?null:{
                    conditions: ext.status.conditions,
                    failures: ext.status.failures,
                    helmChart: ext.status.helmChart,
                    installFailures: ext.status.installFailures,
                    lastAppliedRevision: ext.status.lastAppliedRevision,
                    lastAttemptedRevision: ext.status.lastAttemptedRevision,
                    lastAttemptedValuesChecksum: ext.status.lastAttemptedValuesChecksum,
                    lastHandledReconcileAt: ext.status.lastHandledReconcileAt,
                    lastReleaseRevision: ext.status.lastReleaseRevision,
                    observedGeneration: ext.status.observedGeneration,
                    upgradeFailures: ext.status.upgradeFailures,
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    deleteFluxcdHelmRelease: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteNamespacedCustomObject('helm.toolkit.fluxcd.io','v2beta1',args['namespace'],'helmreleases', args['name'])
        const ext = res.body as FluxcdHelmRelease
        return {
            metadata: getMetadata(ext.metadata),
            chart: ext.spec.chart,
            dependsOn: ext.spec.dependsOn,
            install: ext.spec.install,
            interval: ext.spec.interval,
            kubeConfig: ext.spec.kubeConfig,
            maxHistory: ext.spec.maxHistory,
            persistentClient: ext.spec.persistentClient,
            postRenderers: ext.spec.postRenderers,
            releaseName: ext.spec.releaseName,
            rollback: ext.spec.rollback,
            serviceAccountName: ext.spec.serviceAccountName,
            storageNamespace: ext.spec.storageNamespace,
            suspend: ext.spec.suspend,
            targetNamespace: ext.spec.targetNamespace,
            test: ext.spec.test,
            timeout: ext.spec.timeout,
            uninstall: ext.spec.uninstall,
            upgrade: ext.spec.upgrade,
            values: ext.spec.values,
            valuesFrom: ext.spec.valuesFrom,
            status: ext.status==undefined?null:{
                conditions: ext.status.conditions,
                failures: ext.status.failures,
                helmChart: ext.status.helmChart,
                installFailures: ext.status.installFailures,
                lastAppliedRevision: ext.status.lastAppliedRevision,
                lastAttemptedRevision: ext.status.lastAttemptedRevision,
                lastAttemptedValuesChecksum: ext.status.lastAttemptedValuesChecksum,
                lastHandledReconcileAt: ext.status.lastHandledReconcileAt,
                lastReleaseRevision: ext.status.lastReleaseRevision,
                observedGeneration: ext.status.observedGeneration,
                upgradeFailures: ext.status.upgradeFailures,
            }
        }
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
},
};
