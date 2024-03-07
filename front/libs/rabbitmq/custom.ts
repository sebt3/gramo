// noGramoGenerator
import { QTableColumn } from 'quasar'
import { tableColumnAlign, timeAgo } from '../core'
import { databaseColor, databaseIcon, } from '../../routes/custom';
export const rabbitmqIcon = databaseIcon;
export const rabbitmqTitle = 'RabbitMQ';
export const iconRabbitmqCluster = databaseIcon;
export const colorRabbitmqCluster = databaseColor;
export const descriptionRabbitmqCluster = '';
export const shortRabbitmqCluster = 'RabbitmqCluster';
export const extraRabbitmqClusterColumns:Array<QTableColumn> = [
  {name: 'Age', label: 'Age', field: row => timeAgo(row.metadata.creationTimestamp), sortable: true, align: tableColumnAlign.left},
];
export const RabbitmqClusterListExcludes = [
];
export const RabbitmqClusterReadExcludes = [
];
export const RabbitmqClusterSimpleExcludes = [
];
