import {kc, k8s, getMetadata} from '../core/libs.js';
import { ProjectcalicoIPReservationList, ProjectcalicoIPReservation } from './type.IPReservation.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    projectcalicoIPReservations: async () => {
        try {
            const res = await customApi.listClusterCustomObject('crd.projectcalico.org','v1','ipreservations')
            const resList = res.body as ProjectcalicoIPReservationList
            return resList.items.map((ext)=>{return{
                metadata: getMetadata(ext.metadata, ext),
                "reservedCIDRs": ext.spec['reservedCIDRs'],
            }})
        } catch (err) {
          console.error((err as object)['body']);
        }
        return []
    }
};
export const queries = {
    projectcalicoIPReservations: lists.projectcalicoIPReservations,
    projectcalicoIPReservation: async (_parent, args: object) => {
        try {
            const res = await customApi.getClusterCustomObject('crd.projectcalico.org','v1','ipreservations', args['name'])
            const ext = res.body as ProjectcalicoIPReservation
            return {
                metadata: getMetadata(ext.metadata, ext),
                "reservedCIDRs": ext.spec['reservedCIDRs'],
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
