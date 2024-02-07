import {menuLinksProps} from '../interfaces';
import { iconRabbitmqCluster,  rabbitmqIcon, rabbitmqTitle }from '../../libs/rabbitmq/custom.js'
import {  } from '../custom.js';
import { useCRDStore } from '../../stores'
const crds = useCRDStore().crds;
export const link:menuLinksProps = {
  name: 'databaserabbitmq',
  title: rabbitmqTitle, icon: rabbitmqIcon,
  link: '/database/rabbitmq/',
  level: 1,
  children: [
  crds['rabbitmqclusters.rabbitmq.com'] == undefined?[]:[{
    name: 'rabbitmqRabbitmqClusters',
    title: 'RabbitmqCluster', caption: 'List RabbitmqCluster', icon: iconRabbitmqCluster,
    link: '/database/rabbitmq/RabbitmqCluster/', level: 2, children: []
  }],
  ].flat()
}
export const descriptions = {
  databaserabbitmq:                {breadcrumb: rabbitmqTitle, icon: rabbitmqIcon, ns: false},
  databaserabbitmqDashboard:       {breadcrumb: 'Dashboard', icon: rabbitmqIcon, ns: false},
  rabbitmqRabbitmqCluster:        {breadcrumb: 'RabbitmqCluster', icon: iconRabbitmqCluster, ns: false},
  rabbitmqRabbitmqClusterAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  rabbitmqRabbitmqClusterTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  rabbitmqRabbitmqClusterView:     {breadcrumb: 'View', icon: iconRabbitmqCluster, ns: true },
  rabbitmqRabbitmqClusterEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  rabbitmqRabbitmqClusterCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
}
export const route = {
  path: 'rabbitmq',
  name: 'databaserabbitmq',
  redirect: {path: link.link as string},
  children: [
    {
      path: '',
      name: 'databaserabbitmqDashboard',
      component: () => import('../../pages/database/rabbitmq/Dashboard.vue'),
    },
    {
      path: 'RabbitmqCluster',
      name: 'rabbitmqRabbitmqCluster',
      children: [
        {
          path: '',
          name: 'rabbitmqRabbitmqClusterAllTable',
          component: () => import('../../pages/database/rabbitmq/RabbitmqClusterList.vue'),
        },
        {
          path: ':namespace',
          name: 'rabbitmqRabbitmqClusterTable',
          component: () => import('../../pages/database/rabbitmq/RabbitmqClusterList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'rabbitmqRabbitmqClusterView',
          component: () => import('../../pages/database/rabbitmq/RabbitmqClusterView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'rabbitmqRabbitmqClusterEdit',
          component: () => import('../../pages/database/rabbitmq/RabbitmqClusterEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'rabbitmqRabbitmqClusterCreate',
          component: () => import('../../pages/database/rabbitmq/RabbitmqClusterNew.vue'),
        }
      ]
    },
  ],
}
export default route
