import {menuLinksProps} from '../interfaces';
const cat = 'automation';
const iconImagePolicy = 'auto_mode';
const iconImageRepository = 'fab fa-docker';
const iconImageUpdateAutomation = 'auto_mode';
export const link:menuLinksProps = {
  title: 'Fluxcd', icon: iconImagePolicy,
  link: `/${cat}/fluxcd/imagepolicies/`,
  level: 1,
  children: [
  {
    title: 'ImagePolicy', caption: 'List imagePolicy', icon: 'auto_mode',
    link: `/${cat}/fluxcd/imagepolicies/`, level: 2, children: []
  },
  {
    title: 'ImageRepository', caption: 'List imageRepository', icon: 'fab fa-docker',
    link: `/${cat}/fluxcd/imagerepositories/`, level: 2, children: []
  },
  {
    title: 'ImageUpdateAutomation', caption: 'List imageUpdateAutomation', icon: 'auto_mode',
    link: `/${cat}/fluxcd/imageupdateautomations/`, level: 2, children: []
  },
  ]
}
export const descriptions = {
  fluxcdImagePolicys:        {breadcrumb: 'ImagePolicy', icon: iconImagePolicy, ns: false},
  fluxcdImagePolicyAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  fluxcdImagePolicyTable:    {breadcrumb: 'List', icon: 'list', ns: true},
  fluxcdImagePolicyView:     {breadcrumb: 'View', icon: iconImagePolicy, ns: true},
  fluxcdImagePolicyEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true},
  fluxcdImagePolicyCreate:   {breadcrumb: 'Create', icon: 'add', ns: true},
  fluxcdImageRepositorys:        {breadcrumb: 'ImageRepository', icon: iconImageRepository, ns: false},
  fluxcdImageRepositoryAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  fluxcdImageRepositoryTable:    {breadcrumb: 'List', icon: 'list', ns: true},
  fluxcdImageRepositoryView:     {breadcrumb: 'View', icon: iconImageRepository, ns: true},
  fluxcdImageRepositoryEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true},
  fluxcdImageRepositoryCreate:   {breadcrumb: 'Create', icon: 'add', ns: true},
  fluxcdImageUpdateAutomations:        {breadcrumb: 'ImageUpdateAutomation', icon: iconImageUpdateAutomation, ns: false},
  fluxcdImageUpdateAutomationAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  fluxcdImageUpdateAutomationTable:    {breadcrumb: 'List', icon: 'list', ns: true},
  fluxcdImageUpdateAutomationView:     {breadcrumb: 'View', icon: iconImageUpdateAutomation, ns: true},
  fluxcdImageUpdateAutomationEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true},
  fluxcdImageUpdateAutomationCreate:   {breadcrumb: 'Create', icon: 'add', ns: true},
}
export const route = {
  path: 'fluxcd',
  name: 'fluxcd',
  children: [
    {
      path: 'imagepolicies',
      name: 'fluxcdImagePolicys',
      children: [
        {
          path: '',
          name: 'fluxcdImagePolicyAllTable',
          component: () => import('../../components/fluxcd/ImagePolicyAllTable.vue'),
        },
        {
          path: ':namespace',
          name: 'fluxcdImagePolicyTable',
          component: () => import('../../components/fluxcd/ImagePolicyTable.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'fluxcdImagePolicyView',
          component: () => import('../../components/fluxcd/ImagePolicyView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'fluxcdImagePolicyEdit',
          component: () => import('../../components/fluxcd/ImagePolicyEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'fluxcdImagePolicyCreate',
          component: () => import('../../components/fluxcd/ImagePolicyNew.vue'),
        }
      ]
    },
    {
      path: 'imagerepositories',
      name: 'fluxcdImageRepositorys',
      children: [
        {
          path: '',
          name: 'fluxcdImageRepositoryAllTable',
          component: () => import('../../components/fluxcd/ImageRepositoryAllTable.vue'),
        },
        {
          path: ':namespace',
          name: 'fluxcdImageRepositoryTable',
          component: () => import('../../components/fluxcd/ImageRepositoryTable.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'fluxcdImageRepositoryView',
          component: () => import('../../components/fluxcd/ImageRepositoryView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'fluxcdImageRepositoryEdit',
          component: () => import('../../components/fluxcd/ImageRepositoryEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'fluxcdImageRepositoryCreate',
          component: () => import('../../components/fluxcd/ImageRepositoryNew.vue'),
        }
      ]
    },
    {
      path: 'imageupdateautomations',
      name: 'fluxcdImageUpdateAutomations',
      children: [
        {
          path: '',
          name: 'fluxcdImageUpdateAutomationAllTable',
          component: () => import('../../components/fluxcd/ImageUpdateAutomationAllTable.vue'),
        },
        {
          path: ':namespace',
          name: 'fluxcdImageUpdateAutomationTable',
          component: () => import('../../components/fluxcd/ImageUpdateAutomationTable.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'fluxcdImageUpdateAutomationView',
          component: () => import('../../components/fluxcd/ImageUpdateAutomationView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'fluxcdImageUpdateAutomationEdit',
          component: () => import('../../components/fluxcd/ImageUpdateAutomationEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'fluxcdImageUpdateAutomationCreate',
          component: () => import('../../components/fluxcd/ImageUpdateAutomationNew.vue'),
        }
      ]
    },
  ],
}
export default route
