import {menuLinksProps} from '../interfaces';
import { iconpostgresql, iconClusterKopfPeering, iconKopfPeering,  zalandoIcon, zalandoTitle }from '../../libs/zalando/custom.js'
import {  } from '../custom.js';
import { useCRDStore } from '../../stores'
const crds = useCRDStore().crds;
export const link:menuLinksProps = {
  name: 'databasezalando',
  title: zalandoTitle, icon: zalandoIcon,
  link: '/database/zalando/',
  level: 1,
  children: [
  crds['postgresqls.acid.zalan.do'] == undefined?[]:[{
    name: 'zalandopostgresqls',
    title: 'postgresql', caption: 'List postgresql', icon: iconpostgresql,
    link: '/database/zalando/postgresql/', level: 2, children: []
  }],
  crds['clusterkopfpeerings.zalando.org'] == undefined?[]:[{
    name: 'zalandoClusterKopfPeerings',
    title: 'ClusterKopfPeering', caption: 'List ClusterKopfPeering', icon: iconClusterKopfPeering,
    link: '/database/zalando/ClusterKopfPeering/', level: 2, children: []
  }],
  crds['kopfpeerings.zalando.org'] == undefined?[]:[{
    name: 'zalandoKopfPeerings',
    title: 'KopfPeering', caption: 'List KopfPeering', icon: iconKopfPeering,
    link: '/database/zalando/KopfPeering/', level: 2, children: []
  }],
  ].flat()
}
export const descriptions = {
  databasezalando:                {breadcrumb: zalandoTitle, icon: zalandoIcon, ns: false},
  databasezalandoDashboard:       {breadcrumb: 'Dashboard', icon: zalandoIcon, ns: false},
  zalandopostgresql:        {breadcrumb: 'postgresql', icon: iconpostgresql, ns: false},
  zalandopostgresqlAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  zalandopostgresqlTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  zalandopostgresqlView:     {breadcrumb: 'View', icon: iconpostgresql, ns: true },
  zalandopostgresqlEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  zalandopostgresqlCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  zalandoClusterKopfPeering:        {breadcrumb: 'ClusterKopfPeering', icon: iconClusterKopfPeering, ns: false},
  zalandoClusterKopfPeeringTable:    {breadcrumb: 'List', icon: 'list', ns: false },
  zalandoClusterKopfPeeringView:     {breadcrumb: 'View', icon: iconClusterKopfPeering, ns: false },
  zalandoClusterKopfPeeringEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: false },
  zalandoClusterKopfPeeringCreate:   {breadcrumb: 'Create', icon: 'add', ns: false },
  zalandoKopfPeering:        {breadcrumb: 'KopfPeering', icon: iconKopfPeering, ns: false},
  zalandoKopfPeeringAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  zalandoKopfPeeringTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  zalandoKopfPeeringView:     {breadcrumb: 'View', icon: iconKopfPeering, ns: true },
  zalandoKopfPeeringEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  zalandoKopfPeeringCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
}
export const route = {
  path: 'zalando',
  name: 'databasezalando',
  redirect: {path: link.link as string},
  children: [
    {
      path: '',
      name: 'databasezalandoDashboard',
      component: () => import('../../pages/database/zalando/Dashboard.vue'),
    },
    {
      path: 'postgresql',
      name: 'zalandopostgresql',
      children: [
        {
          path: '',
          name: 'zalandopostgresqlAllTable',
          component: () => import('../../pages/database/zalando/postgresqlList.vue'),
        },
        {
          path: ':namespace',
          name: 'zalandopostgresqlTable',
          component: () => import('../../pages/database/zalando/postgresqlList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'zalandopostgresqlView',
          component: () => import('../../pages/database/zalando/postgresqlView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'zalandopostgresqlEdit',
          component: () => import('../../pages/database/zalando/postgresqlEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'zalandopostgresqlCreate',
          component: () => import('../../pages/database/zalando/postgresqlNew.vue'),
        }
      ]
    },
    {
      path: 'ClusterKopfPeering',
      name: 'zalandoClusterKopfPeering',
      children: [
        {
          path: '',
          name: 'zalandoClusterKopfPeeringTable',
          component: () => import('../../pages/database/zalando/ClusterKopfPeeringList.vue'),
        },
        {
          path: 'view/:name',
          name: 'zalandoClusterKopfPeeringView',
          component: () => import('../../pages/database/zalando/ClusterKopfPeeringView.vue'),
        },
        {
          path: 'edit/:name',
          name: 'zalandoClusterKopfPeeringEdit',
          component: () => import('../../pages/database/zalando/ClusterKopfPeeringEdit.vue'),
        },
        {
          path: 'create',
          name: 'zalandoClusterKopfPeeringCreate',
          component: () => import('../../pages/database/zalando/ClusterKopfPeeringNew.vue'),
        }
      ]
    },
    {
      path: 'KopfPeering',
      name: 'zalandoKopfPeering',
      children: [
        {
          path: '',
          name: 'zalandoKopfPeeringAllTable',
          component: () => import('../../pages/database/zalando/KopfPeeringList.vue'),
        },
        {
          path: ':namespace',
          name: 'zalandoKopfPeeringTable',
          component: () => import('../../pages/database/zalando/KopfPeeringList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'zalandoKopfPeeringView',
          component: () => import('../../pages/database/zalando/KopfPeeringView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'zalandoKopfPeeringEdit',
          component: () => import('../../pages/database/zalando/KopfPeeringEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'zalandoKopfPeeringCreate',
          component: () => import('../../pages/database/zalando/KopfPeeringNew.vue'),
        }
      ]
    },
  ],
}
export default route
