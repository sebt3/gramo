import {menuLinksProps} from '../interfaces';
import { iconBackup, iconConnection, iconDatabase, iconGrant, iconMariaDB, iconRestore, iconSqlJob, iconUser,  mariadbIcon, mariadbTitle }from '../../libs/mariadb/custom.js'
import {  } from '../custom.js';
import { useCRDStore } from '../../stores'
const crds = useCRDStore().crds;
export const link:menuLinksProps = {
  name: 'databasemariadb',
  title: mariadbTitle, icon: mariadbIcon,
  link: '/database/mariadb/',
  level: 1,
  children: [
  crds['backups.mariadb.mmontes.io'] == undefined?[]:[{
    name: 'mariadbBackups',
    title: 'Backup', caption: 'List Backup', icon: iconBackup,
    link: '/database/mariadb/Backup/', level: 2, children: []
  }],
  crds['connections.mariadb.mmontes.io'] == undefined?[]:[{
    name: 'mariadbConnections',
    title: 'Connection', caption: 'List Connection', icon: iconConnection,
    link: '/database/mariadb/Connection/', level: 2, children: []
  }],
  crds['databases.mariadb.mmontes.io'] == undefined?[]:[{
    name: 'mariadbDatabases',
    title: 'Database', caption: 'List Database', icon: iconDatabase,
    link: '/database/mariadb/Database/', level: 2, children: []
  }],
  crds['grants.mariadb.mmontes.io'] == undefined?[]:[{
    name: 'mariadbGrants',
    title: 'Grant', caption: 'List Grant', icon: iconGrant,
    link: '/database/mariadb/Grant/', level: 2, children: []
  }],
  crds['mariadbs.mariadb.mmontes.io'] == undefined?[]:[{
    name: 'mariadbMariaDBs',
    title: 'MariaDB', caption: 'List MariaDB', icon: iconMariaDB,
    link: '/database/mariadb/MariaDB/', level: 2, children: []
  }],
  crds['restores.mariadb.mmontes.io'] == undefined?[]:[{
    name: 'mariadbRestores',
    title: 'Restore', caption: 'List Restore', icon: iconRestore,
    link: '/database/mariadb/Restore/', level: 2, children: []
  }],
  crds['sqljobs.mariadb.mmontes.io'] == undefined?[]:[{
    name: 'mariadbSqlJobs',
    title: 'SqlJob', caption: 'List SqlJob', icon: iconSqlJob,
    link: '/database/mariadb/SqlJob/', level: 2, children: []
  }],
  crds['users.mariadb.mmontes.io'] == undefined?[]:[{
    name: 'mariadbUsers',
    title: 'User', caption: 'List User', icon: iconUser,
    link: '/database/mariadb/User/', level: 2, children: []
  }],
  ].flat()
}
export const descriptions = {
  databasemariadb:                {breadcrumb: mariadbTitle, icon: mariadbIcon, ns: false},
  databasemariadbDashboard:       {breadcrumb: 'Dashboard', icon: mariadbIcon, ns: false},
  mariadbBackup:        {breadcrumb: 'Backup', icon: iconBackup, ns: false},
  mariadbBackupAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  mariadbBackupTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  mariadbBackupView:     {breadcrumb: 'View', icon: iconBackup, ns: true },
  mariadbBackupEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  mariadbBackupCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  mariadbConnection:        {breadcrumb: 'Connection', icon: iconConnection, ns: false},
  mariadbConnectionAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  mariadbConnectionTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  mariadbConnectionView:     {breadcrumb: 'View', icon: iconConnection, ns: true },
  mariadbConnectionEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  mariadbConnectionCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  mariadbDatabase:        {breadcrumb: 'Database', icon: iconDatabase, ns: false},
  mariadbDatabaseAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  mariadbDatabaseTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  mariadbDatabaseView:     {breadcrumb: 'View', icon: iconDatabase, ns: true },
  mariadbDatabaseEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  mariadbDatabaseCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  mariadbGrant:        {breadcrumb: 'Grant', icon: iconGrant, ns: false},
  mariadbGrantAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  mariadbGrantTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  mariadbGrantView:     {breadcrumb: 'View', icon: iconGrant, ns: true },
  mariadbGrantEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  mariadbGrantCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  mariadbMariaDB:        {breadcrumb: 'MariaDB', icon: iconMariaDB, ns: false},
  mariadbMariaDBAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  mariadbMariaDBTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  mariadbMariaDBView:     {breadcrumb: 'View', icon: iconMariaDB, ns: true },
  mariadbMariaDBEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  mariadbMariaDBCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  mariadbRestore:        {breadcrumb: 'Restore', icon: iconRestore, ns: false},
  mariadbRestoreAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  mariadbRestoreTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  mariadbRestoreView:     {breadcrumb: 'View', icon: iconRestore, ns: true },
  mariadbRestoreEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  mariadbRestoreCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  mariadbSqlJob:        {breadcrumb: 'SqlJob', icon: iconSqlJob, ns: false},
  mariadbSqlJobAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  mariadbSqlJobTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  mariadbSqlJobView:     {breadcrumb: 'View', icon: iconSqlJob, ns: true },
  mariadbSqlJobEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  mariadbSqlJobCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  mariadbUser:        {breadcrumb: 'User', icon: iconUser, ns: false},
  mariadbUserAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  mariadbUserTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  mariadbUserView:     {breadcrumb: 'View', icon: iconUser, ns: true },
  mariadbUserEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  mariadbUserCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
}
export const route = {
  path: 'mariadb',
  name: 'databasemariadb',
  redirect: {path: link.link as string},
  children: [
    {
      path: '',
      name: 'databasemariadbDashboard',
      component: () => import('../../pages/database/mariadb/Dashboard.vue'),
    },
    {
      path: 'Backup',
      name: 'mariadbBackup',
      children: [
        {
          path: '',
          name: 'mariadbBackupAllTable',
          component: () => import('../../pages/database/mariadb/BackupList.vue'),
        },
        {
          path: ':namespace',
          name: 'mariadbBackupTable',
          component: () => import('../../pages/database/mariadb/BackupList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'mariadbBackupView',
          component: () => import('../../pages/database/mariadb/BackupView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'mariadbBackupEdit',
          component: () => import('../../pages/database/mariadb/BackupEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'mariadbBackupCreate',
          component: () => import('../../pages/database/mariadb/BackupNew.vue'),
        }
      ]
    },
    {
      path: 'Connection',
      name: 'mariadbConnection',
      children: [
        {
          path: '',
          name: 'mariadbConnectionAllTable',
          component: () => import('../../pages/database/mariadb/ConnectionList.vue'),
        },
        {
          path: ':namespace',
          name: 'mariadbConnectionTable',
          component: () => import('../../pages/database/mariadb/ConnectionList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'mariadbConnectionView',
          component: () => import('../../pages/database/mariadb/ConnectionView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'mariadbConnectionEdit',
          component: () => import('../../pages/database/mariadb/ConnectionEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'mariadbConnectionCreate',
          component: () => import('../../pages/database/mariadb/ConnectionNew.vue'),
        }
      ]
    },
    {
      path: 'Database',
      name: 'mariadbDatabase',
      children: [
        {
          path: '',
          name: 'mariadbDatabaseAllTable',
          component: () => import('../../pages/database/mariadb/DatabaseList.vue'),
        },
        {
          path: ':namespace',
          name: 'mariadbDatabaseTable',
          component: () => import('../../pages/database/mariadb/DatabaseList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'mariadbDatabaseView',
          component: () => import('../../pages/database/mariadb/DatabaseView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'mariadbDatabaseEdit',
          component: () => import('../../pages/database/mariadb/DatabaseEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'mariadbDatabaseCreate',
          component: () => import('../../pages/database/mariadb/DatabaseNew.vue'),
        }
      ]
    },
    {
      path: 'Grant',
      name: 'mariadbGrant',
      children: [
        {
          path: '',
          name: 'mariadbGrantAllTable',
          component: () => import('../../pages/database/mariadb/GrantList.vue'),
        },
        {
          path: ':namespace',
          name: 'mariadbGrantTable',
          component: () => import('../../pages/database/mariadb/GrantList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'mariadbGrantView',
          component: () => import('../../pages/database/mariadb/GrantView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'mariadbGrantEdit',
          component: () => import('../../pages/database/mariadb/GrantEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'mariadbGrantCreate',
          component: () => import('../../pages/database/mariadb/GrantNew.vue'),
        }
      ]
    },
    {
      path: 'MariaDB',
      name: 'mariadbMariaDB',
      children: [
        {
          path: '',
          name: 'mariadbMariaDBAllTable',
          component: () => import('../../pages/database/mariadb/MariaDBList.vue'),
        },
        {
          path: ':namespace',
          name: 'mariadbMariaDBTable',
          component: () => import('../../pages/database/mariadb/MariaDBList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'mariadbMariaDBView',
          component: () => import('../../pages/database/mariadb/MariaDBView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'mariadbMariaDBEdit',
          component: () => import('../../pages/database/mariadb/MariaDBEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'mariadbMariaDBCreate',
          component: () => import('../../pages/database/mariadb/MariaDBNew.vue'),
        }
      ]
    },
    {
      path: 'Restore',
      name: 'mariadbRestore',
      children: [
        {
          path: '',
          name: 'mariadbRestoreAllTable',
          component: () => import('../../pages/database/mariadb/RestoreList.vue'),
        },
        {
          path: ':namespace',
          name: 'mariadbRestoreTable',
          component: () => import('../../pages/database/mariadb/RestoreList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'mariadbRestoreView',
          component: () => import('../../pages/database/mariadb/RestoreView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'mariadbRestoreEdit',
          component: () => import('../../pages/database/mariadb/RestoreEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'mariadbRestoreCreate',
          component: () => import('../../pages/database/mariadb/RestoreNew.vue'),
        }
      ]
    },
    {
      path: 'SqlJob',
      name: 'mariadbSqlJob',
      children: [
        {
          path: '',
          name: 'mariadbSqlJobAllTable',
          component: () => import('../../pages/database/mariadb/SqlJobList.vue'),
        },
        {
          path: ':namespace',
          name: 'mariadbSqlJobTable',
          component: () => import('../../pages/database/mariadb/SqlJobList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'mariadbSqlJobView',
          component: () => import('../../pages/database/mariadb/SqlJobView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'mariadbSqlJobEdit',
          component: () => import('../../pages/database/mariadb/SqlJobEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'mariadbSqlJobCreate',
          component: () => import('../../pages/database/mariadb/SqlJobNew.vue'),
        }
      ]
    },
    {
      path: 'User',
      name: 'mariadbUser',
      children: [
        {
          path: '',
          name: 'mariadbUserAllTable',
          component: () => import('../../pages/database/mariadb/UserList.vue'),
        },
        {
          path: ':namespace',
          name: 'mariadbUserTable',
          component: () => import('../../pages/database/mariadb/UserList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'mariadbUserView',
          component: () => import('../../pages/database/mariadb/UserView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'mariadbUserEdit',
          component: () => import('../../pages/database/mariadb/UserEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'mariadbUserCreate',
          component: () => import('../../pages/database/mariadb/UserNew.vue'),
        }
      ]
    },
  ],
}
export default route
