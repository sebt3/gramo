import {kc, k8s, getMetadata} from '../core/libs.js';
import { RedisRedisSentinel } from './type.RedisSentinel.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createRedisRedisSentinel: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['TLS'] !== undefined && typeof args['spec']['TLS'] == 'object') spec['TLS'] = args['spec']['TLS'];
        if (args['spec']['affinity'] !== undefined && typeof args['spec']['affinity'] == 'object') spec['affinity'] = args['spec']['affinity'];
        spec['clusterSize'] = args['spec']['clusterSize'];
        spec['kubernetesConfig'] = args['spec']['kubernetesConfig'];
        if (args['spec']['livenessProbe'] !== undefined && typeof args['spec']['livenessProbe'] == 'object') spec['livenessProbe'] = args['spec']['livenessProbe'];
        if (args['spec']['nodeSelector'] !== undefined && typeof args['spec']['nodeSelector'] == 'object') spec['nodeSelector'] = args['spec']['nodeSelector'];
        if (args['spec']['pdb'] !== undefined && typeof args['spec']['pdb'] == 'object') spec['pdb'] = args['spec']['pdb'];
        if (args['spec']['priorityClassName'] !== undefined && typeof args['spec']['priorityClassName'] == 'string') spec['priorityClassName'] = args['spec']['priorityClassName'];
        if (args['spec']['readinessProbe'] !== undefined && typeof args['spec']['readinessProbe'] == 'object') spec['readinessProbe'] = args['spec']['readinessProbe'];
        if (args['spec']['redisSentinelConfig'] !== undefined && typeof args['spec']['redisSentinelConfig'] == 'object') spec['redisSentinelConfig'] = args['spec']['redisSentinelConfig'];
        if (args['spec']['securityContext'] !== undefined && typeof args['spec']['securityContext'] == 'object') spec['securityContext'] = args['spec']['securityContext'];
        if (args['spec']['serviceAccountName'] !== undefined && typeof args['spec']['serviceAccountName'] == 'string') spec['serviceAccountName'] = args['spec']['serviceAccountName'];
        if (args['spec']['sidecars'] !== undefined && Array.isArray(args['spec']['sidecars'])) spec['sidecars'] = args['spec']['sidecars'];
        if (args['spec']['tolerations'] !== undefined && Array.isArray(args['spec']['tolerations'])) spec['tolerations'] = args['spec']['tolerations'];
        const payload = {
            apiVersion: 'redis.redis.opstreelabs.in/v1beta1',
            kind: 'RedisSentinel',
            metadata: {
              namespace: args['namespace'],
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createNamespacedCustomObject('redis.redis.opstreelabs.in','v1beta1',args['namespace'],'redissentinels', payload)
            const ext = res.body as RedisRedisSentinel
            return {
                metadata: getMetadata(ext.metadata),
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
    patchRedisRedisSentinel: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['TLS'] !== undefined && typeof args['spec']['TLS'] == 'object') spec['TLS'] = args['spec']['TLS'];
        if (args['spec']['affinity'] !== undefined && typeof args['spec']['affinity'] == 'object') spec['affinity'] = args['spec']['affinity'];
        spec['clusterSize'] = args['spec']['clusterSize'];
        spec['kubernetesConfig'] = args['spec']['kubernetesConfig'];
        if (args['spec']['livenessProbe'] !== undefined && typeof args['spec']['livenessProbe'] == 'object') spec['livenessProbe'] = args['spec']['livenessProbe'];
        if (args['spec']['nodeSelector'] !== undefined && typeof args['spec']['nodeSelector'] == 'object') spec['nodeSelector'] = args['spec']['nodeSelector'];
        if (args['spec']['pdb'] !== undefined && typeof args['spec']['pdb'] == 'object') spec['pdb'] = args['spec']['pdb'];
        if (args['spec']['priorityClassName'] !== undefined && typeof args['spec']['priorityClassName'] == 'string') spec['priorityClassName'] = args['spec']['priorityClassName'];
        if (args['spec']['readinessProbe'] !== undefined && typeof args['spec']['readinessProbe'] == 'object') spec['readinessProbe'] = args['spec']['readinessProbe'];
        if (args['spec']['redisSentinelConfig'] !== undefined && typeof args['spec']['redisSentinelConfig'] == 'object') spec['redisSentinelConfig'] = args['spec']['redisSentinelConfig'];
        if (args['spec']['securityContext'] !== undefined && typeof args['spec']['securityContext'] == 'object') spec['securityContext'] = args['spec']['securityContext'];
        if (args['spec']['serviceAccountName'] !== undefined && typeof args['spec']['serviceAccountName'] == 'string') spec['serviceAccountName'] = args['spec']['serviceAccountName'];
        if (args['spec']['sidecars'] !== undefined && Array.isArray(args['spec']['sidecars'])) spec['sidecars'] = args['spec']['sidecars'];
        if (args['spec']['tolerations'] !== undefined && Array.isArray(args['spec']['tolerations'])) spec['tolerations'] = args['spec']['tolerations'];
        const request = {
            apiVersion: 'redis.redis.opstreelabs.in/v1beta1',
            kind: 'RedisSentinel',
            metadata: {
                namespace: args['namespace'],
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getNamespacedCustomObject('redis.redis.opstreelabs.in','v1beta1',args['namespace'],'redissentinels', args['name'])
            const extGet = resGet.body as RedisRedisSentinel
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchNamespacedCustomObject('redis.redis.opstreelabs.in','v1beta1',args['namespace'],'redissentinels', args['name'], payload, undefined, undefined, undefined, options)
            const ext = res.body as RedisRedisSentinel
            return {
                metadata: getMetadata(ext.metadata),
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
    deleteRedisRedisSentinel: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteNamespacedCustomObject('redis.redis.opstreelabs.in','v1beta1',args['namespace'],'redissentinels', args['name'])
        const ext = res.body as RedisRedisSentinel
        return {
            metadata: getMetadata(ext.metadata),
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
