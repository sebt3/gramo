// noGramoGenerator
import { QTableColumn } from 'quasar'
import { tableColumnAlign, timeAgo } from '../core'
import { systemColor, systemIcon, } from '../../routes/custom';
export const jaegertracingIcon = systemIcon;
export const jaegertracingTitle = 'Tracing';
export const iconJaeger = 'apps';
export const colorJaeger = systemColor;
export const descriptionJaeger = '';
export const shortJaeger = 'Jaeger';
export const extraJaegerColumns:Array<QTableColumn> = [
  {name: 'Status', label: 'Status', field: row => row.status.phase, sortable: true, align: tableColumnAlign.left},
  {name: 'Version', label: 'Version', field: row => row.status.version, sortable: true, align: tableColumnAlign.left},
  {name: 'Strategy', label: 'Strategy', field: row => row.spec.strategy, sortable: true, align: tableColumnAlign.left},
  {name: 'Storage', label: 'Storage', field: row => row.spec.storage.type, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: 'Age', field: row => timeAgo(row.metadata.creationTimestamp), sortable: true, align: tableColumnAlign.left},
];
export const JaegerListExcludes = [
  { path: 'status/phase', include: true },
  { path: 'status/version', include: true },
  { path: 'spec/strategy', include: true },
  { path: 'spec/storage/type', include: true },
];
export const JaegerReadExcludes = [
];
export const JaegerSimpleExcludes = [
];
