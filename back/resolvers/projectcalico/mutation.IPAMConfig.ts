import {kc, k8s, getMetadata} from '../core/libs.js';
import { ProjectcalicoIPAMConfig } from './type.IPAMConfig.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createProjectcalicoIPAMConfig: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        spec['autoAllocateBlocks'] = args['spec']['autoAllocateBlocks'];
        if (args['spec']['maxBlocksPerHost'] !== undefined && typeof args['spec']['maxBlocksPerHost'] == 'number') spec['maxBlocksPerHost'] = args['spec']['maxBlocksPerHost'];
        spec['strictAffinity'] = args['spec']['strictAffinity'];
        const payload = {
            apiVersion: 'crd.projectcalico.org/v1',
            kind: 'IPAMConfig',
            metadata: {
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createClusterCustomObject('crd.projectcalico.org','v1','ipamconfigs', payload)
            const ext = res.body as ProjectcalicoIPAMConfig
            return {
                metadata: getMetadata(ext.metadata, ext),
                "autoAllocateBlocks": ext.spec['autoAllocateBlocks'],
                "maxBlocksPerHost": ext.spec['maxBlocksPerHost'],
                "strictAffinity": ext.spec['strictAffinity'],
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    patchProjectcalicoIPAMConfig: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        spec['autoAllocateBlocks'] = args['spec']['autoAllocateBlocks'];
        if (args['spec']['maxBlocksPerHost'] !== undefined && typeof args['spec']['maxBlocksPerHost'] == 'number') spec['maxBlocksPerHost'] = args['spec']['maxBlocksPerHost'];
        spec['strictAffinity'] = args['spec']['strictAffinity'];
        const request = {
            apiVersion: 'crd.projectcalico.org/v1',
            kind: 'IPAMConfig',
            metadata: {
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getClusterCustomObject('crd.projectcalico.org','v1','ipamconfigs', args['name'])
            const extGet = resGet.body as ProjectcalicoIPAMConfig
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchClusterCustomObject('crd.projectcalico.org','v1','ipamconfigs', args['name'], payload, undefined, undefined, undefined, options)
            const ext = res.body as ProjectcalicoIPAMConfig
            return {
                metadata: getMetadata(ext.metadata, ext),
                "autoAllocateBlocks": ext.spec['autoAllocateBlocks'],
                "maxBlocksPerHost": ext.spec['maxBlocksPerHost'],
                "strictAffinity": ext.spec['strictAffinity'],
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    deleteProjectcalicoIPAMConfig: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteClusterCustomObject('crd.projectcalico.org','v1','ipamconfigs', args['name'])
        const ext = res.body as ProjectcalicoIPAMConfig
        return {
            metadata: getMetadata(ext.metadata, ext),
            "autoAllocateBlocks": ext.spec['autoAllocateBlocks'],
            "maxBlocksPerHost": ext.spec['maxBlocksPerHost'],
            "strictAffinity": ext.spec['strictAffinity'],
        }
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
},
};
