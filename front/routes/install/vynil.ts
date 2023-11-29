import { useConfigStore } from '../../stores/config'
import {menuLinksProps} from '../interfaces';
const installRedirect = {path: '/install/vynil/installs/'+useConfigStore().defaultNamespace}
export const link:menuLinksProps = {
  title: 'Vynil', icon: 'album',
  link: installRedirect.path,
  level: 1,
  children: [{
    title: 'Installations', caption: 'Install vynil packages', icon: 'album',
    link: installRedirect.path, level: 2, children: []
  },{
    title: 'Distributions', caption: 'List available applications', icon: 'collections',
    link: '/install/vynil/dists/', level: 2, children: []
  }]
}
export const descriptions = {
  vynil:              {breadcrumb: 'Vynil', icon: 'album', ns: false},
  vynilDashboard:     {breadcrumb: 'Dashboard', icon: 'album', ns: false},
  vynilInstalls:      {breadcrumb: 'Installation', icon: 'album', ns: false},
  vynilInstallTable:  {breadcrumb: 'List', icon: 'list', ns: true},
  vynilInstallView:   {breadcrumb: 'View', icon: 'album', ns: true},
  vynilInstallEdit:   {breadcrumb: 'Edit', icon: 'visibility', ns: true},
  vynilInstallCreate: {breadcrumb: 'Create', icon: 'add', ns: true},
  vynilDistribs:      {breadcrumb: 'Distribution', icon: 'collections', ns: false},
  vynilDistribTable:  {breadcrumb: 'List', icon: 'list', ns: false},
  vynilDistribView:   {breadcrumb: 'View', icon: 'collections', ns: false},
  vynilPackageView:   {breadcrumb: 'View package', icon: 'inventory', ns: false},
  vynilDistribEdit:   {breadcrumb: 'Edit', icon: 'visibility', ns: false},
  vynilDistribCreate: {breadcrumb: 'Create', icon: 'add', ns: false}
}
export const route = {
  path: 'vynil',
  name: 'vynil',
  children: [
    {
      path: '',
      name: 'vynilDashboard',
      component: () => import('../../components/vynil/DashBoard.vue'),
    },
    {
      path: 'installs',
      name: 'vynilInstalls',
      children: [
        {
          path: ':namespace?',
          name: 'vynilInstallTable',
          component: () => import('../../components/vynil/InstallTable.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'vynilInstallView',
          component: () => import('../../components/vynil/InstallView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'vynilInstallEdit',
          component: () => import('../../components/vynil/InstallEdit.vue'),
        }/*,
        {
          path: ':namespace/create',
          name: 'vynilInstallCreate',
          component: () => import('../../components/vynil/InstallCreate.vue'),
        }*/
      ]
    },
    {
      path: 'dists',
      name: 'vynilDistribs',
      children: [
        {
          path: '',
          name: 'vynilDistribTable',
          component: () => import('../../components/vynil/DistribTable.vue'),
        },
        {
          path: ':name/view',
          name: 'vynilDistribView',
          component: () => import('../../components/vynil/DistribView.vue'),
        },
        /*{
          path: ':name/view/:cat/:comp',
          name: 'vynilPackageView',
          component: () => import('../../components/vynil/PackageView.vue'),
        },*/
        {
          path: ':name/edit',
          name: 'vynilDistribEdit',
          component: () => import('../../components/vynil/DistribEdit.vue'),
        },
        {
          path: 'create',
          name: 'vynilDistribCreate',
          component: () => import('../../components/vynil/DistribNew.vue'),
        }
      ]
    },
  ],
}
export default route