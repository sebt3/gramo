import {kc, k8s, getMetadata} from '../core/libs.js';
import { ProjectcalicoHostEndpoint } from './type.HostEndpoint.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createProjectcalicoHostEndpoint: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['expectedIPs'] !== undefined && Array.isArray(args['spec']['expectedIPs'])) spec['expectedIPs'] = args['spec']['expectedIPs'];
        if (args['spec']['interfaceName'] !== undefined && typeof args['spec']['interfaceName'] == 'string') spec['interfaceName'] = args['spec']['interfaceName'];
        if (args['spec']['node'] !== undefined && typeof args['spec']['node'] == 'string') spec['node'] = args['spec']['node'];
        if (args['spec']['ports'] !== undefined && Array.isArray(args['spec']['ports'])) spec['ports'] = args['spec']['ports'];
        if (args['spec']['profiles'] !== undefined && Array.isArray(args['spec']['profiles'])) spec['profiles'] = args['spec']['profiles'];
        const payload = {
            apiVersion: 'crd.projectcalico.org/v1',
            kind: 'HostEndpoint',
            metadata: {
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createClusterCustomObject('crd.projectcalico.org','v1','hostendpoints', payload)
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
    patchProjectcalicoHostEndpoint: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['expectedIPs'] !== undefined && Array.isArray(args['spec']['expectedIPs'])) spec['expectedIPs'] = args['spec']['expectedIPs'];
        if (args['spec']['interfaceName'] !== undefined && typeof args['spec']['interfaceName'] == 'string') spec['interfaceName'] = args['spec']['interfaceName'];
        if (args['spec']['node'] !== undefined && typeof args['spec']['node'] == 'string') spec['node'] = args['spec']['node'];
        if (args['spec']['ports'] !== undefined && Array.isArray(args['spec']['ports'])) spec['ports'] = args['spec']['ports'];
        if (args['spec']['profiles'] !== undefined && Array.isArray(args['spec']['profiles'])) spec['profiles'] = args['spec']['profiles'];
        const request = {
            apiVersion: 'crd.projectcalico.org/v1',
            kind: 'HostEndpoint',
            metadata: {
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getClusterCustomObject('crd.projectcalico.org','v1','hostendpoints', args['name'])
            const extGet = resGet.body as ProjectcalicoHostEndpoint
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchClusterCustomObject('crd.projectcalico.org','v1','hostendpoints', args['name'], payload, undefined, undefined, undefined, options)
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
    deleteProjectcalicoHostEndpoint: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteClusterCustomObject('crd.projectcalico.org','v1','hostendpoints', args['name'])
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
