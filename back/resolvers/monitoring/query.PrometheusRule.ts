import {kc, k8s, getMetadata} from '../core/libs.js';
import { MonitoringPrometheusRuleList, MonitoringPrometheusRule } from './type.PrometheusRule.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    monitoringPrometheusRules: async (_parent, args: object) => {
        try {
            const res = await customApi.listNamespacedCustomObject('monitoring.coreos.com','v1',args['namespace'],'prometheusrules')
            const resList = res.body as MonitoringPrometheusRuleList
            return resList.items.map((ext)=>{return{
                metadata: getMetadata(ext.metadata),
                "groups": ext.spec['groups'],
            }})
        } catch (err) {
          console.error((err as object)['body']);
        }
        return []
    }
};
export const queries = {
    monitoringPrometheusRule: async (_parent, args: object) => {
        try {
            const res = await customApi.getNamespacedCustomObject('monitoring.coreos.com','v1',args['namespace'],'prometheusrules', args['name'])
            const ext = res.body as MonitoringPrometheusRule
            return {
                metadata: getMetadata(ext.metadata),
                "groups": ext.spec['groups'],
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
