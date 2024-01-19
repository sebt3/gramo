import {kc, k8s, getMetadata} from '../core/libs.js';
import { ProjectcalicoGlobalNetworkSet } from './type.GlobalNetworkSet.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createProjectcalicoGlobalNetworkSet: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['nets'] !== undefined && Array.isArray(args['spec']['nets'])) spec['nets'] = args['spec']['nets'];
        const payload = {
            apiVersion: 'crd.projectcalico.org/v1',
            kind: 'GlobalNetworkSet',
            metadata: {
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createClusterCustomObject('crd.projectcalico.org','v1','globalnetworksets', payload)
            const ext = res.body as ProjectcalicoGlobalNetworkSet
            return {
                metadata: getMetadata(ext.metadata),
                "nets": ext.spec['nets'],
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    patchProjectcalicoGlobalNetworkSet: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['nets'] !== undefined && Array.isArray(args['spec']['nets'])) spec['nets'] = args['spec']['nets'];
        const request = {
            apiVersion: 'crd.projectcalico.org/v1',
            kind: 'GlobalNetworkSet',
            metadata: {
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getClusterCustomObject('crd.projectcalico.org','v1','globalnetworksets', args['name'])
            const extGet = resGet.body as ProjectcalicoGlobalNetworkSet
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchClusterCustomObject('crd.projectcalico.org','v1','globalnetworksets', args['name'], payload, undefined, undefined, undefined, options)
            const ext = res.body as ProjectcalicoGlobalNetworkSet
            return {
                metadata: getMetadata(ext.metadata),
                "nets": ext.spec['nets'],
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    deleteProjectcalicoGlobalNetworkSet: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteClusterCustomObject('crd.projectcalico.org','v1','globalnetworksets', args['name'])
        const ext = res.body as ProjectcalicoGlobalNetworkSet
        return {
            metadata: getMetadata(ext.metadata),
            "nets": ext.spec['nets'],
        }
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
},
};
