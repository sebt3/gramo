// noGramoGenerator
import { QTableColumn } from 'quasar'
const { tableColumnAlign } = await import('../core/navigation.js')
const {  timeAgo } = await import('../core')
const { i18n } = await import("../i18n")
const { systemColor, systemIcon, installIcon, configIcon} = await import('../../routes/custom');
export const opentelemetryIcon = 'apps';
export const opentelemetryTitle = 'Telemetry';
export const iconInstrumentation = configIcon;
export const colorInstrumentation = systemColor;
export const descriptionInstrumentation = '';
export const shortInstrumentation = 'Instrumentation';
export const iconOpAMPBridge = systemIcon;
export const colorOpAMPBridge = systemColor;
export const descriptionOpAMPBridge = '';
export const shortOpAMPBridge = 'OpAMPBridge';
export const iconOpenTelemetryCollector = installIcon;
export const colorOpenTelemetryCollector = systemColor;
export const descriptionOpenTelemetryCollector = '';
export const shortOpenTelemetryCollector = 'OpenTelemetryCollector';
export const extraInstrumentationColumns:Array<QTableColumn> = [
  {name: 'Age', label: `${i18n.global.t('meta.age')}`, field: row => timeAgo(row.metadata.creationTimestamp), sortable: true, align: tableColumnAlign.left},
  {name: 'Endpoint', label: `${i18n.global.t('opentelemetry.Mode')}`, field: row => row.spec.exporter.endpoint, sortable: true, align: tableColumnAlign.left},
  {name: 'Sampler', label: `${i18n.global.t('opentelemetry.Sampler')}`, field: row => row.spec.sampler.type, sortable: true, align: tableColumnAlign.left},
  {name: 'SamplerArg', label: `${i18n.global.t('opentelemetry.SamplerArg')}`, field: row => row.spec.sampler.argument, sortable: true, align: tableColumnAlign.left},
];
export const extraOpAMPBridgeColumns:Array<QTableColumn> = [
  {name: 'Age', label: `${i18n.global.t('meta.age')}`, field: row => timeAgo(row.metadata.creationTimestamp), sortable: true, align: tableColumnAlign.left},
  {name: 'Version', label: `${i18n.global.t('opentelemetry.Version')}`, field: row => row.status?.version, sortable: true, align: tableColumnAlign.left},
  {name: 'Mode', label: `${i18n.global.t('opentelemetry.Mode')}`, field: row => row.spec.endpoint, sortable: true, align: tableColumnAlign.left},
];
export const extraOpenTelemetryCollectorColumns:Array<QTableColumn> = [
  {name: 'Mode', label: `${i18n.global.t('opentelemetry.Mode')}`, field: row => row.spec.mode, sortable: true, align: tableColumnAlign.left},
  {name: 'Version', label: `${i18n.global.t('opentelemetry.Version')}`, field: row => row.status?.version, sortable: true, align: tableColumnAlign.left},
  {name: 'Ready', label: `${i18n.global.t('core.ready')}`, field: row => row.status?.scale.statusReplicas, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: `${i18n.global.t('meta.age')}`, field: row => timeAgo(row.metadata.creationTimestamp), sortable: true, align: tableColumnAlign.left},
  {name: 'Image', label: `${i18n.global.t('opentelemetry.Image')}`, field: row => row.status?.image, sortable: true, align: tableColumnAlign.left},
  {name: 'Management', label: `${i18n.global.t('opentelemetry.Management')}`, field: row => row.spec.managementState, sortable: true, align: tableColumnAlign.left},
];
export const InstrumentationListExcludes = [
  { path: 'spec/exporter/endpoint', include: true },
  { path: 'spec/sampler/type', include: true },
  { path: 'spec/sampler/argument', include: true },
];
export const InstrumentationReadExcludes = [
];
export const InstrumentationSimpleExcludes = [
];
export const OpAMPBridgeListExcludes = [
  { path: 'spec/endpoint', include: true },
  { path: 'status/version', include: true },
];
export const OpAMPBridgeReadExcludes = [
];
export const OpAMPBridgeSimpleExcludes = [
];
export const OpenTelemetryCollectorListExcludes = [
  { path: 'spec/mode', include: true },
  { path: 'spec/managementState', include: true },
  { path: 'status/version', include: true },
  { path: 'status/scale/statusReplicas', include: true },
  { path: 'status/image', include: true },
];
export const OpenTelemetryCollectorReadExcludes = [
];
export const OpenTelemetryCollectorSimpleExcludes = [
];
