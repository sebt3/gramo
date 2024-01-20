import {kc, k8s, getMetadata} from '../core/libs.js';
import { RedisRedisList, RedisRedis } from './type.Redis.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    redisRediss: async (_parent, args: object) => {
        try {
            const res = await customApi.listNamespacedCustomObject('redis.redis.opstreelabs.in','v1beta1',args['namespace'],'redis')
            const resList = res.body as RedisRedisList
            return resList.items.map((ext)=>{return{
                metadata: getMetadata(ext.metadata, ext),
                "TLS": ext.spec['TLS'],
                "affinity": ext.spec['affinity'],
                "kubernetesConfig": ext.spec['kubernetesConfig'],
                "livenessProbe": ext.spec['livenessProbe'],
                "nodeSelector": ext.spec['nodeSelector'],
                "priorityClassName": ext.spec['priorityClassName'],
                "readinessProbe": ext.spec['readinessProbe'],
                "redisConfig": ext.spec['redisConfig'],
                "redisExporter": ext.spec['redisExporter'],
                "securityContext": ext.spec['securityContext'],
                "serviceAccountName": ext.spec['serviceAccountName'],
                "sidecars": ext.spec['sidecars'],
                "storage": ext.spec['storage'],
                "tolerations": ext.spec['tolerations'],
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
    redisRedis: async (_parent, args: object) => {
        try {
            const res = await customApi.getNamespacedCustomObject('redis.redis.opstreelabs.in','v1beta1',args['namespace'],'redis', args['name'])
            const ext = res.body as RedisRedis
            return {
                metadata: getMetadata(ext.metadata, ext),
                "TLS": ext.spec['TLS'],
                "affinity": ext.spec['affinity'],
                "kubernetesConfig": ext.spec['kubernetesConfig'],
                "livenessProbe": ext.spec['livenessProbe'],
                "nodeSelector": ext.spec['nodeSelector'],
                "priorityClassName": ext.spec['priorityClassName'],
                "readinessProbe": ext.spec['readinessProbe'],
                "redisConfig": ext.spec['redisConfig'],
                "redisExporter": ext.spec['redisExporter'],
                "securityContext": ext.spec['securityContext'],
                "serviceAccountName": ext.spec['serviceAccountName'],
                "sidecars": ext.spec['sidecars'],
                "storage": ext.spec['storage'],
                "tolerations": ext.spec['tolerations'],
                status: ext.status==undefined?null:{
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
