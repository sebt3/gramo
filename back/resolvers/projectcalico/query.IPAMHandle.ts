import {kc, k8s, getMetadata} from '../core/libs.js';
import { ProjectcalicoIPAMHandleList, ProjectcalicoIPAMHandle } from './type.IPAMHandle.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    projectcalicoIPAMHandles: async () => {
        try {
            const res = await customApi.listClusterCustomObject('crd.projectcalico.org','v1','ipamhandles')
            const resList = res.body as ProjectcalicoIPAMHandleList
            return resList.items.map((ext)=>{return{
                metadata: getMetadata(ext.metadata),
                "block": ext.spec['block'],
                "deleted": ext.spec['deleted'],
                "handleID": ext.spec['handleID'],
            }})
        } catch (err) {
          console.error((err as object)['body']);
        }
        return []
    }
};
export const queries = {
    projectcalicoIPAMHandles: lists.projectcalicoIPAMHandles,
    projectcalicoIPAMHandle: async (_parent, args: object) => {
        try {
            const res = await customApi.getClusterCustomObject('crd.projectcalico.org','v1','ipamhandles', args['name'])
            const ext = res.body as ProjectcalicoIPAMHandle
            return {
                metadata: getMetadata(ext.metadata),
                "block": ext.spec['block'],
                "deleted": ext.spec['deleted'],
                "handleID": ext.spec['handleID'],
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
