import {kc, k8s, getMetadata} from '../core/libs.js';
import { ProjectcalicoBGPPeerList, ProjectcalicoBGPPeer } from './type.BGPPeer.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    projectcalicoBGPPeers: async () => {
        try {
            const res = await customApi.listClusterCustomObject('crd.projectcalico.org','v1','bgppeers')
            const resList = res.body as ProjectcalicoBGPPeerList
            return resList.items.map((ext)=>{return{
                metadata: getMetadata(ext.metadata),
                "asNumber": ext.spec['asNumber'],
                "keepOriginalNextHop": ext.spec['keepOriginalNextHop'],
                "maxRestartTime": ext.spec['maxRestartTime'],
                "node": ext.spec['node'],
                "nodeSelector": ext.spec['nodeSelector'],
                "numAllowedLocalASNumbers": ext.spec['numAllowedLocalASNumbers'],
                "password": ext.spec['password'],
                "peerIP": ext.spec['peerIP'],
                "peerSelector": ext.spec['peerSelector'],
                "reachableBy": ext.spec['reachableBy'],
                "sourceAddress": ext.spec['sourceAddress'],
                "ttlSecurity": ext.spec['ttlSecurity'],
            }})
        } catch (err) {
          console.error((err as object)['body']);
        }
        return []
    }
};
export const queries = {
    projectcalicoBGPPeers: lists.projectcalicoBGPPeers,
    projectcalicoBGPPeer: async (_parent, args: object) => {
        try {
            const res = await customApi.getClusterCustomObject('crd.projectcalico.org','v1','bgppeers', args['name'])
            const ext = res.body as ProjectcalicoBGPPeer
            return {
                metadata: getMetadata(ext.metadata),
                "asNumber": ext.spec['asNumber'],
                "keepOriginalNextHop": ext.spec['keepOriginalNextHop'],
                "maxRestartTime": ext.spec['maxRestartTime'],
                "node": ext.spec['node'],
                "nodeSelector": ext.spec['nodeSelector'],
                "numAllowedLocalASNumbers": ext.spec['numAllowedLocalASNumbers'],
                "password": ext.spec['password'],
                "peerIP": ext.spec['peerIP'],
                "peerSelector": ext.spec['peerSelector'],
                "reachableBy": ext.spec['reachableBy'],
                "sourceAddress": ext.spec['sourceAddress'],
                "ttlSecurity": ext.spec['ttlSecurity'],
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
