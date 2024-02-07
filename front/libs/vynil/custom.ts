// noGramoGenerator
import { QTableColumn } from 'quasar'
import { tableColumnAlign } from '../core'
export const vynilIcon = 'apps';
export const vynilTitle = 'Vynil';
export const iconDistrib = 'album';
export const colorDistrib = '';
export const descriptionDistrib = '';
export const shortDistrib = '';
export const iconInstall = 'album';
export const colorInstall = '';
export const descriptionInstall = '';
export const shortInstall = '';
export const extraDistribColumns:Array<QTableColumn> = [
  {name: 'url', label: 'url', field: row => row.spec.url, sortable: true, align: tableColumnAlign.left},
  {name: 'last_updated', label: 'last_updated', field: row => row.status.last_updated, sortable: true, align: tableColumnAlign.left},
];
export const extraInstallColumns:Array<QTableColumn> = [
  {name: 'dist', label: 'dist', field: row => row.spec.distrib, sortable: true, align: tableColumnAlign.left},
  {name: 'cat', label: 'cat', field: row => row.spec.category, sortable: true, align: tableColumnAlign.left},
  {name: 'app', label: 'app', field: row => row.spec.component, sortable: true, align: tableColumnAlign.left},
  {name: 'status', label: 'status', field: row => row.status.status, sortable: true, align: tableColumnAlign.left},
  {name: 'last_updated', label: 'last_updated', field: row => row.status.last_updated, sortable: true, align: tableColumnAlign.left},
];
export const DistribListExcludes = [
  { path: 'spec/url', include: true },
  { path: 'status/last_updated', include: true },
];
export const DistribReadExcludes = [
];
export const DistribSimpleExcludes = [
];
export const InstallListExcludes = [
  { path: 'spec/distrib', include: true },
  { path: 'spec/category', include: true },
  { path: 'spec/component', include: true },
  { path: 'status/status', include: true },
  { path: 'status/last_updated', include: true },
  { path: 'status/tfstate' },
  { path: 'status/plan' },
];
export const InstallReadExcludes = [
];
export const InstallSimpleExcludes = [
  { path: 'status/tfstate' },
  { path: 'status/plan' },
];
