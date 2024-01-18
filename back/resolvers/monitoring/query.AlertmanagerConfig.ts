import {kc, k8s, getMetadata} from '../core/libs.js';
import { MonitoringAlertmanagerConfigList, MonitoringAlertmanagerConfig } from './type.AlertmanagerConfig.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    monitoringAlertmanagerConfigs: async (_parent, args: object) => {
        try {
            const res = await customApi.listNamespacedCustomObject('monitoring.coreos.com','v1alpha1',args['namespace'],'alertmanagerconfigs')
            const resList = res.body as MonitoringAlertmanagerConfigList
            return resList.items.map((ext)=>{return{
                metadata: getMetadata(ext.metadata),
                inhibitRules: ext.spec.inhibitRules,
                muteTimeIntervals: ext.spec.muteTimeIntervals,
                receivers: ext.spec.receivers,
                route: ext.spec.route,
            }})
        } catch (err) {
          console.error((err as object)['body']);
        }
        return []
    }
};
export const queries = {
    monitoringAlertmanagerConfig: async (_parent, args: object) => {
        try {
            const res = await customApi.getNamespacedCustomObject('monitoring.coreos.com','v1alpha1',args['namespace'],'alertmanagerconfigs', args['name'])
            const ext = res.body as MonitoringAlertmanagerConfig
            return {
                metadata: getMetadata(ext.metadata),
                inhibitRules: ext.spec.inhibitRules,
                muteTimeIntervals: ext.spec.muteTimeIntervals,
                receivers: ext.spec.receivers,
                route: ext.spec.route,
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
