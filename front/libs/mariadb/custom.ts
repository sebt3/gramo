// noGramoGenerator
import { QTableColumn } from 'quasar'
import { tableColumnAlign } from '../core'
export const iconBackup = 'backup';
export const iconConnection = 'link';
export const iconDatabase = 'fas fa-database';
export const iconGrant = 'album';
export const iconMariaDB = 'group_work';
export const iconRestore = 'cloud_download';
export const iconSqlJob = 'album';
export const iconUser = 'fas fa-user';
export const mariadbIcon = 'apps';
export const mariadbTitle = 'MariaDB';
export const colorBackup = '';
export const descriptionBackup = '';
export const shortBackup = '';
export const colorConnection = '';
export const descriptionConnection = '';
export const shortConnection = '';
export const colorDatabase = '';
export const descriptionDatabase = '';
export const shortDatabase = '';
export const colorGrant = '';
export const descriptionGrant = '';
export const shortGrant = '';
export const colorMariaDB = '';
export const descriptionMariaDB = '';
export const shortMariaDB = '';
export const colorRestore = '';
export const descriptionRestore = '';
export const shortRestore = '';
export const colorSqlJob = '';
export const descriptionSqlJob = '';
export const shortSqlJob = '';
export const colorUser = '';
export const descriptionUser = '';
export const shortUser = '';

export const extraBackupColumns:Array<QTableColumn> = [
  {name: 'MariaDB', label: 'MariaDB', field: row => row.spec.mariaDbRef.name, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: 'Age', field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
];
export const extraConnectionColumns:Array<QTableColumn> = [
  {name: 'Secret', label: 'Secret', field: row => row.spec.secretName, sortable: true, align: tableColumnAlign.left},
  {name: 'MariaDB', label: 'MariaDB', field: row => row.spec.mariaDbRef.name, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: 'Age', field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
];
export const extraDatabaseColumns:Array<QTableColumn> = [
  {name: 'CharSet', label: 'CharSet', field: row => row.spec.characterSet, sortable: true, align: tableColumnAlign.left},
  {name: 'Collate', label: 'Collate', field: row => row.spec.collate, sortable: true, align: tableColumnAlign.left},
  {name: 'MariaDB', label: 'MariaDB', field: row => row.spec.mariaDbRef.name, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: 'Age', field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
  {name: 'Name', label: 'Name', field: row => row.spec.name, sortable: true, align: tableColumnAlign.left},
];
export const extraGrantColumns:Array<QTableColumn> = [
  {name: 'Database', label: 'Database', field: row => row.spec.database, sortable: true, align: tableColumnAlign.left},
  {name: 'Table', label: 'Table', field: row => row.spec.table, sortable: true, align: tableColumnAlign.left},
  {name: 'Username', label: 'Username', field: row => row.spec.username, sortable: true, align: tableColumnAlign.left},
  {name: 'GrantOpt', label: 'GrantOpt', field: row => row.spec.grantOption, sortable: true, align: tableColumnAlign.left},
  {name: 'MariaDB', label: 'MariaDB', field: row => row.spec.mariaDbRef.name, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: 'Age', field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
];
export const extraMariaDBColumns:Array<QTableColumn> = [
  {name: 'Primary Pod', label: 'Primary Pod', field: row => row.status.currentPrimary, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: 'Age', field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
];
export const extraRestoreColumns:Array<QTableColumn> = [
  {name: 'MariaDB', label: 'MariaDB', field: row => row.spec.mariaDbRef.name, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: 'Age', field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
];
export const extraSqlJobColumns:Array<QTableColumn> = [
  {name: 'MariaDB', label: 'MariaDB', field: row => row.spec.mariaDbRef.name, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: 'Age', field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
];
export const extraUserColumns:Array<QTableColumn> = [
  {name: 'MaxConns', label: 'MaxConns', field: row => row.spec.maxUserConnections, sortable: true, align: tableColumnAlign.left},
  {name: 'MariaDB', label: 'MariaDB', field: row => row.spec.mariaDbRef.name, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: 'Age', field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
];
export const BackupListExcludes = [
  { path: 'spec/mariaDbRef/name', include: true },
  { path: 'metadata/creationTimestamp', include: true },
];
export const BackupReadExcludes = [
];
export const BackupSimpleExcludes = [
];
export const ConnectionListExcludes = [
  { path: 'spec/secretName', include: true },
  { path: 'spec/mariaDbRef/name', include: true },
  { path: 'metadata/creationTimestamp', include: true },
];
export const ConnectionReadExcludes = [
];
export const ConnectionSimpleExcludes = [
];
export const DatabaseListExcludes = [
  { path: 'spec/characterSet', include: true },
  { path: 'spec/collate', include: true },
  { path: 'spec/mariaDbRef/name', include: true },
  { path: 'metadata/creationTimestamp', include: true },
  { path: 'spec/name', include: true },
];
export const DatabaseReadExcludes = [
];
export const DatabaseSimpleExcludes = [
];
export const GrantListExcludes = [
  { path: 'spec/database', include: true },
  { path: 'spec/table', include: true },
  { path: 'spec/username', include: true },
  { path: 'spec/grantOption', include: true },
  { path: 'spec/mariaDbRef/name', include: true },
  { path: 'metadata/creationTimestamp', include: true },
];
export const GrantReadExcludes = [
];
export const GrantSimpleExcludes = [
];
export const MariaDBListExcludes = [
  { path: 'status/currentPrimary', include: true },
  { path: 'metadata/creationTimestamp', include: true },
];
export const MariaDBReadExcludes = [
];
export const MariaDBSimpleExcludes = [
];
export const RestoreListExcludes = [
  { path: 'spec/mariaDbRef/name', include: true },
  { path: 'metadata/creationTimestamp', include: true },
];
export const RestoreReadExcludes = [
];
export const RestoreSimpleExcludes = [
];
export const SqlJobListExcludes = [
  { path: 'spec/mariaDbRef/name', include: true },
  { path: 'metadata/creationTimestamp', include: true },
];
export const SqlJobReadExcludes = [
];
export const SqlJobSimpleExcludes = [
];
export const UserListExcludes = [
  { path: 'spec/maxUserConnections', include: true },
  { path: 'spec/mariaDbRef/name', include: true },
  { path: 'metadata/creationTimestamp', include: true },
];
export const UserReadExcludes = [
];
export const UserSimpleExcludes = [
];
