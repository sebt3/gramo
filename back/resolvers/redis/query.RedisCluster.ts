import {kc, k8s, getMetadata} from '../core/libs.js';
import { RedisRedisClusterList, RedisRedisCluster } from './type.RedisCluster.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    redisRedisClusters: async (_parent, args: object) => {
        try {
            const res = await customApi.listNamespacedCustomObject('redis.redis.opstreelabs.in','v1beta1',args['namespace'],'redisclusters')
            const resList = res.body as RedisRedisClusterList
            return resList.items.map((ext)=>{return{
                metadata: getMetadata(ext.metadata, ext),
                "TLS": ext.spec['TLS'],
                "clusterSize": ext.spec['clusterSize'],
                "clusterVersion": ext.spec['clusterVersion'],
                "kubernetesConfig": ext.spec['kubernetesConfig'],
                "nodeSelector": ext.spec['nodeSelector'],
                "persistenceEnabled": ext.spec['persistenceEnabled'],
                "priorityClassName": ext.spec['priorityClassName'],
                "redisExporter": ext.spec['redisExporter'],
                "redisFollower": ext.spec['redisFollower'],
                "redisLeader": ext.spec['redisLeader'],
                "resources": ext.spec['resources'],
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
    redisRedisCluster: async (_parent, args: object) => {
        try {
            const res = await customApi.getNamespacedCustomObject('redis.redis.opstreelabs.in','v1beta1',args['namespace'],'redisclusters', args['name'])
            const ext = res.body as RedisRedisCluster
            return {
                metadata: getMetadata(ext.metadata, ext),
                "TLS": ext.spec['TLS'],
                "clusterSize": ext.spec['clusterSize'],
                "clusterVersion": ext.spec['clusterVersion'],
                "kubernetesConfig": ext.spec['kubernetesConfig'],
                "nodeSelector": ext.spec['nodeSelector'],
                "persistenceEnabled": ext.spec['persistenceEnabled'],
                "priorityClassName": ext.spec['priorityClassName'],
                "redisExporter": ext.spec['redisExporter'],
                "redisFollower": ext.spec['redisFollower'],
                "redisLeader": ext.spec['redisLeader'],
                "resources": ext.spec['resources'],
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
