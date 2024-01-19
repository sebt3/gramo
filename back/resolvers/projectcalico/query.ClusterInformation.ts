import {kc, k8s, getMetadata} from '../core/libs.js';
import { ProjectcalicoClusterInformationList, ProjectcalicoClusterInformation } from './type.ClusterInformation.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    projectcalicoClusterInformations: async () => {
        try {
            const res = await customApi.listClusterCustomObject('crd.projectcalico.org','v1','clusterinformations')
            const resList = res.body as ProjectcalicoClusterInformationList
            return resList.items.map((ext)=>{return{
                metadata: getMetadata(ext.metadata),
                "calicoVersion": ext.spec['calicoVersion'],
                "clusterGUID": ext.spec['clusterGUID'],
                "clusterType": ext.spec['clusterType'],
                "datastoreReady": ext.spec['datastoreReady'],
                "variant": ext.spec['variant'],
            }})
        } catch (err) {
          console.error((err as object)['body']);
        }
        return []
    }
};
export const queries = {
    projectcalicoClusterInformations: lists.projectcalicoClusterInformations,
    projectcalicoClusterInformation: async (_parent, args: object) => {
        try {
            const res = await customApi.getClusterCustomObject('crd.projectcalico.org','v1','clusterinformations', args['name'])
            const ext = res.body as ProjectcalicoClusterInformation
            return {
                metadata: getMetadata(ext.metadata),
                "calicoVersion": ext.spec['calicoVersion'],
                "clusterGUID": ext.spec['clusterGUID'],
                "clusterType": ext.spec['clusterType'],
                "datastoreReady": ext.spec['datastoreReady'],
                "variant": ext.spec['variant'],
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
