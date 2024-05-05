// noGramoGenerator
import { QTableColumn } from 'quasar'
const { tableColumnAlign } = await import('../core/navigation.js')
const {  timeAgo } = await import('../core')
const { i18n } = await import("../i18n")
const { databaseColor, databaseIcon, } = await import('../../routes/custom');
export const iconBackup = 'backup';
export const iconConnection = 'link';
export const iconRestore = 'cloud_download';
export const iconUser = 'fas fa-user';
export const mariadbIcon = databaseIcon;
export const mariadbTitle = 'MariaDB';
export const colorBackup = databaseColor;
export const descriptionBackup = '';
export const shortBackup = 'Backup';
export const colorConnection = databaseColor;
export const descriptionConnection = '';
export const shortConnection = 'Connection';
export const iconDatabase = databaseIcon;
export const colorDatabase = databaseColor;
export const descriptionDatabase = '';
export const shortDatabase = 'Database';
export const iconGrant = 'album';
export const colorGrant = databaseColor;
export const descriptionGrant = '';
export const shortGrant = 'Grant';
export const iconMariaDB = 'group_work';
export const colorMariaDB = databaseColor;
export const descriptionMariaDB = '';
export const shortMariaDB = 'MariaDB';
export const colorRestore = databaseColor;
export const descriptionRestore = '';
export const shortRestore = 'Restore';
export const iconSqlJob = 'album';
export const colorSqlJob = databaseColor;
export const descriptionSqlJob = '';
export const shortSqlJob = 'SqlJob';
export const colorUser = databaseColor;
export const descriptionUser = '';
export const shortUser = 'User';

export const extraBackupColumns:Array<QTableColumn> = [
  {name: 'MariaDB', label: `${i18n.global.t('mariadb.MariaDB')}`, field: row => row.spec.mariaDbRef.name, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: `${i18n.global.t('meta.age')}`, field: row => timeAgo(row.metadata.creationTimestamp), sortable: true, align: tableColumnAlign.left},
];
export const extraConnectionColumns:Array<QTableColumn> = [
  {name: 'Secret', label: `${i18n.global.t('mariadb.Secret')}`, field: row => row.spec.secretName, sortable: true, align: tableColumnAlign.left},
  {name: 'MariaDB', label: `${i18n.global.t('mariadb.MariaDB')}`, field: row => row.spec.mariaDbRef.name, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: `${i18n.global.t('meta.age')}`, field: row => timeAgo(row.metadata.creationTimestamp), sortable: true, align: tableColumnAlign.left},
];
export const extraDatabaseColumns:Array<QTableColumn> = [
  {name: 'CharSet', label: `${i18n.global.t('mariadb.CharSet')}`, field: row => row.spec.characterSet, sortable: true, align: tableColumnAlign.left},
  {name: 'Collate', label: `${i18n.global.t('mariadb.Collate')}`, field: row => row.spec.collate, sortable: true, align: tableColumnAlign.left},
  {name: 'MariaDB', label: `${i18n.global.t('mariadb.MariaDB')}`, field: row => row.spec.mariaDbRef.name, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: `${i18n.global.t('meta.age')}`, field: row => timeAgo(row.metadata.creationTimestamp), sortable: true, align: tableColumnAlign.left},
  {name: 'Name', label: `${i18n.global.t('meta.name')}`, field: row => row.spec.name, sortable: true, align: tableColumnAlign.left},
];
export const extraGrantColumns:Array<QTableColumn> = [
  {name: 'Database', label: `${i18n.global.t('mariadb.Database')}`, field: row => row.spec.database, sortable: true, align: tableColumnAlign.left},
  {name: 'Table', label: `${i18n.global.t('mariadb.Table')}`, field: row => row.spec.table, sortable: true, align: tableColumnAlign.left},
  {name: 'Username', label: `${i18n.global.t('mariadb.Username')}`, field: row => row.spec.username, sortable: true, align: tableColumnAlign.left},
  {name: 'GrantOpt', label: `${i18n.global.t('mariadb.GrantOpt')}`, field: row => row.spec.grantOption, sortable: true, align: tableColumnAlign.left},
  {name: 'MariaDB', label: `${i18n.global.t('mariadb.MariaDB')}`, field: row => row.spec.mariaDbRef.name, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: `${i18n.global.t('meta.age')}`, field: row => timeAgo(row.metadata.creationTimestamp), sortable: true, align: tableColumnAlign.left},
];
export const extraMariaDBColumns:Array<QTableColumn> = [
  {name: 'PrimaryPod', label: `${i18n.global.t('mariadb.PrimaryPod')}`, field: row => row.status?.currentPrimary, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: `${i18n.global.t('meta.age')}`, field: row => timeAgo(row.metadata.creationTimestamp), sortable: true, align: tableColumnAlign.left},
];
export const extraRestoreColumns:Array<QTableColumn> = [
  {name: 'MariaDB', label: `${i18n.global.t('mariadb.MariaDB')}`, field: row => row.spec.mariaDbRef.name, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: `${i18n.global.t('meta.age')}`, field: row => timeAgo(row.metadata.creationTimestamp), sortable: true, align: tableColumnAlign.left},
];
export const extraSqlJobColumns:Array<QTableColumn> = [
  {name: 'MariaDB', label: `${i18n.global.t('mariadb.MariaDB')}`, field: row => row.spec.mariaDbRef.name, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: `${i18n.global.t('meta.age')}`, field: row => timeAgo(row.metadata.creationTimestamp), sortable: true, align: tableColumnAlign.left},
];
export const extraUserColumns:Array<QTableColumn> = [
  {name: 'MaxConns', label: `${i18n.global.t('mariadb.MaxConns')}`, field: row => row.spec.maxUserConnections, sortable: true, align: tableColumnAlign.left},
  {name: 'MariaDB', label: `${i18n.global.t('mariadb.MariaDB')}`, field: row => row.spec.mariaDbRef.name, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: `${i18n.global.t('meta.age')}`, field: row => timeAgo(row.metadata.creationTimestamp), sortable: true, align: tableColumnAlign.left},
];

export const BackupListExcludes = [
  { path: 'spec/mariaDbRef/name', include: true },
];
export const BackupReadExcludes = [
];
export const BackupSimpleExcludes = [
];
export const ConnectionListExcludes = [
  { path: 'spec/secretName', include: true },
  { path: 'spec/mariaDbRef/name', include: true },
];
export const ConnectionReadExcludes = [
];
export const ConnectionSimpleExcludes = [
];
export const DatabaseListExcludes = [
  { path: 'spec/characterSet', include: true },
  { path: 'spec/collate', include: true },
  { path: 'spec/mariaDbRef/name', include: true },
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
];
export const GrantReadExcludes = [
];
export const GrantSimpleExcludes = [
];
export const MariaDBListExcludes = [
  { path: 'status/currentPrimary', include: true },
];
export const MariaDBReadExcludes = [
];
export const MariaDBSimpleExcludes = [
];
export const RestoreListExcludes = [
  { path: 'spec/mariaDbRef/name', include: true },
];
export const RestoreReadExcludes = [
];
export const RestoreSimpleExcludes = [
];
export const SqlJobListExcludes = [
  { path: 'spec/mariaDbRef/name', include: true },
];
export const SqlJobReadExcludes = [
];
export const SqlJobSimpleExcludes = [
];
export const UserListExcludes = [
  { path: 'spec/maxUserConnections', include: true },
  { path: 'spec/mariaDbRef/name', include: true },
];
export const UserReadExcludes = [
];
export const UserSimpleExcludes = [
];
