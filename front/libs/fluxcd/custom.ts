// noGramoGenerator
import { QTableColumn } from 'quasar'
import { tableColumnAlign } from '../core'
export const fluxcdIcon = 'auto_mode';
export const fluxcdTitle = 'Flux CD';
export const iconKustomization = 'auto_mode';
export const iconReceiver = 'notifications';
export const iconAlert = 'notifications';
export const iconProvider = 'notifications';
export const iconGitRepository = 'storage';
export const iconBucket = 'storage';
export const iconHelmChart = 'storage';
export const iconHelmRepository = 'storage';
export const iconOCIRepository = 'storage';
export const iconImageUpdateAutomation = 'auto_mode';
export const iconImagePolicy = 'auto_mode';
export const iconImageRepository = 'fab fa-docker';
export const iconHelmRelease = 'album';
export const colorKustomization = '';
export const descriptionKustomization = '';
export const shortKustomization = '';
export const colorReceiver = '';
export const descriptionReceiver = '';
export const shortReceiver = '';
export const colorAlert = '';
export const descriptionAlert = '';
export const shortAlert = '';
export const colorProvider = '';
export const descriptionProvider = '';
export const shortProvider = '';
export const colorGitRepository = '';
export const descriptionGitRepository = '';
export const shortGitRepository = '';
export const colorBucket = '';
export const descriptionBucket = '';
export const shortBucket = '';
export const colorHelmChart = '';
export const descriptionHelmChart = '';
export const shortHelmChart = '';
export const colorHelmRepository = '';
export const descriptionHelmRepository = '';
export const shortHelmRepository = '';
export const colorOCIRepository = '';
export const descriptionOCIRepository = '';
export const shortOCIRepository = '';
export const colorImageUpdateAutomation = '';
export const descriptionImageUpdateAutomation = '';
export const shortImageUpdateAutomation = '';
export const colorImagePolicy = '';
export const descriptionImagePolicy = '';
export const shortImagePolicy = '';
export const colorImageRepository = '';
export const descriptionImageRepository = '';
export const shortImageRepository = '';
export const colorHelmRelease = '';
export const descriptionHelmRelease = '';
export const shortHelmRelease = '';

export const extraKustomizationColumns:Array<QTableColumn> = [
  {name: 'Age', label: 'Age', field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
];
export const extraReceiverColumns:Array<QTableColumn> = [
  {name: 'Age', label: 'Age', field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
];
export const extraAlertColumns:Array<QTableColumn> = [
  {name: 'Age', label: 'Age', field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
];
export const extraProviderColumns:Array<QTableColumn> = [
  {name: 'Age', label: 'Age', field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
];
export const extraGitRepositoryColumns:Array<QTableColumn> = [
  {name: 'URL', label: 'URL', field: row => row.spec.url, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: 'Age', field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
];
export const extraBucketColumns:Array<QTableColumn> = [
  {name: 'Endpoint', label: 'Endpoint', field: row => row.spec.endpoint, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: 'Age', field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
];
export const extraHelmChartColumns:Array<QTableColumn> = [
  {name: 'Chart', label: 'Chart', field: row => row.spec.chart, sortable: true, align: tableColumnAlign.left},
  {name: 'Version', label: 'Version', field: row => row.spec.version, sortable: true, align: tableColumnAlign.left},
  {name: 'Source Kind', label: 'Source Kind', field: row => row.spec.sourceRef.kind, sortable: true, align: tableColumnAlign.left},
  {name: 'Source Name', label: 'Source Name', field: row => row.spec.sourceRef.name, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: 'Age', field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
];
export const extraHelmRepositoryColumns:Array<QTableColumn> = [
  {name: 'URL', label: 'URL', field: row => row.spec.url, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: 'Age', field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
];
export const extraOCIRepositoryColumns:Array<QTableColumn> = [
  {name: 'URL', label: 'URL', field: row => row.spec.url, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: 'Age', field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
];
export const extraImageUpdateAutomationColumns:Array<QTableColumn> = [
  {name: 'Last run', label: 'Last run', field: row => row.status.lastAutomationRunTime, sortable: true, align: tableColumnAlign.left},
];
export const extraImagePolicyColumns:Array<QTableColumn> = [
  {name: 'LatestImage', label: 'LatestImage', field: row => row.status.latestImage, sortable: true, align: tableColumnAlign.left},
];
export const extraImageRepositoryColumns:Array<QTableColumn> = [
  {name: 'Last scan', label: 'Last scan', field: row => row.status.lastScanResult.scanTime, sortable: true, align: tableColumnAlign.left},
  {name: 'Tags', label: 'Tags', field: row => row.status.lastScanResult.tagCount, sortable: true, align: tableColumnAlign.left},
];
export const extraHelmReleaseColumns:Array<QTableColumn> = [
  {name: 'Age', label: 'Age', field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
];
export const KustomizationListExcludes = [
  { path: 'metadata/creationTimestamp', include: true },
];
export const KustomizationReadExcludes = [
];
export const KustomizationSimpleExcludes = [
];
export const ReceiverListExcludes = [
  { path: 'metadata/creationTimestamp', include: true },
];
export const ReceiverReadExcludes = [
];
export const ReceiverSimpleExcludes = [
];
export const AlertListExcludes = [
  { path: 'metadata/creationTimestamp', include: true },
];
export const AlertReadExcludes = [
];
export const AlertSimpleExcludes = [
];
export const ProviderListExcludes = [
  { path: 'metadata/creationTimestamp', include: true },
];
export const ProviderReadExcludes = [
];
export const ProviderSimpleExcludes = [
];
export const GitRepositoryListExcludes = [
  { path: 'spec/url', include: true },
  { path: 'metadata/creationTimestamp', include: true },
];
export const GitRepositoryReadExcludes = [
];
export const GitRepositorySimpleExcludes = [
];
export const BucketListExcludes = [
  { path: 'spec/endpoint', include: true },
  { path: 'metadata/creationTimestamp', include: true },
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
  { path: 'metadata/creationTimestamp', include: true },
];
export const HelmChartReadExcludes = [
];
export const HelmChartSimpleExcludes = [
];
export const HelmRepositoryListExcludes = [
  { path: 'spec/url', include: true },
  { path: 'metadata/creationTimestamp', include: true },
];
export const HelmRepositoryReadExcludes = [
];
export const HelmRepositorySimpleExcludes = [
];
export const OCIRepositoryListExcludes = [
  { path: 'spec/url', include: true },
  { path: 'metadata/creationTimestamp', include: true },
];
export const OCIRepositoryReadExcludes = [
];
export const OCIRepositorySimpleExcludes = [
];
export const ImageUpdateAutomationListExcludes = [
  { path: 'status/lastAutomationRunTime', include: true },
];
export const ImageUpdateAutomationReadExcludes = [
];
export const ImageUpdateAutomationSimpleExcludes = [
];
export const ImagePolicyListExcludes = [
  { path: 'status/latestImage', include: true },
];
export const ImagePolicyReadExcludes = [
];
export const ImagePolicySimpleExcludes = [
];
export const ImageRepositoryListExcludes = [
  { path: 'status/lastScanResult/scanTime', include: true },
  { path: 'status/lastScanResult/tagCount', include: true },
];
export const ImageRepositoryReadExcludes = [
];
export const ImageRepositorySimpleExcludes = [
];
export const HelmReleaseListExcludes = [
  { path: 'metadata/creationTimestamp', include: true },
];
export const HelmReleaseReadExcludes = [
];
export const HelmReleaseSimpleExcludes = [
];
