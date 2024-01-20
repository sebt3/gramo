import {kc, k8s, getMetadata} from '../core/libs.js';
import { MonitoringProbeList, MonitoringProbe } from './type.Probe.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    monitoringProbes: async (_parent, args: object) => {
        try {
            const res = await customApi.listNamespacedCustomObject('monitoring.coreos.com','v1',args['namespace'],'probes')
            const resList = res.body as MonitoringProbeList
            return resList.items.map((ext)=>{return{
                metadata: getMetadata(ext.metadata, ext),
                "authorization": ext.spec['authorization'],
                "basicAuth": ext.spec['basicAuth'],
                "bearerTokenSecret": ext.spec['bearerTokenSecret'],
                "interval": ext.spec['interval'],
                "jobName": ext.spec['jobName'],
                "labelLimit": ext.spec['labelLimit'],
                "labelNameLengthLimit": ext.spec['labelNameLengthLimit'],
                "labelValueLengthLimit": ext.spec['labelValueLengthLimit'],
                "metricRelabelings": ext.spec['metricRelabelings'],
                "module": ext.spec['module'],
                "oauth2": ext.spec['oauth2'],
                "prober": ext.spec['prober'],
                "sampleLimit": ext.spec['sampleLimit'],
                "scrapeTimeout": ext.spec['scrapeTimeout'],
                "targetLimit": ext.spec['targetLimit'],
                "targets": ext.spec['targets'],
                "tlsConfig": ext.spec['tlsConfig'],
            }})
        } catch (err) {
          console.error((err as object)['body']);
        }
        return []
    }
};
export const queries = {
    monitoringProbe: async (_parent, args: object) => {
        try {
            const res = await customApi.getNamespacedCustomObject('monitoring.coreos.com','v1',args['namespace'],'probes', args['name'])
            const ext = res.body as MonitoringProbe
            return {
                metadata: getMetadata(ext.metadata, ext),
                "authorization": ext.spec['authorization'],
                "basicAuth": ext.spec['basicAuth'],
                "bearerTokenSecret": ext.spec['bearerTokenSecret'],
                "interval": ext.spec['interval'],
                "jobName": ext.spec['jobName'],
                "labelLimit": ext.spec['labelLimit'],
                "labelNameLengthLimit": ext.spec['labelNameLengthLimit'],
                "labelValueLengthLimit": ext.spec['labelValueLengthLimit'],
                "metricRelabelings": ext.spec['metricRelabelings'],
                "module": ext.spec['module'],
                "oauth2": ext.spec['oauth2'],
                "prober": ext.spec['prober'],
                "sampleLimit": ext.spec['sampleLimit'],
                "scrapeTimeout": ext.spec['scrapeTimeout'],
                "targetLimit": ext.spec['targetLimit'],
                "targets": ext.spec['targets'],
                "tlsConfig": ext.spec['tlsConfig'],
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
