// noGramoGenerator
import { QTableColumn } from 'quasar'
const { tableColumnAlign } = await import('../core/navigation.js')
const {  timeAgo } = await import('../core')
const { i18n } = await import("../i18n")
const { databaseColor, databaseIcon, } = await import('../../routes/custom');
export const cnpgIcon = databaseIcon;
export const cnpgTitle = 'PostgreSQL';
export const iconBackup = 'backup';
export const colorBackup = databaseColor;
export const descriptionBackup = '';
export const shortBackup = 'Backup';
export const iconCluster = databaseIcon;
export const colorCluster = databaseColor;
export const descriptionCluster = '';
export const shortCluster = 'Cluster';
export const iconPooler = databaseIcon;
export const colorPooler = databaseColor;
export const descriptionPooler = '';
export const shortPooler = 'Pooler';
export const iconScheduledBackup = iconBackup;
export const colorScheduledBackup = databaseColor;
export const descriptionScheduledBackup = '';
export const shortScheduledBackup = 'ScheduledBackup';
export const extraBackupColumns:Array<QTableColumn> = [
  {name: 'Age', label: `${i18n.global.t('meta.age')}`, field: row => timeAgo(row.metadata.creationTimestamp), sortable: true, align: tableColumnAlign.left},
  {name: 'Cluster', label: `${i18n.global.t('cnpg.Cluster')}`, field: row => row.spec.cluster.name, sortable: true, align: tableColumnAlign.left},
  {name: 'Phase', label: `${i18n.global.t('cnpg.Phase')}`, field: row => row.status.phase, sortable: true, align: tableColumnAlign.left},
  {name: 'Error', label: `${i18n.global.t('core.error')}`, field: row => row.status.error, sortable: true, align: tableColumnAlign.left},
];
export const extraClusterColumns:Array<QTableColumn> = [
  {name: 'Age', label: `${i18n.global.t('meta.age')}`, field: row => timeAgo(row.metadata.creationTimestamp), sortable: true, align: tableColumnAlign.left},
  {name: 'Instances', label: `${i18n.global.t('cnpg.Instances')}`, field: row => row.status.instances, sortable: true, align: tableColumnAlign.left},
  {name: 'Ready', label: `${i18n.global.t('core.ready')}`, field: row => row.status.readyInstances, sortable: true, align: tableColumnAlign.left},
  {name: 'Status', label: `${i18n.global.t('core.status')}`, field: row => row.status.phase, sortable: true, align: tableColumnAlign.left},
  {name: 'Primary', label: `${i18n.global.t('cnpg.Primary')}`, field: row => row.status.currentPrimary, sortable: true, align: tableColumnAlign.left},
];
export const extraPoolerColumns:Array<QTableColumn> = [
  {name: 'Age', label: `${i18n.global.t('meta.age')}`, field: row => timeAgo(row.metadata.creationTimestamp), sortable: true, align: tableColumnAlign.left},
  {name: 'Cluster', label: `${i18n.global.t('cnpg.Cluster')}`, field: row => row.spec.cluster.name, sortable: true, align: tableColumnAlign.left},
  {name: 'Type', label: `${i18n.global.t('core.type')}`, field: row => row.spec.type, sortable: true, align: tableColumnAlign.left},
];
export const extraScheduledBackupColumns:Array<QTableColumn> = [
  {name: 'Age', label: `${i18n.global.t('meta.age')}`, field: row => timeAgo(row.metadata.creationTimestamp), sortable: true, align: tableColumnAlign.left},
  {name: 'Cluster', label: `${i18n.global.t('cnpg.Cluster')}`, field: row => row.spec.cluster.name, sortable: true, align: tableColumnAlign.left},
  {name: 'Last Backup', label: `${i18n.global.t('cnpg.lastBackup')}`, field: row => row.status.lastScheduleTime, sortable: true, align: tableColumnAlign.left},
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
  { path: 'status', include: true },
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
