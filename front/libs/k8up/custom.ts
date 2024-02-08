// noGramoGenerator
import { QTableColumn } from 'quasar'
import { tableColumnAlign } from '../core'
import { systemColor, systemIcon, } from '../../routes/custom';
export const iconBackup = 'backup';
export const iconRestore = 'cloud_download';
export const k8upIcon = iconBackup;
export const k8upTitle = 'K8up';
export const iconArchive = systemIcon;
export const colorArchive = systemColor;
export const descriptionArchive = '';
export const shortArchive = 'Archive';
export const colorBackup = systemColor;
export const descriptionBackup = '';
export const shortBackup = 'Backup';
export const iconCheck = systemIcon;
export const colorCheck = systemColor;
export const descriptionCheck = '';
export const shortCheck = 'Check';
export const iconPreBackupPod = systemIcon;
export const colorPreBackupPod = systemColor;
export const descriptionPreBackupPod = '';
export const shortPreBackupPod = 'PreBackupPod';
export const iconPrune = systemIcon;
export const colorPrune = systemColor;
export const descriptionPrune = '';
export const shortPrune = 'Prune';
export const colorRestore = systemColor;
export const descriptionRestore = '';
export const shortRestore = 'Restore';
export const iconSchedule = iconBackup;
export const colorSchedule = systemColor;
export const descriptionSchedule = '';
export const shortSchedule = 'Schedule';
export const iconSnapshot = systemIcon;
export const colorSnapshot = systemColor;
export const descriptionSnapshot = '';
export const shortSnapshot = 'Snapshot';
export const extraArchiveColumns:Array<QTableColumn> = [
  {name: 'Age', label: 'Age', field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
];
export const extraBackupColumns:Array<QTableColumn> = [
  {name: 'Age', label: 'Age', field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
];
export const extraCheckColumns:Array<QTableColumn> = [
  {name: 'Age', label: 'Age', field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
];
export const extraPreBackupPodColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraPruneColumns:Array<QTableColumn> = [
  {name: 'Age', label: 'Age', field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
];
export const extraRestoreColumns:Array<QTableColumn> = [
  {name: 'Age', label: 'Age', field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
];
export const extraScheduleColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraSnapshotColumns:Array<QTableColumn> = [
  {name: 'Date taken', label: 'Date taken', field: row => row.spec.date, sortable: true, align: tableColumnAlign.left},
  {name: 'Repository', label: 'Repository', field: row => row.spec.repository, sortable: true, align: tableColumnAlign.left},
];
export const ArchiveListExcludes = [
  { path: 'metadata/creationTimestamp', include: true },
];
export const ArchiveReadExcludes = [
];
export const ArchiveSimpleExcludes = [
];
export const BackupListExcludes = [
  { path: 'metadata/creationTimestamp', include: true },
];
export const BackupReadExcludes = [
];
export const BackupSimpleExcludes = [
];
export const CheckListExcludes = [
  { path: 'metadata/creationTimestamp', include: true },
];
export const CheckReadExcludes = [
];
export const CheckSimpleExcludes = [
];
export const PreBackupPodListExcludes = [
];
export const PreBackupPodReadExcludes = [
];
export const PreBackupPodSimpleExcludes = [
];
export const PruneListExcludes = [
  { path: 'metadata/creationTimestamp', include: true },
];
export const PruneReadExcludes = [
];
export const PruneSimpleExcludes = [
];
export const RestoreListExcludes = [
  { path: 'metadata/creationTimestamp', include: true },
];
export const RestoreReadExcludes = [
];
export const RestoreSimpleExcludes = [
];
export const ScheduleListExcludes = [
];
export const ScheduleReadExcludes = [
];
export const ScheduleSimpleExcludes = [
];
export const SnapshotListExcludes = [
  { path: 'spec/date', include: true },
  { path: 'spec/repository', include: true },
];
export const SnapshotReadExcludes = [
];
export const SnapshotSimpleExcludes = [
];
