import {menuLinksProps} from '../interfaces';
import { iconConfigMap, iconSecret,  k8sIcon, k8sTitle }from '../../libs/k8s/custom.js'
import {  } from '../custom.js';
import { useCRDStore } from '../../stores'
const crds = useCRDStore().crds;
export const link:menuLinksProps = {
  name: 'configk8s',
  title: k8sTitle, icon: k8sIcon,
  link: '/config/k8s/',
  level: 1,
  children: [
  [{
    name: 'k8sConfigMaps',
    title: 'ConfigMap', caption: 'List ConfigMap', icon: iconConfigMap,
    link: '/config/k8s/ConfigMap/', level: 2, children: []
  }],
  [{
    name: 'k8sSecrets',
    title: 'Secret', caption: 'List Secret', icon: iconSecret,
    link: '/config/k8s/Secret/', level: 2, children: []
  }],
  ].flat()
}
export const descriptions = {
  configk8s:                {breadcrumb: k8sTitle, icon: k8sIcon, ns: false},
  configk8sDashboard:       {breadcrumb: 'Dashboard', icon: k8sIcon, ns: false},
  k8sConfigMap:        {breadcrumb: 'ConfigMap', icon: iconConfigMap, ns: false},
  k8sConfigMapAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  k8sConfigMapTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  k8sConfigMapView:     {breadcrumb: 'View', icon: iconConfigMap, ns: true },
  k8sConfigMapEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  k8sConfigMapCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  k8sSecret:        {breadcrumb: 'Secret', icon: iconSecret, ns: false},
  k8sSecretAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  k8sSecretTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  k8sSecretView:     {breadcrumb: 'View', icon: iconSecret, ns: true },
  k8sSecretEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  k8sSecretCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
}
export const route = {
  path: 'k8s',
  name: 'configk8s',
  redirect: {path: link.link as string},
  children: [
    {
      path: '',
      name: 'configk8sDashboard',
      component: () => import('../../pages/config/k8s/Dashboard.vue'),
    },
    {
      path: 'ConfigMap',
      name: 'k8sConfigMap',
      children: [
        {
          path: '',
          name: 'k8sConfigMapAllTable',
          component: () => import('../../pages/config/k8s/ConfigMapList.vue'),
        },
        {
          path: ':namespace',
          name: 'k8sConfigMapTable',
          component: () => import('../../pages/config/k8s/ConfigMapList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'k8sConfigMapView',
          component: () => import('../../pages/config/k8s/ConfigMapView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'k8sConfigMapEdit',
          component: () => import('../../pages/config/k8s/ConfigMapEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'k8sConfigMapCreate',
          component: () => import('../../pages/config/k8s/ConfigMapNew.vue'),
        }
      ]
    },
    {
      path: 'Secret',
      name: 'k8sSecret',
      children: [
        {
          path: '',
          name: 'k8sSecretAllTable',
          component: () => import('../../pages/config/k8s/SecretList.vue'),
        },
        {
          path: ':namespace',
          name: 'k8sSecretTable',
          component: () => import('../../pages/config/k8s/SecretList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'k8sSecretView',
          component: () => import('../../pages/config/k8s/SecretView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'k8sSecretEdit',
          component: () => import('../../pages/config/k8s/SecretEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'k8sSecretCreate',
          component: () => import('../../pages/config/k8s/SecretNew.vue'),
        }
      ]
    },
  ],
}
export default route
