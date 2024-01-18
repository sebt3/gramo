import {kc, k8s, getMetadata} from '../core/libs.js';
import { MonitoringAlertmanagerConfig } from './type.AlertmanagerConfig.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createMonitoringAlertmanagerConfig: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['inhibitRules'] !== undefined && Array.isArray(args['spec']['inhibitRules'])) spec['inhibitRules'] = args['spec']['inhibitRules'];
        if (args['spec']['muteTimeIntervals'] !== undefined && Array.isArray(args['spec']['muteTimeIntervals'])) spec['muteTimeIntervals'] = args['spec']['muteTimeIntervals'];
        if (args['spec']['receivers'] !== undefined && Array.isArray(args['spec']['receivers'])) spec['receivers'] = args['spec']['receivers'];
        if (args['spec']['route'] !== undefined && typeof args['spec']['route'] == 'object') spec['route'] = args['spec']['route'];
        const payload = {
            apiVersion: 'monitoring.coreos.com/v1alpha1',
            kind: 'AlertmanagerConfig',
            metadata: {
              namespace: args['namespace'],
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createNamespacedCustomObject('monitoring.coreos.com','v1alpha1',args['namespace'],'alertmanagerconfigs', payload)
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
    patchMonitoringAlertmanagerConfig: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['inhibitRules'] !== undefined && Array.isArray(args['spec']['inhibitRules'])) spec['inhibitRules'] = args['spec']['inhibitRules'];
        if (args['spec']['muteTimeIntervals'] !== undefined && Array.isArray(args['spec']['muteTimeIntervals'])) spec['muteTimeIntervals'] = args['spec']['muteTimeIntervals'];
        if (args['spec']['receivers'] !== undefined && Array.isArray(args['spec']['receivers'])) spec['receivers'] = args['spec']['receivers'];
        if (args['spec']['route'] !== undefined && typeof args['spec']['route'] == 'object') spec['route'] = args['spec']['route'];
        const request = {
            apiVersion: 'monitoring.coreos.com/v1alpha1',
            kind: 'AlertmanagerConfig',
            metadata: {
                namespace: args['namespace'],
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getNamespacedCustomObject('monitoring.coreos.com','v1alpha1',args['namespace'],'alertmanagerconfigs', args['name'])
            const extGet = resGet.body as MonitoringAlertmanagerConfig
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchNamespacedCustomObject('monitoring.coreos.com','v1alpha1',args['namespace'],'alertmanagerconfigs', args['name'], payload, undefined, undefined, undefined, options)
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
    deleteMonitoringAlertmanagerConfig: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteNamespacedCustomObject('monitoring.coreos.com','v1alpha1',args['namespace'],'alertmanagerconfigs', args['name'])
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
