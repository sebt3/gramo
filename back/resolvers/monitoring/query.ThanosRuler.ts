import {kc, k8s, getMetadata} from '../core/libs.js';
import { MonitoringThanosRulerList, MonitoringThanosRuler } from './type.ThanosRuler.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    monitoringThanosRulers: async (_parent, args: object) => {
        try {
            const res = await customApi.listNamespacedCustomObject('monitoring.coreos.com','v1',args['namespace'],'thanosrulers')
            const resList = res.body as MonitoringThanosRulerList
            return resList.items.map((ext)=>{return{
                metadata: getMetadata(ext.metadata),
                "additionalArgs": ext.spec['additionalArgs'],
                "affinity": ext.spec['affinity'],
                "alertDropLabels": ext.spec['alertDropLabels'],
                "alertQueryUrl": ext.spec['alertQueryUrl'],
                "alertRelabelConfigFile": ext.spec['alertRelabelConfigFile'],
                "alertRelabelConfigs": ext.spec['alertRelabelConfigs'],
                "alertmanagersConfig": ext.spec['alertmanagersConfig'],
                "alertmanagersUrl": ext.spec['alertmanagersUrl'],
                "containers": ext.spec['containers'],
                "enforcedNamespaceLabel": ext.spec['enforcedNamespaceLabel'],
                "evaluationInterval": ext.spec['evaluationInterval'],
                "excludedFromEnforcement": ext.spec['excludedFromEnforcement'],
                "externalPrefix": ext.spec['externalPrefix'],
                "grpcServerTlsConfig": ext.spec['grpcServerTlsConfig'],
                "hostAliases": ext.spec['hostAliases'],
                "image": ext.spec['image'],
                "imagePullPolicy": ext.spec['imagePullPolicy'],
                "imagePullSecrets": ext.spec['imagePullSecrets'],
                "initContainers": ext.spec['initContainers'],
                "labels": ext.spec['labels'],
                "listenLocal": ext.spec['listenLocal'],
                "logFormat": ext.spec['logFormat'],
                "logLevel": ext.spec['logLevel'],
                "minReadySeconds": ext.spec['minReadySeconds'],
                "nodeSelector": ext.spec['nodeSelector'],
                "objectStorageConfig": ext.spec['objectStorageConfig'],
                "objectStorageConfigFile": ext.spec['objectStorageConfigFile'],
                "paused": ext.spec['paused'],
                "podMetadata": ext.spec['podMetadata'],
                "portName": ext.spec['portName'],
                "priorityClassName": ext.spec['priorityClassName'],
                "prometheusRulesExcludedFromEnforce": ext.spec['prometheusRulesExcludedFromEnforce'],
                "queryConfig": ext.spec['queryConfig'],
                "queryEndpoints": ext.spec['queryEndpoints'],
                "replicas": ext.spec['replicas'],
                "resources": ext.spec['resources'],
                "retention": ext.spec['retention'],
                "routePrefix": ext.spec['routePrefix'],
                "ruleNamespaceSelector": ext.spec['ruleNamespaceSelector'],
                "ruleSelector": ext.spec['ruleSelector'],
                "securityContext": ext.spec['securityContext'],
                "serviceAccountName": ext.spec['serviceAccountName'],
                "storage": ext.spec['storage'],
                "tolerations": ext.spec['tolerations'],
                "topologySpreadConstraints": ext.spec['topologySpreadConstraints'],
                "tracingConfig": ext.spec['tracingConfig'],
                "tracingConfigFile": ext.spec['tracingConfigFile'],
                "version": ext.spec['version'],
                "volumes": ext.spec['volumes'],
                status: ext.status==undefined?null:{
                    "availableReplicas": ext.status['availableReplicas'],
                    "conditions": ext.status['conditions'],
                    "paused": ext.status['paused'],
                    "replicas": ext.status['replicas'],
                    "unavailableReplicas": ext.status['unavailableReplicas'],
                    "updatedReplicas": ext.status['updatedReplicas'],
                }
            }})
        } catch (err) {
          console.error((err as object)['body']);
        }
        return []
    }
};
export const queries = {
    monitoringThanosRuler: async (_parent, args: object) => {
        try {
            const res = await customApi.getNamespacedCustomObject('monitoring.coreos.com','v1',args['namespace'],'thanosrulers', args['name'])
            const ext = res.body as MonitoringThanosRuler
            return {
                metadata: getMetadata(ext.metadata),
                "additionalArgs": ext.spec['additionalArgs'],
                "affinity": ext.spec['affinity'],
                "alertDropLabels": ext.spec['alertDropLabels'],
                "alertQueryUrl": ext.spec['alertQueryUrl'],
                "alertRelabelConfigFile": ext.spec['alertRelabelConfigFile'],
                "alertRelabelConfigs": ext.spec['alertRelabelConfigs'],
                "alertmanagersConfig": ext.spec['alertmanagersConfig'],
                "alertmanagersUrl": ext.spec['alertmanagersUrl'],
                "containers": ext.spec['containers'],
                "enforcedNamespaceLabel": ext.spec['enforcedNamespaceLabel'],
                "evaluationInterval": ext.spec['evaluationInterval'],
                "excludedFromEnforcement": ext.spec['excludedFromEnforcement'],
                "externalPrefix": ext.spec['externalPrefix'],
                "grpcServerTlsConfig": ext.spec['grpcServerTlsConfig'],
                "hostAliases": ext.spec['hostAliases'],
                "image": ext.spec['image'],
                "imagePullPolicy": ext.spec['imagePullPolicy'],
                "imagePullSecrets": ext.spec['imagePullSecrets'],
                "initContainers": ext.spec['initContainers'],
                "labels": ext.spec['labels'],
                "listenLocal": ext.spec['listenLocal'],
                "logFormat": ext.spec['logFormat'],
                "logLevel": ext.spec['logLevel'],
                "minReadySeconds": ext.spec['minReadySeconds'],
                "nodeSelector": ext.spec['nodeSelector'],
                "objectStorageConfig": ext.spec['objectStorageConfig'],
                "objectStorageConfigFile": ext.spec['objectStorageConfigFile'],
                "paused": ext.spec['paused'],
                "podMetadata": ext.spec['podMetadata'],
                "portName": ext.spec['portName'],
                "priorityClassName": ext.spec['priorityClassName'],
                "prometheusRulesExcludedFromEnforce": ext.spec['prometheusRulesExcludedFromEnforce'],
                "queryConfig": ext.spec['queryConfig'],
                "queryEndpoints": ext.spec['queryEndpoints'],
                "replicas": ext.spec['replicas'],
                "resources": ext.spec['resources'],
                "retention": ext.spec['retention'],
                "routePrefix": ext.spec['routePrefix'],
                "ruleNamespaceSelector": ext.spec['ruleNamespaceSelector'],
                "ruleSelector": ext.spec['ruleSelector'],
                "securityContext": ext.spec['securityContext'],
                "serviceAccountName": ext.spec['serviceAccountName'],
                "storage": ext.spec['storage'],
                "tolerations": ext.spec['tolerations'],
                "topologySpreadConstraints": ext.spec['topologySpreadConstraints'],
                "tracingConfig": ext.spec['tracingConfig'],
                "tracingConfigFile": ext.spec['tracingConfigFile'],
                "version": ext.spec['version'],
                "volumes": ext.spec['volumes'],
                status: ext.status==undefined?null:{
                    "availableReplicas": ext.status['availableReplicas'],
                    "conditions": ext.status['conditions'],
                    "paused": ext.status['paused'],
                    "replicas": ext.status['replicas'],
                    "unavailableReplicas": ext.status['unavailableReplicas'],
                    "updatedReplicas": ext.status['updatedReplicas'],
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
