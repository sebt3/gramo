import { QTableColumn } from 'quasar'
import { tableColumnAlign } from '../core'
import { i18n } from "../i18n"
import { installColor, installIcon, } from '../../routes/custom';
export const cattleIcon = 'apps';
export const cattleTitle = 'cattle';
export const iconHelmChart = installIcon;
export const colorHelmChart = installColor;
export const descriptionHelmChart = '';
export const shortHelmChart = 'HelmChart';
export const iconHelmChartConfig = installIcon;
export const colorHelmChartConfig = installColor;
export const descriptionHelmChartConfig = '';
export const shortHelmChartConfig = 'HelmChartConfig';
export const iconAddon = installIcon;
export const colorAddon = installColor;
export const descriptionAddon = '';
export const shortAddon = 'Addon';
export const extraHelmChartColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraHelmChartConfigColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraAddonColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const HelmChartListExcludes = [
];
export const HelmChartReadExcludes = [
];
export const HelmChartSimpleExcludes = [
];
export const HelmChartConfigListExcludes = [
];
export const HelmChartConfigReadExcludes = [
];
export const HelmChartConfigSimpleExcludes = [
];
export const AddonListExcludes = [
];
export const AddonReadExcludes = [
];
export const AddonSimpleExcludes = [
];
