import {kc, k8s, getMetadata} from '../core/libs.js';
import { ProjectcalicoIPAMBlockList, ProjectcalicoIPAMBlock } from './type.IPAMBlock.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    projectcalicoIPAMBlocks: async () => {
        try {
            const res = await customApi.listClusterCustomObject('crd.projectcalico.org','v1','ipamblocks')
            const resList = res.body as ProjectcalicoIPAMBlockList
            return resList.items.map((ext)=>{return{
                metadata: getMetadata(ext.metadata, ext),
                "affinity": ext.spec['affinity'],
                "allocations": ext.spec['allocations'],
                "attributes": ext.spec['attributes'],
                "cidr": ext.spec['cidr'],
                "deleted": ext.spec['deleted'],
                "sequenceNumber": ext.spec['sequenceNumber'],
                "sequenceNumberForAllocation": ext.spec['sequenceNumberForAllocation'],
                "strictAffinity": ext.spec['strictAffinity'],
                "unallocated": ext.spec['unallocated'],
            }})
        } catch (err) {
          console.error((err as object)['body']);
        }
        return []
    }
};
export const queries = {
    projectcalicoIPAMBlocks: lists.projectcalicoIPAMBlocks,
    projectcalicoIPAMBlock: async (_parent, args: object) => {
        try {
            const res = await customApi.getClusterCustomObject('crd.projectcalico.org','v1','ipamblocks', args['name'])
            const ext = res.body as ProjectcalicoIPAMBlock
            return {
                metadata: getMetadata(ext.metadata, ext),
                "affinity": ext.spec['affinity'],
                "allocations": ext.spec['allocations'],
                "attributes": ext.spec['attributes'],
                "cidr": ext.spec['cidr'],
                "deleted": ext.spec['deleted'],
                "sequenceNumber": ext.spec['sequenceNumber'],
                "sequenceNumberForAllocation": ext.spec['sequenceNumberForAllocation'],
                "strictAffinity": ext.spec['strictAffinity'],
                "unallocated": ext.spec['unallocated'],
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
