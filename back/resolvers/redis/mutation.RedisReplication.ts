import {kc, k8s, getMetadata} from '../core/libs.js';
import { RedisRedisReplication } from './type.RedisReplication.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createRedisRedisReplication: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['TLS'] !== undefined && typeof args['spec']['TLS'] == 'object') spec['TLS'] = args['spec']['TLS'];
        if (args['spec']['affinity'] !== undefined && typeof args['spec']['affinity'] == 'object') spec['affinity'] = args['spec']['affinity'];
        spec['clusterSize'] = args['spec']['clusterSize'];
        spec['kubernetesConfig'] = args['spec']['kubernetesConfig'];
        if (args['spec']['livenessProbe'] !== undefined && typeof args['spec']['livenessProbe'] == 'object') spec['livenessProbe'] = args['spec']['livenessProbe'];
        if (args['spec']['nodeSelector'] !== undefined && typeof args['spec']['nodeSelector'] == 'object') spec['nodeSelector'] = args['spec']['nodeSelector'];
        if (args['spec']['priorityClassName'] !== undefined && typeof args['spec']['priorityClassName'] == 'string') spec['priorityClassName'] = args['spec']['priorityClassName'];
        if (args['spec']['readinessProbe'] !== undefined && typeof args['spec']['readinessProbe'] == 'object') spec['readinessProbe'] = args['spec']['readinessProbe'];
        if (args['spec']['redisConfig'] !== undefined && typeof args['spec']['redisConfig'] == 'object') spec['redisConfig'] = args['spec']['redisConfig'];
        if (args['spec']['redisExporter'] !== undefined && typeof args['spec']['redisExporter'] == 'object') spec['redisExporter'] = args['spec']['redisExporter'];
        if (args['spec']['securityContext'] !== undefined && typeof args['spec']['securityContext'] == 'object') spec['securityContext'] = args['spec']['securityContext'];
        if (args['spec']['serviceAccountName'] !== undefined && typeof args['spec']['serviceAccountName'] == 'string') spec['serviceAccountName'] = args['spec']['serviceAccountName'];
        if (args['spec']['sidecars'] !== undefined && Array.isArray(args['spec']['sidecars'])) spec['sidecars'] = args['spec']['sidecars'];
        if (args['spec']['storage'] !== undefined && typeof args['spec']['storage'] == 'object') spec['storage'] = args['spec']['storage'];
        if (args['spec']['tolerations'] !== undefined && Array.isArray(args['spec']['tolerations'])) spec['tolerations'] = args['spec']['tolerations'];
        const payload = {
            apiVersion: 'redis.redis.opstreelabs.in/v1beta1',
            kind: 'RedisReplication',
            metadata: {
              namespace: args['namespace'],
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createNamespacedCustomObject('redis.redis.opstreelabs.in','v1beta1',args['namespace'],'redisreplications', payload)
            const ext = res.body as RedisRedisReplication
            return {
                metadata: getMetadata(ext.metadata, ext),
                "TLS": ext.spec['TLS'],
                "affinity": ext.spec['affinity'],
                "clusterSize": ext.spec['clusterSize'],
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
    patchRedisRedisReplication: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['TLS'] !== undefined && typeof args['spec']['TLS'] == 'object') spec['TLS'] = args['spec']['TLS'];
        if (args['spec']['affinity'] !== undefined && typeof args['spec']['affinity'] == 'object') spec['affinity'] = args['spec']['affinity'];
        spec['clusterSize'] = args['spec']['clusterSize'];
        spec['kubernetesConfig'] = args['spec']['kubernetesConfig'];
        if (args['spec']['livenessProbe'] !== undefined && typeof args['spec']['livenessProbe'] == 'object') spec['livenessProbe'] = args['spec']['livenessProbe'];
        if (args['spec']['nodeSelector'] !== undefined && typeof args['spec']['nodeSelector'] == 'object') spec['nodeSelector'] = args['spec']['nodeSelector'];
        if (args['spec']['priorityClassName'] !== undefined && typeof args['spec']['priorityClassName'] == 'string') spec['priorityClassName'] = args['spec']['priorityClassName'];
        if (args['spec']['readinessProbe'] !== undefined && typeof args['spec']['readinessProbe'] == 'object') spec['readinessProbe'] = args['spec']['readinessProbe'];
        if (args['spec']['redisConfig'] !== undefined && typeof args['spec']['redisConfig'] == 'object') spec['redisConfig'] = args['spec']['redisConfig'];
        if (args['spec']['redisExporter'] !== undefined && typeof args['spec']['redisExporter'] == 'object') spec['redisExporter'] = args['spec']['redisExporter'];
        if (args['spec']['securityContext'] !== undefined && typeof args['spec']['securityContext'] == 'object') spec['securityContext'] = args['spec']['securityContext'];
        if (args['spec']['serviceAccountName'] !== undefined && typeof args['spec']['serviceAccountName'] == 'string') spec['serviceAccountName'] = args['spec']['serviceAccountName'];
        if (args['spec']['sidecars'] !== undefined && Array.isArray(args['spec']['sidecars'])) spec['sidecars'] = args['spec']['sidecars'];
        if (args['spec']['storage'] !== undefined && typeof args['spec']['storage'] == 'object') spec['storage'] = args['spec']['storage'];
        if (args['spec']['tolerations'] !== undefined && Array.isArray(args['spec']['tolerations'])) spec['tolerations'] = args['spec']['tolerations'];
        const request = {
            apiVersion: 'redis.redis.opstreelabs.in/v1beta1',
            kind: 'RedisReplication',
            metadata: {
                namespace: args['namespace'],
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getNamespacedCustomObject('redis.redis.opstreelabs.in','v1beta1',args['namespace'],'redisreplications', args['name'])
            const extGet = resGet.body as RedisRedisReplication
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchNamespacedCustomObject('redis.redis.opstreelabs.in','v1beta1',args['namespace'],'redisreplications', args['name'], payload, undefined, undefined, undefined, options)
            const ext = res.body as RedisRedisReplication
            return {
                metadata: getMetadata(ext.metadata, ext),
                "TLS": ext.spec['TLS'],
                "affinity": ext.spec['affinity'],
                "clusterSize": ext.spec['clusterSize'],
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
    deleteRedisRedisReplication: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteNamespacedCustomObject('redis.redis.opstreelabs.in','v1beta1',args['namespace'],'redisreplications', args['name'])
        const ext = res.body as RedisRedisReplication
        return {
            metadata: getMetadata(ext.metadata, ext),
            "TLS": ext.spec['TLS'],
            "affinity": ext.spec['affinity'],
            "clusterSize": ext.spec['clusterSize'],
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
