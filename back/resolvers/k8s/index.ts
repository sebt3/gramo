import { queries as customQueries, resolvers as customResolvers, mutations as customMutations } from './custom.js';
import { mutations as ConfigMapMutations, resolvers as ConfigMapResolvers } from './ConfigMap.js';
import { mutations as EndpointsMutations, resolvers as EndpointsResolvers } from './Endpoints.js';
import { mutations as LimitRangeMutations, resolvers as LimitRangeResolvers } from './LimitRange.js';
import { mutations as NamespaceMutations, resolvers as NamespaceResolvers, queries as NamespaceQueries } from './Namespace.js';
import { mutations as NodeMutations, resolvers as NodeResolvers, queries as NodeQueries } from './Node.js';
import { mutations as PersistentVolumeMutations, resolvers as PersistentVolumeResolvers, queries as PersistentVolumeQueries } from './PersistentVolume.js';
import { mutations as PersistentVolumeClaimMutations, resolvers as PersistentVolumeClaimResolvers } from './PersistentVolumeClaim.js';
import { mutations as PodMutations, resolvers as PodResolvers } from './Pod.js';
import { mutations as PodTemplateMutations, resolvers as PodTemplateResolvers } from './PodTemplate.js';
import { mutations as ReplicationControllerMutations, resolvers as ReplicationControllerResolvers } from './ReplicationController.js';
import { mutations as ResourceQuotaMutations, resolvers as ResourceQuotaResolvers } from './ResourceQuota.js';
import { mutations as SecretMutations, resolvers as SecretResolvers } from './Secret.js';
import { mutations as ServiceMutations, resolvers as ServiceResolvers } from './Service.js';
import { mutations as ServiceAccountMutations, resolvers as ServiceAccountResolvers } from './ServiceAccount.js';
import { mutations as APIServiceMutations, resolvers as APIServiceResolvers, queries as APIServiceQueries } from './APIService.js';
import { mutations as DaemonSetMutations, resolvers as DaemonSetResolvers } from './DaemonSet.js';
import { mutations as DeploymentMutations, resolvers as DeploymentResolvers } from './Deployment.js';
import { mutations as ReplicaSetMutations, resolvers as ReplicaSetResolvers } from './ReplicaSet.js';
import { mutations as StatefulSetMutations, resolvers as StatefulSetResolvers } from './StatefulSet.js';
import { mutations as HorizontalPodAutoscalerMutations, resolvers as HorizontalPodAutoscalerResolvers } from './HorizontalPodAutoscaler.js';
import { mutations as JobMutations, resolvers as JobResolvers } from './Job.js';
import { mutations as CronJobMutations, resolvers as CronJobResolvers } from './CronJob.js';
import { mutations as CertificateSigningRequestMutations, resolvers as CertificateSigningRequestResolvers, queries as CertificateSigningRequestQueries } from './CertificateSigningRequest.js';
import { mutations as IngressMutations, resolvers as IngressResolvers } from './Ingress.js';
import { mutations as NetworkPolicyMutations, resolvers as NetworkPolicyResolvers } from './NetworkPolicy.js';
import { mutations as PodDisruptionBudgetMutations, resolvers as PodDisruptionBudgetResolvers } from './PodDisruptionBudget.js';
import { mutations as RoleMutations, resolvers as RoleResolvers } from './Role.js';
import { mutations as ClusterRoleBindingMutations, resolvers as ClusterRoleBindingResolvers, queries as ClusterRoleBindingQueries } from './ClusterRoleBinding.js';
import { mutations as RoleBindingMutations, resolvers as RoleBindingResolvers } from './RoleBinding.js';
import { mutations as ClusterRoleMutations, resolvers as ClusterRoleResolvers, queries as ClusterRoleQueries } from './ClusterRole.js';
import { mutations as StorageClassMutations, resolvers as StorageClassResolvers, queries as StorageClassQueries } from './StorageClass.js';
import { mutations as CSIDriverMutations, resolvers as CSIDriverResolvers, queries as CSIDriverQueries } from './CSIDriver.js';
import { mutations as CSINodeMutations, resolvers as CSINodeResolvers, queries as CSINodeQueries } from './CSINode.js';
import { mutations as CSIStorageCapacityMutations, resolvers as CSIStorageCapacityResolvers } from './CSIStorageCapacity.js';
import { mutations as VolumeAttachmentMutations, resolvers as VolumeAttachmentResolvers, queries as VolumeAttachmentQueries } from './VolumeAttachment.js';
import { mutations as MutatingWebhookConfigurationMutations, resolvers as MutatingWebhookConfigurationResolvers, queries as MutatingWebhookConfigurationQueries } from './MutatingWebhookConfiguration.js';
import { mutations as ValidatingWebhookConfigurationMutations, resolvers as ValidatingWebhookConfigurationResolvers, queries as ValidatingWebhookConfigurationQueries } from './ValidatingWebhookConfiguration.js';
import { mutations as CustomResourceDefinitionMutations, resolvers as CustomResourceDefinitionResolvers, queries as CustomResourceDefinitionQueries } from './CustomResourceDefinition.js';
import { mutations as PriorityClassMutations, resolvers as PriorityClassResolvers, queries as PriorityClassQueries } from './PriorityClass.js';
import { mutations as LeaseMutations, resolvers as LeaseResolvers } from './Lease.js';
import { mutations as RuntimeClassMutations, resolvers as RuntimeClassResolvers, queries as RuntimeClassQueries } from './RuntimeClass.js';
import { mutations as EndpointSliceMutations, resolvers as EndpointSliceResolvers } from './EndpointSlice.js';
export const queries = {
    ...NamespaceQueries,
    ...NodeQueries,
    ...PersistentVolumeQueries,
    ...APIServiceQueries,
    ...CertificateSigningRequestQueries,
    ...ClusterRoleBindingQueries,
    ...ClusterRoleQueries,
    ...StorageClassQueries,
    ...CSIDriverQueries,
    ...CSINodeQueries,
    ...VolumeAttachmentQueries,
    ...MutatingWebhookConfigurationQueries,
    ...ValidatingWebhookConfigurationQueries,
    ...CustomResourceDefinitionQueries,
    ...PriorityClassQueries,
    ...RuntimeClassQueries,
    ...customQueries
};

export const resolvers = {
    ...ConfigMapResolvers,
    ...EndpointsResolvers,
    ...LimitRangeResolvers,
    ...NamespaceResolvers,
    ...NodeResolvers,
    ...PersistentVolumeResolvers,
    ...PersistentVolumeClaimResolvers,
    ...PodResolvers,
    ...PodTemplateResolvers,
    ...ReplicationControllerResolvers,
    ...ResourceQuotaResolvers,
    ...SecretResolvers,
    ...ServiceResolvers,
    ...ServiceAccountResolvers,
    ...APIServiceResolvers,
    ...DaemonSetResolvers,
    ...DeploymentResolvers,
    ...ReplicaSetResolvers,
    ...StatefulSetResolvers,
    ...HorizontalPodAutoscalerResolvers,
    ...JobResolvers,
    ...CronJobResolvers,
    ...CertificateSigningRequestResolvers,
    ...IngressResolvers,
    ...NetworkPolicyResolvers,
    ...PodDisruptionBudgetResolvers,
    ...RoleResolvers,
    ...ClusterRoleBindingResolvers,
    ...RoleBindingResolvers,
    ...ClusterRoleResolvers,
    ...StorageClassResolvers,
    ...CSIDriverResolvers,
    ...CSINodeResolvers,
    ...CSIStorageCapacityResolvers,
    ...VolumeAttachmentResolvers,
    ...MutatingWebhookConfigurationResolvers,
    ...ValidatingWebhookConfigurationResolvers,
    ...CustomResourceDefinitionResolvers,
    ...PriorityClassResolvers,
    ...LeaseResolvers,
    ...RuntimeClassResolvers,
    ...EndpointSliceResolvers,
    ...customResolvers
};

export const mutations = {
    ...ConfigMapMutations,
    ...EndpointsMutations,
    ...LimitRangeMutations,
    ...NamespaceMutations,
    ...NodeMutations,
    ...PersistentVolumeMutations,
    ...PersistentVolumeClaimMutations,
    ...PodMutations,
    ...PodTemplateMutations,
    ...ReplicationControllerMutations,
    ...ResourceQuotaMutations,
    ...SecretMutations,
    ...ServiceMutations,
    ...ServiceAccountMutations,
    ...APIServiceMutations,
    ...DaemonSetMutations,
    ...DeploymentMutations,
    ...ReplicaSetMutations,
    ...StatefulSetMutations,
    ...HorizontalPodAutoscalerMutations,
    ...JobMutations,
    ...CronJobMutations,
    ...CertificateSigningRequestMutations,
    ...IngressMutations,
    ...NetworkPolicyMutations,
    ...PodDisruptionBudgetMutations,
    ...RoleMutations,
    ...ClusterRoleBindingMutations,
    ...RoleBindingMutations,
    ...ClusterRoleMutations,
    ...StorageClassMutations,
    ...CSIDriverMutations,
    ...CSINodeMutations,
    ...CSIStorageCapacityMutations,
    ...VolumeAttachmentMutations,
    ...MutatingWebhookConfigurationMutations,
    ...ValidatingWebhookConfigurationMutations,
    ...CustomResourceDefinitionMutations,
    ...PriorityClassMutations,
    ...LeaseMutations,
    ...RuntimeClassMutations,
    ...EndpointSliceMutations,
    ...customMutations
};
