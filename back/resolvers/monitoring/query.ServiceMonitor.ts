import {kc, k8s, getMetadata} from '../core/libs.js';
import { MonitoringServiceMonitorList, MonitoringServiceMonitor } from './type.ServiceMonitor.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    monitoringServiceMonitors: async (_parent, args: object) => {
        try {
            const res = await customApi.listNamespacedCustomObject('monitoring.coreos.com','v1',args['namespace'],'servicemonitors')
            const resList = res.body as MonitoringServiceMonitorList
            return resList.items.map((ext)=>{return{
                metadata: getMetadata(ext.metadata),
                "attachMetadata": ext.spec['attachMetadata'],
                "endpoints": ext.spec['endpoints'],
                "jobLabel": ext.spec['jobLabel'],
                "labelLimit": ext.spec['labelLimit'],
                "labelNameLengthLimit": ext.spec['labelNameLengthLimit'],
                "labelValueLengthLimit": ext.spec['labelValueLengthLimit'],
                "namespaceSelector": ext.spec['namespaceSelector'],
                "podTargetLabels": ext.spec['podTargetLabels'],
                "sampleLimit": ext.spec['sampleLimit'],
                "selector": ext.spec['selector'],
                "targetLabels": ext.spec['targetLabels'],
                "targetLimit": ext.spec['targetLimit'],
            }})
        } catch (err) {
          console.error((err as object)['body']);
        }
        return []
    }
};
export const queries = {
    monitoringServiceMonitor: async (_parent, args: object) => {
        try {
            const res = await customApi.getNamespacedCustomObject('monitoring.coreos.com','v1',args['namespace'],'servicemonitors', args['name'])
            const ext = res.body as MonitoringServiceMonitor
            return {
                metadata: getMetadata(ext.metadata),
                "attachMetadata": ext.spec['attachMetadata'],
                "endpoints": ext.spec['endpoints'],
                "jobLabel": ext.spec['jobLabel'],
                "labelLimit": ext.spec['labelLimit'],
                "labelNameLengthLimit": ext.spec['labelNameLengthLimit'],
                "labelValueLengthLimit": ext.spec['labelValueLengthLimit'],
                "namespaceSelector": ext.spec['namespaceSelector'],
                "podTargetLabels": ext.spec['podTargetLabels'],
                "sampleLimit": ext.spec['sampleLimit'],
                "selector": ext.spec['selector'],
                "targetLabels": ext.spec['targetLabels'],
                "targetLimit": ext.spec['targetLimit'],
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
