// noGramoGenerator
import { QTableColumn } from 'quasar'
const { tableColumnAlign } = await import('../core/navigation.js')
const { i18n } = await import("../i18n")
const { installColor, installIcon, } = await import('../../routes/custom');
export const operatorsIcon = 'apps';
export const operatorsTitle = 'OLM';
export const iconOLMConfig = installIcon;
export const colorOLMConfig = installColor;
export const descriptionOLMConfig = '';
export const shortOLMConfig = 'OLMConfig';
export const iconOperator = installIcon;
export const colorOperator = installColor;
export const descriptionOperator = '';
export const shortOperator = 'Operator';
export const iconOperatorGroup = installIcon;
export const colorOperatorGroup = installColor;
export const descriptionOperatorGroup = '';
export const shortOperatorGroup = 'OperatorGroup';
export const iconCatalogSource = installIcon;
export const colorCatalogSource = installColor;
export const descriptionCatalogSource = '';
export const shortCatalogSource = 'CatalogSource';
export const iconClusterServiceVersion = installIcon;
export const colorClusterServiceVersion = installColor;
export const descriptionClusterServiceVersion = '';
export const shortClusterServiceVersion = 'ClusterServiceVersion';
export const iconInstallPlan = installIcon;
export const colorInstallPlan = installColor;
export const descriptionInstallPlan = '';
export const shortInstallPlan = 'InstallPlan';
export const iconSubscription = installIcon;
export const colorSubscription = installColor;
export const descriptionSubscription = '';
export const shortSubscription = 'Subscription';
export const iconOperatorCondition = installIcon;
export const colorOperatorCondition = installColor;
export const descriptionOperatorCondition = '';
export const shortOperatorCondition = 'OperatorCondition';
export const extraOLMConfigColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraOperatorColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraOperatorGroupColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraCatalogSourceColumns:Array<QTableColumn> = [
  {name: 'Display', label: `${i18n.global.t('operators.Display')}`, field: row => row.spec.displayName, sortable: true, align: tableColumnAlign.left},
  {name: 'Type', label: `${i18n.global.t('operators.Type')}`, field: row => row.spec.sourceType, sortable: true, align: tableColumnAlign.left},
  {name: 'Publisher', label: `${i18n.global.t('operators.Publisher')}`, field: row => row.spec.publisher, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: `${i18n.global.t('meta.age')}`, field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
];
export const extraClusterServiceVersionColumns:Array<QTableColumn> = [
  {name: 'Display', label: `${i18n.global.t('operators.Display')}`, field: row => row.spec.displayName, sortable: true, align: tableColumnAlign.left},
  {name: 'Version', label: `${i18n.global.t('operators.Version')}`, field: row => row.spec.version, sortable: true, align: tableColumnAlign.left},
  {name: 'Replaces', label: `${i18n.global.t('operators.Replaces')}`, field: row => row.spec.replaces, sortable: true, align: tableColumnAlign.left},
  {name: 'Phase', label: `${i18n.global.t('operators.Phase')}`, field: row => row.status.phase, sortable: true, align: tableColumnAlign.left},
];
export const extraInstallPlanColumns:Array<QTableColumn> = [
  {name: 'Approval', label: `${i18n.global.t('operators.Approval')}`, field: row => row.spec.approval, sortable: true, align: tableColumnAlign.left},
  {name: 'Approved', label: `${i18n.global.t('operators.Approved')}`, field: row => row.spec.approved, sortable: true, align: tableColumnAlign.left},
];
export const extraSubscriptionColumns:Array<QTableColumn> = [
  {name: 'Package', label: `${i18n.global.t('operators.Package')}`, field: row => row.spec.name, sortable: true, align: tableColumnAlign.left},
  {name: 'Source', label: `${i18n.global.t('operators.Source')}`, field: row => row.spec.source, sortable: true, align: tableColumnAlign.left},
  {name: 'Channel', label: `${i18n.global.t('operators.Channel')}`, field: row => row.spec.channel, sortable: true, align: tableColumnAlign.left},
];
export const extraOperatorConditionColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const OLMConfigListExcludes = [
];
export const OLMConfigReadExcludes = [
];
export const OLMConfigSimpleExcludes = [
];
export const OperatorListExcludes = [
];
export const OperatorReadExcludes = [
];
export const OperatorSimpleExcludes = [
];
export const OperatorGroupListExcludes = [
];
export const OperatorGroupReadExcludes = [
];
export const OperatorGroupSimpleExcludes = [
];
export const CatalogSourceListExcludes = [
  { path: 'spec/displayName', include: true },
  { path: 'spec/sourceType', include: true },
  { path: 'spec/publisher', include: true },
  { path: 'metadata/creationTimestamp', include: true },
];
export const CatalogSourceReadExcludes = [
];
export const CatalogSourceSimpleExcludes = [
];
export const ClusterServiceVersionListExcludes = [
  { path: 'spec/displayName', include: true },
  { path: 'spec/version', include: true },
  { path: 'spec/replaces', include: true },
  { path: 'status/phase', include: true },
];
export const ClusterServiceVersionReadExcludes = [
];
export const ClusterServiceVersionSimpleExcludes = [
];
export const InstallPlanListExcludes = [
  { path: 'spec/approval', include: true },
  { path: 'spec/approved', include: true },
];
export const InstallPlanReadExcludes = [
];
export const InstallPlanSimpleExcludes = [
];
export const SubscriptionListExcludes = [
  { path: 'spec/name', include: true },
  { path: 'spec/source', include: true },
  { path: 'spec/channel', include: true },
];
export const SubscriptionReadExcludes = [
];
export const SubscriptionSimpleExcludes = [
];
export const OperatorConditionListExcludes = [
];
export const OperatorConditionReadExcludes = [
];
export const OperatorConditionSimpleExcludes = [
];
