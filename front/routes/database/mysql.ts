import {menuLinksProps} from '../interfaces';
const cat = 'database';
const iconInnoDBCluster = 'album';
const iconMySQLBackup = 'album';
export const link:menuLinksProps = {
  name: 'mysql',
  title: 'Mysql', icon: iconInnoDBCluster,
  link: `/${cat}/mysql/innodbclusters/`,
  level: 1,
  children: [
  {
    name: 'mysqlInnoDBClusters',
    title: 'InnoDBCluster', caption: 'List innoDBCluster', icon: iconInnoDBCluster,
    link: `/${cat}/mysql/innodbclusters/`, level: 2, children: []
  },
  {
    name: 'mysqlMySQLBackups',
    title: 'MySQLBackup', caption: 'List mySQLBackup', icon: iconMySQLBackup,
    link: `/${cat}/mysql/mysqlbackups/`, level: 2, children: []
  },
  ]
}
export const descriptions = {
  mysql:                {breadcrumb: 'Mysql', icon: iconInnoDBCluster, ns: false},
  mysqlInnoDBClusters:        {breadcrumb: 'InnoDBCluster', icon: iconInnoDBCluster, ns: false},
  mysqlInnoDBClusterAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  mysqlInnoDBClusterTable:    {breadcrumb: 'List', icon: 'list', ns: true},
  mysqlInnoDBClusterView:     {breadcrumb: 'View', icon: iconInnoDBCluster, ns: true},
  mysqlInnoDBClusterEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true},
  mysqlInnoDBClusterCreate:   {breadcrumb: 'Create', icon: 'add', ns: true},
  mysqlMySQLBackups:        {breadcrumb: 'MySQLBackup', icon: iconMySQLBackup, ns: false},
  mysqlMySQLBackupAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  mysqlMySQLBackupTable:    {breadcrumb: 'List', icon: 'list', ns: true},
  mysqlMySQLBackupView:     {breadcrumb: 'View', icon: iconMySQLBackup, ns: true},
  mysqlMySQLBackupEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true},
  mysqlMySQLBackupCreate:   {breadcrumb: 'Create', icon: 'add', ns: true},
}
export const route = {
  path: 'mysql',
  name: 'mysql',
  redirect: {path: link.link as string},
  children: [
    {
      path: 'innodbclusters',
      name: 'mysqlInnoDBClusters',
      children: [
        {
          path: '',
          name: 'mysqlInnoDBClusterAllTable',
          component: () => import('../../components/mysql/InnoDBClusterAllTable.vue'),
        },
        {
          path: ':namespace',
          name: 'mysqlInnoDBClusterTable',
          component: () => import('../../components/mysql/InnoDBClusterTable.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'mysqlInnoDBClusterView',
          component: () => import('../../components/mysql/InnoDBClusterView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'mysqlInnoDBClusterEdit',
          component: () => import('../../components/mysql/InnoDBClusterEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'mysqlInnoDBClusterCreate',
          component: () => import('../../components/mysql/InnoDBClusterNew.vue'),
        }
      ]
    },
    {
      path: 'mysqlbackups',
      name: 'mysqlMySQLBackups',
      children: [
        {
          path: '',
          name: 'mysqlMySQLBackupAllTable',
          component: () => import('../../components/mysql/MySQLBackupAllTable.vue'),
        },
        {
          path: ':namespace',
          name: 'mysqlMySQLBackupTable',
          component: () => import('../../components/mysql/MySQLBackupTable.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'mysqlMySQLBackupView',
          component: () => import('../../components/mysql/MySQLBackupView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'mysqlMySQLBackupEdit',
          component: () => import('../../components/mysql/MySQLBackupEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'mysqlMySQLBackupCreate',
          component: () => import('../../components/mysql/MySQLBackupNew.vue'),
        }
      ]
    },
  ],
}
export default route
