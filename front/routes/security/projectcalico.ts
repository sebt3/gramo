import {menuLinksProps} from '../interfaces';
import { iconNetworkPolicy,  projectcalicoIcon, projectcalicoTitle }from '../../libs/projectcalico/custom.js'
import {  } from '../custom.js';
import { useCRDStore } from '../../stores'
const crds = useCRDStore().crds;
export const link:menuLinksProps = {
  name: 'securityprojectcalico',
  title: projectcalicoTitle, icon: projectcalicoIcon,
  link: '/security/projectcalico/',
  level: 1,
  children: [
  crds['networkpolicies.crd.projectcalico.org'] == undefined?[]:[{
    name: 'projectcalicoNetworkPolicys',
    title: 'NetworkPolicy', caption: 'List NetworkPolicy', icon: iconNetworkPolicy,
    link: '/security/projectcalico/NetworkPolicy/', level: 2, children: []
  }],
  ].flat()
}
export const descriptions = {
  securityprojectcalico:                {breadcrumb: projectcalicoTitle, icon: projectcalicoIcon, ns: false},
  securityprojectcalicoDashboard:       {breadcrumb: 'Dashboard', icon: projectcalicoIcon, ns: false},
  projectcalicoNetworkPolicy:        {breadcrumb: 'NetworkPolicy', icon: iconNetworkPolicy, ns: false},
  projectcalicoNetworkPolicyAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  projectcalicoNetworkPolicyTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  projectcalicoNetworkPolicyView:     {breadcrumb: 'View', icon: iconNetworkPolicy, ns: true },
  projectcalicoNetworkPolicyEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  projectcalicoNetworkPolicyCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
}
export const route = {
  path: 'projectcalico',
  name: 'securityprojectcalico',
  redirect: {path: link.link as string},
  children: [
    {
      path: '',
      name: 'securityprojectcalicoDashboard',
      component: () => import('../../pages/security/projectcalico/Dashboard.vue'),
    },
    {
      path: 'NetworkPolicy',
      name: 'projectcalicoNetworkPolicy',
      children: [
        {
          path: '',
          name: 'projectcalicoNetworkPolicyAllTable',
          component: () => import('../../pages/security/projectcalico/NetworkPolicyList.vue'),
        },
        {
          path: ':namespace',
          name: 'projectcalicoNetworkPolicyTable',
          component: () => import('../../pages/security/projectcalico/NetworkPolicyList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'projectcalicoNetworkPolicyView',
          component: () => import('../../pages/security/projectcalico/NetworkPolicyView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'projectcalicoNetworkPolicyEdit',
          component: () => import('../../pages/security/projectcalico/NetworkPolicyEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'projectcalicoNetworkPolicyCreate',
          component: () => import('../../pages/security/projectcalico/NetworkPolicyNew.vue'),
        }
      ]
    },
  ],
}
export default route
