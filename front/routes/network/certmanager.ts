import {menuLinksProps} from '../interfaces';
import { iconChallenge, iconOrder, iconCertificate, iconCertificateRequest, iconClusterIssuer, iconIssuer,  certmanagerIcon, certmanagerTitle }from '../../libs/certmanager/custom.js'
import {  } from '../custom.js';
import { useCRDStore } from '../../stores'
const crds = useCRDStore().crds;
export const link:menuLinksProps = {
  name: 'networkcertmanager',
  title: certmanagerTitle, icon: certmanagerIcon,
  link: '/network/certmanager/',
  level: 1,
  children: [
  crds['challenges.acme.cert-manager.io'] == undefined?[]:[{
    name: 'certmanagerChallenges',
    title: 'Challenge', caption: 'List Challenge', icon: iconChallenge,
    link: '/network/certmanager/Challenge/', level: 2, children: []
  }],
  crds['orders.acme.cert-manager.io'] == undefined?[]:[{
    name: 'certmanagerOrders',
    title: 'Order', caption: 'List Order', icon: iconOrder,
    link: '/network/certmanager/Order/', level: 2, children: []
  }],
  crds['certificates.cert-manager.io'] == undefined?[]:[{
    name: 'certmanagerCertificates',
    title: 'Certificate', caption: 'List Certificate', icon: iconCertificate,
    link: '/network/certmanager/Certificate/', level: 2, children: []
  }],
  crds['certificaterequests.cert-manager.io'] == undefined?[]:[{
    name: 'certmanagerCertificateRequests',
    title: 'CertificateRequest', caption: 'List CertificateRequest', icon: iconCertificateRequest,
    link: '/network/certmanager/CertificateRequest/', level: 2, children: []
  }],
  crds['clusterissuers.cert-manager.io'] == undefined?[]:[{
    name: 'certmanagerClusterIssuers',
    title: 'ClusterIssuer', caption: 'List ClusterIssuer', icon: iconClusterIssuer,
    link: '/network/certmanager/ClusterIssuer/', level: 2, children: []
  }],
  crds['issuers.cert-manager.io'] == undefined?[]:[{
    name: 'certmanagerIssuers',
    title: 'Issuer', caption: 'List Issuer', icon: iconIssuer,
    link: '/network/certmanager/Issuer/', level: 2, children: []
  }],
  ].flat()
}
export const descriptions = {
  networkcertmanager:                {breadcrumb: certmanagerTitle, icon: certmanagerIcon, ns: false},
  networkcertmanagerDashboard:       {breadcrumb: 'Dashboard', icon: certmanagerIcon, ns: false},
  certmanagerChallenge:        {breadcrumb: 'Challenge', icon: iconChallenge, ns: false},
  certmanagerChallengeAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  certmanagerChallengeTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  certmanagerChallengeView:     {breadcrumb: 'View', icon: iconChallenge, ns: true },
  certmanagerChallengeEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  certmanagerChallengeCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  certmanagerOrder:        {breadcrumb: 'Order', icon: iconOrder, ns: false},
  certmanagerOrderAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  certmanagerOrderTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  certmanagerOrderView:     {breadcrumb: 'View', icon: iconOrder, ns: true },
  certmanagerOrderEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  certmanagerOrderCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  certmanagerCertificate:        {breadcrumb: 'Certificate', icon: iconCertificate, ns: false},
  certmanagerCertificateAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  certmanagerCertificateTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  certmanagerCertificateView:     {breadcrumb: 'View', icon: iconCertificate, ns: true },
  certmanagerCertificateEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  certmanagerCertificateCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  certmanagerCertificateRequest:        {breadcrumb: 'CertificateRequest', icon: iconCertificateRequest, ns: false},
  certmanagerCertificateRequestAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  certmanagerCertificateRequestTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  certmanagerCertificateRequestView:     {breadcrumb: 'View', icon: iconCertificateRequest, ns: true },
  certmanagerCertificateRequestEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  certmanagerCertificateRequestCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  certmanagerClusterIssuer:        {breadcrumb: 'ClusterIssuer', icon: iconClusterIssuer, ns: false},
  certmanagerClusterIssuerTable:    {breadcrumb: 'List', icon: 'list', ns: false },
  certmanagerClusterIssuerView:     {breadcrumb: 'View', icon: iconClusterIssuer, ns: false },
  certmanagerClusterIssuerEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: false },
  certmanagerClusterIssuerCreate:   {breadcrumb: 'Create', icon: 'add', ns: false },
  certmanagerIssuer:        {breadcrumb: 'Issuer', icon: iconIssuer, ns: false},
  certmanagerIssuerAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  certmanagerIssuerTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  certmanagerIssuerView:     {breadcrumb: 'View', icon: iconIssuer, ns: true },
  certmanagerIssuerEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  certmanagerIssuerCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
}
export const route = {
  path: 'certmanager',
  name: 'networkcertmanager',
  redirect: {path: link.link as string},
  children: [
    {
      path: '',
      name: 'networkcertmanagerDashboard',
      component: () => import('../../pages/network/certmanager/Dashboard.vue'),
    },
    {
      path: 'Challenge',
      name: 'certmanagerChallenge',
      children: [
        {
          path: '',
          name: 'certmanagerChallengeAllTable',
          component: () => import('../../pages/network/certmanager/ChallengeList.vue'),
        },
        {
          path: ':namespace',
          name: 'certmanagerChallengeTable',
          component: () => import('../../pages/network/certmanager/ChallengeList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'certmanagerChallengeView',
          component: () => import('../../pages/network/certmanager/ChallengeView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'certmanagerChallengeEdit',
          component: () => import('../../pages/network/certmanager/ChallengeEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'certmanagerChallengeCreate',
          component: () => import('../../pages/network/certmanager/ChallengeNew.vue'),
        }
      ]
    },
    {
      path: 'Order',
      name: 'certmanagerOrder',
      children: [
        {
          path: '',
          name: 'certmanagerOrderAllTable',
          component: () => import('../../pages/network/certmanager/OrderList.vue'),
        },
        {
          path: ':namespace',
          name: 'certmanagerOrderTable',
          component: () => import('../../pages/network/certmanager/OrderList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'certmanagerOrderView',
          component: () => import('../../pages/network/certmanager/OrderView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'certmanagerOrderEdit',
          component: () => import('../../pages/network/certmanager/OrderEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'certmanagerOrderCreate',
          component: () => import('../../pages/network/certmanager/OrderNew.vue'),
        }
      ]
    },
    {
      path: 'Certificate',
      name: 'certmanagerCertificate',
      children: [
        {
          path: '',
          name: 'certmanagerCertificateAllTable',
          component: () => import('../../pages/network/certmanager/CertificateList.vue'),
        },
        {
          path: ':namespace',
          name: 'certmanagerCertificateTable',
          component: () => import('../../pages/network/certmanager/CertificateList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'certmanagerCertificateView',
          component: () => import('../../pages/network/certmanager/CertificateView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'certmanagerCertificateEdit',
          component: () => import('../../pages/network/certmanager/CertificateEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'certmanagerCertificateCreate',
          component: () => import('../../pages/network/certmanager/CertificateNew.vue'),
        }
      ]
    },
    {
      path: 'CertificateRequest',
      name: 'certmanagerCertificateRequest',
      children: [
        {
          path: '',
          name: 'certmanagerCertificateRequestAllTable',
          component: () => import('../../pages/network/certmanager/CertificateRequestList.vue'),
        },
        {
          path: ':namespace',
          name: 'certmanagerCertificateRequestTable',
          component: () => import('../../pages/network/certmanager/CertificateRequestList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'certmanagerCertificateRequestView',
          component: () => import('../../pages/network/certmanager/CertificateRequestView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'certmanagerCertificateRequestEdit',
          component: () => import('../../pages/network/certmanager/CertificateRequestEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'certmanagerCertificateRequestCreate',
          component: () => import('../../pages/network/certmanager/CertificateRequestNew.vue'),
        }
      ]
    },
    {
      path: 'ClusterIssuer',
      name: 'certmanagerClusterIssuer',
      children: [
        {
          path: '',
          name: 'certmanagerClusterIssuerTable',
          component: () => import('../../pages/network/certmanager/ClusterIssuerList.vue'),
        },
        {
          path: 'view/:name',
          name: 'certmanagerClusterIssuerView',
          component: () => import('../../pages/network/certmanager/ClusterIssuerView.vue'),
        },
        {
          path: 'edit/:name',
          name: 'certmanagerClusterIssuerEdit',
          component: () => import('../../pages/network/certmanager/ClusterIssuerEdit.vue'),
        },
        {
          path: 'create',
          name: 'certmanagerClusterIssuerCreate',
          component: () => import('../../pages/network/certmanager/ClusterIssuerNew.vue'),
        }
      ]
    },
    {
      path: 'Issuer',
      name: 'certmanagerIssuer',
      children: [
        {
          path: '',
          name: 'certmanagerIssuerAllTable',
          component: () => import('../../pages/network/certmanager/IssuerList.vue'),
        },
        {
          path: ':namespace',
          name: 'certmanagerIssuerTable',
          component: () => import('../../pages/network/certmanager/IssuerList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'certmanagerIssuerView',
          component: () => import('../../pages/network/certmanager/IssuerView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'certmanagerIssuerEdit',
          component: () => import('../../pages/network/certmanager/IssuerEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'certmanagerIssuerCreate',
          component: () => import('../../pages/network/certmanager/IssuerNew.vue'),
        }
      ]
    },
  ],
}
export default route
