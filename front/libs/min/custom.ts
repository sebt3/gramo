// noGramoGenerator
import { QTableColumn } from 'quasar'
const { tableColumnAlign } = await import('../core/navigation.js')
const { i18n } = await import("../i18n")
const { storageColor, storageIcon, } = await import('../../routes/custom');
export const minIcon = 'apps';
export const minTitle = 'min.io';
export const iconMinIOJob = storageIcon;
export const colorMinIOJob = storageColor;
export const descriptionMinIOJob = '';
export const shortMinIOJob = 'MinIOJob';
export const iconPolicyBinding = storageIcon;
export const colorPolicyBinding = storageColor;
export const descriptionPolicyBinding = '';
export const shortPolicyBinding = 'PolicyBinding';
export const iconTenant = storageIcon;
export const colorTenant = storageColor;
export const descriptionTenant = '';
export const shortTenant = 'Tenant';
export const extraMinIOJobColumns:Array<QTableColumn> = [
  {name: 'Tenant', label: `${i18n.global.t('min.Tenant')}`, field: row => row.spec.tenant.name, sortable: true, align: tableColumnAlign.left},
  {name: 'Phase', label: `${i18n.global.t('min.Phase')}`, field: row => row.spec.status.phase, sortable: true, align: tableColumnAlign.left},
];
export const extraPolicyBindingColumns:Array<QTableColumn> = [
  {name: 'State', label: `${i18n.global.t('min.State')}`, field: row => row.status.currentState, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: `${i18n.global.t('meta.age')}`, field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
];
export const extraTenantColumns:Array<QTableColumn> = [
  {name: 'State', label: `${i18n.global.t('min.State')}`, field: row => row.status.currentState, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: `${i18n.global.t('meta.age')}`, field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
];
export const MinIOJobListExcludes = [
  { path: 'spec/tenant/name', include: true },
  { path: 'spec/status/phase', include: true },
];
export const MinIOJobReadExcludes = [
];
export const MinIOJobSimpleExcludes = [
];
export const PolicyBindingListExcludes = [
  { path: 'status/currentState', include: true },
  { path: 'metadata/creationTimestamp', include: true },
];
export const PolicyBindingReadExcludes = [
];
export const PolicyBindingSimpleExcludes = [
];
export const TenantListExcludes = [
  { path: 'status/currentState', include: true },
  { path: 'metadata/creationTimestamp', include: true },
];
export const TenantReadExcludes = [
];
export const TenantSimpleExcludes = [
];
