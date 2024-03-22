// noGramoGenerator
import { QTableColumn } from 'quasar'
const { tableColumnAlign } = await import('../core/navigation.js')
const { i18n } = await import("../i18n")
const { workloadColor, workloadIcon, } = await import('../../routes/custom');
export const fissionIcon = 'apps';
export const fissionTitle = 'Fission';
export const iconCanaryConfig = workloadIcon;
export const colorCanaryConfig = workloadColor;
export const descriptionCanaryConfig = '';
export const shortCanaryConfig = 'CanaryConfig';
export const iconEnvironment = workloadIcon;
export const colorEnvironment = workloadColor;
export const descriptionEnvironment = '';
export const shortEnvironment = 'Environment';
export const iconFunction = workloadIcon;
export const colorFunction = workloadColor;
export const descriptionFunction = '';
export const shortFunction = 'Function';
export const iconHTTPTrigger = workloadIcon;
export const colorHTTPTrigger = workloadColor;
export const descriptionHTTPTrigger = '';
export const shortHTTPTrigger = 'HTTPTrigger';
export const iconKubernetesWatchTrigger = workloadIcon;
export const colorKubernetesWatchTrigger = workloadColor;
export const descriptionKubernetesWatchTrigger = '';
export const shortKubernetesWatchTrigger = 'KubernetesWatchTrigger';
export const iconMessageQueueTrigger = workloadIcon;
export const colorMessageQueueTrigger = workloadColor;
export const descriptionMessageQueueTrigger = '';
export const shortMessageQueueTrigger = 'MessageQueueTrigger';
export const iconPackage = workloadIcon;
export const colorPackage = workloadColor;
export const descriptionPackage = '';
export const shortPackage = 'Package';
export const iconTimeTrigger = workloadIcon;
export const colorTimeTrigger = workloadColor;
export const descriptionTimeTrigger = '';
export const shortTimeTrigger = 'TimeTrigger';
export const extraCanaryConfigColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraEnvironmentColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraFunctionColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraHTTPTriggerColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraKubernetesWatchTriggerColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraMessageQueueTriggerColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraPackageColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraTimeTriggerColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const CanaryConfigListExcludes = [
];
export const CanaryConfigReadExcludes = [
];
export const CanaryConfigSimpleExcludes = [
];
export const EnvironmentListExcludes = [
];
export const EnvironmentReadExcludes = [
];
export const EnvironmentSimpleExcludes = [
];
export const FunctionListExcludes = [
];
export const FunctionReadExcludes = [
];
export const FunctionSimpleExcludes = [
];
export const HTTPTriggerListExcludes = [
];
export const HTTPTriggerReadExcludes = [
];
export const HTTPTriggerSimpleExcludes = [
];
export const KubernetesWatchTriggerListExcludes = [
];
export const KubernetesWatchTriggerReadExcludes = [
];
export const KubernetesWatchTriggerSimpleExcludes = [
];
export const MessageQueueTriggerListExcludes = [
];
export const MessageQueueTriggerReadExcludes = [
];
export const MessageQueueTriggerSimpleExcludes = [
];
export const PackageListExcludes = [
];
export const PackageReadExcludes = [
];
export const PackageSimpleExcludes = [
];
export const TimeTriggerListExcludes = [
];
export const TimeTriggerReadExcludes = [
];
export const TimeTriggerSimpleExcludes = [
];
