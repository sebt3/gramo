// noGramoGenerator
import { QTableColumn } from 'quasar'
const { tableColumnAlign } = await import('../core/navigation.js')
const {  timeAgo } = await import('../core')
const { i18n } = await import("../i18n")
export const vynilIcon = 'album';
export const vynilTitle = 'Vynil';
export const iconDistrib = 'speaker_group';
export const iconInstall = 'album';
const { installColor, } = await import('../../routes/custom');
export const colorDistrib = installColor;
export const descriptionDistrib = '';
export const shortDistrib = 'Distrib';
export const colorInstall = installColor;
export const descriptionInstall = '';
export const shortInstall = 'Install';

export const PackageListExcludes = [];
export const CategoryListExcludes = [];
export const extraDistribColumns:Array<QTableColumn> = [
  {name: 'url', label: `${i18n.global.t('vynil.url')}`, field: row => row.spec.url, sortable: true, align: tableColumnAlign.left},
  {name: 'branch', label: `${i18n.global.t('vynil.branch')}`, field: row => row.spec.branch, sortable: true, align: tableColumnAlign.left},
  {name: 'last_updated', label: `${i18n.global.t('meta.lastUpdate')}`, field: row => row.status!=undefined?timeAgo(row.status?.last_updated):'', sortable: true, align: tableColumnAlign.left},
];
export const extraInstallColumns:Array<QTableColumn> = [
  {name: 'dist', label: `${i18n.global.t('vynil.distrib')}`, field: row => row.spec.distrib, sortable: true, align: tableColumnAlign.left},
  {name: 'cat', label: `${i18n.global.t('vynil.cat')}`, field: row => row.spec.category, sortable: true, align: tableColumnAlign.left},
  {name: 'app', label: `${i18n.global.t('vynil.app')}`, field: row => row.spec.component, sortable: true, align: tableColumnAlign.left},
  {name: 'last_updated', label: `${i18n.global.t('meta.lastUpdate')}`, field: row => row.status!=undefined?timeAgo(row.status?.last_updated):'', sortable: true, align: tableColumnAlign.left},
];
export const DistribListExcludes = [
  { path: 'spec/url', include: true },
  { path: 'spec/branch', include: true },
  { path: 'status/errors', include: true },
  { path: 'status/components', include: true },
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
  { path: 'status/errors', include: true },
  { path: 'status/status', include: true },
  { path: 'status/last_updated', include: true },
];
export const InstallReadExcludes = [
];
export const InstallSimpleExcludes = [
  { path: 'status/tfstate' },
  { path: 'status/plan' },
];
