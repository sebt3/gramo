// noGramoGenerator
import { QTableColumn } from 'quasar'
import { tableColumnAlign, timeAgo } from '../core'
import { i18n } from "../i18n"
export const iconAlertmanager = 'apps';
export const iconPrometheus = 'apps';
import { systemColor, configIcon, } from '../../routes/custom';
export const monitoringIcon = 'supervised_user_circle';
export const monitoringTitle = 'Monitoring';
export const colorAlertmanager = systemColor;
export const descriptionAlertmanager = '';
export const shortAlertmanager = 'Alertmanager';
export const iconPodMonitor = monitoringIcon;
export const colorPodMonitor = systemColor;
export const descriptionPodMonitor = '';
export const shortPodMonitor = 'PodMonitor';
export const iconProbe = monitoringIcon;
export const colorProbe = systemColor;
export const descriptionProbe = '';
export const shortProbe = 'Probe';
export const colorPrometheus = systemColor;
export const descriptionPrometheus = '';
export const shortPrometheus = 'Prometheus';
export const iconPrometheusRule = monitoringIcon;
export const colorPrometheusRule = systemColor;
export const descriptionPrometheusRule = '';
export const shortPrometheusRule = 'PrometheusRule';
export const iconServiceMonitor = monitoringIcon;
export const colorServiceMonitor = systemColor;
export const descriptionServiceMonitor = '';
export const shortServiceMonitor = 'ServiceMonitor';
export const iconThanosRuler = configIcon;
export const colorThanosRuler = systemColor;
export const descriptionThanosRuler = '';
export const shortThanosRuler = 'ThanosRuler';
export const iconAlertmanagerConfig = configIcon;
export const colorAlertmanagerConfig = systemColor;
export const descriptionAlertmanagerConfig = '';
export const shortAlertmanagerConfig = 'AlertmanagerConfig';
export const iconPrometheusAgent = iconPrometheus;
export const colorPrometheusAgent = systemColor;
export const descriptionPrometheusAgent = '';
export const shortPrometheusAgent = 'PrometheusAgent';
export const extraAlertmanagerColumns:Array<QTableColumn> = [
  {name: 'Version', label: `${i18n.global.t('monitoring.Version')}`, field: row => row.spec.version, sortable: true, align: tableColumnAlign.left},
  {name: 'Replicas', label: `${i18n.global.t('monitoring.Replicas')}`, field: row => row.spec.replicas, sortable: true, align: tableColumnAlign.left},
  {name: 'Ready', label: `${i18n.global.t('core.ready')}`, field: row => row.status.availableReplicas, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: `${i18n.global.t('meta.age')}`, field: row => timeAgo(row.metadata.creationTimestamp), sortable: true, align: tableColumnAlign.left},
  {name: 'Paused', label: `${i18n.global.t('monitoring.Paused')}`, field: row => row.status.paused, sortable: true, align: tableColumnAlign.left},
];
export const extraPodMonitorColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraProbeColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraPrometheusColumns:Array<QTableColumn> = [
  {name: 'Version', label: `${i18n.global.t('monitoring.Version')}`, field: row => row.spec.version, sortable: true, align: tableColumnAlign.left},
  {name: 'Desired', label: `${i18n.global.t('monitoring.Desired')}`, field: row => row.spec.replicas, sortable: true, align: tableColumnAlign.left},
  {name: 'Ready', label: `${i18n.global.t('core.ready')}`, field: row => row.status.availableReplicas, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: `${i18n.global.t('meta.age')}`, field: row => timeAgo(row.metadata.creationTimestamp), sortable: true, align: tableColumnAlign.left},
  {name: 'Paused', label: `${i18n.global.t('monitoring.Paused')}`, field: row => row.status.paused, sortable: true, align: tableColumnAlign.left},
];
export const extraPrometheusRuleColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraServiceMonitorColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraThanosRulerColumns:Array<QTableColumn> = [
  {name: 'Version', label: `${i18n.global.t('monitoring.Version')}`, field: row => row.spec.version, sortable: true, align: tableColumnAlign.left},
  {name: 'Replicas', label: `${i18n.global.t('monitoring.Replicas')}`, field: row => row.spec.replicas, sortable: true, align: tableColumnAlign.left},
  {name: 'Ready', label: `${i18n.global.t('core.ready')}`, field: row => row.status.availableReplicas, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: `${i18n.global.t('meta.age')}`, field: row => timeAgo(row.metadata.creationTimestamp), sortable: true, align: tableColumnAlign.left},
  {name: 'Paused', label: `${i18n.global.t('monitoring.Paused')}`, field: row => row.status.paused, sortable: true, align: tableColumnAlign.left},
];
export const extraAlertmanagerConfigColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraPrometheusAgentColumns:Array<QTableColumn> = [
  {name: 'Version', label: `${i18n.global.t('monitoring.Version')}`, field: row => row.spec.version, sortable: true, align: tableColumnAlign.left},
  {name: 'Desired', label: `${i18n.global.t('monitoring.Desired')}`, field: row => row.spec.replicas, sortable: true, align: tableColumnAlign.left},
  {name: 'Ready', label: `${i18n.global.t('core.ready')}`, field: row => row.status.availableReplicas, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: `${i18n.global.t('meta.age')}`, field: row => timeAgo(row.metadata.creationTimestamp), sortable: true, align: tableColumnAlign.left},
  {name: 'Paused', label: `${i18n.global.t('monitoring.Paused')}`, field: row => row.status.paused, sortable: true, align: tableColumnAlign.left},
];
export const AlertmanagerListExcludes = [
  { path: 'spec/version', include: true },
  { path: 'spec/replicas', include: true },
  { path: 'status/availableReplicas', include: true },
  { path: 'status/paused', include: true },
];
export const AlertmanagerReadExcludes = [
];
export const AlertmanagerSimpleExcludes = [
];
export const PodMonitorListExcludes = [
];
export const PodMonitorReadExcludes = [
];
export const PodMonitorSimpleExcludes = [
];
export const ProbeListExcludes = [
];
export const ProbeReadExcludes = [
];
export const ProbeSimpleExcludes = [
];
export const PrometheusListExcludes = [
  { path: 'spec/version', include: true },
  { path: 'spec/replicas', include: true },
  { path: 'status/availableReplicas', include: true },
  { path: 'status/paused', include: true },
];
export const PrometheusReadExcludes = [
];
export const PrometheusSimpleExcludes = [
];
export const PrometheusRuleListExcludes = [
];
export const PrometheusRuleReadExcludes = [
];
export const PrometheusRuleSimpleExcludes = [
];
export const ServiceMonitorListExcludes = [
];
export const ServiceMonitorReadExcludes = [
];
export const ServiceMonitorSimpleExcludes = [
];
export const ThanosRulerListExcludes = [
  { path: 'spec/version', include: true },
  { path: 'spec/replicas', include: true },
  { path: 'status/availableReplicas', include: true },
  { path: 'status/paused', include: true },
];
export const ThanosRulerReadExcludes = [
];
export const ThanosRulerSimpleExcludes = [
];
export const AlertmanagerConfigListExcludes = [
];
export const AlertmanagerConfigReadExcludes = [
];
export const AlertmanagerConfigSimpleExcludes = [
];
export const PrometheusAgentListExcludes = [
  { path: 'spec/version', include: true },
  { path: 'spec/replicas', include: true },
  { path: 'status/availableReplicas', include: true },
  { path: 'status/paused', include: true },
];
export const PrometheusAgentReadExcludes = [
];
export const PrometheusAgentSimpleExcludes = [
];
