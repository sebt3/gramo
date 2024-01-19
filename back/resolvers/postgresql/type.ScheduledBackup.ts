type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface PostgresqlScheduledBackupStatus {
  "lastCheckTime": string | undefined
  "lastScheduleTime": string | undefined
  "nextScheduleTime": string | undefined
}
export interface PostgresqlScheduledBackupSpecCluster {
  "name": string
}
export interface PostgresqlScheduledBackupSpec {
  "backupOwnerReference": string | undefined
  "cluster": PostgresqlScheduledBackupSpecCluster | undefined
  "immediate": boolean | undefined
  "schedule": string
  "suspend": boolean | undefined
  "target": string | undefined
}
export interface PostgresqlScheduledBackup extends KubernetesObject {
  spec: PostgresqlScheduledBackupSpec
  status: PostgresqlScheduledBackupStatus | undefined
}
export type PostgresqlScheduledBackupList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<PostgresqlScheduledBackup>
