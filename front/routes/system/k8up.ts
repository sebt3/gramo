import {menuLinksProps} from '../interfaces';
const cat = 'system';
const iconArchive = 'album';
const iconBackup = 'album';
const iconCheck = 'album';
const iconPreBackupPod = 'album';
const iconPrune = 'album';
const iconRestore = 'album';
const iconSchedule = 'album';
const iconSnapshot = 'album';
export const link:menuLinksProps = {
  name: 'k8up',
  title: 'K8up', icon: iconArchive,
  link: `/${cat}/k8up/archives/`,
  level: 1,
  children: [
  {
    name: 'k8upArchives',
    title: 'Archive', caption: 'List archive', icon: 'album',
    link: `/${cat}/k8up/archives/`, level: 2, children: []
  },
  {
    name: 'k8upBackups',
    title: 'Backup', caption: 'List backup', icon: 'album',
    link: `/${cat}/k8up/backups/`, level: 2, children: []
  },
  {
    name: 'k8upChecks',
    title: 'Check', caption: 'List check', icon: 'album',
    link: `/${cat}/k8up/checks/`, level: 2, children: []
  },
  {
    name: 'k8upPreBackupPods',
    title: 'PreBackupPod', caption: 'List preBackupPod', icon: 'album',
    link: `/${cat}/k8up/prebackuppods/`, level: 2, children: []
  },
  {
    name: 'k8upPrunes',
    title: 'Prune', caption: 'List prune', icon: 'album',
    link: `/${cat}/k8up/prunes/`, level: 2, children: []
  },
  {
    name: 'k8upRestores',
    title: 'Restore', caption: 'List restore', icon: 'album',
    link: `/${cat}/k8up/restores/`, level: 2, children: []
  },
  {
    name: 'k8upSchedules',
    title: 'Schedule', caption: 'List schedule', icon: 'album',
    link: `/${cat}/k8up/schedules/`, level: 2, children: []
  },
  {
    name: 'k8upSnapshots',
    title: 'Snapshot', caption: 'List snapshot', icon: 'album',
    link: `/${cat}/k8up/snapshots/`, level: 2, children: []
  },
  ]
}
export const descriptions = {
  k8up:                {breadcrumb: 'K8up', icon: iconArchive, ns: false},
  k8upArchives:        {breadcrumb: 'Archive', icon: iconArchive, ns: false},
  k8upArchiveAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  k8upArchiveTable:    {breadcrumb: 'List', icon: 'list', ns: true},
  k8upArchiveView:     {breadcrumb: 'View', icon: iconArchive, ns: true},
  k8upArchiveEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true},
  k8upArchiveCreate:   {breadcrumb: 'Create', icon: 'add', ns: true},
  k8upBackups:        {breadcrumb: 'Backup', icon: iconBackup, ns: false},
  k8upBackupAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  k8upBackupTable:    {breadcrumb: 'List', icon: 'list', ns: true},
  k8upBackupView:     {breadcrumb: 'View', icon: iconBackup, ns: true},
  k8upBackupEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true},
  k8upBackupCreate:   {breadcrumb: 'Create', icon: 'add', ns: true},
  k8upChecks:        {breadcrumb: 'Check', icon: iconCheck, ns: false},
  k8upCheckAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  k8upCheckTable:    {breadcrumb: 'List', icon: 'list', ns: true},
  k8upCheckView:     {breadcrumb: 'View', icon: iconCheck, ns: true},
  k8upCheckEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true},
  k8upCheckCreate:   {breadcrumb: 'Create', icon: 'add', ns: true},
  k8upPreBackupPods:        {breadcrumb: 'PreBackupPod', icon: iconPreBackupPod, ns: false},
  k8upPreBackupPodAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  k8upPreBackupPodTable:    {breadcrumb: 'List', icon: 'list', ns: true},
  k8upPreBackupPodView:     {breadcrumb: 'View', icon: iconPreBackupPod, ns: true},
  k8upPreBackupPodEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true},
  k8upPreBackupPodCreate:   {breadcrumb: 'Create', icon: 'add', ns: true},
  k8upPrunes:        {breadcrumb: 'Prune', icon: iconPrune, ns: false},
  k8upPruneAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  k8upPruneTable:    {breadcrumb: 'List', icon: 'list', ns: true},
  k8upPruneView:     {breadcrumb: 'View', icon: iconPrune, ns: true},
  k8upPruneEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true},
  k8upPruneCreate:   {breadcrumb: 'Create', icon: 'add', ns: true},
  k8upRestores:        {breadcrumb: 'Restore', icon: iconRestore, ns: false},
  k8upRestoreAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  k8upRestoreTable:    {breadcrumb: 'List', icon: 'list', ns: true},
  k8upRestoreView:     {breadcrumb: 'View', icon: iconRestore, ns: true},
  k8upRestoreEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true},
  k8upRestoreCreate:   {breadcrumb: 'Create', icon: 'add', ns: true},
  k8upSchedules:        {breadcrumb: 'Schedule', icon: iconSchedule, ns: false},
  k8upScheduleAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  k8upScheduleTable:    {breadcrumb: 'List', icon: 'list', ns: true},
  k8upScheduleView:     {breadcrumb: 'View', icon: iconSchedule, ns: true},
  k8upScheduleEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true},
  k8upScheduleCreate:   {breadcrumb: 'Create', icon: 'add', ns: true},
  k8upSnapshots:        {breadcrumb: 'Snapshot', icon: iconSnapshot, ns: false},
  k8upSnapshotAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  k8upSnapshotTable:    {breadcrumb: 'List', icon: 'list', ns: true},
  k8upSnapshotView:     {breadcrumb: 'View', icon: iconSnapshot, ns: true},
  k8upSnapshotEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true},
  k8upSnapshotCreate:   {breadcrumb: 'Create', icon: 'add', ns: true},
}
export const route = {
  path: 'k8up',
  name: 'k8up',
  redirect: {path: link.link as string},
  children: [
    {
      path: 'archives',
      name: 'k8upArchives',
      children: [
        {
          path: '',
          name: 'k8upArchiveAllTable',
          component: () => import('../../components/k8up/ArchiveAllTable.vue'),
        },
        {
          path: ':namespace',
          name: 'k8upArchiveTable',
          component: () => import('../../components/k8up/ArchiveTable.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'k8upArchiveView',
          component: () => import('../../components/k8up/ArchiveView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'k8upArchiveEdit',
          component: () => import('../../components/k8up/ArchiveEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'k8upArchiveCreate',
          component: () => import('../../components/k8up/ArchiveNew.vue'),
        }
      ]
    },
    {
      path: 'backups',
      name: 'k8upBackups',
      children: [
        {
          path: '',
          name: 'k8upBackupAllTable',
          component: () => import('../../components/k8up/BackupAllTable.vue'),
        },
        {
          path: ':namespace',
          name: 'k8upBackupTable',
          component: () => import('../../components/k8up/BackupTable.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'k8upBackupView',
          component: () => import('../../components/k8up/BackupView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'k8upBackupEdit',
          component: () => import('../../components/k8up/BackupEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'k8upBackupCreate',
          component: () => import('../../components/k8up/BackupNew.vue'),
        }
      ]
    },
    {
      path: 'checks',
      name: 'k8upChecks',
      children: [
        {
          path: '',
          name: 'k8upCheckAllTable',
          component: () => import('../../components/k8up/CheckAllTable.vue'),
        },
        {
          path: ':namespace',
          name: 'k8upCheckTable',
          component: () => import('../../components/k8up/CheckTable.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'k8upCheckView',
          component: () => import('../../components/k8up/CheckView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'k8upCheckEdit',
          component: () => import('../../components/k8up/CheckEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'k8upCheckCreate',
          component: () => import('../../components/k8up/CheckNew.vue'),
        }
      ]
    },
    {
      path: 'prebackuppods',
      name: 'k8upPreBackupPods',
      children: [
        {
          path: '',
          name: 'k8upPreBackupPodAllTable',
          component: () => import('../../components/k8up/PreBackupPodAllTable.vue'),
        },
        {
          path: ':namespace',
          name: 'k8upPreBackupPodTable',
          component: () => import('../../components/k8up/PreBackupPodTable.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'k8upPreBackupPodView',
          component: () => import('../../components/k8up/PreBackupPodView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'k8upPreBackupPodEdit',
          component: () => import('../../components/k8up/PreBackupPodEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'k8upPreBackupPodCreate',
          component: () => import('../../components/k8up/PreBackupPodNew.vue'),
        }
      ]
    },
    {
      path: 'prunes',
      name: 'k8upPrunes',
      children: [
        {
          path: '',
          name: 'k8upPruneAllTable',
          component: () => import('../../components/k8up/PruneAllTable.vue'),
        },
        {
          path: ':namespace',
          name: 'k8upPruneTable',
          component: () => import('../../components/k8up/PruneTable.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'k8upPruneView',
          component: () => import('../../components/k8up/PruneView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'k8upPruneEdit',
          component: () => import('../../components/k8up/PruneEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'k8upPruneCreate',
          component: () => import('../../components/k8up/PruneNew.vue'),
        }
      ]
    },
    {
      path: 'restores',
      name: 'k8upRestores',
      children: [
        {
          path: '',
          name: 'k8upRestoreAllTable',
          component: () => import('../../components/k8up/RestoreAllTable.vue'),
        },
        {
          path: ':namespace',
          name: 'k8upRestoreTable',
          component: () => import('../../components/k8up/RestoreTable.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'k8upRestoreView',
          component: () => import('../../components/k8up/RestoreView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'k8upRestoreEdit',
          component: () => import('../../components/k8up/RestoreEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'k8upRestoreCreate',
          component: () => import('../../components/k8up/RestoreNew.vue'),
        }
      ]
    },
    {
      path: 'schedules',
      name: 'k8upSchedules',
      children: [
        {
          path: '',
          name: 'k8upScheduleAllTable',
          component: () => import('../../components/k8up/ScheduleAllTable.vue'),
        },
        {
          path: ':namespace',
          name: 'k8upScheduleTable',
          component: () => import('../../components/k8up/ScheduleTable.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'k8upScheduleView',
          component: () => import('../../components/k8up/ScheduleView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'k8upScheduleEdit',
          component: () => import('../../components/k8up/ScheduleEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'k8upScheduleCreate',
          component: () => import('../../components/k8up/ScheduleNew.vue'),
        }
      ]
    },
    {
      path: 'snapshots',
      name: 'k8upSnapshots',
      children: [
        {
          path: '',
          name: 'k8upSnapshotAllTable',
          component: () => import('../../components/k8up/SnapshotAllTable.vue'),
        },
        {
          path: ':namespace',
          name: 'k8upSnapshotTable',
          component: () => import('../../components/k8up/SnapshotTable.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'k8upSnapshotView',
          component: () => import('../../components/k8up/SnapshotView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'k8upSnapshotEdit',
          component: () => import('../../components/k8up/SnapshotEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'k8upSnapshotCreate',
          component: () => import('../../components/k8up/SnapshotNew.vue'),
        }
      ]
    },
  ],
}
export default route
