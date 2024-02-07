// noGramoGenerator
import { QTableColumn } from 'quasar'
import { tableColumnAlign } from '../core'
export const opentelemetryIcon = 'apps';
export const opentelemetryTitle = 'Telemetry';
export const iconInstrumentation = 'album';
export const colorInstrumentation = '';
export const descriptionInstrumentation = '';
export const shortInstrumentation = '';
export const iconOpAMPBridge = 'album';
export const colorOpAMPBridge = '';
export const descriptionOpAMPBridge = '';
export const shortOpAMPBridge = '';
export const iconOpenTelemetryCollector = 'album';
export const colorOpenTelemetryCollector = '';
export const descriptionOpenTelemetryCollector = '';
export const shortOpenTelemetryCollector = '';
export const extraInstrumentationColumns:Array<QTableColumn> = [
  {name: 'Age', label: 'Age', field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
  {name: 'Endpoint', label: 'Endpoint', field: row => row.spec.exporter.endpoint, sortable: true, align: tableColumnAlign.left},
  {name: 'Sampler', label: 'Sampler', field: row => row.spec.sampler.type, sortable: true, align: tableColumnAlign.left},
  {name: 'Sampler Arg', label: 'Sampler Arg', field: row => row.spec.sampler.argument, sortable: true, align: tableColumnAlign.left},
];
export const extraOpAMPBridgeColumns:Array<QTableColumn> = [
  {name: 'Age', label: 'Age', field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
  {name: 'Version', label: 'Version', field: row => row.status.version, sortable: true, align: tableColumnAlign.left},
  {name: 'Endpoint', label: 'Endpoint', field: row => row.spec.endpoint, sortable: true, align: tableColumnAlign.left},
];
export const extraOpenTelemetryCollectorColumns:Array<QTableColumn> = [
  {name: 'Mode', label: 'Mode', field: row => row.spec.mode, sortable: true, align: tableColumnAlign.left},
  {name: 'Version', label: 'Version', field: row => row.status.version, sortable: true, align: tableColumnAlign.left},
  {name: 'Ready', label: 'Ready', field: row => row.status.scale.statusReplicas, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: 'Age', field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
  {name: 'Image', label: 'Image', field: row => row.status.image, sortable: true, align: tableColumnAlign.left},
  {name: 'Management', label: 'Management', field: row => row.spec.managementState, sortable: true, align: tableColumnAlign.left},
];
export const InstrumentationListExcludes = [
  { path: 'metadata/creationTimestamp', include: true },
  { path: 'spec/exporter/endpoint', include: true },
  { path: 'spec/sampler/type', include: true },
  { path: 'spec/sampler/argument', include: true },
];
export const InstrumentationReadExcludes = [
];
export const InstrumentationSimpleExcludes = [
];
export const OpAMPBridgeListExcludes = [
  { path: 'metadata/creationTimestamp', include: true },
  { path: 'status/version', include: true },
  { path: 'spec/endpoint', include: true },
];
export const OpAMPBridgeReadExcludes = [
];
export const OpAMPBridgeSimpleExcludes = [
];
export const OpenTelemetryCollectorListExcludes = [
  { path: 'spec/mode', include: true },
  { path: 'status/version', include: true },
  { path: 'status/scale/statusReplicas', include: true },
  { path: 'metadata/creationTimestamp', include: true },
  { path: 'status/image', include: true },
  { path: 'spec/managementState', include: true },
];
export const OpenTelemetryCollectorReadExcludes = [
];
export const OpenTelemetryCollectorSimpleExcludes = [
];
