import {menuLinksProps} from '../interfaces';
const cat = 'database';
const iconBackup = 'backup';
const iconConnection = 'link';
const iconDatabase = 'fas fa-database';
const iconGrant = 'album';
const iconMariaDB = 'group_work';
const iconRestore = 'cloud_download';
const iconSqlJob = 'album';
const iconUser = 'fas fa-user';
export const link:menuLinksProps = {
  name: 'mariadb',
  title: 'Mariadb', icon: iconDatabase,
  link: `/${cat}/mariadb/backups/`,
  level: 1,
  children: [
  {
    name: 'mariadbMariaDBs',
    title: 'MariaDB', caption: 'List mariaDB', icon: iconMariaDB,
    link: `/${cat}/mariadb/mariadbs/`, level: 2, children: []
  },
  {
    name: 'mariadbDatabases',
    title: 'Database', caption: 'List database', icon: iconDatabase,
    link: `/${cat}/mariadb/databases/`, level: 2, children: []
  },
  {
    name: 'mariadbUsers',
    title: 'User', caption: 'List user', icon: iconUser,
    link: `/${cat}/mariadb/users/`, level: 2, children: []
  },
  {
    name: 'mariadbGrants',
    title: 'Grant', caption: 'List grant', icon: iconGrant,
    link: `/${cat}/mariadb/grants/`, level: 2, children: []
  },
  {
    name: 'mariadbConnections',
    title: 'Connection', caption: 'List connection', icon: iconConnection,
    link: `/${cat}/mariadb/connections/`, level: 2, children: []
  },
  {
    name: 'mariadbSqlJobs',
    title: 'SqlJob', caption: 'List sqlJob', icon: iconSqlJob,
    link: `/${cat}/mariadb/sqljobs/`, level: 2, children: []
  },
  {
    name: 'mariadbBackups',
    title: 'Backup', caption: 'List backup', icon: iconBackup,
    link: `/${cat}/mariadb/backups/`, level: 2, children: []
  },
  {
    name: 'mariadbRestores',
    title: 'Restore', caption: 'List restore', icon: iconRestore,
    link: `/${cat}/mariadb/restores/`, level: 2, children: []
  },
  ]
}
export const descriptions = {
  mariadb:                {breadcrumb: 'Mariadb', icon: iconMariaDB, ns: false},
  mariadbBackups:        {breadcrumb: 'Backup', icon: iconBackup, ns: false},
  mariadbBackupAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  mariadbBackupTable:    {breadcrumb: 'List', icon: 'list', ns: true},
  mariadbBackupView:     {breadcrumb: 'View', icon: iconBackup, ns: true},
  mariadbBackupEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true},
  mariadbBackupCreate:   {breadcrumb: 'Create', icon: 'add', ns: true},
  mariadbConnections:        {breadcrumb: 'Connection', icon: iconConnection, ns: false},
  mariadbConnectionAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  mariadbConnectionTable:    {breadcrumb: 'List', icon: 'list', ns: true},
  mariadbConnectionView:     {breadcrumb: 'View', icon: iconConnection, ns: true},
  mariadbConnectionEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true},
  mariadbConnectionCreate:   {breadcrumb: 'Create', icon: 'add', ns: true},
  mariadbDatabases:        {breadcrumb: 'Database', icon: iconDatabase, ns: false},
  mariadbDatabaseAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  mariadbDatabaseTable:    {breadcrumb: 'List', icon: 'list', ns: true},
  mariadbDatabaseView:     {breadcrumb: 'View', icon: iconDatabase, ns: true},
  mariadbDatabaseEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true},
  mariadbDatabaseCreate:   {breadcrumb: 'Create', icon: 'add', ns: true},
  mariadbGrants:        {breadcrumb: 'Grant', icon: iconGrant, ns: false},
  mariadbGrantAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  mariadbGrantTable:    {breadcrumb: 'List', icon: 'list', ns: true},
  mariadbGrantView:     {breadcrumb: 'View', icon: iconGrant, ns: true},
  mariadbGrantEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true},
  mariadbGrantCreate:   {breadcrumb: 'Create', icon: 'add', ns: true},
  mariadbMariaDBs:        {breadcrumb: 'MariaDB', icon: iconMariaDB, ns: false},
  mariadbMariaDBAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  mariadbMariaDBTable:    {breadcrumb: 'List', icon: 'list', ns: true},
  mariadbMariaDBView:     {breadcrumb: 'View', icon: iconMariaDB, ns: true},
  mariadbMariaDBEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true},
  mariadbMariaDBCreate:   {breadcrumb: 'Create', icon: 'add', ns: true},
  mariadbRestores:        {breadcrumb: 'Restore', icon: iconRestore, ns: false},
  mariadbRestoreAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  mariadbRestoreTable:    {breadcrumb: 'List', icon: 'list', ns: true},
  mariadbRestoreView:     {breadcrumb: 'View', icon: iconRestore, ns: true},
  mariadbRestoreEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true},
  mariadbRestoreCreate:   {breadcrumb: 'Create', icon: 'add', ns: true},
  mariadbSqlJobs:        {breadcrumb: 'SqlJob', icon: iconSqlJob, ns: false},
  mariadbSqlJobAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  mariadbSqlJobTable:    {breadcrumb: 'List', icon: 'list', ns: true},
  mariadbSqlJobView:     {breadcrumb: 'View', icon: iconSqlJob, ns: true},
  mariadbSqlJobEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true},
  mariadbSqlJobCreate:   {breadcrumb: 'Create', icon: 'add', ns: true},
  mariadbUsers:        {breadcrumb: 'User', icon: iconUser, ns: false},
  mariadbUserAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  mariadbUserTable:    {breadcrumb: 'List', icon: 'list', ns: true},
  mariadbUserView:     {breadcrumb: 'View', icon: iconUser, ns: true},
  mariadbUserEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true},
  mariadbUserCreate:   {breadcrumb: 'Create', icon: 'add', ns: true},
}
export const route = {
  path: 'mariadb',
  name: 'mariadb',
  redirect: {path: link.link as string},
  children: [
    {
      path: 'backups',
      name: 'mariadbBackups',
      children: [
        {
          path: '',
          name: 'mariadbBackupAllTable',
          component: () => import('../../components/mariadb/BackupAllTable.vue'),
        },
        {
          path: ':namespace',
          name: 'mariadbBackupTable',
          component: () => import('../../components/mariadb/BackupTable.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'mariadbBackupView',
          component: () => import('../../components/mariadb/BackupView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'mariadbBackupEdit',
          component: () => import('../../components/mariadb/BackupEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'mariadbBackupCreate',
          component: () => import('../../components/mariadb/BackupNew.vue'),
        }
      ]
    },
    {
      path: 'connections',
      name: 'mariadbConnections',
      children: [
        {
          path: '',
          name: 'mariadbConnectionAllTable',
          component: () => import('../../components/mariadb/ConnectionAllTable.vue'),
        },
        {
          path: ':namespace',
          name: 'mariadbConnectionTable',
          component: () => import('../../components/mariadb/ConnectionTable.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'mariadbConnectionView',
          component: () => import('../../components/mariadb/ConnectionView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'mariadbConnectionEdit',
          component: () => import('../../components/mariadb/ConnectionEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'mariadbConnectionCreate',
          component: () => import('../../components/mariadb/ConnectionNew.vue'),
        }
      ]
    },
    {
      path: 'databases',
      name: 'mariadbDatabases',
      children: [
        {
          path: '',
          name: 'mariadbDatabaseAllTable',
          component: () => import('../../components/mariadb/DatabaseAllTable.vue'),
        },
        {
          path: ':namespace',
          name: 'mariadbDatabaseTable',
          component: () => import('../../components/mariadb/DatabaseTable.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'mariadbDatabaseView',
          component: () => import('../../components/mariadb/DatabaseView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'mariadbDatabaseEdit',
          component: () => import('../../components/mariadb/DatabaseEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'mariadbDatabaseCreate',
          component: () => import('../../components/mariadb/DatabaseNew.vue'),
        }
      ]
    },
    {
      path: 'grants',
      name: 'mariadbGrants',
      children: [
        {
          path: '',
          name: 'mariadbGrantAllTable',
          component: () => import('../../components/mariadb/GrantAllTable.vue'),
        },
        {
          path: ':namespace',
          name: 'mariadbGrantTable',
          component: () => import('../../components/mariadb/GrantTable.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'mariadbGrantView',
          component: () => import('../../components/mariadb/GrantView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'mariadbGrantEdit',
          component: () => import('../../components/mariadb/GrantEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'mariadbGrantCreate',
          component: () => import('../../components/mariadb/GrantNew.vue'),
        }
      ]
    },
    {
      path: 'mariadbs',
      name: 'mariadbMariaDBs',
      children: [
        {
          path: '',
          name: 'mariadbMariaDBAllTable',
          component: () => import('../../components/mariadb/MariaDBAllTable.vue'),
        },
        {
          path: ':namespace',
          name: 'mariadbMariaDBTable',
          component: () => import('../../components/mariadb/MariaDBTable.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'mariadbMariaDBView',
          component: () => import('../../components/mariadb/MariaDBView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'mariadbMariaDBEdit',
          component: () => import('../../components/mariadb/MariaDBEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'mariadbMariaDBCreate',
          component: () => import('../../components/mariadb/MariaDBNew.vue'),
        }
      ]
    },
    {
      path: 'restores',
      name: 'mariadbRestores',
      children: [
        {
          path: '',
          name: 'mariadbRestoreAllTable',
          component: () => import('../../components/mariadb/RestoreAllTable.vue'),
        },
        {
          path: ':namespace',
          name: 'mariadbRestoreTable',
          component: () => import('../../components/mariadb/RestoreTable.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'mariadbRestoreView',
          component: () => import('../../components/mariadb/RestoreView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'mariadbRestoreEdit',
          component: () => import('../../components/mariadb/RestoreEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'mariadbRestoreCreate',
          component: () => import('../../components/mariadb/RestoreNew.vue'),
        }
      ]
    },
    {
      path: 'sqljobs',
      name: 'mariadbSqlJobs',
      children: [
        {
          path: '',
          name: 'mariadbSqlJobAllTable',
          component: () => import('../../components/mariadb/SqlJobAllTable.vue'),
        },
        {
          path: ':namespace',
          name: 'mariadbSqlJobTable',
          component: () => import('../../components/mariadb/SqlJobTable.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'mariadbSqlJobView',
          component: () => import('../../components/mariadb/SqlJobView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'mariadbSqlJobEdit',
          component: () => import('../../components/mariadb/SqlJobEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'mariadbSqlJobCreate',
          component: () => import('../../components/mariadb/SqlJobNew.vue'),
        }
      ]
    },
    {
      path: 'users',
      name: 'mariadbUsers',
      children: [
        {
          path: '',
          name: 'mariadbUserAllTable',
          component: () => import('../../components/mariadb/UserAllTable.vue'),
        },
        {
          path: ':namespace',
          name: 'mariadbUserTable',
          component: () => import('../../components/mariadb/UserTable.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'mariadbUserView',
          component: () => import('../../components/mariadb/UserView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'mariadbUserEdit',
          component: () => import('../../components/mariadb/UserEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'mariadbUserCreate',
          component: () => import('../../components/mariadb/UserNew.vue'),
        }
      ]
    },
  ],
}
export default route
