import {kc, k8s, getMetadata} from '../core/libs.js';
import { FluxcdHelmChartList, FluxcdHelmChart } from './type.HelmChart.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    fluxcdHelmCharts: async (_parent, args: object) => {
        try {
            const res = await customApi.listNamespacedCustomObject('source.toolkit.fluxcd.io','v1beta2',args['namespace'],'helmcharts')
            const resList = res.body as FluxcdHelmChartList
            return resList.items.map((ext)=>{return{
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
            }})
        } catch (err) {
          console.error((err as object)['body']);
        }
        return []
    }
};
export const queries = {
    fluxcdHelmChart: async (_parent, args: object) => {
        try {
            const res = await customApi.getNamespacedCustomObject('source.toolkit.fluxcd.io','v1beta2',args['namespace'],'helmcharts', args['name'])
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
