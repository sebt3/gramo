// noGramoGenerator
import { QTableColumn } from 'quasar'
const { tableColumnAlign } = await import('../core/navigation.js')
const { duration, dateFormat } = await import('../core')
const { i18n } = await import("../i18n")
const { workflowColor, workflowIcon, } = await import('../../routes/custom');
export const tektonIcon = 'apps';
export const tektonTitle = 'tekton';
export const iconPipeline = workflowIcon;
export const colorPipeline = workflowColor;
export const descriptionPipeline = '';
export const shortPipeline = 'Pipeline';
export const iconPipelineRun = workflowIcon;
export const colorPipelineRun = workflowColor;
export const descriptionPipelineRun = '';
export const shortPipelineRun = 'PipelineRun';
export const iconTask = workflowIcon;
export const colorTask = workflowColor;
export const descriptionTask = '';
export const shortTask = 'Task';
export const iconTaskRun = workflowIcon;
export const colorTaskRun = workflowColor;
export const descriptionTaskRun = '';
export const shortTaskRun = 'TaskRun';
export const iconStepAction = workflowIcon;
export const colorStepAction = workflowColor;
export const descriptionStepAction = '';
export const shortStepAction = 'StepAction';
export const iconVerificationPolicy = workflowIcon;
export const colorVerificationPolicy = workflowColor;
export const descriptionVerificationPolicy = '';
export const shortVerificationPolicy = 'VerificationPolicy';
export const iconClusterTask = workflowIcon;
export const colorClusterTask = workflowColor;
export const descriptionClusterTask = '';
export const shortClusterTask = 'ClusterTask';
export const iconCustomRun = workflowIcon;
export const colorCustomRun = workflowColor;
export const descriptionCustomRun = '';
export const shortCustomRun = 'CustomRun';
export const iconResolutionRequest = workflowIcon;
export const colorResolutionRequest = workflowColor;
export const descriptionResolutionRequest = '';
export const shortResolutionRequest = 'ResolutionRequest';
export const iconClusterInterceptor = workflowIcon;
export const colorClusterInterceptor = workflowColor;
export const descriptionClusterInterceptor = '';
export const shortClusterInterceptor = 'ClusterInterceptor';
export const iconInterceptor = workflowIcon;
export const colorInterceptor = workflowColor;
export const descriptionInterceptor = '';
export const shortInterceptor = 'Interceptor';
export const iconClusterTriggerBinding = workflowIcon;
export const colorClusterTriggerBinding = workflowColor;
export const descriptionClusterTriggerBinding = '';
export const shortClusterTriggerBinding = 'ClusterTriggerBinding';
export const iconEventListener = workflowIcon;
export const colorEventListener = workflowColor;
export const descriptionEventListener = '';
export const shortEventListener = 'EventListener';
export const iconTrigger = workflowIcon;
export const colorTrigger = workflowColor;
export const descriptionTrigger = '';
export const shortTrigger = 'Trigger';
export const iconTriggerBinding = workflowIcon;
export const colorTriggerBinding = workflowColor;
export const descriptionTriggerBinding = '';
export const shortTriggerBinding = 'TriggerBinding';
export const iconTriggerTemplate = workflowIcon;
export const colorTriggerTemplate = workflowColor;
export const descriptionTriggerTemplate = '';
export const shortTriggerTemplate = 'TriggerTemplate';
export const extraPipelineColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraPipelineRunColumns:Array<QTableColumn> = [
  {name: 'StartTime', label: `${i18n.global.t('tekton.StartTime')}`, field: row => dateFormat(row.status?.startTime), sortable: true, align: tableColumnAlign.left},
  {name: 'Duration', label: `${i18n.global.t('tekton.Duration')}`, field: row => duration(row.status?.startTime, row.status?.completionTime), sortable: true, align: tableColumnAlign.left},
];
export const extraTaskColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraTaskRunColumns:Array<QTableColumn> = [
  {name: 'StartTime', label: `${i18n.global.t('tekton.StartTime')}`, field: row => dateFormat(row.status?.startTime), sortable: true, align: tableColumnAlign.left},
  {name: 'Duration', label: `${i18n.global.t('tekton.Duration')}`, field: row => duration(row.status?.startTime, row.status?.completionTime), sortable: true, align: tableColumnAlign.left},
];
export const extraStepActionColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraVerificationPolicyColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraClusterTaskColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraCustomRunColumns:Array<QTableColumn> = [
  {name: 'StartTime', label: `${i18n.global.t('tekton.StartTime')}`, field: row => dateFormat(row.status?.startTime), sortable: true, align: tableColumnAlign.left},
  {name: 'Duration', label: `${i18n.global.t('tekton.Duration')}`, field: row => duration(row.status?.startTime, row.status?.completionTime), sortable: true, align: tableColumnAlign.left},
];
export const extraResolutionRequestColumns:Array<QTableColumn> = [
  {name: 'StartTime', label: `${i18n.global.t('tekton.StartTime')}`, field: row => dateFormat(row.metadata.creationTimestamp), sortable: true, align: tableColumnAlign.left},
];
export const extraClusterInterceptorColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraInterceptorColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraClusterTriggerBindingColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraEventListenerColumns:Array<QTableColumn> = [
  {name: 'Address', label: `${i18n.global.t('tekton.Address')}`, field: row => row.status?.address.url, sortable: true, align: tableColumnAlign.left},
];
export const extraTriggerColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraTriggerBindingColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraTriggerTemplateColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const PipelineListExcludes = [
];
export const PipelineReadExcludes = [
];
export const PipelineSimpleExcludes = [
];
export const PipelineRunListExcludes = [
];
export const PipelineRunReadExcludes = [
];
export const PipelineRunSimpleExcludes = [
];
export const TaskListExcludes = [
];
export const TaskReadExcludes = [
];
export const TaskSimpleExcludes = [
];
export const TaskRunListExcludes = [
];
export const TaskRunReadExcludes = [
];
export const TaskRunSimpleExcludes = [
];
export const StepActionListExcludes = [
];
export const StepActionReadExcludes = [
];
export const StepActionSimpleExcludes = [
];
export const VerificationPolicyListExcludes = [
];
export const VerificationPolicyReadExcludes = [
];
export const VerificationPolicySimpleExcludes = [
];
export const ClusterTaskListExcludes = [
];
export const ClusterTaskReadExcludes = [
];
export const ClusterTaskSimpleExcludes = [
];
export const CustomRunListExcludes = [
];
export const CustomRunReadExcludes = [
];
export const CustomRunSimpleExcludes = [
];
export const ResolutionRequestListExcludes = [
];
export const ResolutionRequestReadExcludes = [
];
export const ResolutionRequestSimpleExcludes = [
];
export const ClusterInterceptorListExcludes = [
];
export const ClusterInterceptorReadExcludes = [
];
export const ClusterInterceptorSimpleExcludes = [
];
export const InterceptorListExcludes = [
];
export const InterceptorReadExcludes = [
];
export const InterceptorSimpleExcludes = [
];
export const ClusterTriggerBindingListExcludes = [
];
export const ClusterTriggerBindingReadExcludes = [
];
export const ClusterTriggerBindingSimpleExcludes = [
];
export const EventListenerListExcludes = [
];
export const EventListenerReadExcludes = [
];
export const EventListenerSimpleExcludes = [
];
export const TriggerListExcludes = [
];
export const TriggerReadExcludes = [
];
export const TriggerSimpleExcludes = [
];
export const TriggerBindingListExcludes = [
];
export const TriggerBindingReadExcludes = [
];
export const TriggerBindingSimpleExcludes = [
];
export const TriggerTemplateListExcludes = [
];
export const TriggerTemplateReadExcludes = [
];
export const TriggerTemplateSimpleExcludes = [
];
