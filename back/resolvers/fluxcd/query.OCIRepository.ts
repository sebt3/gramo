import {kc, k8s, getMetadata} from '../core/libs.js';
import { FluxcdOCIRepositoryList, FluxcdOCIRepository } from './type.OCIRepository.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const queries = {
    fluxcdOCIRepositorys: async (_parent, args: object) => {
        try {
            const res = await customApi.listNamespacedCustomObject('source.toolkit.fluxcd.io','v1beta2',args['namespace'],'ocirepositories')
            const resList = res.body as FluxcdOCIRepositoryList
            return resList.items.map((ext)=>{return{
                metadata: getMetadata(ext.metadata),
                certSecretRef: ext.spec.certSecretRef,
                ignore: ext.spec.ignore,
                insecure: ext.spec.insecure,
                interval: ext.spec.interval,
                layerSelector: ext.spec.layerSelector,
                provider: ext.spec.provider,
                ref: ext.spec.ref,
                secretRef: ext.spec.secretRef,
                serviceAccountName: ext.spec.serviceAccountName,
                suspend: ext.spec.suspend,
                timeout: ext.spec.timeout,
                url: ext.spec.url,
                verify: ext.spec.verify,
                status: ext.status==undefined?null:{
                    artifact: ext.status.artifact,
                    conditions: ext.status.conditions,
                    contentConfigChecksum: ext.status.contentConfigChecksum,
                    lastHandledReconcileAt: ext.status.lastHandledReconcileAt,
                    observedGeneration: ext.status.observedGeneration,
                    observedIgnore: ext.status.observedIgnore,
                    observedLayerSelector: ext.status.observedLayerSelector,
                    url: ext.status.url,
                }
            }})
        } catch (err) {
          console.error(err);
        }
        return []
    },
    fluxcdOCIRepository: async (_parent, args: object) => {
        try {
            const res = await customApi.getNamespacedCustomObject('source.toolkit.fluxcd.io','v1beta2',args['namespace'],'ocirepositories', args['name'])
            const ext = res.body as FluxcdOCIRepository
            return {
                metadata: getMetadata(ext.metadata),
                certSecretRef: ext.spec.certSecretRef,
                ignore: ext.spec.ignore,
                insecure: ext.spec.insecure,
                interval: ext.spec.interval,
                layerSelector: ext.spec.layerSelector,
                provider: ext.spec.provider,
                ref: ext.spec.ref,
                secretRef: ext.spec.secretRef,
                serviceAccountName: ext.spec.serviceAccountName,
                suspend: ext.spec.suspend,
                timeout: ext.spec.timeout,
                url: ext.spec.url,
                verify: ext.spec.verify,
                status: ext.status==undefined?null:{
                    artifact: ext.status.artifact,
                    conditions: ext.status.conditions,
                    contentConfigChecksum: ext.status.contentConfigChecksum,
                    lastHandledReconcileAt: ext.status.lastHandledReconcileAt,
                    observedGeneration: ext.status.observedGeneration,
                    observedIgnore: ext.status.observedIgnore,
                    observedLayerSelector: ext.status.observedLayerSelector,
                    url: ext.status.url,
                }
            }
        } catch (err) {
            console.error(err);
        }
        return null
    },
};
