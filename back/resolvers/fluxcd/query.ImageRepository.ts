import {kc, k8s, getMetadata} from '../core/libs.js';
import { FluxcdImageRepositoryList, FluxcdImageRepository } from './type.ImageRepository.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    fluxcdImageRepositorys: async (_parent, args: object) => {
        try {
            const res = await customApi.listNamespacedCustomObject('image.toolkit.fluxcd.io','v1beta2',args['namespace'],'imagerepositories')
            const resList = res.body as FluxcdImageRepositoryList
            return resList.items.map((ext)=>{return{
                metadata: getMetadata(ext.metadata),
                accessFrom: ext.spec.accessFrom,
                certSecretRef: ext.spec.certSecretRef,
                exclusionList: ext.spec.exclusionList,
                image: ext.spec.image,
                interval: ext.spec.interval,
                provider: ext.spec.provider,
                secretRef: ext.spec.secretRef,
                serviceAccountName: ext.spec.serviceAccountName,
                suspend: ext.spec.suspend,
                timeout: ext.spec.timeout,
                status: ext.status==undefined?null:{
                    canonicalImageName: ext.status.canonicalImageName,
                    conditions: ext.status.conditions,
                    lastHandledReconcileAt: ext.status.lastHandledReconcileAt,
                    lastScanResult: ext.status.lastScanResult,
                    observedExclusionList: ext.status.observedExclusionList,
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
    fluxcdImageRepository: async (_parent, args: object) => {
        try {
            const res = await customApi.getNamespacedCustomObject('image.toolkit.fluxcd.io','v1beta2',args['namespace'],'imagerepositories', args['name'])
            const ext = res.body as FluxcdImageRepository
            return {
                metadata: getMetadata(ext.metadata),
                accessFrom: ext.spec.accessFrom,
                certSecretRef: ext.spec.certSecretRef,
                exclusionList: ext.spec.exclusionList,
                image: ext.spec.image,
                interval: ext.spec.interval,
                provider: ext.spec.provider,
                secretRef: ext.spec.secretRef,
                serviceAccountName: ext.spec.serviceAccountName,
                suspend: ext.spec.suspend,
                timeout: ext.spec.timeout,
                status: ext.status==undefined?null:{
                    canonicalImageName: ext.status.canonicalImageName,
                    conditions: ext.status.conditions,
                    lastHandledReconcileAt: ext.status.lastHandledReconcileAt,
                    lastScanResult: ext.status.lastScanResult,
                    observedExclusionList: ext.status.observedExclusionList,
                    observedGeneration: ext.status.observedGeneration,
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
