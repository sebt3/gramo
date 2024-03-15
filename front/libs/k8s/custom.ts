// noGramoGenerator
import { QTableColumn } from 'quasar'
import { tableColumnAlign, timeAgo } from '../core'
import { i18n } from "../i18n"
import { configColor, configIcon,securityColor, securityIcon,networkColor, networkIcon,workloadColor, workloadIcon,systemColor, systemIcon,storageColor, storageIcon,workflowColor, workflowIcon, } from '../../routes/custom';
export const k8sIcon = 'fas fa-dharmachakra';
export const k8sTitle = 'Standard';
export const iconConfigMap = configIcon;
export const colorConfigMap = configColor;
export const descriptionConfigMap = '';
export const shortConfigMap = 'ConfigMap';
export const iconSecret = configIcon;
export const colorSecret = configColor;
export const descriptionSecret = '';
export const shortSecret = 'Secret';
export const iconServiceAccount = securityIcon;
export const colorServiceAccount = securityColor;
export const descriptionServiceAccount = '';
export const shortServiceAccount = 'ServiceAccount';
export const iconEndpoints = networkIcon;
export const colorEndpoints = networkColor;
export const descriptionEndpoints = '';
export const shortEndpoints = 'Endpoints';
export const iconLimitRange = workloadIcon;
export const colorLimitRange = workloadColor;
export const descriptionLimitRange = '';
export const shortLimitRange = 'LimitRange';
export const iconNamespace = 'dashboard';
export const colorNamespace = systemColor;
export const descriptionNamespace = '';
export const shortNamespace = 'Namespace';
export const iconNode = systemIcon;
export const colorNode = systemColor;
export const descriptionNode = '';
export const shortNode = 'Node';
export const iconPersistentVolume = storageIcon;
export const colorPersistentVolume = storageColor;
export const descriptionPersistentVolume = '';
export const shortPersistentVolume = 'PersistentVolume';
export const iconPersistentVolumeClaim = storageIcon;
export const colorPersistentVolumeClaim = storageColor;
export const descriptionPersistentVolumeClaim = '';
export const shortPersistentVolumeClaim = 'PersistentVolumeClaim';
export const iconResourceQuota = workloadIcon;
export const colorResourceQuota = workloadColor;
export const descriptionResourceQuota = '';
export const shortResourceQuota = 'ResourceQuota';
export const iconService = networkIcon;
export const colorService = networkColor;
export const descriptionService = '';
export const shortService = 'Service';
export const iconPod = workloadIcon;
export const colorPod = workloadColor;
export const descriptionPod = '';
export const shortPod = 'Pod';
export const iconPodTemplate = workloadIcon;
export const colorPodTemplate = workloadColor;
export const descriptionPodTemplate = '';
export const shortPodTemplate = 'PodTemplate';
export const iconReplicationController = workloadIcon;
export const colorReplicationController = workloadColor;
export const descriptionReplicationController = '';
export const shortReplicationController = 'ReplicationController';
export const iconAPIService = systemIcon;
export const colorAPIService = systemColor;
export const descriptionAPIService = '';
export const shortAPIService = 'APIService';
export const iconControllerRevision = workloadIcon;
export const colorControllerRevision = workloadColor;
export const descriptionControllerRevision = '';
export const shortControllerRevision = 'ControllerRevision';
export const iconDaemonSet = workloadIcon;
export const colorDaemonSet = workloadColor;
export const descriptionDaemonSet = '';
export const shortDaemonSet = 'DaemonSet';
export const iconDeployment = workloadIcon;
export const colorDeployment = workloadColor;
export const descriptionDeployment = '';
export const shortDeployment = 'Deployment';
export const iconReplicaSet = workloadIcon;
export const colorReplicaSet = workloadColor;
export const descriptionReplicaSet = '';
export const shortReplicaSet = 'ReplicaSet';
export const iconStatefulSet = workloadIcon;
export const colorStatefulSet = workloadColor;
export const descriptionStatefulSet = '';
export const shortStatefulSet = 'StatefulSet';
export const iconHorizontalPodAutoscaler = workloadIcon;
export const colorHorizontalPodAutoscaler = workloadColor;
export const descriptionHorizontalPodAutoscaler = '';
export const shortHorizontalPodAutoscaler = 'HorizontalPodAutoscaler';
export const iconJob = workflowIcon;
export const colorJob = workflowColor;
export const descriptionJob = '';
export const shortJob = 'Job';
export const iconCronJob = workflowIcon;
export const colorCronJob = workflowColor;
export const descriptionCronJob = '';
export const shortCronJob = 'CronJob';
export const iconCertificateSigningRequest = securityIcon;
export const colorCertificateSigningRequest = securityColor;
export const descriptionCertificateSigningRequest = '';
export const shortCertificateSigningRequest = 'CertificateSigningRequest';
export const iconIngress = networkIcon;
export const colorIngress = networkColor;
export const descriptionIngress = '';
export const shortIngress = 'Ingress';
export const iconNetworkPolicy = securityIcon;
export const colorNetworkPolicy = securityColor;
export const descriptionNetworkPolicy = '';
export const shortNetworkPolicy = 'NetworkPolicy';
export const iconPodDisruptionBudget = workloadIcon;
export const colorPodDisruptionBudget = workloadColor;
export const descriptionPodDisruptionBudget = '';
export const shortPodDisruptionBudget = 'PodDisruptionBudget';
export const iconRole = securityIcon;
export const colorRole = securityColor;
export const descriptionRole = '';
export const shortRole = 'Role';
export const iconClusterRoleBinding = securityIcon;
export const colorClusterRoleBinding = securityColor;
export const descriptionClusterRoleBinding = '';
export const shortClusterRoleBinding = 'ClusterRoleBinding';
export const iconRoleBinding = securityIcon;
export const colorRoleBinding = securityColor;
export const descriptionRoleBinding = '';
export const shortRoleBinding = 'RoleBinding';
export const iconClusterRole = securityIcon;
export const colorClusterRole = securityColor;
export const descriptionClusterRole = '';
export const shortClusterRole = 'ClusterRole';
export const iconStorageClass = storageIcon;
export const colorStorageClass = storageColor;
export const descriptionStorageClass = '';
export const shortStorageClass = 'StorageClass';
export const iconCSIDriver = storageIcon;
export const colorCSIDriver = storageColor;
export const descriptionCSIDriver = '';
export const shortCSIDriver = 'CSIDriver';
export const iconCSINode = storageIcon;
export const colorCSINode = storageColor;
export const descriptionCSINode = '';
export const shortCSINode = 'CSINode';
export const iconCSIStorageCapacity = storageIcon;
export const colorCSIStorageCapacity = storageColor;
export const descriptionCSIStorageCapacity = '';
export const shortCSIStorageCapacity = 'CSIStorageCapacity';
export const iconVolumeAttachment = storageIcon;
export const colorVolumeAttachment = storageColor;
export const descriptionVolumeAttachment = '';
export const shortVolumeAttachment = 'VolumeAttachment';
export const iconMutatingWebhookConfiguration = systemIcon;
export const colorMutatingWebhookConfiguration = systemColor;
export const descriptionMutatingWebhookConfiguration = '';
export const shortMutatingWebhookConfiguration = 'MutatingWebhookConfiguration';
export const iconValidatingWebhookConfiguration = systemIcon;
export const colorValidatingWebhookConfiguration = systemColor;
export const descriptionValidatingWebhookConfiguration = '';
export const shortValidatingWebhookConfiguration = 'ValidatingWebhookConfiguration';
export const iconCustomResourceDefinition = 'photo_filter';
export const colorCustomResourceDefinition = systemColor;
export const descriptionCustomResourceDefinition = '';
export const shortCustomResourceDefinition = 'CustomResourceDefinition';
export const iconPriorityClass = workloadIcon;
export const colorPriorityClass = workloadColor;
export const descriptionPriorityClass = '';
export const shortPriorityClass = 'PriorityClass';
export const iconLease = systemIcon;
export const colorLease = systemColor;
export const descriptionLease = '';
export const shortLease = 'Lease';
export const iconRuntimeClass = workloadIcon;
export const colorRuntimeClass = workloadColor;
export const descriptionRuntimeClass = '';
export const shortRuntimeClass = 'RuntimeClass';
export const iconEndpointSlice = networkIcon;
export const colorEndpointSlice = networkColor;
export const descriptionEndpointSlice = '';
export const shortEndpointSlice = 'EndpointSlice';
export const iconVolumeSnapshot = systemIcon;
export const colorVolumeSnapshot = systemColor;
export const descriptionVolumeSnapshot = '';
export const shortVolumeSnapshot = 'VolumeSnapshot';
export const iconVolumeSnapshotClass = systemIcon;
export const colorVolumeSnapshotClass = systemColor;
export const descriptionVolumeSnapshotClass = '';
export const shortVolumeSnapshotClass = 'VolumeSnapshotClass';
export const iconVolumeSnapshotContent = systemIcon;
export const colorVolumeSnapshotContent = systemColor;
export const descriptionVolumeSnapshotContent = '';
export const shortVolumeSnapshotContent = 'VolumeSnapshotContent';
export const extraConfigMapColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraEndpointsColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraLimitRangeColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraNamespaceColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraNodeColumns:Array<QTableColumn> = [
  {name: 'CPUs', label: `${i18n.global.t('k8s.CPUs')}`, field: row => row.status.capacity.cpu, sortable: true, align: tableColumnAlign.left},
  {name: 'RAM', label: `${i18n.global.t('k8s.RAM')}`, field: row => row.status.capacity.memory, sortable: true, align: tableColumnAlign.left},
  {name: 'Version', label: `${i18n.global.t('core.version')}`, field: row => row.status.nodeInfo.kubeletVersion, sortable: true, align: tableColumnAlign.left},
  {name: 'Region', label: `${i18n.global.t('k8s.Region')}`, field: row => row.metadata.labels['topology.kubernetes.io/region'], sortable: true, align: tableColumnAlign.left},
  {name: 'Zone', label: `${i18n.global.t('k8s.Zone')}`, field: row => row.metadata.labels['topology.kubernetes.io/zone'], sortable: true, align: tableColumnAlign.left},
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraPersistentVolumeColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraPersistentVolumeClaimColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraPodColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraPodTemplateColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraReplicationControllerColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraResourceQuotaColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraSecretColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraServiceColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraServiceAccountColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraAPIServiceColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraControllerRevisionColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraDaemonSetColumns:Array<QTableColumn> = [
  {name: 'Replicas', label: `${i18n.global.t('k8s.Replicas')}`, field: row => row.status.numberReady, sortable: true, align: tableColumnAlign.left},
];
export const extraDeploymentColumns:Array<QTableColumn> = [
  {name: 'Replicas', label: `${i18n.global.t('k8s.Replicas')}`, field: row => row.spec.replicas, sortable: true, align: tableColumnAlign.left},
];
export const extraReplicaSetColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraStatefulSetColumns:Array<QTableColumn> = [
  {name: 'Replicas', label: `${i18n.global.t('k8s.Replicas')}`, field: row => row.spec.replicas, sortable: true, align: tableColumnAlign.left},
];
export const extraHorizontalPodAutoscalerColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraJobColumns:Array<QTableColumn> = [
  {name: 'Completion', label: `${i18n.global.t('k8s.Completion')}`, field: row => timeAgo(row.status.completionTime), sortable: true, align: tableColumnAlign.left},
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraCronJobColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraCertificateSigningRequestColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraIngressColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraNetworkPolicyColumns:Array<QTableColumn> = [
  {name: 'Types', label: `${i18n.global.t('k8s.Types')}`, field: row => row.spec.policyTypes.join(', '), sortable: true, align: tableColumnAlign.left},
];
export const extraPodDisruptionBudgetColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraRoleColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraClusterRoleBindingColumns:Array<QTableColumn> = [
  {name: 'Role', label: `${i18n.global.t('k8s.Role')}`, field: row => row.roleRef.name, sortable: true, align: tableColumnAlign.left},
  {name: 'Groups', label: `${i18n.global.t('k8s.Groups')}`, field: row => Array.isArray(row.subjects)?row.subjects.filter(s=>s.kind == 'Group').map(s=>s.name).join(', '):'', sortable: true, align: tableColumnAlign.left},
  {name: 'ServiceAccount', label: `${i18n.global.t('k8s.ServiceAccount')}`, field: row => Array.isArray(row.subjects)?row.subjects.filter(s=>s.kind == 'ServiceAccount').map(s=>s.namespace+' '+s.name).join(', '):'', sortable: true, align: tableColumnAlign.left},
];
export const extraRoleBindingColumns:Array<QTableColumn> = [
  {name: 'Role', label: `${i18n.global.t('k8s.Role')}`, field: row => row.roleRef.name, sortable: true, align: tableColumnAlign.left},
  {name: 'Groups', label: `${i18n.global.t('k8s.Groups')}`, field: row => Array.isArray(row.subjects)?row.subjects.filter(s=>s.kind == 'Group').map(s=>s.name).join(', '):'', sortable: true, align: tableColumnAlign.left},
  {name: 'ServiceAccount', label: `${i18n.global.t('k8s.ServiceAccount')}`, field: row => Array.isArray(row.subjects)?row.subjects.filter(s=>s.kind == 'ServiceAccount').map(s=>s.namespace+' '+s.name).join(', '):'', sortable: true, align: tableColumnAlign.left},
];
export const extraClusterRoleColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraStorageClassColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraCSIDriverColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraCSINodeColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraCSIStorageCapacityColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraVolumeAttachmentColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraMutatingWebhookConfigurationColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraValidatingWebhookConfigurationColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraCustomResourceDefinitionColumns:Array<QTableColumn> = [
  {name: 'Scope', label: `${i18n.global.t('k8s.Scope')}`, field: row => row.spec.scope, sortable: true, align: tableColumnAlign.left},
  {name: 'Group', label: `${i18n.global.t('k8s.Group')}`, field: row => row.spec.group, sortable: true, align: tableColumnAlign.left},
  {name: 'Kind', label:  `${i18n.global.t('k8s.Kind')}`, field: row => row.spec.names.kind, sortable: true, align: tableColumnAlign.left},
];
export const extraPriorityClassColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraLeaseColumns:Array<QTableColumn> = [
  {name: 'Holder', label: `${i18n.global.t('k8s.Holder')}`, field: row => row.spec.holderIdentity, sortable: true, align: tableColumnAlign.left},
  {name: 'Duration', label: `${i18n.global.t('k8s.Duration')}`, field: row => row.spec.leaseDurationSeconds, sortable: true, align: tableColumnAlign.left},
];
export const extraRuntimeClassColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraEndpointSliceColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraVolumeSnapshotColumns:Array<QTableColumn> = [
  {name: 'ReadyToUse', label: `${i18n.global.t('k8s.ReadyToUse')}`, field: row => row.status.readyToUse, sortable: true, align: tableColumnAlign.left},
  {name: 'SourcePVC', label: `${i18n.global.t('k8s.SourcePVC')}`, field: row => row.spec.source.persistentVolumeClaimName, sortable: true, align: tableColumnAlign.left},
  {name: 'SourceSnapshotContent', label: `${i18n.global.t('k8s.SourceSnapshotContent')}`, field: row => row.spec.source.volumeSnapshotContentName, sortable: true, align: tableColumnAlign.left},
  {name: 'RestoreSize', label: `${i18n.global.t('k8s.RestoreSize')}`, field: row => row.status.restoreSize, sortable: true, align: tableColumnAlign.left},
  {name: 'SnapshotClass', label: `${i18n.global.t('k8s.SnapshotClass')}`, field: row => row.spec.volumeSnapshotClassName, sortable: true, align: tableColumnAlign.left},
  {name: 'SnapshotContent', label: `${i18n.global.t('k8s.SnapshotContent')}`, field: row => row.status.boundVolumeSnapshotContentName, sortable: true, align: tableColumnAlign.left},
  {name: 'CreationTime', label: `${i18n.global.t('k8s.CreationTime')}`, field: row => row.status.creationTime, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: `${i18n.global.t('meta.age')}`, field: row => timeAgo(row.metadata.creationTimestamp), sortable: true, align: tableColumnAlign.left},
];
export const extraVolumeSnapshotClassColumns:Array<QTableColumn> = [
  {name: 'Driver', label: `${i18n.global.t('k8s.Driver')}`, field: row => row.driver, sortable: true, align: tableColumnAlign.left},
  {name: 'DeletionPolicy', label: 'DeletionPolicy', field: row => row.deletionPolicy, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: `${i18n.global.t('meta.age')}`, field: row => timeAgo(row.metadata.creationTimestamp), sortable: true, align: tableColumnAlign.left},
];
export const extraVolumeSnapshotContentColumns:Array<QTableColumn> = [
  {name: 'ReadyToUse', label: `${i18n.global.t('k8s.ReadyToUse')}`, field: row => row.status.readyToUse, sortable: true, align: tableColumnAlign.left},
  {name: 'RestoreSize', label: `${i18n.global.t('k8s.RestoreSize')}`, field: row => row.status.restoreSize, sortable: true, align: tableColumnAlign.left},
  {name: 'DeletionPolicy', label: `${i18n.global.t('k8s.DeletionPolicy')}`, field: row => row.spec.deletionPolicy, sortable: true, align: tableColumnAlign.left},
  {name: 'Driver', label: `${i18n.global.t('k8s.Driver')}`, field: row => row.spec.driver, sortable: true, align: tableColumnAlign.left},
  {name: 'VolumeSnapshotClass', label: `${i18n.global.t('k8s.VolumeSnapshotClass')}`, field: row => row.spec.volumeSnapshotClassName, sortable: true, align: tableColumnAlign.left},
  {name: 'VolumeSnapshot', label: `${i18n.global.t('k8s.VolumeSnapshot')}`, field: row => row.spec.volumeSnapshotRef.name, sortable: true, align: tableColumnAlign.left},
  {name: 'VolumeSnapshotNamespace', label: `${i18n.global.t('k8s.VolumeSnapshotNamespace')}`, field: row => row.spec.volumeSnapshotRef.namespace, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: `${i18n.global.t('meta.age')}`, field: row => timeAgo(row.metadata.creationTimestamp), sortable: true, align: tableColumnAlign.left},
];
export const ConfigMapListExcludes = [
];
export const ConfigMapReadExcludes = [
];
export const ConfigMapSimpleExcludes = [
];
export const EndpointsListExcludes = [
];
export const EndpointsReadExcludes = [
];
export const EndpointsSimpleExcludes = [
];
export const LimitRangeListExcludes = [
];
export const LimitRangeReadExcludes = [
];
export const LimitRangeSimpleExcludes = [
];
export const NamespaceListExcludes = [
];
export const NamespaceReadExcludes = [
];
export const NamespaceSimpleExcludes = [
];
export const NodeListExcludes = [
];
export const NodeReadExcludes = [
];
export const NodeSimpleExcludes = [
];
export const PersistentVolumeListExcludes = [
];
export const PersistentVolumeReadExcludes = [
];
export const PersistentVolumeSimpleExcludes = [
];
export const PersistentVolumeClaimListExcludes = [
];
export const PersistentVolumeClaimReadExcludes = [
];
export const PersistentVolumeClaimSimpleExcludes = [
];
export const PodListExcludes = [
];
export const PodReadExcludes = [
];
export const PodSimpleExcludes = [
];
export const PodTemplateListExcludes = [
];
export const PodTemplateReadExcludes = [
];
export const PodTemplateSimpleExcludes = [
];
export const ReplicationControllerListExcludes = [
];
export const ReplicationControllerReadExcludes = [
];
export const ReplicationControllerSimpleExcludes = [
];
export const ResourceQuotaListExcludes = [
];
export const ResourceQuotaReadExcludes = [
];
export const ResourceQuotaSimpleExcludes = [
];
export const SecretListExcludes = [
];
export const SecretReadExcludes = [
];
export const SecretSimpleExcludes = [
];
export const ServiceListExcludes = [
];
export const ServiceReadExcludes = [
];
export const ServiceSimpleExcludes = [
];
export const ServiceAccountListExcludes = [
];
export const ServiceAccountReadExcludes = [
];
export const ServiceAccountSimpleExcludes = [
];
export const APIServiceListExcludes = [
];
export const APIServiceReadExcludes = [
];
export const APIServiceSimpleExcludes = [
];
export const ControllerRevisionListExcludes = [
];
export const ControllerRevisionReadExcludes = [
];
export const ControllerRevisionSimpleExcludes = [
];
export const DaemonSetListExcludes = [
];
export const DaemonSetReadExcludes = [
];
export const DaemonSetSimpleExcludes = [
];
export const DeploymentListExcludes = [
];
export const DeploymentReadExcludes = [
];
export const DeploymentSimpleExcludes = [
];
export const ReplicaSetListExcludes = [
];
export const ReplicaSetReadExcludes = [
];
export const ReplicaSetSimpleExcludes = [
];
export const StatefulSetListExcludes = [
];
export const StatefulSetReadExcludes = [
];
export const StatefulSetSimpleExcludes = [
];
export const HorizontalPodAutoscalerListExcludes = [
];
export const HorizontalPodAutoscalerReadExcludes = [
];
export const HorizontalPodAutoscalerSimpleExcludes = [
];
export const JobListExcludes = [
];
export const JobReadExcludes = [
];
export const JobSimpleExcludes = [
];
export const CronJobListExcludes = [
];
export const CronJobReadExcludes = [
];
export const CronJobSimpleExcludes = [
];
export const CertificateSigningRequestListExcludes = [
];
export const CertificateSigningRequestReadExcludes = [
];
export const CertificateSigningRequestSimpleExcludes = [
];
export const IngressListExcludes = [
];
export const IngressReadExcludes = [
];
export const IngressSimpleExcludes = [
];
export const NetworkPolicyListExcludes = [
];
export const NetworkPolicyReadExcludes = [
];
export const NetworkPolicySimpleExcludes = [
];
export const PodDisruptionBudgetListExcludes = [
];
export const PodDisruptionBudgetReadExcludes = [
];
export const PodDisruptionBudgetSimpleExcludes = [
];
export const RoleListExcludes = [
];
export const RoleReadExcludes = [
];
export const RoleSimpleExcludes = [
];
export const ClusterRoleBindingListExcludes = [
];
export const ClusterRoleBindingReadExcludes = [
];
export const ClusterRoleBindingSimpleExcludes = [
];
export const RoleBindingListExcludes = [
];
export const RoleBindingReadExcludes = [
];
export const RoleBindingSimpleExcludes = [
];
export const ClusterRoleListExcludes = [
];
export const ClusterRoleReadExcludes = [
];
export const ClusterRoleSimpleExcludes = [
];
export const StorageClassListExcludes = [
];
export const StorageClassReadExcludes = [
];
export const StorageClassSimpleExcludes = [
];
export const CSIDriverListExcludes = [
];
export const CSIDriverReadExcludes = [
];
export const CSIDriverSimpleExcludes = [
];
export const CSINodeListExcludes = [
];
export const CSINodeReadExcludes = [
];
export const CSINodeSimpleExcludes = [
];
export const CSIStorageCapacityListExcludes = [
];
export const CSIStorageCapacityReadExcludes = [
];
export const CSIStorageCapacitySimpleExcludes = [
];
export const VolumeAttachmentListExcludes = [
];
export const VolumeAttachmentReadExcludes = [
];
export const VolumeAttachmentSimpleExcludes = [
];
export const MutatingWebhookConfigurationListExcludes = [
];
export const MutatingWebhookConfigurationReadExcludes = [
];
export const MutatingWebhookConfigurationSimpleExcludes = [
];
export const ValidatingWebhookConfigurationListExcludes = [
];
export const ValidatingWebhookConfigurationReadExcludes = [
];
export const ValidatingWebhookConfigurationSimpleExcludes = [
];
export const CustomResourceDefinitionListExcludes = [
];
export const CustomResourceDefinitionReadExcludes = [
];
export const CustomResourceDefinitionSimpleExcludes = [
];
export const PriorityClassListExcludes = [
];
export const PriorityClassReadExcludes = [
];
export const PriorityClassSimpleExcludes = [
];
export const LeaseListExcludes = [
];
export const LeaseReadExcludes = [
];
export const LeaseSimpleExcludes = [
];
export const RuntimeClassListExcludes = [
];
export const RuntimeClassReadExcludes = [
];
export const RuntimeClassSimpleExcludes = [
];
export const EndpointSliceListExcludes = [
];
export const EndpointSliceReadExcludes = [
];
export const EndpointSliceSimpleExcludes = [
];
export const VolumeSnapshotListExcludes = [
  { path: 'spec/source/persistentVolumeClaimName', include: true },
  { path: 'spec/source/volumeSnapshotContentName', include: true },
  { path: 'spec/volumeSnapshotClassName', include: true },
  { path: 'status/readyToUse', include: true },
  { path: 'status/restoreSize', include: true },
  { path: 'status/boundVolumeSnapshotContentName', include: true },
  { path: 'status/creationTime', include: true },
];
export const VolumeSnapshotReadExcludes = [
];
export const VolumeSnapshotSimpleExcludes = [
];
export const VolumeSnapshotClassListExcludes = [
  { path: 'driver', include: true },
  { path: 'deletionPolicy', include: true },
];
export const VolumeSnapshotClassReadExcludes = [
];
export const VolumeSnapshotClassSimpleExcludes = [
];
export const VolumeSnapshotContentListExcludes = [
  { path: 'spec/deletionPolicy', include: true },
  { path: 'spec/driver', include: true },
  { path: 'spec/volumeSnapshotClassName', include: true },
  { path: 'spec/volumeSnapshotRef/name', include: true },
  { path: 'spec/volumeSnapshotRef/namespace', include: true },
  { path: 'status/readyToUse', include: true },
  { path: 'status/restoreSize', include: true },
];
export const VolumeSnapshotContentReadExcludes = [
];
export const VolumeSnapshotContentSimpleExcludes = [
];
