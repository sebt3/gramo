import {kc, k8s, getMetadata} from '../core/libs.js';
import { ProjectcalicoGlobalNetworkSetList, ProjectcalicoGlobalNetworkSet } from './type.GlobalNetworkSet.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    projectcalicoGlobalNetworkSets: async () => {
        try {
            const res = await customApi.listClusterCustomObject('crd.projectcalico.org','v1','globalnetworksets')
            const resList = res.body as ProjectcalicoGlobalNetworkSetList
            return resList.items.map((ext)=>{return{
                metadata: getMetadata(ext.metadata, ext),
                "nets": ext.spec['nets'],
            }})
        } catch (err) {
          console.error((err as object)['body']);
        }
        return []
    }
};
export const queries = {
    projectcalicoGlobalNetworkSets: lists.projectcalicoGlobalNetworkSets,
    projectcalicoGlobalNetworkSet: async (_parent, args: object) => {
        try {
            const res = await customApi.getClusterCustomObject('crd.projectcalico.org','v1','globalnetworksets', args['name'])
            const ext = res.body as ProjectcalicoGlobalNetworkSet
            return {
                metadata: getMetadata(ext.metadata, ext),
                "nets": ext.spec['nets'],
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
