import {kc, k8s, getMetadata} from '../core/libs.js';
import { MonitoringPodMonitorList, MonitoringPodMonitor } from './type.PodMonitor.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    monitoringPodMonitors: async (_parent, args: object) => {
        try {
            const res = await customApi.listNamespacedCustomObject('monitoring.coreos.com','v1',args['namespace'],'podmonitors')
            const resList = res.body as MonitoringPodMonitorList
            return resList.items.map((ext)=>{return{
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
            }})
        } catch (err) {
          console.error((err as object)['body']);
        }
        return []
    }
};
export const queries = {
    monitoringPodMonitor: async (_parent, args: object) => {
        try {
            const res = await customApi.getNamespacedCustomObject('monitoring.coreos.com','v1',args['namespace'],'podmonitors', args['name'])
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
