import {kc, k8s, getMetadata} from '../core/libs.js';
import { ProjectcalicoBGPConfiguration } from './type.BGPConfiguration.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createProjectcalicoBGPConfiguration: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['asNumber'] !== undefined && typeof args['spec']['asNumber'] == 'number') spec['asNumber'] = args['spec']['asNumber'];
        if (args['spec']['bindMode'] !== undefined && typeof args['spec']['bindMode'] == 'string') spec['bindMode'] = args['spec']['bindMode'];
        if (args['spec']['communities'] !== undefined && Array.isArray(args['spec']['communities'])) spec['communities'] = args['spec']['communities'];
        if (args['spec']['ignoredInterfaces'] !== undefined && Array.isArray(args['spec']['ignoredInterfaces'])) spec['ignoredInterfaces'] = args['spec']['ignoredInterfaces'];
        if (args['spec']['listenPort'] !== undefined && typeof args['spec']['listenPort'] == 'number') spec['listenPort'] = args['spec']['listenPort'];
        if (args['spec']['logSeverityScreen'] !== undefined && typeof args['spec']['logSeverityScreen'] == 'string') spec['logSeverityScreen'] = args['spec']['logSeverityScreen'];
        if (args['spec']['nodeMeshMaxRestartTime'] !== undefined && typeof args['spec']['nodeMeshMaxRestartTime'] == 'string') spec['nodeMeshMaxRestartTime'] = args['spec']['nodeMeshMaxRestartTime'];
        if (args['spec']['nodeMeshPassword'] !== undefined && typeof args['spec']['nodeMeshPassword'] == 'object') spec['nodeMeshPassword'] = args['spec']['nodeMeshPassword'];
        if (args['spec']['nodeToNodeMeshEnabled'] !== undefined && typeof args['spec']['nodeToNodeMeshEnabled'] == 'boolean') spec['nodeToNodeMeshEnabled'] = args['spec']['nodeToNodeMeshEnabled'];
        if (args['spec']['prefixAdvertisements'] !== undefined && Array.isArray(args['spec']['prefixAdvertisements'])) spec['prefixAdvertisements'] = args['spec']['prefixAdvertisements'];
        if (args['spec']['serviceClusterIPs'] !== undefined && Array.isArray(args['spec']['serviceClusterIPs'])) spec['serviceClusterIPs'] = args['spec']['serviceClusterIPs'];
        if (args['spec']['serviceExternalIPs'] !== undefined && Array.isArray(args['spec']['serviceExternalIPs'])) spec['serviceExternalIPs'] = args['spec']['serviceExternalIPs'];
        if (args['spec']['serviceLoadBalancerIPs'] !== undefined && Array.isArray(args['spec']['serviceLoadBalancerIPs'])) spec['serviceLoadBalancerIPs'] = args['spec']['serviceLoadBalancerIPs'];
        const payload = {
            apiVersion: 'crd.projectcalico.org/v1',
            kind: 'BGPConfiguration',
            metadata: {
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createClusterCustomObject('crd.projectcalico.org','v1','bgpconfigurations', payload)
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
    patchProjectcalicoBGPConfiguration: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['asNumber'] !== undefined && typeof args['spec']['asNumber'] == 'number') spec['asNumber'] = args['spec']['asNumber'];
        if (args['spec']['bindMode'] !== undefined && typeof args['spec']['bindMode'] == 'string') spec['bindMode'] = args['spec']['bindMode'];
        if (args['spec']['communities'] !== undefined && Array.isArray(args['spec']['communities'])) spec['communities'] = args['spec']['communities'];
        if (args['spec']['ignoredInterfaces'] !== undefined && Array.isArray(args['spec']['ignoredInterfaces'])) spec['ignoredInterfaces'] = args['spec']['ignoredInterfaces'];
        if (args['spec']['listenPort'] !== undefined && typeof args['spec']['listenPort'] == 'number') spec['listenPort'] = args['spec']['listenPort'];
        if (args['spec']['logSeverityScreen'] !== undefined && typeof args['spec']['logSeverityScreen'] == 'string') spec['logSeverityScreen'] = args['spec']['logSeverityScreen'];
        if (args['spec']['nodeMeshMaxRestartTime'] !== undefined && typeof args['spec']['nodeMeshMaxRestartTime'] == 'string') spec['nodeMeshMaxRestartTime'] = args['spec']['nodeMeshMaxRestartTime'];
        if (args['spec']['nodeMeshPassword'] !== undefined && typeof args['spec']['nodeMeshPassword'] == 'object') spec['nodeMeshPassword'] = args['spec']['nodeMeshPassword'];
        if (args['spec']['nodeToNodeMeshEnabled'] !== undefined && typeof args['spec']['nodeToNodeMeshEnabled'] == 'boolean') spec['nodeToNodeMeshEnabled'] = args['spec']['nodeToNodeMeshEnabled'];
        if (args['spec']['prefixAdvertisements'] !== undefined && Array.isArray(args['spec']['prefixAdvertisements'])) spec['prefixAdvertisements'] = args['spec']['prefixAdvertisements'];
        if (args['spec']['serviceClusterIPs'] !== undefined && Array.isArray(args['spec']['serviceClusterIPs'])) spec['serviceClusterIPs'] = args['spec']['serviceClusterIPs'];
        if (args['spec']['serviceExternalIPs'] !== undefined && Array.isArray(args['spec']['serviceExternalIPs'])) spec['serviceExternalIPs'] = args['spec']['serviceExternalIPs'];
        if (args['spec']['serviceLoadBalancerIPs'] !== undefined && Array.isArray(args['spec']['serviceLoadBalancerIPs'])) spec['serviceLoadBalancerIPs'] = args['spec']['serviceLoadBalancerIPs'];
        const request = {
            apiVersion: 'crd.projectcalico.org/v1',
            kind: 'BGPConfiguration',
            metadata: {
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getClusterCustomObject('crd.projectcalico.org','v1','bgpconfigurations', args['name'])
            const extGet = resGet.body as ProjectcalicoBGPConfiguration
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchClusterCustomObject('crd.projectcalico.org','v1','bgpconfigurations', args['name'], payload, undefined, undefined, undefined, options)
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
    deleteProjectcalicoBGPConfiguration: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteClusterCustomObject('crd.projectcalico.org','v1','bgpconfigurations', args['name'])
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
