import {kc, k8s, getMetadata} from '../core/libs.js';
import { RedisRedisCluster } from './type.RedisCluster.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createRedisRedisCluster: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['TLS'] !== undefined && typeof args['spec']['TLS'] == 'object') spec['TLS'] = args['spec']['TLS'];
        spec['clusterSize'] = args['spec']['clusterSize'];
        if (args['spec']['clusterVersion'] !== undefined && typeof args['spec']['clusterVersion'] == 'string') spec['clusterVersion'] = args['spec']['clusterVersion'];
        spec['kubernetesConfig'] = args['spec']['kubernetesConfig'];
        if (args['spec']['nodeSelector'] !== undefined && typeof args['spec']['nodeSelector'] == 'object') spec['nodeSelector'] = args['spec']['nodeSelector'];
        if (args['spec']['persistenceEnabled'] !== undefined && typeof args['spec']['persistenceEnabled'] == 'boolean') spec['persistenceEnabled'] = args['spec']['persistenceEnabled'];
        if (args['spec']['priorityClassName'] !== undefined && typeof args['spec']['priorityClassName'] == 'string') spec['priorityClassName'] = args['spec']['priorityClassName'];
        if (args['spec']['redisExporter'] !== undefined && typeof args['spec']['redisExporter'] == 'object') spec['redisExporter'] = args['spec']['redisExporter'];
        if (args['spec']['redisFollower'] !== undefined && typeof args['spec']['redisFollower'] == 'object') spec['redisFollower'] = args['spec']['redisFollower'];
        if (args['spec']['redisLeader'] !== undefined && typeof args['spec']['redisLeader'] == 'object') spec['redisLeader'] = args['spec']['redisLeader'];
        if (args['spec']['resources'] !== undefined && typeof args['spec']['resources'] == 'object') spec['resources'] = args['spec']['resources'];
        if (args['spec']['securityContext'] !== undefined && typeof args['spec']['securityContext'] == 'object') spec['securityContext'] = args['spec']['securityContext'];
        if (args['spec']['serviceAccountName'] !== undefined && typeof args['spec']['serviceAccountName'] == 'string') spec['serviceAccountName'] = args['spec']['serviceAccountName'];
        if (args['spec']['sidecars'] !== undefined && Array.isArray(args['spec']['sidecars'])) spec['sidecars'] = args['spec']['sidecars'];
        if (args['spec']['storage'] !== undefined && typeof args['spec']['storage'] == 'object') spec['storage'] = args['spec']['storage'];
        if (args['spec']['tolerations'] !== undefined && Array.isArray(args['spec']['tolerations'])) spec['tolerations'] = args['spec']['tolerations'];
        const payload = {
            apiVersion: 'redis.redis.opstreelabs.in/v1beta1',
            kind: 'RedisCluster',
            metadata: {
              namespace: args['namespace'],
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createNamespacedCustomObject('redis.redis.opstreelabs.in','v1beta1',args['namespace'],'redisclusters', payload)
            const ext = res.body as RedisRedisCluster
            return {
                metadata: getMetadata(ext.metadata),
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
    patchRedisRedisCluster: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['TLS'] !== undefined && typeof args['spec']['TLS'] == 'object') spec['TLS'] = args['spec']['TLS'];
        spec['clusterSize'] = args['spec']['clusterSize'];
        if (args['spec']['clusterVersion'] !== undefined && typeof args['spec']['clusterVersion'] == 'string') spec['clusterVersion'] = args['spec']['clusterVersion'];
        spec['kubernetesConfig'] = args['spec']['kubernetesConfig'];
        if (args['spec']['nodeSelector'] !== undefined && typeof args['spec']['nodeSelector'] == 'object') spec['nodeSelector'] = args['spec']['nodeSelector'];
        if (args['spec']['persistenceEnabled'] !== undefined && typeof args['spec']['persistenceEnabled'] == 'boolean') spec['persistenceEnabled'] = args['spec']['persistenceEnabled'];
        if (args['spec']['priorityClassName'] !== undefined && typeof args['spec']['priorityClassName'] == 'string') spec['priorityClassName'] = args['spec']['priorityClassName'];
        if (args['spec']['redisExporter'] !== undefined && typeof args['spec']['redisExporter'] == 'object') spec['redisExporter'] = args['spec']['redisExporter'];
        if (args['spec']['redisFollower'] !== undefined && typeof args['spec']['redisFollower'] == 'object') spec['redisFollower'] = args['spec']['redisFollower'];
        if (args['spec']['redisLeader'] !== undefined && typeof args['spec']['redisLeader'] == 'object') spec['redisLeader'] = args['spec']['redisLeader'];
        if (args['spec']['resources'] !== undefined && typeof args['spec']['resources'] == 'object') spec['resources'] = args['spec']['resources'];
        if (args['spec']['securityContext'] !== undefined && typeof args['spec']['securityContext'] == 'object') spec['securityContext'] = args['spec']['securityContext'];
        if (args['spec']['serviceAccountName'] !== undefined && typeof args['spec']['serviceAccountName'] == 'string') spec['serviceAccountName'] = args['spec']['serviceAccountName'];
        if (args['spec']['sidecars'] !== undefined && Array.isArray(args['spec']['sidecars'])) spec['sidecars'] = args['spec']['sidecars'];
        if (args['spec']['storage'] !== undefined && typeof args['spec']['storage'] == 'object') spec['storage'] = args['spec']['storage'];
        if (args['spec']['tolerations'] !== undefined && Array.isArray(args['spec']['tolerations'])) spec['tolerations'] = args['spec']['tolerations'];
        const request = {
            apiVersion: 'redis.redis.opstreelabs.in/v1beta1',
            kind: 'RedisCluster',
            metadata: {
                namespace: args['namespace'],
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getNamespacedCustomObject('redis.redis.opstreelabs.in','v1beta1',args['namespace'],'redisclusters', args['name'])
            const extGet = resGet.body as RedisRedisCluster
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchNamespacedCustomObject('redis.redis.opstreelabs.in','v1beta1',args['namespace'],'redisclusters', args['name'], payload, undefined, undefined, undefined, options)
            const ext = res.body as RedisRedisCluster
            return {
                metadata: getMetadata(ext.metadata),
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
    deleteRedisRedisCluster: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteNamespacedCustomObject('redis.redis.opstreelabs.in','v1beta1',args['namespace'],'redisclusters', args['name'])
        const ext = res.body as RedisRedisCluster
        return {
            metadata: getMetadata(ext.metadata),
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
