import {kc, k8s, getMetadata} from '../core/libs.js';
import { RabbitmqRabbitmqCluster } from './type.RabbitmqCluster.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createRabbitmqRabbitmqCluster: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['affinity'] !== undefined && typeof args['spec']['affinity'] == 'object') spec['affinity'] = args['spec']['affinity'];
        if (args['spec']['delayStartSeconds'] !== undefined && typeof args['spec']['delayStartSeconds'] == 'number') spec['delayStartSeconds'] = args['spec']['delayStartSeconds'];
        if (args['spec']['image'] !== undefined && typeof args['spec']['image'] == 'string') spec['image'] = args['spec']['image'];
        if (args['spec']['imagePullSecrets'] !== undefined && Array.isArray(args['spec']['imagePullSecrets'])) spec['imagePullSecrets'] = args['spec']['imagePullSecrets'];
        if (args['spec']['override'] !== undefined && typeof args['spec']['override'] == 'object') spec['override'] = args['spec']['override'];
        if (args['spec']['persistence'] !== undefined && typeof args['spec']['persistence'] == 'object') spec['persistence'] = args['spec']['persistence'];
        if (args['spec']['rabbitmq'] !== undefined && typeof args['spec']['rabbitmq'] == 'object') spec['rabbitmq'] = args['spec']['rabbitmq'];
        if (args['spec']['replicas'] !== undefined && typeof args['spec']['replicas'] == 'number') spec['replicas'] = args['spec']['replicas'];
        if (args['spec']['resources'] !== undefined && typeof args['spec']['resources'] == 'object') spec['resources'] = args['spec']['resources'];
        if (args['spec']['secretBackend'] !== undefined && typeof args['spec']['secretBackend'] == 'object') spec['secretBackend'] = args['spec']['secretBackend'];
        if (args['spec']['service'] !== undefined && typeof args['spec']['service'] == 'object') spec['service'] = args['spec']['service'];
        if (args['spec']['skipPostDeploySteps'] !== undefined && typeof args['spec']['skipPostDeploySteps'] == 'boolean') spec['skipPostDeploySteps'] = args['spec']['skipPostDeploySteps'];
        if (args['spec']['terminationGracePeriodSeconds'] !== undefined && typeof args['spec']['terminationGracePeriodSeconds'] == 'number') spec['terminationGracePeriodSeconds'] = args['spec']['terminationGracePeriodSeconds'];
        if (args['spec']['tls'] !== undefined && typeof args['spec']['tls'] == 'object') spec['tls'] = args['spec']['tls'];
        if (args['spec']['tolerations'] !== undefined && Array.isArray(args['spec']['tolerations'])) spec['tolerations'] = args['spec']['tolerations'];
        const payload = {
            apiVersion: 'rabbitmq.com/v1beta1',
            kind: 'RabbitmqCluster',
            metadata: {
              namespace: args['namespace'],
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createNamespacedCustomObject('rabbitmq.com','v1beta1',args['namespace'],'rabbitmqclusters', payload)
            const ext = res.body as RabbitmqRabbitmqCluster
            return {
                metadata: getMetadata(ext.metadata),
                "affinity": ext.spec['affinity'],
                "delayStartSeconds": ext.spec['delayStartSeconds'],
                "image": ext.spec['image'],
                "imagePullSecrets": ext.spec['imagePullSecrets'],
                "override": ext.spec['override'],
                "persistence": ext.spec['persistence'],
                "rabbitmq": ext.spec['rabbitmq'],
                "replicas": ext.spec['replicas'],
                "resources": ext.spec['resources'],
                "secretBackend": ext.spec['secretBackend'],
                "service": ext.spec['service'],
                "skipPostDeploySteps": ext.spec['skipPostDeploySteps'],
                "terminationGracePeriodSeconds": ext.spec['terminationGracePeriodSeconds'],
                "tls": ext.spec['tls'],
                "tolerations": ext.spec['tolerations'],
                status: ext.status==undefined?null:{
                    "binding": ext.status['binding'],
                    "conditions": ext.status['conditions'],
                    "defaultUser": ext.status['defaultUser'],
                    "observedGeneration": ext.status['observedGeneration'],
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    patchRabbitmqRabbitmqCluster: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['affinity'] !== undefined && typeof args['spec']['affinity'] == 'object') spec['affinity'] = args['spec']['affinity'];
        if (args['spec']['delayStartSeconds'] !== undefined && typeof args['spec']['delayStartSeconds'] == 'number') spec['delayStartSeconds'] = args['spec']['delayStartSeconds'];
        if (args['spec']['image'] !== undefined && typeof args['spec']['image'] == 'string') spec['image'] = args['spec']['image'];
        if (args['spec']['imagePullSecrets'] !== undefined && Array.isArray(args['spec']['imagePullSecrets'])) spec['imagePullSecrets'] = args['spec']['imagePullSecrets'];
        if (args['spec']['override'] !== undefined && typeof args['spec']['override'] == 'object') spec['override'] = args['spec']['override'];
        if (args['spec']['persistence'] !== undefined && typeof args['spec']['persistence'] == 'object') spec['persistence'] = args['spec']['persistence'];
        if (args['spec']['rabbitmq'] !== undefined && typeof args['spec']['rabbitmq'] == 'object') spec['rabbitmq'] = args['spec']['rabbitmq'];
        if (args['spec']['replicas'] !== undefined && typeof args['spec']['replicas'] == 'number') spec['replicas'] = args['spec']['replicas'];
        if (args['spec']['resources'] !== undefined && typeof args['spec']['resources'] == 'object') spec['resources'] = args['spec']['resources'];
        if (args['spec']['secretBackend'] !== undefined && typeof args['spec']['secretBackend'] == 'object') spec['secretBackend'] = args['spec']['secretBackend'];
        if (args['spec']['service'] !== undefined && typeof args['spec']['service'] == 'object') spec['service'] = args['spec']['service'];
        if (args['spec']['skipPostDeploySteps'] !== undefined && typeof args['spec']['skipPostDeploySteps'] == 'boolean') spec['skipPostDeploySteps'] = args['spec']['skipPostDeploySteps'];
        if (args['spec']['terminationGracePeriodSeconds'] !== undefined && typeof args['spec']['terminationGracePeriodSeconds'] == 'number') spec['terminationGracePeriodSeconds'] = args['spec']['terminationGracePeriodSeconds'];
        if (args['spec']['tls'] !== undefined && typeof args['spec']['tls'] == 'object') spec['tls'] = args['spec']['tls'];
        if (args['spec']['tolerations'] !== undefined && Array.isArray(args['spec']['tolerations'])) spec['tolerations'] = args['spec']['tolerations'];
        const request = {
            apiVersion: 'rabbitmq.com/v1beta1',
            kind: 'RabbitmqCluster',
            metadata: {
                namespace: args['namespace'],
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getNamespacedCustomObject('rabbitmq.com','v1beta1',args['namespace'],'rabbitmqclusters', args['name'])
            const extGet = resGet.body as RabbitmqRabbitmqCluster
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchNamespacedCustomObject('rabbitmq.com','v1beta1',args['namespace'],'rabbitmqclusters', args['name'], payload, undefined, undefined, undefined, options)
            const ext = res.body as RabbitmqRabbitmqCluster
            return {
                metadata: getMetadata(ext.metadata),
                "affinity": ext.spec['affinity'],
                "delayStartSeconds": ext.spec['delayStartSeconds'],
                "image": ext.spec['image'],
                "imagePullSecrets": ext.spec['imagePullSecrets'],
                "override": ext.spec['override'],
                "persistence": ext.spec['persistence'],
                "rabbitmq": ext.spec['rabbitmq'],
                "replicas": ext.spec['replicas'],
                "resources": ext.spec['resources'],
                "secretBackend": ext.spec['secretBackend'],
                "service": ext.spec['service'],
                "skipPostDeploySteps": ext.spec['skipPostDeploySteps'],
                "terminationGracePeriodSeconds": ext.spec['terminationGracePeriodSeconds'],
                "tls": ext.spec['tls'],
                "tolerations": ext.spec['tolerations'],
                status: ext.status==undefined?null:{
                    "binding": ext.status['binding'],
                    "conditions": ext.status['conditions'],
                    "defaultUser": ext.status['defaultUser'],
                    "observedGeneration": ext.status['observedGeneration'],
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    deleteRabbitmqRabbitmqCluster: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteNamespacedCustomObject('rabbitmq.com','v1beta1',args['namespace'],'rabbitmqclusters', args['name'])
        const ext = res.body as RabbitmqRabbitmqCluster
        return {
            metadata: getMetadata(ext.metadata),
            "affinity": ext.spec['affinity'],
            "delayStartSeconds": ext.spec['delayStartSeconds'],
            "image": ext.spec['image'],
            "imagePullSecrets": ext.spec['imagePullSecrets'],
            "override": ext.spec['override'],
            "persistence": ext.spec['persistence'],
            "rabbitmq": ext.spec['rabbitmq'],
            "replicas": ext.spec['replicas'],
            "resources": ext.spec['resources'],
            "secretBackend": ext.spec['secretBackend'],
            "service": ext.spec['service'],
            "skipPostDeploySteps": ext.spec['skipPostDeploySteps'],
            "terminationGracePeriodSeconds": ext.spec['terminationGracePeriodSeconds'],
            "tls": ext.spec['tls'],
            "tolerations": ext.spec['tolerations'],
            status: ext.status==undefined?null:{
                "binding": ext.status['binding'],
                "conditions": ext.status['conditions'],
                "defaultUser": ext.status['defaultUser'],
                "observedGeneration": ext.status['observedGeneration'],
            }
        }
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
},
};
