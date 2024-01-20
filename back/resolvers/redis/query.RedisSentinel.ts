import {kc, k8s, getMetadata} from '../core/libs.js';
import { RedisRedisSentinelList, RedisRedisSentinel } from './type.RedisSentinel.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    redisRedisSentinels: async (_parent, args: object) => {
        try {
            const res = await customApi.listNamespacedCustomObject('redis.redis.opstreelabs.in','v1beta1',args['namespace'],'redissentinels')
            const resList = res.body as RedisRedisSentinelList
            return resList.items.map((ext)=>{return{
                metadata: getMetadata(ext.metadata, ext),
                "TLS": ext.spec['TLS'],
                "affinity": ext.spec['affinity'],
                "clusterSize": ext.spec['clusterSize'],
                "kubernetesConfig": ext.spec['kubernetesConfig'],
                "livenessProbe": ext.spec['livenessProbe'],
                "nodeSelector": ext.spec['nodeSelector'],
                "pdb": ext.spec['pdb'],
                "priorityClassName": ext.spec['priorityClassName'],
                "readinessProbe": ext.spec['readinessProbe'],
                "redisSentinelConfig": ext.spec['redisSentinelConfig'],
                "securityContext": ext.spec['securityContext'],
                "serviceAccountName": ext.spec['serviceAccountName'],
                "sidecars": ext.spec['sidecars'],
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
    redisRedisSentinel: async (_parent, args: object) => {
        try {
            const res = await customApi.getNamespacedCustomObject('redis.redis.opstreelabs.in','v1beta1',args['namespace'],'redissentinels', args['name'])
            const ext = res.body as RedisRedisSentinel
            return {
                metadata: getMetadata(ext.metadata, ext),
                "TLS": ext.spec['TLS'],
                "affinity": ext.spec['affinity'],
                "clusterSize": ext.spec['clusterSize'],
                "kubernetesConfig": ext.spec['kubernetesConfig'],
                "livenessProbe": ext.spec['livenessProbe'],
                "nodeSelector": ext.spec['nodeSelector'],
                "pdb": ext.spec['pdb'],
                "priorityClassName": ext.spec['priorityClassName'],
                "readinessProbe": ext.spec['readinessProbe'],
                "redisSentinelConfig": ext.spec['redisSentinelConfig'],
                "securityContext": ext.spec['securityContext'],
                "serviceAccountName": ext.spec['serviceAccountName'],
                "sidecars": ext.spec['sidecars'],
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
