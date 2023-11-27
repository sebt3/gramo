import {kc, k8s, getMetadata} from '../core/libs.js';
import { FluxcdReceiverList, FluxcdReceiver } from './type.Receiver.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    fluxcdReceivers: async (_parent, args: object) => {
        try {
            const res = await customApi.listNamespacedCustomObject('notification.toolkit.fluxcd.io','v1',args['namespace'],'receivers')
            const resList = res.body as FluxcdReceiverList
            return resList.items.map((ext)=>{return{
                metadata: getMetadata(ext.metadata),
                events: ext.spec.events,
                interval: ext.spec.interval,
                resources: ext.spec.resources,
                secretRef: ext.spec.secretRef,
                suspend: ext.spec.suspend,
                type: ext.spec.type,
                status: ext.status==undefined?null:{
                    conditions: ext.status.conditions,
                    lastHandledReconcileAt: ext.status.lastHandledReconcileAt,
                    observedGeneration: ext.status.observedGeneration,
                    webhookPath: ext.status.webhookPath,
                }
            }})
        } catch (err) {
          console.error((err as object)['body']);
        }
        return []
    }
};
export const queries = {
    fluxcdReceiver: async (_parent, args: object) => {
        try {
            const res = await customApi.getNamespacedCustomObject('notification.toolkit.fluxcd.io','v1',args['namespace'],'receivers', args['name'])
            const ext = res.body as FluxcdReceiver
            return {
                metadata: getMetadata(ext.metadata),
                events: ext.spec.events,
                interval: ext.spec.interval,
                resources: ext.spec.resources,
                secretRef: ext.spec.secretRef,
                suspend: ext.spec.suspend,
                type: ext.spec.type,
                status: ext.status==undefined?null:{
                    conditions: ext.status.conditions,
                    lastHandledReconcileAt: ext.status.lastHandledReconcileAt,
                    observedGeneration: ext.status.observedGeneration,
                    webhookPath: ext.status.webhookPath,
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
