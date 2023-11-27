import {kc, k8s, getMetadata} from '../core/libs.js';
import { FluxcdImageUpdateAutomationList, FluxcdImageUpdateAutomation } from './type.ImageUpdateAutomation.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    fluxcdImageUpdateAutomations: async (_parent, args: object) => {
        try {
            const res = await customApi.listNamespacedCustomObject('image.toolkit.fluxcd.io','v1beta1',args['namespace'],'imageupdateautomations')
            const resList = res.body as FluxcdImageUpdateAutomationList
            return resList.items.map((ext)=>{return{
                metadata: getMetadata(ext.metadata),
                git: ext.spec.git,
                interval: ext.spec.interval,
                sourceRef: ext.spec.sourceRef,
                suspend: ext.spec.suspend,
                update: ext.spec.update,
                status: ext.status==undefined?null:{
                    conditions: ext.status.conditions,
                    lastAutomationRunTime: ext.status.lastAutomationRunTime,
                    lastHandledReconcileAt: ext.status.lastHandledReconcileAt,
                    lastPushCommit: ext.status.lastPushCommit,
                    lastPushTime: ext.status.lastPushTime,
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
    fluxcdImageUpdateAutomation: async (_parent, args: object) => {
        try {
            const res = await customApi.getNamespacedCustomObject('image.toolkit.fluxcd.io','v1beta1',args['namespace'],'imageupdateautomations', args['name'])
            const ext = res.body as FluxcdImageUpdateAutomation
            return {
                metadata: getMetadata(ext.metadata),
                git: ext.spec.git,
                interval: ext.spec.interval,
                sourceRef: ext.spec.sourceRef,
                suspend: ext.spec.suspend,
                update: ext.spec.update,
                status: ext.status==undefined?null:{
                    conditions: ext.status.conditions,
                    lastAutomationRunTime: ext.status.lastAutomationRunTime,
                    lastHandledReconcileAt: ext.status.lastHandledReconcileAt,
                    lastPushCommit: ext.status.lastPushCommit,
                    lastPushTime: ext.status.lastPushTime,
                    observedGeneration: ext.status.observedGeneration,
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
