import {kc, k8s, getMetadata} from '../core/libs.js';
import { RedisRedisReplicationList, RedisRedisReplication } from './type.RedisReplication.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    redisRedisReplications: async (_parent, args: object) => {
        try {
            const res = await customApi.listNamespacedCustomObject('redis.redis.opstreelabs.in','v1beta1',args['namespace'],'redisreplications')
            const resList = res.body as RedisRedisReplicationList
            return resList.items.map((ext)=>{return{
                metadata: getMetadata(ext.metadata),
                TLS: ext.spec.TLS,
                affinity: ext.spec.affinity,
                clusterSize: ext.spec.clusterSize,
                kubernetesConfig: ext.spec.kubernetesConfig,
                livenessProbe: ext.spec.livenessProbe,
                nodeSelector: ext.spec.nodeSelector,
                priorityClassName: ext.spec.priorityClassName,
                readinessProbe: ext.spec.readinessProbe,
                redisConfig: ext.spec.redisConfig,
                redisExporter: ext.spec.redisExporter,
                securityContext: ext.spec.securityContext,
                serviceAccountName: ext.spec.serviceAccountName,
                sidecars: ext.spec.sidecars,
                storage: ext.spec.storage,
                tolerations: ext.spec.tolerations,
                status: ext.status==undefined?null:{
                }
            }})
        } catch (err) {
          console.error((err as object)['body']);
        }
        return []
    }
};
export const queries = {
    redisRedisReplication: async (_parent, args: object) => {
        try {
            const res = await customApi.getNamespacedCustomObject('redis.redis.opstreelabs.in','v1beta1',args['namespace'],'redisreplications', args['name'])
            const ext = res.body as RedisRedisReplication
            return {
                metadata: getMetadata(ext.metadata),
                TLS: ext.spec.TLS,
                affinity: ext.spec.affinity,
                clusterSize: ext.spec.clusterSize,
                kubernetesConfig: ext.spec.kubernetesConfig,
                livenessProbe: ext.spec.livenessProbe,
                nodeSelector: ext.spec.nodeSelector,
                priorityClassName: ext.spec.priorityClassName,
                readinessProbe: ext.spec.readinessProbe,
                redisConfig: ext.spec.redisConfig,
                redisExporter: ext.spec.redisExporter,
                securityContext: ext.spec.securityContext,
                serviceAccountName: ext.spec.serviceAccountName,
                sidecars: ext.spec.sidecars,
                storage: ext.spec.storage,
                tolerations: ext.spec.tolerations,
                status: ext.status==undefined?null:{
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
