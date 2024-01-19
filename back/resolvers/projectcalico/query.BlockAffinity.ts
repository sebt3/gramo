import {kc, k8s, getMetadata} from '../core/libs.js';
import { ProjectcalicoBlockAffinityList, ProjectcalicoBlockAffinity } from './type.BlockAffinity.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    projectcalicoBlockAffinitys: async () => {
        try {
            const res = await customApi.listClusterCustomObject('crd.projectcalico.org','v1','blockaffinities')
            const resList = res.body as ProjectcalicoBlockAffinityList
            return resList.items.map((ext)=>{return{
                metadata: getMetadata(ext.metadata),
                "cidr": ext.spec['cidr'],
                "deleted": ext.spec['deleted'],
                "node": ext.spec['node'],
                "state": ext.spec['state'],
            }})
        } catch (err) {
          console.error((err as object)['body']);
        }
        return []
    }
};
export const queries = {
    projectcalicoBlockAffinitys: lists.projectcalicoBlockAffinitys,
    projectcalicoBlockAffinity: async (_parent, args: object) => {
        try {
            const res = await customApi.getClusterCustomObject('crd.projectcalico.org','v1','blockaffinities', args['name'])
            const ext = res.body as ProjectcalicoBlockAffinity
            return {
                metadata: getMetadata(ext.metadata),
                "cidr": ext.spec['cidr'],
                "deleted": ext.spec['deleted'],
                "node": ext.spec['node'],
                "state": ext.spec['state'],
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
