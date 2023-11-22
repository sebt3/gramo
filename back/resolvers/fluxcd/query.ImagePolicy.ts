import {kc, k8s, getMetadata} from '../core/libs.js';
import { FluxcdImagePolicyList, FluxcdImagePolicy } from './type.ImagePolicy.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const queries = {
    fluxcdImagePolicys: async (_parent, args: object) => {
        try {
            const res = await customApi.listNamespacedCustomObject('image.toolkit.fluxcd.io','v1beta2',args['namespace'],'imagepolicies')
            const resList = res.body as FluxcdImagePolicyList
            return resList.items.map((ext)=>{return{
                metadata: getMetadata(ext.metadata),
                filterTags: ext.spec.filterTags,
                imageRepositoryRef: ext.spec.imageRepositoryRef,
                policy: ext.spec.policy,
                status: ext.status==undefined?null:{
                    conditions: ext.status.conditions,
                    latestImage: ext.status.latestImage,
                    observedGeneration: ext.status.observedGeneration,
                    observedPreviousImage: ext.status.observedPreviousImage,
                }
            }})
        } catch (err) {
          console.error(err);
        }
        return []
    },
    fluxcdImagePolicy: async (_parent, args: object) => {
        try {
            const res = await customApi.getNamespacedCustomObject('image.toolkit.fluxcd.io','v1beta2',args['namespace'],'imagepolicies', args['name'])
            const ext = res.body as FluxcdImagePolicy
            return {
                metadata: getMetadata(ext.metadata),
                filterTags: ext.spec.filterTags,
                imageRepositoryRef: ext.spec.imageRepositoryRef,
                policy: ext.spec.policy,
                status: ext.status==undefined?null:{
                    conditions: ext.status.conditions,
                    latestImage: ext.status.latestImage,
                    observedGeneration: ext.status.observedGeneration,
                    observedPreviousImage: ext.status.observedPreviousImage,
                }
            }
        } catch (err) {
            console.error(err);
        }
        return null
    },
};
