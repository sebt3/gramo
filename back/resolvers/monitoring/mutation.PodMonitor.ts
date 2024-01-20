import {kc, k8s, getMetadata} from '../core/libs.js';
import { MonitoringPodMonitor } from './type.PodMonitor.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createMonitoringPodMonitor: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['attachMetadata'] !== undefined && typeof args['spec']['attachMetadata'] == 'object') spec['attachMetadata'] = args['spec']['attachMetadata'];
        if (args['spec']['jobLabel'] !== undefined && typeof args['spec']['jobLabel'] == 'string') spec['jobLabel'] = args['spec']['jobLabel'];
        if (args['spec']['labelLimit'] !== undefined && typeof args['spec']['labelLimit'] == 'number') spec['labelLimit'] = args['spec']['labelLimit'];
        if (args['spec']['labelNameLengthLimit'] !== undefined && typeof args['spec']['labelNameLengthLimit'] == 'number') spec['labelNameLengthLimit'] = args['spec']['labelNameLengthLimit'];
        if (args['spec']['labelValueLengthLimit'] !== undefined && typeof args['spec']['labelValueLengthLimit'] == 'number') spec['labelValueLengthLimit'] = args['spec']['labelValueLengthLimit'];
        if (args['spec']['namespaceSelector'] !== undefined && typeof args['spec']['namespaceSelector'] == 'object') spec['namespaceSelector'] = args['spec']['namespaceSelector'];
        spec['podMetricsEndpoints'] = args['spec']['podMetricsEndpoints'];
        if (args['spec']['podTargetLabels'] !== undefined && Array.isArray(args['spec']['podTargetLabels'])) spec['podTargetLabels'] = args['spec']['podTargetLabels'];
        if (args['spec']['sampleLimit'] !== undefined && typeof args['spec']['sampleLimit'] == 'number') spec['sampleLimit'] = args['spec']['sampleLimit'];
        spec['selector'] = args['spec']['selector'];
        if (args['spec']['targetLimit'] !== undefined && typeof args['spec']['targetLimit'] == 'number') spec['targetLimit'] = args['spec']['targetLimit'];
        const payload = {
            apiVersion: 'monitoring.coreos.com/v1',
            kind: 'PodMonitor',
            metadata: {
              namespace: args['namespace'],
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createNamespacedCustomObject('monitoring.coreos.com','v1',args['namespace'],'podmonitors', payload)
            const ext = res.body as MonitoringPodMonitor
            return {
                metadata: getMetadata(ext.metadata, ext),
                "attachMetadata": ext.spec['attachMetadata'],
                "jobLabel": ext.spec['jobLabel'],
                "labelLimit": ext.spec['labelLimit'],
                "labelNameLengthLimit": ext.spec['labelNameLengthLimit'],
                "labelValueLengthLimit": ext.spec['labelValueLengthLimit'],
                "namespaceSelector": ext.spec['namespaceSelector'],
                "podMetricsEndpoints": ext.spec['podMetricsEndpoints'],
                "podTargetLabels": ext.spec['podTargetLabels'],
                "sampleLimit": ext.spec['sampleLimit'],
                "selector": ext.spec['selector'],
                "targetLimit": ext.spec['targetLimit'],
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    patchMonitoringPodMonitor: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['attachMetadata'] !== undefined && typeof args['spec']['attachMetadata'] == 'object') spec['attachMetadata'] = args['spec']['attachMetadata'];
        if (args['spec']['jobLabel'] !== undefined && typeof args['spec']['jobLabel'] == 'string') spec['jobLabel'] = args['spec']['jobLabel'];
        if (args['spec']['labelLimit'] !== undefined && typeof args['spec']['labelLimit'] == 'number') spec['labelLimit'] = args['spec']['labelLimit'];
        if (args['spec']['labelNameLengthLimit'] !== undefined && typeof args['spec']['labelNameLengthLimit'] == 'number') spec['labelNameLengthLimit'] = args['spec']['labelNameLengthLimit'];
        if (args['spec']['labelValueLengthLimit'] !== undefined && typeof args['spec']['labelValueLengthLimit'] == 'number') spec['labelValueLengthLimit'] = args['spec']['labelValueLengthLimit'];
        if (args['spec']['namespaceSelector'] !== undefined && typeof args['spec']['namespaceSelector'] == 'object') spec['namespaceSelector'] = args['spec']['namespaceSelector'];
        spec['podMetricsEndpoints'] = args['spec']['podMetricsEndpoints'];
        if (args['spec']['podTargetLabels'] !== undefined && Array.isArray(args['spec']['podTargetLabels'])) spec['podTargetLabels'] = args['spec']['podTargetLabels'];
        if (args['spec']['sampleLimit'] !== undefined && typeof args['spec']['sampleLimit'] == 'number') spec['sampleLimit'] = args['spec']['sampleLimit'];
        spec['selector'] = args['spec']['selector'];
        if (args['spec']['targetLimit'] !== undefined && typeof args['spec']['targetLimit'] == 'number') spec['targetLimit'] = args['spec']['targetLimit'];
        const request = {
            apiVersion: 'monitoring.coreos.com/v1',
            kind: 'PodMonitor',
            metadata: {
                namespace: args['namespace'],
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getNamespacedCustomObject('monitoring.coreos.com','v1',args['namespace'],'podmonitors', args['name'])
            const extGet = resGet.body as MonitoringPodMonitor
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchNamespacedCustomObject('monitoring.coreos.com','v1',args['namespace'],'podmonitors', args['name'], payload, undefined, undefined, undefined, options)
            const ext = res.body as MonitoringPodMonitor
            return {
                metadata: getMetadata(ext.metadata, ext),
                "attachMetadata": ext.spec['attachMetadata'],
                "jobLabel": ext.spec['jobLabel'],
                "labelLimit": ext.spec['labelLimit'],
                "labelNameLengthLimit": ext.spec['labelNameLengthLimit'],
                "labelValueLengthLimit": ext.spec['labelValueLengthLimit'],
                "namespaceSelector": ext.spec['namespaceSelector'],
                "podMetricsEndpoints": ext.spec['podMetricsEndpoints'],
                "podTargetLabels": ext.spec['podTargetLabels'],
                "sampleLimit": ext.spec['sampleLimit'],
                "selector": ext.spec['selector'],
                "targetLimit": ext.spec['targetLimit'],
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    deleteMonitoringPodMonitor: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteNamespacedCustomObject('monitoring.coreos.com','v1',args['namespace'],'podmonitors', args['name'])
        const ext = res.body as MonitoringPodMonitor
        return {
            metadata: getMetadata(ext.metadata, ext),
            "attachMetadata": ext.spec['attachMetadata'],
            "jobLabel": ext.spec['jobLabel'],
            "labelLimit": ext.spec['labelLimit'],
            "labelNameLengthLimit": ext.spec['labelNameLengthLimit'],
            "labelValueLengthLimit": ext.spec['labelValueLengthLimit'],
            "namespaceSelector": ext.spec['namespaceSelector'],
            "podMetricsEndpoints": ext.spec['podMetricsEndpoints'],
            "podTargetLabels": ext.spec['podTargetLabels'],
            "sampleLimit": ext.spec['sampleLimit'],
            "selector": ext.spec['selector'],
            "targetLimit": ext.spec['targetLimit'],
        }
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
},
};
