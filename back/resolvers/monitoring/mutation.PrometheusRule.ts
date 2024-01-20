import {kc, k8s, getMetadata} from '../core/libs.js';
import { MonitoringPrometheusRule } from './type.PrometheusRule.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createMonitoringPrometheusRule: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['groups'] !== undefined && Array.isArray(args['spec']['groups'])) spec['groups'] = args['spec']['groups'];
        const payload = {
            apiVersion: 'monitoring.coreos.com/v1',
            kind: 'PrometheusRule',
            metadata: {
              namespace: args['namespace'],
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createNamespacedCustomObject('monitoring.coreos.com','v1',args['namespace'],'prometheusrules', payload)
            const ext = res.body as MonitoringPrometheusRule
            return {
                metadata: getMetadata(ext.metadata, ext),
                "groups": ext.spec['groups'],
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    patchMonitoringPrometheusRule: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['groups'] !== undefined && Array.isArray(args['spec']['groups'])) spec['groups'] = args['spec']['groups'];
        const request = {
            apiVersion: 'monitoring.coreos.com/v1',
            kind: 'PrometheusRule',
            metadata: {
                namespace: args['namespace'],
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getNamespacedCustomObject('monitoring.coreos.com','v1',args['namespace'],'prometheusrules', args['name'])
            const extGet = resGet.body as MonitoringPrometheusRule
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchNamespacedCustomObject('monitoring.coreos.com','v1',args['namespace'],'prometheusrules', args['name'], payload, undefined, undefined, undefined, options)
            const ext = res.body as MonitoringPrometheusRule
            return {
                metadata: getMetadata(ext.metadata, ext),
                "groups": ext.spec['groups'],
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    deleteMonitoringPrometheusRule: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteNamespacedCustomObject('monitoring.coreos.com','v1',args['namespace'],'prometheusrules', args['name'])
        const ext = res.body as MonitoringPrometheusRule
        return {
            metadata: getMetadata(ext.metadata, ext),
            "groups": ext.spec['groups'],
        }
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
},
};
