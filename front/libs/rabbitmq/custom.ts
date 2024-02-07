// noGramoGenerator
import { QTableColumn } from 'quasar'
import { tableColumnAlign } from '../core'
export const rabbitmqIcon = 'apps';
export const rabbitmqTitle = 'RabbitMQ';
export const iconRabbitmqCluster = 'album';
export const colorRabbitmqCluster = '';
export const descriptionRabbitmqCluster = '';
export const shortRabbitmqCluster = '';
export const extraRabbitmqClusterColumns:Array<QTableColumn> = [
  {name: 'Age', label: 'Age', field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
];
export const RabbitmqClusterListExcludes = [
  { path: 'metadata/creationTimestamp', include: true },
];
export const RabbitmqClusterReadExcludes = [
];
export const RabbitmqClusterSimpleExcludes = [
];
