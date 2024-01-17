import {menuLinksProps} from '../interfaces';
const cat = 'automation';
const iconGitRepository = 'storage';
const iconBucket = 'storage';
const iconHelmChart = 'album';
const iconHelmRepository = 'storage';
const iconOCIRepository = 'storage';
export const link:menuLinksProps = {
  title: 'Fluxcd', icon: iconGitRepository,
  link: `/${cat}/fluxcd/gitrepositories/`,
  level: 1,
  children: [
  {
    title: 'GitRepository', caption: 'List gitRepository', icon: 'storage',
    link: `/${cat}/fluxcd/gitrepositories/`, level: 2, children: []
  },
  {
    title: 'Bucket', caption: 'List bucket', icon: 'storage',
    link: `/${cat}/fluxcd/buckets/`, level: 2, children: []
  },
  {
    title: 'HelmChart', caption: 'List helmChart', icon: 'album',
    link: `/${cat}/fluxcd/helmcharts/`, level: 2, children: []
  },
  {
    title: 'HelmRepository', caption: 'List helmRepository', icon: 'storage',
    link: `/${cat}/fluxcd/helmrepositories/`, level: 2, children: []
  },
  {
    title: 'OCIRepository', caption: 'List oCIRepository', icon: 'storage',
    link: `/${cat}/fluxcd/ocirepositories/`, level: 2, children: []
  },
  ]
}
export const descriptions = {
  fluxcdGitRepositorys:        {breadcrumb: 'GitRepository', icon: iconGitRepository, ns: false},
  fluxcdGitRepositoryAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  fluxcdGitRepositoryTable:    {breadcrumb: 'List', icon: 'list', ns: true},
  fluxcdGitRepositoryView:     {breadcrumb: 'View', icon: iconGitRepository, ns: true},
  fluxcdGitRepositoryEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true},
  fluxcdGitRepositoryCreate:   {breadcrumb: 'Create', icon: 'add', ns: true},
  fluxcdBuckets:        {breadcrumb: 'Bucket', icon: iconBucket, ns: false},
  fluxcdBucketAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  fluxcdBucketTable:    {breadcrumb: 'List', icon: 'list', ns: true},
  fluxcdBucketView:     {breadcrumb: 'View', icon: iconBucket, ns: true},
  fluxcdBucketEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true},
  fluxcdBucketCreate:   {breadcrumb: 'Create', icon: 'add', ns: true},
  fluxcdHelmCharts:        {breadcrumb: 'HelmChart', icon: iconHelmChart, ns: false},
  fluxcdHelmChartAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  fluxcdHelmChartTable:    {breadcrumb: 'List', icon: 'list', ns: true},
  fluxcdHelmChartView:     {breadcrumb: 'View', icon: iconHelmChart, ns: true},
  fluxcdHelmChartEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true},
  fluxcdHelmChartCreate:   {breadcrumb: 'Create', icon: 'add', ns: true},
  fluxcdHelmRepositorys:        {breadcrumb: 'HelmRepository', icon: iconHelmRepository, ns: false},
  fluxcdHelmRepositoryAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  fluxcdHelmRepositoryTable:    {breadcrumb: 'List', icon: 'list', ns: true},
  fluxcdHelmRepositoryView:     {breadcrumb: 'View', icon: iconHelmRepository, ns: true},
  fluxcdHelmRepositoryEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true},
  fluxcdHelmRepositoryCreate:   {breadcrumb: 'Create', icon: 'add', ns: true},
  fluxcdOCIRepositorys:        {breadcrumb: 'OCIRepository', icon: iconOCIRepository, ns: false},
  fluxcdOCIRepositoryAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  fluxcdOCIRepositoryTable:    {breadcrumb: 'List', icon: 'list', ns: true},
  fluxcdOCIRepositoryView:     {breadcrumb: 'View', icon: iconOCIRepository, ns: true},
  fluxcdOCIRepositoryEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true},
  fluxcdOCIRepositoryCreate:   {breadcrumb: 'Create', icon: 'add', ns: true},
}
export const route = {
  path: 'fluxcd',
  name: 'fluxcd',
  children: [
    {
      path: 'gitrepositories',
      name: 'fluxcdGitRepositorys',
      children: [
        {
          path: '',
          name: 'fluxcdGitRepositoryAllTable',
          component: () => import('../../components/fluxcd/GitRepositoryAllTable.vue'),
        },
        {
          path: ':namespace',
          name: 'fluxcdGitRepositoryTable',
          component: () => import('../../components/fluxcd/GitRepositoryTable.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'fluxcdGitRepositoryView',
          component: () => import('../../components/fluxcd/GitRepositoryView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'fluxcdGitRepositoryEdit',
          component: () => import('../../components/fluxcd/GitRepositoryEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'fluxcdGitRepositoryCreate',
          component: () => import('../../components/fluxcd/GitRepositoryNew.vue'),
        }
      ]
    },
    {
      path: 'buckets',
      name: 'fluxcdBuckets',
      children: [
        {
          path: '',
          name: 'fluxcdBucketAllTable',
          component: () => import('../../components/fluxcd/BucketAllTable.vue'),
        },
        {
          path: ':namespace',
          name: 'fluxcdBucketTable',
          component: () => import('../../components/fluxcd/BucketTable.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'fluxcdBucketView',
          component: () => import('../../components/fluxcd/BucketView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'fluxcdBucketEdit',
          component: () => import('../../components/fluxcd/BucketEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'fluxcdBucketCreate',
          component: () => import('../../components/fluxcd/BucketNew.vue'),
        }
      ]
    },
    {
      path: 'helmcharts',
      name: 'fluxcdHelmCharts',
      children: [
        {
          path: '',
          name: 'fluxcdHelmChartAllTable',
          component: () => import('../../components/fluxcd/HelmChartAllTable.vue'),
        },
        {
          path: ':namespace',
          name: 'fluxcdHelmChartTable',
          component: () => import('../../components/fluxcd/HelmChartTable.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'fluxcdHelmChartView',
          component: () => import('../../components/fluxcd/HelmChartView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'fluxcdHelmChartEdit',
          component: () => import('../../components/fluxcd/HelmChartEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'fluxcdHelmChartCreate',
          component: () => import('../../components/fluxcd/HelmChartNew.vue'),
        }
      ]
    },
    {
      path: 'helmrepositories',
      name: 'fluxcdHelmRepositorys',
      children: [
        {
          path: '',
          name: 'fluxcdHelmRepositoryAllTable',
          component: () => import('../../components/fluxcd/HelmRepositoryAllTable.vue'),
        },
        {
          path: ':namespace',
          name: 'fluxcdHelmRepositoryTable',
          component: () => import('../../components/fluxcd/HelmRepositoryTable.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'fluxcdHelmRepositoryView',
          component: () => import('../../components/fluxcd/HelmRepositoryView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'fluxcdHelmRepositoryEdit',
          component: () => import('../../components/fluxcd/HelmRepositoryEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'fluxcdHelmRepositoryCreate',
          component: () => import('../../components/fluxcd/HelmRepositoryNew.vue'),
        }
      ]
    },
    {
      path: 'ocirepositories',
      name: 'fluxcdOCIRepositorys',
      children: [
        {
          path: '',
          name: 'fluxcdOCIRepositoryAllTable',
          component: () => import('../../components/fluxcd/OCIRepositoryAllTable.vue'),
        },
        {
          path: ':namespace',
          name: 'fluxcdOCIRepositoryTable',
          component: () => import('../../components/fluxcd/OCIRepositoryTable.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'fluxcdOCIRepositoryView',
          component: () => import('../../components/fluxcd/OCIRepositoryView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'fluxcdOCIRepositoryEdit',
          component: () => import('../../components/fluxcd/OCIRepositoryEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'fluxcdOCIRepositoryCreate',
          component: () => import('../../components/fluxcd/OCIRepositoryNew.vue'),
        }
      ]
    },
  ],
}
export default route
