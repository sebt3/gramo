import {kc, k8s, getMetadata} from '../core/libs.js';
import { MonitoringAlertmanagerList, MonitoringAlertmanager } from './type.Alertmanager.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    monitoringAlertmanagers: async (_parent, args: object) => {
        try {
            const res = await customApi.listNamespacedCustomObject('monitoring.coreos.com','v1',args['namespace'],'alertmanagers')
            const resList = res.body as MonitoringAlertmanagerList
            return resList.items.map((ext)=>{return{
                metadata: getMetadata(ext.metadata),
                additionalPeers: ext.spec.additionalPeers,
                affinity: ext.spec.affinity,
                alertmanagerConfigMatcherStrategy: ext.spec.alertmanagerConfigMatcherStrategy,
                alertmanagerConfigNamespaceSelector: ext.spec.alertmanagerConfigNamespaceSelector,
                alertmanagerConfigSelector: ext.spec.alertmanagerConfigSelector,
                alertmanagerConfiguration: ext.spec.alertmanagerConfiguration,
                baseImage: ext.spec.baseImage,
                clusterAdvertiseAddress: ext.spec.clusterAdvertiseAddress,
                clusterGossipInterval: ext.spec.clusterGossipInterval,
                clusterPeerTimeout: ext.spec.clusterPeerTimeout,
                clusterPushpullInterval: ext.spec.clusterPushpullInterval,
                configMaps: ext.spec.configMaps,
                configSecret: ext.spec.configSecret,
                containers: ext.spec.containers,
                externalUrl: ext.spec.externalUrl,
                forceEnableClusterMode: ext.spec.forceEnableClusterMode,
                hostAliases: ext.spec.hostAliases,
                image: ext.spec.image,
                imagePullPolicy: ext.spec.imagePullPolicy,
                imagePullSecrets: ext.spec.imagePullSecrets,
                initContainers: ext.spec.initContainers,
                listenLocal: ext.spec.listenLocal,
                logFormat: ext.spec.logFormat,
                logLevel: ext.spec.logLevel,
                minReadySeconds: ext.spec.minReadySeconds,
                nodeSelector: ext.spec.nodeSelector,
                paused: ext.spec.paused,
                podMetadata: ext.spec.podMetadata,
                portName: ext.spec.portName,
                priorityClassName: ext.spec.priorityClassName,
                replicas: ext.spec.replicas,
                resources: ext.spec.resources,
                retention: ext.spec.retention,
                routePrefix: ext.spec.routePrefix,
                secrets: ext.spec.secrets,
                securityContext: ext.spec.securityContext,
                serviceAccountName: ext.spec.serviceAccountName,
                sha: ext.spec.sha,
                storage: ext.spec.storage,
                tag: ext.spec.tag,
                tolerations: ext.spec.tolerations,
                topologySpreadConstraints: ext.spec.topologySpreadConstraints,
                version: ext.spec.version,
                volumeMounts: ext.spec.volumeMounts,
                volumes: ext.spec.volumes,
                web: ext.spec.web,
                status: ext.status==undefined?null:{
                    availableReplicas: ext.status.availableReplicas,
                    conditions: ext.status.conditions,
                    paused: ext.status.paused,
                    replicas: ext.status.replicas,
                    unavailableReplicas: ext.status.unavailableReplicas,
                    updatedReplicas: ext.status.updatedReplicas,
                }
            }})
        } catch (err) {
          console.error((err as object)['body']);
        }
        return []
    }
};
export const queries = {
    monitoringAlertmanager: async (_parent, args: object) => {
        try {
            const res = await customApi.getNamespacedCustomObject('monitoring.coreos.com','v1',args['namespace'],'alertmanagers', args['name'])
            const ext = res.body as MonitoringAlertmanager
            return {
                metadata: getMetadata(ext.metadata),
                additionalPeers: ext.spec.additionalPeers,
                affinity: ext.spec.affinity,
                alertmanagerConfigMatcherStrategy: ext.spec.alertmanagerConfigMatcherStrategy,
                alertmanagerConfigNamespaceSelector: ext.spec.alertmanagerConfigNamespaceSelector,
                alertmanagerConfigSelector: ext.spec.alertmanagerConfigSelector,
                alertmanagerConfiguration: ext.spec.alertmanagerConfiguration,
                baseImage: ext.spec.baseImage,
                clusterAdvertiseAddress: ext.spec.clusterAdvertiseAddress,
                clusterGossipInterval: ext.spec.clusterGossipInterval,
                clusterPeerTimeout: ext.spec.clusterPeerTimeout,
                clusterPushpullInterval: ext.spec.clusterPushpullInterval,
                configMaps: ext.spec.configMaps,
                configSecret: ext.spec.configSecret,
                containers: ext.spec.containers,
                externalUrl: ext.spec.externalUrl,
                forceEnableClusterMode: ext.spec.forceEnableClusterMode,
                hostAliases: ext.spec.hostAliases,
                image: ext.spec.image,
                imagePullPolicy: ext.spec.imagePullPolicy,
                imagePullSecrets: ext.spec.imagePullSecrets,
                initContainers: ext.spec.initContainers,
                listenLocal: ext.spec.listenLocal,
                logFormat: ext.spec.logFormat,
                logLevel: ext.spec.logLevel,
                minReadySeconds: ext.spec.minReadySeconds,
                nodeSelector: ext.spec.nodeSelector,
                paused: ext.spec.paused,
                podMetadata: ext.spec.podMetadata,
                portName: ext.spec.portName,
                priorityClassName: ext.spec.priorityClassName,
                replicas: ext.spec.replicas,
                resources: ext.spec.resources,
                retention: ext.spec.retention,
                routePrefix: ext.spec.routePrefix,
                secrets: ext.spec.secrets,
                securityContext: ext.spec.securityContext,
                serviceAccountName: ext.spec.serviceAccountName,
                sha: ext.spec.sha,
                storage: ext.spec.storage,
                tag: ext.spec.tag,
                tolerations: ext.spec.tolerations,
                topologySpreadConstraints: ext.spec.topologySpreadConstraints,
                version: ext.spec.version,
                volumeMounts: ext.spec.volumeMounts,
                volumes: ext.spec.volumes,
                web: ext.spec.web,
                status: ext.status==undefined?null:{
                    availableReplicas: ext.status.availableReplicas,
                    conditions: ext.status.conditions,
                    paused: ext.status.paused,
                    replicas: ext.status.replicas,
                    unavailableReplicas: ext.status.unavailableReplicas,
                    updatedReplicas: ext.status.updatedReplicas,
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
