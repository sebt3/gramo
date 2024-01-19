import {kc, k8s, getMetadata} from '../core/libs.js';
import { MonitoringAlertmanager } from './type.Alertmanager.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createMonitoringAlertmanager: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['additionalPeers'] !== undefined && Array.isArray(args['spec']['additionalPeers'])) spec['additionalPeers'] = args['spec']['additionalPeers'];
        if (args['spec']['affinity'] !== undefined && typeof args['spec']['affinity'] == 'object') spec['affinity'] = args['spec']['affinity'];
        if (args['spec']['alertmanagerConfigMatcherStrategy'] !== undefined && typeof args['spec']['alertmanagerConfigMatcherStrategy'] == 'object') spec['alertmanagerConfigMatcherStrategy'] = args['spec']['alertmanagerConfigMatcherStrategy'];
        if (args['spec']['alertmanagerConfigNamespaceSelector'] !== undefined && typeof args['spec']['alertmanagerConfigNamespaceSelector'] == 'object') spec['alertmanagerConfigNamespaceSelector'] = args['spec']['alertmanagerConfigNamespaceSelector'];
        if (args['spec']['alertmanagerConfigSelector'] !== undefined && typeof args['spec']['alertmanagerConfigSelector'] == 'object') spec['alertmanagerConfigSelector'] = args['spec']['alertmanagerConfigSelector'];
        if (args['spec']['alertmanagerConfiguration'] !== undefined && typeof args['spec']['alertmanagerConfiguration'] == 'object') spec['alertmanagerConfiguration'] = args['spec']['alertmanagerConfiguration'];
        if (args['spec']['baseImage'] !== undefined && typeof args['spec']['baseImage'] == 'string') spec['baseImage'] = args['spec']['baseImage'];
        if (args['spec']['clusterAdvertiseAddress'] !== undefined && typeof args['spec']['clusterAdvertiseAddress'] == 'string') spec['clusterAdvertiseAddress'] = args['spec']['clusterAdvertiseAddress'];
        if (args['spec']['clusterGossipInterval'] !== undefined && typeof args['spec']['clusterGossipInterval'] == 'string') spec['clusterGossipInterval'] = args['spec']['clusterGossipInterval'];
        if (args['spec']['clusterPeerTimeout'] !== undefined && typeof args['spec']['clusterPeerTimeout'] == 'string') spec['clusterPeerTimeout'] = args['spec']['clusterPeerTimeout'];
        if (args['spec']['clusterPushpullInterval'] !== undefined && typeof args['spec']['clusterPushpullInterval'] == 'string') spec['clusterPushpullInterval'] = args['spec']['clusterPushpullInterval'];
        if (args['spec']['configMaps'] !== undefined && Array.isArray(args['spec']['configMaps'])) spec['configMaps'] = args['spec']['configMaps'];
        if (args['spec']['configSecret'] !== undefined && typeof args['spec']['configSecret'] == 'string') spec['configSecret'] = args['spec']['configSecret'];
        if (args['spec']['containers'] !== undefined && Array.isArray(args['spec']['containers'])) spec['containers'] = args['spec']['containers'];
        if (args['spec']['externalUrl'] !== undefined && typeof args['spec']['externalUrl'] == 'string') spec['externalUrl'] = args['spec']['externalUrl'];
        if (args['spec']['forceEnableClusterMode'] !== undefined && typeof args['spec']['forceEnableClusterMode'] == 'boolean') spec['forceEnableClusterMode'] = args['spec']['forceEnableClusterMode'];
        if (args['spec']['hostAliases'] !== undefined && Array.isArray(args['spec']['hostAliases'])) spec['hostAliases'] = args['spec']['hostAliases'];
        if (args['spec']['image'] !== undefined && typeof args['spec']['image'] == 'string') spec['image'] = args['spec']['image'];
        if (args['spec']['imagePullPolicy'] !== undefined && typeof args['spec']['imagePullPolicy'] == 'string') spec['imagePullPolicy'] = args['spec']['imagePullPolicy'];
        if (args['spec']['imagePullSecrets'] !== undefined && Array.isArray(args['spec']['imagePullSecrets'])) spec['imagePullSecrets'] = args['spec']['imagePullSecrets'];
        if (args['spec']['initContainers'] !== undefined && Array.isArray(args['spec']['initContainers'])) spec['initContainers'] = args['spec']['initContainers'];
        if (args['spec']['listenLocal'] !== undefined && typeof args['spec']['listenLocal'] == 'boolean') spec['listenLocal'] = args['spec']['listenLocal'];
        if (args['spec']['logFormat'] !== undefined && typeof args['spec']['logFormat'] == 'string') spec['logFormat'] = args['spec']['logFormat'];
        if (args['spec']['logLevel'] !== undefined && typeof args['spec']['logLevel'] == 'string') spec['logLevel'] = args['spec']['logLevel'];
        if (args['spec']['minReadySeconds'] !== undefined && typeof args['spec']['minReadySeconds'] == 'number') spec['minReadySeconds'] = args['spec']['minReadySeconds'];
        if (args['spec']['nodeSelector'] !== undefined && typeof args['spec']['nodeSelector'] == 'object') spec['nodeSelector'] = args['spec']['nodeSelector'];
        if (args['spec']['paused'] !== undefined && typeof args['spec']['paused'] == 'boolean') spec['paused'] = args['spec']['paused'];
        if (args['spec']['podMetadata'] !== undefined && typeof args['spec']['podMetadata'] == 'object') spec['podMetadata'] = args['spec']['podMetadata'];
        if (args['spec']['portName'] !== undefined && typeof args['spec']['portName'] == 'string') spec['portName'] = args['spec']['portName'];
        if (args['spec']['priorityClassName'] !== undefined && typeof args['spec']['priorityClassName'] == 'string') spec['priorityClassName'] = args['spec']['priorityClassName'];
        if (args['spec']['replicas'] !== undefined && typeof args['spec']['replicas'] == 'number') spec['replicas'] = args['spec']['replicas'];
        if (args['spec']['resources'] !== undefined && typeof args['spec']['resources'] == 'object') spec['resources'] = args['spec']['resources'];
        if (args['spec']['retention'] !== undefined && typeof args['spec']['retention'] == 'string') spec['retention'] = args['spec']['retention'];
        if (args['spec']['routePrefix'] !== undefined && typeof args['spec']['routePrefix'] == 'string') spec['routePrefix'] = args['spec']['routePrefix'];
        if (args['spec']['secrets'] !== undefined && Array.isArray(args['spec']['secrets'])) spec['secrets'] = args['spec']['secrets'];
        if (args['spec']['securityContext'] !== undefined && typeof args['spec']['securityContext'] == 'object') spec['securityContext'] = args['spec']['securityContext'];
        if (args['spec']['serviceAccountName'] !== undefined && typeof args['spec']['serviceAccountName'] == 'string') spec['serviceAccountName'] = args['spec']['serviceAccountName'];
        if (args['spec']['sha'] !== undefined && typeof args['spec']['sha'] == 'string') spec['sha'] = args['spec']['sha'];
        if (args['spec']['storage'] !== undefined && typeof args['spec']['storage'] == 'object') spec['storage'] = args['spec']['storage'];
        if (args['spec']['tag'] !== undefined && typeof args['spec']['tag'] == 'string') spec['tag'] = args['spec']['tag'];
        if (args['spec']['tolerations'] !== undefined && Array.isArray(args['spec']['tolerations'])) spec['tolerations'] = args['spec']['tolerations'];
        if (args['spec']['topologySpreadConstraints'] !== undefined && Array.isArray(args['spec']['topologySpreadConstraints'])) spec['topologySpreadConstraints'] = args['spec']['topologySpreadConstraints'];
        if (args['spec']['version'] !== undefined && typeof args['spec']['version'] == 'string') spec['version'] = args['spec']['version'];
        if (args['spec']['volumeMounts'] !== undefined && Array.isArray(args['spec']['volumeMounts'])) spec['volumeMounts'] = args['spec']['volumeMounts'];
        if (args['spec']['volumes'] !== undefined && Array.isArray(args['spec']['volumes'])) spec['volumes'] = args['spec']['volumes'];
        if (args['spec']['web'] !== undefined && typeof args['spec']['web'] == 'object') spec['web'] = args['spec']['web'];
        const payload = {
            apiVersion: 'monitoring.coreos.com/v1',
            kind: 'Alertmanager',
            metadata: {
              namespace: args['namespace'],
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createNamespacedCustomObject('monitoring.coreos.com','v1',args['namespace'],'alertmanagers', payload)
            const ext = res.body as MonitoringAlertmanager
            return {
                metadata: getMetadata(ext.metadata),
                "additionalPeers": ext.spec['additionalPeers'],
                "affinity": ext.spec['affinity'],
                "alertmanagerConfigMatcherStrategy": ext.spec['alertmanagerConfigMatcherStrategy'],
                "alertmanagerConfigNamespaceSelector": ext.spec['alertmanagerConfigNamespaceSelector'],
                "alertmanagerConfigSelector": ext.spec['alertmanagerConfigSelector'],
                "alertmanagerConfiguration": ext.spec['alertmanagerConfiguration'],
                "baseImage": ext.spec['baseImage'],
                "clusterAdvertiseAddress": ext.spec['clusterAdvertiseAddress'],
                "clusterGossipInterval": ext.spec['clusterGossipInterval'],
                "clusterPeerTimeout": ext.spec['clusterPeerTimeout'],
                "clusterPushpullInterval": ext.spec['clusterPushpullInterval'],
                "configMaps": ext.spec['configMaps'],
                "configSecret": ext.spec['configSecret'],
                "containers": ext.spec['containers'],
                "externalUrl": ext.spec['externalUrl'],
                "forceEnableClusterMode": ext.spec['forceEnableClusterMode'],
                "hostAliases": ext.spec['hostAliases'],
                "image": ext.spec['image'],
                "imagePullPolicy": ext.spec['imagePullPolicy'],
                "imagePullSecrets": ext.spec['imagePullSecrets'],
                "initContainers": ext.spec['initContainers'],
                "listenLocal": ext.spec['listenLocal'],
                "logFormat": ext.spec['logFormat'],
                "logLevel": ext.spec['logLevel'],
                "minReadySeconds": ext.spec['minReadySeconds'],
                "nodeSelector": ext.spec['nodeSelector'],
                "paused": ext.spec['paused'],
                "podMetadata": ext.spec['podMetadata'],
                "portName": ext.spec['portName'],
                "priorityClassName": ext.spec['priorityClassName'],
                "replicas": ext.spec['replicas'],
                "resources": ext.spec['resources'],
                "retention": ext.spec['retention'],
                "routePrefix": ext.spec['routePrefix'],
                "secrets": ext.spec['secrets'],
                "securityContext": ext.spec['securityContext'],
                "serviceAccountName": ext.spec['serviceAccountName'],
                "sha": ext.spec['sha'],
                "storage": ext.spec['storage'],
                "tag": ext.spec['tag'],
                "tolerations": ext.spec['tolerations'],
                "topologySpreadConstraints": ext.spec['topologySpreadConstraints'],
                "version": ext.spec['version'],
                "volumeMounts": ext.spec['volumeMounts'],
                "volumes": ext.spec['volumes'],
                "web": ext.spec['web'],
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
    patchMonitoringAlertmanager: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['additionalPeers'] !== undefined && Array.isArray(args['spec']['additionalPeers'])) spec['additionalPeers'] = args['spec']['additionalPeers'];
        if (args['spec']['affinity'] !== undefined && typeof args['spec']['affinity'] == 'object') spec['affinity'] = args['spec']['affinity'];
        if (args['spec']['alertmanagerConfigMatcherStrategy'] !== undefined && typeof args['spec']['alertmanagerConfigMatcherStrategy'] == 'object') spec['alertmanagerConfigMatcherStrategy'] = args['spec']['alertmanagerConfigMatcherStrategy'];
        if (args['spec']['alertmanagerConfigNamespaceSelector'] !== undefined && typeof args['spec']['alertmanagerConfigNamespaceSelector'] == 'object') spec['alertmanagerConfigNamespaceSelector'] = args['spec']['alertmanagerConfigNamespaceSelector'];
        if (args['spec']['alertmanagerConfigSelector'] !== undefined && typeof args['spec']['alertmanagerConfigSelector'] == 'object') spec['alertmanagerConfigSelector'] = args['spec']['alertmanagerConfigSelector'];
        if (args['spec']['alertmanagerConfiguration'] !== undefined && typeof args['spec']['alertmanagerConfiguration'] == 'object') spec['alertmanagerConfiguration'] = args['spec']['alertmanagerConfiguration'];
        if (args['spec']['baseImage'] !== undefined && typeof args['spec']['baseImage'] == 'string') spec['baseImage'] = args['spec']['baseImage'];
        if (args['spec']['clusterAdvertiseAddress'] !== undefined && typeof args['spec']['clusterAdvertiseAddress'] == 'string') spec['clusterAdvertiseAddress'] = args['spec']['clusterAdvertiseAddress'];
        if (args['spec']['clusterGossipInterval'] !== undefined && typeof args['spec']['clusterGossipInterval'] == 'string') spec['clusterGossipInterval'] = args['spec']['clusterGossipInterval'];
        if (args['spec']['clusterPeerTimeout'] !== undefined && typeof args['spec']['clusterPeerTimeout'] == 'string') spec['clusterPeerTimeout'] = args['spec']['clusterPeerTimeout'];
        if (args['spec']['clusterPushpullInterval'] !== undefined && typeof args['spec']['clusterPushpullInterval'] == 'string') spec['clusterPushpullInterval'] = args['spec']['clusterPushpullInterval'];
        if (args['spec']['configMaps'] !== undefined && Array.isArray(args['spec']['configMaps'])) spec['configMaps'] = args['spec']['configMaps'];
        if (args['spec']['configSecret'] !== undefined && typeof args['spec']['configSecret'] == 'string') spec['configSecret'] = args['spec']['configSecret'];
        if (args['spec']['containers'] !== undefined && Array.isArray(args['spec']['containers'])) spec['containers'] = args['spec']['containers'];
        if (args['spec']['externalUrl'] !== undefined && typeof args['spec']['externalUrl'] == 'string') spec['externalUrl'] = args['spec']['externalUrl'];
        if (args['spec']['forceEnableClusterMode'] !== undefined && typeof args['spec']['forceEnableClusterMode'] == 'boolean') spec['forceEnableClusterMode'] = args['spec']['forceEnableClusterMode'];
        if (args['spec']['hostAliases'] !== undefined && Array.isArray(args['spec']['hostAliases'])) spec['hostAliases'] = args['spec']['hostAliases'];
        if (args['spec']['image'] !== undefined && typeof args['spec']['image'] == 'string') spec['image'] = args['spec']['image'];
        if (args['spec']['imagePullPolicy'] !== undefined && typeof args['spec']['imagePullPolicy'] == 'string') spec['imagePullPolicy'] = args['spec']['imagePullPolicy'];
        if (args['spec']['imagePullSecrets'] !== undefined && Array.isArray(args['spec']['imagePullSecrets'])) spec['imagePullSecrets'] = args['spec']['imagePullSecrets'];
        if (args['spec']['initContainers'] !== undefined && Array.isArray(args['spec']['initContainers'])) spec['initContainers'] = args['spec']['initContainers'];
        if (args['spec']['listenLocal'] !== undefined && typeof args['spec']['listenLocal'] == 'boolean') spec['listenLocal'] = args['spec']['listenLocal'];
        if (args['spec']['logFormat'] !== undefined && typeof args['spec']['logFormat'] == 'string') spec['logFormat'] = args['spec']['logFormat'];
        if (args['spec']['logLevel'] !== undefined && typeof args['spec']['logLevel'] == 'string') spec['logLevel'] = args['spec']['logLevel'];
        if (args['spec']['minReadySeconds'] !== undefined && typeof args['spec']['minReadySeconds'] == 'number') spec['minReadySeconds'] = args['spec']['minReadySeconds'];
        if (args['spec']['nodeSelector'] !== undefined && typeof args['spec']['nodeSelector'] == 'object') spec['nodeSelector'] = args['spec']['nodeSelector'];
        if (args['spec']['paused'] !== undefined && typeof args['spec']['paused'] == 'boolean') spec['paused'] = args['spec']['paused'];
        if (args['spec']['podMetadata'] !== undefined && typeof args['spec']['podMetadata'] == 'object') spec['podMetadata'] = args['spec']['podMetadata'];
        if (args['spec']['portName'] !== undefined && typeof args['spec']['portName'] == 'string') spec['portName'] = args['spec']['portName'];
        if (args['spec']['priorityClassName'] !== undefined && typeof args['spec']['priorityClassName'] == 'string') spec['priorityClassName'] = args['spec']['priorityClassName'];
        if (args['spec']['replicas'] !== undefined && typeof args['spec']['replicas'] == 'number') spec['replicas'] = args['spec']['replicas'];
        if (args['spec']['resources'] !== undefined && typeof args['spec']['resources'] == 'object') spec['resources'] = args['spec']['resources'];
        if (args['spec']['retention'] !== undefined && typeof args['spec']['retention'] == 'string') spec['retention'] = args['spec']['retention'];
        if (args['spec']['routePrefix'] !== undefined && typeof args['spec']['routePrefix'] == 'string') spec['routePrefix'] = args['spec']['routePrefix'];
        if (args['spec']['secrets'] !== undefined && Array.isArray(args['spec']['secrets'])) spec['secrets'] = args['spec']['secrets'];
        if (args['spec']['securityContext'] !== undefined && typeof args['spec']['securityContext'] == 'object') spec['securityContext'] = args['spec']['securityContext'];
        if (args['spec']['serviceAccountName'] !== undefined && typeof args['spec']['serviceAccountName'] == 'string') spec['serviceAccountName'] = args['spec']['serviceAccountName'];
        if (args['spec']['sha'] !== undefined && typeof args['spec']['sha'] == 'string') spec['sha'] = args['spec']['sha'];
        if (args['spec']['storage'] !== undefined && typeof args['spec']['storage'] == 'object') spec['storage'] = args['spec']['storage'];
        if (args['spec']['tag'] !== undefined && typeof args['spec']['tag'] == 'string') spec['tag'] = args['spec']['tag'];
        if (args['spec']['tolerations'] !== undefined && Array.isArray(args['spec']['tolerations'])) spec['tolerations'] = args['spec']['tolerations'];
        if (args['spec']['topologySpreadConstraints'] !== undefined && Array.isArray(args['spec']['topologySpreadConstraints'])) spec['topologySpreadConstraints'] = args['spec']['topologySpreadConstraints'];
        if (args['spec']['version'] !== undefined && typeof args['spec']['version'] == 'string') spec['version'] = args['spec']['version'];
        if (args['spec']['volumeMounts'] !== undefined && Array.isArray(args['spec']['volumeMounts'])) spec['volumeMounts'] = args['spec']['volumeMounts'];
        if (args['spec']['volumes'] !== undefined && Array.isArray(args['spec']['volumes'])) spec['volumes'] = args['spec']['volumes'];
        if (args['spec']['web'] !== undefined && typeof args['spec']['web'] == 'object') spec['web'] = args['spec']['web'];
        const request = {
            apiVersion: 'monitoring.coreos.com/v1',
            kind: 'Alertmanager',
            metadata: {
                namespace: args['namespace'],
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getNamespacedCustomObject('monitoring.coreos.com','v1',args['namespace'],'alertmanagers', args['name'])
            const extGet = resGet.body as MonitoringAlertmanager
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchNamespacedCustomObject('monitoring.coreos.com','v1',args['namespace'],'alertmanagers', args['name'], payload, undefined, undefined, undefined, options)
            const ext = res.body as MonitoringAlertmanager
            return {
                metadata: getMetadata(ext.metadata),
                "additionalPeers": ext.spec['additionalPeers'],
                "affinity": ext.spec['affinity'],
                "alertmanagerConfigMatcherStrategy": ext.spec['alertmanagerConfigMatcherStrategy'],
                "alertmanagerConfigNamespaceSelector": ext.spec['alertmanagerConfigNamespaceSelector'],
                "alertmanagerConfigSelector": ext.spec['alertmanagerConfigSelector'],
                "alertmanagerConfiguration": ext.spec['alertmanagerConfiguration'],
                "baseImage": ext.spec['baseImage'],
                "clusterAdvertiseAddress": ext.spec['clusterAdvertiseAddress'],
                "clusterGossipInterval": ext.spec['clusterGossipInterval'],
                "clusterPeerTimeout": ext.spec['clusterPeerTimeout'],
                "clusterPushpullInterval": ext.spec['clusterPushpullInterval'],
                "configMaps": ext.spec['configMaps'],
                "configSecret": ext.spec['configSecret'],
                "containers": ext.spec['containers'],
                "externalUrl": ext.spec['externalUrl'],
                "forceEnableClusterMode": ext.spec['forceEnableClusterMode'],
                "hostAliases": ext.spec['hostAliases'],
                "image": ext.spec['image'],
                "imagePullPolicy": ext.spec['imagePullPolicy'],
                "imagePullSecrets": ext.spec['imagePullSecrets'],
                "initContainers": ext.spec['initContainers'],
                "listenLocal": ext.spec['listenLocal'],
                "logFormat": ext.spec['logFormat'],
                "logLevel": ext.spec['logLevel'],
                "minReadySeconds": ext.spec['minReadySeconds'],
                "nodeSelector": ext.spec['nodeSelector'],
                "paused": ext.spec['paused'],
                "podMetadata": ext.spec['podMetadata'],
                "portName": ext.spec['portName'],
                "priorityClassName": ext.spec['priorityClassName'],
                "replicas": ext.spec['replicas'],
                "resources": ext.spec['resources'],
                "retention": ext.spec['retention'],
                "routePrefix": ext.spec['routePrefix'],
                "secrets": ext.spec['secrets'],
                "securityContext": ext.spec['securityContext'],
                "serviceAccountName": ext.spec['serviceAccountName'],
                "sha": ext.spec['sha'],
                "storage": ext.spec['storage'],
                "tag": ext.spec['tag'],
                "tolerations": ext.spec['tolerations'],
                "topologySpreadConstraints": ext.spec['topologySpreadConstraints'],
                "version": ext.spec['version'],
                "volumeMounts": ext.spec['volumeMounts'],
                "volumes": ext.spec['volumes'],
                "web": ext.spec['web'],
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
    deleteMonitoringAlertmanager: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteNamespacedCustomObject('monitoring.coreos.com','v1',args['namespace'],'alertmanagers', args['name'])
        const ext = res.body as MonitoringAlertmanager
        return {
            metadata: getMetadata(ext.metadata),
            "additionalPeers": ext.spec['additionalPeers'],
            "affinity": ext.spec['affinity'],
            "alertmanagerConfigMatcherStrategy": ext.spec['alertmanagerConfigMatcherStrategy'],
            "alertmanagerConfigNamespaceSelector": ext.spec['alertmanagerConfigNamespaceSelector'],
            "alertmanagerConfigSelector": ext.spec['alertmanagerConfigSelector'],
            "alertmanagerConfiguration": ext.spec['alertmanagerConfiguration'],
            "baseImage": ext.spec['baseImage'],
            "clusterAdvertiseAddress": ext.spec['clusterAdvertiseAddress'],
            "clusterGossipInterval": ext.spec['clusterGossipInterval'],
            "clusterPeerTimeout": ext.spec['clusterPeerTimeout'],
            "clusterPushpullInterval": ext.spec['clusterPushpullInterval'],
            "configMaps": ext.spec['configMaps'],
            "configSecret": ext.spec['configSecret'],
            "containers": ext.spec['containers'],
            "externalUrl": ext.spec['externalUrl'],
            "forceEnableClusterMode": ext.spec['forceEnableClusterMode'],
            "hostAliases": ext.spec['hostAliases'],
            "image": ext.spec['image'],
            "imagePullPolicy": ext.spec['imagePullPolicy'],
            "imagePullSecrets": ext.spec['imagePullSecrets'],
            "initContainers": ext.spec['initContainers'],
            "listenLocal": ext.spec['listenLocal'],
            "logFormat": ext.spec['logFormat'],
            "logLevel": ext.spec['logLevel'],
            "minReadySeconds": ext.spec['minReadySeconds'],
            "nodeSelector": ext.spec['nodeSelector'],
            "paused": ext.spec['paused'],
            "podMetadata": ext.spec['podMetadata'],
            "portName": ext.spec['portName'],
            "priorityClassName": ext.spec['priorityClassName'],
            "replicas": ext.spec['replicas'],
            "resources": ext.spec['resources'],
            "retention": ext.spec['retention'],
            "routePrefix": ext.spec['routePrefix'],
            "secrets": ext.spec['secrets'],
            "securityContext": ext.spec['securityContext'],
            "serviceAccountName": ext.spec['serviceAccountName'],
            "sha": ext.spec['sha'],
            "storage": ext.spec['storage'],
            "tag": ext.spec['tag'],
            "tolerations": ext.spec['tolerations'],
            "topologySpreadConstraints": ext.spec['topologySpreadConstraints'],
            "version": ext.spec['version'],
            "volumeMounts": ext.spec['volumeMounts'],
            "volumes": ext.spec['volumes'],
            "web": ext.spec['web'],
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
