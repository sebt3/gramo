import {menuLinksProps} from '../interfaces';
import { iconDistrib, iconInstall,  vynilIcon, vynilTitle }from '../../libs/vynil/custom.js'
import {  } from '../custom.js';
import { useCRDStore } from '../../stores'
const crds = useCRDStore().crds;
export const link:menuLinksProps = {
  name: 'installvynil',
  title: vynilTitle, icon: vynilIcon,
  link: '/install/vynil/',
  level: 1,
  children: [
  crds['distribs.vynil.solidite.fr'] == undefined?[]:[{
    name: 'vynilDistribs',
    title: 'Distrib', caption: 'List Distrib', icon: iconDistrib,
    link: '/install/vynil/Distrib/', level: 2, children: []
  }],
  crds['installs.vynil.solidite.fr'] == undefined?[]:[{
    name: 'vynilInstalls',
    title: 'Install', caption: 'List Install', icon: iconInstall,
    link: '/install/vynil/Install/', level: 2, children: []
  }],
  ].flat()
}
export const descriptions = {
  installvynil:                {breadcrumb: vynilTitle, icon: vynilIcon, ns: false},
  installvynilDashboard:       {breadcrumb: 'Dashboard', icon: vynilIcon, ns: false},
  vynilDistrib:        {breadcrumb: 'Distrib', icon: iconDistrib, ns: false},
  vynilDistribTable:    {breadcrumb: 'List', icon: 'list', ns: false },
  vynilDistribView:     {breadcrumb: 'View', icon: iconDistrib, ns: false },
  vynilDistribEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: false },
  vynilDistribCreate:   {breadcrumb: 'Create', icon: 'add', ns: false },
  vynilInstall:        {breadcrumb: 'Install', icon: iconInstall, ns: false},
  vynilInstallAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  vynilInstallTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  vynilInstallView:     {breadcrumb: 'View', icon: iconInstall, ns: true },
  vynilInstallEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  vynilInstallCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
}
export const route = {
  path: 'vynil',
  name: 'installvynil',
  redirect: {path: link.link as string},
  children: [
    {
      path: '',
      name: 'installvynilDashboard',
      component: () => import('../../pages/install/vynil/Dashboard.vue'),
    },
    {
      path: 'Distrib',
      name: 'vynilDistrib',
      children: [
        {
          path: '',
          name: 'vynilDistribTable',
          component: () => import('../../pages/install/vynil/DistribList.vue'),
        },
        {
          path: 'view/:name',
          name: 'vynilDistribView',
          component: () => import('../../pages/install/vynil/DistribView.vue'),
        },
        {
          path: 'edit/:name',
          name: 'vynilDistribEdit',
          component: () => import('../../pages/install/vynil/DistribEdit.vue'),
        },
        {
          path: 'create',
          name: 'vynilDistribCreate',
          component: () => import('../../pages/install/vynil/DistribNew.vue'),
        }
      ]
    },
    {
      path: 'Install',
      name: 'vynilInstall',
      children: [
        {
          path: '',
          name: 'vynilInstallAllTable',
          component: () => import('../../pages/install/vynil/InstallList.vue'),
        },
        {
          path: ':namespace',
          name: 'vynilInstallTable',
          component: () => import('../../pages/install/vynil/InstallList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'vynilInstallView',
          component: () => import('../../pages/install/vynil/InstallView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'vynilInstallEdit',
          component: () => import('../../pages/install/vynil/InstallEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'vynilInstallCreate',
          component: () => import('../../pages/install/vynil/InstallNew.vue'),
        }
      ]
    },
  ],
}
export default route
