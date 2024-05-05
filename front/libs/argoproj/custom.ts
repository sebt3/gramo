// noGramoGenerator
import { QTableColumn } from 'quasar'
const { tableColumnAlign } = await import('../core/navigation.js')
const { i18n } = await import("../i18n")
const { automationColor, automationIcon,workflowColor, workflowIcon, } = await import('../../routes/custom');
export const argoprojIcon = 'apps';
export const argoprojTitle = 'Argo';
export const iconAppProject = automationIcon;
export const colorAppProject = automationColor;
export const descriptionAppProject = '';
export const shortAppProject = 'AppProject';
export const iconApplication = automationIcon;
export const colorApplication = automationColor;
export const descriptionApplication = '';
export const shortApplication = 'Application';
export const iconApplicationSet = automationIcon;
export const colorApplicationSet = automationColor;
export const descriptionApplicationSet = '';
export const shortApplicationSet = 'ApplicationSet';
export const iconClusterWorkflowTemplate = workflowIcon;
export const colorClusterWorkflowTemplate = workflowColor;
export const descriptionClusterWorkflowTemplate = '';
export const shortClusterWorkflowTemplate = 'ClusterWorkflowTemplate';
export const iconCronWorkflow = workflowIcon;
export const colorCronWorkflow = workflowColor;
export const descriptionCronWorkflow = '';
export const shortCronWorkflow = 'CronWorkflow';
export const iconEventBus = workflowIcon;
export const colorEventBus = workflowColor;
export const descriptionEventBus = '';
export const shortEventBus = 'EventBus';
export const iconEventSource = workflowIcon;
export const colorEventSource = workflowColor;
export const descriptionEventSource = '';
export const shortEventSource = 'EventSource';
export const iconSensor = workflowIcon;
export const colorSensor = workflowColor;
export const descriptionSensor = '';
export const shortSensor = 'Sensor';
export const iconWorkflow = workflowIcon;
export const colorWorkflow = workflowColor;
export const descriptionWorkflow = '';
export const shortWorkflow = 'Workflow';
export const iconWorkflowArtifactGCTask = workflowIcon;
export const colorWorkflowArtifactGCTask = workflowColor;
export const descriptionWorkflowArtifactGCTask = '';
export const shortWorkflowArtifactGCTask = 'WorkflowArtifactGCTask';
export const iconWorkflowEventBinding = workflowIcon;
export const colorWorkflowEventBinding = workflowColor;
export const descriptionWorkflowEventBinding = '';
export const shortWorkflowEventBinding = 'WorkflowEventBinding';
export const iconWorkflowTaskResult = workflowIcon;
export const colorWorkflowTaskResult = workflowColor;
export const descriptionWorkflowTaskResult = '';
export const shortWorkflowTaskResult = 'WorkflowTaskResult';
export const iconWorkflowTaskSet = workflowIcon;
export const colorWorkflowTaskSet = workflowColor;
export const descriptionWorkflowTaskSet = '';
export const shortWorkflowTaskSet = 'WorkflowTaskSet';
export const iconWorkflowTemplate = workflowIcon;
export const colorWorkflowTemplate = workflowColor;
export const descriptionWorkflowTemplate = '';
export const shortWorkflowTemplate = 'WorkflowTemplate';
export const extraAppProjectColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraApplicationColumns:Array<QTableColumn> = [
  {name: 'SyncStatus', label: `${i18n.global.t('argoproj.SyncStatus')}`, field: row => row.status?.sync.status, sortable: true, align: tableColumnAlign.left},
  {name: 'HealthStatus', label: `${i18n.global.t('argoproj.HealthStatus')}`, field: row => row.status?.health.status, sortable: true, align: tableColumnAlign.left},
  {name: 'Revision', label: `${i18n.global.t('argoproj.Revision')}`, field: row => row.status?.sync.revision, sortable: true, align: tableColumnAlign.left},
];
export const extraApplicationSetColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraClusterWorkflowTemplateColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraCronWorkflowColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraEventBusColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraEventSourceColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraSensorColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraWorkflowColumns:Array<QTableColumn> = [
  {name: 'Status', label: `${i18n.global.t('core.status')}`, field: row => row.status?.phase, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: `${i18n.global.t('meta.age')}`, field: row => row.status?.startedAt, sortable: true, align: tableColumnAlign.left},
  {name: 'Message', label: `${i18n.global.t('argoproj.Message')}`, field: row => row.status?.message, sortable: true, align: tableColumnAlign.left},
];
export const extraWorkflowArtifactGCTaskColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraWorkflowEventBindingColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraWorkflowTaskResultColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraWorkflowTaskSetColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraWorkflowTemplateColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const AppProjectListExcludes = [
];
export const AppProjectReadExcludes = [
];
export const AppProjectSimpleExcludes = [
];
export const ApplicationListExcludes = [
  { path: 'status/sync/status', include: true },
  { path: 'status/health/status', include: true },
  { path: 'status/sync/revision', include: true },
];
export const ApplicationReadExcludes = [
];
export const ApplicationSimpleExcludes = [
];
export const ApplicationSetListExcludes = [
];
export const ApplicationSetReadExcludes = [
];
export const ApplicationSetSimpleExcludes = [
];
export const ClusterWorkflowTemplateListExcludes = [
];
export const ClusterWorkflowTemplateReadExcludes = [
];
export const ClusterWorkflowTemplateSimpleExcludes = [
];
export const CronWorkflowListExcludes = [
];
export const CronWorkflowReadExcludes = [
];
export const CronWorkflowSimpleExcludes = [
];
export const EventBusListExcludes = [
];
export const EventBusReadExcludes = [
];
export const EventBusSimpleExcludes = [
];
export const EventSourceListExcludes = [
];
export const EventSourceReadExcludes = [
];
export const EventSourceSimpleExcludes = [
];
export const SensorListExcludes = [
];
export const SensorReadExcludes = [
];
export const SensorSimpleExcludes = [
];
export const WorkflowListExcludes = [
  { path: 'status/phase', include: true },
  { path: 'status/startedAt', include: true },
  { path: 'status/message', include: true },
];
export const WorkflowReadExcludes = [
];
export const WorkflowSimpleExcludes = [
];
export const WorkflowArtifactGCTaskListExcludes = [
];
export const WorkflowArtifactGCTaskReadExcludes = [
];
export const WorkflowArtifactGCTaskSimpleExcludes = [
];
export const WorkflowEventBindingListExcludes = [
];
export const WorkflowEventBindingReadExcludes = [
];
export const WorkflowEventBindingSimpleExcludes = [
];
export const WorkflowTaskResultListExcludes = [
];
export const WorkflowTaskResultReadExcludes = [
];
export const WorkflowTaskResultSimpleExcludes = [
];
export const WorkflowTaskSetListExcludes = [
];
export const WorkflowTaskSetReadExcludes = [
];
export const WorkflowTaskSetSimpleExcludes = [
];
export const WorkflowTemplateListExcludes = [
];
export const WorkflowTemplateReadExcludes = [
];
export const WorkflowTemplateSimpleExcludes = [
];
