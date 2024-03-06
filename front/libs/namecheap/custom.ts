// noGramoGenerator
import { QTableColumn } from 'quasar'
import { tableColumnAlign } from '../core'
import { systemColor, systemIcon, } from '../../routes/custom';
export const namecheapIcon = 'apps';
export const namecheapTitle = 'mayFly';
export const iconScheduledResource = systemIcon;
export const colorScheduledResource = systemColor;
export const descriptionScheduledResource = '';
export const shortScheduledResource = 'ScheduledResource';
export const extraScheduledResourceColumns:Array<QTableColumn> = [
  {name: 'In', label: 'In', field: row => row.spec.in, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: 'Age', field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
  {name: 'Condition', label: 'Condition', field: row => row.status.condition, sortable: true, align: tableColumnAlign.left},
];
export const ScheduledResourceListExcludes = [
  { path: 'spec/in', include: true },
  { path: 'metadata/creationTimestamp', include: true },
  { path: 'status/condition', include: true },
];
export const ScheduledResourceReadExcludes = [
];
export const ScheduledResourceSimpleExcludes = [
];
