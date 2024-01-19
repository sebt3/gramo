import {menuLinksProps} from '../interfaces';
const cat = 'database';
const iconBackup = 'backup';
const iconCluster = 'fas fa-database';
const iconPooler = 'album';
const iconScheduledBackup = 'calendar_month';
export const link:menuLinksProps = {
  name: 'postgresql',
  title: 'Postgresql', icon: iconCluster,
  link: `/${cat}/postgresql/clusters/`,
  level: 1,
  children: [
  {
    name: 'postgresqlClusters',
    title: 'Cluster', caption: 'List cluster', icon: iconCluster,
    link: `/${cat}/postgresql/clusters/`, level: 2, children: []
  },
  {
    name: 'postgresqlPoolers',
    title: 'Pooler', caption: 'List pooler', icon: iconPooler,
    link: `/${cat}/postgresql/poolers/`, level: 2, children: []
  },
  {
    name: 'postgresqlBackups',
    title: 'Backup', caption: 'List backup', icon: iconBackup,
    link: `/${cat}/postgresql/backups/`, level: 2, children: []
  },
  {
    name: 'postgresqlScheduledBackups',
    title: 'ScheduledBackup', caption: 'List scheduledBackup', icon: iconScheduledBackup,
    link: `/${cat}/postgresql/scheduledbackups/`, level: 2, children: []
  },
  ]
}
export const descriptions = {
  postgresql:                {breadcrumb: 'Postgresql', icon: iconCluster, ns: false},
  postgresqlBackups:        {breadcrumb: 'Backup', icon: iconBackup, ns: false},
  postgresqlBackupAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  postgresqlBackupTable:    {breadcrumb: 'List', icon: 'list', ns: true},
  postgresqlBackupView:     {breadcrumb: 'View', icon: iconBackup, ns: true},
  postgresqlBackupEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true},
  postgresqlBackupCreate:   {breadcrumb: 'Create', icon: 'add', ns: true},
  postgresqlClusters:        {breadcrumb: 'Cluster', icon: iconCluster, ns: false},
  postgresqlClusterAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  postgresqlClusterTable:    {breadcrumb: 'List', icon: 'list', ns: true},
  postgresqlClusterView:     {breadcrumb: 'View', icon: iconCluster, ns: true},
  postgresqlClusterEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true},
  postgresqlClusterCreate:   {breadcrumb: 'Create', icon: 'add', ns: true},
  postgresqlPoolers:        {breadcrumb: 'Pooler', icon: iconPooler, ns: false},
  postgresqlPoolerAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  postgresqlPoolerTable:    {breadcrumb: 'List', icon: 'list', ns: true},
  postgresqlPoolerView:     {breadcrumb: 'View', icon: iconPooler, ns: true},
  postgresqlPoolerEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true},
  postgresqlPoolerCreate:   {breadcrumb: 'Create', icon: 'add', ns: true},
  postgresqlScheduledBackups:        {breadcrumb: 'ScheduledBackup', icon: iconScheduledBackup, ns: false},
  postgresqlScheduledBackupAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  postgresqlScheduledBackupTable:    {breadcrumb: 'List', icon: 'list', ns: true},
  postgresqlScheduledBackupView:     {breadcrumb: 'View', icon: iconScheduledBackup, ns: true},
  postgresqlScheduledBackupEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true},
  postgresqlScheduledBackupCreate:   {breadcrumb: 'Create', icon: 'add', ns: true},
}
export const route = {
  path: 'postgresql',
  name: 'postgresql',
  redirect: {path: link.link as string},
  children: [
    {
      path: 'backups',
      name: 'postgresqlBackups',
      children: [
        {
          path: '',
          name: 'postgresqlBackupAllTable',
          component: () => import('../../components/postgresql/BackupAllTable.vue'),
        },
        {
          path: ':namespace',
          name: 'postgresqlBackupTable',
          component: () => import('../../components/postgresql/BackupTable.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'postgresqlBackupView',
          component: () => import('../../components/postgresql/BackupView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'postgresqlBackupEdit',
          component: () => import('../../components/postgresql/BackupEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'postgresqlBackupCreate',
          component: () => import('../../components/postgresql/BackupNew.vue'),
        }
      ]
    },
    {
      path: 'clusters',
      name: 'postgresqlClusters',
      children: [
        {
          path: '',
          name: 'postgresqlClusterAllTable',
          component: () => import('../../components/postgresql/ClusterAllTable.vue'),
        },
        {
          path: ':namespace',
          name: 'postgresqlClusterTable',
          component: () => import('../../components/postgresql/ClusterTable.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'postgresqlClusterView',
          component: () => import('../../components/postgresql/ClusterView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'postgresqlClusterEdit',
          component: () => import('../../components/postgresql/ClusterEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'postgresqlClusterCreate',
          component: () => import('../../components/postgresql/ClusterNew.vue'),
        }
      ]
    },
    {
      path: 'poolers',
      name: 'postgresqlPoolers',
      children: [
        {
          path: '',
          name: 'postgresqlPoolerAllTable',
          component: () => import('../../components/postgresql/PoolerAllTable.vue'),
        },
        {
          path: ':namespace',
          name: 'postgresqlPoolerTable',
          component: () => import('../../components/postgresql/PoolerTable.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'postgresqlPoolerView',
          component: () => import('../../components/postgresql/PoolerView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'postgresqlPoolerEdit',
          component: () => import('../../components/postgresql/PoolerEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'postgresqlPoolerCreate',
          component: () => import('../../components/postgresql/PoolerNew.vue'),
        }
      ]
    },
    {
      path: 'scheduledbackups',
      name: 'postgresqlScheduledBackups',
      children: [
        {
          path: '',
          name: 'postgresqlScheduledBackupAllTable',
          component: () => import('../../components/postgresql/ScheduledBackupAllTable.vue'),
        },
        {
          path: ':namespace',
          name: 'postgresqlScheduledBackupTable',
          component: () => import('../../components/postgresql/ScheduledBackupTable.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'postgresqlScheduledBackupView',
          component: () => import('../../components/postgresql/ScheduledBackupView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'postgresqlScheduledBackupEdit',
          component: () => import('../../components/postgresql/ScheduledBackupEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'postgresqlScheduledBackupCreate',
          component: () => import('../../components/postgresql/ScheduledBackupNew.vue'),
        }
      ]
    },
  ],
}
export default route
