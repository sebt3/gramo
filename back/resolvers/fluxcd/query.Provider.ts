import {kc, k8s, getMetadata} from '../core/libs.js';
import { FluxcdProviderList, FluxcdProvider } from './type.Provider.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    fluxcdProviders: async (_parent, args: object) => {
        try {
            const res = await customApi.listNamespacedCustomObject('notification.toolkit.fluxcd.io','v1beta2',args['namespace'],'providers')
            const resList = res.body as FluxcdProviderList
            return resList.items.map((ext)=>{return{
                metadata: getMetadata(ext.metadata),
                address: ext.spec.address,
                certSecretRef: ext.spec.certSecretRef,
                channel: ext.spec.channel,
                interval: ext.spec.interval,
                proxy: ext.spec.proxy,
                secretRef: ext.spec.secretRef,
                suspend: ext.spec.suspend,
                timeout: ext.spec.timeout,
                type: ext.spec.type,
                username: ext.spec.username,
                status: ext.status==undefined?null:{
                    conditions: ext.status.conditions,
                    lastHandledReconcileAt: ext.status.lastHandledReconcileAt,
                    observedGeneration: ext.status.observedGeneration,
                }
            }})
        } catch (err) {
          console.error((err as object)['body']);
        }
        return []
    }
};
export const queries = {
    fluxcdProvider: async (_parent, args: object) => {
        try {
            const res = await customApi.getNamespacedCustomObject('notification.toolkit.fluxcd.io','v1beta2',args['namespace'],'providers', args['name'])
            const ext = res.body as FluxcdProvider
            return {
                metadata: getMetadata(ext.metadata),
                address: ext.spec.address,
                certSecretRef: ext.spec.certSecretRef,
                channel: ext.spec.channel,
                interval: ext.spec.interval,
                proxy: ext.spec.proxy,
                secretRef: ext.spec.secretRef,
                suspend: ext.spec.suspend,
                timeout: ext.spec.timeout,
                type: ext.spec.type,
                username: ext.spec.username,
                status: ext.status==undefined?null:{
                    conditions: ext.status.conditions,
                    lastHandledReconcileAt: ext.status.lastHandledReconcileAt,
                    observedGeneration: ext.status.observedGeneration,
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
