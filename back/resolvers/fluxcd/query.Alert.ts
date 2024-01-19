import {kc, k8s, getMetadata} from '../core/libs.js';
import { FluxcdAlertList, FluxcdAlert } from './type.Alert.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    fluxcdAlerts: async (_parent, args: object) => {
        try {
            const res = await customApi.listNamespacedCustomObject('notification.toolkit.fluxcd.io','v1beta2',args['namespace'],'alerts')
            const resList = res.body as FluxcdAlertList
            return resList.items.map((ext)=>{return{
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
            }})
        } catch (err) {
          console.error((err as object)['body']);
        }
        return []
    }
};
export const queries = {
    fluxcdAlert: async (_parent, args: object) => {
        try {
            const res = await customApi.getNamespacedCustomObject('notification.toolkit.fluxcd.io','v1beta2',args['namespace'],'alerts', args['name'])
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
