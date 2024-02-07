// noGramoGenerator
import { QTableColumn } from 'quasar'
import { tableColumnAlign } from '../core'
export const monitoringIcon = 'supervised_user_circle';
export const monitoringTitle = 'Monitoring';
export const iconAlertmanager = 'album';
export const colorAlertmanager = '';
export const descriptionAlertmanager = '';
export const shortAlertmanager = '';
export const iconPodMonitor = 'album';
export const colorPodMonitor = '';
export const descriptionPodMonitor = '';
export const shortPodMonitor = '';
export const iconProbe = 'album';
export const colorProbe = '';
export const descriptionProbe = '';
export const shortProbe = '';
export const iconPrometheus = 'album';
export const colorPrometheus = '';
export const descriptionPrometheus = '';
export const shortPrometheus = '';
export const iconPrometheusRule = 'album';
export const colorPrometheusRule = '';
export const descriptionPrometheusRule = '';
export const shortPrometheusRule = '';
export const iconServiceMonitor = 'album';
export const colorServiceMonitor = '';
export const descriptionServiceMonitor = '';
export const shortServiceMonitor = '';
export const iconThanosRuler = 'album';
export const colorThanosRuler = '';
export const descriptionThanosRuler = '';
export const shortThanosRuler = '';
export const iconAlertmanagerConfig = 'album';
export const colorAlertmanagerConfig = '';
export const descriptionAlertmanagerConfig = '';
export const shortAlertmanagerConfig = '';
export const iconPrometheusAgent = 'album';
export const colorPrometheusAgent = '';
export const descriptionPrometheusAgent = '';
export const shortPrometheusAgent = '';
export const extraAlertmanagerColumns:Array<QTableColumn> = [
  {name: 'Version', label: 'Version', field: row => row.spec.version, sortable: true, align: tableColumnAlign.left},
  {name: 'Replicas', label: 'Replicas', field: row => row.spec.replicas, sortable: true, align: tableColumnAlign.left},
  {name: 'Ready', label: 'Ready', field: row => row.status.availableReplicas, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: 'Age', field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
  {name: 'Paused', label: 'Paused', field: row => row.status.paused, sortable: true, align: tableColumnAlign.left},
];
export const extraPodMonitorColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraProbeColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraPrometheusColumns:Array<QTableColumn> = [
  {name: 'Version', label: 'Version', field: row => row.spec.version, sortable: true, align: tableColumnAlign.left},
  {name: 'Desired', label: 'Desired', field: row => row.spec.replicas, sortable: true, align: tableColumnAlign.left},
  {name: 'Ready', label: 'Ready', field: row => row.status.availableReplicas, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: 'Age', field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
  {name: 'Paused', label: 'Paused', field: row => row.status.paused, sortable: true, align: tableColumnAlign.left},
];
export const extraPrometheusRuleColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraServiceMonitorColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraThanosRulerColumns:Array<QTableColumn> = [
  {name: 'Version', label: 'Version', field: row => row.spec.version, sortable: true, align: tableColumnAlign.left},
  {name: 'Replicas', label: 'Replicas', field: row => row.spec.replicas, sortable: true, align: tableColumnAlign.left},
  {name: 'Ready', label: 'Ready', field: row => row.status.availableReplicas, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: 'Age', field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
  {name: 'Paused', label: 'Paused', field: row => row.status.paused, sortable: true, align: tableColumnAlign.left},
];
export const extraAlertmanagerConfigColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraPrometheusAgentColumns:Array<QTableColumn> = [
  {name: 'Version', label: 'Version', field: row => row.spec.version, sortable: true, align: tableColumnAlign.left},
  {name: 'Desired', label: 'Desired', field: row => row.spec.replicas, sortable: true, align: tableColumnAlign.left},
  {name: 'Ready', label: 'Ready', field: row => row.status.availableReplicas, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: 'Age', field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
  {name: 'Paused', label: 'Paused', field: row => row.status.paused, sortable: true, align: tableColumnAlign.left},
];
export const AlertmanagerListExcludes = [
  { path: 'spec/version', include: true },
  { path: 'spec/replicas', include: true },
  { path: 'status/availableReplicas', include: true },
  { path: 'metadata/creationTimestamp', include: true },
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
  { path: 'metadata/creationTimestamp', include: true },
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
  { path: 'metadata/creationTimestamp', include: true },
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
  { path: 'metadata/creationTimestamp', include: true },
  { path: 'status/paused', include: true },
];
export const PrometheusAgentReadExcludes = [
];
export const PrometheusAgentSimpleExcludes = [
];
