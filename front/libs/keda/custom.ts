// noGramoGenerator
import { QTableColumn } from 'quasar'
const { tableColumnAlign } = await import('../core/navigation.js')
const { i18n } = await import("../i18n")
const { workloadColor, workloadIcon, } = await import('../../routes/custom');
export const kedaIcon = 'apps';
export const kedaTitle = 'KEDA';
export const iconCloudEventSource = workloadIcon;
export const colorCloudEventSource = workloadColor;
export const descriptionCloudEventSource = '';
export const shortCloudEventSource = 'CloudEventSource';
export const iconClusterTriggerAuthentication = workloadIcon;
export const colorClusterTriggerAuthentication = workloadColor;
export const descriptionClusterTriggerAuthentication = '';
export const shortClusterTriggerAuthentication = 'ClusterTriggerAuthentication';
export const iconScaledJob = workloadIcon;
export const colorScaledJob = workloadColor;
export const descriptionScaledJob = '';
export const shortScaledJob = 'ScaledJob';
export const iconScaledObject = workloadIcon;
export const colorScaledObject = workloadColor;
export const descriptionScaledObject = '';
export const shortScaledObject = 'ScaledObject';
export const iconTriggerAuthentication = workloadIcon;
export const colorTriggerAuthentication = workloadColor;
export const descriptionTriggerAuthentication = '';
export const shortTriggerAuthentication = 'TriggerAuthentication';
export const extraCloudEventSourceColumns:Array<QTableColumn> = [
];
export const extraClusterTriggerAuthenticationColumns:Array<QTableColumn> = [
  {name: 'PodIdentity', label: `${i18n.global.t('keda.PodIdentity')}`, field: row => row.spec.podIdentity.provider, sortable: true, align: tableColumnAlign.left},
  {name: 'VaultAddress', label: `${i18n.global.t('keda.VaultAddress')}`, field: row => row.spec.hashiCorpVault.address, sortable: true, align: tableColumnAlign.left},
  {name: 'ScaledObjects', label: `${i18n.global.t('keda.ScaledObjects')}`, field: row => row.status.scaledobjects, sortable: true, align: tableColumnAlign.left},
  {name: 'ScaledJobs', label: `${i18n.global.t('keda.ScaledJobs')}`, field: row => row.status.scaledjobs, sortable: true, align: tableColumnAlign.left},
];
export const extraScaledJobColumns:Array<QTableColumn> = [
  {name: 'Min', label: `${i18n.global.t('keda.Min')}`, field: row => row.spec.minReplicaCount, sortable: true, align: tableColumnAlign.left},
  {name: 'Max', label: `${i18n.global.t('keda.Max')}`, field: row => row.spec.maxReplicaCount, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: `${i18n.global.t('meta.age')}`, field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
];
export const extraScaledObjectColumns:Array<QTableColumn> = [
  {name: 'ScaleTargetKind', label: `${i18n.global.t('keda.ScaleTargetKind')}`, field: row => row.status.scaleTargetKind, sortable: true, align: tableColumnAlign.left},
  {name: 'ScaleTargetName', label: `${i18n.global.t('keda.ScaleTargetName')}`, field: row => row.spec.scaleTargetRef.name, sortable: true, align: tableColumnAlign.left},
  {name: 'Min', label: `${i18n.global.t('keda.Min')}`, field: row => row.spec.minReplicaCount, sortable: true, align: tableColumnAlign.left},
  {name: 'Max', label: `${i18n.global.t('keda.Max')}`, field: row => row.spec.maxReplicaCount, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: `${i18n.global.t('meta.age')}`, field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
];
export const extraTriggerAuthenticationColumns:Array<QTableColumn> = [
  {name: 'PodIdentity', label: `${i18n.global.t('keda.PodIdentity')}`, field: row => row.spec.podIdentity.provider, sortable: true, align: tableColumnAlign.left},
  {name: 'VaultAddress', label: `${i18n.global.t('keda.VaultAddress')}`, field: row => row.spec.hashiCorpVault.address, sortable: true, align: tableColumnAlign.left},
  {name: 'ScaledObjects', label: `${i18n.global.t('keda.ScaledObjects')}`, field: row => row.status.scaledobjects, sortable: true, align: tableColumnAlign.left},
  {name: 'ScaledJobs', label: `${i18n.global.t('keda.ScaledJobs')}`, field: row => row.status.scaledjobs, sortable: true, align: tableColumnAlign.left},
];
export const CloudEventSourceListExcludes = [
];
export const CloudEventSourceReadExcludes = [
];
export const CloudEventSourceSimpleExcludes = [
];
export const ClusterTriggerAuthenticationListExcludes = [
  { path: 'spec/podIdentity/provider', include: true },
  { path: 'spec/hashiCorpVault/address', include: true },
  { path: 'status/scaledobjects', include: true },
  { path: 'status/scaledjobs', include: true },
];
export const ClusterTriggerAuthenticationReadExcludes = [
];
export const ClusterTriggerAuthenticationSimpleExcludes = [
];
export const ScaledJobListExcludes = [
  { path: 'spec/minReplicaCount', include: true },
  { path: 'spec/maxReplicaCount', include: true },
  { path: 'metadata/creationTimestamp', include: true },
];
export const ScaledJobReadExcludes = [
];
export const ScaledJobSimpleExcludes = [
];
export const ScaledObjectListExcludes = [
  { path: 'status/scaleTargetKind', include: true },
  { path: 'spec/scaleTargetRef/name', include: true },
  { path: 'spec/minReplicaCount', include: true },
  { path: 'spec/maxReplicaCount', include: true },
  { path: 'metadata/creationTimestamp', include: true },
];
export const ScaledObjectReadExcludes = [
];
export const ScaledObjectSimpleExcludes = [
];
export const TriggerAuthenticationListExcludes = [
  { path: 'spec/podIdentity/provider', include: true },
  { path: 'spec/hashiCorpVault/address', include: true },
  { path: 'status/scaledobjects', include: true },
  { path: 'status/scaledjobs', include: true },
];
export const TriggerAuthenticationReadExcludes = [
];
export const TriggerAuthenticationSimpleExcludes = [
];
