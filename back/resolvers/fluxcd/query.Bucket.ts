import {kc, k8s, getMetadata} from '../core/libs.js';
import { FluxcdBucketList, FluxcdBucket } from './type.Bucket.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const queries = {
    fluxcdBuckets: async (_parent, args: object) => {
        try {
            const res = await customApi.listNamespacedCustomObject('source.toolkit.fluxcd.io','v1beta2',args['namespace'],'buckets')
            const resList = res.body as FluxcdBucketList
            return resList.items.map((ext)=>{return{
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
            }})
        } catch (err) {
          console.error(err);
        }
        return []
    },
    fluxcdBucket: async (_parent, args: object) => {
        try {
            const res = await customApi.getNamespacedCustomObject('source.toolkit.fluxcd.io','v1beta2',args['namespace'],'buckets', args['name'])
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
