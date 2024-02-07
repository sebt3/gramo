import {menuLinksProps} from '../interfaces';
import { iconKustomization, iconReceiver, iconAlert, iconProvider, iconGitRepository, iconBucket, iconHelmChart, iconHelmRepository, iconOCIRepository, iconImageUpdateAutomation, iconImagePolicy, iconImageRepository, iconHelmRelease,  fluxcdIcon, fluxcdTitle }from '../../libs/fluxcd/custom.js'
import {  } from '../custom.js';
import { useCRDStore } from '../../stores'
const crds = useCRDStore().crds;
export const link:menuLinksProps = {
  name: 'automationfluxcd',
  title: fluxcdTitle, icon: fluxcdIcon,
  link: '/automation/fluxcd/',
  level: 1,
  children: [
  crds['kustomizations.kustomize.toolkit.fluxcd.io'] == undefined?[]:[{
    name: 'fluxcdKustomizations',
    title: 'Kustomization', caption: 'List Kustomization', icon: iconKustomization,
    link: '/automation/fluxcd/Kustomization/', level: 2, children: []
  }],
  crds['receivers.notification.toolkit.fluxcd.io'] == undefined?[]:[{
    name: 'fluxcdReceivers',
    title: 'Receiver', caption: 'List Receiver', icon: iconReceiver,
    link: '/automation/fluxcd/Receiver/', level: 2, children: []
  }],
  crds['alerts.notification.toolkit.fluxcd.io'] == undefined?[]:[{
    name: 'fluxcdAlerts',
    title: 'Alert', caption: 'List Alert', icon: iconAlert,
    link: '/automation/fluxcd/Alert/', level: 2, children: []
  }],
  crds['providers.notification.toolkit.fluxcd.io'] == undefined?[]:[{
    name: 'fluxcdProviders',
    title: 'Provider', caption: 'List Provider', icon: iconProvider,
    link: '/automation/fluxcd/Provider/', level: 2, children: []
  }],
  crds['gitrepositories.source.toolkit.fluxcd.io'] == undefined?[]:[{
    name: 'fluxcdGitRepositorys',
    title: 'GitRepository', caption: 'List GitRepository', icon: iconGitRepository,
    link: '/automation/fluxcd/GitRepository/', level: 2, children: []
  }],
  crds['buckets.source.toolkit.fluxcd.io'] == undefined?[]:[{
    name: 'fluxcdBuckets',
    title: 'Bucket', caption: 'List Bucket', icon: iconBucket,
    link: '/automation/fluxcd/Bucket/', level: 2, children: []
  }],
  crds['helmcharts.source.toolkit.fluxcd.io'] == undefined?[]:[{
    name: 'fluxcdHelmCharts',
    title: 'HelmChart', caption: 'List HelmChart', icon: iconHelmChart,
    link: '/automation/fluxcd/HelmChart/', level: 2, children: []
  }],
  crds['helmrepositories.source.toolkit.fluxcd.io'] == undefined?[]:[{
    name: 'fluxcdHelmRepositorys',
    title: 'HelmRepository', caption: 'List HelmRepository', icon: iconHelmRepository,
    link: '/automation/fluxcd/HelmRepository/', level: 2, children: []
  }],
  crds['ocirepositories.source.toolkit.fluxcd.io'] == undefined?[]:[{
    name: 'fluxcdOCIRepositorys',
    title: 'OCIRepository', caption: 'List OCIRepository', icon: iconOCIRepository,
    link: '/automation/fluxcd/OCIRepository/', level: 2, children: []
  }],
  crds['imageupdateautomations.image.toolkit.fluxcd.io'] == undefined?[]:[{
    name: 'fluxcdImageUpdateAutomations',
    title: 'ImageUpdateAutomation', caption: 'List ImageUpdateAutomation', icon: iconImageUpdateAutomation,
    link: '/automation/fluxcd/ImageUpdateAutomation/', level: 2, children: []
  }],
  crds['imagepolicies.image.toolkit.fluxcd.io'] == undefined?[]:[{
    name: 'fluxcdImagePolicys',
    title: 'ImagePolicy', caption: 'List ImagePolicy', icon: iconImagePolicy,
    link: '/automation/fluxcd/ImagePolicy/', level: 2, children: []
  }],
  crds['imagerepositories.image.toolkit.fluxcd.io'] == undefined?[]:[{
    name: 'fluxcdImageRepositorys',
    title: 'ImageRepository', caption: 'List ImageRepository', icon: iconImageRepository,
    link: '/automation/fluxcd/ImageRepository/', level: 2, children: []
  }],
  crds['helmreleases.helm.toolkit.fluxcd.io'] == undefined?[]:[{
    name: 'fluxcdHelmReleases',
    title: 'HelmRelease', caption: 'List HelmRelease', icon: iconHelmRelease,
    link: '/automation/fluxcd/HelmRelease/', level: 2, children: []
  }],
  ].flat()
}
export const descriptions = {
  automationfluxcd:                {breadcrumb: fluxcdTitle, icon: fluxcdIcon, ns: false},
  automationfluxcdDashboard:       {breadcrumb: 'Dashboard', icon: fluxcdIcon, ns: false},
  fluxcdKustomization:        {breadcrumb: 'Kustomization', icon: iconKustomization, ns: false},
  fluxcdKustomizationAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  fluxcdKustomizationTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  fluxcdKustomizationView:     {breadcrumb: 'View', icon: iconKustomization, ns: true },
  fluxcdKustomizationEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  fluxcdKustomizationCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  fluxcdReceiver:        {breadcrumb: 'Receiver', icon: iconReceiver, ns: false},
  fluxcdReceiverAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  fluxcdReceiverTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  fluxcdReceiverView:     {breadcrumb: 'View', icon: iconReceiver, ns: true },
  fluxcdReceiverEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  fluxcdReceiverCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  fluxcdAlert:        {breadcrumb: 'Alert', icon: iconAlert, ns: false},
  fluxcdAlertAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  fluxcdAlertTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  fluxcdAlertView:     {breadcrumb: 'View', icon: iconAlert, ns: true },
  fluxcdAlertEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  fluxcdAlertCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  fluxcdProvider:        {breadcrumb: 'Provider', icon: iconProvider, ns: false},
  fluxcdProviderAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  fluxcdProviderTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  fluxcdProviderView:     {breadcrumb: 'View', icon: iconProvider, ns: true },
  fluxcdProviderEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  fluxcdProviderCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  fluxcdGitRepository:        {breadcrumb: 'GitRepository', icon: iconGitRepository, ns: false},
  fluxcdGitRepositoryAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  fluxcdGitRepositoryTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  fluxcdGitRepositoryView:     {breadcrumb: 'View', icon: iconGitRepository, ns: true },
  fluxcdGitRepositoryEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  fluxcdGitRepositoryCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  fluxcdBucket:        {breadcrumb: 'Bucket', icon: iconBucket, ns: false},
  fluxcdBucketAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  fluxcdBucketTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  fluxcdBucketView:     {breadcrumb: 'View', icon: iconBucket, ns: true },
  fluxcdBucketEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  fluxcdBucketCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  fluxcdHelmChart:        {breadcrumb: 'HelmChart', icon: iconHelmChart, ns: false},
  fluxcdHelmChartAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  fluxcdHelmChartTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  fluxcdHelmChartView:     {breadcrumb: 'View', icon: iconHelmChart, ns: true },
  fluxcdHelmChartEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  fluxcdHelmChartCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  fluxcdHelmRepository:        {breadcrumb: 'HelmRepository', icon: iconHelmRepository, ns: false},
  fluxcdHelmRepositoryAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  fluxcdHelmRepositoryTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  fluxcdHelmRepositoryView:     {breadcrumb: 'View', icon: iconHelmRepository, ns: true },
  fluxcdHelmRepositoryEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  fluxcdHelmRepositoryCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  fluxcdOCIRepository:        {breadcrumb: 'OCIRepository', icon: iconOCIRepository, ns: false},
  fluxcdOCIRepositoryAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  fluxcdOCIRepositoryTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  fluxcdOCIRepositoryView:     {breadcrumb: 'View', icon: iconOCIRepository, ns: true },
  fluxcdOCIRepositoryEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  fluxcdOCIRepositoryCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  fluxcdImageUpdateAutomation:        {breadcrumb: 'ImageUpdateAutomation', icon: iconImageUpdateAutomation, ns: false},
  fluxcdImageUpdateAutomationAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  fluxcdImageUpdateAutomationTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  fluxcdImageUpdateAutomationView:     {breadcrumb: 'View', icon: iconImageUpdateAutomation, ns: true },
  fluxcdImageUpdateAutomationEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  fluxcdImageUpdateAutomationCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  fluxcdImagePolicy:        {breadcrumb: 'ImagePolicy', icon: iconImagePolicy, ns: false},
  fluxcdImagePolicyAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  fluxcdImagePolicyTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  fluxcdImagePolicyView:     {breadcrumb: 'View', icon: iconImagePolicy, ns: true },
  fluxcdImagePolicyEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  fluxcdImagePolicyCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  fluxcdImageRepository:        {breadcrumb: 'ImageRepository', icon: iconImageRepository, ns: false},
  fluxcdImageRepositoryAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  fluxcdImageRepositoryTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  fluxcdImageRepositoryView:     {breadcrumb: 'View', icon: iconImageRepository, ns: true },
  fluxcdImageRepositoryEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  fluxcdImageRepositoryCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  fluxcdHelmRelease:        {breadcrumb: 'HelmRelease', icon: iconHelmRelease, ns: false},
  fluxcdHelmReleaseAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  fluxcdHelmReleaseTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  fluxcdHelmReleaseView:     {breadcrumb: 'View', icon: iconHelmRelease, ns: true },
  fluxcdHelmReleaseEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  fluxcdHelmReleaseCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
}
export const route = {
  path: 'fluxcd',
  name: 'automationfluxcd',
  redirect: {path: link.link as string},
  children: [
    {
      path: '',
      name: 'automationfluxcdDashboard',
      component: () => import('../../pages/automation/fluxcd/Dashboard.vue'),
    },
    {
      path: 'Kustomization',
      name: 'fluxcdKustomization',
      children: [
        {
          path: '',
          name: 'fluxcdKustomizationAllTable',
          component: () => import('../../pages/automation/fluxcd/KustomizationList.vue'),
        },
        {
          path: ':namespace',
          name: 'fluxcdKustomizationTable',
          component: () => import('../../pages/automation/fluxcd/KustomizationList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'fluxcdKustomizationView',
          component: () => import('../../pages/automation/fluxcd/KustomizationView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'fluxcdKustomizationEdit',
          component: () => import('../../pages/automation/fluxcd/KustomizationEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'fluxcdKustomizationCreate',
          component: () => import('../../pages/automation/fluxcd/KustomizationNew.vue'),
        }
      ]
    },
    {
      path: 'Receiver',
      name: 'fluxcdReceiver',
      children: [
        {
          path: '',
          name: 'fluxcdReceiverAllTable',
          component: () => import('../../pages/automation/fluxcd/ReceiverList.vue'),
        },
        {
          path: ':namespace',
          name: 'fluxcdReceiverTable',
          component: () => import('../../pages/automation/fluxcd/ReceiverList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'fluxcdReceiverView',
          component: () => import('../../pages/automation/fluxcd/ReceiverView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'fluxcdReceiverEdit',
          component: () => import('../../pages/automation/fluxcd/ReceiverEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'fluxcdReceiverCreate',
          component: () => import('../../pages/automation/fluxcd/ReceiverNew.vue'),
        }
      ]
    },
    {
      path: 'Alert',
      name: 'fluxcdAlert',
      children: [
        {
          path: '',
          name: 'fluxcdAlertAllTable',
          component: () => import('../../pages/automation/fluxcd/AlertList.vue'),
        },
        {
          path: ':namespace',
          name: 'fluxcdAlertTable',
          component: () => import('../../pages/automation/fluxcd/AlertList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'fluxcdAlertView',
          component: () => import('../../pages/automation/fluxcd/AlertView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'fluxcdAlertEdit',
          component: () => import('../../pages/automation/fluxcd/AlertEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'fluxcdAlertCreate',
          component: () => import('../../pages/automation/fluxcd/AlertNew.vue'),
        }
      ]
    },
    {
      path: 'Provider',
      name: 'fluxcdProvider',
      children: [
        {
          path: '',
          name: 'fluxcdProviderAllTable',
          component: () => import('../../pages/automation/fluxcd/ProviderList.vue'),
        },
        {
          path: ':namespace',
          name: 'fluxcdProviderTable',
          component: () => import('../../pages/automation/fluxcd/ProviderList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'fluxcdProviderView',
          component: () => import('../../pages/automation/fluxcd/ProviderView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'fluxcdProviderEdit',
          component: () => import('../../pages/automation/fluxcd/ProviderEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'fluxcdProviderCreate',
          component: () => import('../../pages/automation/fluxcd/ProviderNew.vue'),
        }
      ]
    },
    {
      path: 'GitRepository',
      name: 'fluxcdGitRepository',
      children: [
        {
          path: '',
          name: 'fluxcdGitRepositoryAllTable',
          component: () => import('../../pages/automation/fluxcd/GitRepositoryList.vue'),
        },
        {
          path: ':namespace',
          name: 'fluxcdGitRepositoryTable',
          component: () => import('../../pages/automation/fluxcd/GitRepositoryList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'fluxcdGitRepositoryView',
          component: () => import('../../pages/automation/fluxcd/GitRepositoryView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'fluxcdGitRepositoryEdit',
          component: () => import('../../pages/automation/fluxcd/GitRepositoryEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'fluxcdGitRepositoryCreate',
          component: () => import('../../pages/automation/fluxcd/GitRepositoryNew.vue'),
        }
      ]
    },
    {
      path: 'Bucket',
      name: 'fluxcdBucket',
      children: [
        {
          path: '',
          name: 'fluxcdBucketAllTable',
          component: () => import('../../pages/automation/fluxcd/BucketList.vue'),
        },
        {
          path: ':namespace',
          name: 'fluxcdBucketTable',
          component: () => import('../../pages/automation/fluxcd/BucketList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'fluxcdBucketView',
          component: () => import('../../pages/automation/fluxcd/BucketView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'fluxcdBucketEdit',
          component: () => import('../../pages/automation/fluxcd/BucketEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'fluxcdBucketCreate',
          component: () => import('../../pages/automation/fluxcd/BucketNew.vue'),
        }
      ]
    },
    {
      path: 'HelmChart',
      name: 'fluxcdHelmChart',
      children: [
        {
          path: '',
          name: 'fluxcdHelmChartAllTable',
          component: () => import('../../pages/automation/fluxcd/HelmChartList.vue'),
        },
        {
          path: ':namespace',
          name: 'fluxcdHelmChartTable',
          component: () => import('../../pages/automation/fluxcd/HelmChartList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'fluxcdHelmChartView',
          component: () => import('../../pages/automation/fluxcd/HelmChartView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'fluxcdHelmChartEdit',
          component: () => import('../../pages/automation/fluxcd/HelmChartEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'fluxcdHelmChartCreate',
          component: () => import('../../pages/automation/fluxcd/HelmChartNew.vue'),
        }
      ]
    },
    {
      path: 'HelmRepository',
      name: 'fluxcdHelmRepository',
      children: [
        {
          path: '',
          name: 'fluxcdHelmRepositoryAllTable',
          component: () => import('../../pages/automation/fluxcd/HelmRepositoryList.vue'),
        },
        {
          path: ':namespace',
          name: 'fluxcdHelmRepositoryTable',
          component: () => import('../../pages/automation/fluxcd/HelmRepositoryList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'fluxcdHelmRepositoryView',
          component: () => import('../../pages/automation/fluxcd/HelmRepositoryView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'fluxcdHelmRepositoryEdit',
          component: () => import('../../pages/automation/fluxcd/HelmRepositoryEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'fluxcdHelmRepositoryCreate',
          component: () => import('../../pages/automation/fluxcd/HelmRepositoryNew.vue'),
        }
      ]
    },
    {
      path: 'OCIRepository',
      name: 'fluxcdOCIRepository',
      children: [
        {
          path: '',
          name: 'fluxcdOCIRepositoryAllTable',
          component: () => import('../../pages/automation/fluxcd/OCIRepositoryList.vue'),
        },
        {
          path: ':namespace',
          name: 'fluxcdOCIRepositoryTable',
          component: () => import('../../pages/automation/fluxcd/OCIRepositoryList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'fluxcdOCIRepositoryView',
          component: () => import('../../pages/automation/fluxcd/OCIRepositoryView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'fluxcdOCIRepositoryEdit',
          component: () => import('../../pages/automation/fluxcd/OCIRepositoryEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'fluxcdOCIRepositoryCreate',
          component: () => import('../../pages/automation/fluxcd/OCIRepositoryNew.vue'),
        }
      ]
    },
    {
      path: 'ImageUpdateAutomation',
      name: 'fluxcdImageUpdateAutomation',
      children: [
        {
          path: '',
          name: 'fluxcdImageUpdateAutomationAllTable',
          component: () => import('../../pages/automation/fluxcd/ImageUpdateAutomationList.vue'),
        },
        {
          path: ':namespace',
          name: 'fluxcdImageUpdateAutomationTable',
          component: () => import('../../pages/automation/fluxcd/ImageUpdateAutomationList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'fluxcdImageUpdateAutomationView',
          component: () => import('../../pages/automation/fluxcd/ImageUpdateAutomationView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'fluxcdImageUpdateAutomationEdit',
          component: () => import('../../pages/automation/fluxcd/ImageUpdateAutomationEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'fluxcdImageUpdateAutomationCreate',
          component: () => import('../../pages/automation/fluxcd/ImageUpdateAutomationNew.vue'),
        }
      ]
    },
    {
      path: 'ImagePolicy',
      name: 'fluxcdImagePolicy',
      children: [
        {
          path: '',
          name: 'fluxcdImagePolicyAllTable',
          component: () => import('../../pages/automation/fluxcd/ImagePolicyList.vue'),
        },
        {
          path: ':namespace',
          name: 'fluxcdImagePolicyTable',
          component: () => import('../../pages/automation/fluxcd/ImagePolicyList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'fluxcdImagePolicyView',
          component: () => import('../../pages/automation/fluxcd/ImagePolicyView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'fluxcdImagePolicyEdit',
          component: () => import('../../pages/automation/fluxcd/ImagePolicyEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'fluxcdImagePolicyCreate',
          component: () => import('../../pages/automation/fluxcd/ImagePolicyNew.vue'),
        }
      ]
    },
    {
      path: 'ImageRepository',
      name: 'fluxcdImageRepository',
      children: [
        {
          path: '',
          name: 'fluxcdImageRepositoryAllTable',
          component: () => import('../../pages/automation/fluxcd/ImageRepositoryList.vue'),
        },
        {
          path: ':namespace',
          name: 'fluxcdImageRepositoryTable',
          component: () => import('../../pages/automation/fluxcd/ImageRepositoryList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'fluxcdImageRepositoryView',
          component: () => import('../../pages/automation/fluxcd/ImageRepositoryView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'fluxcdImageRepositoryEdit',
          component: () => import('../../pages/automation/fluxcd/ImageRepositoryEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'fluxcdImageRepositoryCreate',
          component: () => import('../../pages/automation/fluxcd/ImageRepositoryNew.vue'),
        }
      ]
    },
    {
      path: 'HelmRelease',
      name: 'fluxcdHelmRelease',
      children: [
        {
          path: '',
          name: 'fluxcdHelmReleaseAllTable',
          component: () => import('../../pages/automation/fluxcd/HelmReleaseList.vue'),
        },
        {
          path: ':namespace',
          name: 'fluxcdHelmReleaseTable',
          component: () => import('../../pages/automation/fluxcd/HelmReleaseList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'fluxcdHelmReleaseView',
          component: () => import('../../pages/automation/fluxcd/HelmReleaseView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'fluxcdHelmReleaseEdit',
          component: () => import('../../pages/automation/fluxcd/HelmReleaseEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'fluxcdHelmReleaseCreate',
          component: () => import('../../pages/automation/fluxcd/HelmReleaseNew.vue'),
        }
      ]
    },
  ],
}
export default route
