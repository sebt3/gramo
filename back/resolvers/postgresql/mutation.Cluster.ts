import {kc, k8s, getMetadata} from '../core/libs.js';
import { PostgresqlCluster } from './type.Cluster.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createPostgresqlCluster: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['affinity'] !== undefined && typeof args['spec']['affinity'] == 'object') spec['affinity'] = args['spec']['affinity'];
        if (args['spec']['backup'] !== undefined && typeof args['spec']['backup'] == 'object') spec['backup'] = args['spec']['backup'];
        if (args['spec']['bootstrap'] !== undefined && typeof args['spec']['bootstrap'] == 'object') spec['bootstrap'] = args['spec']['bootstrap'];
        if (args['spec']['certificates'] !== undefined && typeof args['spec']['certificates'] == 'object') spec['certificates'] = args['spec']['certificates'];
        if (args['spec']['description'] !== undefined && typeof args['spec']['description'] == 'string') spec['description'] = args['spec']['description'];
        if (args['spec']['enableSuperuserAccess'] !== undefined && typeof args['spec']['enableSuperuserAccess'] == 'boolean') spec['enableSuperuserAccess'] = args['spec']['enableSuperuserAccess'];
        if (args['spec']['env'] !== undefined && Array.isArray(args['spec']['env'])) spec['env'] = args['spec']['env'];
        if (args['spec']['envFrom'] !== undefined && Array.isArray(args['spec']['envFrom'])) spec['envFrom'] = args['spec']['envFrom'];
        if (args['spec']['externalClusters'] !== undefined && Array.isArray(args['spec']['externalClusters'])) spec['externalClusters'] = args['spec']['externalClusters'];
        if (args['spec']['failoverDelay'] !== undefined && typeof args['spec']['failoverDelay'] == 'number') spec['failoverDelay'] = args['spec']['failoverDelay'];
        if (args['spec']['imageName'] !== undefined && typeof args['spec']['imageName'] == 'string') spec['imageName'] = args['spec']['imageName'];
        if (args['spec']['imagePullPolicy'] !== undefined && typeof args['spec']['imagePullPolicy'] == 'string') spec['imagePullPolicy'] = args['spec']['imagePullPolicy'];
        if (args['spec']['imagePullSecrets'] !== undefined && Array.isArray(args['spec']['imagePullSecrets'])) spec['imagePullSecrets'] = args['spec']['imagePullSecrets'];
        if (args['spec']['inheritedMetadata'] !== undefined && typeof args['spec']['inheritedMetadata'] == 'object') spec['inheritedMetadata'] = args['spec']['inheritedMetadata'];
        spec['instances'] = args['spec']['instances'];
        if (args['spec']['logLevel'] !== undefined && typeof args['spec']['logLevel'] == 'string') spec['logLevel'] = args['spec']['logLevel'];
        if (args['spec']['managed'] !== undefined && typeof args['spec']['managed'] == 'object') spec['managed'] = args['spec']['managed'];
        if (args['spec']['maxSyncReplicas'] !== undefined && typeof args['spec']['maxSyncReplicas'] == 'number') spec['maxSyncReplicas'] = args['spec']['maxSyncReplicas'];
        if (args['spec']['minSyncReplicas'] !== undefined && typeof args['spec']['minSyncReplicas'] == 'number') spec['minSyncReplicas'] = args['spec']['minSyncReplicas'];
        if (args['spec']['monitoring'] !== undefined && typeof args['spec']['monitoring'] == 'object') spec['monitoring'] = args['spec']['monitoring'];
        if (args['spec']['nodeMaintenanceWindow'] !== undefined && typeof args['spec']['nodeMaintenanceWindow'] == 'object') spec['nodeMaintenanceWindow'] = args['spec']['nodeMaintenanceWindow'];
        if (args['spec']['postgresGID'] !== undefined && typeof args['spec']['postgresGID'] == 'number') spec['postgresGID'] = args['spec']['postgresGID'];
        if (args['spec']['postgresUID'] !== undefined && typeof args['spec']['postgresUID'] == 'number') spec['postgresUID'] = args['spec']['postgresUID'];
        if (args['spec']['postgresql'] !== undefined && typeof args['spec']['postgresql'] == 'object') spec['postgresql'] = args['spec']['postgresql'];
        if (args['spec']['primaryUpdateMethod'] !== undefined && typeof args['spec']['primaryUpdateMethod'] == 'string') spec['primaryUpdateMethod'] = args['spec']['primaryUpdateMethod'];
        if (args['spec']['primaryUpdateStrategy'] !== undefined && typeof args['spec']['primaryUpdateStrategy'] == 'string') spec['primaryUpdateStrategy'] = args['spec']['primaryUpdateStrategy'];
        if (args['spec']['priorityClassName'] !== undefined && typeof args['spec']['priorityClassName'] == 'string') spec['priorityClassName'] = args['spec']['priorityClassName'];
        if (args['spec']['projectedVolumeTemplate'] !== undefined && typeof args['spec']['projectedVolumeTemplate'] == 'object') spec['projectedVolumeTemplate'] = args['spec']['projectedVolumeTemplate'];
        if (args['spec']['replica'] !== undefined && typeof args['spec']['replica'] == 'object') spec['replica'] = args['spec']['replica'];
        if (args['spec']['replicationSlots'] !== undefined && typeof args['spec']['replicationSlots'] == 'object') spec['replicationSlots'] = args['spec']['replicationSlots'];
        if (args['spec']['resources'] !== undefined && typeof args['spec']['resources'] == 'object') spec['resources'] = args['spec']['resources'];
        if (args['spec']['schedulerName'] !== undefined && typeof args['spec']['schedulerName'] == 'string') spec['schedulerName'] = args['spec']['schedulerName'];
        if (args['spec']['seccompProfile'] !== undefined && typeof args['spec']['seccompProfile'] == 'object') spec['seccompProfile'] = args['spec']['seccompProfile'];
        if (args['spec']['serviceAccountTemplate'] !== undefined && typeof args['spec']['serviceAccountTemplate'] == 'object') spec['serviceAccountTemplate'] = args['spec']['serviceAccountTemplate'];
        if (args['spec']['startDelay'] !== undefined && typeof args['spec']['startDelay'] == 'number') spec['startDelay'] = args['spec']['startDelay'];
        if (args['spec']['stopDelay'] !== undefined && typeof args['spec']['stopDelay'] == 'number') spec['stopDelay'] = args['spec']['stopDelay'];
        if (args['spec']['storage'] !== undefined && typeof args['spec']['storage'] == 'object') spec['storage'] = args['spec']['storage'];
        if (args['spec']['superuserSecret'] !== undefined && typeof args['spec']['superuserSecret'] == 'object') spec['superuserSecret'] = args['spec']['superuserSecret'];
        if (args['spec']['switchoverDelay'] !== undefined && typeof args['spec']['switchoverDelay'] == 'number') spec['switchoverDelay'] = args['spec']['switchoverDelay'];
        if (args['spec']['topologySpreadConstraints'] !== undefined && Array.isArray(args['spec']['topologySpreadConstraints'])) spec['topologySpreadConstraints'] = args['spec']['topologySpreadConstraints'];
        if (args['spec']['walStorage'] !== undefined && typeof args['spec']['walStorage'] == 'object') spec['walStorage'] = args['spec']['walStorage'];
        const payload = {
            apiVersion: 'postgresql.cnpg.io/v1',
            kind: 'Cluster',
            metadata: {
              namespace: args['namespace'],
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createNamespacedCustomObject('postgresql.cnpg.io','v1',args['namespace'],'clusters', payload)
            const ext = res.body as PostgresqlCluster
            return {
                metadata: getMetadata(ext.metadata, ext),
                "affinity": ext.spec['affinity'],
                "backup": ext.spec['backup'],
                "bootstrap": ext.spec['bootstrap'],
                "certificates": ext.spec['certificates'],
                "description": ext.spec['description'],
                "enableSuperuserAccess": ext.spec['enableSuperuserAccess'],
                "env": ext.spec['env'],
                "envFrom": ext.spec['envFrom'],
                "externalClusters": ext.spec['externalClusters'],
                "failoverDelay": ext.spec['failoverDelay'],
                "imageName": ext.spec['imageName'],
                "imagePullPolicy": ext.spec['imagePullPolicy'],
                "imagePullSecrets": ext.spec['imagePullSecrets'],
                "inheritedMetadata": ext.spec['inheritedMetadata'],
                "instances": ext.spec['instances'],
                "logLevel": ext.spec['logLevel'],
                "managed": ext.spec['managed'],
                "maxSyncReplicas": ext.spec['maxSyncReplicas'],
                "minSyncReplicas": ext.spec['minSyncReplicas'],
                "monitoring": ext.spec['monitoring'],
                "nodeMaintenanceWindow": ext.spec['nodeMaintenanceWindow'],
                "postgresGID": ext.spec['postgresGID'],
                "postgresUID": ext.spec['postgresUID'],
                "postgresql": ext.spec['postgresql'],
                "primaryUpdateMethod": ext.spec['primaryUpdateMethod'],
                "primaryUpdateStrategy": ext.spec['primaryUpdateStrategy'],
                "priorityClassName": ext.spec['priorityClassName'],
                "projectedVolumeTemplate": ext.spec['projectedVolumeTemplate'],
                "replica": ext.spec['replica'],
                "replicationSlots": ext.spec['replicationSlots'],
                "resources": ext.spec['resources'],
                "schedulerName": ext.spec['schedulerName'],
                "seccompProfile": ext.spec['seccompProfile'],
                "serviceAccountTemplate": ext.spec['serviceAccountTemplate'],
                "startDelay": ext.spec['startDelay'],
                "stopDelay": ext.spec['stopDelay'],
                "storage": ext.spec['storage'],
                "superuserSecret": ext.spec['superuserSecret'],
                "switchoverDelay": ext.spec['switchoverDelay'],
                "topologySpreadConstraints": ext.spec['topologySpreadConstraints'],
                "walStorage": ext.spec['walStorage'],
                status: ext.status==undefined?null:{
                    "azurePVCUpdateEnabled": ext.status['azurePVCUpdateEnabled'],
                    "certificates": ext.status['certificates'],
                    "cloudNativePGCommitHash": ext.status['cloudNativePGCommitHash'],
                    "cloudNativePGOperatorHash": ext.status['cloudNativePGOperatorHash'],
                    "conditions": ext.status['conditions'],
                    "configMapResourceVersion": ext.status['configMapResourceVersion'],
                    "currentPrimary": ext.status['currentPrimary'],
                    "currentPrimaryFailingSinceTimestamp": ext.status['currentPrimaryFailingSinceTimestamp'],
                    "currentPrimaryTimestamp": ext.status['currentPrimaryTimestamp'],
                    "danglingPVC": ext.status['danglingPVC'],
                    "firstRecoverabilityPoint": ext.status['firstRecoverabilityPoint'],
                    "healthyPVC": ext.status['healthyPVC'],
                    "initializingPVC": ext.status['initializingPVC'],
                    "instanceNames": ext.status['instanceNames'],
                    "instances": ext.status['instances'],
                    "instancesReportedState": ext.status['instancesReportedState'],
                    "instancesStatus": ext.status['instancesStatus'],
                    "jobCount": ext.status['jobCount'],
                    "lastFailedBackup": ext.status['lastFailedBackup'],
                    "lastSuccessfulBackup": ext.status['lastSuccessfulBackup'],
                    "latestGeneratedNode": ext.status['latestGeneratedNode'],
                    "managedRolesStatus": ext.status['managedRolesStatus'],
                    "onlineUpdateEnabled": ext.status['onlineUpdateEnabled'],
                    "phase": ext.status['phase'],
                    "phaseReason": ext.status['phaseReason'],
                    "poolerIntegrations": ext.status['poolerIntegrations'],
                    "pvcCount": ext.status['pvcCount'],
                    "readService": ext.status['readService'],
                    "readyInstances": ext.status['readyInstances'],
                    "resizingPVC": ext.status['resizingPVC'],
                    "secretsResourceVersion": ext.status['secretsResourceVersion'],
                    "targetPrimary": ext.status['targetPrimary'],
                    "targetPrimaryTimestamp": ext.status['targetPrimaryTimestamp'],
                    "timelineID": ext.status['timelineID'],
                    "topology": ext.status['topology'],
                    "unusablePVC": ext.status['unusablePVC'],
                    "writeService": ext.status['writeService'],
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    patchPostgresqlCluster: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['affinity'] !== undefined && typeof args['spec']['affinity'] == 'object') spec['affinity'] = args['spec']['affinity'];
        if (args['spec']['backup'] !== undefined && typeof args['spec']['backup'] == 'object') spec['backup'] = args['spec']['backup'];
        if (args['spec']['bootstrap'] !== undefined && typeof args['spec']['bootstrap'] == 'object') spec['bootstrap'] = args['spec']['bootstrap'];
        if (args['spec']['certificates'] !== undefined && typeof args['spec']['certificates'] == 'object') spec['certificates'] = args['spec']['certificates'];
        if (args['spec']['description'] !== undefined && typeof args['spec']['description'] == 'string') spec['description'] = args['spec']['description'];
        if (args['spec']['enableSuperuserAccess'] !== undefined && typeof args['spec']['enableSuperuserAccess'] == 'boolean') spec['enableSuperuserAccess'] = args['spec']['enableSuperuserAccess'];
        if (args['spec']['env'] !== undefined && Array.isArray(args['spec']['env'])) spec['env'] = args['spec']['env'];
        if (args['spec']['envFrom'] !== undefined && Array.isArray(args['spec']['envFrom'])) spec['envFrom'] = args['spec']['envFrom'];
        if (args['spec']['externalClusters'] !== undefined && Array.isArray(args['spec']['externalClusters'])) spec['externalClusters'] = args['spec']['externalClusters'];
        if (args['spec']['failoverDelay'] !== undefined && typeof args['spec']['failoverDelay'] == 'number') spec['failoverDelay'] = args['spec']['failoverDelay'];
        if (args['spec']['imageName'] !== undefined && typeof args['spec']['imageName'] == 'string') spec['imageName'] = args['spec']['imageName'];
        if (args['spec']['imagePullPolicy'] !== undefined && typeof args['spec']['imagePullPolicy'] == 'string') spec['imagePullPolicy'] = args['spec']['imagePullPolicy'];
        if (args['spec']['imagePullSecrets'] !== undefined && Array.isArray(args['spec']['imagePullSecrets'])) spec['imagePullSecrets'] = args['spec']['imagePullSecrets'];
        if (args['spec']['inheritedMetadata'] !== undefined && typeof args['spec']['inheritedMetadata'] == 'object') spec['inheritedMetadata'] = args['spec']['inheritedMetadata'];
        spec['instances'] = args['spec']['instances'];
        if (args['spec']['logLevel'] !== undefined && typeof args['spec']['logLevel'] == 'string') spec['logLevel'] = args['spec']['logLevel'];
        if (args['spec']['managed'] !== undefined && typeof args['spec']['managed'] == 'object') spec['managed'] = args['spec']['managed'];
        if (args['spec']['maxSyncReplicas'] !== undefined && typeof args['spec']['maxSyncReplicas'] == 'number') spec['maxSyncReplicas'] = args['spec']['maxSyncReplicas'];
        if (args['spec']['minSyncReplicas'] !== undefined && typeof args['spec']['minSyncReplicas'] == 'number') spec['minSyncReplicas'] = args['spec']['minSyncReplicas'];
        if (args['spec']['monitoring'] !== undefined && typeof args['spec']['monitoring'] == 'object') spec['monitoring'] = args['spec']['monitoring'];
        if (args['spec']['nodeMaintenanceWindow'] !== undefined && typeof args['spec']['nodeMaintenanceWindow'] == 'object') spec['nodeMaintenanceWindow'] = args['spec']['nodeMaintenanceWindow'];
        if (args['spec']['postgresGID'] !== undefined && typeof args['spec']['postgresGID'] == 'number') spec['postgresGID'] = args['spec']['postgresGID'];
        if (args['spec']['postgresUID'] !== undefined && typeof args['spec']['postgresUID'] == 'number') spec['postgresUID'] = args['spec']['postgresUID'];
        if (args['spec']['postgresql'] !== undefined && typeof args['spec']['postgresql'] == 'object') spec['postgresql'] = args['spec']['postgresql'];
        if (args['spec']['primaryUpdateMethod'] !== undefined && typeof args['spec']['primaryUpdateMethod'] == 'string') spec['primaryUpdateMethod'] = args['spec']['primaryUpdateMethod'];
        if (args['spec']['primaryUpdateStrategy'] !== undefined && typeof args['spec']['primaryUpdateStrategy'] == 'string') spec['primaryUpdateStrategy'] = args['spec']['primaryUpdateStrategy'];
        if (args['spec']['priorityClassName'] !== undefined && typeof args['spec']['priorityClassName'] == 'string') spec['priorityClassName'] = args['spec']['priorityClassName'];
        if (args['spec']['projectedVolumeTemplate'] !== undefined && typeof args['spec']['projectedVolumeTemplate'] == 'object') spec['projectedVolumeTemplate'] = args['spec']['projectedVolumeTemplate'];
        if (args['spec']['replica'] !== undefined && typeof args['spec']['replica'] == 'object') spec['replica'] = args['spec']['replica'];
        if (args['spec']['replicationSlots'] !== undefined && typeof args['spec']['replicationSlots'] == 'object') spec['replicationSlots'] = args['spec']['replicationSlots'];
        if (args['spec']['resources'] !== undefined && typeof args['spec']['resources'] == 'object') spec['resources'] = args['spec']['resources'];
        if (args['spec']['schedulerName'] !== undefined && typeof args['spec']['schedulerName'] == 'string') spec['schedulerName'] = args['spec']['schedulerName'];
        if (args['spec']['seccompProfile'] !== undefined && typeof args['spec']['seccompProfile'] == 'object') spec['seccompProfile'] = args['spec']['seccompProfile'];
        if (args['spec']['serviceAccountTemplate'] !== undefined && typeof args['spec']['serviceAccountTemplate'] == 'object') spec['serviceAccountTemplate'] = args['spec']['serviceAccountTemplate'];
        if (args['spec']['startDelay'] !== undefined && typeof args['spec']['startDelay'] == 'number') spec['startDelay'] = args['spec']['startDelay'];
        if (args['spec']['stopDelay'] !== undefined && typeof args['spec']['stopDelay'] == 'number') spec['stopDelay'] = args['spec']['stopDelay'];
        if (args['spec']['storage'] !== undefined && typeof args['spec']['storage'] == 'object') spec['storage'] = args['spec']['storage'];
        if (args['spec']['superuserSecret'] !== undefined && typeof args['spec']['superuserSecret'] == 'object') spec['superuserSecret'] = args['spec']['superuserSecret'];
        if (args['spec']['switchoverDelay'] !== undefined && typeof args['spec']['switchoverDelay'] == 'number') spec['switchoverDelay'] = args['spec']['switchoverDelay'];
        if (args['spec']['topologySpreadConstraints'] !== undefined && Array.isArray(args['spec']['topologySpreadConstraints'])) spec['topologySpreadConstraints'] = args['spec']['topologySpreadConstraints'];
        if (args['spec']['walStorage'] !== undefined && typeof args['spec']['walStorage'] == 'object') spec['walStorage'] = args['spec']['walStorage'];
        const request = {
            apiVersion: 'postgresql.cnpg.io/v1',
            kind: 'Cluster',
            metadata: {
                namespace: args['namespace'],
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getNamespacedCustomObject('postgresql.cnpg.io','v1',args['namespace'],'clusters', args['name'])
            const extGet = resGet.body as PostgresqlCluster
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchNamespacedCustomObject('postgresql.cnpg.io','v1',args['namespace'],'clusters', args['name'], payload, undefined, undefined, undefined, options)
            const ext = res.body as PostgresqlCluster
            return {
                metadata: getMetadata(ext.metadata, ext),
                "affinity": ext.spec['affinity'],
                "backup": ext.spec['backup'],
                "bootstrap": ext.spec['bootstrap'],
                "certificates": ext.spec['certificates'],
                "description": ext.spec['description'],
                "enableSuperuserAccess": ext.spec['enableSuperuserAccess'],
                "env": ext.spec['env'],
                "envFrom": ext.spec['envFrom'],
                "externalClusters": ext.spec['externalClusters'],
                "failoverDelay": ext.spec['failoverDelay'],
                "imageName": ext.spec['imageName'],
                "imagePullPolicy": ext.spec['imagePullPolicy'],
                "imagePullSecrets": ext.spec['imagePullSecrets'],
                "inheritedMetadata": ext.spec['inheritedMetadata'],
                "instances": ext.spec['instances'],
                "logLevel": ext.spec['logLevel'],
                "managed": ext.spec['managed'],
                "maxSyncReplicas": ext.spec['maxSyncReplicas'],
                "minSyncReplicas": ext.spec['minSyncReplicas'],
                "monitoring": ext.spec['monitoring'],
                "nodeMaintenanceWindow": ext.spec['nodeMaintenanceWindow'],
                "postgresGID": ext.spec['postgresGID'],
                "postgresUID": ext.spec['postgresUID'],
                "postgresql": ext.spec['postgresql'],
                "primaryUpdateMethod": ext.spec['primaryUpdateMethod'],
                "primaryUpdateStrategy": ext.spec['primaryUpdateStrategy'],
                "priorityClassName": ext.spec['priorityClassName'],
                "projectedVolumeTemplate": ext.spec['projectedVolumeTemplate'],
                "replica": ext.spec['replica'],
                "replicationSlots": ext.spec['replicationSlots'],
                "resources": ext.spec['resources'],
                "schedulerName": ext.spec['schedulerName'],
                "seccompProfile": ext.spec['seccompProfile'],
                "serviceAccountTemplate": ext.spec['serviceAccountTemplate'],
                "startDelay": ext.spec['startDelay'],
                "stopDelay": ext.spec['stopDelay'],
                "storage": ext.spec['storage'],
                "superuserSecret": ext.spec['superuserSecret'],
                "switchoverDelay": ext.spec['switchoverDelay'],
                "topologySpreadConstraints": ext.spec['topologySpreadConstraints'],
                "walStorage": ext.spec['walStorage'],
                status: ext.status==undefined?null:{
                    "azurePVCUpdateEnabled": ext.status['azurePVCUpdateEnabled'],
                    "certificates": ext.status['certificates'],
                    "cloudNativePGCommitHash": ext.status['cloudNativePGCommitHash'],
                    "cloudNativePGOperatorHash": ext.status['cloudNativePGOperatorHash'],
                    "conditions": ext.status['conditions'],
                    "configMapResourceVersion": ext.status['configMapResourceVersion'],
                    "currentPrimary": ext.status['currentPrimary'],
                    "currentPrimaryFailingSinceTimestamp": ext.status['currentPrimaryFailingSinceTimestamp'],
                    "currentPrimaryTimestamp": ext.status['currentPrimaryTimestamp'],
                    "danglingPVC": ext.status['danglingPVC'],
                    "firstRecoverabilityPoint": ext.status['firstRecoverabilityPoint'],
                    "healthyPVC": ext.status['healthyPVC'],
                    "initializingPVC": ext.status['initializingPVC'],
                    "instanceNames": ext.status['instanceNames'],
                    "instances": ext.status['instances'],
                    "instancesReportedState": ext.status['instancesReportedState'],
                    "instancesStatus": ext.status['instancesStatus'],
                    "jobCount": ext.status['jobCount'],
                    "lastFailedBackup": ext.status['lastFailedBackup'],
                    "lastSuccessfulBackup": ext.status['lastSuccessfulBackup'],
                    "latestGeneratedNode": ext.status['latestGeneratedNode'],
                    "managedRolesStatus": ext.status['managedRolesStatus'],
                    "onlineUpdateEnabled": ext.status['onlineUpdateEnabled'],
                    "phase": ext.status['phase'],
                    "phaseReason": ext.status['phaseReason'],
                    "poolerIntegrations": ext.status['poolerIntegrations'],
                    "pvcCount": ext.status['pvcCount'],
                    "readService": ext.status['readService'],
                    "readyInstances": ext.status['readyInstances'],
                    "resizingPVC": ext.status['resizingPVC'],
                    "secretsResourceVersion": ext.status['secretsResourceVersion'],
                    "targetPrimary": ext.status['targetPrimary'],
                    "targetPrimaryTimestamp": ext.status['targetPrimaryTimestamp'],
                    "timelineID": ext.status['timelineID'],
                    "topology": ext.status['topology'],
                    "unusablePVC": ext.status['unusablePVC'],
                    "writeService": ext.status['writeService'],
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    deletePostgresqlCluster: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteNamespacedCustomObject('postgresql.cnpg.io','v1',args['namespace'],'clusters', args['name'])
        const ext = res.body as PostgresqlCluster
        return {
            metadata: getMetadata(ext.metadata, ext),
            "affinity": ext.spec['affinity'],
            "backup": ext.spec['backup'],
            "bootstrap": ext.spec['bootstrap'],
            "certificates": ext.spec['certificates'],
            "description": ext.spec['description'],
            "enableSuperuserAccess": ext.spec['enableSuperuserAccess'],
            "env": ext.spec['env'],
            "envFrom": ext.spec['envFrom'],
            "externalClusters": ext.spec['externalClusters'],
            "failoverDelay": ext.spec['failoverDelay'],
            "imageName": ext.spec['imageName'],
            "imagePullPolicy": ext.spec['imagePullPolicy'],
            "imagePullSecrets": ext.spec['imagePullSecrets'],
            "inheritedMetadata": ext.spec['inheritedMetadata'],
            "instances": ext.spec['instances'],
            "logLevel": ext.spec['logLevel'],
            "managed": ext.spec['managed'],
            "maxSyncReplicas": ext.spec['maxSyncReplicas'],
            "minSyncReplicas": ext.spec['minSyncReplicas'],
            "monitoring": ext.spec['monitoring'],
            "nodeMaintenanceWindow": ext.spec['nodeMaintenanceWindow'],
            "postgresGID": ext.spec['postgresGID'],
            "postgresUID": ext.spec['postgresUID'],
            "postgresql": ext.spec['postgresql'],
            "primaryUpdateMethod": ext.spec['primaryUpdateMethod'],
            "primaryUpdateStrategy": ext.spec['primaryUpdateStrategy'],
            "priorityClassName": ext.spec['priorityClassName'],
            "projectedVolumeTemplate": ext.spec['projectedVolumeTemplate'],
            "replica": ext.spec['replica'],
            "replicationSlots": ext.spec['replicationSlots'],
            "resources": ext.spec['resources'],
            "schedulerName": ext.spec['schedulerName'],
            "seccompProfile": ext.spec['seccompProfile'],
            "serviceAccountTemplate": ext.spec['serviceAccountTemplate'],
            "startDelay": ext.spec['startDelay'],
            "stopDelay": ext.spec['stopDelay'],
            "storage": ext.spec['storage'],
            "superuserSecret": ext.spec['superuserSecret'],
            "switchoverDelay": ext.spec['switchoverDelay'],
            "topologySpreadConstraints": ext.spec['topologySpreadConstraints'],
            "walStorage": ext.spec['walStorage'],
            status: ext.status==undefined?null:{
                "azurePVCUpdateEnabled": ext.status['azurePVCUpdateEnabled'],
                "certificates": ext.status['certificates'],
                "cloudNativePGCommitHash": ext.status['cloudNativePGCommitHash'],
                "cloudNativePGOperatorHash": ext.status['cloudNativePGOperatorHash'],
                "conditions": ext.status['conditions'],
                "configMapResourceVersion": ext.status['configMapResourceVersion'],
                "currentPrimary": ext.status['currentPrimary'],
                "currentPrimaryFailingSinceTimestamp": ext.status['currentPrimaryFailingSinceTimestamp'],
                "currentPrimaryTimestamp": ext.status['currentPrimaryTimestamp'],
                "danglingPVC": ext.status['danglingPVC'],
                "firstRecoverabilityPoint": ext.status['firstRecoverabilityPoint'],
                "healthyPVC": ext.status['healthyPVC'],
                "initializingPVC": ext.status['initializingPVC'],
                "instanceNames": ext.status['instanceNames'],
                "instances": ext.status['instances'],
                "instancesReportedState": ext.status['instancesReportedState'],
                "instancesStatus": ext.status['instancesStatus'],
                "jobCount": ext.status['jobCount'],
                "lastFailedBackup": ext.status['lastFailedBackup'],
                "lastSuccessfulBackup": ext.status['lastSuccessfulBackup'],
                "latestGeneratedNode": ext.status['latestGeneratedNode'],
                "managedRolesStatus": ext.status['managedRolesStatus'],
                "onlineUpdateEnabled": ext.status['onlineUpdateEnabled'],
                "phase": ext.status['phase'],
                "phaseReason": ext.status['phaseReason'],
                "poolerIntegrations": ext.status['poolerIntegrations'],
                "pvcCount": ext.status['pvcCount'],
                "readService": ext.status['readService'],
                "readyInstances": ext.status['readyInstances'],
                "resizingPVC": ext.status['resizingPVC'],
                "secretsResourceVersion": ext.status['secretsResourceVersion'],
                "targetPrimary": ext.status['targetPrimary'],
                "targetPrimaryTimestamp": ext.status['targetPrimaryTimestamp'],
                "timelineID": ext.status['timelineID'],
                "topology": ext.status['topology'],
                "unusablePVC": ext.status['unusablePVC'],
                "writeService": ext.status['writeService'],
            }
        }
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
},
};
