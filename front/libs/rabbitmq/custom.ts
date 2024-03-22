// noGramoGenerator
import { QTableColumn } from 'quasar'
const { tableColumnAlign } = await import('../core/navigation.js')
const {  timeAgo } = await import('../core')
const { i18n } = await import("../i18n")
const { databaseColor, databaseIcon, } = await import('../../routes/custom');
export const rabbitmqIcon = databaseIcon;
export const rabbitmqTitle = 'RabbitMQ';
export const iconRabbitmqCluster = databaseIcon;
export const colorRabbitmqCluster = databaseColor;
export const descriptionRabbitmqCluster = '';
export const shortRabbitmqCluster = 'RabbitmqCluster';
export const extraRabbitmqClusterColumns:Array<QTableColumn> = [
  {name: 'Age', label: `${i18n.global.t('meta.age')}`, field: row => timeAgo(row.metadata.creationTimestamp), sortable: true, align: tableColumnAlign.left},
];
export const RabbitmqClusterListExcludes = [
];
export const RabbitmqClusterReadExcludes = [
];
export const RabbitmqClusterSimpleExcludes = [
];
