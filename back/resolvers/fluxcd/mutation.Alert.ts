import {kc, k8s, getMetadata} from '../core/libs.js';
import { FluxcdAlert } from './type.Alert.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createFluxcdAlert: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['eventMetadata'] !== undefined && typeof args['spec']['eventMetadata'] == 'object') spec['eventMetadata'] = args['spec']['eventMetadata'];
        if (args['spec']['eventSeverity'] !== undefined && typeof args['spec']['eventSeverity'] == 'string') spec['eventSeverity'] = args['spec']['eventSeverity'];
        spec['eventSources'] = args['spec']['eventSources'];
        if (args['spec']['exclusionList'] !== undefined && Array.isArray(args['spec']['exclusionList'])) spec['exclusionList'] = args['spec']['exclusionList'];
        if (args['spec']['inclusionList'] !== undefined && Array.isArray(args['spec']['inclusionList'])) spec['inclusionList'] = args['spec']['inclusionList'];
        spec['providerRef'] = args['spec']['providerRef'];
        if (args['spec']['summary'] !== undefined && typeof args['spec']['summary'] == 'string') spec['summary'] = args['spec']['summary'];
        if (args['spec']['suspend'] !== undefined && typeof args['spec']['suspend'] == 'boolean') spec['suspend'] = args['spec']['suspend'];
        const payload = {
            apiVersion: 'notification.toolkit.fluxcd.io/v1beta2',
            kind: 'Alert',
            metadata: {
              namespace: args['namespace'],
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createNamespacedCustomObject('notification.toolkit.fluxcd.io','v1beta2',args['namespace'],'alerts', payload)
            const ext = res.body as FluxcdAlert
            return {
                metadata: getMetadata(ext.metadata),
                "eventMetadata": ext.spec['eventMetadata'],
                "eventSeverity": ext.spec['eventSeverity'],
                "eventSources": ext.spec['eventSources'],
                "exclusionList": ext.spec['exclusionList'],
                "inclusionList": ext.spec['inclusionList'],
                "providerRef": ext.spec['providerRef'],
                "summary": ext.spec['summary'],
                "suspend": ext.spec['suspend'],
                status: ext.status==undefined?null:{
                    "conditions": ext.status['conditions'],
                    "lastHandledReconcileAt": ext.status['lastHandledReconcileAt'],
                    "observedGeneration": ext.status['observedGeneration'],
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    patchFluxcdAlert: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['eventMetadata'] !== undefined && typeof args['spec']['eventMetadata'] == 'object') spec['eventMetadata'] = args['spec']['eventMetadata'];
        if (args['spec']['eventSeverity'] !== undefined && typeof args['spec']['eventSeverity'] == 'string') spec['eventSeverity'] = args['spec']['eventSeverity'];
        spec['eventSources'] = args['spec']['eventSources'];
        if (args['spec']['exclusionList'] !== undefined && Array.isArray(args['spec']['exclusionList'])) spec['exclusionList'] = args['spec']['exclusionList'];
        if (args['spec']['inclusionList'] !== undefined && Array.isArray(args['spec']['inclusionList'])) spec['inclusionList'] = args['spec']['inclusionList'];
        spec['providerRef'] = args['spec']['providerRef'];
        if (args['spec']['summary'] !== undefined && typeof args['spec']['summary'] == 'string') spec['summary'] = args['spec']['summary'];
        if (args['spec']['suspend'] !== undefined && typeof args['spec']['suspend'] == 'boolean') spec['suspend'] = args['spec']['suspend'];
        const request = {
            apiVersion: 'notification.toolkit.fluxcd.io/v1beta2',
            kind: 'Alert',
            metadata: {
                namespace: args['namespace'],
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getNamespacedCustomObject('notification.toolkit.fluxcd.io','v1beta2',args['namespace'],'alerts', args['name'])
            const extGet = resGet.body as FluxcdAlert
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchNamespacedCustomObject('notification.toolkit.fluxcd.io','v1beta2',args['namespace'],'alerts', args['name'], payload, undefined, undefined, undefined, options)
            const ext = res.body as FluxcdAlert
            return {
                metadata: getMetadata(ext.metadata),
                "eventMetadata": ext.spec['eventMetadata'],
                "eventSeverity": ext.spec['eventSeverity'],
                "eventSources": ext.spec['eventSources'],
                "exclusionList": ext.spec['exclusionList'],
                "inclusionList": ext.spec['inclusionList'],
                "providerRef": ext.spec['providerRef'],
                "summary": ext.spec['summary'],
                "suspend": ext.spec['suspend'],
                status: ext.status==undefined?null:{
                    "conditions": ext.status['conditions'],
                    "lastHandledReconcileAt": ext.status['lastHandledReconcileAt'],
                    "observedGeneration": ext.status['observedGeneration'],
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    deleteFluxcdAlert: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteNamespacedCustomObject('notification.toolkit.fluxcd.io','v1beta2',args['namespace'],'alerts', args['name'])
        const ext = res.body as FluxcdAlert
        return {
            metadata: getMetadata(ext.metadata),
            "eventMetadata": ext.spec['eventMetadata'],
            "eventSeverity": ext.spec['eventSeverity'],
            "eventSources": ext.spec['eventSources'],
            "exclusionList": ext.spec['exclusionList'],
            "inclusionList": ext.spec['inclusionList'],
            "providerRef": ext.spec['providerRef'],
            "summary": ext.spec['summary'],
            "suspend": ext.spec['suspend'],
            status: ext.status==undefined?null:{
                "conditions": ext.status['conditions'],
                "lastHandledReconcileAt": ext.status['lastHandledReconcileAt'],
                "observedGeneration": ext.status['observedGeneration'],
            }
        }
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
},
};
