// noGramoGenerator
import { QTableColumn } from 'quasar'
const { tableColumnAlign } = await import('../core/navigation.js')
const {  timeAgo } = await import('../core')
const { i18n } = await import("../i18n")
const { databaseColor, databaseIcon, } = await import('../../routes/custom');
export const rabbitmqIcon = databaseIcon;
export const rabbitmqTitle = 'RabbitMQ';
export const iconSuperStream = databaseIcon;
export const colorSuperStream = databaseColor;
export const descriptionSuperStream = '';
export const shortSuperStream = 'SuperStream';
export const iconBinding = databaseIcon;
export const colorBinding = databaseColor;
export const descriptionBinding = '';
export const shortBinding = 'Binding';
export const iconExchange = databaseIcon;
export const colorExchange = databaseColor;
export const descriptionExchange = '';
export const shortExchange = 'Exchange';
export const iconFederation = databaseIcon;
export const colorFederation = databaseColor;
export const descriptionFederation = '';
export const shortFederation = 'Federation';
export const iconOperatorPolicy = databaseIcon;
export const colorOperatorPolicy = databaseColor;
export const descriptionOperatorPolicy = '';
export const shortOperatorPolicy = 'OperatorPolicy';
export const iconPermission = databaseIcon;
export const colorPermission = databaseColor;
export const descriptionPermission = '';
export const shortPermission = 'Permission';
export const iconPolicy = databaseIcon;
export const colorPolicy = databaseColor;
export const descriptionPolicy = '';
export const shortPolicy = 'Policy';
export const iconQueue = databaseIcon;
export const colorQueue = databaseColor;
export const descriptionQueue = '';
export const shortQueue = 'Queue';
export const iconRabbitmqCluster = databaseIcon;
export const colorRabbitmqCluster = databaseColor;
export const descriptionRabbitmqCluster = '';
export const shortRabbitmqCluster = 'RabbitmqCluster';
export const iconSchemaReplication = databaseIcon;
export const colorSchemaReplication = databaseColor;
export const descriptionSchemaReplication = '';
export const shortSchemaReplication = 'SchemaReplication';
export const iconShovel = databaseIcon;
export const colorShovel = databaseColor;
export const descriptionShovel = '';
export const shortShovel = 'Shovel';
export const iconTopicPermission = databaseIcon;
export const colorTopicPermission = databaseColor;
export const descriptionTopicPermission = '';
export const shortTopicPermission = 'TopicPermission';
export const iconUser = databaseIcon;
export const colorUser = databaseColor;
export const descriptionUser = '';
export const shortUser = 'User';
export const iconVhost = databaseIcon;
export const colorVhost = databaseColor;
export const descriptionVhost = '';
export const shortVhost = 'Vhost';
export const extraSuperStreamColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraBindingColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraExchangeColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraFederationColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraOperatorPolicyColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraPermissionColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraPolicyColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraQueueColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraRabbitmqClusterColumns:Array<QTableColumn> = [
  {name: 'Age', label: `${i18n.global.t('meta.age')}`, field: row => timeAgo(row.metadata.creationTimestamp), sortable: true, align: tableColumnAlign.left},
];
export const extraSchemaReplicationColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraShovelColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraTopicPermissionColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraUserColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraVhostColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const SuperStreamListExcludes = [
];
export const SuperStreamReadExcludes = [
];
export const SuperStreamSimpleExcludes = [
];
export const BindingListExcludes = [
];
export const BindingReadExcludes = [
];
export const BindingSimpleExcludes = [
];
export const ExchangeListExcludes = [
];
export const ExchangeReadExcludes = [
];
export const ExchangeSimpleExcludes = [
];
export const FederationListExcludes = [
];
export const FederationReadExcludes = [
];
export const FederationSimpleExcludes = [
];
export const OperatorPolicyListExcludes = [
];
export const OperatorPolicyReadExcludes = [
];
export const OperatorPolicySimpleExcludes = [
];
export const PermissionListExcludes = [
];
export const PermissionReadExcludes = [
];
export const PermissionSimpleExcludes = [
];
export const PolicyListExcludes = [
];
export const PolicyReadExcludes = [
];
export const PolicySimpleExcludes = [
];
export const QueueListExcludes = [
];
export const QueueReadExcludes = [
];
export const QueueSimpleExcludes = [
];
export const RabbitmqClusterListExcludes = [
];
export const RabbitmqClusterReadExcludes = [
];
export const RabbitmqClusterSimpleExcludes = [
];
export const SchemaReplicationListExcludes = [
];
export const SchemaReplicationReadExcludes = [
];
export const SchemaReplicationSimpleExcludes = [
];
export const ShovelListExcludes = [
];
export const ShovelReadExcludes = [
];
export const ShovelSimpleExcludes = [
];
export const TopicPermissionListExcludes = [
];
export const TopicPermissionReadExcludes = [
];
export const TopicPermissionSimpleExcludes = [
];
export const UserListExcludes = [
];
export const UserReadExcludes = [
];
export const UserSimpleExcludes = [
];
export const VhostListExcludes = [
];
export const VhostReadExcludes = [
];
export const VhostSimpleExcludes = [
];
