import {menuLinksProps} from '../interfaces';
const cat = 'automation';
const iconReceiver = 'notifications';
const iconAlert = 'notifications';
const iconProvider = 'notifications';
export const link:menuLinksProps = {
  title: 'Fluxcd', icon: iconReceiver,
  link: `/${cat}/fluxcd/receivers/`,
  level: 1,
  children: [
  {
    title: 'Receiver', caption: 'List receiver', icon: 'notifications',
    link: `/${cat}/fluxcd/receivers/`, level: 2, children: []
  },
  {
    title: 'Alert', caption: 'List alert', icon: 'notifications',
    link: `/${cat}/fluxcd/alerts/`, level: 2, children: []
  },
  {
    title: 'Provider', caption: 'List provider', icon: 'notifications',
    link: `/${cat}/fluxcd/providers/`, level: 2, children: []
  },
  ]
}
export const descriptions = {
  fluxcdReceivers:        {breadcrumb: 'Receiver', icon: iconReceiver, ns: false},
  fluxcdReceiverAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  fluxcdReceiverTable:    {breadcrumb: 'List', icon: 'list', ns: true},
  fluxcdReceiverView:     {breadcrumb: 'View', icon: iconReceiver, ns: true},
  fluxcdReceiverEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true},
  fluxcdReceiverCreate:   {breadcrumb: 'Create', icon: 'add', ns: true},
  fluxcdAlerts:        {breadcrumb: 'Alert', icon: iconAlert, ns: false},
  fluxcdAlertAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  fluxcdAlertTable:    {breadcrumb: 'List', icon: 'list', ns: true},
  fluxcdAlertView:     {breadcrumb: 'View', icon: iconAlert, ns: true},
  fluxcdAlertEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true},
  fluxcdAlertCreate:   {breadcrumb: 'Create', icon: 'add', ns: true},
  fluxcdProviders:        {breadcrumb: 'Provider', icon: iconProvider, ns: false},
  fluxcdProviderAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  fluxcdProviderTable:    {breadcrumb: 'List', icon: 'list', ns: true},
  fluxcdProviderView:     {breadcrumb: 'View', icon: iconProvider, ns: true},
  fluxcdProviderEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true},
  fluxcdProviderCreate:   {breadcrumb: 'Create', icon: 'add', ns: true},
}
export const route = {
  path: 'fluxcd',
  name: 'fluxcd',
  children: [
    {
      path: 'receivers',
      name: 'fluxcdReceivers',
      children: [
        {
          path: '',
          name: 'fluxcdReceiverAllTable',
          component: () => import('../../components/fluxcd/ReceiverAllTable.vue'),
        },
        {
          path: ':namespace',
          name: 'fluxcdReceiverTable',
          component: () => import('../../components/fluxcd/ReceiverTable.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'fluxcdReceiverView',
          component: () => import('../../components/fluxcd/ReceiverView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'fluxcdReceiverEdit',
          component: () => import('../../components/fluxcd/ReceiverEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'fluxcdReceiverCreate',
          component: () => import('../../components/fluxcd/ReceiverNew.vue'),
        }
      ]
    },
    {
      path: 'alerts',
      name: 'fluxcdAlerts',
      children: [
        {
          path: '',
          name: 'fluxcdAlertAllTable',
          component: () => import('../../components/fluxcd/AlertAllTable.vue'),
        },
        {
          path: ':namespace',
          name: 'fluxcdAlertTable',
          component: () => import('../../components/fluxcd/AlertTable.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'fluxcdAlertView',
          component: () => import('../../components/fluxcd/AlertView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'fluxcdAlertEdit',
          component: () => import('../../components/fluxcd/AlertEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'fluxcdAlertCreate',
          component: () => import('../../components/fluxcd/AlertNew.vue'),
        }
      ]
    },
    {
      path: 'providers',
      name: 'fluxcdProviders',
      children: [
        {
          path: '',
          name: 'fluxcdProviderAllTable',
          component: () => import('../../components/fluxcd/ProviderAllTable.vue'),
        },
        {
          path: ':namespace',
          name: 'fluxcdProviderTable',
          component: () => import('../../components/fluxcd/ProviderTable.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'fluxcdProviderView',
          component: () => import('../../components/fluxcd/ProviderView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'fluxcdProviderEdit',
          component: () => import('../../components/fluxcd/ProviderEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'fluxcdProviderCreate',
          component: () => import('../../components/fluxcd/ProviderNew.vue'),
        }
      ]
    },
  ],
}
export default route
