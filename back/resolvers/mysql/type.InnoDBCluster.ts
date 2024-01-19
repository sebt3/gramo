type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface MysqlInnoDBClusterStatus {
}
export interface MysqlInnoDBClusterSpecImagePullSecretsItem {
  "name": string | undefined
}
export interface MysqlInnoDBClusterSpecKeyringEncryptedFile {
  "fileName": string
  "password": string
  "readOnly": boolean | undefined
  "storage": object
}
export interface MysqlInnoDBClusterSpecKeyringFile {
  "fileName": string
  "readOnly": boolean | undefined
  "storage": object
}
export interface MysqlInnoDBClusterSpecKeyringOciEndpoints {
  "encryption": string | undefined
  "management": string | undefined
  "secrets": string | undefined
  "vaults": string | undefined
}
export interface MysqlInnoDBClusterSpecKeyringOci {
  "caCertificate": string | undefined
  "compartment": string | undefined
  "endpoints": MysqlInnoDBClusterSpecKeyringOciEndpoints | undefined
  "keyFingerprint": string
  "keySecret": string
  "masterKey": string | undefined
  "tenancy": string
  "user": string
  "virtualVault": string | undefined
}
export interface MysqlInnoDBClusterSpecKeyring {
  "encryptedFile": MysqlInnoDBClusterSpecKeyringEncryptedFile | undefined
  "file": MysqlInnoDBClusterSpecKeyringFile | undefined
  "oci": MysqlInnoDBClusterSpecKeyringOci | undefined
}
export interface MysqlInnoDBClusterSpecLogsCollectorFluentdErrorLog {
  "options": object | undefined
  "tag": string | undefined
}
export interface MysqlInnoDBClusterSpecLogsCollectorFluentdGeneralLog {
  "options": object | undefined
  "tag": string | undefined
}
export interface MysqlInnoDBClusterSpecLogsCollectorFluentdRecordAugmentationAnnotationsItem {
  "annotationName": string
  "fieldName": string
}
export interface MysqlInnoDBClusterSpecLogsCollectorFluentdRecordAugmentationLabelsItem {
  "fieldName": string
  "labelName": string
}
export interface MysqlInnoDBClusterSpecLogsCollectorFluentdRecordAugmentationPodFieldsItem {
  "fieldName": string
  "fieldPath": string
}
export interface MysqlInnoDBClusterSpecLogsCollectorFluentdRecordAugmentationResourceFieldsItem {
  "containerName": string
  "fieldName": string
  "resource": string
}
export interface MysqlInnoDBClusterSpecLogsCollectorFluentdRecordAugmentationStaticFieldsItem {
  "fieldName": string
  "fieldValue": string
}
export interface MysqlInnoDBClusterSpecLogsCollectorFluentdRecordAugmentation {
  "annotations": Array<MysqlInnoDBClusterSpecLogsCollectorFluentdRecordAugmentationAnnotationsItem> | undefined
  "enabled": boolean | undefined
  "labels": Array<MysqlInnoDBClusterSpecLogsCollectorFluentdRecordAugmentationLabelsItem> | undefined
  "podFields": Array<MysqlInnoDBClusterSpecLogsCollectorFluentdRecordAugmentationPodFieldsItem> | undefined
  "resourceFields": Array<MysqlInnoDBClusterSpecLogsCollectorFluentdRecordAugmentationResourceFieldsItem> | undefined
  "staticFields": Array<MysqlInnoDBClusterSpecLogsCollectorFluentdRecordAugmentationStaticFieldsItem> | undefined
}
export interface MysqlInnoDBClusterSpecLogsCollectorFluentdSlowQueryLog {
  "options": object | undefined
  "tag": string | undefined
}
export interface MysqlInnoDBClusterSpecLogsCollectorFluentd {
  "additionalFilterConfiguration": string | undefined
  "errorLog": MysqlInnoDBClusterSpecLogsCollectorFluentdErrorLog | undefined
  "generalLog": MysqlInnoDBClusterSpecLogsCollectorFluentdGeneralLog | undefined
  "recordAugmentation": MysqlInnoDBClusterSpecLogsCollectorFluentdRecordAugmentation | undefined
  "sinks": Array<object> | undefined
  "slowQueryLog": MysqlInnoDBClusterSpecLogsCollectorFluentdSlowQueryLog | undefined
}
export interface MysqlInnoDBClusterSpecLogsCollector {
  "containerName": string | undefined
  "env": Array<object> | undefined
  "fluentd": MysqlInnoDBClusterSpecLogsCollectorFluentd | undefined
  "image": string | undefined
}
export interface MysqlInnoDBClusterSpecLogsError {
  "collect": boolean | undefined
  "verbosity": number | undefined
}
export interface MysqlInnoDBClusterSpecLogsGeneral {
  "collect": boolean | undefined
  "enabled": boolean | undefined
}
export interface MysqlInnoDBClusterSpecLogsSlowQuery {
  "collect": boolean | undefined
  "enabled": boolean | undefined
  "longQueryTime": number | undefined
}
export interface MysqlInnoDBClusterSpecLogs {
  "collector": MysqlInnoDBClusterSpecLogsCollector | undefined
  "error": MysqlInnoDBClusterSpecLogsError | undefined
  "general": MysqlInnoDBClusterSpecLogsGeneral | undefined
  "slowQuery": MysqlInnoDBClusterSpecLogsSlowQuery | undefined
}
export interface MysqlInnoDBClusterSpecMetrics {
  "enable": boolean
  "image": string
  "monitor": boolean | undefined
  "monitorSpec": object | undefined
  "options": Array<string> | undefined
  "tlsSecret": string | undefined
  "webConfig": string | undefined
}
export interface MysqlInnoDBClusterSpecReadReplicasItem {
  "baseServerId": number
  "datadirVolumeClaimTemplate": object | undefined
  "instances": number | undefined
  "mycnf": string | undefined
  "name": string
  "podAnnotations": object | undefined
  "podLabels": object | undefined
  "podSpec": object | undefined
  "version": string | undefined
}
export interface MysqlInnoDBClusterSpecRouterRoutingOptions {
  "invalidated_cluster_policy": string | undefined
  "read_only_targets": string | undefined
  "stats_updates_frequency": number | undefined
}
export interface MysqlInnoDBClusterSpecRouter {
  "bootstrapOptions": Array<string> | undefined
  "instances": number | undefined
  "options": Array<string> | undefined
  "podAnnotations": object | undefined
  "podLabels": object | undefined
  "podSpec": object | undefined
  "routingOptions": MysqlInnoDBClusterSpecRouterRoutingOptions | undefined
  "tlsSecretName": string | undefined
  "version": string | undefined
}
export interface MysqlInnoDBClusterSpecService {
  "annotations": object | undefined
  "defaultPort": string | undefined
  "labels": object | undefined
  "type": string | undefined
}
export interface MysqlInnoDBClusterSpec {
  "backupProfiles": Array<object> | undefined
  "backupSchedules": Array<object> | undefined
  "baseServerId": number | undefined
  "datadirVolumeClaimTemplate": object | undefined
  "edition": string | undefined
  "imagePullPolicy": string | undefined
  "imagePullSecrets": Array<MysqlInnoDBClusterSpecImagePullSecretsItem> | undefined
  "imageRepository": string | undefined
  "initDB": object | undefined
  "instances": number | undefined
  "keyring": MysqlInnoDBClusterSpecKeyring | undefined
  "logs": MysqlInnoDBClusterSpecLogs | undefined
  "metrics": MysqlInnoDBClusterSpecMetrics | undefined
  "mycnf": string | undefined
  "podAnnotations": object | undefined
  "podLabels": object | undefined
  "podSpec": object | undefined
  "readReplicas": Array<MysqlInnoDBClusterSpecReadReplicasItem> | undefined
  "router": MysqlInnoDBClusterSpecRouter | undefined
  "secretName": string
  "service": MysqlInnoDBClusterSpecService | undefined
  "serviceAccountName": string | undefined
  "tlsCASecretName": string | undefined
  "tlsSecretName": string | undefined
  "tlsUseSelfSigned": boolean | undefined
  "version": string | undefined
}
export interface MysqlInnoDBCluster extends KubernetesObject {
  spec: MysqlInnoDBClusterSpec
  status: MysqlInnoDBClusterStatus | undefined
}
export type MysqlInnoDBClusterList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<MysqlInnoDBCluster>
