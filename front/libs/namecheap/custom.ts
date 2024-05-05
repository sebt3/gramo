// noGramoGenerator
import { QTableColumn } from 'quasar'
const { tableColumnAlign } = await import('../core/navigation.js')
const {  timeAgo } = await import('../core')
const { i18n } = await import("../i18n")
const { systemColor, systemIcon, } = await import('../../routes/custom');
export const namecheapIcon = 'apps';
export const namecheapTitle = 'mayFly';
export const iconScheduledResource = systemIcon;
export const colorScheduledResource = systemColor;
export const descriptionScheduledResource = '';
export const shortScheduledResource = 'ScheduledResource';
export const extraScheduledResourceColumns:Array<QTableColumn> = [
  {name: 'In', label: `${i18n.global.t('namecheap.In')}`, field: row => row.spec.in, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: `${i18n.global.t('meta.age')}`, field: row => timeAgo(row.metadata.creationTimestamp), sortable: true, align: tableColumnAlign.left},
  {name: 'Condition', label: `${i18n.global.t('namecheap.Condition')}`, field: row => row.status?.condition, sortable: true, align: tableColumnAlign.left},
];
export const ScheduledResourceListExcludes = [
  { path: 'spec/in', include: true },
  { path: 'status/condition', include: true },
];
export const ScheduledResourceReadExcludes = [
];
export const ScheduledResourceSimpleExcludes = [
];
