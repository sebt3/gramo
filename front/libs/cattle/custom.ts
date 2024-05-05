// noGramoGenerator
import { QTableColumn } from 'quasar'
const { tableColumnAlign } = await import('../core/navigation.js')
const { i18n } = await import("../i18n")
const { installColor, installIcon, } = await import('../../routes/custom');
export const cattleIcon = 'apps';
export const cattleTitle = 'cattle';
export const iconHelmChart = installIcon;
export const colorHelmChart = installColor;
export const descriptionHelmChart = '';
export const shortHelmChart = 'HelmChart';
export const iconHelmChartConfig = installIcon;
export const colorHelmChartConfig = installColor;
export const descriptionHelmChartConfig = '';
export const shortHelmChartConfig = 'HelmChartConfig';
export const iconAddon = installIcon;
export const colorAddon = installColor;
export const descriptionAddon = '';
export const shortAddon = 'Addon';
export const iconETCDSnapshotFile = installIcon;
export const colorETCDSnapshotFile = installColor;
export const descriptionETCDSnapshotFile = '';
export const shortETCDSnapshotFile = 'ETCDSnapshotFile';
export const extraHelmChartColumns:Array<QTableColumn> = [
  {name: 'Job', label: `${i18n.global.t('cattle.Job')}`, field: row => row.status?.jobName, sortable: true, align: tableColumnAlign.left},
  {name: 'Chart', label: `${i18n.global.t('cattle.Chart')}`, field: row => row.spec.chart, sortable: true, align: tableColumnAlign.left},
  {name: 'TargetNamespace', label: `${i18n.global.t('cattle.TargetNamespace')}`, field: row => row.spec.targetNamespace, sortable: true, align: tableColumnAlign.left},
  {name: 'Version', label: `${i18n.global.t('cattle.Version')}`, field: row => row.spec.version, sortable: true, align: tableColumnAlign.left},
  {name: 'Repo', label: `${i18n.global.t('cattle.Repo')}`, field: row => row.spec.repo, sortable: true, align: tableColumnAlign.left},
  {name: 'HelmVersion', label: `${i18n.global.t('cattle.HelmVersion')}`, field: row => row.spec.helmVersion, sortable: true, align: tableColumnAlign.left},
  {name: 'Bootstrap', label: `${i18n.global.t('cattle.Bootstrap')}`, field: row => row.spec.bootstrap, sortable: true, align: tableColumnAlign.left},
];
export const extraHelmChartConfigColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraAddonColumns:Array<QTableColumn> = [
  {name: 'Source', label: `${i18n.global.t('cattle.Source')}`, field: row => row.spec.source, sortable: true, align: tableColumnAlign.left},
  {name: 'Checksum', label: `${i18n.global.t('cattle.Checksum')}`, field: row => row.spec.checksum, sortable: true, align: tableColumnAlign.left},
];
export const extraETCDSnapshotFileColumns:Array<QTableColumn> = [
  {name: 'SnapshotName', label: `${i18n.global.t('cattle.SnapshotName')}`, field: row => row.spec.snapshotName, sortable: true, align: tableColumnAlign.left},
  {name: 'Node', label: `${i18n.global.t('cattle.Node')}`, field: row => row.spec.nodeName, sortable: true, align: tableColumnAlign.left},
  {name: 'Location', label: `${i18n.global.t('cattle.Location')}`, field: row => row.spec.location, sortable: true, align: tableColumnAlign.left},
  {name: 'Size', label: `${i18n.global.t('cattle.Size')}`, field: row => row.status?.size, sortable: true, align: tableColumnAlign.left},
  {name: 'CreationTime', label: `${i18n.global.t('cattle.CreationTime')}`, field: row => row.status?.creationTime, sortable: true, align: tableColumnAlign.left},
];
export const HelmChartListExcludes = [
  { path: 'status/jobName', include: true },
  { path: 'spec/chart', include: true },
  { path: 'spec/targetNamespace', include: true },
  { path: 'spec/version', include: true },
  { path: 'spec/repo', include: true },
  { path: 'spec/helmVersion', include: true },
  { path: 'spec/bootstrap', include: true },
];
export const HelmChartReadExcludes = [
];
export const HelmChartSimpleExcludes = [
];
export const HelmChartConfigListExcludes = [
];
export const HelmChartConfigReadExcludes = [
];
export const HelmChartConfigSimpleExcludes = [
];
export const AddonListExcludes = [
  { path: 'spec/source', include: true },
  { path: 'spec/checksum', include: true },
];
export const AddonReadExcludes = [
];
export const AddonSimpleExcludes = [
];
export const ETCDSnapshotFileListExcludes = [
  { path: 'spec/snapshotName', include: true },
  { path: 'spec/nodeName', include: true },
  { path: 'spec/location', include: true },
  { path: 'status/size', include: true },
  { path: 'status/creationTime', include: true },
];
export const ETCDSnapshotFileReadExcludes = [
];
export const ETCDSnapshotFileSimpleExcludes = [
];
