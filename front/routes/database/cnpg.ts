import {menuLinksProps} from '../interfaces';
import { iconBackup, iconCluster, iconPooler, iconScheduledBackup,  cnpgIcon, cnpgTitle }from '../../libs/cnpg/custom.js'
import {  } from '../custom.js';
import { useCRDStore } from '../../stores'
const crds = useCRDStore().crds;
export const link:menuLinksProps = {
  name: 'databasecnpg',
  title: cnpgTitle, icon: cnpgIcon,
  link: '/database/cnpg/',
  level: 1,
  children: [
  crds['backups.postgresql.cnpg.io'] == undefined?[]:[{
    name: 'cnpgBackups',
    title: 'Backup', caption: 'List Backup', icon: iconBackup,
    link: '/database/cnpg/Backup/', level: 2, children: []
  }],
  crds['clusters.postgresql.cnpg.io'] == undefined?[]:[{
    name: 'cnpgClusters',
    title: 'Cluster', caption: 'List Cluster', icon: iconCluster,
    link: '/database/cnpg/Cluster/', level: 2, children: []
  }],
  crds['poolers.postgresql.cnpg.io'] == undefined?[]:[{
    name: 'cnpgPoolers',
    title: 'Pooler', caption: 'List Pooler', icon: iconPooler,
    link: '/database/cnpg/Pooler/', level: 2, children: []
  }],
  crds['scheduledbackups.postgresql.cnpg.io'] == undefined?[]:[{
    name: 'cnpgScheduledBackups',
    title: 'ScheduledBackup', caption: 'List ScheduledBackup', icon: iconScheduledBackup,
    link: '/database/cnpg/ScheduledBackup/', level: 2, children: []
  }],
  ].flat()
}
export const descriptions = {
  databasecnpg:                {breadcrumb: cnpgTitle, icon: cnpgIcon, ns: false},
  databasecnpgDashboard:       {breadcrumb: 'Dashboard', icon: cnpgIcon, ns: false},
  cnpgBackup:        {breadcrumb: 'Backup', icon: iconBackup, ns: false},
  cnpgBackupAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  cnpgBackupTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  cnpgBackupView:     {breadcrumb: 'View', icon: iconBackup, ns: true },
  cnpgBackupEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  cnpgBackupCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  cnpgCluster:        {breadcrumb: 'Cluster', icon: iconCluster, ns: false},
  cnpgClusterAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  cnpgClusterTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  cnpgClusterView:     {breadcrumb: 'View', icon: iconCluster, ns: true },
  cnpgClusterEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  cnpgClusterCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  cnpgPooler:        {breadcrumb: 'Pooler', icon: iconPooler, ns: false},
  cnpgPoolerAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  cnpgPoolerTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  cnpgPoolerView:     {breadcrumb: 'View', icon: iconPooler, ns: true },
  cnpgPoolerEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  cnpgPoolerCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  cnpgScheduledBackup:        {breadcrumb: 'ScheduledBackup', icon: iconScheduledBackup, ns: false},
  cnpgScheduledBackupAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  cnpgScheduledBackupTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  cnpgScheduledBackupView:     {breadcrumb: 'View', icon: iconScheduledBackup, ns: true },
  cnpgScheduledBackupEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  cnpgScheduledBackupCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
}
export const route = {
  path: 'cnpg',
  name: 'databasecnpg',
  redirect: {path: link.link as string},
  children: [
    {
      path: '',
      name: 'databasecnpgDashboard',
      component: () => import('../../pages/database/cnpg/Dashboard.vue'),
    },
    {
      path: 'Backup',
      name: 'cnpgBackup',
      children: [
        {
          path: '',
          name: 'cnpgBackupAllTable',
          component: () => import('../../pages/database/cnpg/BackupList.vue'),
        },
        {
          path: ':namespace',
          name: 'cnpgBackupTable',
          component: () => import('../../pages/database/cnpg/BackupList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'cnpgBackupView',
          component: () => import('../../pages/database/cnpg/BackupView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'cnpgBackupEdit',
          component: () => import('../../pages/database/cnpg/BackupEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'cnpgBackupCreate',
          component: () => import('../../pages/database/cnpg/BackupNew.vue'),
        }
      ]
    },
    {
      path: 'Cluster',
      name: 'cnpgCluster',
      children: [
        {
          path: '',
          name: 'cnpgClusterAllTable',
          component: () => import('../../pages/database/cnpg/ClusterList.vue'),
        },
        {
          path: ':namespace',
          name: 'cnpgClusterTable',
          component: () => import('../../pages/database/cnpg/ClusterList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'cnpgClusterView',
          component: () => import('../../pages/database/cnpg/ClusterView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'cnpgClusterEdit',
          component: () => import('../../pages/database/cnpg/ClusterEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'cnpgClusterCreate',
          component: () => import('../../pages/database/cnpg/ClusterNew.vue'),
        }
      ]
    },
    {
      path: 'Pooler',
      name: 'cnpgPooler',
      children: [
        {
          path: '',
          name: 'cnpgPoolerAllTable',
          component: () => import('../../pages/database/cnpg/PoolerList.vue'),
        },
        {
          path: ':namespace',
          name: 'cnpgPoolerTable',
          component: () => import('../../pages/database/cnpg/PoolerList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'cnpgPoolerView',
          component: () => import('../../pages/database/cnpg/PoolerView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'cnpgPoolerEdit',
          component: () => import('../../pages/database/cnpg/PoolerEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'cnpgPoolerCreate',
          component: () => import('../../pages/database/cnpg/PoolerNew.vue'),
        }
      ]
    },
    {
      path: 'ScheduledBackup',
      name: 'cnpgScheduledBackup',
      children: [
        {
          path: '',
          name: 'cnpgScheduledBackupAllTable',
          component: () => import('../../pages/database/cnpg/ScheduledBackupList.vue'),
        },
        {
          path: ':namespace',
          name: 'cnpgScheduledBackupTable',
          component: () => import('../../pages/database/cnpg/ScheduledBackupList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'cnpgScheduledBackupView',
          component: () => import('../../pages/database/cnpg/ScheduledBackupView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'cnpgScheduledBackupEdit',
          component: () => import('../../pages/database/cnpg/ScheduledBackupEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'cnpgScheduledBackupCreate',
          component: () => import('../../pages/database/cnpg/ScheduledBackupNew.vue'),
        }
      ]
    },
  ],
}
export default route
