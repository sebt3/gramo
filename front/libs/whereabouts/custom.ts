// noGramoGenerator
import { QTableColumn } from 'quasar'
const { tableColumnAlign } = await import('../core/navigation.js')
const { i18n } = await import("../i18n")
const { networkColor, networkIcon, } = await import('../../routes/custom');
export const whereaboutsIcon = 'apps';
export const whereaboutsTitle = 'whereabouts';
export const iconIPPool = networkIcon;
export const colorIPPool = networkColor;
export const descriptionIPPool = '';
export const shortIPPool = 'IPPool';
export const iconOverlappingRangeIPReservation = networkIcon;
export const colorOverlappingRangeIPReservation = networkColor;
export const descriptionOverlappingRangeIPReservation = '';
export const shortOverlappingRangeIPReservation = 'OverlappingRangeIPReservation';
export const extraIPPoolColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraOverlappingRangeIPReservationColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const IPPoolListExcludes = [
];
export const IPPoolReadExcludes = [
];
export const IPPoolSimpleExcludes = [
];
export const OverlappingRangeIPReservationListExcludes = [
];
export const OverlappingRangeIPReservationReadExcludes = [
];
export const OverlappingRangeIPReservationSimpleExcludes = [
];
