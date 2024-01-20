import {kc, k8s, getMetadata} from '../core/libs.js';
import { ProjectcalicoBGPConfigurationList, ProjectcalicoBGPConfiguration } from './type.BGPConfiguration.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    projectcalicoBGPConfigurations: async () => {
        try {
            const res = await customApi.listClusterCustomObject('crd.projectcalico.org','v1','bgpconfigurations')
            const resList = res.body as ProjectcalicoBGPConfigurationList
            return resList.items.map((ext)=>{return{
                metadata: getMetadata(ext.metadata, ext),
                "asNumber": ext.spec['asNumber'],
                "bindMode": ext.spec['bindMode'],
                "communities": ext.spec['communities'],
                "ignoredInterfaces": ext.spec['ignoredInterfaces'],
                "listenPort": ext.spec['listenPort'],
                "logSeverityScreen": ext.spec['logSeverityScreen'],
                "nodeMeshMaxRestartTime": ext.spec['nodeMeshMaxRestartTime'],
                "nodeMeshPassword": ext.spec['nodeMeshPassword'],
                "nodeToNodeMeshEnabled": ext.spec['nodeToNodeMeshEnabled'],
                "prefixAdvertisements": ext.spec['prefixAdvertisements'],
                "serviceClusterIPs": ext.spec['serviceClusterIPs'],
                "serviceExternalIPs": ext.spec['serviceExternalIPs'],
                "serviceLoadBalancerIPs": ext.spec['serviceLoadBalancerIPs'],
            }})
        } catch (err) {
          console.error((err as object)['body']);
        }
        return []
    }
};
export const queries = {
    projectcalicoBGPConfigurations: lists.projectcalicoBGPConfigurations,
    projectcalicoBGPConfiguration: async (_parent, args: object) => {
        try {
            const res = await customApi.getClusterCustomObject('crd.projectcalico.org','v1','bgpconfigurations', args['name'])
            const ext = res.body as ProjectcalicoBGPConfiguration
            return {
                metadata: getMetadata(ext.metadata, ext),
                "asNumber": ext.spec['asNumber'],
                "bindMode": ext.spec['bindMode'],
                "communities": ext.spec['communities'],
                "ignoredInterfaces": ext.spec['ignoredInterfaces'],
                "listenPort": ext.spec['listenPort'],
                "logSeverityScreen": ext.spec['logSeverityScreen'],
                "nodeMeshMaxRestartTime": ext.spec['nodeMeshMaxRestartTime'],
                "nodeMeshPassword": ext.spec['nodeMeshPassword'],
                "nodeToNodeMeshEnabled": ext.spec['nodeToNodeMeshEnabled'],
                "prefixAdvertisements": ext.spec['prefixAdvertisements'],
                "serviceClusterIPs": ext.spec['serviceClusterIPs'],
                "serviceExternalIPs": ext.spec['serviceExternalIPs'],
                "serviceLoadBalancerIPs": ext.spec['serviceLoadBalancerIPs'],
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
