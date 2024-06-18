// noGramoGenerator
import { QTableColumn } from 'quasar'
const { tableColumnAlign } = await import('../core/navigation.js')
const { i18n } = await import("../i18n")
const { configColor, configIcon, } = await import('../../routes/custom');
export const kuberestIcon = 'webhook';
export const kuberestTitle = 'KubeREST';
export const iconRestEndPoint = 'webhook';
export const colorRestEndPoint = configColor;
export const descriptionRestEndPoint = '';
export const shortRestEndPoint = 'RestEndPoint';
export const extraRestEndPointColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const RestEndPointListExcludes = [
];
export const RestEndPointReadExcludes = [
];
export const RestEndPointSimpleExcludes = [
];
