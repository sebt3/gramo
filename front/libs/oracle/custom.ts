// noGramoGenerator
import { QTableColumn } from 'quasar'
const { tableColumnAlign } = await import('../core/navigation.js')
const {  timeAgo } = await import('../core')
const { i18n } = await import("../i18n")
const { databaseColor, databaseIcon, } = await import('../../routes/custom');
export const oracleIcon = databaseIcon;
export const oracleTitle = 'Oracle';
export const iconNdbCluster = databaseIcon;
export const colorNdbCluster = databaseColor;
export const descriptionNdbCluster = '';
export const shortNdbCluster = 'NdbCluster';
export const iconInnoDBCluster = databaseIcon;
export const colorInnoDBCluster = databaseColor;
export const descriptionInnoDBCluster = '';
export const shortInnoDBCluster = 'InnoDBCluster';
export const iconMySQLBackup = databaseIcon;
export const colorMySQLBackup = databaseColor;
export const descriptionMySQLBackup = '';
export const shortMySQLBackup = 'MySQLBackup';
export const extraNdbClusterColumns:Array<QTableColumn> = [
  {name: 'Replica', label: `${i18n.global.t('oracle.Replica')}`, field: row => row.spec.redundancyLevel, sortable: true, align: tableColumnAlign.left},
  {name: 'ManagementNodes', label: `${i18n.global.t('oracle.ManagementNodes')}`, field: row => row.status.readyManagementNodes, sortable: true, align: tableColumnAlign.left},
  {name: 'DataNodes', label: `${i18n.global.t('oracle.DataNodes')}`, field: row => row.status.readyDataNodes, sortable: true, align: tableColumnAlign.left},
  {name: 'MySQLServers', label: `${i18n.global.t('oracle.MySQLServers')}`, field: row => row.status.readyMySQLServers, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: `${i18n.global.t('meta.age')}`, field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
];
export const extraInnoDBClusterColumns:Array<QTableColumn> = [
  {name: 'Status', label: `${i18n.global.t('core.status')}`, field: row => row.status?.cluster.status, sortable: true, align: tableColumnAlign.left},
  {name: 'Online', label: `${i18n.global.t('oracle.Online')}`, field: row => row.status?.cluster.onlineInstances, sortable: true, align: tableColumnAlign.left},
  {name: 'Instances', label: `${i18n.global.t('oracle.Instances')}`, field: row => row.spec.instances, sortable: true, align: tableColumnAlign.left},
  {name: 'Routers', label: `${i18n.global.t('oracle.Routers')}`, field: row => row.spec.router.instances, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: `${i18n.global.t('meta.age')}`, field: row => timeAgo(row.metadata.creationTimestamp), sortable: true, align: tableColumnAlign.left},
];
export const extraMySQLBackupColumns:Array<QTableColumn> = [
  {name: 'Cluster', label: `${i18n.global.t('oracle.Cluster')}`, field: row => row.spec.clusterName, sortable: true, align: tableColumnAlign.left},
  {name: 'Status', label: `${i18n.global.t('core.status')}`, field: row => row.status?.status, sortable: true, align: tableColumnAlign.left},
  {name: 'Output', label: `${i18n.global.t('oracle.Output')}`, field: row => row.status?.output, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: `${i18n.global.t('meta.age')}`, field: row => timeAgo(row.metadata.creationTimestamp), sortable: true, align: tableColumnAlign.left},
];
export const NdbClusterListExcludes = [
  { path: 'spec/redundancyLevel', include: true },
  { path: 'status/readyManagementNodes', include: true },
  { path: 'status/readyDataNodes', include: true },
  { path: 'status/readyMySQLServers', include: true },
  { path: 'metadata/creationTimestamp', include: true },
];
export const NdbClusterReadExcludes = [
];
export const NdbClusterSimpleExcludes = [
];
export const InnoDBClusterListExcludes = [
  { path: 'status/cluster/status', include: true },
  { path: 'status/cluster/onlineInstances', include: true },
  { path: 'spec/instances', include: true },
  { path: 'spec/router/instances', include: true },
];
export const InnoDBClusterReadExcludes = [
];
export const InnoDBClusterSimpleExcludes = [
];
export const MySQLBackupListExcludes = [
  { path: 'spec/clusterName', include: true },
  { path: 'status/status', include: true },
  { path: 'status/output', include: true },
];
export const MySQLBackupReadExcludes = [
];
export const MySQLBackupSimpleExcludes = [
];
