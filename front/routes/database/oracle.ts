import {menuLinksProps} from '../interfaces';
import { iconInnoDBCluster, iconMySQLBackup,  oracleIcon, oracleTitle }from '../../libs/oracle/custom.js'
import {  } from '../custom.js';
import { useCRDStore } from '../../stores'
const crds = useCRDStore().crds;
export const link:menuLinksProps = {
  name: 'databaseoracle',
  title: oracleTitle, icon: oracleIcon,
  link: '/database/oracle/',
  level: 1,
  children: [
  crds['innodbclusters.mysql.oracle.com'] == undefined?[]:[{
    name: 'oracleInnoDBClusters',
    title: 'InnoDBCluster', caption: 'List InnoDBCluster', icon: iconInnoDBCluster,
    link: '/database/oracle/InnoDBCluster/', level: 2, children: []
  }],
  crds['mysqlbackups.mysql.oracle.com'] == undefined?[]:[{
    name: 'oracleMySQLBackups',
    title: 'MySQLBackup', caption: 'List MySQLBackup', icon: iconMySQLBackup,
    link: '/database/oracle/MySQLBackup/', level: 2, children: []
  }],
  ].flat()
}
export const descriptions = {
  databaseoracle:                {breadcrumb: oracleTitle, icon: oracleIcon, ns: false},
  databaseoracleDashboard:       {breadcrumb: 'Dashboard', icon: oracleIcon, ns: false},
  oracleInnoDBCluster:        {breadcrumb: 'InnoDBCluster', icon: iconInnoDBCluster, ns: false},
  oracleInnoDBClusterAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  oracleInnoDBClusterTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  oracleInnoDBClusterView:     {breadcrumb: 'View', icon: iconInnoDBCluster, ns: true },
  oracleInnoDBClusterEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  oracleInnoDBClusterCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  oracleMySQLBackup:        {breadcrumb: 'MySQLBackup', icon: iconMySQLBackup, ns: false},
  oracleMySQLBackupAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  oracleMySQLBackupTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  oracleMySQLBackupView:     {breadcrumb: 'View', icon: iconMySQLBackup, ns: true },
  oracleMySQLBackupEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  oracleMySQLBackupCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
}
export const route = {
  path: 'oracle',
  name: 'databaseoracle',
  redirect: {path: link.link as string},
  children: [
    {
      path: '',
      name: 'databaseoracleDashboard',
      component: () => import('../../pages/database/oracle/Dashboard.vue'),
    },
    {
      path: 'InnoDBCluster',
      name: 'oracleInnoDBCluster',
      children: [
        {
          path: '',
          name: 'oracleInnoDBClusterAllTable',
          component: () => import('../../pages/database/oracle/InnoDBClusterList.vue'),
        },
        {
          path: ':namespace',
          name: 'oracleInnoDBClusterTable',
          component: () => import('../../pages/database/oracle/InnoDBClusterList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'oracleInnoDBClusterView',
          component: () => import('../../pages/database/oracle/InnoDBClusterView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'oracleInnoDBClusterEdit',
          component: () => import('../../pages/database/oracle/InnoDBClusterEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'oracleInnoDBClusterCreate',
          component: () => import('../../pages/database/oracle/InnoDBClusterNew.vue'),
        }
      ]
    },
    {
      path: 'MySQLBackup',
      name: 'oracleMySQLBackup',
      children: [
        {
          path: '',
          name: 'oracleMySQLBackupAllTable',
          component: () => import('../../pages/database/oracle/MySQLBackupList.vue'),
        },
        {
          path: ':namespace',
          name: 'oracleMySQLBackupTable',
          component: () => import('../../pages/database/oracle/MySQLBackupList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'oracleMySQLBackupView',
          component: () => import('../../pages/database/oracle/MySQLBackupView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'oracleMySQLBackupEdit',
          component: () => import('../../pages/database/oracle/MySQLBackupEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'oracleMySQLBackupCreate',
          component: () => import('../../pages/database/oracle/MySQLBackupNew.vue'),
        }
      ]
    },
  ],
}
export default route
