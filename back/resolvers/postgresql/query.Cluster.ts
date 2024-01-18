import {kc, k8s, getMetadata} from '../core/libs.js';
import { PostgresqlClusterList, PostgresqlCluster } from './type.Cluster.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    postgresqlClusters: async (_parent, args: object) => {
        try {
            const res = await customApi.listNamespacedCustomObject('postgresql.cnpg.io','v1',args['namespace'],'clusters')
            const resList = res.body as PostgresqlClusterList
            return resList.items.map((ext)=>{return{
                metadata: getMetadata(ext.metadata),
                affinity: ext.spec.affinity,
                backup: ext.spec.backup,
                bootstrap: ext.spec.bootstrap,
                certificates: ext.spec.certificates,
                description: ext.spec.description,
                enableSuperuserAccess: ext.spec.enableSuperuserAccess,
                env: ext.spec.env,
                envFrom: ext.spec.envFrom,
                externalClusters: ext.spec.externalClusters,
                failoverDelay: ext.spec.failoverDelay,
                imageName: ext.spec.imageName,
                imagePullPolicy: ext.spec.imagePullPolicy,
                imagePullSecrets: ext.spec.imagePullSecrets,
                inheritedMetadata: ext.spec.inheritedMetadata,
                instances: ext.spec.instances,
                logLevel: ext.spec.logLevel,
                managed: ext.spec.managed,
                maxSyncReplicas: ext.spec.maxSyncReplicas,
                minSyncReplicas: ext.spec.minSyncReplicas,
                monitoring: ext.spec.monitoring,
                nodeMaintenanceWindow: ext.spec.nodeMaintenanceWindow,
                postgresGID: ext.spec.postgresGID,
                postgresUID: ext.spec.postgresUID,
                postgresql: ext.spec.postgresql,
                primaryUpdateMethod: ext.spec.primaryUpdateMethod,
                primaryUpdateStrategy: ext.spec.primaryUpdateStrategy,
                priorityClassName: ext.spec.priorityClassName,
                projectedVolumeTemplate: ext.spec.projectedVolumeTemplate,
                replica: ext.spec.replica,
                replicationSlots: ext.spec.replicationSlots,
                resources: ext.spec.resources,
                schedulerName: ext.spec.schedulerName,
                seccompProfile: ext.spec.seccompProfile,
                serviceAccountTemplate: ext.spec.serviceAccountTemplate,
                startDelay: ext.spec.startDelay,
                stopDelay: ext.spec.stopDelay,
                storage: ext.spec.storage,
                superuserSecret: ext.spec.superuserSecret,
                switchoverDelay: ext.spec.switchoverDelay,
                topologySpreadConstraints: ext.spec.topologySpreadConstraints,
                walStorage: ext.spec.walStorage,
                status: ext.status==undefined?null:{
                    azurePVCUpdateEnabled: ext.status.azurePVCUpdateEnabled,
                    certificates: ext.status.certificates,
                    cloudNativePGCommitHash: ext.status.cloudNativePGCommitHash,
                    cloudNativePGOperatorHash: ext.status.cloudNativePGOperatorHash,
                    conditions: ext.status.conditions,
                    configMapResourceVersion: ext.status.configMapResourceVersion,
                    currentPrimary: ext.status.currentPrimary,
                    currentPrimaryFailingSinceTimestamp: ext.status.currentPrimaryFailingSinceTimestamp,
                    currentPrimaryTimestamp: ext.status.currentPrimaryTimestamp,
                    danglingPVC: ext.status.danglingPVC,
                    firstRecoverabilityPoint: ext.status.firstRecoverabilityPoint,
                    healthyPVC: ext.status.healthyPVC,
                    initializingPVC: ext.status.initializingPVC,
                    instanceNames: ext.status.instanceNames,
                    instances: ext.status.instances,
                    instancesReportedState: ext.status.instancesReportedState,
                    instancesStatus: ext.status.instancesStatus,
                    jobCount: ext.status.jobCount,
                    lastFailedBackup: ext.status.lastFailedBackup,
                    lastSuccessfulBackup: ext.status.lastSuccessfulBackup,
                    latestGeneratedNode: ext.status.latestGeneratedNode,
                    managedRolesStatus: ext.status.managedRolesStatus,
                    onlineUpdateEnabled: ext.status.onlineUpdateEnabled,
                    phase: ext.status.phase,
                    phaseReason: ext.status.phaseReason,
                    poolerIntegrations: ext.status.poolerIntegrations,
                    pvcCount: ext.status.pvcCount,
                    readService: ext.status.readService,
                    readyInstances: ext.status.readyInstances,
                    resizingPVC: ext.status.resizingPVC,
                    secretsResourceVersion: ext.status.secretsResourceVersion,
                    targetPrimary: ext.status.targetPrimary,
                    targetPrimaryTimestamp: ext.status.targetPrimaryTimestamp,
                    timelineID: ext.status.timelineID,
                    topology: ext.status.topology,
                    unusablePVC: ext.status.unusablePVC,
                    writeService: ext.status.writeService,
                }
            }})
        } catch (err) {
          console.error((err as object)['body']);
        }
        return []
    }
};
export const queries = {
    postgresqlCluster: async (_parent, args: object) => {
        try {
            const res = await customApi.getNamespacedCustomObject('postgresql.cnpg.io','v1',args['namespace'],'clusters', args['name'])
            const ext = res.body as PostgresqlCluster
            return {
                metadata: getMetadata(ext.metadata),
                affinity: ext.spec.affinity,
                backup: ext.spec.backup,
                bootstrap: ext.spec.bootstrap,
                certificates: ext.spec.certificates,
                description: ext.spec.description,
                enableSuperuserAccess: ext.spec.enableSuperuserAccess,
                env: ext.spec.env,
                envFrom: ext.spec.envFrom,
                externalClusters: ext.spec.externalClusters,
                failoverDelay: ext.spec.failoverDelay,
                imageName: ext.spec.imageName,
                imagePullPolicy: ext.spec.imagePullPolicy,
                imagePullSecrets: ext.spec.imagePullSecrets,
                inheritedMetadata: ext.spec.inheritedMetadata,
                instances: ext.spec.instances,
                logLevel: ext.spec.logLevel,
                managed: ext.spec.managed,
                maxSyncReplicas: ext.spec.maxSyncReplicas,
                minSyncReplicas: ext.spec.minSyncReplicas,
                monitoring: ext.spec.monitoring,
                nodeMaintenanceWindow: ext.spec.nodeMaintenanceWindow,
                postgresGID: ext.spec.postgresGID,
                postgresUID: ext.spec.postgresUID,
                postgresql: ext.spec.postgresql,
                primaryUpdateMethod: ext.spec.primaryUpdateMethod,
                primaryUpdateStrategy: ext.spec.primaryUpdateStrategy,
                priorityClassName: ext.spec.priorityClassName,
                projectedVolumeTemplate: ext.spec.projectedVolumeTemplate,
                replica: ext.spec.replica,
                replicationSlots: ext.spec.replicationSlots,
                resources: ext.spec.resources,
                schedulerName: ext.spec.schedulerName,
                seccompProfile: ext.spec.seccompProfile,
                serviceAccountTemplate: ext.spec.serviceAccountTemplate,
                startDelay: ext.spec.startDelay,
                stopDelay: ext.spec.stopDelay,
                storage: ext.spec.storage,
                superuserSecret: ext.spec.superuserSecret,
                switchoverDelay: ext.spec.switchoverDelay,
                topologySpreadConstraints: ext.spec.topologySpreadConstraints,
                walStorage: ext.spec.walStorage,
                status: ext.status==undefined?null:{
                    azurePVCUpdateEnabled: ext.status.azurePVCUpdateEnabled,
                    certificates: ext.status.certificates,
                    cloudNativePGCommitHash: ext.status.cloudNativePGCommitHash,
                    cloudNativePGOperatorHash: ext.status.cloudNativePGOperatorHash,
                    conditions: ext.status.conditions,
                    configMapResourceVersion: ext.status.configMapResourceVersion,
                    currentPrimary: ext.status.currentPrimary,
                    currentPrimaryFailingSinceTimestamp: ext.status.currentPrimaryFailingSinceTimestamp,
                    currentPrimaryTimestamp: ext.status.currentPrimaryTimestamp,
                    danglingPVC: ext.status.danglingPVC,
                    firstRecoverabilityPoint: ext.status.firstRecoverabilityPoint,
                    healthyPVC: ext.status.healthyPVC,
                    initializingPVC: ext.status.initializingPVC,
                    instanceNames: ext.status.instanceNames,
                    instances: ext.status.instances,
                    instancesReportedState: ext.status.instancesReportedState,
                    instancesStatus: ext.status.instancesStatus,
                    jobCount: ext.status.jobCount,
                    lastFailedBackup: ext.status.lastFailedBackup,
                    lastSuccessfulBackup: ext.status.lastSuccessfulBackup,
                    latestGeneratedNode: ext.status.latestGeneratedNode,
                    managedRolesStatus: ext.status.managedRolesStatus,
                    onlineUpdateEnabled: ext.status.onlineUpdateEnabled,
                    phase: ext.status.phase,
                    phaseReason: ext.status.phaseReason,
                    poolerIntegrations: ext.status.poolerIntegrations,
                    pvcCount: ext.status.pvcCount,
                    readService: ext.status.readService,
                    readyInstances: ext.status.readyInstances,
                    resizingPVC: ext.status.resizingPVC,
                    secretsResourceVersion: ext.status.secretsResourceVersion,
                    targetPrimary: ext.status.targetPrimary,
                    targetPrimaryTimestamp: ext.status.targetPrimaryTimestamp,
                    timelineID: ext.status.timelineID,
                    topology: ext.status.topology,
                    unusablePVC: ext.status.unusablePVC,
                    writeService: ext.status.writeService,
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
