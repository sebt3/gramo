import {menuLinksProps} from '../interfaces';
import { iconEndpoints, iconService, iconIngress, iconEndpointSlice,  k8sIcon, k8sTitle }from '../../libs/k8s/custom.js'
import {  } from '../custom.js';
import { useCRDStore } from '../../stores'
const crds = useCRDStore().crds;
export const link:menuLinksProps = {
  name: 'networkk8s',
  title: k8sTitle, icon: k8sIcon,
  link: '/network/k8s/',
  level: 1,
  children: [
  [{
    name: 'k8sEndpointss',
    title: 'Endpoints', caption: 'List Endpoints', icon: iconEndpoints,
    link: '/network/k8s/Endpoints/', level: 2, children: []
  }],
  [{
    name: 'k8sServices',
    title: 'Service', caption: 'List Service', icon: iconService,
    link: '/network/k8s/Service/', level: 2, children: []
  }],
  [{
    name: 'k8sIngresss',
    title: 'Ingress', caption: 'List Ingress', icon: iconIngress,
    link: '/network/k8s/Ingress/', level: 2, children: []
  }],
  [{
    name: 'k8sEndpointSlices',
    title: 'EndpointSlice', caption: 'List EndpointSlice', icon: iconEndpointSlice,
    link: '/network/k8s/EndpointSlice/', level: 2, children: []
  }],
  ].flat()
}
export const descriptions = {
  networkk8s:                {breadcrumb: k8sTitle, icon: k8sIcon, ns: false},
  networkk8sDashboard:       {breadcrumb: 'Dashboard', icon: k8sIcon, ns: false},
  k8sEndpoints:        {breadcrumb: 'Endpoints', icon: iconEndpoints, ns: false},
  k8sEndpointsAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  k8sEndpointsTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  k8sEndpointsView:     {breadcrumb: 'View', icon: iconEndpoints, ns: true },
  k8sEndpointsEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  k8sEndpointsCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  k8sService:        {breadcrumb: 'Service', icon: iconService, ns: false},
  k8sServiceAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  k8sServiceTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  k8sServiceView:     {breadcrumb: 'View', icon: iconService, ns: true },
  k8sServiceEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  k8sServiceCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  k8sIngress:        {breadcrumb: 'Ingress', icon: iconIngress, ns: false},
  k8sIngressAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  k8sIngressTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  k8sIngressView:     {breadcrumb: 'View', icon: iconIngress, ns: true },
  k8sIngressEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  k8sIngressCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  k8sEndpointSlice:        {breadcrumb: 'EndpointSlice', icon: iconEndpointSlice, ns: false},
  k8sEndpointSliceAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  k8sEndpointSliceTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  k8sEndpointSliceView:     {breadcrumb: 'View', icon: iconEndpointSlice, ns: true },
  k8sEndpointSliceEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  k8sEndpointSliceCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
}
export const route = {
  path: 'k8s',
  name: 'networkk8s',
  redirect: {path: link.link as string},
  children: [
    {
      path: '',
      name: 'networkk8sDashboard',
      component: () => import('../../pages/network/k8s/Dashboard.vue'),
    },
    {
      path: 'Endpoints',
      name: 'k8sEndpoints',
      children: [
        {
          path: '',
          name: 'k8sEndpointsAllTable',
          component: () => import('../../pages/network/k8s/EndpointsList.vue'),
        },
        {
          path: ':namespace',
          name: 'k8sEndpointsTable',
          component: () => import('../../pages/network/k8s/EndpointsList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'k8sEndpointsView',
          component: () => import('../../pages/network/k8s/EndpointsView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'k8sEndpointsEdit',
          component: () => import('../../pages/network/k8s/EndpointsEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'k8sEndpointsCreate',
          component: () => import('../../pages/network/k8s/EndpointsNew.vue'),
        }
      ]
    },
    {
      path: 'Service',
      name: 'k8sService',
      children: [
        {
          path: '',
          name: 'k8sServiceAllTable',
          component: () => import('../../pages/network/k8s/ServiceList.vue'),
        },
        {
          path: ':namespace',
          name: 'k8sServiceTable',
          component: () => import('../../pages/network/k8s/ServiceList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'k8sServiceView',
          component: () => import('../../pages/network/k8s/ServiceView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'k8sServiceEdit',
          component: () => import('../../pages/network/k8s/ServiceEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'k8sServiceCreate',
          component: () => import('../../pages/network/k8s/ServiceNew.vue'),
        }
      ]
    },
    {
      path: 'Ingress',
      name: 'k8sIngress',
      children: [
        {
          path: '',
          name: 'k8sIngressAllTable',
          component: () => import('../../pages/network/k8s/IngressList.vue'),
        },
        {
          path: ':namespace',
          name: 'k8sIngressTable',
          component: () => import('../../pages/network/k8s/IngressList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'k8sIngressView',
          component: () => import('../../pages/network/k8s/IngressView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'k8sIngressEdit',
          component: () => import('../../pages/network/k8s/IngressEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'k8sIngressCreate',
          component: () => import('../../pages/network/k8s/IngressNew.vue'),
        }
      ]
    },
    {
      path: 'EndpointSlice',
      name: 'k8sEndpointSlice',
      children: [
        {
          path: '',
          name: 'k8sEndpointSliceAllTable',
          component: () => import('../../pages/network/k8s/EndpointSliceList.vue'),
        },
        {
          path: ':namespace',
          name: 'k8sEndpointSliceTable',
          component: () => import('../../pages/network/k8s/EndpointSliceList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'k8sEndpointSliceView',
          component: () => import('../../pages/network/k8s/EndpointSliceView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'k8sEndpointSliceEdit',
          component: () => import('../../pages/network/k8s/EndpointSliceEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'k8sEndpointSliceCreate',
          component: () => import('../../pages/network/k8s/EndpointSliceNew.vue'),
        }
      ]
    },
  ],
}
export default route
