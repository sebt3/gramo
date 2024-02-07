import {menuLinksProps} from '../interfaces';
import { iconIngressRoute, iconIngressRouteTCP, iconIngressRouteUDP, iconMiddleware, iconMiddlewareTCP, iconServersTransport, iconTLSOption, iconTLSStore, iconTraefikService,  traefikIcon, traefikTitle }from '../../libs/traefik/custom.js'
import {  } from '../custom.js';
import { useCRDStore } from '../../stores'
const crds = useCRDStore().crds;
export const link:menuLinksProps = {
  name: 'networktraefik',
  title: traefikTitle, icon: traefikIcon,
  link: '/network/traefik/',
  level: 1,
  children: [
  crds['ingressroutes.traefik.io'] == undefined?[]:[{
    name: 'traefikIngressRoutes',
    title: 'IngressRoute', caption: 'List IngressRoute', icon: iconIngressRoute,
    link: '/network/traefik/IngressRoute/', level: 2, children: []
  }],
  crds['ingressroutetcps.traefik.io'] == undefined?[]:[{
    name: 'traefikIngressRouteTCPs',
    title: 'IngressRouteTCP', caption: 'List IngressRouteTCP', icon: iconIngressRouteTCP,
    link: '/network/traefik/IngressRouteTCP/', level: 2, children: []
  }],
  crds['ingressrouteudps.traefik.io'] == undefined?[]:[{
    name: 'traefikIngressRouteUDPs',
    title: 'IngressRouteUDP', caption: 'List IngressRouteUDP', icon: iconIngressRouteUDP,
    link: '/network/traefik/IngressRouteUDP/', level: 2, children: []
  }],
  crds['middlewares.traefik.io'] == undefined?[]:[{
    name: 'traefikMiddlewares',
    title: 'Middleware', caption: 'List Middleware', icon: iconMiddleware,
    link: '/network/traefik/Middleware/', level: 2, children: []
  }],
  crds['middlewaretcps.traefik.io'] == undefined?[]:[{
    name: 'traefikMiddlewareTCPs',
    title: 'MiddlewareTCP', caption: 'List MiddlewareTCP', icon: iconMiddlewareTCP,
    link: '/network/traefik/MiddlewareTCP/', level: 2, children: []
  }],
  crds['serverstransports.traefik.io'] == undefined?[]:[{
    name: 'traefikServersTransports',
    title: 'ServersTransport', caption: 'List ServersTransport', icon: iconServersTransport,
    link: '/network/traefik/ServersTransport/', level: 2, children: []
  }],
  crds['tlsoptions.traefik.io'] == undefined?[]:[{
    name: 'traefikTLSOptions',
    title: 'TLSOption', caption: 'List TLSOption', icon: iconTLSOption,
    link: '/network/traefik/TLSOption/', level: 2, children: []
  }],
  crds['tlsstores.traefik.io'] == undefined?[]:[{
    name: 'traefikTLSStores',
    title: 'TLSStore', caption: 'List TLSStore', icon: iconTLSStore,
    link: '/network/traefik/TLSStore/', level: 2, children: []
  }],
  crds['traefikservices.traefik.io'] == undefined?[]:[{
    name: 'traefikTraefikServices',
    title: 'TraefikService', caption: 'List TraefikService', icon: iconTraefikService,
    link: '/network/traefik/TraefikService/', level: 2, children: []
  }],
  ].flat()
}
export const descriptions = {
  networktraefik:                {breadcrumb: traefikTitle, icon: traefikIcon, ns: false},
  networktraefikDashboard:       {breadcrumb: 'Dashboard', icon: traefikIcon, ns: false},
  traefikIngressRoute:        {breadcrumb: 'IngressRoute', icon: iconIngressRoute, ns: false},
  traefikIngressRouteAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  traefikIngressRouteTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  traefikIngressRouteView:     {breadcrumb: 'View', icon: iconIngressRoute, ns: true },
  traefikIngressRouteEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  traefikIngressRouteCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  traefikIngressRouteTCP:        {breadcrumb: 'IngressRouteTCP', icon: iconIngressRouteTCP, ns: false},
  traefikIngressRouteTCPAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  traefikIngressRouteTCPTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  traefikIngressRouteTCPView:     {breadcrumb: 'View', icon: iconIngressRouteTCP, ns: true },
  traefikIngressRouteTCPEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  traefikIngressRouteTCPCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  traefikIngressRouteUDP:        {breadcrumb: 'IngressRouteUDP', icon: iconIngressRouteUDP, ns: false},
  traefikIngressRouteUDPAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  traefikIngressRouteUDPTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  traefikIngressRouteUDPView:     {breadcrumb: 'View', icon: iconIngressRouteUDP, ns: true },
  traefikIngressRouteUDPEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  traefikIngressRouteUDPCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  traefikMiddleware:        {breadcrumb: 'Middleware', icon: iconMiddleware, ns: false},
  traefikMiddlewareAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  traefikMiddlewareTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  traefikMiddlewareView:     {breadcrumb: 'View', icon: iconMiddleware, ns: true },
  traefikMiddlewareEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  traefikMiddlewareCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  traefikMiddlewareTCP:        {breadcrumb: 'MiddlewareTCP', icon: iconMiddlewareTCP, ns: false},
  traefikMiddlewareTCPAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  traefikMiddlewareTCPTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  traefikMiddlewareTCPView:     {breadcrumb: 'View', icon: iconMiddlewareTCP, ns: true },
  traefikMiddlewareTCPEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  traefikMiddlewareTCPCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  traefikServersTransport:        {breadcrumb: 'ServersTransport', icon: iconServersTransport, ns: false},
  traefikServersTransportAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  traefikServersTransportTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  traefikServersTransportView:     {breadcrumb: 'View', icon: iconServersTransport, ns: true },
  traefikServersTransportEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  traefikServersTransportCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  traefikTLSOption:        {breadcrumb: 'TLSOption', icon: iconTLSOption, ns: false},
  traefikTLSOptionAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  traefikTLSOptionTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  traefikTLSOptionView:     {breadcrumb: 'View', icon: iconTLSOption, ns: true },
  traefikTLSOptionEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  traefikTLSOptionCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  traefikTLSStore:        {breadcrumb: 'TLSStore', icon: iconTLSStore, ns: false},
  traefikTLSStoreAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  traefikTLSStoreTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  traefikTLSStoreView:     {breadcrumb: 'View', icon: iconTLSStore, ns: true },
  traefikTLSStoreEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  traefikTLSStoreCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  traefikTraefikService:        {breadcrumb: 'TraefikService', icon: iconTraefikService, ns: false},
  traefikTraefikServiceAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  traefikTraefikServiceTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  traefikTraefikServiceView:     {breadcrumb: 'View', icon: iconTraefikService, ns: true },
  traefikTraefikServiceEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  traefikTraefikServiceCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
}
export const route = {
  path: 'traefik',
  name: 'networktraefik',
  redirect: {path: link.link as string},
  children: [
    {
      path: '',
      name: 'networktraefikDashboard',
      component: () => import('../../pages/network/traefik/Dashboard.vue'),
    },
    {
      path: 'IngressRoute',
      name: 'traefikIngressRoute',
      children: [
        {
          path: '',
          name: 'traefikIngressRouteAllTable',
          component: () => import('../../pages/network/traefik/IngressRouteList.vue'),
        },
        {
          path: ':namespace',
          name: 'traefikIngressRouteTable',
          component: () => import('../../pages/network/traefik/IngressRouteList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'traefikIngressRouteView',
          component: () => import('../../pages/network/traefik/IngressRouteView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'traefikIngressRouteEdit',
          component: () => import('../../pages/network/traefik/IngressRouteEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'traefikIngressRouteCreate',
          component: () => import('../../pages/network/traefik/IngressRouteNew.vue'),
        }
      ]
    },
    {
      path: 'IngressRouteTCP',
      name: 'traefikIngressRouteTCP',
      children: [
        {
          path: '',
          name: 'traefikIngressRouteTCPAllTable',
          component: () => import('../../pages/network/traefik/IngressRouteTCPList.vue'),
        },
        {
          path: ':namespace',
          name: 'traefikIngressRouteTCPTable',
          component: () => import('../../pages/network/traefik/IngressRouteTCPList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'traefikIngressRouteTCPView',
          component: () => import('../../pages/network/traefik/IngressRouteTCPView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'traefikIngressRouteTCPEdit',
          component: () => import('../../pages/network/traefik/IngressRouteTCPEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'traefikIngressRouteTCPCreate',
          component: () => import('../../pages/network/traefik/IngressRouteTCPNew.vue'),
        }
      ]
    },
    {
      path: 'IngressRouteUDP',
      name: 'traefikIngressRouteUDP',
      children: [
        {
          path: '',
          name: 'traefikIngressRouteUDPAllTable',
          component: () => import('../../pages/network/traefik/IngressRouteUDPList.vue'),
        },
        {
          path: ':namespace',
          name: 'traefikIngressRouteUDPTable',
          component: () => import('../../pages/network/traefik/IngressRouteUDPList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'traefikIngressRouteUDPView',
          component: () => import('../../pages/network/traefik/IngressRouteUDPView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'traefikIngressRouteUDPEdit',
          component: () => import('../../pages/network/traefik/IngressRouteUDPEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'traefikIngressRouteUDPCreate',
          component: () => import('../../pages/network/traefik/IngressRouteUDPNew.vue'),
        }
      ]
    },
    {
      path: 'Middleware',
      name: 'traefikMiddleware',
      children: [
        {
          path: '',
          name: 'traefikMiddlewareAllTable',
          component: () => import('../../pages/network/traefik/MiddlewareList.vue'),
        },
        {
          path: ':namespace',
          name: 'traefikMiddlewareTable',
          component: () => import('../../pages/network/traefik/MiddlewareList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'traefikMiddlewareView',
          component: () => import('../../pages/network/traefik/MiddlewareView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'traefikMiddlewareEdit',
          component: () => import('../../pages/network/traefik/MiddlewareEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'traefikMiddlewareCreate',
          component: () => import('../../pages/network/traefik/MiddlewareNew.vue'),
        }
      ]
    },
    {
      path: 'MiddlewareTCP',
      name: 'traefikMiddlewareTCP',
      children: [
        {
          path: '',
          name: 'traefikMiddlewareTCPAllTable',
          component: () => import('../../pages/network/traefik/MiddlewareTCPList.vue'),
        },
        {
          path: ':namespace',
          name: 'traefikMiddlewareTCPTable',
          component: () => import('../../pages/network/traefik/MiddlewareTCPList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'traefikMiddlewareTCPView',
          component: () => import('../../pages/network/traefik/MiddlewareTCPView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'traefikMiddlewareTCPEdit',
          component: () => import('../../pages/network/traefik/MiddlewareTCPEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'traefikMiddlewareTCPCreate',
          component: () => import('../../pages/network/traefik/MiddlewareTCPNew.vue'),
        }
      ]
    },
    {
      path: 'ServersTransport',
      name: 'traefikServersTransport',
      children: [
        {
          path: '',
          name: 'traefikServersTransportAllTable',
          component: () => import('../../pages/network/traefik/ServersTransportList.vue'),
        },
        {
          path: ':namespace',
          name: 'traefikServersTransportTable',
          component: () => import('../../pages/network/traefik/ServersTransportList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'traefikServersTransportView',
          component: () => import('../../pages/network/traefik/ServersTransportView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'traefikServersTransportEdit',
          component: () => import('../../pages/network/traefik/ServersTransportEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'traefikServersTransportCreate',
          component: () => import('../../pages/network/traefik/ServersTransportNew.vue'),
        }
      ]
    },
    {
      path: 'TLSOption',
      name: 'traefikTLSOption',
      children: [
        {
          path: '',
          name: 'traefikTLSOptionAllTable',
          component: () => import('../../pages/network/traefik/TLSOptionList.vue'),
        },
        {
          path: ':namespace',
          name: 'traefikTLSOptionTable',
          component: () => import('../../pages/network/traefik/TLSOptionList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'traefikTLSOptionView',
          component: () => import('../../pages/network/traefik/TLSOptionView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'traefikTLSOptionEdit',
          component: () => import('../../pages/network/traefik/TLSOptionEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'traefikTLSOptionCreate',
          component: () => import('../../pages/network/traefik/TLSOptionNew.vue'),
        }
      ]
    },
    {
      path: 'TLSStore',
      name: 'traefikTLSStore',
      children: [
        {
          path: '',
          name: 'traefikTLSStoreAllTable',
          component: () => import('../../pages/network/traefik/TLSStoreList.vue'),
        },
        {
          path: ':namespace',
          name: 'traefikTLSStoreTable',
          component: () => import('../../pages/network/traefik/TLSStoreList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'traefikTLSStoreView',
          component: () => import('../../pages/network/traefik/TLSStoreView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'traefikTLSStoreEdit',
          component: () => import('../../pages/network/traefik/TLSStoreEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'traefikTLSStoreCreate',
          component: () => import('../../pages/network/traefik/TLSStoreNew.vue'),
        }
      ]
    },
    {
      path: 'TraefikService',
      name: 'traefikTraefikService',
      children: [
        {
          path: '',
          name: 'traefikTraefikServiceAllTable',
          component: () => import('../../pages/network/traefik/TraefikServiceList.vue'),
        },
        {
          path: ':namespace',
          name: 'traefikTraefikServiceTable',
          component: () => import('../../pages/network/traefik/TraefikServiceList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'traefikTraefikServiceView',
          component: () => import('../../pages/network/traefik/TraefikServiceView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'traefikTraefikServiceEdit',
          component: () => import('../../pages/network/traefik/TraefikServiceEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'traefikTraefikServiceCreate',
          component: () => import('../../pages/network/traefik/TraefikServiceNew.vue'),
        }
      ]
    },
  ],
}
export default route
