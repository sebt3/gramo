import {menuLinksProps} from '../interfaces';
import { iconLimitRange, iconPod, iconPodTemplate, iconReplicationController, iconResourceQuota, iconDaemonSet, iconDeployment, iconReplicaSet, iconStatefulSet, iconHorizontalPodAutoscaler, iconJob, iconCronJob, iconPodDisruptionBudget, iconPriorityClass, iconRuntimeClass,  k8sIcon, k8sTitle }from '../../libs/k8s/custom.js'
import {  } from '../custom.js';
import { useCRDStore } from '../../stores'
const crds = useCRDStore().crds;
export const link:menuLinksProps = {
  name: 'workloadk8s',
  title: k8sTitle, icon: k8sIcon,
  link: '/workload/k8s/',
  level: 1,
  children: [
  [{
    name: 'k8sLimitRanges',
    title: 'LimitRange', caption: 'List LimitRange', icon: iconLimitRange,
    link: '/workload/k8s/LimitRange/', level: 2, children: []
  }],
  [{
    name: 'k8sPods',
    title: 'Pod', caption: 'List Pod', icon: iconPod,
    link: '/workload/k8s/Pod/', level: 2, children: []
  }],
  [{
    name: 'k8sPodTemplates',
    title: 'PodTemplate', caption: 'List PodTemplate', icon: iconPodTemplate,
    link: '/workload/k8s/PodTemplate/', level: 2, children: []
  }],
  [{
    name: 'k8sReplicationControllers',
    title: 'ReplicationController', caption: 'List ReplicationController', icon: iconReplicationController,
    link: '/workload/k8s/ReplicationController/', level: 2, children: []
  }],
  [{
    name: 'k8sResourceQuotas',
    title: 'ResourceQuota', caption: 'List ResourceQuota', icon: iconResourceQuota,
    link: '/workload/k8s/ResourceQuota/', level: 2, children: []
  }],
  [{
    name: 'k8sDaemonSets',
    title: 'DaemonSet', caption: 'List DaemonSet', icon: iconDaemonSet,
    link: '/workload/k8s/DaemonSet/', level: 2, children: []
  }],
  [{
    name: 'k8sDeployments',
    title: 'Deployment', caption: 'List Deployment', icon: iconDeployment,
    link: '/workload/k8s/Deployment/', level: 2, children: []
  }],
  [{
    name: 'k8sReplicaSets',
    title: 'ReplicaSet', caption: 'List ReplicaSet', icon: iconReplicaSet,
    link: '/workload/k8s/ReplicaSet/', level: 2, children: []
  }],
  [{
    name: 'k8sStatefulSets',
    title: 'StatefulSet', caption: 'List StatefulSet', icon: iconStatefulSet,
    link: '/workload/k8s/StatefulSet/', level: 2, children: []
  }],
  [{
    name: 'k8sHorizontalPodAutoscalers',
    title: 'HorizontalPodAutoscaler', caption: 'List HorizontalPodAutoscaler', icon: iconHorizontalPodAutoscaler,
    link: '/workload/k8s/HorizontalPodAutoscaler/', level: 2, children: []
  }],
  [{
    name: 'k8sJobs',
    title: 'Job', caption: 'List Job', icon: iconJob,
    link: '/workload/k8s/Job/', level: 2, children: []
  }],
  [{
    name: 'k8sCronJobs',
    title: 'CronJob', caption: 'List CronJob', icon: iconCronJob,
    link: '/workload/k8s/CronJob/', level: 2, children: []
  }],
  [{
    name: 'k8sPodDisruptionBudgets',
    title: 'PodDisruptionBudget', caption: 'List PodDisruptionBudget', icon: iconPodDisruptionBudget,
    link: '/workload/k8s/PodDisruptionBudget/', level: 2, children: []
  }],
  [{
    name: 'k8sPriorityClasss',
    title: 'PriorityClass', caption: 'List PriorityClass', icon: iconPriorityClass,
    link: '/workload/k8s/PriorityClass/', level: 2, children: []
  }],
  [{
    name: 'k8sRuntimeClasss',
    title: 'RuntimeClass', caption: 'List RuntimeClass', icon: iconRuntimeClass,
    link: '/workload/k8s/RuntimeClass/', level: 2, children: []
  }],
  ].flat()
}
export const descriptions = {
  workloadk8s:                {breadcrumb: k8sTitle, icon: k8sIcon, ns: false},
  workloadk8sDashboard:       {breadcrumb: 'Dashboard', icon: k8sIcon, ns: false},
  k8sLimitRange:        {breadcrumb: 'LimitRange', icon: iconLimitRange, ns: false},
  k8sLimitRangeAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  k8sLimitRangeTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  k8sLimitRangeView:     {breadcrumb: 'View', icon: iconLimitRange, ns: true },
  k8sLimitRangeEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  k8sLimitRangeCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  k8sPod:        {breadcrumb: 'Pod', icon: iconPod, ns: false},
  k8sPodAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  k8sPodTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  k8sPodView:     {breadcrumb: 'View', icon: iconPod, ns: true },
  k8sPodEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  k8sPodCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  k8sPodTemplate:        {breadcrumb: 'PodTemplate', icon: iconPodTemplate, ns: false},
  k8sPodTemplateAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  k8sPodTemplateTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  k8sPodTemplateView:     {breadcrumb: 'View', icon: iconPodTemplate, ns: true },
  k8sPodTemplateEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  k8sPodTemplateCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  k8sReplicationController:        {breadcrumb: 'ReplicationController', icon: iconReplicationController, ns: false},
  k8sReplicationControllerAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  k8sReplicationControllerTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  k8sReplicationControllerView:     {breadcrumb: 'View', icon: iconReplicationController, ns: true },
  k8sReplicationControllerEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  k8sReplicationControllerCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  k8sResourceQuota:        {breadcrumb: 'ResourceQuota', icon: iconResourceQuota, ns: false},
  k8sResourceQuotaAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  k8sResourceQuotaTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  k8sResourceQuotaView:     {breadcrumb: 'View', icon: iconResourceQuota, ns: true },
  k8sResourceQuotaEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  k8sResourceQuotaCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  k8sDaemonSet:        {breadcrumb: 'DaemonSet', icon: iconDaemonSet, ns: false},
  k8sDaemonSetAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  k8sDaemonSetTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  k8sDaemonSetView:     {breadcrumb: 'View', icon: iconDaemonSet, ns: true },
  k8sDaemonSetEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  k8sDaemonSetCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  k8sDeployment:        {breadcrumb: 'Deployment', icon: iconDeployment, ns: false},
  k8sDeploymentAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  k8sDeploymentTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  k8sDeploymentView:     {breadcrumb: 'View', icon: iconDeployment, ns: true },
  k8sDeploymentEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  k8sDeploymentCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  k8sReplicaSet:        {breadcrumb: 'ReplicaSet', icon: iconReplicaSet, ns: false},
  k8sReplicaSetAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  k8sReplicaSetTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  k8sReplicaSetView:     {breadcrumb: 'View', icon: iconReplicaSet, ns: true },
  k8sReplicaSetEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  k8sReplicaSetCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  k8sStatefulSet:        {breadcrumb: 'StatefulSet', icon: iconStatefulSet, ns: false},
  k8sStatefulSetAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  k8sStatefulSetTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  k8sStatefulSetView:     {breadcrumb: 'View', icon: iconStatefulSet, ns: true },
  k8sStatefulSetEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  k8sStatefulSetCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  k8sHorizontalPodAutoscaler:        {breadcrumb: 'HorizontalPodAutoscaler', icon: iconHorizontalPodAutoscaler, ns: false},
  k8sHorizontalPodAutoscalerAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  k8sHorizontalPodAutoscalerTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  k8sHorizontalPodAutoscalerView:     {breadcrumb: 'View', icon: iconHorizontalPodAutoscaler, ns: true },
  k8sHorizontalPodAutoscalerEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  k8sHorizontalPodAutoscalerCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  k8sJob:        {breadcrumb: 'Job', icon: iconJob, ns: false},
  k8sJobAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  k8sJobTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  k8sJobView:     {breadcrumb: 'View', icon: iconJob, ns: true },
  k8sJobEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  k8sJobCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  k8sCronJob:        {breadcrumb: 'CronJob', icon: iconCronJob, ns: false},
  k8sCronJobAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  k8sCronJobTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  k8sCronJobView:     {breadcrumb: 'View', icon: iconCronJob, ns: true },
  k8sCronJobEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  k8sCronJobCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  k8sPodDisruptionBudget:        {breadcrumb: 'PodDisruptionBudget', icon: iconPodDisruptionBudget, ns: false},
  k8sPodDisruptionBudgetAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  k8sPodDisruptionBudgetTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  k8sPodDisruptionBudgetView:     {breadcrumb: 'View', icon: iconPodDisruptionBudget, ns: true },
  k8sPodDisruptionBudgetEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  k8sPodDisruptionBudgetCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  k8sPriorityClass:        {breadcrumb: 'PriorityClass', icon: iconPriorityClass, ns: false},
  k8sPriorityClassTable:    {breadcrumb: 'List', icon: 'list', ns: false },
  k8sPriorityClassView:     {breadcrumb: 'View', icon: iconPriorityClass, ns: false },
  k8sPriorityClassEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: false },
  k8sPriorityClassCreate:   {breadcrumb: 'Create', icon: 'add', ns: false },
  k8sRuntimeClass:        {breadcrumb: 'RuntimeClass', icon: iconRuntimeClass, ns: false},
  k8sRuntimeClassTable:    {breadcrumb: 'List', icon: 'list', ns: false },
  k8sRuntimeClassView:     {breadcrumb: 'View', icon: iconRuntimeClass, ns: false },
  k8sRuntimeClassEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: false },
  k8sRuntimeClassCreate:   {breadcrumb: 'Create', icon: 'add', ns: false },
}
export const route = {
  path: 'k8s',
  name: 'workloadk8s',
  redirect: {path: link.link as string},
  children: [
    {
      path: '',
      name: 'workloadk8sDashboard',
      component: () => import('../../pages/workload/k8s/Dashboard.vue'),
    },
    {
      path: 'LimitRange',
      name: 'k8sLimitRange',
      children: [
        {
          path: '',
          name: 'k8sLimitRangeAllTable',
          component: () => import('../../pages/workload/k8s/LimitRangeList.vue'),
        },
        {
          path: ':namespace',
          name: 'k8sLimitRangeTable',
          component: () => import('../../pages/workload/k8s/LimitRangeList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'k8sLimitRangeView',
          component: () => import('../../pages/workload/k8s/LimitRangeView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'k8sLimitRangeEdit',
          component: () => import('../../pages/workload/k8s/LimitRangeEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'k8sLimitRangeCreate',
          component: () => import('../../pages/workload/k8s/LimitRangeNew.vue'),
        }
      ]
    },
    {
      path: 'Pod',
      name: 'k8sPod',
      children: [
        {
          path: '',
          name: 'k8sPodAllTable',
          component: () => import('../../pages/workload/k8s/PodList.vue'),
        },
        {
          path: ':namespace',
          name: 'k8sPodTable',
          component: () => import('../../pages/workload/k8s/PodList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'k8sPodView',
          component: () => import('../../pages/workload/k8s/PodView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'k8sPodEdit',
          component: () => import('../../pages/workload/k8s/PodEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'k8sPodCreate',
          component: () => import('../../pages/workload/k8s/PodNew.vue'),
        }
      ]
    },
    {
      path: 'PodTemplate',
      name: 'k8sPodTemplate',
      children: [
        {
          path: '',
          name: 'k8sPodTemplateAllTable',
          component: () => import('../../pages/workload/k8s/PodTemplateList.vue'),
        },
        {
          path: ':namespace',
          name: 'k8sPodTemplateTable',
          component: () => import('../../pages/workload/k8s/PodTemplateList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'k8sPodTemplateView',
          component: () => import('../../pages/workload/k8s/PodTemplateView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'k8sPodTemplateEdit',
          component: () => import('../../pages/workload/k8s/PodTemplateEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'k8sPodTemplateCreate',
          component: () => import('../../pages/workload/k8s/PodTemplateNew.vue'),
        }
      ]
    },
    {
      path: 'ReplicationController',
      name: 'k8sReplicationController',
      children: [
        {
          path: '',
          name: 'k8sReplicationControllerAllTable',
          component: () => import('../../pages/workload/k8s/ReplicationControllerList.vue'),
        },
        {
          path: ':namespace',
          name: 'k8sReplicationControllerTable',
          component: () => import('../../pages/workload/k8s/ReplicationControllerList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'k8sReplicationControllerView',
          component: () => import('../../pages/workload/k8s/ReplicationControllerView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'k8sReplicationControllerEdit',
          component: () => import('../../pages/workload/k8s/ReplicationControllerEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'k8sReplicationControllerCreate',
          component: () => import('../../pages/workload/k8s/ReplicationControllerNew.vue'),
        }
      ]
    },
    {
      path: 'ResourceQuota',
      name: 'k8sResourceQuota',
      children: [
        {
          path: '',
          name: 'k8sResourceQuotaAllTable',
          component: () => import('../../pages/workload/k8s/ResourceQuotaList.vue'),
        },
        {
          path: ':namespace',
          name: 'k8sResourceQuotaTable',
          component: () => import('../../pages/workload/k8s/ResourceQuotaList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'k8sResourceQuotaView',
          component: () => import('../../pages/workload/k8s/ResourceQuotaView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'k8sResourceQuotaEdit',
          component: () => import('../../pages/workload/k8s/ResourceQuotaEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'k8sResourceQuotaCreate',
          component: () => import('../../pages/workload/k8s/ResourceQuotaNew.vue'),
        }
      ]
    },
    {
      path: 'DaemonSet',
      name: 'k8sDaemonSet',
      children: [
        {
          path: '',
          name: 'k8sDaemonSetAllTable',
          component: () => import('../../pages/workload/k8s/DaemonSetList.vue'),
        },
        {
          path: ':namespace',
          name: 'k8sDaemonSetTable',
          component: () => import('../../pages/workload/k8s/DaemonSetList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'k8sDaemonSetView',
          component: () => import('../../pages/workload/k8s/DaemonSetView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'k8sDaemonSetEdit',
          component: () => import('../../pages/workload/k8s/DaemonSetEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'k8sDaemonSetCreate',
          component: () => import('../../pages/workload/k8s/DaemonSetNew.vue'),
        }
      ]
    },
    {
      path: 'Deployment',
      name: 'k8sDeployment',
      children: [
        {
          path: '',
          name: 'k8sDeploymentAllTable',
          component: () => import('../../pages/workload/k8s/DeploymentList.vue'),
        },
        {
          path: ':namespace',
          name: 'k8sDeploymentTable',
          component: () => import('../../pages/workload/k8s/DeploymentList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'k8sDeploymentView',
          component: () => import('../../pages/workload/k8s/DeploymentView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'k8sDeploymentEdit',
          component: () => import('../../pages/workload/k8s/DeploymentEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'k8sDeploymentCreate',
          component: () => import('../../pages/workload/k8s/DeploymentNew.vue'),
        }
      ]
    },
    {
      path: 'ReplicaSet',
      name: 'k8sReplicaSet',
      children: [
        {
          path: '',
          name: 'k8sReplicaSetAllTable',
          component: () => import('../../pages/workload/k8s/ReplicaSetList.vue'),
        },
        {
          path: ':namespace',
          name: 'k8sReplicaSetTable',
          component: () => import('../../pages/workload/k8s/ReplicaSetList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'k8sReplicaSetView',
          component: () => import('../../pages/workload/k8s/ReplicaSetView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'k8sReplicaSetEdit',
          component: () => import('../../pages/workload/k8s/ReplicaSetEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'k8sReplicaSetCreate',
          component: () => import('../../pages/workload/k8s/ReplicaSetNew.vue'),
        }
      ]
    },
    {
      path: 'StatefulSet',
      name: 'k8sStatefulSet',
      children: [
        {
          path: '',
          name: 'k8sStatefulSetAllTable',
          component: () => import('../../pages/workload/k8s/StatefulSetList.vue'),
        },
        {
          path: ':namespace',
          name: 'k8sStatefulSetTable',
          component: () => import('../../pages/workload/k8s/StatefulSetList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'k8sStatefulSetView',
          component: () => import('../../pages/workload/k8s/StatefulSetView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'k8sStatefulSetEdit',
          component: () => import('../../pages/workload/k8s/StatefulSetEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'k8sStatefulSetCreate',
          component: () => import('../../pages/workload/k8s/StatefulSetNew.vue'),
        }
      ]
    },
    {
      path: 'HorizontalPodAutoscaler',
      name: 'k8sHorizontalPodAutoscaler',
      children: [
        {
          path: '',
          name: 'k8sHorizontalPodAutoscalerAllTable',
          component: () => import('../../pages/workload/k8s/HorizontalPodAutoscalerList.vue'),
        },
        {
          path: ':namespace',
          name: 'k8sHorizontalPodAutoscalerTable',
          component: () => import('../../pages/workload/k8s/HorizontalPodAutoscalerList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'k8sHorizontalPodAutoscalerView',
          component: () => import('../../pages/workload/k8s/HorizontalPodAutoscalerView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'k8sHorizontalPodAutoscalerEdit',
          component: () => import('../../pages/workload/k8s/HorizontalPodAutoscalerEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'k8sHorizontalPodAutoscalerCreate',
          component: () => import('../../pages/workload/k8s/HorizontalPodAutoscalerNew.vue'),
        }
      ]
    },
    {
      path: 'Job',
      name: 'k8sJob',
      children: [
        {
          path: '',
          name: 'k8sJobAllTable',
          component: () => import('../../pages/workload/k8s/JobList.vue'),
        },
        {
          path: ':namespace',
          name: 'k8sJobTable',
          component: () => import('../../pages/workload/k8s/JobList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'k8sJobView',
          component: () => import('../../pages/workload/k8s/JobView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'k8sJobEdit',
          component: () => import('../../pages/workload/k8s/JobEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'k8sJobCreate',
          component: () => import('../../pages/workload/k8s/JobNew.vue'),
        }
      ]
    },
    {
      path: 'CronJob',
      name: 'k8sCronJob',
      children: [
        {
          path: '',
          name: 'k8sCronJobAllTable',
          component: () => import('../../pages/workload/k8s/CronJobList.vue'),
        },
        {
          path: ':namespace',
          name: 'k8sCronJobTable',
          component: () => import('../../pages/workload/k8s/CronJobList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'k8sCronJobView',
          component: () => import('../../pages/workload/k8s/CronJobView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'k8sCronJobEdit',
          component: () => import('../../pages/workload/k8s/CronJobEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'k8sCronJobCreate',
          component: () => import('../../pages/workload/k8s/CronJobNew.vue'),
        }
      ]
    },
    {
      path: 'PodDisruptionBudget',
      name: 'k8sPodDisruptionBudget',
      children: [
        {
          path: '',
          name: 'k8sPodDisruptionBudgetAllTable',
          component: () => import('../../pages/workload/k8s/PodDisruptionBudgetList.vue'),
        },
        {
          path: ':namespace',
          name: 'k8sPodDisruptionBudgetTable',
          component: () => import('../../pages/workload/k8s/PodDisruptionBudgetList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'k8sPodDisruptionBudgetView',
          component: () => import('../../pages/workload/k8s/PodDisruptionBudgetView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'k8sPodDisruptionBudgetEdit',
          component: () => import('../../pages/workload/k8s/PodDisruptionBudgetEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'k8sPodDisruptionBudgetCreate',
          component: () => import('../../pages/workload/k8s/PodDisruptionBudgetNew.vue'),
        }
      ]
    },
    {
      path: 'PriorityClass',
      name: 'k8sPriorityClass',
      children: [
        {
          path: '',
          name: 'k8sPriorityClassTable',
          component: () => import('../../pages/workload/k8s/PriorityClassList.vue'),
        },
        {
          path: 'view/:name',
          name: 'k8sPriorityClassView',
          component: () => import('../../pages/workload/k8s/PriorityClassView.vue'),
        },
        {
          path: 'edit/:name',
          name: 'k8sPriorityClassEdit',
          component: () => import('../../pages/workload/k8s/PriorityClassEdit.vue'),
        },
        {
          path: 'create',
          name: 'k8sPriorityClassCreate',
          component: () => import('../../pages/workload/k8s/PriorityClassNew.vue'),
        }
      ]
    },
    {
      path: 'RuntimeClass',
      name: 'k8sRuntimeClass',
      children: [
        {
          path: '',
          name: 'k8sRuntimeClassTable',
          component: () => import('../../pages/workload/k8s/RuntimeClassList.vue'),
        },
        {
          path: 'view/:name',
          name: 'k8sRuntimeClassView',
          component: () => import('../../pages/workload/k8s/RuntimeClassView.vue'),
        },
        {
          path: 'edit/:name',
          name: 'k8sRuntimeClassEdit',
          component: () => import('../../pages/workload/k8s/RuntimeClassEdit.vue'),
        },
        {
          path: 'create',
          name: 'k8sRuntimeClassCreate',
          component: () => import('../../pages/workload/k8s/RuntimeClassNew.vue'),
        }
      ]
    },
  ],
}
export default route
