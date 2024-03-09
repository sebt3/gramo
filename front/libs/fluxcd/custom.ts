// noGramoGenerator
import { QTableColumn } from 'quasar'
import { tableColumnAlign, timeAgo } from '../core'
import { i18n } from "../i18n"
import { automationColor, automationIcon, } from '../../routes/custom';
export const fluxcdIcon = automationIcon;
export const fluxcdTitle = 'Flux CD';
export const iconKustomization = automationIcon;
export const colorKustomization = automationColor;
export const descriptionKustomization = '';
export const shortKustomization = 'Kustomization';
export const iconReceiver = 'notifications';
export const colorReceiver = automationColor;
export const descriptionReceiver = '';
export const shortReceiver = 'Receiver';
export const iconAlert = 'notifications';
export const colorAlert = automationColor;
export const descriptionAlert = '';
export const shortAlert = 'Alert';
export const iconProvider = 'notifications';
export const colorProvider = automationColor;
export const descriptionProvider = '';
export const shortProvider = 'Provider';
export const iconGitRepository = 'storage';
export const colorGitRepository = automationColor;
export const descriptionGitRepository = '';
export const shortGitRepository = 'GitRepository';
export const iconBucket = 'storage';
export const colorBucket = automationColor;
export const descriptionBucket = '';
export const shortBucket = 'Bucket';
export const iconHelmChart = 'storage';
export const colorHelmChart = automationColor;
export const descriptionHelmChart = '';
export const shortHelmChart = 'HelmChart';
export const iconHelmRepository = 'storage';
export const colorHelmRepository = automationColor;
export const descriptionHelmRepository = '';
export const shortHelmRepository = 'HelmRepository';
export const iconOCIRepository = 'storage';
export const colorOCIRepository = automationColor;
export const descriptionOCIRepository = '';
export const shortOCIRepository = 'OCIRepository';
export const iconImageUpdateAutomation = automationIcon;
export const colorImageUpdateAutomation = automationColor;
export const descriptionImageUpdateAutomation = '';
export const shortImageUpdateAutomation = 'ImageUpdateAutomation';
export const iconImagePolicy = automationIcon;
export const colorImagePolicy = automationColor;
export const descriptionImagePolicy = '';
export const shortImagePolicy = 'ImagePolicy';
export const iconImageRepository = 'fab fa-docker';
export const colorImageRepository = automationColor;
export const descriptionImageRepository = '';
export const shortImageRepository = 'ImageRepository';
export const iconHelmRelease = 'album';
export const colorHelmRelease = automationColor;
export const descriptionHelmRelease = '';
export const shortHelmRelease = 'HelmRelease';

export const extraKustomizationColumns:Array<QTableColumn> = [
  {name: 'Children', label: `${i18n.global.t('fluxcd.Children')}`, field: row => row.status.inventory.entries.length, sortable: true, align: tableColumnAlign.left},
  {name: 'LastChange', label: `${i18n.global.t('fluxcd.LastChange')}`, field: row => timeAgo(row.status?.conditions[0].lastTransitionTime), sortable: true, align: tableColumnAlign.left},
];
export const extraReceiverColumns:Array<QTableColumn> = [
  {name: 'Age', label: `${i18n.global.t('meta.age')}`, field: row => timeAgo(row.metadata.creationTimestamp), sortable: true, align: tableColumnAlign.left},
];
export const extraAlertColumns:Array<QTableColumn> = [
  {name: 'Age', label: `${i18n.global.t('meta.age')}`, field: row => timeAgo(row.metadata.creationTimestamp), sortable: true, align: tableColumnAlign.left},
];
export const extraProviderColumns:Array<QTableColumn> = [
  {name: 'Age', label: `${i18n.global.t('meta.age')}`, field: row => timeAgo(row.metadata.creationTimestamp), sortable: true, align: tableColumnAlign.left},
];
export const extraGitRepositoryColumns:Array<QTableColumn> = [
  {name: 'URL', label: `${i18n.global.t('core.url')}`, field: row => row.spec.url, sortable: true, align: tableColumnAlign.left},
  {name: 'LastChange', label: `${i18n.global.t('fluxcd.LastChange')}`, field: row => row.status!=undefined&&Array.isArray(row.status.conditions)?timeAgo(row.status.conditions[0].lastTransitionTime):'--', sortable: true, align: tableColumnAlign.left},
];
export const extraBucketColumns:Array<QTableColumn> = [
  {name: 'Endpoint', label: 'Endpoint', field: row => row.spec.endpoint, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: `${i18n.global.t('meta.age')}`, field: row => timeAgo(row.metadata.creationTimestamp), sortable: true, align: tableColumnAlign.left},
];
export const extraHelmChartColumns:Array<QTableColumn> = [
  {name: 'Chart', label: `${i18n.global.t('fluxcd.Chart')}`, field: row => row.spec.chart, sortable: true, align: tableColumnAlign.left},
  {name: 'Version', label: `${i18n.global.t('fluxcd.Version')}`, field: row => row.spec.version, sortable: true, align: tableColumnAlign.left},
  {name: 'SourceKind', label: `${i18n.global.t('fluxcd.SourceKind')}`, field: row => row.spec.sourceRef.kind, sortable: true, align: tableColumnAlign.left},
  {name: 'SourceName', label: `${i18n.global.t('fluxcd.SourceName')}`, field: row => row.spec.sourceRef.name, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: `${i18n.global.t('meta.age')}`, field: row => timeAgo(row.metadata.creationTimestamp), sortable: true, align: tableColumnAlign.left},
];
export const extraHelmRepositoryColumns:Array<QTableColumn> = [
  {name: 'URL', label: `${i18n.global.t('core.url')}`, field: row => row.spec.url, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: `${i18n.global.t('meta.age')}`, field: row => timeAgo(row.metadata.creationTimestamp), sortable: true, align: tableColumnAlign.left},
];
export const extraOCIRepositoryColumns:Array<QTableColumn> = [
  {name: 'URL', label: `${i18n.global.t('core.url')}`, field: row => row.spec.url, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: `${i18n.global.t('meta.age')}`, field: row => timeAgo(row.metadata.creationTimestamp), sortable: true, align: tableColumnAlign.left},
];
export const extraImageUpdateAutomationColumns:Array<QTableColumn> = [
  {name: 'LastRun', label: `${i18n.global.t('fluxcd.LastRun')}`, field: row => timeAgo(row.status?.lastAutomationRunTime), sortable: true, align: tableColumnAlign.left},
];
export const extraImagePolicyColumns:Array<QTableColumn> = [
  {name: 'LatestImage', label: `${i18n.global.t('fluxcd.LatestImage')}`, field: row => row.status?.latestImage, sortable: true, align: tableColumnAlign.left},
  {name: 'LastChange', label: `${i18n.global.t('fluxcd.LastChange')}`, field: row => timeAgo(row.status?.conditions[0].lastTransitionTime), sortable: true, align: tableColumnAlign.left},
];
export const extraImageRepositoryColumns:Array<QTableColumn> = [
  {name: 'LastScan', label: `${i18n.global.t('fluxcd.LastScan')}`, field: row => timeAgo(row.status.lastScanResult?.scanTime), sortable: true, align: tableColumnAlign.left},
  {name: 'Tags', label: `${i18n.global.t('fluxcd.Tags')}`, field: row => row.status?.lastScanResult?.tagCount, sortable: true, align: tableColumnAlign.left},
];
export const extraHelmReleaseColumns:Array<QTableColumn> = [
  {name: 'Age', label: `${i18n.global.t('meta.age')}`, field: row => timeAgo(row.metadata.creationTimestamp), sortable: true, align: tableColumnAlign.left},
];
export const KustomizationListExcludes = [
];
export const KustomizationReadExcludes = [
];
export const KustomizationSimpleExcludes = [
];
export const ReceiverListExcludes = [
];
export const ReceiverReadExcludes = [
];
export const ReceiverSimpleExcludes = [
];
export const AlertListExcludes = [
];
export const AlertReadExcludes = [
];
export const AlertSimpleExcludes = [
];
export const ProviderListExcludes = [
];
export const ProviderReadExcludes = [
];
export const ProviderSimpleExcludes = [
];
export const GitRepositoryListExcludes = [
  { path: 'spec/url', include: true },
  { path: 'status', include: true },
];
export const GitRepositoryReadExcludes = [
];
export const GitRepositorySimpleExcludes = [
];
export const BucketListExcludes = [
  { path: 'spec/endpoint', include: true },
];
export const BucketReadExcludes = [
];
export const BucketSimpleExcludes = [
];
export const HelmChartListExcludes = [
  { path: 'spec/chart', include: true },
  { path: 'spec/version', include: true },
  { path: 'spec/sourceRef/kind', include: true },
  { path: 'spec/sourceRef/name', include: true },
];
export const HelmChartReadExcludes = [
];
export const HelmChartSimpleExcludes = [
];
export const HelmRepositoryListExcludes = [
  { path: 'spec/url', include: true },
];
export const HelmRepositoryReadExcludes = [
];
export const HelmRepositorySimpleExcludes = [
];
export const OCIRepositoryListExcludes = [
  { path: 'spec/url', include: true },
];
export const OCIRepositoryReadExcludes = [
];
export const OCIRepositorySimpleExcludes = [
];
export const ImageUpdateAutomationListExcludes = [
];
export const ImageUpdateAutomationReadExcludes = [
];
export const ImageUpdateAutomationSimpleExcludes = [
];
export const ImagePolicyListExcludes = [
];
export const ImagePolicyReadExcludes = [
];
export const ImagePolicySimpleExcludes = [
];
export const ImageRepositoryListExcludes = [
];
export const ImageRepositoryReadExcludes = [
];
export const ImageRepositorySimpleExcludes = [
];
export const HelmReleaseListExcludes = [
];
export const HelmReleaseReadExcludes = [
];
export const HelmReleaseSimpleExcludes = [
];
