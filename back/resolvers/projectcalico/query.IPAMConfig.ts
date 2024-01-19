import {kc, k8s, getMetadata} from '../core/libs.js';
import { ProjectcalicoIPAMConfigList, ProjectcalicoIPAMConfig } from './type.IPAMConfig.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    projectcalicoIPAMConfigs: async () => {
        try {
            const res = await customApi.listClusterCustomObject('crd.projectcalico.org','v1','ipamconfigs')
            const resList = res.body as ProjectcalicoIPAMConfigList
            return resList.items.map((ext)=>{return{
                metadata: getMetadata(ext.metadata),
                "autoAllocateBlocks": ext.spec['autoAllocateBlocks'],
                "maxBlocksPerHost": ext.spec['maxBlocksPerHost'],
                "strictAffinity": ext.spec['strictAffinity'],
            }})
        } catch (err) {
          console.error((err as object)['body']);
        }
        return []
    }
};
export const queries = {
    projectcalicoIPAMConfigs: lists.projectcalicoIPAMConfigs,
    projectcalicoIPAMConfig: async (_parent, args: object) => {
        try {
            const res = await customApi.getClusterCustomObject('crd.projectcalico.org','v1','ipamconfigs', args['name'])
            const ext = res.body as ProjectcalicoIPAMConfig
            return {
                metadata: getMetadata(ext.metadata),
                "autoAllocateBlocks": ext.spec['autoAllocateBlocks'],
                "maxBlocksPerHost": ext.spec['maxBlocksPerHost'],
                "strictAffinity": ext.spec['strictAffinity'],
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
