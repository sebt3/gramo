import {kc, k8s, getMetadata} from '../core/libs.js';
import { FluxcdHelmChart } from './type.HelmChart.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createFluxcdHelmChart: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['accessFrom'] !== undefined && typeof args['spec']['accessFrom'] == 'object') spec['accessFrom'] = args['spec']['accessFrom'];
        spec['chart'] = args['spec']['chart'];
        spec['interval'] = args['spec']['interval'];
        if (args['spec']['reconcileStrategy'] !== undefined && typeof args['spec']['reconcileStrategy'] == 'string') spec['reconcileStrategy'] = args['spec']['reconcileStrategy'];
        spec['sourceRef'] = args['spec']['sourceRef'];
        if (args['spec']['suspend'] !== undefined && typeof args['spec']['suspend'] == 'boolean') spec['suspend'] = args['spec']['suspend'];
        if (args['spec']['valuesFile'] !== undefined && typeof args['spec']['valuesFile'] == 'string') spec['valuesFile'] = args['spec']['valuesFile'];
        if (args['spec']['valuesFiles'] !== undefined && Array.isArray(args['spec']['valuesFiles'])) spec['valuesFiles'] = args['spec']['valuesFiles'];
        if (args['spec']['verify'] !== undefined && typeof args['spec']['verify'] == 'object') spec['verify'] = args['spec']['verify'];
        if (args['spec']['version'] !== undefined && typeof args['spec']['version'] == 'string') spec['version'] = args['spec']['version'];
        const payload = {
            apiVersion: 'source.toolkit.fluxcd.io/v1beta2',
            kind: 'HelmChart',
            metadata: {
              namespace: args['namespace'],
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createNamespacedCustomObject('source.toolkit.fluxcd.io','v1beta2',args['namespace'],'helmcharts', payload)
            const ext = res.body as FluxcdHelmChart
            return {
                metadata: getMetadata(ext.metadata),
                accessFrom: ext.spec.accessFrom,
                chart: ext.spec.chart,
                interval: ext.spec.interval,
                reconcileStrategy: ext.spec.reconcileStrategy,
                sourceRef: ext.spec.sourceRef,
                suspend: ext.spec.suspend,
                valuesFile: ext.spec.valuesFile,
                valuesFiles: ext.spec.valuesFiles,
                verify: ext.spec.verify,
                version: ext.spec.version,
                status: ext.status==undefined?null:{
                    artifact: ext.status.artifact,
                    conditions: ext.status.conditions,
                    lastHandledReconcileAt: ext.status.lastHandledReconcileAt,
                    observedChartName: ext.status.observedChartName,
                    observedGeneration: ext.status.observedGeneration,
                    observedSourceArtifactRevision: ext.status.observedSourceArtifactRevision,
                    url: ext.status.url,
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    patchFluxcdHelmChart: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['accessFrom'] !== undefined && typeof args['spec']['accessFrom'] == 'object') spec['accessFrom'] = args['spec']['accessFrom'];
        spec['chart'] = args['spec']['chart'];
        spec['interval'] = args['spec']['interval'];
        if (args['spec']['reconcileStrategy'] !== undefined && typeof args['spec']['reconcileStrategy'] == 'string') spec['reconcileStrategy'] = args['spec']['reconcileStrategy'];
        spec['sourceRef'] = args['spec']['sourceRef'];
        if (args['spec']['suspend'] !== undefined && typeof args['spec']['suspend'] == 'boolean') spec['suspend'] = args['spec']['suspend'];
        if (args['spec']['valuesFile'] !== undefined && typeof args['spec']['valuesFile'] == 'string') spec['valuesFile'] = args['spec']['valuesFile'];
        if (args['spec']['valuesFiles'] !== undefined && Array.isArray(args['spec']['valuesFiles'])) spec['valuesFiles'] = args['spec']['valuesFiles'];
        if (args['spec']['verify'] !== undefined && typeof args['spec']['verify'] == 'object') spec['verify'] = args['spec']['verify'];
        if (args['spec']['version'] !== undefined && typeof args['spec']['version'] == 'string') spec['version'] = args['spec']['version'];
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
            const resGet = await customApi.getNamespacedCustomObject('source.toolkit.fluxcd.io','v1beta2',args['namespace'],'helmcharts', args['name'])
            const extGet = resGet.body as FluxcdHelmChart
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchNamespacedCustomObject('source.toolkit.fluxcd.io','v1beta2',args['namespace'],'helmcharts', args['name'], payload, undefined, undefined, undefined, options)
            const ext = res.body as FluxcdHelmChart
            return {
                metadata: getMetadata(ext.metadata),
                accessFrom: ext.spec.accessFrom,
                chart: ext.spec.chart,
                interval: ext.spec.interval,
                reconcileStrategy: ext.spec.reconcileStrategy,
                sourceRef: ext.spec.sourceRef,
                suspend: ext.spec.suspend,
                valuesFile: ext.spec.valuesFile,
                valuesFiles: ext.spec.valuesFiles,
                verify: ext.spec.verify,
                version: ext.spec.version,
                status: ext.status==undefined?null:{
                    artifact: ext.status.artifact,
                    conditions: ext.status.conditions,
                    lastHandledReconcileAt: ext.status.lastHandledReconcileAt,
                    observedChartName: ext.status.observedChartName,
                    observedGeneration: ext.status.observedGeneration,
                    observedSourceArtifactRevision: ext.status.observedSourceArtifactRevision,
                    url: ext.status.url,
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    deleteFluxcdHelmChart: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteNamespacedCustomObject('source.toolkit.fluxcd.io','v1beta2',args['namespace'],'helmcharts', args['name'])
        const ext = res.body as FluxcdHelmChart
        return {
            metadata: getMetadata(ext.metadata),
            accessFrom: ext.spec.accessFrom,
            chart: ext.spec.chart,
            interval: ext.spec.interval,
            reconcileStrategy: ext.spec.reconcileStrategy,
            sourceRef: ext.spec.sourceRef,
            suspend: ext.spec.suspend,
            valuesFile: ext.spec.valuesFile,
            valuesFiles: ext.spec.valuesFiles,
            verify: ext.spec.verify,
            version: ext.spec.version,
            status: ext.status==undefined?null:{
                artifact: ext.status.artifact,
                conditions: ext.status.conditions,
                lastHandledReconcileAt: ext.status.lastHandledReconcileAt,
                observedChartName: ext.status.observedChartName,
                observedGeneration: ext.status.observedGeneration,
                observedSourceArtifactRevision: ext.status.observedSourceArtifactRevision,
                url: ext.status.url,
            }
        }
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
},
};
