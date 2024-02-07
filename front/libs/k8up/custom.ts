// noGramoGenerator
import { QTableColumn } from 'quasar'
import { tableColumnAlign } from '../core'
export const k8upIcon = 'apps';
export const k8upTitle = 'K8up';
export const iconArchive = 'album';
export const colorArchive = '';
export const descriptionArchive = '';
export const shortArchive = '';
export const iconBackup = 'album';
export const colorBackup = '';
export const descriptionBackup = '';
export const shortBackup = '';
export const iconCheck = 'album';
export const colorCheck = '';
export const descriptionCheck = '';
export const shortCheck = '';
export const iconPreBackupPod = 'album';
export const colorPreBackupPod = '';
export const descriptionPreBackupPod = '';
export const shortPreBackupPod = '';
export const iconPrune = 'album';
export const colorPrune = '';
export const descriptionPrune = '';
export const shortPrune = '';
export const iconRestore = 'album';
export const colorRestore = '';
export const descriptionRestore = '';
export const shortRestore = '';
export const iconSchedule = 'album';
export const colorSchedule = '';
export const descriptionSchedule = '';
export const shortSchedule = '';
export const iconSnapshot = 'album';
export const colorSnapshot = '';
export const descriptionSnapshot = '';
export const shortSnapshot = '';
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
