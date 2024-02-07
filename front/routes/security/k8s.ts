import {menuLinksProps} from '../interfaces';
import { iconServiceAccount, iconCertificateSigningRequest, iconNetworkPolicy, iconRole, iconClusterRoleBinding, iconRoleBinding, iconClusterRole,  k8sIcon, k8sTitle }from '../../libs/k8s/custom.js'
import {  } from '../custom.js';
import { useCRDStore } from '../../stores'
const crds = useCRDStore().crds;
export const link:menuLinksProps = {
  name: 'securityk8s',
  title: k8sTitle, icon: k8sIcon,
  link: '/security/k8s/',
  level: 1,
  children: [
  [{
    name: 'k8sServiceAccounts',
    title: 'ServiceAccount', caption: 'List ServiceAccount', icon: iconServiceAccount,
    link: '/security/k8s/ServiceAccount/', level: 2, children: []
  }],
  [{
    name: 'k8sCertificateSigningRequests',
    title: 'CertificateSigningRequest', caption: 'List CertificateSigningRequest', icon: iconCertificateSigningRequest,
    link: '/security/k8s/CertificateSigningRequest/', level: 2, children: []
  }],
  [{
    name: 'k8sNetworkPolicys',
    title: 'NetworkPolicy', caption: 'List NetworkPolicy', icon: iconNetworkPolicy,
    link: '/security/k8s/NetworkPolicy/', level: 2, children: []
  }],
  [{
    name: 'k8sRoles',
    title: 'Role', caption: 'List Role', icon: iconRole,
    link: '/security/k8s/Role/', level: 2, children: []
  }],
  [{
    name: 'k8sClusterRoleBindings',
    title: 'ClusterRoleBinding', caption: 'List ClusterRoleBinding', icon: iconClusterRoleBinding,
    link: '/security/k8s/ClusterRoleBinding/', level: 2, children: []
  }],
  [{
    name: 'k8sRoleBindings',
    title: 'RoleBinding', caption: 'List RoleBinding', icon: iconRoleBinding,
    link: '/security/k8s/RoleBinding/', level: 2, children: []
  }],
  [{
    name: 'k8sClusterRoles',
    title: 'ClusterRole', caption: 'List ClusterRole', icon: iconClusterRole,
    link: '/security/k8s/ClusterRole/', level: 2, children: []
  }],
  ].flat()
}
export const descriptions = {
  securityk8s:                {breadcrumb: k8sTitle, icon: k8sIcon, ns: false},
  securityk8sDashboard:       {breadcrumb: 'Dashboard', icon: k8sIcon, ns: false},
  k8sServiceAccount:        {breadcrumb: 'ServiceAccount', icon: iconServiceAccount, ns: false},
  k8sServiceAccountAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  k8sServiceAccountTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  k8sServiceAccountView:     {breadcrumb: 'View', icon: iconServiceAccount, ns: true },
  k8sServiceAccountEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  k8sServiceAccountCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  k8sCertificateSigningRequest:        {breadcrumb: 'CertificateSigningRequest', icon: iconCertificateSigningRequest, ns: false},
  k8sCertificateSigningRequestTable:    {breadcrumb: 'List', icon: 'list', ns: false },
  k8sCertificateSigningRequestView:     {breadcrumb: 'View', icon: iconCertificateSigningRequest, ns: false },
  k8sCertificateSigningRequestEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: false },
  k8sCertificateSigningRequestCreate:   {breadcrumb: 'Create', icon: 'add', ns: false },
  k8sNetworkPolicy:        {breadcrumb: 'NetworkPolicy', icon: iconNetworkPolicy, ns: false},
  k8sNetworkPolicyAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  k8sNetworkPolicyTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  k8sNetworkPolicyView:     {breadcrumb: 'View', icon: iconNetworkPolicy, ns: true },
  k8sNetworkPolicyEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  k8sNetworkPolicyCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  k8sRole:        {breadcrumb: 'Role', icon: iconRole, ns: false},
  k8sRoleAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  k8sRoleTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  k8sRoleView:     {breadcrumb: 'View', icon: iconRole, ns: true },
  k8sRoleEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  k8sRoleCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  k8sClusterRoleBinding:        {breadcrumb: 'ClusterRoleBinding', icon: iconClusterRoleBinding, ns: false},
  k8sClusterRoleBindingTable:    {breadcrumb: 'List', icon: 'list', ns: false },
  k8sClusterRoleBindingView:     {breadcrumb: 'View', icon: iconClusterRoleBinding, ns: false },
  k8sClusterRoleBindingEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: false },
  k8sClusterRoleBindingCreate:   {breadcrumb: 'Create', icon: 'add', ns: false },
  k8sRoleBinding:        {breadcrumb: 'RoleBinding', icon: iconRoleBinding, ns: false},
  k8sRoleBindingAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  k8sRoleBindingTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  k8sRoleBindingView:     {breadcrumb: 'View', icon: iconRoleBinding, ns: true },
  k8sRoleBindingEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  k8sRoleBindingCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  k8sClusterRole:        {breadcrumb: 'ClusterRole', icon: iconClusterRole, ns: false},
  k8sClusterRoleTable:    {breadcrumb: 'List', icon: 'list', ns: false },
  k8sClusterRoleView:     {breadcrumb: 'View', icon: iconClusterRole, ns: false },
  k8sClusterRoleEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: false },
  k8sClusterRoleCreate:   {breadcrumb: 'Create', icon: 'add', ns: false },
}
export const route = {
  path: 'k8s',
  name: 'securityk8s',
  redirect: {path: link.link as string},
  children: [
    {
      path: '',
      name: 'securityk8sDashboard',
      component: () => import('../../pages/security/k8s/Dashboard.vue'),
    },
    {
      path: 'ServiceAccount',
      name: 'k8sServiceAccount',
      children: [
        {
          path: '',
          name: 'k8sServiceAccountAllTable',
          component: () => import('../../pages/security/k8s/ServiceAccountList.vue'),
        },
        {
          path: ':namespace',
          name: 'k8sServiceAccountTable',
          component: () => import('../../pages/security/k8s/ServiceAccountList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'k8sServiceAccountView',
          component: () => import('../../pages/security/k8s/ServiceAccountView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'k8sServiceAccountEdit',
          component: () => import('../../pages/security/k8s/ServiceAccountEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'k8sServiceAccountCreate',
          component: () => import('../../pages/security/k8s/ServiceAccountNew.vue'),
        }
      ]
    },
    {
      path: 'CertificateSigningRequest',
      name: 'k8sCertificateSigningRequest',
      children: [
        {
          path: '',
          name: 'k8sCertificateSigningRequestTable',
          component: () => import('../../pages/security/k8s/CertificateSigningRequestList.vue'),
        },
        {
          path: 'view/:name',
          name: 'k8sCertificateSigningRequestView',
          component: () => import('../../pages/security/k8s/CertificateSigningRequestView.vue'),
        },
        {
          path: 'edit/:name',
          name: 'k8sCertificateSigningRequestEdit',
          component: () => import('../../pages/security/k8s/CertificateSigningRequestEdit.vue'),
        },
        {
          path: 'create',
          name: 'k8sCertificateSigningRequestCreate',
          component: () => import('../../pages/security/k8s/CertificateSigningRequestNew.vue'),
        }
      ]
    },
    {
      path: 'NetworkPolicy',
      name: 'k8sNetworkPolicy',
      children: [
        {
          path: '',
          name: 'k8sNetworkPolicyAllTable',
          component: () => import('../../pages/security/k8s/NetworkPolicyList.vue'),
        },
        {
          path: ':namespace',
          name: 'k8sNetworkPolicyTable',
          component: () => import('../../pages/security/k8s/NetworkPolicyList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'k8sNetworkPolicyView',
          component: () => import('../../pages/security/k8s/NetworkPolicyView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'k8sNetworkPolicyEdit',
          component: () => import('../../pages/security/k8s/NetworkPolicyEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'k8sNetworkPolicyCreate',
          component: () => import('../../pages/security/k8s/NetworkPolicyNew.vue'),
        }
      ]
    },
    {
      path: 'Role',
      name: 'k8sRole',
      children: [
        {
          path: '',
          name: 'k8sRoleAllTable',
          component: () => import('../../pages/security/k8s/RoleList.vue'),
        },
        {
          path: ':namespace',
          name: 'k8sRoleTable',
          component: () => import('../../pages/security/k8s/RoleList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'k8sRoleView',
          component: () => import('../../pages/security/k8s/RoleView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'k8sRoleEdit',
          component: () => import('../../pages/security/k8s/RoleEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'k8sRoleCreate',
          component: () => import('../../pages/security/k8s/RoleNew.vue'),
        }
      ]
    },
    {
      path: 'ClusterRoleBinding',
      name: 'k8sClusterRoleBinding',
      children: [
        {
          path: '',
          name: 'k8sClusterRoleBindingTable',
          component: () => import('../../pages/security/k8s/ClusterRoleBindingList.vue'),
        },
        {
          path: 'view/:name',
          name: 'k8sClusterRoleBindingView',
          component: () => import('../../pages/security/k8s/ClusterRoleBindingView.vue'),
        },
        {
          path: 'edit/:name',
          name: 'k8sClusterRoleBindingEdit',
          component: () => import('../../pages/security/k8s/ClusterRoleBindingEdit.vue'),
        },
        {
          path: 'create',
          name: 'k8sClusterRoleBindingCreate',
          component: () => import('../../pages/security/k8s/ClusterRoleBindingNew.vue'),
        }
      ]
    },
    {
      path: 'RoleBinding',
      name: 'k8sRoleBinding',
      children: [
        {
          path: '',
          name: 'k8sRoleBindingAllTable',
          component: () => import('../../pages/security/k8s/RoleBindingList.vue'),
        },
        {
          path: ':namespace',
          name: 'k8sRoleBindingTable',
          component: () => import('../../pages/security/k8s/RoleBindingList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'k8sRoleBindingView',
          component: () => import('../../pages/security/k8s/RoleBindingView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'k8sRoleBindingEdit',
          component: () => import('../../pages/security/k8s/RoleBindingEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'k8sRoleBindingCreate',
          component: () => import('../../pages/security/k8s/RoleBindingNew.vue'),
        }
      ]
    },
    {
      path: 'ClusterRole',
      name: 'k8sClusterRole',
      children: [
        {
          path: '',
          name: 'k8sClusterRoleTable',
          component: () => import('../../pages/security/k8s/ClusterRoleList.vue'),
        },
        {
          path: 'view/:name',
          name: 'k8sClusterRoleView',
          component: () => import('../../pages/security/k8s/ClusterRoleView.vue'),
        },
        {
          path: 'edit/:name',
          name: 'k8sClusterRoleEdit',
          component: () => import('../../pages/security/k8s/ClusterRoleEdit.vue'),
        },
        {
          path: 'create',
          name: 'k8sClusterRoleCreate',
          component: () => import('../../pages/security/k8s/ClusterRoleNew.vue'),
        }
      ]
    },
  ],
}
export default route
