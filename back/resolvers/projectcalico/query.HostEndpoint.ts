import {kc, k8s, getMetadata} from '../core/libs.js';
import { ProjectcalicoHostEndpointList, ProjectcalicoHostEndpoint } from './type.HostEndpoint.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    projectcalicoHostEndpoints: async () => {
        try {
            const res = await customApi.listClusterCustomObject('crd.projectcalico.org','v1','hostendpoints')
            const resList = res.body as ProjectcalicoHostEndpointList
            return resList.items.map((ext)=>{return{
                metadata: getMetadata(ext.metadata, ext),
                "expectedIPs": ext.spec['expectedIPs'],
                "interfaceName": ext.spec['interfaceName'],
                "node": ext.spec['node'],
                "ports": ext.spec['ports'],
                "profiles": ext.spec['profiles'],
            }})
        } catch (err) {
          console.error((err as object)['body']);
        }
        return []
    }
};
export const queries = {
    projectcalicoHostEndpoints: lists.projectcalicoHostEndpoints,
    projectcalicoHostEndpoint: async (_parent, args: object) => {
        try {
            const res = await customApi.getClusterCustomObject('crd.projectcalico.org','v1','hostendpoints', args['name'])
            const ext = res.body as ProjectcalicoHostEndpoint
            return {
                metadata: getMetadata(ext.metadata, ext),
                "expectedIPs": ext.spec['expectedIPs'],
                "interfaceName": ext.spec['interfaceName'],
                "node": ext.spec['node'],
                "ports": ext.spec['ports'],
                "profiles": ext.spec['profiles'],
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
