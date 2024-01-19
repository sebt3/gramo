type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface PostgresqlBackupStatusAzureCredentialsConnectionString {
  "key": string
  "name": string
}
export interface PostgresqlBackupStatusAzureCredentialsStorageAccount {
  "key": string
  "name": string
}
export interface PostgresqlBackupStatusAzureCredentialsStorageKey {
  "key": string
  "name": string
}
export interface PostgresqlBackupStatusAzureCredentialsStorageSasToken {
  "key": string
  "name": string
}
export interface PostgresqlBackupStatusAzureCredentials {
  "connectionString": PostgresqlBackupStatusAzureCredentialsConnectionString | undefined
  "inheritFromAzureAD": boolean | undefined
  "storageAccount": PostgresqlBackupStatusAzureCredentialsStorageAccount | undefined
  "storageKey": PostgresqlBackupStatusAzureCredentialsStorageKey | undefined
  "storageSasToken": PostgresqlBackupStatusAzureCredentialsStorageSasToken | undefined
}
export interface PostgresqlBackupStatusEndpointCA {
  "key": string
  "name": string
}
export interface PostgresqlBackupStatusGoogleCredentialsApplicationCredentials {
  "key": string
  "name": string
}
export interface PostgresqlBackupStatusGoogleCredentials {
  "applicationCredentials": PostgresqlBackupStatusGoogleCredentialsApplicationCredentials | undefined
  "gkeEnvironment": boolean | undefined
}
export interface PostgresqlBackupStatusInstanceID {
  "ContainerID": string | undefined
  "podName": string | undefined
}
export interface PostgresqlBackupStatusS3CredentialsAccessKeyId {
  "key": string
  "name": string
}
export interface PostgresqlBackupStatusS3CredentialsRegion {
  "key": string
  "name": string
}
export interface PostgresqlBackupStatusS3CredentialsSecretAccessKey {
  "key": string
  "name": string
}
export interface PostgresqlBackupStatusS3CredentialsSessionToken {
  "key": string
  "name": string
}
export interface PostgresqlBackupStatusS3Credentials {
  "accessKeyId": PostgresqlBackupStatusS3CredentialsAccessKeyId | undefined
  "inheritFromIAMRole": boolean | undefined
  "region": PostgresqlBackupStatusS3CredentialsRegion | undefined
  "secretAccessKey": PostgresqlBackupStatusS3CredentialsSecretAccessKey | undefined
  "sessionToken": PostgresqlBackupStatusS3CredentialsSessionToken | undefined
}
export interface PostgresqlBackupStatus {
  "azureCredentials": PostgresqlBackupStatusAzureCredentials | undefined
  "backupId": string | undefined
  "backupName": string | undefined
  "beginLSN": string | undefined
  "beginWal": string | undefined
  "commandError": string | undefined
  "commandOutput": string | undefined
  "destinationPath": string | undefined
  "encryption": string | undefined
  "endLSN": string | undefined
  "endWal": string | undefined
  "endpointCA": PostgresqlBackupStatusEndpointCA | undefined
  "endpointURL": string | undefined
  "error": string | undefined
  "googleCredentials": PostgresqlBackupStatusGoogleCredentials | undefined
  "instanceID": PostgresqlBackupStatusInstanceID | undefined
  "phase": string | undefined
  "s3Credentials": PostgresqlBackupStatusS3Credentials | undefined
  "serverName": string | undefined
  "startedAt": string | undefined
  "stoppedAt": string | undefined
}
export interface PostgresqlBackupSpecCluster {
  "name": string
}
export interface PostgresqlBackupSpec {
  "cluster": PostgresqlBackupSpecCluster | undefined
  "target": string | undefined
}
export interface PostgresqlBackup extends KubernetesObject {
  spec: PostgresqlBackupSpec
  status: PostgresqlBackupStatus | undefined
}
export type PostgresqlBackupList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<PostgresqlBackup>
