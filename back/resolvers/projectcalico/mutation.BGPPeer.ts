import {kc, k8s, getMetadata} from '../core/libs.js';
import { ProjectcalicoBGPPeer } from './type.BGPPeer.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createProjectcalicoBGPPeer: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['asNumber'] !== undefined && typeof args['spec']['asNumber'] == 'number') spec['asNumber'] = args['spec']['asNumber'];
        if (args['spec']['keepOriginalNextHop'] !== undefined && typeof args['spec']['keepOriginalNextHop'] == 'boolean') spec['keepOriginalNextHop'] = args['spec']['keepOriginalNextHop'];
        if (args['spec']['maxRestartTime'] !== undefined && typeof args['spec']['maxRestartTime'] == 'string') spec['maxRestartTime'] = args['spec']['maxRestartTime'];
        if (args['spec']['node'] !== undefined && typeof args['spec']['node'] == 'string') spec['node'] = args['spec']['node'];
        if (args['spec']['nodeSelector'] !== undefined && typeof args['spec']['nodeSelector'] == 'string') spec['nodeSelector'] = args['spec']['nodeSelector'];
        if (args['spec']['numAllowedLocalASNumbers'] !== undefined && typeof args['spec']['numAllowedLocalASNumbers'] == 'number') spec['numAllowedLocalASNumbers'] = args['spec']['numAllowedLocalASNumbers'];
        if (args['spec']['password'] !== undefined && typeof args['spec']['password'] == 'object') spec['password'] = args['spec']['password'];
        if (args['spec']['peerIP'] !== undefined && typeof args['spec']['peerIP'] == 'string') spec['peerIP'] = args['spec']['peerIP'];
        if (args['spec']['peerSelector'] !== undefined && typeof args['spec']['peerSelector'] == 'string') spec['peerSelector'] = args['spec']['peerSelector'];
        if (args['spec']['reachableBy'] !== undefined && typeof args['spec']['reachableBy'] == 'string') spec['reachableBy'] = args['spec']['reachableBy'];
        if (args['spec']['sourceAddress'] !== undefined && typeof args['spec']['sourceAddress'] == 'string') spec['sourceAddress'] = args['spec']['sourceAddress'];
        if (args['spec']['ttlSecurity'] !== undefined && typeof args['spec']['ttlSecurity'] == 'number') spec['ttlSecurity'] = args['spec']['ttlSecurity'];
        const payload = {
            apiVersion: 'crd.projectcalico.org/v1',
            kind: 'BGPPeer',
            metadata: {
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createClusterCustomObject('crd.projectcalico.org','v1','bgppeers', payload)
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
    patchProjectcalicoBGPPeer: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['asNumber'] !== undefined && typeof args['spec']['asNumber'] == 'number') spec['asNumber'] = args['spec']['asNumber'];
        if (args['spec']['keepOriginalNextHop'] !== undefined && typeof args['spec']['keepOriginalNextHop'] == 'boolean') spec['keepOriginalNextHop'] = args['spec']['keepOriginalNextHop'];
        if (args['spec']['maxRestartTime'] !== undefined && typeof args['spec']['maxRestartTime'] == 'string') spec['maxRestartTime'] = args['spec']['maxRestartTime'];
        if (args['spec']['node'] !== undefined && typeof args['spec']['node'] == 'string') spec['node'] = args['spec']['node'];
        if (args['spec']['nodeSelector'] !== undefined && typeof args['spec']['nodeSelector'] == 'string') spec['nodeSelector'] = args['spec']['nodeSelector'];
        if (args['spec']['numAllowedLocalASNumbers'] !== undefined && typeof args['spec']['numAllowedLocalASNumbers'] == 'number') spec['numAllowedLocalASNumbers'] = args['spec']['numAllowedLocalASNumbers'];
        if (args['spec']['password'] !== undefined && typeof args['spec']['password'] == 'object') spec['password'] = args['spec']['password'];
        if (args['spec']['peerIP'] !== undefined && typeof args['spec']['peerIP'] == 'string') spec['peerIP'] = args['spec']['peerIP'];
        if (args['spec']['peerSelector'] !== undefined && typeof args['spec']['peerSelector'] == 'string') spec['peerSelector'] = args['spec']['peerSelector'];
        if (args['spec']['reachableBy'] !== undefined && typeof args['spec']['reachableBy'] == 'string') spec['reachableBy'] = args['spec']['reachableBy'];
        if (args['spec']['sourceAddress'] !== undefined && typeof args['spec']['sourceAddress'] == 'string') spec['sourceAddress'] = args['spec']['sourceAddress'];
        if (args['spec']['ttlSecurity'] !== undefined && typeof args['spec']['ttlSecurity'] == 'number') spec['ttlSecurity'] = args['spec']['ttlSecurity'];
        const request = {
            apiVersion: 'crd.projectcalico.org/v1',
            kind: 'BGPPeer',
            metadata: {
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getClusterCustomObject('crd.projectcalico.org','v1','bgppeers', args['name'])
            const extGet = resGet.body as ProjectcalicoBGPPeer
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchClusterCustomObject('crd.projectcalico.org','v1','bgppeers', args['name'], payload, undefined, undefined, undefined, options)
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
    deleteProjectcalicoBGPPeer: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteClusterCustomObject('crd.projectcalico.org','v1','bgppeers', args['name'])
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
