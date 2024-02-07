import {menuLinksProps} from '../interfaces';
import { iconNamespace, iconNode, iconAPIService, iconMutatingWebhookConfiguration, iconValidatingWebhookConfiguration, iconCustomResourceDefinition, iconLease,  k8sIcon, k8sTitle }from '../../libs/k8s/custom.js'
import {  } from '../custom.js';
import { useCRDStore } from '../../stores'
const crds = useCRDStore().crds;
export const link:menuLinksProps = {
  name: 'systemk8s',
  title: k8sTitle, icon: k8sIcon,
  link: '/system/k8s/',
  level: 1,
  children: [
  [{
    name: 'k8sNamespaces',
    title: 'Namespace', caption: 'List Namespace', icon: iconNamespace,
    link: '/system/k8s/Namespace/', level: 2, children: []
  }],
  [{
    name: 'k8sNodes',
    title: 'Node', caption: 'List Node', icon: iconNode,
    link: '/system/k8s/Node/', level: 2, children: []
  }],
  [{
    name: 'k8sAPIServices',
    title: 'APIService', caption: 'List APIService', icon: iconAPIService,
    link: '/system/k8s/APIService/', level: 2, children: []
  }],
  [{
    name: 'k8sMutatingWebhookConfigurations',
    title: 'MutatingWebhookConfiguration', caption: 'List MutatingWebhookConfiguration', icon: iconMutatingWebhookConfiguration,
    link: '/system/k8s/MutatingWebhookConfiguration/', level: 2, children: []
  }],
  [{
    name: 'k8sValidatingWebhookConfigurations',
    title: 'ValidatingWebhookConfiguration', caption: 'List ValidatingWebhookConfiguration', icon: iconValidatingWebhookConfiguration,
    link: '/system/k8s/ValidatingWebhookConfiguration/', level: 2, children: []
  }],
  [{
    name: 'k8sCustomResourceDefinitions',
    title: 'CustomResourceDefinition', caption: 'List CustomResourceDefinition', icon: iconCustomResourceDefinition,
    link: '/system/k8s/CustomResourceDefinition/', level: 2, children: []
  }],
  [{
    name: 'k8sLeases',
    title: 'Lease', caption: 'List Lease', icon: iconLease,
    link: '/system/k8s/Lease/', level: 2, children: []
  }],
  ].flat()
}
export const descriptions = {
  systemk8s:                {breadcrumb: k8sTitle, icon: k8sIcon, ns: false},
  systemk8sDashboard:       {breadcrumb: 'Dashboard', icon: k8sIcon, ns: false},
  k8sNamespace:        {breadcrumb: 'Namespace', icon: iconNamespace, ns: false},
  k8sNamespaceTable:    {breadcrumb: 'List', icon: 'list', ns: false },
  k8sNamespaceView:     {breadcrumb: 'View', icon: iconNamespace, ns: false },
  k8sNamespaceEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: false },
  k8sNamespaceCreate:   {breadcrumb: 'Create', icon: 'add', ns: false },
  k8sNode:        {breadcrumb: 'Node', icon: iconNode, ns: false},
  k8sNodeTable:    {breadcrumb: 'List', icon: 'list', ns: false },
  k8sNodeView:     {breadcrumb: 'View', icon: iconNode, ns: false },
  k8sNodeEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: false },
  k8sNodeCreate:   {breadcrumb: 'Create', icon: 'add', ns: false },
  k8sAPIService:        {breadcrumb: 'APIService', icon: iconAPIService, ns: false},
  k8sAPIServiceTable:    {breadcrumb: 'List', icon: 'list', ns: false },
  k8sAPIServiceView:     {breadcrumb: 'View', icon: iconAPIService, ns: false },
  k8sAPIServiceEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: false },
  k8sAPIServiceCreate:   {breadcrumb: 'Create', icon: 'add', ns: false },
  k8sMutatingWebhookConfiguration:        {breadcrumb: 'MutatingWebhookConfiguration', icon: iconMutatingWebhookConfiguration, ns: false},
  k8sMutatingWebhookConfigurationTable:    {breadcrumb: 'List', icon: 'list', ns: false },
  k8sMutatingWebhookConfigurationView:     {breadcrumb: 'View', icon: iconMutatingWebhookConfiguration, ns: false },
  k8sMutatingWebhookConfigurationEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: false },
  k8sMutatingWebhookConfigurationCreate:   {breadcrumb: 'Create', icon: 'add', ns: false },
  k8sValidatingWebhookConfiguration:        {breadcrumb: 'ValidatingWebhookConfiguration', icon: iconValidatingWebhookConfiguration, ns: false},
  k8sValidatingWebhookConfigurationTable:    {breadcrumb: 'List', icon: 'list', ns: false },
  k8sValidatingWebhookConfigurationView:     {breadcrumb: 'View', icon: iconValidatingWebhookConfiguration, ns: false },
  k8sValidatingWebhookConfigurationEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: false },
  k8sValidatingWebhookConfigurationCreate:   {breadcrumb: 'Create', icon: 'add', ns: false },
  k8sCustomResourceDefinition:        {breadcrumb: 'CustomResourceDefinition', icon: iconCustomResourceDefinition, ns: false},
  k8sCustomResourceDefinitionTable:    {breadcrumb: 'List', icon: 'list', ns: false },
  k8sCustomResourceDefinitionView:     {breadcrumb: 'View', icon: iconCustomResourceDefinition, ns: false },
  k8sCustomResourceDefinitionEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: false },
  k8sCustomResourceDefinitionCreate:   {breadcrumb: 'Create', icon: 'add', ns: false },
  k8sLease:        {breadcrumb: 'Lease', icon: iconLease, ns: false},
  k8sLeaseAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  k8sLeaseTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  k8sLeaseView:     {breadcrumb: 'View', icon: iconLease, ns: true },
  k8sLeaseEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  k8sLeaseCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
}
export const route = {
  path: 'k8s',
  name: 'systemk8s',
  redirect: {path: link.link as string},
  children: [
    {
      path: '',
      name: 'systemk8sDashboard',
      component: () => import('../../pages/system/k8s/Dashboard.vue'),
    },
    {
      path: 'Namespace',
      name: 'k8sNamespace',
      children: [
        {
          path: '',
          name: 'k8sNamespaceTable',
          component: () => import('../../pages/system/k8s/NamespaceList.vue'),
        },
        {
          path: 'view/:name',
          name: 'k8sNamespaceView',
          component: () => import('../../pages/system/k8s/NamespaceView.vue'),
        },
        {
          path: 'edit/:name',
          name: 'k8sNamespaceEdit',
          component: () => import('../../pages/system/k8s/NamespaceEdit.vue'),
        },
        {
          path: 'create',
          name: 'k8sNamespaceCreate',
          component: () => import('../../pages/system/k8s/NamespaceNew.vue'),
        }
      ]
    },
    {
      path: 'Node',
      name: 'k8sNode',
      children: [
        {
          path: '',
          name: 'k8sNodeTable',
          component: () => import('../../pages/system/k8s/NodeList.vue'),
        },
        {
          path: 'view/:name',
          name: 'k8sNodeView',
          component: () => import('../../pages/system/k8s/NodeView.vue'),
        },
        {
          path: 'edit/:name',
          name: 'k8sNodeEdit',
          component: () => import('../../pages/system/k8s/NodeEdit.vue'),
        },
        {
          path: 'create',
          name: 'k8sNodeCreate',
          component: () => import('../../pages/system/k8s/NodeNew.vue'),
        }
      ]
    },
    {
      path: 'APIService',
      name: 'k8sAPIService',
      children: [
        {
          path: '',
          name: 'k8sAPIServiceTable',
          component: () => import('../../pages/system/k8s/APIServiceList.vue'),
        },
        {
          path: 'view/:name',
          name: 'k8sAPIServiceView',
          component: () => import('../../pages/system/k8s/APIServiceView.vue'),
        },
        {
          path: 'edit/:name',
          name: 'k8sAPIServiceEdit',
          component: () => import('../../pages/system/k8s/APIServiceEdit.vue'),
        },
        {
          path: 'create',
          name: 'k8sAPIServiceCreate',
          component: () => import('../../pages/system/k8s/APIServiceNew.vue'),
        }
      ]
    },
    {
      path: 'MutatingWebhookConfiguration',
      name: 'k8sMutatingWebhookConfiguration',
      children: [
        {
          path: '',
          name: 'k8sMutatingWebhookConfigurationTable',
          component: () => import('../../pages/system/k8s/MutatingWebhookConfigurationList.vue'),
        },
        {
          path: 'view/:name',
          name: 'k8sMutatingWebhookConfigurationView',
          component: () => import('../../pages/system/k8s/MutatingWebhookConfigurationView.vue'),
        },
        {
          path: 'edit/:name',
          name: 'k8sMutatingWebhookConfigurationEdit',
          component: () => import('../../pages/system/k8s/MutatingWebhookConfigurationEdit.vue'),
        },
        {
          path: 'create',
          name: 'k8sMutatingWebhookConfigurationCreate',
          component: () => import('../../pages/system/k8s/MutatingWebhookConfigurationNew.vue'),
        }
      ]
    },
    {
      path: 'ValidatingWebhookConfiguration',
      name: 'k8sValidatingWebhookConfiguration',
      children: [
        {
          path: '',
          name: 'k8sValidatingWebhookConfigurationTable',
          component: () => import('../../pages/system/k8s/ValidatingWebhookConfigurationList.vue'),
        },
        {
          path: 'view/:name',
          name: 'k8sValidatingWebhookConfigurationView',
          component: () => import('../../pages/system/k8s/ValidatingWebhookConfigurationView.vue'),
        },
        {
          path: 'edit/:name',
          name: 'k8sValidatingWebhookConfigurationEdit',
          component: () => import('../../pages/system/k8s/ValidatingWebhookConfigurationEdit.vue'),
        },
        {
          path: 'create',
          name: 'k8sValidatingWebhookConfigurationCreate',
          component: () => import('../../pages/system/k8s/ValidatingWebhookConfigurationNew.vue'),
        }
      ]
    },
    {
      path: 'CustomResourceDefinition',
      name: 'k8sCustomResourceDefinition',
      children: [
        {
          path: '',
          name: 'k8sCustomResourceDefinitionTable',
          component: () => import('../../pages/system/k8s/CustomResourceDefinitionList.vue'),
        },
        {
          path: 'view/:name',
          name: 'k8sCustomResourceDefinitionView',
          component: () => import('../../pages/system/k8s/CustomResourceDefinitionView.vue'),
        },
        {
          path: 'edit/:name',
          name: 'k8sCustomResourceDefinitionEdit',
          component: () => import('../../pages/system/k8s/CustomResourceDefinitionEdit.vue'),
        },
        {
          path: 'create',
          name: 'k8sCustomResourceDefinitionCreate',
          component: () => import('../../pages/system/k8s/CustomResourceDefinitionNew.vue'),
        }
      ]
    },
    {
      path: 'Lease',
      name: 'k8sLease',
      children: [
        {
          path: '',
          name: 'k8sLeaseAllTable',
          component: () => import('../../pages/system/k8s/LeaseList.vue'),
        },
        {
          path: ':namespace',
          name: 'k8sLeaseTable',
          component: () => import('../../pages/system/k8s/LeaseList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'k8sLeaseView',
          component: () => import('../../pages/system/k8s/LeaseView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'k8sLeaseEdit',
          component: () => import('../../pages/system/k8s/LeaseEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'k8sLeaseCreate',
          component: () => import('../../pages/system/k8s/LeaseNew.vue'),
        }
      ]
    },
  ],
}
export default route
