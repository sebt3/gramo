import {kc, k8s, getMetadata} from '../core/libs.js';
import { ProjectcalicoNetworkSetList, ProjectcalicoNetworkSet } from './type.NetworkSet.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    projectcalicoNetworkSets: async (_parent, args: object) => {
        try {
            const res = await customApi.listNamespacedCustomObject('crd.projectcalico.org','v1',args['namespace'],'networksets')
            const resList = res.body as ProjectcalicoNetworkSetList
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
    projectcalicoNetworkSet: async (_parent, args: object) => {
        try {
            const res = await customApi.getNamespacedCustomObject('crd.projectcalico.org','v1',args['namespace'],'networksets', args['name'])
            const ext = res.body as ProjectcalicoNetworkSet
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
