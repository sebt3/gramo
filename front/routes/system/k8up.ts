import {menuLinksProps} from '../interfaces';
import { iconArchive, iconBackup, iconCheck, iconPreBackupPod, iconPrune, iconRestore, iconSchedule, iconSnapshot,  k8upIcon, k8upTitle }from '../../libs/k8up/custom.js'
import {  } from '../custom.js';
import { useCRDStore } from '../../stores'
const crds = useCRDStore().crds;
export const link:menuLinksProps = {
  name: 'systemk8up',
  title: k8upTitle, icon: k8upIcon,
  link: '/system/k8up/',
  level: 1,
  children: [
  crds['archives.k8up.io'] == undefined?[]:[{
    name: 'k8upArchives',
    title: 'Archive', caption: 'List Archive', icon: iconArchive,
    link: '/system/k8up/Archive/', level: 2, children: []
  }],
  crds['backups.k8up.io'] == undefined?[]:[{
    name: 'k8upBackups',
    title: 'Backup', caption: 'List Backup', icon: iconBackup,
    link: '/system/k8up/Backup/', level: 2, children: []
  }],
  crds['checks.k8up.io'] == undefined?[]:[{
    name: 'k8upChecks',
    title: 'Check', caption: 'List Check', icon: iconCheck,
    link: '/system/k8up/Check/', level: 2, children: []
  }],
  crds['prebackuppods.k8up.io'] == undefined?[]:[{
    name: 'k8upPreBackupPods',
    title: 'PreBackupPod', caption: 'List PreBackupPod', icon: iconPreBackupPod,
    link: '/system/k8up/PreBackupPod/', level: 2, children: []
  }],
  crds['prunes.k8up.io'] == undefined?[]:[{
    name: 'k8upPrunes',
    title: 'Prune', caption: 'List Prune', icon: iconPrune,
    link: '/system/k8up/Prune/', level: 2, children: []
  }],
  crds['restores.k8up.io'] == undefined?[]:[{
    name: 'k8upRestores',
    title: 'Restore', caption: 'List Restore', icon: iconRestore,
    link: '/system/k8up/Restore/', level: 2, children: []
  }],
  crds['schedules.k8up.io'] == undefined?[]:[{
    name: 'k8upSchedules',
    title: 'Schedule', caption: 'List Schedule', icon: iconSchedule,
    link: '/system/k8up/Schedule/', level: 2, children: []
  }],
  crds['snapshots.k8up.io'] == undefined?[]:[{
    name: 'k8upSnapshots',
    title: 'Snapshot', caption: 'List Snapshot', icon: iconSnapshot,
    link: '/system/k8up/Snapshot/', level: 2, children: []
  }],
  ].flat()
}
export const descriptions = {
  systemk8up:                {breadcrumb: k8upTitle, icon: k8upIcon, ns: false},
  systemk8upDashboard:       {breadcrumb: 'Dashboard', icon: k8upIcon, ns: false},
  k8upArchive:        {breadcrumb: 'Archive', icon: iconArchive, ns: false},
  k8upArchiveAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  k8upArchiveTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  k8upArchiveView:     {breadcrumb: 'View', icon: iconArchive, ns: true },
  k8upArchiveEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  k8upArchiveCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  k8upBackup:        {breadcrumb: 'Backup', icon: iconBackup, ns: false},
  k8upBackupAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  k8upBackupTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  k8upBackupView:     {breadcrumb: 'View', icon: iconBackup, ns: true },
  k8upBackupEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  k8upBackupCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  k8upCheck:        {breadcrumb: 'Check', icon: iconCheck, ns: false},
  k8upCheckAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  k8upCheckTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  k8upCheckView:     {breadcrumb: 'View', icon: iconCheck, ns: true },
  k8upCheckEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  k8upCheckCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  k8upPreBackupPod:        {breadcrumb: 'PreBackupPod', icon: iconPreBackupPod, ns: false},
  k8upPreBackupPodAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  k8upPreBackupPodTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  k8upPreBackupPodView:     {breadcrumb: 'View', icon: iconPreBackupPod, ns: true },
  k8upPreBackupPodEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  k8upPreBackupPodCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  k8upPrune:        {breadcrumb: 'Prune', icon: iconPrune, ns: false},
  k8upPruneAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  k8upPruneTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  k8upPruneView:     {breadcrumb: 'View', icon: iconPrune, ns: true },
  k8upPruneEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  k8upPruneCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  k8upRestore:        {breadcrumb: 'Restore', icon: iconRestore, ns: false},
  k8upRestoreAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  k8upRestoreTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  k8upRestoreView:     {breadcrumb: 'View', icon: iconRestore, ns: true },
  k8upRestoreEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  k8upRestoreCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  k8upSchedule:        {breadcrumb: 'Schedule', icon: iconSchedule, ns: false},
  k8upScheduleAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  k8upScheduleTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  k8upScheduleView:     {breadcrumb: 'View', icon: iconSchedule, ns: true },
  k8upScheduleEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  k8upScheduleCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  k8upSnapshot:        {breadcrumb: 'Snapshot', icon: iconSnapshot, ns: false},
  k8upSnapshotAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  k8upSnapshotTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  k8upSnapshotView:     {breadcrumb: 'View', icon: iconSnapshot, ns: true },
  k8upSnapshotEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  k8upSnapshotCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
}
export const route = {
  path: 'k8up',
  name: 'systemk8up',
  redirect: {path: link.link as string},
  children: [
    {
      path: '',
      name: 'systemk8upDashboard',
      component: () => import('../../pages/system/k8up/Dashboard.vue'),
    },
    {
      path: 'Archive',
      name: 'k8upArchive',
      children: [
        {
          path: '',
          name: 'k8upArchiveAllTable',
          component: () => import('../../pages/system/k8up/ArchiveList.vue'),
        },
        {
          path: ':namespace',
          name: 'k8upArchiveTable',
          component: () => import('../../pages/system/k8up/ArchiveList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'k8upArchiveView',
          component: () => import('../../pages/system/k8up/ArchiveView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'k8upArchiveEdit',
          component: () => import('../../pages/system/k8up/ArchiveEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'k8upArchiveCreate',
          component: () => import('../../pages/system/k8up/ArchiveNew.vue'),
        }
      ]
    },
    {
      path: 'Backup',
      name: 'k8upBackup',
      children: [
        {
          path: '',
          name: 'k8upBackupAllTable',
          component: () => import('../../pages/system/k8up/BackupList.vue'),
        },
        {
          path: ':namespace',
          name: 'k8upBackupTable',
          component: () => import('../../pages/system/k8up/BackupList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'k8upBackupView',
          component: () => import('../../pages/system/k8up/BackupView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'k8upBackupEdit',
          component: () => import('../../pages/system/k8up/BackupEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'k8upBackupCreate',
          component: () => import('../../pages/system/k8up/BackupNew.vue'),
        }
      ]
    },
    {
      path: 'Check',
      name: 'k8upCheck',
      children: [
        {
          path: '',
          name: 'k8upCheckAllTable',
          component: () => import('../../pages/system/k8up/CheckList.vue'),
        },
        {
          path: ':namespace',
          name: 'k8upCheckTable',
          component: () => import('../../pages/system/k8up/CheckList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'k8upCheckView',
          component: () => import('../../pages/system/k8up/CheckView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'k8upCheckEdit',
          component: () => import('../../pages/system/k8up/CheckEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'k8upCheckCreate',
          component: () => import('../../pages/system/k8up/CheckNew.vue'),
        }
      ]
    },
    {
      path: 'PreBackupPod',
      name: 'k8upPreBackupPod',
      children: [
        {
          path: '',
          name: 'k8upPreBackupPodAllTable',
          component: () => import('../../pages/system/k8up/PreBackupPodList.vue'),
        },
        {
          path: ':namespace',
          name: 'k8upPreBackupPodTable',
          component: () => import('../../pages/system/k8up/PreBackupPodList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'k8upPreBackupPodView',
          component: () => import('../../pages/system/k8up/PreBackupPodView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'k8upPreBackupPodEdit',
          component: () => import('../../pages/system/k8up/PreBackupPodEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'k8upPreBackupPodCreate',
          component: () => import('../../pages/system/k8up/PreBackupPodNew.vue'),
        }
      ]
    },
    {
      path: 'Prune',
      name: 'k8upPrune',
      children: [
        {
          path: '',
          name: 'k8upPruneAllTable',
          component: () => import('../../pages/system/k8up/PruneList.vue'),
        },
        {
          path: ':namespace',
          name: 'k8upPruneTable',
          component: () => import('../../pages/system/k8up/PruneList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'k8upPruneView',
          component: () => import('../../pages/system/k8up/PruneView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'k8upPruneEdit',
          component: () => import('../../pages/system/k8up/PruneEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'k8upPruneCreate',
          component: () => import('../../pages/system/k8up/PruneNew.vue'),
        }
      ]
    },
    {
      path: 'Restore',
      name: 'k8upRestore',
      children: [
        {
          path: '',
          name: 'k8upRestoreAllTable',
          component: () => import('../../pages/system/k8up/RestoreList.vue'),
        },
        {
          path: ':namespace',
          name: 'k8upRestoreTable',
          component: () => import('../../pages/system/k8up/RestoreList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'k8upRestoreView',
          component: () => import('../../pages/system/k8up/RestoreView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'k8upRestoreEdit',
          component: () => import('../../pages/system/k8up/RestoreEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'k8upRestoreCreate',
          component: () => import('../../pages/system/k8up/RestoreNew.vue'),
        }
      ]
    },
    {
      path: 'Schedule',
      name: 'k8upSchedule',
      children: [
        {
          path: '',
          name: 'k8upScheduleAllTable',
          component: () => import('../../pages/system/k8up/ScheduleList.vue'),
        },
        {
          path: ':namespace',
          name: 'k8upScheduleTable',
          component: () => import('../../pages/system/k8up/ScheduleList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'k8upScheduleView',
          component: () => import('../../pages/system/k8up/ScheduleView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'k8upScheduleEdit',
          component: () => import('../../pages/system/k8up/ScheduleEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'k8upScheduleCreate',
          component: () => import('../../pages/system/k8up/ScheduleNew.vue'),
        }
      ]
    },
    {
      path: 'Snapshot',
      name: 'k8upSnapshot',
      children: [
        {
          path: '',
          name: 'k8upSnapshotAllTable',
          component: () => import('../../pages/system/k8up/SnapshotList.vue'),
        },
        {
          path: ':namespace',
          name: 'k8upSnapshotTable',
          component: () => import('../../pages/system/k8up/SnapshotList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'k8upSnapshotView',
          component: () => import('../../pages/system/k8up/SnapshotView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'k8upSnapshotEdit',
          component: () => import('../../pages/system/k8up/SnapshotEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'k8upSnapshotCreate',
          component: () => import('../../pages/system/k8up/SnapshotNew.vue'),
        }
      ]
    },
  ],
}
export default route
