// noGramoGenerator
import { QTableColumn } from 'quasar'
const { tableColumnAlign } = await import('../core/navigation.js')
const { i18n } = await import("../i18n")
const { systemColor, systemIcon, } = await import('../../routes/custom');
export const networkaddonsoperatorIcon = 'apps';
export const networkaddonsoperatorTitle = 'networkaddonsoperator';
export const iconNetworkAddonsConfig = systemIcon;
export const colorNetworkAddonsConfig = systemColor;
export const descriptionNetworkAddonsConfig = '';
export const shortNetworkAddonsConfig = 'NetworkAddonsConfig';
export const extraNetworkAddonsConfigColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const NetworkAddonsConfigListExcludes = [
];
export const NetworkAddonsConfigReadExcludes = [
];
export const NetworkAddonsConfigSimpleExcludes = [
];
