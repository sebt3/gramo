import {kc, k8s, getMetadata} from '../core/libs.js';
import { ProjectcalicoIPPoolList, ProjectcalicoIPPool } from './type.IPPool.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    projectcalicoIPPools: async () => {
        try {
            const res = await customApi.listClusterCustomObject('crd.projectcalico.org','v1','ippools')
            const resList = res.body as ProjectcalicoIPPoolList
            return resList.items.map((ext)=>{return{
                metadata: getMetadata(ext.metadata, ext),
                "allowedUses": ext.spec['allowedUses'],
                "blockSize": ext.spec['blockSize'],
                "cidr": ext.spec['cidr'],
                "disableBGPExport": ext.spec['disableBGPExport'],
                "disabled": ext.spec['disabled'],
                "ipip": ext.spec['ipip'],
                "ipipMode": ext.spec['ipipMode'],
                "nat-outgoing": ext.spec['nat-outgoing'],
                "natOutgoing": ext.spec['natOutgoing'],
                "nodeSelector": ext.spec['nodeSelector'],
                "vxlanMode": ext.spec['vxlanMode'],
            }})
        } catch (err) {
          console.error((err as object)['body']);
        }
        return []
    }
};
export const queries = {
    projectcalicoIPPools: lists.projectcalicoIPPools,
    projectcalicoIPPool: async (_parent, args: object) => {
        try {
            const res = await customApi.getClusterCustomObject('crd.projectcalico.org','v1','ippools', args['name'])
            const ext = res.body as ProjectcalicoIPPool
            return {
                metadata: getMetadata(ext.metadata, ext),
                "allowedUses": ext.spec['allowedUses'],
                "blockSize": ext.spec['blockSize'],
                "cidr": ext.spec['cidr'],
                "disableBGPExport": ext.spec['disableBGPExport'],
                "disabled": ext.spec['disabled'],
                "ipip": ext.spec['ipip'],
                "ipipMode": ext.spec['ipipMode'],
                "nat-outgoing": ext.spec['nat-outgoing'],
                "natOutgoing": ext.spec['natOutgoing'],
                "nodeSelector": ext.spec['nodeSelector'],
                "vxlanMode": ext.spec['vxlanMode'],
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
