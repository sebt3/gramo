import {kc, k8s, getMetadata} from '../core/libs.js';
import { FluxcdGitRepository } from './type.GitRepository.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createFluxcdGitRepository: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['ignore'] !== undefined && typeof args['spec']['ignore'] == 'string') spec['ignore'] = args['spec']['ignore'];
        if (args['spec']['include'] !== undefined && Array.isArray(args['spec']['include'])) spec['include'] = args['spec']['include'];
        spec['interval'] = args['spec']['interval'];
        if (args['spec']['recurseSubmodules'] !== undefined && typeof args['spec']['recurseSubmodules'] == 'boolean') spec['recurseSubmodules'] = args['spec']['recurseSubmodules'];
        if (args['spec']['ref'] !== undefined && typeof args['spec']['ref'] == 'object') spec['ref'] = args['spec']['ref'];
        if (args['spec']['secretRef'] !== undefined && typeof args['spec']['secretRef'] == 'object') spec['secretRef'] = args['spec']['secretRef'];
        if (args['spec']['suspend'] !== undefined && typeof args['spec']['suspend'] == 'boolean') spec['suspend'] = args['spec']['suspend'];
        if (args['spec']['timeout'] !== undefined && typeof args['spec']['timeout'] == 'string') spec['timeout'] = args['spec']['timeout'];
        spec['url'] = args['spec']['url'];
        if (args['spec']['verify'] !== undefined && typeof args['spec']['verify'] == 'object') spec['verify'] = args['spec']['verify'];
        const payload = {
            apiVersion: 'source.toolkit.fluxcd.io/v1',
            kind: 'GitRepository',
            metadata: {
              namespace: args['namespace'],
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createNamespacedCustomObject('source.toolkit.fluxcd.io','v1',args['namespace'],'gitrepositories', payload)
            const ext = res.body as FluxcdGitRepository
            return {
                metadata: getMetadata(ext.metadata),
                ignore: ext.spec.ignore,
                include: ext.spec.include,
                interval: ext.spec.interval,
                recurseSubmodules: ext.spec.recurseSubmodules,
                ref: ext.spec.ref,
                secretRef: ext.spec.secretRef,
                suspend: ext.spec.suspend,
                timeout: ext.spec.timeout,
                url: ext.spec.url,
                verify: ext.spec.verify,
                status: ext.status==undefined?null:{
                    artifact: ext.status.artifact,
                    conditions: ext.status.conditions,
                    includedArtifacts: ext.status.includedArtifacts,
                    lastHandledReconcileAt: ext.status.lastHandledReconcileAt,
                    observedGeneration: ext.status.observedGeneration,
                    observedIgnore: ext.status.observedIgnore,
                    observedInclude: ext.status.observedInclude,
                    observedRecurseSubmodules: ext.status.observedRecurseSubmodules,
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    patchFluxcdGitRepository: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['ignore'] !== undefined && typeof args['spec']['ignore'] == 'string') spec['ignore'] = args['spec']['ignore'];
        if (args['spec']['include'] !== undefined && Array.isArray(args['spec']['include'])) spec['include'] = args['spec']['include'];
        spec['interval'] = args['spec']['interval'];
        if (args['spec']['recurseSubmodules'] !== undefined && typeof args['spec']['recurseSubmodules'] == 'boolean') spec['recurseSubmodules'] = args['spec']['recurseSubmodules'];
        if (args['spec']['ref'] !== undefined && typeof args['spec']['ref'] == 'object') spec['ref'] = args['spec']['ref'];
        if (args['spec']['secretRef'] !== undefined && typeof args['spec']['secretRef'] == 'object') spec['secretRef'] = args['spec']['secretRef'];
        if (args['spec']['suspend'] !== undefined && typeof args['spec']['suspend'] == 'boolean') spec['suspend'] = args['spec']['suspend'];
        if (args['spec']['timeout'] !== undefined && typeof args['spec']['timeout'] == 'string') spec['timeout'] = args['spec']['timeout'];
        spec['url'] = args['spec']['url'];
        if (args['spec']['verify'] !== undefined && typeof args['spec']['verify'] == 'object') spec['verify'] = args['spec']['verify'];
        const request = {
            apiVersion: 'source.toolkit.fluxcd.io/v1',
            kind: 'GitRepository',
            metadata: {
                namespace: args['namespace'],
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getNamespacedCustomObject('source.toolkit.fluxcd.io','v1',args['namespace'],'gitrepositories', args['name'])
            const extGet = resGet.body as FluxcdGitRepository
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchNamespacedCustomObject('source.toolkit.fluxcd.io','v1',args['namespace'],'gitrepositories', args['name'], payload, undefined, undefined, undefined, options)
            const ext = res.body as FluxcdGitRepository
            return {
                metadata: getMetadata(ext.metadata),
                ignore: ext.spec.ignore,
                include: ext.spec.include,
                interval: ext.spec.interval,
                recurseSubmodules: ext.spec.recurseSubmodules,
                ref: ext.spec.ref,
                secretRef: ext.spec.secretRef,
                suspend: ext.spec.suspend,
                timeout: ext.spec.timeout,
                url: ext.spec.url,
                verify: ext.spec.verify,
                status: ext.status==undefined?null:{
                    artifact: ext.status.artifact,
                    conditions: ext.status.conditions,
                    includedArtifacts: ext.status.includedArtifacts,
                    lastHandledReconcileAt: ext.status.lastHandledReconcileAt,
                    observedGeneration: ext.status.observedGeneration,
                    observedIgnore: ext.status.observedIgnore,
                    observedInclude: ext.status.observedInclude,
                    observedRecurseSubmodules: ext.status.observedRecurseSubmodules,
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    deleteFluxcdGitRepository: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteNamespacedCustomObject('source.toolkit.fluxcd.io','v1',args['namespace'],'gitrepositories', args['name'])
        const ext = res.body as FluxcdGitRepository
        return {
            metadata: getMetadata(ext.metadata),
            ignore: ext.spec.ignore,
            include: ext.spec.include,
            interval: ext.spec.interval,
            recurseSubmodules: ext.spec.recurseSubmodules,
            ref: ext.spec.ref,
            secretRef: ext.spec.secretRef,
            suspend: ext.spec.suspend,
            timeout: ext.spec.timeout,
            url: ext.spec.url,
            verify: ext.spec.verify,
            status: ext.status==undefined?null:{
                artifact: ext.status.artifact,
                conditions: ext.status.conditions,
                includedArtifacts: ext.status.includedArtifacts,
                lastHandledReconcileAt: ext.status.lastHandledReconcileAt,
                observedGeneration: ext.status.observedGeneration,
                observedIgnore: ext.status.observedIgnore,
                observedInclude: ext.status.observedInclude,
                observedRecurseSubmodules: ext.status.observedRecurseSubmodules,
            }
        }
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
},
};
