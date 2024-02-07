import { nsResolver as ConfigMapNSresolver } from '../k8s/ConfigMap.js';
import { nsResolver as EndpointsNSresolver } from '../k8s/Endpoints.js';
import { nsResolver as LimitRangeNSresolver } from '../k8s/LimitRange.js';
import { nsResolver as PersistentVolumeClaimNSresolver } from '../k8s/PersistentVolumeClaim.js';
import { nsResolver as PodNSresolver } from '../k8s/Pod.js';
import { nsResolver as PodTemplateNSresolver } from '../k8s/PodTemplate.js';
import { nsResolver as ReplicationControllerNSresolver } from '../k8s/ReplicationController.js';
import { nsResolver as ResourceQuotaNSresolver } from '../k8s/ResourceQuota.js';
import { nsResolver as SecretNSresolver } from '../k8s/Secret.js';
import { nsResolver as ServiceNSresolver } from '../k8s/Service.js';
import { nsResolver as ServiceAccountNSresolver } from '../k8s/ServiceAccount.js';
import { nsResolver as DaemonSetNSresolver } from '../k8s/DaemonSet.js';
import { nsResolver as DeploymentNSresolver } from '../k8s/Deployment.js';
import { nsResolver as ReplicaSetNSresolver } from '../k8s/ReplicaSet.js';
import { nsResolver as StatefulSetNSresolver } from '../k8s/StatefulSet.js';
import { nsResolver as HorizontalPodAutoscalerNSresolver } from '../k8s/HorizontalPodAutoscaler.js';
import { nsResolver as JobNSresolver } from '../k8s/Job.js';
import { nsResolver as CronJobNSresolver } from '../k8s/CronJob.js';
import { nsResolver as IngressNSresolver } from '../k8s/Ingress.js';
import { nsResolver as NetworkPolicyNSresolver } from '../k8s/NetworkPolicy.js';
import { nsResolver as PodDisruptionBudgetNSresolver } from '../k8s/PodDisruptionBudget.js';
import { nsResolver as RoleNSresolver } from '../k8s/Role.js';
import { nsResolver as RoleBindingNSresolver } from '../k8s/RoleBinding.js';
import { nsResolver as CSIStorageCapacityNSresolver } from '../k8s/CSIStorageCapacity.js';
import { nsResolver as LeaseNSresolver } from '../k8s/Lease.js';
import { nsResolver as EndpointSliceNSresolver } from '../k8s/EndpointSlice.js';
export const resolvers = {
    ...ConfigMapNSresolver,
    ...EndpointsNSresolver,
    ...LimitRangeNSresolver,
    ...PersistentVolumeClaimNSresolver,
    ...PodNSresolver,
    ...PodTemplateNSresolver,
    ...ReplicationControllerNSresolver,
    ...ResourceQuotaNSresolver,
    ...SecretNSresolver,
    ...ServiceNSresolver,
    ...ServiceAccountNSresolver,
    ...DaemonSetNSresolver,
    ...DeploymentNSresolver,
    ...ReplicaSetNSresolver,
    ...StatefulSetNSresolver,
    ...HorizontalPodAutoscalerNSresolver,
    ...JobNSresolver,
    ...CronJobNSresolver,
    ...IngressNSresolver,
    ...NetworkPolicyNSresolver,
    ...PodDisruptionBudgetNSresolver,
    ...RoleNSresolver,
    ...RoleBindingNSresolver,
    ...CSIStorageCapacityNSresolver,
    ...LeaseNSresolver,
    ...EndpointSliceNSresolver,
};
