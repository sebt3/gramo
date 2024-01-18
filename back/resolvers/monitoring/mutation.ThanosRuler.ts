import {kc, k8s, getMetadata} from '../core/libs.js';
import { MonitoringThanosRuler } from './type.ThanosRuler.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createMonitoringThanosRuler: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['additionalArgs'] !== undefined && Array.isArray(args['spec']['additionalArgs'])) spec['additionalArgs'] = args['spec']['additionalArgs'];
        if (args['spec']['affinity'] !== undefined && typeof args['spec']['affinity'] == 'object') spec['affinity'] = args['spec']['affinity'];
        if (args['spec']['alertDropLabels'] !== undefined && Array.isArray(args['spec']['alertDropLabels'])) spec['alertDropLabels'] = args['spec']['alertDropLabels'];
        if (args['spec']['alertQueryUrl'] !== undefined && typeof args['spec']['alertQueryUrl'] == 'string') spec['alertQueryUrl'] = args['spec']['alertQueryUrl'];
        if (args['spec']['alertRelabelConfigFile'] !== undefined && typeof args['spec']['alertRelabelConfigFile'] == 'string') spec['alertRelabelConfigFile'] = args['spec']['alertRelabelConfigFile'];
        if (args['spec']['alertRelabelConfigs'] !== undefined && typeof args['spec']['alertRelabelConfigs'] == 'object') spec['alertRelabelConfigs'] = args['spec']['alertRelabelConfigs'];
        if (args['spec']['alertmanagersConfig'] !== undefined && typeof args['spec']['alertmanagersConfig'] == 'object') spec['alertmanagersConfig'] = args['spec']['alertmanagersConfig'];
        if (args['spec']['alertmanagersUrl'] !== undefined && Array.isArray(args['spec']['alertmanagersUrl'])) spec['alertmanagersUrl'] = args['spec']['alertmanagersUrl'];
        if (args['spec']['containers'] !== undefined && Array.isArray(args['spec']['containers'])) spec['containers'] = args['spec']['containers'];
        if (args['spec']['enforcedNamespaceLabel'] !== undefined && typeof args['spec']['enforcedNamespaceLabel'] == 'string') spec['enforcedNamespaceLabel'] = args['spec']['enforcedNamespaceLabel'];
        if (args['spec']['evaluationInterval'] !== undefined && typeof args['spec']['evaluationInterval'] == 'string') spec['evaluationInterval'] = args['spec']['evaluationInterval'];
        if (args['spec']['excludedFromEnforcement'] !== undefined && Array.isArray(args['spec']['excludedFromEnforcement'])) spec['excludedFromEnforcement'] = args['spec']['excludedFromEnforcement'];
        if (args['spec']['externalPrefix'] !== undefined && typeof args['spec']['externalPrefix'] == 'string') spec['externalPrefix'] = args['spec']['externalPrefix'];
        if (args['spec']['grpcServerTlsConfig'] !== undefined && typeof args['spec']['grpcServerTlsConfig'] == 'object') spec['grpcServerTlsConfig'] = args['spec']['grpcServerTlsConfig'];
        if (args['spec']['hostAliases'] !== undefined && Array.isArray(args['spec']['hostAliases'])) spec['hostAliases'] = args['spec']['hostAliases'];
        if (args['spec']['image'] !== undefined && typeof args['spec']['image'] == 'string') spec['image'] = args['spec']['image'];
        if (args['spec']['imagePullPolicy'] !== undefined && typeof args['spec']['imagePullPolicy'] == 'string') spec['imagePullPolicy'] = args['spec']['imagePullPolicy'];
        if (args['spec']['imagePullSecrets'] !== undefined && Array.isArray(args['spec']['imagePullSecrets'])) spec['imagePullSecrets'] = args['spec']['imagePullSecrets'];
        if (args['spec']['initContainers'] !== undefined && Array.isArray(args['spec']['initContainers'])) spec['initContainers'] = args['spec']['initContainers'];
        if (args['spec']['labels'] !== undefined && typeof args['spec']['labels'] == 'object') spec['labels'] = args['spec']['labels'];
        if (args['spec']['listenLocal'] !== undefined && typeof args['spec']['listenLocal'] == 'boolean') spec['listenLocal'] = args['spec']['listenLocal'];
        if (args['spec']['logFormat'] !== undefined && typeof args['spec']['logFormat'] == 'string') spec['logFormat'] = args['spec']['logFormat'];
        if (args['spec']['logLevel'] !== undefined && typeof args['spec']['logLevel'] == 'string') spec['logLevel'] = args['spec']['logLevel'];
        if (args['spec']['minReadySeconds'] !== undefined && typeof args['spec']['minReadySeconds'] == 'number') spec['minReadySeconds'] = args['spec']['minReadySeconds'];
        if (args['spec']['nodeSelector'] !== undefined && typeof args['spec']['nodeSelector'] == 'object') spec['nodeSelector'] = args['spec']['nodeSelector'];
        if (args['spec']['objectStorageConfig'] !== undefined && typeof args['spec']['objectStorageConfig'] == 'object') spec['objectStorageConfig'] = args['spec']['objectStorageConfig'];
        if (args['spec']['objectStorageConfigFile'] !== undefined && typeof args['spec']['objectStorageConfigFile'] == 'string') spec['objectStorageConfigFile'] = args['spec']['objectStorageConfigFile'];
        if (args['spec']['paused'] !== undefined && typeof args['spec']['paused'] == 'boolean') spec['paused'] = args['spec']['paused'];
        if (args['spec']['podMetadata'] !== undefined && typeof args['spec']['podMetadata'] == 'object') spec['podMetadata'] = args['spec']['podMetadata'];
        if (args['spec']['portName'] !== undefined && typeof args['spec']['portName'] == 'string') spec['portName'] = args['spec']['portName'];
        if (args['spec']['priorityClassName'] !== undefined && typeof args['spec']['priorityClassName'] == 'string') spec['priorityClassName'] = args['spec']['priorityClassName'];
        if (args['spec']['prometheusRulesExcludedFromEnforce'] !== undefined && Array.isArray(args['spec']['prometheusRulesExcludedFromEnforce'])) spec['prometheusRulesExcludedFromEnforce'] = args['spec']['prometheusRulesExcludedFromEnforce'];
        if (args['spec']['queryConfig'] !== undefined && typeof args['spec']['queryConfig'] == 'object') spec['queryConfig'] = args['spec']['queryConfig'];
        if (args['spec']['queryEndpoints'] !== undefined && Array.isArray(args['spec']['queryEndpoints'])) spec['queryEndpoints'] = args['spec']['queryEndpoints'];
        if (args['spec']['replicas'] !== undefined && typeof args['spec']['replicas'] == 'number') spec['replicas'] = args['spec']['replicas'];
        if (args['spec']['resources'] !== undefined && typeof args['spec']['resources'] == 'object') spec['resources'] = args['spec']['resources'];
        if (args['spec']['retention'] !== undefined && typeof args['spec']['retention'] == 'string') spec['retention'] = args['spec']['retention'];
        if (args['spec']['routePrefix'] !== undefined && typeof args['spec']['routePrefix'] == 'string') spec['routePrefix'] = args['spec']['routePrefix'];
        if (args['spec']['ruleNamespaceSelector'] !== undefined && typeof args['spec']['ruleNamespaceSelector'] == 'object') spec['ruleNamespaceSelector'] = args['spec']['ruleNamespaceSelector'];
        if (args['spec']['ruleSelector'] !== undefined && typeof args['spec']['ruleSelector'] == 'object') spec['ruleSelector'] = args['spec']['ruleSelector'];
        if (args['spec']['securityContext'] !== undefined && typeof args['spec']['securityContext'] == 'object') spec['securityContext'] = args['spec']['securityContext'];
        if (args['spec']['serviceAccountName'] !== undefined && typeof args['spec']['serviceAccountName'] == 'string') spec['serviceAccountName'] = args['spec']['serviceAccountName'];
        if (args['spec']['storage'] !== undefined && typeof args['spec']['storage'] == 'object') spec['storage'] = args['spec']['storage'];
        if (args['spec']['tolerations'] !== undefined && Array.isArray(args['spec']['tolerations'])) spec['tolerations'] = args['spec']['tolerations'];
        if (args['spec']['topologySpreadConstraints'] !== undefined && Array.isArray(args['spec']['topologySpreadConstraints'])) spec['topologySpreadConstraints'] = args['spec']['topologySpreadConstraints'];
        if (args['spec']['tracingConfig'] !== undefined && typeof args['spec']['tracingConfig'] == 'object') spec['tracingConfig'] = args['spec']['tracingConfig'];
        if (args['spec']['tracingConfigFile'] !== undefined && typeof args['spec']['tracingConfigFile'] == 'string') spec['tracingConfigFile'] = args['spec']['tracingConfigFile'];
        if (args['spec']['version'] !== undefined && typeof args['spec']['version'] == 'string') spec['version'] = args['spec']['version'];
        if (args['spec']['volumes'] !== undefined && Array.isArray(args['spec']['volumes'])) spec['volumes'] = args['spec']['volumes'];
        const payload = {
            apiVersion: 'monitoring.coreos.com/v1',
            kind: 'ThanosRuler',
            metadata: {
              namespace: args['namespace'],
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createNamespacedCustomObject('monitoring.coreos.com','v1',args['namespace'],'thanosrulers', payload)
            const ext = res.body as MonitoringThanosRuler
            return {
                metadata: getMetadata(ext.metadata),
                additionalArgs: ext.spec.additionalArgs,
                affinity: ext.spec.affinity,
                alertDropLabels: ext.spec.alertDropLabels,
                alertQueryUrl: ext.spec.alertQueryUrl,
                alertRelabelConfigFile: ext.spec.alertRelabelConfigFile,
                alertRelabelConfigs: ext.spec.alertRelabelConfigs,
                alertmanagersConfig: ext.spec.alertmanagersConfig,
                alertmanagersUrl: ext.spec.alertmanagersUrl,
                containers: ext.spec.containers,
                enforcedNamespaceLabel: ext.spec.enforcedNamespaceLabel,
                evaluationInterval: ext.spec.evaluationInterval,
                excludedFromEnforcement: ext.spec.excludedFromEnforcement,
                externalPrefix: ext.spec.externalPrefix,
                grpcServerTlsConfig: ext.spec.grpcServerTlsConfig,
                hostAliases: ext.spec.hostAliases,
                image: ext.spec.image,
                imagePullPolicy: ext.spec.imagePullPolicy,
                imagePullSecrets: ext.spec.imagePullSecrets,
                initContainers: ext.spec.initContainers,
                labels: ext.spec.labels,
                listenLocal: ext.spec.listenLocal,
                logFormat: ext.spec.logFormat,
                logLevel: ext.spec.logLevel,
                minReadySeconds: ext.spec.minReadySeconds,
                nodeSelector: ext.spec.nodeSelector,
                objectStorageConfig: ext.spec.objectStorageConfig,
                objectStorageConfigFile: ext.spec.objectStorageConfigFile,
                paused: ext.spec.paused,
                podMetadata: ext.spec.podMetadata,
                portName: ext.spec.portName,
                priorityClassName: ext.spec.priorityClassName,
                prometheusRulesExcludedFromEnforce: ext.spec.prometheusRulesExcludedFromEnforce,
                queryConfig: ext.spec.queryConfig,
                queryEndpoints: ext.spec.queryEndpoints,
                replicas: ext.spec.replicas,
                resources: ext.spec.resources,
                retention: ext.spec.retention,
                routePrefix: ext.spec.routePrefix,
                ruleNamespaceSelector: ext.spec.ruleNamespaceSelector,
                ruleSelector: ext.spec.ruleSelector,
                securityContext: ext.spec.securityContext,
                serviceAccountName: ext.spec.serviceAccountName,
                storage: ext.spec.storage,
                tolerations: ext.spec.tolerations,
                topologySpreadConstraints: ext.spec.topologySpreadConstraints,
                tracingConfig: ext.spec.tracingConfig,
                tracingConfigFile: ext.spec.tracingConfigFile,
                version: ext.spec.version,
                volumes: ext.spec.volumes,
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
    patchMonitoringThanosRuler: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['additionalArgs'] !== undefined && Array.isArray(args['spec']['additionalArgs'])) spec['additionalArgs'] = args['spec']['additionalArgs'];
        if (args['spec']['affinity'] !== undefined && typeof args['spec']['affinity'] == 'object') spec['affinity'] = args['spec']['affinity'];
        if (args['spec']['alertDropLabels'] !== undefined && Array.isArray(args['spec']['alertDropLabels'])) spec['alertDropLabels'] = args['spec']['alertDropLabels'];
        if (args['spec']['alertQueryUrl'] !== undefined && typeof args['spec']['alertQueryUrl'] == 'string') spec['alertQueryUrl'] = args['spec']['alertQueryUrl'];
        if (args['spec']['alertRelabelConfigFile'] !== undefined && typeof args['spec']['alertRelabelConfigFile'] == 'string') spec['alertRelabelConfigFile'] = args['spec']['alertRelabelConfigFile'];
        if (args['spec']['alertRelabelConfigs'] !== undefined && typeof args['spec']['alertRelabelConfigs'] == 'object') spec['alertRelabelConfigs'] = args['spec']['alertRelabelConfigs'];
        if (args['spec']['alertmanagersConfig'] !== undefined && typeof args['spec']['alertmanagersConfig'] == 'object') spec['alertmanagersConfig'] = args['spec']['alertmanagersConfig'];
        if (args['spec']['alertmanagersUrl'] !== undefined && Array.isArray(args['spec']['alertmanagersUrl'])) spec['alertmanagersUrl'] = args['spec']['alertmanagersUrl'];
        if (args['spec']['containers'] !== undefined && Array.isArray(args['spec']['containers'])) spec['containers'] = args['spec']['containers'];
        if (args['spec']['enforcedNamespaceLabel'] !== undefined && typeof args['spec']['enforcedNamespaceLabel'] == 'string') spec['enforcedNamespaceLabel'] = args['spec']['enforcedNamespaceLabel'];
        if (args['spec']['evaluationInterval'] !== undefined && typeof args['spec']['evaluationInterval'] == 'string') spec['evaluationInterval'] = args['spec']['evaluationInterval'];
        if (args['spec']['excludedFromEnforcement'] !== undefined && Array.isArray(args['spec']['excludedFromEnforcement'])) spec['excludedFromEnforcement'] = args['spec']['excludedFromEnforcement'];
        if (args['spec']['externalPrefix'] !== undefined && typeof args['spec']['externalPrefix'] == 'string') spec['externalPrefix'] = args['spec']['externalPrefix'];
        if (args['spec']['grpcServerTlsConfig'] !== undefined && typeof args['spec']['grpcServerTlsConfig'] == 'object') spec['grpcServerTlsConfig'] = args['spec']['grpcServerTlsConfig'];
        if (args['spec']['hostAliases'] !== undefined && Array.isArray(args['spec']['hostAliases'])) spec['hostAliases'] = args['spec']['hostAliases'];
        if (args['spec']['image'] !== undefined && typeof args['spec']['image'] == 'string') spec['image'] = args['spec']['image'];
        if (args['spec']['imagePullPolicy'] !== undefined && typeof args['spec']['imagePullPolicy'] == 'string') spec['imagePullPolicy'] = args['spec']['imagePullPolicy'];
        if (args['spec']['imagePullSecrets'] !== undefined && Array.isArray(args['spec']['imagePullSecrets'])) spec['imagePullSecrets'] = args['spec']['imagePullSecrets'];
        if (args['spec']['initContainers'] !== undefined && Array.isArray(args['spec']['initContainers'])) spec['initContainers'] = args['spec']['initContainers'];
        if (args['spec']['labels'] !== undefined && typeof args['spec']['labels'] == 'object') spec['labels'] = args['spec']['labels'];
        if (args['spec']['listenLocal'] !== undefined && typeof args['spec']['listenLocal'] == 'boolean') spec['listenLocal'] = args['spec']['listenLocal'];
        if (args['spec']['logFormat'] !== undefined && typeof args['spec']['logFormat'] == 'string') spec['logFormat'] = args['spec']['logFormat'];
        if (args['spec']['logLevel'] !== undefined && typeof args['spec']['logLevel'] == 'string') spec['logLevel'] = args['spec']['logLevel'];
        if (args['spec']['minReadySeconds'] !== undefined && typeof args['spec']['minReadySeconds'] == 'number') spec['minReadySeconds'] = args['spec']['minReadySeconds'];
        if (args['spec']['nodeSelector'] !== undefined && typeof args['spec']['nodeSelector'] == 'object') spec['nodeSelector'] = args['spec']['nodeSelector'];
        if (args['spec']['objectStorageConfig'] !== undefined && typeof args['spec']['objectStorageConfig'] == 'object') spec['objectStorageConfig'] = args['spec']['objectStorageConfig'];
        if (args['spec']['objectStorageConfigFile'] !== undefined && typeof args['spec']['objectStorageConfigFile'] == 'string') spec['objectStorageConfigFile'] = args['spec']['objectStorageConfigFile'];
        if (args['spec']['paused'] !== undefined && typeof args['spec']['paused'] == 'boolean') spec['paused'] = args['spec']['paused'];
        if (args['spec']['podMetadata'] !== undefined && typeof args['spec']['podMetadata'] == 'object') spec['podMetadata'] = args['spec']['podMetadata'];
        if (args['spec']['portName'] !== undefined && typeof args['spec']['portName'] == 'string') spec['portName'] = args['spec']['portName'];
        if (args['spec']['priorityClassName'] !== undefined && typeof args['spec']['priorityClassName'] == 'string') spec['priorityClassName'] = args['spec']['priorityClassName'];
        if (args['spec']['prometheusRulesExcludedFromEnforce'] !== undefined && Array.isArray(args['spec']['prometheusRulesExcludedFromEnforce'])) spec['prometheusRulesExcludedFromEnforce'] = args['spec']['prometheusRulesExcludedFromEnforce'];
        if (args['spec']['queryConfig'] !== undefined && typeof args['spec']['queryConfig'] == 'object') spec['queryConfig'] = args['spec']['queryConfig'];
        if (args['spec']['queryEndpoints'] !== undefined && Array.isArray(args['spec']['queryEndpoints'])) spec['queryEndpoints'] = args['spec']['queryEndpoints'];
        if (args['spec']['replicas'] !== undefined && typeof args['spec']['replicas'] == 'number') spec['replicas'] = args['spec']['replicas'];
        if (args['spec']['resources'] !== undefined && typeof args['spec']['resources'] == 'object') spec['resources'] = args['spec']['resources'];
        if (args['spec']['retention'] !== undefined && typeof args['spec']['retention'] == 'string') spec['retention'] = args['spec']['retention'];
        if (args['spec']['routePrefix'] !== undefined && typeof args['spec']['routePrefix'] == 'string') spec['routePrefix'] = args['spec']['routePrefix'];
        if (args['spec']['ruleNamespaceSelector'] !== undefined && typeof args['spec']['ruleNamespaceSelector'] == 'object') spec['ruleNamespaceSelector'] = args['spec']['ruleNamespaceSelector'];
        if (args['spec']['ruleSelector'] !== undefined && typeof args['spec']['ruleSelector'] == 'object') spec['ruleSelector'] = args['spec']['ruleSelector'];
        if (args['spec']['securityContext'] !== undefined && typeof args['spec']['securityContext'] == 'object') spec['securityContext'] = args['spec']['securityContext'];
        if (args['spec']['serviceAccountName'] !== undefined && typeof args['spec']['serviceAccountName'] == 'string') spec['serviceAccountName'] = args['spec']['serviceAccountName'];
        if (args['spec']['storage'] !== undefined && typeof args['spec']['storage'] == 'object') spec['storage'] = args['spec']['storage'];
        if (args['spec']['tolerations'] !== undefined && Array.isArray(args['spec']['tolerations'])) spec['tolerations'] = args['spec']['tolerations'];
        if (args['spec']['topologySpreadConstraints'] !== undefined && Array.isArray(args['spec']['topologySpreadConstraints'])) spec['topologySpreadConstraints'] = args['spec']['topologySpreadConstraints'];
        if (args['spec']['tracingConfig'] !== undefined && typeof args['spec']['tracingConfig'] == 'object') spec['tracingConfig'] = args['spec']['tracingConfig'];
        if (args['spec']['tracingConfigFile'] !== undefined && typeof args['spec']['tracingConfigFile'] == 'string') spec['tracingConfigFile'] = args['spec']['tracingConfigFile'];
        if (args['spec']['version'] !== undefined && typeof args['spec']['version'] == 'string') spec['version'] = args['spec']['version'];
        if (args['spec']['volumes'] !== undefined && Array.isArray(args['spec']['volumes'])) spec['volumes'] = args['spec']['volumes'];
        const request = {
            apiVersion: 'monitoring.coreos.com/v1',
            kind: 'ThanosRuler',
            metadata: {
                namespace: args['namespace'],
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getNamespacedCustomObject('monitoring.coreos.com','v1',args['namespace'],'thanosrulers', args['name'])
            const extGet = resGet.body as MonitoringThanosRuler
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchNamespacedCustomObject('monitoring.coreos.com','v1',args['namespace'],'thanosrulers', args['name'], payload, undefined, undefined, undefined, options)
            const ext = res.body as MonitoringThanosRuler
            return {
                metadata: getMetadata(ext.metadata),
                additionalArgs: ext.spec.additionalArgs,
                affinity: ext.spec.affinity,
                alertDropLabels: ext.spec.alertDropLabels,
                alertQueryUrl: ext.spec.alertQueryUrl,
                alertRelabelConfigFile: ext.spec.alertRelabelConfigFile,
                alertRelabelConfigs: ext.spec.alertRelabelConfigs,
                alertmanagersConfig: ext.spec.alertmanagersConfig,
                alertmanagersUrl: ext.spec.alertmanagersUrl,
                containers: ext.spec.containers,
                enforcedNamespaceLabel: ext.spec.enforcedNamespaceLabel,
                evaluationInterval: ext.spec.evaluationInterval,
                excludedFromEnforcement: ext.spec.excludedFromEnforcement,
                externalPrefix: ext.spec.externalPrefix,
                grpcServerTlsConfig: ext.spec.grpcServerTlsConfig,
                hostAliases: ext.spec.hostAliases,
                image: ext.spec.image,
                imagePullPolicy: ext.spec.imagePullPolicy,
                imagePullSecrets: ext.spec.imagePullSecrets,
                initContainers: ext.spec.initContainers,
                labels: ext.spec.labels,
                listenLocal: ext.spec.listenLocal,
                logFormat: ext.spec.logFormat,
                logLevel: ext.spec.logLevel,
                minReadySeconds: ext.spec.minReadySeconds,
                nodeSelector: ext.spec.nodeSelector,
                objectStorageConfig: ext.spec.objectStorageConfig,
                objectStorageConfigFile: ext.spec.objectStorageConfigFile,
                paused: ext.spec.paused,
                podMetadata: ext.spec.podMetadata,
                portName: ext.spec.portName,
                priorityClassName: ext.spec.priorityClassName,
                prometheusRulesExcludedFromEnforce: ext.spec.prometheusRulesExcludedFromEnforce,
                queryConfig: ext.spec.queryConfig,
                queryEndpoints: ext.spec.queryEndpoints,
                replicas: ext.spec.replicas,
                resources: ext.spec.resources,
                retention: ext.spec.retention,
                routePrefix: ext.spec.routePrefix,
                ruleNamespaceSelector: ext.spec.ruleNamespaceSelector,
                ruleSelector: ext.spec.ruleSelector,
                securityContext: ext.spec.securityContext,
                serviceAccountName: ext.spec.serviceAccountName,
                storage: ext.spec.storage,
                tolerations: ext.spec.tolerations,
                topologySpreadConstraints: ext.spec.topologySpreadConstraints,
                tracingConfig: ext.spec.tracingConfig,
                tracingConfigFile: ext.spec.tracingConfigFile,
                version: ext.spec.version,
                volumes: ext.spec.volumes,
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
    deleteMonitoringThanosRuler: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteNamespacedCustomObject('monitoring.coreos.com','v1',args['namespace'],'thanosrulers', args['name'])
        const ext = res.body as MonitoringThanosRuler
        return {
            metadata: getMetadata(ext.metadata),
            additionalArgs: ext.spec.additionalArgs,
            affinity: ext.spec.affinity,
            alertDropLabels: ext.spec.alertDropLabels,
            alertQueryUrl: ext.spec.alertQueryUrl,
            alertRelabelConfigFile: ext.spec.alertRelabelConfigFile,
            alertRelabelConfigs: ext.spec.alertRelabelConfigs,
            alertmanagersConfig: ext.spec.alertmanagersConfig,
            alertmanagersUrl: ext.spec.alertmanagersUrl,
            containers: ext.spec.containers,
            enforcedNamespaceLabel: ext.spec.enforcedNamespaceLabel,
            evaluationInterval: ext.spec.evaluationInterval,
            excludedFromEnforcement: ext.spec.excludedFromEnforcement,
            externalPrefix: ext.spec.externalPrefix,
            grpcServerTlsConfig: ext.spec.grpcServerTlsConfig,
            hostAliases: ext.spec.hostAliases,
            image: ext.spec.image,
            imagePullPolicy: ext.spec.imagePullPolicy,
            imagePullSecrets: ext.spec.imagePullSecrets,
            initContainers: ext.spec.initContainers,
            labels: ext.spec.labels,
            listenLocal: ext.spec.listenLocal,
            logFormat: ext.spec.logFormat,
            logLevel: ext.spec.logLevel,
            minReadySeconds: ext.spec.minReadySeconds,
            nodeSelector: ext.spec.nodeSelector,
            objectStorageConfig: ext.spec.objectStorageConfig,
            objectStorageConfigFile: ext.spec.objectStorageConfigFile,
            paused: ext.spec.paused,
            podMetadata: ext.spec.podMetadata,
            portName: ext.spec.portName,
            priorityClassName: ext.spec.priorityClassName,
            prometheusRulesExcludedFromEnforce: ext.spec.prometheusRulesExcludedFromEnforce,
            queryConfig: ext.spec.queryConfig,
            queryEndpoints: ext.spec.queryEndpoints,
            replicas: ext.spec.replicas,
            resources: ext.spec.resources,
            retention: ext.spec.retention,
            routePrefix: ext.spec.routePrefix,
            ruleNamespaceSelector: ext.spec.ruleNamespaceSelector,
            ruleSelector: ext.spec.ruleSelector,
            securityContext: ext.spec.securityContext,
            serviceAccountName: ext.spec.serviceAccountName,
            storage: ext.spec.storage,
            tolerations: ext.spec.tolerations,
            topologySpreadConstraints: ext.spec.topologySpreadConstraints,
            tracingConfig: ext.spec.tracingConfig,
            tracingConfigFile: ext.spec.tracingConfigFile,
            version: ext.spec.version,
            volumes: ext.spec.volumes,
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
