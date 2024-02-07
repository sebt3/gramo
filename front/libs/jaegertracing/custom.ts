// noGramoGenerator
import { QTableColumn } from 'quasar'
import { tableColumnAlign } from '../core'
export const jaegertracingIcon = 'apps';
export const jaegertracingTitle = 'Tracing';
export const iconJaeger = 'album';
export const colorJaeger = '';
export const descriptionJaeger = '';
export const shortJaeger = '';
export const extraJaegerColumns:Array<QTableColumn> = [
  {name: 'Status', label: 'Status', field: row => row.status.phase, sortable: true, align: tableColumnAlign.left},
  {name: 'Version', label: 'Version', field: row => row.status.version, sortable: true, align: tableColumnAlign.left},
  {name: 'Strategy', label: 'Strategy', field: row => row.spec.strategy, sortable: true, align: tableColumnAlign.left},
  {name: 'Storage', label: 'Storage', field: row => row.spec.storage.type, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: 'Age', field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
];
export const JaegerListExcludes = [
  { path: 'status/phase', include: true },
  { path: 'status/version', include: true },
  { path: 'spec/strategy', include: true },
  { path: 'spec/storage/type', include: true },
  { path: 'metadata/creationTimestamp', include: true },
];
export const JaegerReadExcludes = [
];
export const JaegerSimpleExcludes = [
];
