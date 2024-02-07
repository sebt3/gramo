// noGramoGenerator
import { QTableColumn } from 'quasar'
import { tableColumnAlign } from '../core'
export const cnpgIcon = 'apps';
export const cnpgTitle = 'PostgreSQL';
export const iconBackup = 'album';
export const colorBackup = '';
export const descriptionBackup = '';
export const shortBackup = '';
export const iconCluster = 'album';
export const colorCluster = '';
export const descriptionCluster = '';
export const shortCluster = '';
export const iconPooler = 'album';
export const colorPooler = '';
export const descriptionPooler = '';
export const shortPooler = '';
export const iconScheduledBackup = 'album';
export const colorScheduledBackup = '';
export const descriptionScheduledBackup = '';
export const shortScheduledBackup = '';
export const extraBackupColumns:Array<QTableColumn> = [
  {name: 'Age', label: 'Age', field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
  {name: 'Cluster', label: 'Cluster', field: row => row.spec.cluster.name, sortable: true, align: tableColumnAlign.left},
  {name: 'Phase', label: 'Phase', field: row => row.status.phase, sortable: true, align: tableColumnAlign.left},
  {name: 'Error', label: 'Error', field: row => row.status.error, sortable: true, align: tableColumnAlign.left},
];
export const extraClusterColumns:Array<QTableColumn> = [
  {name: 'Age', label: 'Age', field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
  {name: 'Instances', label: 'Instances', field: row => row.status.instances, sortable: true, align: tableColumnAlign.left},
  {name: 'Ready', label: 'Ready', field: row => row.status.readyInstances, sortable: true, align: tableColumnAlign.left},
  {name: 'Status', label: 'Status', field: row => row.status.phase, sortable: true, align: tableColumnAlign.left},
  {name: 'Primary', label: 'Primary', field: row => row.status.currentPrimary, sortable: true, align: tableColumnAlign.left},
];
export const extraPoolerColumns:Array<QTableColumn> = [
  {name: 'Age', label: 'Age', field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
  {name: 'Cluster', label: 'Cluster', field: row => row.spec.cluster.name, sortable: true, align: tableColumnAlign.left},
  {name: 'Type', label: 'Type', field: row => row.spec.type, sortable: true, align: tableColumnAlign.left},
];
export const extraScheduledBackupColumns:Array<QTableColumn> = [
  {name: 'Age', label: 'Age', field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
  {name: 'Cluster', label: 'Cluster', field: row => row.spec.cluster.name, sortable: true, align: tableColumnAlign.left},
  {name: 'Last Backup', label: 'Last Backup', field: row => row.status.lastScheduleTime, sortable: true, align: tableColumnAlign.left},
];
export const BackupListExcludes = [
  { path: 'metadata/creationTimestamp', include: true },
  { path: 'spec/cluster/name', include: true },
  { path: 'status/phase', include: true },
  { path: 'status/error', include: true },
];
export const BackupReadExcludes = [
];
export const BackupSimpleExcludes = [
];
export const ClusterListExcludes = [
  { path: 'metadata/creationTimestamp', include: true },
  { path: 'status/instances', include: true },
  { path: 'status/readyInstances', include: true },
  { path: 'status/phase', include: true },
  { path: 'status/currentPrimary', include: true },
];
export const ClusterReadExcludes = [
];
export const ClusterSimpleExcludes = [
];
export const PoolerListExcludes = [
  { path: 'metadata/creationTimestamp', include: true },
  { path: 'spec/cluster/name', include: true },
  { path: 'spec/type', include: true },
];
export const PoolerReadExcludes = [
];
export const PoolerSimpleExcludes = [
];
export const ScheduledBackupListExcludes = [
  { path: 'metadata/creationTimestamp', include: true },
  { path: 'spec/cluster/name', include: true },
  { path: 'status/lastScheduleTime', include: true },
];
export const ScheduledBackupReadExcludes = [
];
export const ScheduledBackupSimpleExcludes = [
];
