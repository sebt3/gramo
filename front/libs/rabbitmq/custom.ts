// noGramoGenerator
import { QTableColumn } from 'quasar'
import { tableColumnAlign, timeAgo } from '../core'
import { i18n } from "../i18n"
import { databaseColor, databaseIcon, } from '../../routes/custom';
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
