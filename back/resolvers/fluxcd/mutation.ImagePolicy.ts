import {kc, k8s, getMetadata} from '../core/libs.js';
import { FluxcdImagePolicy } from './type.ImagePolicy.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createFluxcdImagePolicy: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['filterTags'] !== undefined && typeof args['spec']['filterTags'] == 'object') spec['filterTags'] = args['spec']['filterTags'];
        spec['imageRepositoryRef'] = args['spec']['imageRepositoryRef'];
        spec['policy'] = args['spec']['policy'];
        const payload = {
            apiVersion: 'image.toolkit.fluxcd.io/v1beta2',
            kind: 'ImagePolicy',
            metadata: {
              namespace: args['namespace'],
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createNamespacedCustomObject('image.toolkit.fluxcd.io','v1beta2',args['namespace'],'imagepolicies', payload)
            const ext = res.body as FluxcdImagePolicy
            return {
                metadata: getMetadata(ext.metadata),
                filterTags: ext.spec.filterTags,
                imageRepositoryRef: ext.spec.imageRepositoryRef,
                policy: ext.spec.policy,
                status: ext.status==undefined?null:{
                    conditions: ext.status.conditions,
                    latestImage: ext.status.latestImage,
                    observedGeneration: ext.status.observedGeneration,
                    observedPreviousImage: ext.status.observedPreviousImage,
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    patchFluxcdImagePolicy: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['filterTags'] !== undefined && typeof args['spec']['filterTags'] == 'object') spec['filterTags'] = args['spec']['filterTags'];
        spec['imageRepositoryRef'] = args['spec']['imageRepositoryRef'];
        spec['policy'] = args['spec']['policy'];
        const request = {
            apiVersion: 'image.toolkit.fluxcd.io/v1beta2',
            kind: 'ImagePolicy',
            metadata: {
                namespace: args['namespace'],
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getNamespacedCustomObject('image.toolkit.fluxcd.io','v1beta2',args['namespace'],'imagepolicies', args['name'])
            const extGet = resGet.body as FluxcdImagePolicy
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchNamespacedCustomObject('image.toolkit.fluxcd.io','v1beta2',args['namespace'],'imagepolicies', args['name'], payload, undefined, undefined, undefined, options)
            const ext = res.body as FluxcdImagePolicy
            return {
                metadata: getMetadata(ext.metadata),
                filterTags: ext.spec.filterTags,
                imageRepositoryRef: ext.spec.imageRepositoryRef,
                policy: ext.spec.policy,
                status: ext.status==undefined?null:{
                    conditions: ext.status.conditions,
                    latestImage: ext.status.latestImage,
                    observedGeneration: ext.status.observedGeneration,
                    observedPreviousImage: ext.status.observedPreviousImage,
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    deleteFluxcdImagePolicy: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteNamespacedCustomObject('image.toolkit.fluxcd.io','v1beta2',args['namespace'],'imagepolicies', args['name'])
        const ext = res.body as FluxcdImagePolicy
        return {
            metadata: getMetadata(ext.metadata),
            filterTags: ext.spec.filterTags,
            imageRepositoryRef: ext.spec.imageRepositoryRef,
            policy: ext.spec.policy,
            status: ext.status==undefined?null:{
                conditions: ext.status.conditions,
                latestImage: ext.status.latestImage,
                observedGeneration: ext.status.observedGeneration,
                observedPreviousImage: ext.status.observedPreviousImage,
            }
        }
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
},
};
