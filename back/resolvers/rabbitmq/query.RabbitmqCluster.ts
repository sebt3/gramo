import {kc, k8s, getMetadata} from '../core/libs.js';
import { RabbitmqRabbitmqClusterList, RabbitmqRabbitmqCluster } from './type.RabbitmqCluster.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    rabbitmqRabbitmqClusters: async (_parent, args: object) => {
        try {
            const res = await customApi.listNamespacedCustomObject('rabbitmq.com','v1beta1',args['namespace'],'rabbitmqclusters')
            const resList = res.body as RabbitmqRabbitmqClusterList
            return resList.items.map((ext)=>{return{
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
            }})
        } catch (err) {
          console.error((err as object)['body']);
        }
        return []
    }
};
export const queries = {
    rabbitmqRabbitmqCluster: async (_parent, args: object) => {
        try {
            const res = await customApi.getNamespacedCustomObject('rabbitmq.com','v1beta1',args['namespace'],'rabbitmqclusters', args['name'])
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
