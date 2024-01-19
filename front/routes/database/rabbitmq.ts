import {menuLinksProps} from '../interfaces';
const cat = 'database';
const iconRabbitmqCluster = 'album';
export const link:menuLinksProps = {
  name: 'rabbitmq',
  title: 'Rabbitmq', icon: iconRabbitmqCluster,
  link: `/${cat}/rabbitmq/rabbitmqclusters/`,
  level: 1,
  children: [
  {
    name: 'rabbitmqRabbitmqClusters',
    title: 'RabbitmqCluster', caption: 'List rabbitmqCluster', icon: iconRabbitmqCluster,
    link: `/${cat}/rabbitmq/rabbitmqclusters/`, level: 2, children: []
  },
  ]
}
export const descriptions = {
  rabbitmq:                {breadcrumb: 'Rabbitmq', icon: iconRabbitmqCluster, ns: false},
  rabbitmqRabbitmqClusters:        {breadcrumb: 'RabbitmqCluster', icon: iconRabbitmqCluster, ns: false},
  rabbitmqRabbitmqClusterAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  rabbitmqRabbitmqClusterTable:    {breadcrumb: 'List', icon: 'list', ns: true},
  rabbitmqRabbitmqClusterView:     {breadcrumb: 'View', icon: iconRabbitmqCluster, ns: true},
  rabbitmqRabbitmqClusterEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true},
  rabbitmqRabbitmqClusterCreate:   {breadcrumb: 'Create', icon: 'add', ns: true},
}
export const route = {
  path: 'rabbitmq',
  name: 'rabbitmq',
  redirect: {path: link.link as string},
  children: [
    {
      path: 'rabbitmqclusters',
      name: 'rabbitmqRabbitmqClusters',
      children: [
        {
          path: '',
          name: 'rabbitmqRabbitmqClusterAllTable',
          component: () => import('../../components/rabbitmq/RabbitmqClusterAllTable.vue'),
        },
        {
          path: ':namespace',
          name: 'rabbitmqRabbitmqClusterTable',
          component: () => import('../../components/rabbitmq/RabbitmqClusterTable.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'rabbitmqRabbitmqClusterView',
          component: () => import('../../components/rabbitmq/RabbitmqClusterView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'rabbitmqRabbitmqClusterEdit',
          component: () => import('../../components/rabbitmq/RabbitmqClusterEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'rabbitmqRabbitmqClusterCreate',
          component: () => import('../../components/rabbitmq/RabbitmqClusterNew.vue'),
        }
      ]
    },
  ],
}
export default route
