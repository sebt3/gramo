import {kc, k8s, getMetadata} from '../core/libs.js';
import { FluxcdBucket } from './type.Bucket.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createFluxcdBucket: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['accessFrom'] !== undefined && typeof args['spec']['accessFrom'] == 'object') spec['accessFrom'] = args['spec']['accessFrom'];
        spec['bucketName'] = args['spec']['bucketName'];
        spec['endpoint'] = args['spec']['endpoint'];
        if (args['spec']['ignore'] !== undefined && typeof args['spec']['ignore'] == 'string') spec['ignore'] = args['spec']['ignore'];
        if (args['spec']['insecure'] !== undefined && typeof args['spec']['insecure'] == 'boolean') spec['insecure'] = args['spec']['insecure'];
        spec['interval'] = args['spec']['interval'];
        if (args['spec']['provider'] !== undefined && typeof args['spec']['provider'] == 'string') spec['provider'] = args['spec']['provider'];
        if (args['spec']['region'] !== undefined && typeof args['spec']['region'] == 'string') spec['region'] = args['spec']['region'];
        if (args['spec']['secretRef'] !== undefined && typeof args['spec']['secretRef'] == 'object') spec['secretRef'] = args['spec']['secretRef'];
        if (args['spec']['suspend'] !== undefined && typeof args['spec']['suspend'] == 'boolean') spec['suspend'] = args['spec']['suspend'];
        if (args['spec']['timeout'] !== undefined && typeof args['spec']['timeout'] == 'string') spec['timeout'] = args['spec']['timeout'];
        const payload = {
            apiVersion: 'source.toolkit.fluxcd.io/v1beta2',
            kind: 'Bucket',
            metadata: {
              namespace: args['namespace'],
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createNamespacedCustomObject('source.toolkit.fluxcd.io','v1beta2',args['namespace'],'buckets', payload)
            const ext = res.body as FluxcdBucket
            return {
                metadata: getMetadata(ext.metadata),
                accessFrom: ext.spec.accessFrom,
                bucketName: ext.spec.bucketName,
                endpoint: ext.spec.endpoint,
                ignore: ext.spec.ignore,
                insecure: ext.spec.insecure,
                interval: ext.spec.interval,
                provider: ext.spec.provider,
                region: ext.spec.region,
                secretRef: ext.spec.secretRef,
                suspend: ext.spec.suspend,
                timeout: ext.spec.timeout,
                status: ext.status==undefined?null:{
                    artifact: ext.status.artifact,
                    conditions: ext.status.conditions,
                    lastHandledReconcileAt: ext.status.lastHandledReconcileAt,
                    observedGeneration: ext.status.observedGeneration,
                    observedIgnore: ext.status.observedIgnore,
                    url: ext.status.url,
                }
            }
        } catch (err) {
            console.error(err);
        }
        return null
    },
    patchFluxcdBucket: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['accessFrom'] !== undefined && typeof args['spec']['accessFrom'] == 'object') spec['accessFrom'] = args['spec']['accessFrom'];
        spec['bucketName'] = args['spec']['bucketName'];
        spec['endpoint'] = args['spec']['endpoint'];
        if (args['spec']['ignore'] !== undefined && typeof args['spec']['ignore'] == 'string') spec['ignore'] = args['spec']['ignore'];
        if (args['spec']['insecure'] !== undefined && typeof args['spec']['insecure'] == 'boolean') spec['insecure'] = args['spec']['insecure'];
        spec['interval'] = args['spec']['interval'];
        if (args['spec']['provider'] !== undefined && typeof args['spec']['provider'] == 'string') spec['provider'] = args['spec']['provider'];
        if (args['spec']['region'] !== undefined && typeof args['spec']['region'] == 'string') spec['region'] = args['spec']['region'];
        if (args['spec']['secretRef'] !== undefined && typeof args['spec']['secretRef'] == 'object') spec['secretRef'] = args['spec']['secretRef'];
        if (args['spec']['suspend'] !== undefined && typeof args['spec']['suspend'] == 'boolean') spec['suspend'] = args['spec']['suspend'];
        if (args['spec']['timeout'] !== undefined && typeof args['spec']['timeout'] == 'string') spec['timeout'] = args['spec']['timeout'];
        const request = {
            apiVersion: 'source.toolkit.fluxcd.io/v1beta2',
            kind: 'Distrib',
            metadata: {
                namespace: args['namespace'],
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getNamespacedCustomObject('source.toolkit.fluxcd.io','v1beta2',args['namespace'],'buckets', args['name'])
            const extGet = resGet.body as FluxcdBucket
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchNamespacedCustomObject('source.toolkit.fluxcd.io','v1beta2',args['namespace'],'buckets', args['name'], payload, undefined, undefined, undefined, options)
            const ext = res.body as FluxcdBucket
            return {
                metadata: getMetadata(ext.metadata),
                accessFrom: ext.spec.accessFrom,
                bucketName: ext.spec.bucketName,
                endpoint: ext.spec.endpoint,
                ignore: ext.spec.ignore,
                insecure: ext.spec.insecure,
                interval: ext.spec.interval,
                provider: ext.spec.provider,
                region: ext.spec.region,
                secretRef: ext.spec.secretRef,
                suspend: ext.spec.suspend,
                timeout: ext.spec.timeout,
                status: ext.status==undefined?null:{
                    artifact: ext.status.artifact,
                    conditions: ext.status.conditions,
                    lastHandledReconcileAt: ext.status.lastHandledReconcileAt,
                    observedGeneration: ext.status.observedGeneration,
                    observedIgnore: ext.status.observedIgnore,
                    url: ext.status.url,
                }
            }
        } catch (err) {
            console.error(err);
        }
        return null
    },
    deleteFluxcdBucket: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteNamespacedCustomObject('source.toolkit.fluxcd.io','v1beta2',args['namespace'],'buckets', args['name'])
        const ext = res.body as FluxcdBucket
        return {
            metadata: getMetadata(ext.metadata),
            accessFrom: ext.spec.accessFrom,
            bucketName: ext.spec.bucketName,
            endpoint: ext.spec.endpoint,
            ignore: ext.spec.ignore,
            insecure: ext.spec.insecure,
            interval: ext.spec.interval,
            provider: ext.spec.provider,
            region: ext.spec.region,
            secretRef: ext.spec.secretRef,
            suspend: ext.spec.suspend,
            timeout: ext.spec.timeout,
            status: ext.status==undefined?null:{
                artifact: ext.status.artifact,
                conditions: ext.status.conditions,
                lastHandledReconcileAt: ext.status.lastHandledReconcileAt,
                observedGeneration: ext.status.observedGeneration,
                observedIgnore: ext.status.observedIgnore,
                url: ext.status.url,
            }
        }
    } catch (err) {
        console.error(err);
    }
    return null
},
};
