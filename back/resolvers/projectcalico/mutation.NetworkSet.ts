import {kc, k8s, getMetadata} from '../core/libs.js';
import { ProjectcalicoNetworkSet } from './type.NetworkSet.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createProjectcalicoNetworkSet: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['nets'] !== undefined && Array.isArray(args['spec']['nets'])) spec['nets'] = args['spec']['nets'];
        const payload = {
            apiVersion: 'crd.projectcalico.org/v1',
            kind: 'NetworkSet',
            metadata: {
              namespace: args['namespace'],
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createNamespacedCustomObject('crd.projectcalico.org','v1',args['namespace'],'networksets', payload)
            const ext = res.body as ProjectcalicoNetworkSet
            return {
                metadata: getMetadata(ext.metadata, ext),
                "nets": ext.spec['nets'],
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    patchProjectcalicoNetworkSet: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['nets'] !== undefined && Array.isArray(args['spec']['nets'])) spec['nets'] = args['spec']['nets'];
        const request = {
            apiVersion: 'crd.projectcalico.org/v1',
            kind: 'NetworkSet',
            metadata: {
                namespace: args['namespace'],
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getNamespacedCustomObject('crd.projectcalico.org','v1',args['namespace'],'networksets', args['name'])
            const extGet = resGet.body as ProjectcalicoNetworkSet
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchNamespacedCustomObject('crd.projectcalico.org','v1',args['namespace'],'networksets', args['name'], payload, undefined, undefined, undefined, options)
            const ext = res.body as ProjectcalicoNetworkSet
            return {
                metadata: getMetadata(ext.metadata, ext),
                "nets": ext.spec['nets'],
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    deleteProjectcalicoNetworkSet: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteNamespacedCustomObject('crd.projectcalico.org','v1',args['namespace'],'networksets', args['name'])
        const ext = res.body as ProjectcalicoNetworkSet
        return {
            metadata: getMetadata(ext.metadata, ext),
            "nets": ext.spec['nets'],
        }
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
},
};
