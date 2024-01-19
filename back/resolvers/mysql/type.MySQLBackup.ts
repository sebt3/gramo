type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface MysqlMySQLBackupStatus {
  "bucket": string | undefined
  "completionTime": string | undefined
  "container": string | undefined
  "elapsedTime": string | undefined
  "message": string | undefined
  "method": string | undefined
  "ociTenancy": string | undefined
  "output": string | undefined
  "size": string | undefined
  "source": string | undefined
  "spaceAvailable": string | undefined
  "startTime": string | undefined
  "status": string | undefined
}
export interface MysqlMySQLBackupSpec {
  "addTimestampToBackupDirectory": boolean | undefined
  "backupProfile": object | undefined
  "backupProfileName": string | undefined
  "clusterName": string
  "deleteBackupData": boolean | undefined
}
export interface MysqlMySQLBackup extends KubernetesObject {
  spec: MysqlMySQLBackupSpec
  status: MysqlMySQLBackupStatus | undefined
}
export type MysqlMySQLBackupList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<MysqlMySQLBackup>
