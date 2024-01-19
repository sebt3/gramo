import {kc, k8s, getMetadata} from '../core/libs.js';
import { MonitoringProbe } from './type.Probe.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createMonitoringProbe: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['authorization'] !== undefined && typeof args['spec']['authorization'] == 'object') spec['authorization'] = args['spec']['authorization'];
        if (args['spec']['basicAuth'] !== undefined && typeof args['spec']['basicAuth'] == 'object') spec['basicAuth'] = args['spec']['basicAuth'];
        if (args['spec']['bearerTokenSecret'] !== undefined && typeof args['spec']['bearerTokenSecret'] == 'object') spec['bearerTokenSecret'] = args['spec']['bearerTokenSecret'];
        if (args['spec']['interval'] !== undefined && typeof args['spec']['interval'] == 'string') spec['interval'] = args['spec']['interval'];
        if (args['spec']['jobName'] !== undefined && typeof args['spec']['jobName'] == 'string') spec['jobName'] = args['spec']['jobName'];
        if (args['spec']['labelLimit'] !== undefined && typeof args['spec']['labelLimit'] == 'number') spec['labelLimit'] = args['spec']['labelLimit'];
        if (args['spec']['labelNameLengthLimit'] !== undefined && typeof args['spec']['labelNameLengthLimit'] == 'number') spec['labelNameLengthLimit'] = args['spec']['labelNameLengthLimit'];
        if (args['spec']['labelValueLengthLimit'] !== undefined && typeof args['spec']['labelValueLengthLimit'] == 'number') spec['labelValueLengthLimit'] = args['spec']['labelValueLengthLimit'];
        if (args['spec']['metricRelabelings'] !== undefined && Array.isArray(args['spec']['metricRelabelings'])) spec['metricRelabelings'] = args['spec']['metricRelabelings'];
        if (args['spec']['module'] !== undefined && typeof args['spec']['module'] == 'string') spec['module'] = args['spec']['module'];
        if (args['spec']['oauth2'] !== undefined && typeof args['spec']['oauth2'] == 'object') spec['oauth2'] = args['spec']['oauth2'];
        if (args['spec']['prober'] !== undefined && typeof args['spec']['prober'] == 'object') spec['prober'] = args['spec']['prober'];
        if (args['spec']['sampleLimit'] !== undefined && typeof args['spec']['sampleLimit'] == 'number') spec['sampleLimit'] = args['spec']['sampleLimit'];
        if (args['spec']['scrapeTimeout'] !== undefined && typeof args['spec']['scrapeTimeout'] == 'string') spec['scrapeTimeout'] = args['spec']['scrapeTimeout'];
        if (args['spec']['targetLimit'] !== undefined && typeof args['spec']['targetLimit'] == 'number') spec['targetLimit'] = args['spec']['targetLimit'];
        if (args['spec']['targets'] !== undefined && typeof args['spec']['targets'] == 'object') spec['targets'] = args['spec']['targets'];
        if (args['spec']['tlsConfig'] !== undefined && typeof args['spec']['tlsConfig'] == 'object') spec['tlsConfig'] = args['spec']['tlsConfig'];
        const payload = {
            apiVersion: 'monitoring.coreos.com/v1',
            kind: 'Probe',
            metadata: {
              namespace: args['namespace'],
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createNamespacedCustomObject('monitoring.coreos.com','v1',args['namespace'],'probes', payload)
            const ext = res.body as MonitoringProbe
            return {
                metadata: getMetadata(ext.metadata),
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
    patchMonitoringProbe: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['authorization'] !== undefined && typeof args['spec']['authorization'] == 'object') spec['authorization'] = args['spec']['authorization'];
        if (args['spec']['basicAuth'] !== undefined && typeof args['spec']['basicAuth'] == 'object') spec['basicAuth'] = args['spec']['basicAuth'];
        if (args['spec']['bearerTokenSecret'] !== undefined && typeof args['spec']['bearerTokenSecret'] == 'object') spec['bearerTokenSecret'] = args['spec']['bearerTokenSecret'];
        if (args['spec']['interval'] !== undefined && typeof args['spec']['interval'] == 'string') spec['interval'] = args['spec']['interval'];
        if (args['spec']['jobName'] !== undefined && typeof args['spec']['jobName'] == 'string') spec['jobName'] = args['spec']['jobName'];
        if (args['spec']['labelLimit'] !== undefined && typeof args['spec']['labelLimit'] == 'number') spec['labelLimit'] = args['spec']['labelLimit'];
        if (args['spec']['labelNameLengthLimit'] !== undefined && typeof args['spec']['labelNameLengthLimit'] == 'number') spec['labelNameLengthLimit'] = args['spec']['labelNameLengthLimit'];
        if (args['spec']['labelValueLengthLimit'] !== undefined && typeof args['spec']['labelValueLengthLimit'] == 'number') spec['labelValueLengthLimit'] = args['spec']['labelValueLengthLimit'];
        if (args['spec']['metricRelabelings'] !== undefined && Array.isArray(args['spec']['metricRelabelings'])) spec['metricRelabelings'] = args['spec']['metricRelabelings'];
        if (args['spec']['module'] !== undefined && typeof args['spec']['module'] == 'string') spec['module'] = args['spec']['module'];
        if (args['spec']['oauth2'] !== undefined && typeof args['spec']['oauth2'] == 'object') spec['oauth2'] = args['spec']['oauth2'];
        if (args['spec']['prober'] !== undefined && typeof args['spec']['prober'] == 'object') spec['prober'] = args['spec']['prober'];
        if (args['spec']['sampleLimit'] !== undefined && typeof args['spec']['sampleLimit'] == 'number') spec['sampleLimit'] = args['spec']['sampleLimit'];
        if (args['spec']['scrapeTimeout'] !== undefined && typeof args['spec']['scrapeTimeout'] == 'string') spec['scrapeTimeout'] = args['spec']['scrapeTimeout'];
        if (args['spec']['targetLimit'] !== undefined && typeof args['spec']['targetLimit'] == 'number') spec['targetLimit'] = args['spec']['targetLimit'];
        if (args['spec']['targets'] !== undefined && typeof args['spec']['targets'] == 'object') spec['targets'] = args['spec']['targets'];
        if (args['spec']['tlsConfig'] !== undefined && typeof args['spec']['tlsConfig'] == 'object') spec['tlsConfig'] = args['spec']['tlsConfig'];
        const request = {
            apiVersion: 'monitoring.coreos.com/v1',
            kind: 'Probe',
            metadata: {
                namespace: args['namespace'],
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getNamespacedCustomObject('monitoring.coreos.com','v1',args['namespace'],'probes', args['name'])
            const extGet = resGet.body as MonitoringProbe
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchNamespacedCustomObject('monitoring.coreos.com','v1',args['namespace'],'probes', args['name'], payload, undefined, undefined, undefined, options)
            const ext = res.body as MonitoringProbe
            return {
                metadata: getMetadata(ext.metadata),
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
    deleteMonitoringProbe: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteNamespacedCustomObject('monitoring.coreos.com','v1',args['namespace'],'probes', args['name'])
        const ext = res.body as MonitoringProbe
        return {
            metadata: getMetadata(ext.metadata),
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
