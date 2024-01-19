import {kc, k8s, getMetadata} from '../core/libs.js';
import { MonitoringPrometheusAgent } from './type.PrometheusAgent.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createMonitoringPrometheusAgent: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['additionalArgs'] !== undefined && Array.isArray(args['spec']['additionalArgs'])) spec['additionalArgs'] = args['spec']['additionalArgs'];
        if (args['spec']['additionalScrapeConfigs'] !== undefined && typeof args['spec']['additionalScrapeConfigs'] == 'object') spec['additionalScrapeConfigs'] = args['spec']['additionalScrapeConfigs'];
        if (args['spec']['affinity'] !== undefined && typeof args['spec']['affinity'] == 'object') spec['affinity'] = args['spec']['affinity'];
        if (args['spec']['apiserverConfig'] !== undefined && typeof args['spec']['apiserverConfig'] == 'object') spec['apiserverConfig'] = args['spec']['apiserverConfig'];
        if (args['spec']['arbitraryFSAccessThroughSMs'] !== undefined && typeof args['spec']['arbitraryFSAccessThroughSMs'] == 'object') spec['arbitraryFSAccessThroughSMs'] = args['spec']['arbitraryFSAccessThroughSMs'];
        if (args['spec']['configMaps'] !== undefined && Array.isArray(args['spec']['configMaps'])) spec['configMaps'] = args['spec']['configMaps'];
        if (args['spec']['containers'] !== undefined && Array.isArray(args['spec']['containers'])) spec['containers'] = args['spec']['containers'];
        if (args['spec']['enableFeatures'] !== undefined && Array.isArray(args['spec']['enableFeatures'])) spec['enableFeatures'] = args['spec']['enableFeatures'];
        if (args['spec']['enableRemoteWriteReceiver'] !== undefined && typeof args['spec']['enableRemoteWriteReceiver'] == 'boolean') spec['enableRemoteWriteReceiver'] = args['spec']['enableRemoteWriteReceiver'];
        if (args['spec']['enforcedBodySizeLimit'] !== undefined && typeof args['spec']['enforcedBodySizeLimit'] == 'string') spec['enforcedBodySizeLimit'] = args['spec']['enforcedBodySizeLimit'];
        if (args['spec']['enforcedLabelLimit'] !== undefined && typeof args['spec']['enforcedLabelLimit'] == 'number') spec['enforcedLabelLimit'] = args['spec']['enforcedLabelLimit'];
        if (args['spec']['enforcedLabelNameLengthLimit'] !== undefined && typeof args['spec']['enforcedLabelNameLengthLimit'] == 'number') spec['enforcedLabelNameLengthLimit'] = args['spec']['enforcedLabelNameLengthLimit'];
        if (args['spec']['enforcedLabelValueLengthLimit'] !== undefined && typeof args['spec']['enforcedLabelValueLengthLimit'] == 'number') spec['enforcedLabelValueLengthLimit'] = args['spec']['enforcedLabelValueLengthLimit'];
        if (args['spec']['enforcedNamespaceLabel'] !== undefined && typeof args['spec']['enforcedNamespaceLabel'] == 'string') spec['enforcedNamespaceLabel'] = args['spec']['enforcedNamespaceLabel'];
        if (args['spec']['enforcedSampleLimit'] !== undefined && typeof args['spec']['enforcedSampleLimit'] == 'number') spec['enforcedSampleLimit'] = args['spec']['enforcedSampleLimit'];
        if (args['spec']['enforcedTargetLimit'] !== undefined && typeof args['spec']['enforcedTargetLimit'] == 'number') spec['enforcedTargetLimit'] = args['spec']['enforcedTargetLimit'];
        if (args['spec']['excludedFromEnforcement'] !== undefined && Array.isArray(args['spec']['excludedFromEnforcement'])) spec['excludedFromEnforcement'] = args['spec']['excludedFromEnforcement'];
        if (args['spec']['externalLabels'] !== undefined && typeof args['spec']['externalLabels'] == 'object') spec['externalLabels'] = args['spec']['externalLabels'];
        if (args['spec']['externalUrl'] !== undefined && typeof args['spec']['externalUrl'] == 'string') spec['externalUrl'] = args['spec']['externalUrl'];
        if (args['spec']['hostAliases'] !== undefined && Array.isArray(args['spec']['hostAliases'])) spec['hostAliases'] = args['spec']['hostAliases'];
        if (args['spec']['hostNetwork'] !== undefined && typeof args['spec']['hostNetwork'] == 'boolean') spec['hostNetwork'] = args['spec']['hostNetwork'];
        if (args['spec']['ignoreNamespaceSelectors'] !== undefined && typeof args['spec']['ignoreNamespaceSelectors'] == 'boolean') spec['ignoreNamespaceSelectors'] = args['spec']['ignoreNamespaceSelectors'];
        if (args['spec']['image'] !== undefined && typeof args['spec']['image'] == 'string') spec['image'] = args['spec']['image'];
        if (args['spec']['imagePullPolicy'] !== undefined && typeof args['spec']['imagePullPolicy'] == 'string') spec['imagePullPolicy'] = args['spec']['imagePullPolicy'];
        if (args['spec']['imagePullSecrets'] !== undefined && Array.isArray(args['spec']['imagePullSecrets'])) spec['imagePullSecrets'] = args['spec']['imagePullSecrets'];
        if (args['spec']['initContainers'] !== undefined && Array.isArray(args['spec']['initContainers'])) spec['initContainers'] = args['spec']['initContainers'];
        if (args['spec']['listenLocal'] !== undefined && typeof args['spec']['listenLocal'] == 'boolean') spec['listenLocal'] = args['spec']['listenLocal'];
        if (args['spec']['logFormat'] !== undefined && typeof args['spec']['logFormat'] == 'string') spec['logFormat'] = args['spec']['logFormat'];
        if (args['spec']['logLevel'] !== undefined && typeof args['spec']['logLevel'] == 'string') spec['logLevel'] = args['spec']['logLevel'];
        if (args['spec']['minReadySeconds'] !== undefined && typeof args['spec']['minReadySeconds'] == 'number') spec['minReadySeconds'] = args['spec']['minReadySeconds'];
        if (args['spec']['nodeSelector'] !== undefined && typeof args['spec']['nodeSelector'] == 'object') spec['nodeSelector'] = args['spec']['nodeSelector'];
        if (args['spec']['overrideHonorLabels'] !== undefined && typeof args['spec']['overrideHonorLabels'] == 'boolean') spec['overrideHonorLabels'] = args['spec']['overrideHonorLabels'];
        if (args['spec']['overrideHonorTimestamps'] !== undefined && typeof args['spec']['overrideHonorTimestamps'] == 'boolean') spec['overrideHonorTimestamps'] = args['spec']['overrideHonorTimestamps'];
        if (args['spec']['paused'] !== undefined && typeof args['spec']['paused'] == 'boolean') spec['paused'] = args['spec']['paused'];
        if (args['spec']['podMetadata'] !== undefined && typeof args['spec']['podMetadata'] == 'object') spec['podMetadata'] = args['spec']['podMetadata'];
        if (args['spec']['podMonitorNamespaceSelector'] !== undefined && typeof args['spec']['podMonitorNamespaceSelector'] == 'object') spec['podMonitorNamespaceSelector'] = args['spec']['podMonitorNamespaceSelector'];
        if (args['spec']['podMonitorSelector'] !== undefined && typeof args['spec']['podMonitorSelector'] == 'object') spec['podMonitorSelector'] = args['spec']['podMonitorSelector'];
        if (args['spec']['podTargetLabels'] !== undefined && Array.isArray(args['spec']['podTargetLabels'])) spec['podTargetLabels'] = args['spec']['podTargetLabels'];
        if (args['spec']['portName'] !== undefined && typeof args['spec']['portName'] == 'string') spec['portName'] = args['spec']['portName'];
        if (args['spec']['priorityClassName'] !== undefined && typeof args['spec']['priorityClassName'] == 'string') spec['priorityClassName'] = args['spec']['priorityClassName'];
        if (args['spec']['probeNamespaceSelector'] !== undefined && typeof args['spec']['probeNamespaceSelector'] == 'object') spec['probeNamespaceSelector'] = args['spec']['probeNamespaceSelector'];
        if (args['spec']['probeSelector'] !== undefined && typeof args['spec']['probeSelector'] == 'object') spec['probeSelector'] = args['spec']['probeSelector'];
        if (args['spec']['prometheusExternalLabelName'] !== undefined && typeof args['spec']['prometheusExternalLabelName'] == 'string') spec['prometheusExternalLabelName'] = args['spec']['prometheusExternalLabelName'];
        if (args['spec']['remoteWrite'] !== undefined && Array.isArray(args['spec']['remoteWrite'])) spec['remoteWrite'] = args['spec']['remoteWrite'];
        if (args['spec']['replicaExternalLabelName'] !== undefined && typeof args['spec']['replicaExternalLabelName'] == 'string') spec['replicaExternalLabelName'] = args['spec']['replicaExternalLabelName'];
        if (args['spec']['replicas'] !== undefined && typeof args['spec']['replicas'] == 'number') spec['replicas'] = args['spec']['replicas'];
        if (args['spec']['resources'] !== undefined && typeof args['spec']['resources'] == 'object') spec['resources'] = args['spec']['resources'];
        if (args['spec']['routePrefix'] !== undefined && typeof args['spec']['routePrefix'] == 'string') spec['routePrefix'] = args['spec']['routePrefix'];
        if (args['spec']['scrapeConfigNamespaceSelector'] !== undefined && typeof args['spec']['scrapeConfigNamespaceSelector'] == 'object') spec['scrapeConfigNamespaceSelector'] = args['spec']['scrapeConfigNamespaceSelector'];
        if (args['spec']['scrapeConfigSelector'] !== undefined && typeof args['spec']['scrapeConfigSelector'] == 'object') spec['scrapeConfigSelector'] = args['spec']['scrapeConfigSelector'];
        if (args['spec']['scrapeInterval'] !== undefined && typeof args['spec']['scrapeInterval'] == 'string') spec['scrapeInterval'] = args['spec']['scrapeInterval'];
        if (args['spec']['scrapeTimeout'] !== undefined && typeof args['spec']['scrapeTimeout'] == 'string') spec['scrapeTimeout'] = args['spec']['scrapeTimeout'];
        if (args['spec']['secrets'] !== undefined && Array.isArray(args['spec']['secrets'])) spec['secrets'] = args['spec']['secrets'];
        if (args['spec']['securityContext'] !== undefined && typeof args['spec']['securityContext'] == 'object') spec['securityContext'] = args['spec']['securityContext'];
        if (args['spec']['serviceAccountName'] !== undefined && typeof args['spec']['serviceAccountName'] == 'string') spec['serviceAccountName'] = args['spec']['serviceAccountName'];
        if (args['spec']['serviceMonitorNamespaceSelector'] !== undefined && typeof args['spec']['serviceMonitorNamespaceSelector'] == 'object') spec['serviceMonitorNamespaceSelector'] = args['spec']['serviceMonitorNamespaceSelector'];
        if (args['spec']['serviceMonitorSelector'] !== undefined && typeof args['spec']['serviceMonitorSelector'] == 'object') spec['serviceMonitorSelector'] = args['spec']['serviceMonitorSelector'];
        if (args['spec']['shards'] !== undefined && typeof args['spec']['shards'] == 'number') spec['shards'] = args['spec']['shards'];
        if (args['spec']['storage'] !== undefined && typeof args['spec']['storage'] == 'object') spec['storage'] = args['spec']['storage'];
        if (args['spec']['tolerations'] !== undefined && Array.isArray(args['spec']['tolerations'])) spec['tolerations'] = args['spec']['tolerations'];
        if (args['spec']['topologySpreadConstraints'] !== undefined && Array.isArray(args['spec']['topologySpreadConstraints'])) spec['topologySpreadConstraints'] = args['spec']['topologySpreadConstraints'];
        if (args['spec']['version'] !== undefined && typeof args['spec']['version'] == 'string') spec['version'] = args['spec']['version'];
        if (args['spec']['volumeMounts'] !== undefined && Array.isArray(args['spec']['volumeMounts'])) spec['volumeMounts'] = args['spec']['volumeMounts'];
        if (args['spec']['volumes'] !== undefined && Array.isArray(args['spec']['volumes'])) spec['volumes'] = args['spec']['volumes'];
        if (args['spec']['walCompression'] !== undefined && typeof args['spec']['walCompression'] == 'boolean') spec['walCompression'] = args['spec']['walCompression'];
        if (args['spec']['web'] !== undefined && typeof args['spec']['web'] == 'object') spec['web'] = args['spec']['web'];
        const payload = {
            apiVersion: 'monitoring.coreos.com/v1alpha1',
            kind: 'PrometheusAgent',
            metadata: {
              namespace: args['namespace'],
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createNamespacedCustomObject('monitoring.coreos.com','v1alpha1',args['namespace'],'prometheusagents', payload)
            const ext = res.body as MonitoringPrometheusAgent
            return {
                metadata: getMetadata(ext.metadata),
                "additionalArgs": ext.spec['additionalArgs'],
                "additionalScrapeConfigs": ext.spec['additionalScrapeConfigs'],
                "affinity": ext.spec['affinity'],
                "apiserverConfig": ext.spec['apiserverConfig'],
                "arbitraryFSAccessThroughSMs": ext.spec['arbitraryFSAccessThroughSMs'],
                "configMaps": ext.spec['configMaps'],
                "containers": ext.spec['containers'],
                "enableFeatures": ext.spec['enableFeatures'],
                "enableRemoteWriteReceiver": ext.spec['enableRemoteWriteReceiver'],
                "enforcedBodySizeLimit": ext.spec['enforcedBodySizeLimit'],
                "enforcedLabelLimit": ext.spec['enforcedLabelLimit'],
                "enforcedLabelNameLengthLimit": ext.spec['enforcedLabelNameLengthLimit'],
                "enforcedLabelValueLengthLimit": ext.spec['enforcedLabelValueLengthLimit'],
                "enforcedNamespaceLabel": ext.spec['enforcedNamespaceLabel'],
                "enforcedSampleLimit": ext.spec['enforcedSampleLimit'],
                "enforcedTargetLimit": ext.spec['enforcedTargetLimit'],
                "excludedFromEnforcement": ext.spec['excludedFromEnforcement'],
                "externalLabels": ext.spec['externalLabels'],
                "externalUrl": ext.spec['externalUrl'],
                "hostAliases": ext.spec['hostAliases'],
                "hostNetwork": ext.spec['hostNetwork'],
                "ignoreNamespaceSelectors": ext.spec['ignoreNamespaceSelectors'],
                "image": ext.spec['image'],
                "imagePullPolicy": ext.spec['imagePullPolicy'],
                "imagePullSecrets": ext.spec['imagePullSecrets'],
                "initContainers": ext.spec['initContainers'],
                "listenLocal": ext.spec['listenLocal'],
                "logFormat": ext.spec['logFormat'],
                "logLevel": ext.spec['logLevel'],
                "minReadySeconds": ext.spec['minReadySeconds'],
                "nodeSelector": ext.spec['nodeSelector'],
                "overrideHonorLabels": ext.spec['overrideHonorLabels'],
                "overrideHonorTimestamps": ext.spec['overrideHonorTimestamps'],
                "paused": ext.spec['paused'],
                "podMetadata": ext.spec['podMetadata'],
                "podMonitorNamespaceSelector": ext.spec['podMonitorNamespaceSelector'],
                "podMonitorSelector": ext.spec['podMonitorSelector'],
                "podTargetLabels": ext.spec['podTargetLabels'],
                "portName": ext.spec['portName'],
                "priorityClassName": ext.spec['priorityClassName'],
                "probeNamespaceSelector": ext.spec['probeNamespaceSelector'],
                "probeSelector": ext.spec['probeSelector'],
                "prometheusExternalLabelName": ext.spec['prometheusExternalLabelName'],
                "remoteWrite": ext.spec['remoteWrite'],
                "replicaExternalLabelName": ext.spec['replicaExternalLabelName'],
                "replicas": ext.spec['replicas'],
                "resources": ext.spec['resources'],
                "routePrefix": ext.spec['routePrefix'],
                "scrapeConfigNamespaceSelector": ext.spec['scrapeConfigNamespaceSelector'],
                "scrapeConfigSelector": ext.spec['scrapeConfigSelector'],
                "scrapeInterval": ext.spec['scrapeInterval'],
                "scrapeTimeout": ext.spec['scrapeTimeout'],
                "secrets": ext.spec['secrets'],
                "securityContext": ext.spec['securityContext'],
                "serviceAccountName": ext.spec['serviceAccountName'],
                "serviceMonitorNamespaceSelector": ext.spec['serviceMonitorNamespaceSelector'],
                "serviceMonitorSelector": ext.spec['serviceMonitorSelector'],
                "shards": ext.spec['shards'],
                "storage": ext.spec['storage'],
                "tolerations": ext.spec['tolerations'],
                "topologySpreadConstraints": ext.spec['topologySpreadConstraints'],
                "version": ext.spec['version'],
                "volumeMounts": ext.spec['volumeMounts'],
                "volumes": ext.spec['volumes'],
                "walCompression": ext.spec['walCompression'],
                "web": ext.spec['web'],
                status: ext.status==undefined?null:{
                    "availableReplicas": ext.status['availableReplicas'],
                    "conditions": ext.status['conditions'],
                    "paused": ext.status['paused'],
                    "replicas": ext.status['replicas'],
                    "shardStatuses": ext.status['shardStatuses'],
                    "unavailableReplicas": ext.status['unavailableReplicas'],
                    "updatedReplicas": ext.status['updatedReplicas'],
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    patchMonitoringPrometheusAgent: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['additionalArgs'] !== undefined && Array.isArray(args['spec']['additionalArgs'])) spec['additionalArgs'] = args['spec']['additionalArgs'];
        if (args['spec']['additionalScrapeConfigs'] !== undefined && typeof args['spec']['additionalScrapeConfigs'] == 'object') spec['additionalScrapeConfigs'] = args['spec']['additionalScrapeConfigs'];
        if (args['spec']['affinity'] !== undefined && typeof args['spec']['affinity'] == 'object') spec['affinity'] = args['spec']['affinity'];
        if (args['spec']['apiserverConfig'] !== undefined && typeof args['spec']['apiserverConfig'] == 'object') spec['apiserverConfig'] = args['spec']['apiserverConfig'];
        if (args['spec']['arbitraryFSAccessThroughSMs'] !== undefined && typeof args['spec']['arbitraryFSAccessThroughSMs'] == 'object') spec['arbitraryFSAccessThroughSMs'] = args['spec']['arbitraryFSAccessThroughSMs'];
        if (args['spec']['configMaps'] !== undefined && Array.isArray(args['spec']['configMaps'])) spec['configMaps'] = args['spec']['configMaps'];
        if (args['spec']['containers'] !== undefined && Array.isArray(args['spec']['containers'])) spec['containers'] = args['spec']['containers'];
        if (args['spec']['enableFeatures'] !== undefined && Array.isArray(args['spec']['enableFeatures'])) spec['enableFeatures'] = args['spec']['enableFeatures'];
        if (args['spec']['enableRemoteWriteReceiver'] !== undefined && typeof args['spec']['enableRemoteWriteReceiver'] == 'boolean') spec['enableRemoteWriteReceiver'] = args['spec']['enableRemoteWriteReceiver'];
        if (args['spec']['enforcedBodySizeLimit'] !== undefined && typeof args['spec']['enforcedBodySizeLimit'] == 'string') spec['enforcedBodySizeLimit'] = args['spec']['enforcedBodySizeLimit'];
        if (args['spec']['enforcedLabelLimit'] !== undefined && typeof args['spec']['enforcedLabelLimit'] == 'number') spec['enforcedLabelLimit'] = args['spec']['enforcedLabelLimit'];
        if (args['spec']['enforcedLabelNameLengthLimit'] !== undefined && typeof args['spec']['enforcedLabelNameLengthLimit'] == 'number') spec['enforcedLabelNameLengthLimit'] = args['spec']['enforcedLabelNameLengthLimit'];
        if (args['spec']['enforcedLabelValueLengthLimit'] !== undefined && typeof args['spec']['enforcedLabelValueLengthLimit'] == 'number') spec['enforcedLabelValueLengthLimit'] = args['spec']['enforcedLabelValueLengthLimit'];
        if (args['spec']['enforcedNamespaceLabel'] !== undefined && typeof args['spec']['enforcedNamespaceLabel'] == 'string') spec['enforcedNamespaceLabel'] = args['spec']['enforcedNamespaceLabel'];
        if (args['spec']['enforcedSampleLimit'] !== undefined && typeof args['spec']['enforcedSampleLimit'] == 'number') spec['enforcedSampleLimit'] = args['spec']['enforcedSampleLimit'];
        if (args['spec']['enforcedTargetLimit'] !== undefined && typeof args['spec']['enforcedTargetLimit'] == 'number') spec['enforcedTargetLimit'] = args['spec']['enforcedTargetLimit'];
        if (args['spec']['excludedFromEnforcement'] !== undefined && Array.isArray(args['spec']['excludedFromEnforcement'])) spec['excludedFromEnforcement'] = args['spec']['excludedFromEnforcement'];
        if (args['spec']['externalLabels'] !== undefined && typeof args['spec']['externalLabels'] == 'object') spec['externalLabels'] = args['spec']['externalLabels'];
        if (args['spec']['externalUrl'] !== undefined && typeof args['spec']['externalUrl'] == 'string') spec['externalUrl'] = args['spec']['externalUrl'];
        if (args['spec']['hostAliases'] !== undefined && Array.isArray(args['spec']['hostAliases'])) spec['hostAliases'] = args['spec']['hostAliases'];
        if (args['spec']['hostNetwork'] !== undefined && typeof args['spec']['hostNetwork'] == 'boolean') spec['hostNetwork'] = args['spec']['hostNetwork'];
        if (args['spec']['ignoreNamespaceSelectors'] !== undefined && typeof args['spec']['ignoreNamespaceSelectors'] == 'boolean') spec['ignoreNamespaceSelectors'] = args['spec']['ignoreNamespaceSelectors'];
        if (args['spec']['image'] !== undefined && typeof args['spec']['image'] == 'string') spec['image'] = args['spec']['image'];
        if (args['spec']['imagePullPolicy'] !== undefined && typeof args['spec']['imagePullPolicy'] == 'string') spec['imagePullPolicy'] = args['spec']['imagePullPolicy'];
        if (args['spec']['imagePullSecrets'] !== undefined && Array.isArray(args['spec']['imagePullSecrets'])) spec['imagePullSecrets'] = args['spec']['imagePullSecrets'];
        if (args['spec']['initContainers'] !== undefined && Array.isArray(args['spec']['initContainers'])) spec['initContainers'] = args['spec']['initContainers'];
        if (args['spec']['listenLocal'] !== undefined && typeof args['spec']['listenLocal'] == 'boolean') spec['listenLocal'] = args['spec']['listenLocal'];
        if (args['spec']['logFormat'] !== undefined && typeof args['spec']['logFormat'] == 'string') spec['logFormat'] = args['spec']['logFormat'];
        if (args['spec']['logLevel'] !== undefined && typeof args['spec']['logLevel'] == 'string') spec['logLevel'] = args['spec']['logLevel'];
        if (args['spec']['minReadySeconds'] !== undefined && typeof args['spec']['minReadySeconds'] == 'number') spec['minReadySeconds'] = args['spec']['minReadySeconds'];
        if (args['spec']['nodeSelector'] !== undefined && typeof args['spec']['nodeSelector'] == 'object') spec['nodeSelector'] = args['spec']['nodeSelector'];
        if (args['spec']['overrideHonorLabels'] !== undefined && typeof args['spec']['overrideHonorLabels'] == 'boolean') spec['overrideHonorLabels'] = args['spec']['overrideHonorLabels'];
        if (args['spec']['overrideHonorTimestamps'] !== undefined && typeof args['spec']['overrideHonorTimestamps'] == 'boolean') spec['overrideHonorTimestamps'] = args['spec']['overrideHonorTimestamps'];
        if (args['spec']['paused'] !== undefined && typeof args['spec']['paused'] == 'boolean') spec['paused'] = args['spec']['paused'];
        if (args['spec']['podMetadata'] !== undefined && typeof args['spec']['podMetadata'] == 'object') spec['podMetadata'] = args['spec']['podMetadata'];
        if (args['spec']['podMonitorNamespaceSelector'] !== undefined && typeof args['spec']['podMonitorNamespaceSelector'] == 'object') spec['podMonitorNamespaceSelector'] = args['spec']['podMonitorNamespaceSelector'];
        if (args['spec']['podMonitorSelector'] !== undefined && typeof args['spec']['podMonitorSelector'] == 'object') spec['podMonitorSelector'] = args['spec']['podMonitorSelector'];
        if (args['spec']['podTargetLabels'] !== undefined && Array.isArray(args['spec']['podTargetLabels'])) spec['podTargetLabels'] = args['spec']['podTargetLabels'];
        if (args['spec']['portName'] !== undefined && typeof args['spec']['portName'] == 'string') spec['portName'] = args['spec']['portName'];
        if (args['spec']['priorityClassName'] !== undefined && typeof args['spec']['priorityClassName'] == 'string') spec['priorityClassName'] = args['spec']['priorityClassName'];
        if (args['spec']['probeNamespaceSelector'] !== undefined && typeof args['spec']['probeNamespaceSelector'] == 'object') spec['probeNamespaceSelector'] = args['spec']['probeNamespaceSelector'];
        if (args['spec']['probeSelector'] !== undefined && typeof args['spec']['probeSelector'] == 'object') spec['probeSelector'] = args['spec']['probeSelector'];
        if (args['spec']['prometheusExternalLabelName'] !== undefined && typeof args['spec']['prometheusExternalLabelName'] == 'string') spec['prometheusExternalLabelName'] = args['spec']['prometheusExternalLabelName'];
        if (args['spec']['remoteWrite'] !== undefined && Array.isArray(args['spec']['remoteWrite'])) spec['remoteWrite'] = args['spec']['remoteWrite'];
        if (args['spec']['replicaExternalLabelName'] !== undefined && typeof args['spec']['replicaExternalLabelName'] == 'string') spec['replicaExternalLabelName'] = args['spec']['replicaExternalLabelName'];
        if (args['spec']['replicas'] !== undefined && typeof args['spec']['replicas'] == 'number') spec['replicas'] = args['spec']['replicas'];
        if (args['spec']['resources'] !== undefined && typeof args['spec']['resources'] == 'object') spec['resources'] = args['spec']['resources'];
        if (args['spec']['routePrefix'] !== undefined && typeof args['spec']['routePrefix'] == 'string') spec['routePrefix'] = args['spec']['routePrefix'];
        if (args['spec']['scrapeConfigNamespaceSelector'] !== undefined && typeof args['spec']['scrapeConfigNamespaceSelector'] == 'object') spec['scrapeConfigNamespaceSelector'] = args['spec']['scrapeConfigNamespaceSelector'];
        if (args['spec']['scrapeConfigSelector'] !== undefined && typeof args['spec']['scrapeConfigSelector'] == 'object') spec['scrapeConfigSelector'] = args['spec']['scrapeConfigSelector'];
        if (args['spec']['scrapeInterval'] !== undefined && typeof args['spec']['scrapeInterval'] == 'string') spec['scrapeInterval'] = args['spec']['scrapeInterval'];
        if (args['spec']['scrapeTimeout'] !== undefined && typeof args['spec']['scrapeTimeout'] == 'string') spec['scrapeTimeout'] = args['spec']['scrapeTimeout'];
        if (args['spec']['secrets'] !== undefined && Array.isArray(args['spec']['secrets'])) spec['secrets'] = args['spec']['secrets'];
        if (args['spec']['securityContext'] !== undefined && typeof args['spec']['securityContext'] == 'object') spec['securityContext'] = args['spec']['securityContext'];
        if (args['spec']['serviceAccountName'] !== undefined && typeof args['spec']['serviceAccountName'] == 'string') spec['serviceAccountName'] = args['spec']['serviceAccountName'];
        if (args['spec']['serviceMonitorNamespaceSelector'] !== undefined && typeof args['spec']['serviceMonitorNamespaceSelector'] == 'object') spec['serviceMonitorNamespaceSelector'] = args['spec']['serviceMonitorNamespaceSelector'];
        if (args['spec']['serviceMonitorSelector'] !== undefined && typeof args['spec']['serviceMonitorSelector'] == 'object') spec['serviceMonitorSelector'] = args['spec']['serviceMonitorSelector'];
        if (args['spec']['shards'] !== undefined && typeof args['spec']['shards'] == 'number') spec['shards'] = args['spec']['shards'];
        if (args['spec']['storage'] !== undefined && typeof args['spec']['storage'] == 'object') spec['storage'] = args['spec']['storage'];
        if (args['spec']['tolerations'] !== undefined && Array.isArray(args['spec']['tolerations'])) spec['tolerations'] = args['spec']['tolerations'];
        if (args['spec']['topologySpreadConstraints'] !== undefined && Array.isArray(args['spec']['topologySpreadConstraints'])) spec['topologySpreadConstraints'] = args['spec']['topologySpreadConstraints'];
        if (args['spec']['version'] !== undefined && typeof args['spec']['version'] == 'string') spec['version'] = args['spec']['version'];
        if (args['spec']['volumeMounts'] !== undefined && Array.isArray(args['spec']['volumeMounts'])) spec['volumeMounts'] = args['spec']['volumeMounts'];
        if (args['spec']['volumes'] !== undefined && Array.isArray(args['spec']['volumes'])) spec['volumes'] = args['spec']['volumes'];
        if (args['spec']['walCompression'] !== undefined && typeof args['spec']['walCompression'] == 'boolean') spec['walCompression'] = args['spec']['walCompression'];
        if (args['spec']['web'] !== undefined && typeof args['spec']['web'] == 'object') spec['web'] = args['spec']['web'];
        const request = {
            apiVersion: 'monitoring.coreos.com/v1alpha1',
            kind: 'PrometheusAgent',
            metadata: {
                namespace: args['namespace'],
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getNamespacedCustomObject('monitoring.coreos.com','v1alpha1',args['namespace'],'prometheusagents', args['name'])
            const extGet = resGet.body as MonitoringPrometheusAgent
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchNamespacedCustomObject('monitoring.coreos.com','v1alpha1',args['namespace'],'prometheusagents', args['name'], payload, undefined, undefined, undefined, options)
            const ext = res.body as MonitoringPrometheusAgent
            return {
                metadata: getMetadata(ext.metadata),
                "additionalArgs": ext.spec['additionalArgs'],
                "additionalScrapeConfigs": ext.spec['additionalScrapeConfigs'],
                "affinity": ext.spec['affinity'],
                "apiserverConfig": ext.spec['apiserverConfig'],
                "arbitraryFSAccessThroughSMs": ext.spec['arbitraryFSAccessThroughSMs'],
                "configMaps": ext.spec['configMaps'],
                "containers": ext.spec['containers'],
                "enableFeatures": ext.spec['enableFeatures'],
                "enableRemoteWriteReceiver": ext.spec['enableRemoteWriteReceiver'],
                "enforcedBodySizeLimit": ext.spec['enforcedBodySizeLimit'],
                "enforcedLabelLimit": ext.spec['enforcedLabelLimit'],
                "enforcedLabelNameLengthLimit": ext.spec['enforcedLabelNameLengthLimit'],
                "enforcedLabelValueLengthLimit": ext.spec['enforcedLabelValueLengthLimit'],
                "enforcedNamespaceLabel": ext.spec['enforcedNamespaceLabel'],
                "enforcedSampleLimit": ext.spec['enforcedSampleLimit'],
                "enforcedTargetLimit": ext.spec['enforcedTargetLimit'],
                "excludedFromEnforcement": ext.spec['excludedFromEnforcement'],
                "externalLabels": ext.spec['externalLabels'],
                "externalUrl": ext.spec['externalUrl'],
                "hostAliases": ext.spec['hostAliases'],
                "hostNetwork": ext.spec['hostNetwork'],
                "ignoreNamespaceSelectors": ext.spec['ignoreNamespaceSelectors'],
                "image": ext.spec['image'],
                "imagePullPolicy": ext.spec['imagePullPolicy'],
                "imagePullSecrets": ext.spec['imagePullSecrets'],
                "initContainers": ext.spec['initContainers'],
                "listenLocal": ext.spec['listenLocal'],
                "logFormat": ext.spec['logFormat'],
                "logLevel": ext.spec['logLevel'],
                "minReadySeconds": ext.spec['minReadySeconds'],
                "nodeSelector": ext.spec['nodeSelector'],
                "overrideHonorLabels": ext.spec['overrideHonorLabels'],
                "overrideHonorTimestamps": ext.spec['overrideHonorTimestamps'],
                "paused": ext.spec['paused'],
                "podMetadata": ext.spec['podMetadata'],
                "podMonitorNamespaceSelector": ext.spec['podMonitorNamespaceSelector'],
                "podMonitorSelector": ext.spec['podMonitorSelector'],
                "podTargetLabels": ext.spec['podTargetLabels'],
                "portName": ext.spec['portName'],
                "priorityClassName": ext.spec['priorityClassName'],
                "probeNamespaceSelector": ext.spec['probeNamespaceSelector'],
                "probeSelector": ext.spec['probeSelector'],
                "prometheusExternalLabelName": ext.spec['prometheusExternalLabelName'],
                "remoteWrite": ext.spec['remoteWrite'],
                "replicaExternalLabelName": ext.spec['replicaExternalLabelName'],
                "replicas": ext.spec['replicas'],
                "resources": ext.spec['resources'],
                "routePrefix": ext.spec['routePrefix'],
                "scrapeConfigNamespaceSelector": ext.spec['scrapeConfigNamespaceSelector'],
                "scrapeConfigSelector": ext.spec['scrapeConfigSelector'],
                "scrapeInterval": ext.spec['scrapeInterval'],
                "scrapeTimeout": ext.spec['scrapeTimeout'],
                "secrets": ext.spec['secrets'],
                "securityContext": ext.spec['securityContext'],
                "serviceAccountName": ext.spec['serviceAccountName'],
                "serviceMonitorNamespaceSelector": ext.spec['serviceMonitorNamespaceSelector'],
                "serviceMonitorSelector": ext.spec['serviceMonitorSelector'],
                "shards": ext.spec['shards'],
                "storage": ext.spec['storage'],
                "tolerations": ext.spec['tolerations'],
                "topologySpreadConstraints": ext.spec['topologySpreadConstraints'],
                "version": ext.spec['version'],
                "volumeMounts": ext.spec['volumeMounts'],
                "volumes": ext.spec['volumes'],
                "walCompression": ext.spec['walCompression'],
                "web": ext.spec['web'],
                status: ext.status==undefined?null:{
                    "availableReplicas": ext.status['availableReplicas'],
                    "conditions": ext.status['conditions'],
                    "paused": ext.status['paused'],
                    "replicas": ext.status['replicas'],
                    "shardStatuses": ext.status['shardStatuses'],
                    "unavailableReplicas": ext.status['unavailableReplicas'],
                    "updatedReplicas": ext.status['updatedReplicas'],
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    deleteMonitoringPrometheusAgent: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteNamespacedCustomObject('monitoring.coreos.com','v1alpha1',args['namespace'],'prometheusagents', args['name'])
        const ext = res.body as MonitoringPrometheusAgent
        return {
            metadata: getMetadata(ext.metadata),
            "additionalArgs": ext.spec['additionalArgs'],
            "additionalScrapeConfigs": ext.spec['additionalScrapeConfigs'],
            "affinity": ext.spec['affinity'],
            "apiserverConfig": ext.spec['apiserverConfig'],
            "arbitraryFSAccessThroughSMs": ext.spec['arbitraryFSAccessThroughSMs'],
            "configMaps": ext.spec['configMaps'],
            "containers": ext.spec['containers'],
            "enableFeatures": ext.spec['enableFeatures'],
            "enableRemoteWriteReceiver": ext.spec['enableRemoteWriteReceiver'],
            "enforcedBodySizeLimit": ext.spec['enforcedBodySizeLimit'],
            "enforcedLabelLimit": ext.spec['enforcedLabelLimit'],
            "enforcedLabelNameLengthLimit": ext.spec['enforcedLabelNameLengthLimit'],
            "enforcedLabelValueLengthLimit": ext.spec['enforcedLabelValueLengthLimit'],
            "enforcedNamespaceLabel": ext.spec['enforcedNamespaceLabel'],
            "enforcedSampleLimit": ext.spec['enforcedSampleLimit'],
            "enforcedTargetLimit": ext.spec['enforcedTargetLimit'],
            "excludedFromEnforcement": ext.spec['excludedFromEnforcement'],
            "externalLabels": ext.spec['externalLabels'],
            "externalUrl": ext.spec['externalUrl'],
            "hostAliases": ext.spec['hostAliases'],
            "hostNetwork": ext.spec['hostNetwork'],
            "ignoreNamespaceSelectors": ext.spec['ignoreNamespaceSelectors'],
            "image": ext.spec['image'],
            "imagePullPolicy": ext.spec['imagePullPolicy'],
            "imagePullSecrets": ext.spec['imagePullSecrets'],
            "initContainers": ext.spec['initContainers'],
            "listenLocal": ext.spec['listenLocal'],
            "logFormat": ext.spec['logFormat'],
            "logLevel": ext.spec['logLevel'],
            "minReadySeconds": ext.spec['minReadySeconds'],
            "nodeSelector": ext.spec['nodeSelector'],
            "overrideHonorLabels": ext.spec['overrideHonorLabels'],
            "overrideHonorTimestamps": ext.spec['overrideHonorTimestamps'],
            "paused": ext.spec['paused'],
            "podMetadata": ext.spec['podMetadata'],
            "podMonitorNamespaceSelector": ext.spec['podMonitorNamespaceSelector'],
            "podMonitorSelector": ext.spec['podMonitorSelector'],
            "podTargetLabels": ext.spec['podTargetLabels'],
            "portName": ext.spec['portName'],
            "priorityClassName": ext.spec['priorityClassName'],
            "probeNamespaceSelector": ext.spec['probeNamespaceSelector'],
            "probeSelector": ext.spec['probeSelector'],
            "prometheusExternalLabelName": ext.spec['prometheusExternalLabelName'],
            "remoteWrite": ext.spec['remoteWrite'],
            "replicaExternalLabelName": ext.spec['replicaExternalLabelName'],
            "replicas": ext.spec['replicas'],
            "resources": ext.spec['resources'],
            "routePrefix": ext.spec['routePrefix'],
            "scrapeConfigNamespaceSelector": ext.spec['scrapeConfigNamespaceSelector'],
            "scrapeConfigSelector": ext.spec['scrapeConfigSelector'],
            "scrapeInterval": ext.spec['scrapeInterval'],
            "scrapeTimeout": ext.spec['scrapeTimeout'],
            "secrets": ext.spec['secrets'],
            "securityContext": ext.spec['securityContext'],
            "serviceAccountName": ext.spec['serviceAccountName'],
            "serviceMonitorNamespaceSelector": ext.spec['serviceMonitorNamespaceSelector'],
            "serviceMonitorSelector": ext.spec['serviceMonitorSelector'],
            "shards": ext.spec['shards'],
            "storage": ext.spec['storage'],
            "tolerations": ext.spec['tolerations'],
            "topologySpreadConstraints": ext.spec['topologySpreadConstraints'],
            "version": ext.spec['version'],
            "volumeMounts": ext.spec['volumeMounts'],
            "volumes": ext.spec['volumes'],
            "walCompression": ext.spec['walCompression'],
            "web": ext.spec['web'],
            status: ext.status==undefined?null:{
                "availableReplicas": ext.status['availableReplicas'],
                "conditions": ext.status['conditions'],
                "paused": ext.status['paused'],
                "replicas": ext.status['replicas'],
                "shardStatuses": ext.status['shardStatuses'],
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
