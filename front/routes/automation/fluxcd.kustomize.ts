import {menuLinksProps} from '../interfaces';
const cat = 'automation';
const iconKustomization = 'album';
export const link:menuLinksProps = {
  title: 'Fluxcd', icon: iconKustomization,
  link: `/${cat}/fluxcd/kustomizations/`,
  level: 1,
  children: [
  {
    title: 'Kustomization', caption: 'List kustomization', icon: 'album',
    link: `/${cat}/fluxcd/kustomizations/`, level: 2, children: []
  },
  ]
}
export const descriptions = {
  fluxcdKustomizations:        {breadcrumb: 'Kustomization', icon: iconKustomization, ns: false},
  fluxcdKustomizationAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  fluxcdKustomizationTable:    {breadcrumb: 'List', icon: 'list', ns: true},
  fluxcdKustomizationView:     {breadcrumb: 'View', icon: iconKustomization, ns: true},
  fluxcdKustomizationEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true},
  fluxcdKustomizationCreate:   {breadcrumb: 'Create', icon: 'add', ns: true},
}
export const route = {
  path: 'fluxcd',
  name: 'fluxcd',
  children: [
    {
      path: 'kustomizations',
      name: 'fluxcdKustomizations',
      children: [
        {
          path: '',
          name: 'fluxcdKustomizationAllTable',
          component: () => import('../../components/fluxcd/KustomizationAllTable.vue'),
        },
        {
          path: ':namespace',
          name: 'fluxcdKustomizationTable',
          component: () => import('../../components/fluxcd/KustomizationTable.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'fluxcdKustomizationView',
          component: () => import('../../components/fluxcd/KustomizationView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'fluxcdKustomizationEdit',
          component: () => import('../../components/fluxcd/KustomizationEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'fluxcdKustomizationCreate',
          component: () => import('../../components/fluxcd/KustomizationNew.vue'),
        }
      ]
    },
  ],
}
export default route
