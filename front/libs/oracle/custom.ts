// noGramoGenerator
import { QTableColumn } from 'quasar'
import { tableColumnAlign } from '../core'
export const oracleIcon = 'apps';
export const oracleTitle = 'Oracle';
export const iconInnoDBCluster = 'album';
export const colorInnoDBCluster = '';
export const descriptionInnoDBCluster = '';
export const shortInnoDBCluster = '';
export const iconMySQLBackup = 'album';
export const colorMySQLBackup = '';
export const descriptionMySQLBackup = '';
export const shortMySQLBackup = '';
export const extraInnoDBClusterColumns:Array<QTableColumn> = [
  {name: 'Status', label: 'Status', field: row => row.status.cluster.status, sortable: true, align: tableColumnAlign.left},
  {name: 'Online', label: 'Online', field: row => row.status.cluster.onlineInstances, sortable: true, align: tableColumnAlign.left},
  {name: 'Instances', label: 'Instances', field: row => row.spec.instances, sortable: true, align: tableColumnAlign.left},
  {name: 'Routers', label: 'Routers', field: row => row.spec.router.instances, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: 'Age', field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
];
export const extraMySQLBackupColumns:Array<QTableColumn> = [
  {name: 'Cluster', label: 'Cluster', field: row => row.spec.clusterName, sortable: true, align: tableColumnAlign.left},
  {name: 'Status', label: 'Status', field: row => row.status.status, sortable: true, align: tableColumnAlign.left},
  {name: 'Output', label: 'Output', field: row => row.status.output, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: 'Age', field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
];
export const InnoDBClusterListExcludes = [
  { path: 'status/cluster/status', include: true },
  { path: 'status/cluster/onlineInstances', include: true },
  { path: 'spec/instances', include: true },
  { path: 'spec/router/instances', include: true },
  { path: 'metadata/creationTimestamp', include: true },
];
export const InnoDBClusterReadExcludes = [
];
export const InnoDBClusterSimpleExcludes = [
];
export const MySQLBackupListExcludes = [
  { path: 'spec/clusterName', include: true },
  { path: 'status/status', include: true },
  { path: 'status/output', include: true },
  { path: 'metadata/creationTimestamp', include: true },
];
export const MySQLBackupReadExcludes = [
];
export const MySQLBackupSimpleExcludes = [
];
