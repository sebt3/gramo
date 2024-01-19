type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface PostgresqlClusterStatusCertificatesExpirations {
}
export interface PostgresqlClusterStatusCertificates {
  "clientCASecret": string | undefined
  "expirations": PostgresqlClusterStatusCertificatesExpirations | undefined
  "replicationTLSSecret": string | undefined
  "serverAltDNSNames": Array<string> | undefined
  "serverCASecret": string | undefined
  "serverTLSSecret": string | undefined
}
export interface PostgresqlClusterStatusConditionsItem {
  "lastTransitionTime": string
  "message": string
  "observedGeneration": number | undefined
  "reason": string
  "status": string
  "type": string
}
export interface PostgresqlClusterStatusConfigMapResourceVersionMetrics {
}
export interface PostgresqlClusterStatusConfigMapResourceVersion {
  "metrics": PostgresqlClusterStatusConfigMapResourceVersionMetrics | undefined
}
export interface PostgresqlClusterStatusInstancesReportedState {
}
export interface PostgresqlClusterStatusInstancesStatus {
}
export interface PostgresqlClusterStatusManagedRolesStatusByStatus {
}
export interface PostgresqlClusterStatusManagedRolesStatusCannotReconcile {
}
export interface PostgresqlClusterStatusManagedRolesStatusPasswordStatus {
}
export interface PostgresqlClusterStatusManagedRolesStatus {
  "byStatus": PostgresqlClusterStatusManagedRolesStatusByStatus | undefined
  "cannotReconcile": PostgresqlClusterStatusManagedRolesStatusCannotReconcile | undefined
  "passwordStatus": PostgresqlClusterStatusManagedRolesStatusPasswordStatus | undefined
}
export interface PostgresqlClusterStatusPoolerIntegrationsPgBouncerIntegration {
  "secrets": Array<string> | undefined
}
export interface PostgresqlClusterStatusPoolerIntegrations {
  "pgBouncerIntegration": PostgresqlClusterStatusPoolerIntegrationsPgBouncerIntegration | undefined
}
export interface PostgresqlClusterStatusSecretsResourceVersionManagedRoleSecretVersion {
}
export interface PostgresqlClusterStatusSecretsResourceVersionMetrics {
}
export interface PostgresqlClusterStatusSecretsResourceVersion {
  "applicationSecretVersion": string | undefined
  "barmanEndpointCA": string | undefined
  "caSecretVersion": string | undefined
  "clientCaSecretVersion": string | undefined
  "managedRoleSecretVersion": PostgresqlClusterStatusSecretsResourceVersionManagedRoleSecretVersion | undefined
  "metrics": PostgresqlClusterStatusSecretsResourceVersionMetrics | undefined
  "replicationSecretVersion": string | undefined
  "serverCaSecretVersion": string | undefined
  "serverSecretVersion": string | undefined
  "superuserSecretVersion": string | undefined
}
export interface PostgresqlClusterStatusTopologyInstances {
}
export interface PostgresqlClusterStatusTopology {
  "instances": PostgresqlClusterStatusTopologyInstances | undefined
  "nodesUsed": number | undefined
  "successfullyExtracted": boolean | undefined
}
export interface PostgresqlClusterStatus {
  "azurePVCUpdateEnabled": boolean | undefined
  "certificates": PostgresqlClusterStatusCertificates | undefined
  "cloudNativePGCommitHash": string | undefined
  "cloudNativePGOperatorHash": string | undefined
  "conditions": Array<PostgresqlClusterStatusConditionsItem> | undefined
  "configMapResourceVersion": PostgresqlClusterStatusConfigMapResourceVersion | undefined
  "currentPrimary": string | undefined
  "currentPrimaryFailingSinceTimestamp": string | undefined
  "currentPrimaryTimestamp": string | undefined
  "danglingPVC": Array<string> | undefined
  "firstRecoverabilityPoint": string | undefined
  "healthyPVC": Array<string> | undefined
  "initializingPVC": Array<string> | undefined
  "instanceNames": Array<string> | undefined
  "instances": number | undefined
  "instancesReportedState": PostgresqlClusterStatusInstancesReportedState | undefined
  "instancesStatus": PostgresqlClusterStatusInstancesStatus | undefined
  "jobCount": number | undefined
  "lastFailedBackup": string | undefined
  "lastSuccessfulBackup": string | undefined
  "latestGeneratedNode": number | undefined
  "managedRolesStatus": PostgresqlClusterStatusManagedRolesStatus | undefined
  "onlineUpdateEnabled": boolean | undefined
  "phase": string | undefined
  "phaseReason": string | undefined
  "poolerIntegrations": PostgresqlClusterStatusPoolerIntegrations | undefined
  "pvcCount": number | undefined
  "readService": string | undefined
  "readyInstances": number | undefined
  "resizingPVC": Array<string> | undefined
  "secretsResourceVersion": PostgresqlClusterStatusSecretsResourceVersion | undefined
  "targetPrimary": string | undefined
  "targetPrimaryTimestamp": string | undefined
  "timelineID": number | undefined
  "topology": PostgresqlClusterStatusTopology | undefined
  "unusablePVC": Array<string> | undefined
  "writeService": string | undefined
}
export interface PostgresqlClusterSpecAffinityAdditionalPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface PostgresqlClusterSpecAffinityAdditionalPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchLabels {
}
export interface PostgresqlClusterSpecAffinityAdditionalPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelector {
  "matchExpressions": Array<PostgresqlClusterSpecAffinityAdditionalPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchExpressionsItem> | undefined
  "matchLabels": PostgresqlClusterSpecAffinityAdditionalPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchLabels | undefined
}
export interface PostgresqlClusterSpecAffinityAdditionalPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface PostgresqlClusterSpecAffinityAdditionalPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchLabels {
}
export interface PostgresqlClusterSpecAffinityAdditionalPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelector {
  "matchExpressions": Array<PostgresqlClusterSpecAffinityAdditionalPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchExpressionsItem> | undefined
  "matchLabels": PostgresqlClusterSpecAffinityAdditionalPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchLabels | undefined
}
export interface PostgresqlClusterSpecAffinityAdditionalPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTerm {
  "labelSelector": PostgresqlClusterSpecAffinityAdditionalPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelector | undefined
  "namespaceSelector": PostgresqlClusterSpecAffinityAdditionalPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelector | undefined
  "namespaces": Array<string> | undefined
  "topologyKey": string
}
export interface PostgresqlClusterSpecAffinityAdditionalPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem {
  "podAffinityTerm": PostgresqlClusterSpecAffinityAdditionalPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTerm
  "weight": number
}
export interface PostgresqlClusterSpecAffinityAdditionalPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface PostgresqlClusterSpecAffinityAdditionalPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchLabels {
}
export interface PostgresqlClusterSpecAffinityAdditionalPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelector {
  "matchExpressions": Array<PostgresqlClusterSpecAffinityAdditionalPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchExpressionsItem> | undefined
  "matchLabels": PostgresqlClusterSpecAffinityAdditionalPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchLabels | undefined
}
export interface PostgresqlClusterSpecAffinityAdditionalPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface PostgresqlClusterSpecAffinityAdditionalPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchLabels {
}
export interface PostgresqlClusterSpecAffinityAdditionalPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelector {
  "matchExpressions": Array<PostgresqlClusterSpecAffinityAdditionalPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchExpressionsItem> | undefined
  "matchLabels": PostgresqlClusterSpecAffinityAdditionalPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchLabels | undefined
}
export interface PostgresqlClusterSpecAffinityAdditionalPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItem {
  "labelSelector": PostgresqlClusterSpecAffinityAdditionalPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelector | undefined
  "namespaceSelector": PostgresqlClusterSpecAffinityAdditionalPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelector | undefined
  "namespaces": Array<string> | undefined
  "topologyKey": string
}
export interface PostgresqlClusterSpecAffinityAdditionalPodAffinity {
  "preferredDuringSchedulingIgnoredDuringExecution": Array<PostgresqlClusterSpecAffinityAdditionalPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem> | undefined
  "requiredDuringSchedulingIgnoredDuringExecution": Array<PostgresqlClusterSpecAffinityAdditionalPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItem> | undefined
}
export interface PostgresqlClusterSpecAffinityAdditionalPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface PostgresqlClusterSpecAffinityAdditionalPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchLabels {
}
export interface PostgresqlClusterSpecAffinityAdditionalPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelector {
  "matchExpressions": Array<PostgresqlClusterSpecAffinityAdditionalPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchExpressionsItem> | undefined
  "matchLabels": PostgresqlClusterSpecAffinityAdditionalPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchLabels | undefined
}
export interface PostgresqlClusterSpecAffinityAdditionalPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface PostgresqlClusterSpecAffinityAdditionalPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchLabels {
}
export interface PostgresqlClusterSpecAffinityAdditionalPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelector {
  "matchExpressions": Array<PostgresqlClusterSpecAffinityAdditionalPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchExpressionsItem> | undefined
  "matchLabels": PostgresqlClusterSpecAffinityAdditionalPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchLabels | undefined
}
export interface PostgresqlClusterSpecAffinityAdditionalPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTerm {
  "labelSelector": PostgresqlClusterSpecAffinityAdditionalPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelector | undefined
  "namespaceSelector": PostgresqlClusterSpecAffinityAdditionalPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelector | undefined
  "namespaces": Array<string> | undefined
  "topologyKey": string
}
export interface PostgresqlClusterSpecAffinityAdditionalPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem {
  "podAffinityTerm": PostgresqlClusterSpecAffinityAdditionalPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTerm
  "weight": number
}
export interface PostgresqlClusterSpecAffinityAdditionalPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface PostgresqlClusterSpecAffinityAdditionalPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchLabels {
}
export interface PostgresqlClusterSpecAffinityAdditionalPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelector {
  "matchExpressions": Array<PostgresqlClusterSpecAffinityAdditionalPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchExpressionsItem> | undefined
  "matchLabels": PostgresqlClusterSpecAffinityAdditionalPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchLabels | undefined
}
export interface PostgresqlClusterSpecAffinityAdditionalPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface PostgresqlClusterSpecAffinityAdditionalPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchLabels {
}
export interface PostgresqlClusterSpecAffinityAdditionalPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelector {
  "matchExpressions": Array<PostgresqlClusterSpecAffinityAdditionalPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchExpressionsItem> | undefined
  "matchLabels": PostgresqlClusterSpecAffinityAdditionalPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchLabels | undefined
}
export interface PostgresqlClusterSpecAffinityAdditionalPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItem {
  "labelSelector": PostgresqlClusterSpecAffinityAdditionalPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelector | undefined
  "namespaceSelector": PostgresqlClusterSpecAffinityAdditionalPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelector | undefined
  "namespaces": Array<string> | undefined
  "topologyKey": string
}
export interface PostgresqlClusterSpecAffinityAdditionalPodAntiAffinity {
  "preferredDuringSchedulingIgnoredDuringExecution": Array<PostgresqlClusterSpecAffinityAdditionalPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem> | undefined
  "requiredDuringSchedulingIgnoredDuringExecution": Array<PostgresqlClusterSpecAffinityAdditionalPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItem> | undefined
}
export interface PostgresqlClusterSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreferenceMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface PostgresqlClusterSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreferenceMatchFieldsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface PostgresqlClusterSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreference {
  "matchExpressions": Array<PostgresqlClusterSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreferenceMatchExpressionsItem> | undefined
  "matchFields": Array<PostgresqlClusterSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreferenceMatchFieldsItem> | undefined
}
export interface PostgresqlClusterSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem {
  "preference": PostgresqlClusterSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreference
  "weight": number
}
export interface PostgresqlClusterSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItemMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface PostgresqlClusterSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItemMatchFieldsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface PostgresqlClusterSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItem {
  "matchExpressions": Array<PostgresqlClusterSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItemMatchExpressionsItem> | undefined
  "matchFields": Array<PostgresqlClusterSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItemMatchFieldsItem> | undefined
}
export interface PostgresqlClusterSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecution {
  "nodeSelectorTerms": Array<PostgresqlClusterSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItem>
}
export interface PostgresqlClusterSpecAffinityNodeAffinity {
  "preferredDuringSchedulingIgnoredDuringExecution": Array<PostgresqlClusterSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem> | undefined
  "requiredDuringSchedulingIgnoredDuringExecution": PostgresqlClusterSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecution | undefined
}
export interface PostgresqlClusterSpecAffinityNodeSelector {
}
export interface PostgresqlClusterSpecAffinityTolerationsItem {
  "effect": string | undefined
  "key": string | undefined
  "operator": string | undefined
  "tolerationSeconds": number | undefined
  "value": string | undefined
}
export interface PostgresqlClusterSpecAffinity {
  "additionalPodAffinity": PostgresqlClusterSpecAffinityAdditionalPodAffinity | undefined
  "additionalPodAntiAffinity": PostgresqlClusterSpecAffinityAdditionalPodAntiAffinity | undefined
  "enablePodAntiAffinity": boolean | undefined
  "nodeAffinity": PostgresqlClusterSpecAffinityNodeAffinity | undefined
  "nodeSelector": PostgresqlClusterSpecAffinityNodeSelector | undefined
  "podAntiAffinityType": string | undefined
  "tolerations": Array<PostgresqlClusterSpecAffinityTolerationsItem> | undefined
  "topologyKey": string | undefined
}
export interface PostgresqlClusterSpecBackupBarmanObjectStoreAzureCredentialsConnectionString {
  "key": string
  "name": string
}
export interface PostgresqlClusterSpecBackupBarmanObjectStoreAzureCredentialsStorageAccount {
  "key": string
  "name": string
}
export interface PostgresqlClusterSpecBackupBarmanObjectStoreAzureCredentialsStorageKey {
  "key": string
  "name": string
}
export interface PostgresqlClusterSpecBackupBarmanObjectStoreAzureCredentialsStorageSasToken {
  "key": string
  "name": string
}
export interface PostgresqlClusterSpecBackupBarmanObjectStoreAzureCredentials {
  "connectionString": PostgresqlClusterSpecBackupBarmanObjectStoreAzureCredentialsConnectionString | undefined
  "inheritFromAzureAD": boolean | undefined
  "storageAccount": PostgresqlClusterSpecBackupBarmanObjectStoreAzureCredentialsStorageAccount | undefined
  "storageKey": PostgresqlClusterSpecBackupBarmanObjectStoreAzureCredentialsStorageKey | undefined
  "storageSasToken": PostgresqlClusterSpecBackupBarmanObjectStoreAzureCredentialsStorageSasToken | undefined
}
export interface PostgresqlClusterSpecBackupBarmanObjectStoreData {
  "compression": string | undefined
  "encryption": string | undefined
  "immediateCheckpoint": boolean | undefined
  "jobs": number | undefined
}
export interface PostgresqlClusterSpecBackupBarmanObjectStoreEndpointCA {
  "key": string
  "name": string
}
export interface PostgresqlClusterSpecBackupBarmanObjectStoreGoogleCredentialsApplicationCredentials {
  "key": string
  "name": string
}
export interface PostgresqlClusterSpecBackupBarmanObjectStoreGoogleCredentials {
  "applicationCredentials": PostgresqlClusterSpecBackupBarmanObjectStoreGoogleCredentialsApplicationCredentials | undefined
  "gkeEnvironment": boolean | undefined
}
export interface PostgresqlClusterSpecBackupBarmanObjectStoreHistoryTags {
}
export interface PostgresqlClusterSpecBackupBarmanObjectStoreS3CredentialsAccessKeyId {
  "key": string
  "name": string
}
export interface PostgresqlClusterSpecBackupBarmanObjectStoreS3CredentialsRegion {
  "key": string
  "name": string
}
export interface PostgresqlClusterSpecBackupBarmanObjectStoreS3CredentialsSecretAccessKey {
  "key": string
  "name": string
}
export interface PostgresqlClusterSpecBackupBarmanObjectStoreS3CredentialsSessionToken {
  "key": string
  "name": string
}
export interface PostgresqlClusterSpecBackupBarmanObjectStoreS3Credentials {
  "accessKeyId": PostgresqlClusterSpecBackupBarmanObjectStoreS3CredentialsAccessKeyId | undefined
  "inheritFromIAMRole": boolean | undefined
  "region": PostgresqlClusterSpecBackupBarmanObjectStoreS3CredentialsRegion | undefined
  "secretAccessKey": PostgresqlClusterSpecBackupBarmanObjectStoreS3CredentialsSecretAccessKey | undefined
  "sessionToken": PostgresqlClusterSpecBackupBarmanObjectStoreS3CredentialsSessionToken | undefined
}
export interface PostgresqlClusterSpecBackupBarmanObjectStoreTags {
}
export interface PostgresqlClusterSpecBackupBarmanObjectStoreWal {
  "compression": string | undefined
  "encryption": string | undefined
  "maxParallel": number | undefined
}
export interface PostgresqlClusterSpecBackupBarmanObjectStore {
  "azureCredentials": PostgresqlClusterSpecBackupBarmanObjectStoreAzureCredentials | undefined
  "data": PostgresqlClusterSpecBackupBarmanObjectStoreData | undefined
  "destinationPath": string
  "endpointCA": PostgresqlClusterSpecBackupBarmanObjectStoreEndpointCA | undefined
  "endpointURL": string | undefined
  "googleCredentials": PostgresqlClusterSpecBackupBarmanObjectStoreGoogleCredentials | undefined
  "historyTags": PostgresqlClusterSpecBackupBarmanObjectStoreHistoryTags | undefined
  "s3Credentials": PostgresqlClusterSpecBackupBarmanObjectStoreS3Credentials | undefined
  "serverName": string | undefined
  "tags": PostgresqlClusterSpecBackupBarmanObjectStoreTags | undefined
  "wal": PostgresqlClusterSpecBackupBarmanObjectStoreWal | undefined
}
export interface PostgresqlClusterSpecBackup {
  "barmanObjectStore": PostgresqlClusterSpecBackupBarmanObjectStore | undefined
  "retentionPolicy": string | undefined
  "target": string | undefined
}
export interface PostgresqlClusterSpecBootstrapInitdbImportSource {
  "externalCluster": string
}
export interface PostgresqlClusterSpecBootstrapInitdbImport {
  "databases": Array<string>
  "postImportApplicationSQL": Array<string> | undefined
  "roles": Array<string> | undefined
  "schemaOnly": boolean | undefined
  "source": PostgresqlClusterSpecBootstrapInitdbImportSource
  "type": string
}
export interface PostgresqlClusterSpecBootstrapInitdbPostInitApplicationSQLRefsConfigMapRefsItem {
  "key": string
  "name": string
}
export interface PostgresqlClusterSpecBootstrapInitdbPostInitApplicationSQLRefsSecretRefsItem {
  "key": string
  "name": string
}
export interface PostgresqlClusterSpecBootstrapInitdbPostInitApplicationSQLRefs {
  "configMapRefs": Array<PostgresqlClusterSpecBootstrapInitdbPostInitApplicationSQLRefsConfigMapRefsItem> | undefined
  "secretRefs": Array<PostgresqlClusterSpecBootstrapInitdbPostInitApplicationSQLRefsSecretRefsItem> | undefined
}
export interface PostgresqlClusterSpecBootstrapInitdbSecret {
  "name": string
}
export interface PostgresqlClusterSpecBootstrapInitdb {
  "dataChecksums": boolean | undefined
  "database": string | undefined
  "encoding": string | undefined
  "import": PostgresqlClusterSpecBootstrapInitdbImport | undefined
  "localeCType": string | undefined
  "localeCollate": string | undefined
  "options": Array<string> | undefined
  "owner": string | undefined
  "postInitApplicationSQL": Array<string> | undefined
  "postInitApplicationSQLRefs": PostgresqlClusterSpecBootstrapInitdbPostInitApplicationSQLRefs | undefined
  "postInitSQL": Array<string> | undefined
  "postInitTemplateSQL": Array<string> | undefined
  "secret": PostgresqlClusterSpecBootstrapInitdbSecret | undefined
  "walSegmentSize": number | undefined
}
export interface PostgresqlClusterSpecBootstrapPg_basebackupSecret {
  "name": string
}
export interface PostgresqlClusterSpecBootstrapPg_basebackup {
  "database": string | undefined
  "owner": string | undefined
  "secret": PostgresqlClusterSpecBootstrapPg_basebackupSecret | undefined
  "source": string
}
export interface PostgresqlClusterSpecBootstrapRecoveryBackupEndpointCA {
  "key": string
  "name": string
}
export interface PostgresqlClusterSpecBootstrapRecoveryBackup {
  "endpointCA": PostgresqlClusterSpecBootstrapRecoveryBackupEndpointCA | undefined
  "name": string
}
export interface PostgresqlClusterSpecBootstrapRecoveryRecoveryTarget {
  "backupID": string | undefined
  "exclusive": boolean | undefined
  "targetImmediate": boolean | undefined
  "targetLSN": string | undefined
  "targetName": string | undefined
  "targetTLI": string | undefined
  "targetTime": string | undefined
  "targetXID": string | undefined
}
export interface PostgresqlClusterSpecBootstrapRecoverySecret {
  "name": string
}
export interface PostgresqlClusterSpecBootstrapRecoveryVolumeSnapshotsStorage {
  "apiGroup": string | undefined
  "kind": string
  "name": string
}
export interface PostgresqlClusterSpecBootstrapRecoveryVolumeSnapshotsWalStorage {
  "apiGroup": string | undefined
  "kind": string
  "name": string
}
export interface PostgresqlClusterSpecBootstrapRecoveryVolumeSnapshots {
  "storage": PostgresqlClusterSpecBootstrapRecoveryVolumeSnapshotsStorage
  "walStorage": PostgresqlClusterSpecBootstrapRecoveryVolumeSnapshotsWalStorage | undefined
}
export interface PostgresqlClusterSpecBootstrapRecovery {
  "backup": PostgresqlClusterSpecBootstrapRecoveryBackup | undefined
  "database": string | undefined
  "owner": string | undefined
  "recoveryTarget": PostgresqlClusterSpecBootstrapRecoveryRecoveryTarget | undefined
  "secret": PostgresqlClusterSpecBootstrapRecoverySecret | undefined
  "source": string | undefined
  "volumeSnapshots": PostgresqlClusterSpecBootstrapRecoveryVolumeSnapshots | undefined
}
export interface PostgresqlClusterSpecBootstrap {
  "initdb": PostgresqlClusterSpecBootstrapInitdb | undefined
  "pg_basebackup": PostgresqlClusterSpecBootstrapPg_basebackup | undefined
  "recovery": PostgresqlClusterSpecBootstrapRecovery | undefined
}
export interface PostgresqlClusterSpecCertificates {
  "clientCASecret": string | undefined
  "replicationTLSSecret": string | undefined
  "serverAltDNSNames": Array<string> | undefined
  "serverCASecret": string | undefined
  "serverTLSSecret": string | undefined
}
export interface PostgresqlClusterSpecEnvItemValueFromConfigMapKeyRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface PostgresqlClusterSpecEnvItemValueFromFieldRef {
  "apiVersion": string | undefined
  "fieldPath": string
}
export interface PostgresqlClusterSpecEnvItemValueFromResourceFieldRef {
  "containerName": string | undefined
  "divisor": object | undefined
  "resource": string
}
export interface PostgresqlClusterSpecEnvItemValueFromSecretKeyRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface PostgresqlClusterSpecEnvItemValueFrom {
  "configMapKeyRef": PostgresqlClusterSpecEnvItemValueFromConfigMapKeyRef | undefined
  "fieldRef": PostgresqlClusterSpecEnvItemValueFromFieldRef | undefined
  "resourceFieldRef": PostgresqlClusterSpecEnvItemValueFromResourceFieldRef | undefined
  "secretKeyRef": PostgresqlClusterSpecEnvItemValueFromSecretKeyRef | undefined
}
export interface PostgresqlClusterSpecEnvItem {
  "name": string
  "value": string | undefined
  "valueFrom": PostgresqlClusterSpecEnvItemValueFrom | undefined
}
export interface PostgresqlClusterSpecEnvFromItemConfigMapRef {
  "name": string | undefined
  "optional": boolean | undefined
}
export interface PostgresqlClusterSpecEnvFromItemSecretRef {
  "name": string | undefined
  "optional": boolean | undefined
}
export interface PostgresqlClusterSpecEnvFromItem {
  "configMapRef": PostgresqlClusterSpecEnvFromItemConfigMapRef | undefined
  "prefix": string | undefined
  "secretRef": PostgresqlClusterSpecEnvFromItemSecretRef | undefined
}
export interface PostgresqlClusterSpecExternalClustersItemBarmanObjectStoreAzureCredentialsConnectionString {
  "key": string
  "name": string
}
export interface PostgresqlClusterSpecExternalClustersItemBarmanObjectStoreAzureCredentialsStorageAccount {
  "key": string
  "name": string
}
export interface PostgresqlClusterSpecExternalClustersItemBarmanObjectStoreAzureCredentialsStorageKey {
  "key": string
  "name": string
}
export interface PostgresqlClusterSpecExternalClustersItemBarmanObjectStoreAzureCredentialsStorageSasToken {
  "key": string
  "name": string
}
export interface PostgresqlClusterSpecExternalClustersItemBarmanObjectStoreAzureCredentials {
  "connectionString": PostgresqlClusterSpecExternalClustersItemBarmanObjectStoreAzureCredentialsConnectionString | undefined
  "inheritFromAzureAD": boolean | undefined
  "storageAccount": PostgresqlClusterSpecExternalClustersItemBarmanObjectStoreAzureCredentialsStorageAccount | undefined
  "storageKey": PostgresqlClusterSpecExternalClustersItemBarmanObjectStoreAzureCredentialsStorageKey | undefined
  "storageSasToken": PostgresqlClusterSpecExternalClustersItemBarmanObjectStoreAzureCredentialsStorageSasToken | undefined
}
export interface PostgresqlClusterSpecExternalClustersItemBarmanObjectStoreData {
  "compression": string | undefined
  "encryption": string | undefined
  "immediateCheckpoint": boolean | undefined
  "jobs": number | undefined
}
export interface PostgresqlClusterSpecExternalClustersItemBarmanObjectStoreEndpointCA {
  "key": string
  "name": string
}
export interface PostgresqlClusterSpecExternalClustersItemBarmanObjectStoreGoogleCredentialsApplicationCredentials {
  "key": string
  "name": string
}
export interface PostgresqlClusterSpecExternalClustersItemBarmanObjectStoreGoogleCredentials {
  "applicationCredentials": PostgresqlClusterSpecExternalClustersItemBarmanObjectStoreGoogleCredentialsApplicationCredentials | undefined
  "gkeEnvironment": boolean | undefined
}
export interface PostgresqlClusterSpecExternalClustersItemBarmanObjectStoreHistoryTags {
}
export interface PostgresqlClusterSpecExternalClustersItemBarmanObjectStoreS3CredentialsAccessKeyId {
  "key": string
  "name": string
}
export interface PostgresqlClusterSpecExternalClustersItemBarmanObjectStoreS3CredentialsRegion {
  "key": string
  "name": string
}
export interface PostgresqlClusterSpecExternalClustersItemBarmanObjectStoreS3CredentialsSecretAccessKey {
  "key": string
  "name": string
}
export interface PostgresqlClusterSpecExternalClustersItemBarmanObjectStoreS3CredentialsSessionToken {
  "key": string
  "name": string
}
export interface PostgresqlClusterSpecExternalClustersItemBarmanObjectStoreS3Credentials {
  "accessKeyId": PostgresqlClusterSpecExternalClustersItemBarmanObjectStoreS3CredentialsAccessKeyId | undefined
  "inheritFromIAMRole": boolean | undefined
  "region": PostgresqlClusterSpecExternalClustersItemBarmanObjectStoreS3CredentialsRegion | undefined
  "secretAccessKey": PostgresqlClusterSpecExternalClustersItemBarmanObjectStoreS3CredentialsSecretAccessKey | undefined
  "sessionToken": PostgresqlClusterSpecExternalClustersItemBarmanObjectStoreS3CredentialsSessionToken | undefined
}
export interface PostgresqlClusterSpecExternalClustersItemBarmanObjectStoreTags {
}
export interface PostgresqlClusterSpecExternalClustersItemBarmanObjectStoreWal {
  "compression": string | undefined
  "encryption": string | undefined
  "maxParallel": number | undefined
}
export interface PostgresqlClusterSpecExternalClustersItemBarmanObjectStore {
  "azureCredentials": PostgresqlClusterSpecExternalClustersItemBarmanObjectStoreAzureCredentials | undefined
  "data": PostgresqlClusterSpecExternalClustersItemBarmanObjectStoreData | undefined
  "destinationPath": string
  "endpointCA": PostgresqlClusterSpecExternalClustersItemBarmanObjectStoreEndpointCA | undefined
  "endpointURL": string | undefined
  "googleCredentials": PostgresqlClusterSpecExternalClustersItemBarmanObjectStoreGoogleCredentials | undefined
  "historyTags": PostgresqlClusterSpecExternalClustersItemBarmanObjectStoreHistoryTags | undefined
  "s3Credentials": PostgresqlClusterSpecExternalClustersItemBarmanObjectStoreS3Credentials | undefined
  "serverName": string | undefined
  "tags": PostgresqlClusterSpecExternalClustersItemBarmanObjectStoreTags | undefined
  "wal": PostgresqlClusterSpecExternalClustersItemBarmanObjectStoreWal | undefined
}
export interface PostgresqlClusterSpecExternalClustersItemConnectionParameters {
}
export interface PostgresqlClusterSpecExternalClustersItemPassword {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface PostgresqlClusterSpecExternalClustersItemSslCert {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface PostgresqlClusterSpecExternalClustersItemSslKey {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface PostgresqlClusterSpecExternalClustersItemSslRootCert {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface PostgresqlClusterSpecExternalClustersItem {
  "barmanObjectStore": PostgresqlClusterSpecExternalClustersItemBarmanObjectStore | undefined
  "connectionParameters": PostgresqlClusterSpecExternalClustersItemConnectionParameters | undefined
  "name": string
  "password": PostgresqlClusterSpecExternalClustersItemPassword | undefined
  "sslCert": PostgresqlClusterSpecExternalClustersItemSslCert | undefined
  "sslKey": PostgresqlClusterSpecExternalClustersItemSslKey | undefined
  "sslRootCert": PostgresqlClusterSpecExternalClustersItemSslRootCert | undefined
}
export interface PostgresqlClusterSpecImagePullSecretsItem {
  "name": string
}
export interface PostgresqlClusterSpecInheritedMetadataAnnotations {
}
export interface PostgresqlClusterSpecInheritedMetadataLabels {
}
export interface PostgresqlClusterSpecInheritedMetadata {
  "annotations": PostgresqlClusterSpecInheritedMetadataAnnotations | undefined
  "labels": PostgresqlClusterSpecInheritedMetadataLabels | undefined
}
export interface PostgresqlClusterSpecManagedRolesItemPasswordSecret {
  "name": string
}
export interface PostgresqlClusterSpecManagedRolesItem {
  "bypassrls": boolean | undefined
  "comment": string | undefined
  "connectionLimit": number | undefined
  "createdb": boolean | undefined
  "createrole": boolean | undefined
  "disablePassword": boolean | undefined
  "ensure": string | undefined
  "inRoles": Array<string> | undefined
  "inherit": boolean | undefined
  "login": boolean | undefined
  "name": string
  "passwordSecret": PostgresqlClusterSpecManagedRolesItemPasswordSecret | undefined
  "replication": boolean | undefined
  "superuser": boolean | undefined
  "validUntil": string | undefined
}
export interface PostgresqlClusterSpecManaged {
  "roles": Array<PostgresqlClusterSpecManagedRolesItem> | undefined
}
export interface PostgresqlClusterSpecMonitoringCustomQueriesConfigMapItem {
  "key": string
  "name": string
}
export interface PostgresqlClusterSpecMonitoringCustomQueriesSecretItem {
  "key": string
  "name": string
}
export interface PostgresqlClusterSpecMonitoring {
  "customQueriesConfigMap": Array<PostgresqlClusterSpecMonitoringCustomQueriesConfigMapItem> | undefined
  "customQueriesSecret": Array<PostgresqlClusterSpecMonitoringCustomQueriesSecretItem> | undefined
  "disableDefaultQueries": boolean | undefined
  "enablePodMonitor": boolean | undefined
}
export interface PostgresqlClusterSpecNodeMaintenanceWindow {
  "inProgress": boolean
  "reusePVC": boolean | undefined
}
export interface PostgresqlClusterSpecPostgresqlLdapBindAsAuth {
  "prefix": string | undefined
  "suffix": string | undefined
}
export interface PostgresqlClusterSpecPostgresqlLdapBindSearchAuthBindPassword {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface PostgresqlClusterSpecPostgresqlLdapBindSearchAuth {
  "baseDN": string | undefined
  "bindDN": string | undefined
  "bindPassword": PostgresqlClusterSpecPostgresqlLdapBindSearchAuthBindPassword | undefined
  "searchAttribute": string | undefined
  "searchFilter": string | undefined
}
export interface PostgresqlClusterSpecPostgresqlLdap {
  "bindAsAuth": PostgresqlClusterSpecPostgresqlLdapBindAsAuth | undefined
  "bindSearchAuth": PostgresqlClusterSpecPostgresqlLdapBindSearchAuth | undefined
  "port": number | undefined
  "scheme": string | undefined
  "server": string | undefined
  "tls": boolean | undefined
}
export interface PostgresqlClusterSpecPostgresqlParameters {
}
export interface PostgresqlClusterSpecPostgresqlSyncReplicaElectionConstraint {
  "enabled": boolean
  "nodeLabelsAntiAffinity": Array<string> | undefined
}
export interface PostgresqlClusterSpecPostgresql {
  "ldap": PostgresqlClusterSpecPostgresqlLdap | undefined
  "parameters": PostgresqlClusterSpecPostgresqlParameters | undefined
  "pg_hba": Array<string> | undefined
  "promotionTimeout": number | undefined
  "shared_preload_libraries": Array<string> | undefined
  "syncReplicaElectionConstraint": PostgresqlClusterSpecPostgresqlSyncReplicaElectionConstraint | undefined
}
export interface PostgresqlClusterSpecProjectedVolumeTemplateSourcesItemConfigMapItemsItem {
  "key": string
  "mode": number | undefined
  "path": string
}
export interface PostgresqlClusterSpecProjectedVolumeTemplateSourcesItemConfigMap {
  "items": Array<PostgresqlClusterSpecProjectedVolumeTemplateSourcesItemConfigMapItemsItem> | undefined
  "name": string | undefined
  "optional": boolean | undefined
}
export interface PostgresqlClusterSpecProjectedVolumeTemplateSourcesItemDownwardAPIItemsItemFieldRef {
  "apiVersion": string | undefined
  "fieldPath": string
}
export interface PostgresqlClusterSpecProjectedVolumeTemplateSourcesItemDownwardAPIItemsItemResourceFieldRef {
  "containerName": string | undefined
  "divisor": object | undefined
  "resource": string
}
export interface PostgresqlClusterSpecProjectedVolumeTemplateSourcesItemDownwardAPIItemsItem {
  "fieldRef": PostgresqlClusterSpecProjectedVolumeTemplateSourcesItemDownwardAPIItemsItemFieldRef | undefined
  "mode": number | undefined
  "path": string
  "resourceFieldRef": PostgresqlClusterSpecProjectedVolumeTemplateSourcesItemDownwardAPIItemsItemResourceFieldRef | undefined
}
export interface PostgresqlClusterSpecProjectedVolumeTemplateSourcesItemDownwardAPI {
  "items": Array<PostgresqlClusterSpecProjectedVolumeTemplateSourcesItemDownwardAPIItemsItem> | undefined
}
export interface PostgresqlClusterSpecProjectedVolumeTemplateSourcesItemSecretItemsItem {
  "key": string
  "mode": number | undefined
  "path": string
}
export interface PostgresqlClusterSpecProjectedVolumeTemplateSourcesItemSecret {
  "items": Array<PostgresqlClusterSpecProjectedVolumeTemplateSourcesItemSecretItemsItem> | undefined
  "name": string | undefined
  "optional": boolean | undefined
}
export interface PostgresqlClusterSpecProjectedVolumeTemplateSourcesItemServiceAccountToken {
  "audience": string | undefined
  "expirationSeconds": number | undefined
  "path": string
}
export interface PostgresqlClusterSpecProjectedVolumeTemplateSourcesItem {
  "configMap": PostgresqlClusterSpecProjectedVolumeTemplateSourcesItemConfigMap | undefined
  "downwardAPI": PostgresqlClusterSpecProjectedVolumeTemplateSourcesItemDownwardAPI | undefined
  "secret": PostgresqlClusterSpecProjectedVolumeTemplateSourcesItemSecret | undefined
  "serviceAccountToken": PostgresqlClusterSpecProjectedVolumeTemplateSourcesItemServiceAccountToken | undefined
}
export interface PostgresqlClusterSpecProjectedVolumeTemplate {
  "defaultMode": number | undefined
  "sources": Array<PostgresqlClusterSpecProjectedVolumeTemplateSourcesItem> | undefined
}
export interface PostgresqlClusterSpecReplica {
  "enabled": boolean | undefined
  "source": string
}
export interface PostgresqlClusterSpecReplicationSlotsHighAvailability {
  "enabled": boolean | undefined
  "slotPrefix": string | undefined
}
export interface PostgresqlClusterSpecReplicationSlots {
  "highAvailability": PostgresqlClusterSpecReplicationSlotsHighAvailability | undefined
  "updateInterval": number | undefined
}
export interface PostgresqlClusterSpecResourcesClaimsItem {
  "name": string
}
export interface PostgresqlClusterSpecResourcesLimits {
}
export interface PostgresqlClusterSpecResourcesRequests {
}
export interface PostgresqlClusterSpecResources {
  "claims": Array<PostgresqlClusterSpecResourcesClaimsItem> | undefined
  "limits": PostgresqlClusterSpecResourcesLimits | undefined
  "requests": PostgresqlClusterSpecResourcesRequests | undefined
}
export interface PostgresqlClusterSpecSeccompProfile {
  "localhostProfile": string | undefined
  "type": string
}
export interface PostgresqlClusterSpecServiceAccountTemplateMetadataAnnotations {
}
export interface PostgresqlClusterSpecServiceAccountTemplateMetadataLabels {
}
export interface PostgresqlClusterSpecServiceAccountTemplateMetadata {
  "annotations": PostgresqlClusterSpecServiceAccountTemplateMetadataAnnotations | undefined
  "labels": PostgresqlClusterSpecServiceAccountTemplateMetadataLabels | undefined
}
export interface PostgresqlClusterSpecServiceAccountTemplate {
  "metadata": PostgresqlClusterSpecServiceAccountTemplateMetadata
}
export interface PostgresqlClusterSpecStoragePvcTemplateDataSource {
  "apiGroup": string | undefined
  "kind": string
  "name": string
}
export interface PostgresqlClusterSpecStoragePvcTemplateDataSourceRef {
  "apiGroup": string | undefined
  "kind": string
  "name": string
  "namespace": string | undefined
}
export interface PostgresqlClusterSpecStoragePvcTemplateResourcesClaimsItem {
  "name": string
}
export interface PostgresqlClusterSpecStoragePvcTemplateResourcesLimits {
}
export interface PostgresqlClusterSpecStoragePvcTemplateResourcesRequests {
}
export interface PostgresqlClusterSpecStoragePvcTemplateResources {
  "claims": Array<PostgresqlClusterSpecStoragePvcTemplateResourcesClaimsItem> | undefined
  "limits": PostgresqlClusterSpecStoragePvcTemplateResourcesLimits | undefined
  "requests": PostgresqlClusterSpecStoragePvcTemplateResourcesRequests | undefined
}
export interface PostgresqlClusterSpecStoragePvcTemplateSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface PostgresqlClusterSpecStoragePvcTemplateSelectorMatchLabels {
}
export interface PostgresqlClusterSpecStoragePvcTemplateSelector {
  "matchExpressions": Array<PostgresqlClusterSpecStoragePvcTemplateSelectorMatchExpressionsItem> | undefined
  "matchLabels": PostgresqlClusterSpecStoragePvcTemplateSelectorMatchLabels | undefined
}
export interface PostgresqlClusterSpecStoragePvcTemplate {
  "accessModes": Array<string> | undefined
  "dataSource": PostgresqlClusterSpecStoragePvcTemplateDataSource | undefined
  "dataSourceRef": PostgresqlClusterSpecStoragePvcTemplateDataSourceRef | undefined
  "resources": PostgresqlClusterSpecStoragePvcTemplateResources | undefined
  "selector": PostgresqlClusterSpecStoragePvcTemplateSelector | undefined
  "storageClassName": string | undefined
  "volumeMode": string | undefined
  "volumeName": string | undefined
}
export interface PostgresqlClusterSpecStorage {
  "pvcTemplate": PostgresqlClusterSpecStoragePvcTemplate | undefined
  "resizeInUseVolumes": boolean | undefined
  "size": string | undefined
  "storageClass": string | undefined
}
export interface PostgresqlClusterSpecSuperuserSecret {
  "name": string
}
export interface PostgresqlClusterSpecTopologySpreadConstraintsItemLabelSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface PostgresqlClusterSpecTopologySpreadConstraintsItemLabelSelectorMatchLabels {
}
export interface PostgresqlClusterSpecTopologySpreadConstraintsItemLabelSelector {
  "matchExpressions": Array<PostgresqlClusterSpecTopologySpreadConstraintsItemLabelSelectorMatchExpressionsItem> | undefined
  "matchLabels": PostgresqlClusterSpecTopologySpreadConstraintsItemLabelSelectorMatchLabels | undefined
}
export interface PostgresqlClusterSpecTopologySpreadConstraintsItem {
  "labelSelector": PostgresqlClusterSpecTopologySpreadConstraintsItemLabelSelector | undefined
  "matchLabelKeys": Array<string> | undefined
  "maxSkew": number
  "minDomains": number | undefined
  "nodeAffinityPolicy": string | undefined
  "nodeTaintsPolicy": string | undefined
  "topologyKey": string
  "whenUnsatisfiable": string
}
export interface PostgresqlClusterSpecWalStoragePvcTemplateDataSource {
  "apiGroup": string | undefined
  "kind": string
  "name": string
}
export interface PostgresqlClusterSpecWalStoragePvcTemplateDataSourceRef {
  "apiGroup": string | undefined
  "kind": string
  "name": string
  "namespace": string | undefined
}
export interface PostgresqlClusterSpecWalStoragePvcTemplateResourcesClaimsItem {
  "name": string
}
export interface PostgresqlClusterSpecWalStoragePvcTemplateResourcesLimits {
}
export interface PostgresqlClusterSpecWalStoragePvcTemplateResourcesRequests {
}
export interface PostgresqlClusterSpecWalStoragePvcTemplateResources {
  "claims": Array<PostgresqlClusterSpecWalStoragePvcTemplateResourcesClaimsItem> | undefined
  "limits": PostgresqlClusterSpecWalStoragePvcTemplateResourcesLimits | undefined
  "requests": PostgresqlClusterSpecWalStoragePvcTemplateResourcesRequests | undefined
}
export interface PostgresqlClusterSpecWalStoragePvcTemplateSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface PostgresqlClusterSpecWalStoragePvcTemplateSelectorMatchLabels {
}
export interface PostgresqlClusterSpecWalStoragePvcTemplateSelector {
  "matchExpressions": Array<PostgresqlClusterSpecWalStoragePvcTemplateSelectorMatchExpressionsItem> | undefined
  "matchLabels": PostgresqlClusterSpecWalStoragePvcTemplateSelectorMatchLabels | undefined
}
export interface PostgresqlClusterSpecWalStoragePvcTemplate {
  "accessModes": Array<string> | undefined
  "dataSource": PostgresqlClusterSpecWalStoragePvcTemplateDataSource | undefined
  "dataSourceRef": PostgresqlClusterSpecWalStoragePvcTemplateDataSourceRef | undefined
  "resources": PostgresqlClusterSpecWalStoragePvcTemplateResources | undefined
  "selector": PostgresqlClusterSpecWalStoragePvcTemplateSelector | undefined
  "storageClassName": string | undefined
  "volumeMode": string | undefined
  "volumeName": string | undefined
}
export interface PostgresqlClusterSpecWalStorage {
  "pvcTemplate": PostgresqlClusterSpecWalStoragePvcTemplate | undefined
  "resizeInUseVolumes": boolean | undefined
  "size": string | undefined
  "storageClass": string | undefined
}
export interface PostgresqlClusterSpec {
  "affinity": PostgresqlClusterSpecAffinity | undefined
  "backup": PostgresqlClusterSpecBackup | undefined
  "bootstrap": PostgresqlClusterSpecBootstrap | undefined
  "certificates": PostgresqlClusterSpecCertificates | undefined
  "description": string | undefined
  "enableSuperuserAccess": boolean | undefined
  "env": Array<PostgresqlClusterSpecEnvItem> | undefined
  "envFrom": Array<PostgresqlClusterSpecEnvFromItem> | undefined
  "externalClusters": Array<PostgresqlClusterSpecExternalClustersItem> | undefined
  "failoverDelay": number | undefined
  "imageName": string | undefined
  "imagePullPolicy": string | undefined
  "imagePullSecrets": Array<PostgresqlClusterSpecImagePullSecretsItem> | undefined
  "inheritedMetadata": PostgresqlClusterSpecInheritedMetadata | undefined
  "instances": number
  "logLevel": string | undefined
  "managed": PostgresqlClusterSpecManaged | undefined
  "maxSyncReplicas": number | undefined
  "minSyncReplicas": number | undefined
  "monitoring": PostgresqlClusterSpecMonitoring | undefined
  "nodeMaintenanceWindow": PostgresqlClusterSpecNodeMaintenanceWindow | undefined
  "postgresGID": number | undefined
  "postgresUID": number | undefined
  "postgresql": PostgresqlClusterSpecPostgresql | undefined
  "primaryUpdateMethod": string | undefined
  "primaryUpdateStrategy": string | undefined
  "priorityClassName": string | undefined
  "projectedVolumeTemplate": PostgresqlClusterSpecProjectedVolumeTemplate | undefined
  "replica": PostgresqlClusterSpecReplica | undefined
  "replicationSlots": PostgresqlClusterSpecReplicationSlots | undefined
  "resources": PostgresqlClusterSpecResources | undefined
  "schedulerName": string | undefined
  "seccompProfile": PostgresqlClusterSpecSeccompProfile | undefined
  "serviceAccountTemplate": PostgresqlClusterSpecServiceAccountTemplate | undefined
  "startDelay": number | undefined
  "stopDelay": number | undefined
  "storage": PostgresqlClusterSpecStorage | undefined
  "superuserSecret": PostgresqlClusterSpecSuperuserSecret | undefined
  "switchoverDelay": number | undefined
  "topologySpreadConstraints": Array<PostgresqlClusterSpecTopologySpreadConstraintsItem> | undefined
  "walStorage": PostgresqlClusterSpecWalStorage | undefined
}
export interface PostgresqlCluster extends KubernetesObject {
  spec: PostgresqlClusterSpec
  status: PostgresqlClusterStatus | undefined
}
export type PostgresqlClusterList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<PostgresqlCluster>
