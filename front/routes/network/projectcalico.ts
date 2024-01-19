import {menuLinksProps} from '../interfaces';
const cat = 'network';
const iconBGPConfiguration = 'album';
const iconBGPPeer = 'album';
const iconBlockAffinity = 'album';
const iconCalicoNodeStatus = 'album';
const iconClusterInformation = 'album';
const iconFelixConfiguration = 'album';
const iconGlobalNetworkPolicy = 'album';
const iconGlobalNetworkSet = 'album';
const iconHostEndpoint = 'album';
const iconIPAMBlock = 'album';
const iconIPAMConfig = 'album';
const iconIPAMHandle = 'album';
const iconIPPool = 'album';
const iconIPReservation = 'album';
const iconKubeControllersConfiguration = 'album';
const iconNetworkPolicy = 'album';
const iconNetworkSet = 'album';
export const link:menuLinksProps = {
  name: 'projectcalico',
  title: 'Projectcalico', icon: iconBGPConfiguration,
  link: `/${cat}/projectcalico/clusterinformations/`,
  level: 1,
  children: [
  {
    name: 'projectcalicoBGPConfigurations',
    title: 'BGPConfiguration', caption: 'List bGPConfiguration', icon: iconBGPConfiguration,
    link: `/${cat}/projectcalico/bgpconfigurations/`, level: 2, children: []
  },
  {
    name: 'projectcalicoBGPPeers',
    title: 'BGPPeer', caption: 'List bGPPeer', icon: iconBGPPeer,
    link: `/${cat}/projectcalico/bgppeers/`, level: 2, children: []
  },
  {
    name: 'projectcalicoBlockAffinitys',
    title: 'BlockAffinity', caption: 'List blockAffinity', icon: iconBlockAffinity,
    link: `/${cat}/projectcalico/blockaffinities/`, level: 2, children: []
  },
  {
    name: 'projectcalicoCalicoNodeStatuss',
    title: 'CalicoNodeStatus', caption: 'List calicoNodeStatus', icon: iconCalicoNodeStatus,
    link: `/${cat}/projectcalico/caliconodestatuses/`, level: 2, children: []
  },
  {
    name: 'projectcalicoClusterInformations',
    title: 'ClusterInformation', caption: 'List clusterInformation', icon: iconClusterInformation,
    link: `/${cat}/projectcalico/clusterinformations/`, level: 2, children: []
  },
  {
    name: 'projectcalicoFelixConfigurations',
    title: 'FelixConfiguration', caption: 'List felixConfiguration', icon: iconFelixConfiguration,
    link: `/${cat}/projectcalico/felixconfigurations/`, level: 2, children: []
  },
  {
    name: 'projectcalicoGlobalNetworkPolicys',
    title: 'GlobalNetworkPolicy', caption: 'List globalNetworkPolicy', icon: iconGlobalNetworkPolicy,
    link: `/${cat}/projectcalico/globalnetworkpolicies/`, level: 2, children: []
  },
  {
    name: 'projectcalicoGlobalNetworkSets',
    title: 'GlobalNetworkSet', caption: 'List globalNetworkSet', icon: iconGlobalNetworkSet,
    link: `/${cat}/projectcalico/globalnetworksets/`, level: 2, children: []
  },
  {
    name: 'projectcalicoHostEndpoints',
    title: 'HostEndpoint', caption: 'List hostEndpoint', icon: iconHostEndpoint,
    link: `/${cat}/projectcalico/hostendpoints/`, level: 2, children: []
  },
  {
    name: 'projectcalicoIPAMBlocks',
    title: 'IPAMBlock', caption: 'List iPAMBlock', icon: iconIPAMBlock,
    link: `/${cat}/projectcalico/ipamblocks/`, level: 2, children: []
  },
  {
    name: 'projectcalicoIPAMConfigs',
    title: 'IPAMConfig', caption: 'List iPAMConfig', icon: iconIPAMConfig,
    link: `/${cat}/projectcalico/ipamconfigs/`, level: 2, children: []
  },
  {
    name: 'projectcalicoIPAMHandles',
    title: 'IPAMHandle', caption: 'List iPAMHandle', icon: iconIPAMHandle,
    link: `/${cat}/projectcalico/ipamhandles/`, level: 2, children: []
  },
  {
    name: 'projectcalicoIPPools',
    title: 'IPPool', caption: 'List iPPool', icon: iconIPPool,
    link: `/${cat}/projectcalico/ippools/`, level: 2, children: []
  },
  {
    name: 'projectcalicoIPReservations',
    title: 'IPReservation', caption: 'List iPReservation', icon: iconIPReservation,
    link: `/${cat}/projectcalico/ipreservations/`, level: 2, children: []
  },
  {
    name: 'projectcalicoKubeControllersConfigurations',
    title: 'KubeControllersConfiguration', caption: 'List kubeControllersConfiguration', icon: iconKubeControllersConfiguration,
    link: `/${cat}/projectcalico/kubecontrollersconfigurations/`, level: 2, children: []
  },
  {
    name: 'projectcalicoNetworkPolicys',
    title: 'NetworkPolicy', caption: 'List networkPolicy', icon: iconNetworkPolicy,
    link: `/${cat}/projectcalico/networkpolicies/`, level: 2, children: []
  },
  {
    name: 'projectcalicoNetworkSets',
    title: 'NetworkSet', caption: 'List networkSet', icon: iconNetworkSet,
    link: `/${cat}/projectcalico/networksets/`, level: 2, children: []
  },
  ]
}
export const descriptions = {
  projectcalico:                {breadcrumb: 'Projectcalico', icon: iconBGPConfiguration, ns: false},
  projectcalicoBGPConfigurations:        {breadcrumb: 'BGPConfiguration', icon: iconBGPConfiguration, ns: false},
  projectcalicoBGPConfigurationTable:    {breadcrumb: 'List', icon: 'list', ns: false},
  projectcalicoBGPConfigurationView:     {breadcrumb: 'View', icon: iconBGPConfiguration, ns: false},
  projectcalicoBGPConfigurationEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: false},
  projectcalicoBGPConfigurationCreate:   {breadcrumb: 'Create', icon: 'add', ns: false},
  projectcalicoBGPPeers:        {breadcrumb: 'BGPPeer', icon: iconBGPPeer, ns: false},
  projectcalicoBGPPeerTable:    {breadcrumb: 'List', icon: 'list', ns: false},
  projectcalicoBGPPeerView:     {breadcrumb: 'View', icon: iconBGPPeer, ns: false},
  projectcalicoBGPPeerEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: false},
  projectcalicoBGPPeerCreate:   {breadcrumb: 'Create', icon: 'add', ns: false},
  projectcalicoBlockAffinitys:        {breadcrumb: 'BlockAffinity', icon: iconBlockAffinity, ns: false},
  projectcalicoBlockAffinityTable:    {breadcrumb: 'List', icon: 'list', ns: false},
  projectcalicoBlockAffinityView:     {breadcrumb: 'View', icon: iconBlockAffinity, ns: false},
  projectcalicoBlockAffinityEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: false},
  projectcalicoBlockAffinityCreate:   {breadcrumb: 'Create', icon: 'add', ns: false},
  projectcalicoCalicoNodeStatuss:        {breadcrumb: 'CalicoNodeStatus', icon: iconCalicoNodeStatus, ns: false},
  projectcalicoCalicoNodeStatusTable:    {breadcrumb: 'List', icon: 'list', ns: false},
  projectcalicoCalicoNodeStatusView:     {breadcrumb: 'View', icon: iconCalicoNodeStatus, ns: false},
  projectcalicoCalicoNodeStatusEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: false},
  projectcalicoCalicoNodeStatusCreate:   {breadcrumb: 'Create', icon: 'add', ns: false},
  projectcalicoClusterInformations:        {breadcrumb: 'ClusterInformation', icon: iconClusterInformation, ns: false},
  projectcalicoClusterInformationTable:    {breadcrumb: 'List', icon: 'list', ns: false},
  projectcalicoClusterInformationView:     {breadcrumb: 'View', icon: iconClusterInformation, ns: false},
  projectcalicoClusterInformationEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: false},
  projectcalicoClusterInformationCreate:   {breadcrumb: 'Create', icon: 'add', ns: false},
  projectcalicoFelixConfigurations:        {breadcrumb: 'FelixConfiguration', icon: iconFelixConfiguration, ns: false},
  projectcalicoFelixConfigurationTable:    {breadcrumb: 'List', icon: 'list', ns: false},
  projectcalicoFelixConfigurationView:     {breadcrumb: 'View', icon: iconFelixConfiguration, ns: false},
  projectcalicoFelixConfigurationEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: false},
  projectcalicoFelixConfigurationCreate:   {breadcrumb: 'Create', icon: 'add', ns: false},
  projectcalicoGlobalNetworkPolicys:        {breadcrumb: 'GlobalNetworkPolicy', icon: iconGlobalNetworkPolicy, ns: false},
  projectcalicoGlobalNetworkPolicyTable:    {breadcrumb: 'List', icon: 'list', ns: false},
  projectcalicoGlobalNetworkPolicyView:     {breadcrumb: 'View', icon: iconGlobalNetworkPolicy, ns: false},
  projectcalicoGlobalNetworkPolicyEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: false},
  projectcalicoGlobalNetworkPolicyCreate:   {breadcrumb: 'Create', icon: 'add', ns: false},
  projectcalicoGlobalNetworkSets:        {breadcrumb: 'GlobalNetworkSet', icon: iconGlobalNetworkSet, ns: false},
  projectcalicoGlobalNetworkSetTable:    {breadcrumb: 'List', icon: 'list', ns: false},
  projectcalicoGlobalNetworkSetView:     {breadcrumb: 'View', icon: iconGlobalNetworkSet, ns: false},
  projectcalicoGlobalNetworkSetEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: false},
  projectcalicoGlobalNetworkSetCreate:   {breadcrumb: 'Create', icon: 'add', ns: false},
  projectcalicoHostEndpoints:        {breadcrumb: 'HostEndpoint', icon: iconHostEndpoint, ns: false},
  projectcalicoHostEndpointTable:    {breadcrumb: 'List', icon: 'list', ns: false},
  projectcalicoHostEndpointView:     {breadcrumb: 'View', icon: iconHostEndpoint, ns: false},
  projectcalicoHostEndpointEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: false},
  projectcalicoHostEndpointCreate:   {breadcrumb: 'Create', icon: 'add', ns: false},
  projectcalicoIPAMBlocks:        {breadcrumb: 'IPAMBlock', icon: iconIPAMBlock, ns: false},
  projectcalicoIPAMBlockTable:    {breadcrumb: 'List', icon: 'list', ns: false},
  projectcalicoIPAMBlockView:     {breadcrumb: 'View', icon: iconIPAMBlock, ns: false},
  projectcalicoIPAMBlockEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: false},
  projectcalicoIPAMBlockCreate:   {breadcrumb: 'Create', icon: 'add', ns: false},
  projectcalicoIPAMConfigs:        {breadcrumb: 'IPAMConfig', icon: iconIPAMConfig, ns: false},
  projectcalicoIPAMConfigTable:    {breadcrumb: 'List', icon: 'list', ns: false},
  projectcalicoIPAMConfigView:     {breadcrumb: 'View', icon: iconIPAMConfig, ns: false},
  projectcalicoIPAMConfigEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: false},
  projectcalicoIPAMConfigCreate:   {breadcrumb: 'Create', icon: 'add', ns: false},
  projectcalicoIPAMHandles:        {breadcrumb: 'IPAMHandle', icon: iconIPAMHandle, ns: false},
  projectcalicoIPAMHandleTable:    {breadcrumb: 'List', icon: 'list', ns: false},
  projectcalicoIPAMHandleView:     {breadcrumb: 'View', icon: iconIPAMHandle, ns: false},
  projectcalicoIPAMHandleEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: false},
  projectcalicoIPAMHandleCreate:   {breadcrumb: 'Create', icon: 'add', ns: false},
  projectcalicoIPPools:        {breadcrumb: 'IPPool', icon: iconIPPool, ns: false},
  projectcalicoIPPoolTable:    {breadcrumb: 'List', icon: 'list', ns: false},
  projectcalicoIPPoolView:     {breadcrumb: 'View', icon: iconIPPool, ns: false},
  projectcalicoIPPoolEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: false},
  projectcalicoIPPoolCreate:   {breadcrumb: 'Create', icon: 'add', ns: false},
  projectcalicoIPReservations:        {breadcrumb: 'IPReservation', icon: iconIPReservation, ns: false},
  projectcalicoIPReservationTable:    {breadcrumb: 'List', icon: 'list', ns: false},
  projectcalicoIPReservationView:     {breadcrumb: 'View', icon: iconIPReservation, ns: false},
  projectcalicoIPReservationEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: false},
  projectcalicoIPReservationCreate:   {breadcrumb: 'Create', icon: 'add', ns: false},
  projectcalicoKubeControllersConfigurations:        {breadcrumb: 'KubeControllersConfiguration', icon: iconKubeControllersConfiguration, ns: false},
  projectcalicoKubeControllersConfigurationTable:    {breadcrumb: 'List', icon: 'list', ns: false},
  projectcalicoKubeControllersConfigurationView:     {breadcrumb: 'View', icon: iconKubeControllersConfiguration, ns: false},
  projectcalicoKubeControllersConfigurationEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: false},
  projectcalicoKubeControllersConfigurationCreate:   {breadcrumb: 'Create', icon: 'add', ns: false},
  projectcalicoNetworkPolicys:        {breadcrumb: 'NetworkPolicy', icon: iconNetworkPolicy, ns: false},
  projectcalicoNetworkPolicyAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  projectcalicoNetworkPolicyTable:    {breadcrumb: 'List', icon: 'list', ns: true},
  projectcalicoNetworkPolicyView:     {breadcrumb: 'View', icon: iconNetworkPolicy, ns: true},
  projectcalicoNetworkPolicyEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true},
  projectcalicoNetworkPolicyCreate:   {breadcrumb: 'Create', icon: 'add', ns: true},
  projectcalicoNetworkSets:        {breadcrumb: 'NetworkSet', icon: iconNetworkSet, ns: false},
  projectcalicoNetworkSetAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  projectcalicoNetworkSetTable:    {breadcrumb: 'List', icon: 'list', ns: true},
  projectcalicoNetworkSetView:     {breadcrumb: 'View', icon: iconNetworkSet, ns: true},
  projectcalicoNetworkSetEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true},
  projectcalicoNetworkSetCreate:   {breadcrumb: 'Create', icon: 'add', ns: true},
}
export const route = {
  path: 'projectcalico',
  name: 'projectcalico',
  redirect: {path: link.link as string},
  children: [
    {
      path: 'bgpconfigurations',
      name: 'projectcalicoBGPConfigurations',
      children: [
        {
          path: '',
          name: 'projectcalicoBGPConfigurationTable',
          component: () => import('../../components/projectcalico/BGPConfigurationTable.vue'),
        },
        {
          path: ':name/view',
          name: 'projectcalicoBGPConfigurationView',
          component: () => import('../../components/projectcalico/BGPConfigurationView.vue'),
        },
        {
          path: ':name/edit',
          name: 'projectcalicoBGPConfigurationEdit',
          component: () => import('../../components/projectcalico/BGPConfigurationEdit.vue'),
        },
        {
          path: 'create',
          name: 'projectcalicoBGPConfigurationCreate',
          component: () => import('../../components/projectcalico/BGPConfigurationNew.vue'),
        }
      ]
    },
    {
      path: 'bgppeers',
      name: 'projectcalicoBGPPeers',
      children: [
        {
          path: '',
          name: 'projectcalicoBGPPeerTable',
          component: () => import('../../components/projectcalico/BGPPeerTable.vue'),
        },
        {
          path: ':name/view',
          name: 'projectcalicoBGPPeerView',
          component: () => import('../../components/projectcalico/BGPPeerView.vue'),
        },
        {
          path: ':name/edit',
          name: 'projectcalicoBGPPeerEdit',
          component: () => import('../../components/projectcalico/BGPPeerEdit.vue'),
        },
        {
          path: 'create',
          name: 'projectcalicoBGPPeerCreate',
          component: () => import('../../components/projectcalico/BGPPeerNew.vue'),
        }
      ]
    },
    {
      path: 'blockaffinities',
      name: 'projectcalicoBlockAffinitys',
      children: [
        {
          path: '',
          name: 'projectcalicoBlockAffinityTable',
          component: () => import('../../components/projectcalico/BlockAffinityTable.vue'),
        },
        {
          path: ':name/view',
          name: 'projectcalicoBlockAffinityView',
          component: () => import('../../components/projectcalico/BlockAffinityView.vue'),
        },
        {
          path: ':name/edit',
          name: 'projectcalicoBlockAffinityEdit',
          component: () => import('../../components/projectcalico/BlockAffinityEdit.vue'),
        },
        {
          path: 'create',
          name: 'projectcalicoBlockAffinityCreate',
          component: () => import('../../components/projectcalico/BlockAffinityNew.vue'),
        }
      ]
    },
    {
      path: 'caliconodestatuses',
      name: 'projectcalicoCalicoNodeStatuss',
      children: [
        {
          path: '',
          name: 'projectcalicoCalicoNodeStatusTable',
          component: () => import('../../components/projectcalico/CalicoNodeStatusTable.vue'),
        },
        {
          path: ':name/view',
          name: 'projectcalicoCalicoNodeStatusView',
          component: () => import('../../components/projectcalico/CalicoNodeStatusView.vue'),
        },
        {
          path: ':name/edit',
          name: 'projectcalicoCalicoNodeStatusEdit',
          component: () => import('../../components/projectcalico/CalicoNodeStatusEdit.vue'),
        },
        {
          path: 'create',
          name: 'projectcalicoCalicoNodeStatusCreate',
          component: () => import('../../components/projectcalico/CalicoNodeStatusNew.vue'),
        }
      ]
    },
    {
      path: 'clusterinformations',
      name: 'projectcalicoClusterInformations',
      children: [
        {
          path: '',
          name: 'projectcalicoClusterInformationTable',
          component: () => import('../../components/projectcalico/ClusterInformationTable.vue'),
        },
        {
          path: ':name/view',
          name: 'projectcalicoClusterInformationView',
          component: () => import('../../components/projectcalico/ClusterInformationView.vue'),
        },
        {
          path: ':name/edit',
          name: 'projectcalicoClusterInformationEdit',
          component: () => import('../../components/projectcalico/ClusterInformationEdit.vue'),
        },
        {
          path: 'create',
          name: 'projectcalicoClusterInformationCreate',
          component: () => import('../../components/projectcalico/ClusterInformationNew.vue'),
        }
      ]
    },
    {
      path: 'felixconfigurations',
      name: 'projectcalicoFelixConfigurations',
      children: [
        {
          path: '',
          name: 'projectcalicoFelixConfigurationTable',
          component: () => import('../../components/projectcalico/FelixConfigurationTable.vue'),
        },
        {
          path: ':name/view',
          name: 'projectcalicoFelixConfigurationView',
          component: () => import('../../components/projectcalico/FelixConfigurationView.vue'),
        },
        {
          path: ':name/edit',
          name: 'projectcalicoFelixConfigurationEdit',
          component: () => import('../../components/projectcalico/FelixConfigurationEdit.vue'),
        },
        {
          path: 'create',
          name: 'projectcalicoFelixConfigurationCreate',
          component: () => import('../../components/projectcalico/FelixConfigurationNew.vue'),
        }
      ]
    },
    {
      path: 'globalnetworkpolicies',
      name: 'projectcalicoGlobalNetworkPolicys',
      children: [
        {
          path: '',
          name: 'projectcalicoGlobalNetworkPolicyTable',
          component: () => import('../../components/projectcalico/GlobalNetworkPolicyTable.vue'),
        },
        {
          path: ':name/view',
          name: 'projectcalicoGlobalNetworkPolicyView',
          component: () => import('../../components/projectcalico/GlobalNetworkPolicyView.vue'),
        },
        {
          path: ':name/edit',
          name: 'projectcalicoGlobalNetworkPolicyEdit',
          component: () => import('../../components/projectcalico/GlobalNetworkPolicyEdit.vue'),
        },
        {
          path: 'create',
          name: 'projectcalicoGlobalNetworkPolicyCreate',
          component: () => import('../../components/projectcalico/GlobalNetworkPolicyNew.vue'),
        }
      ]
    },
    {
      path: 'globalnetworksets',
      name: 'projectcalicoGlobalNetworkSets',
      children: [
        {
          path: '',
          name: 'projectcalicoGlobalNetworkSetTable',
          component: () => import('../../components/projectcalico/GlobalNetworkSetTable.vue'),
        },
        {
          path: ':name/view',
          name: 'projectcalicoGlobalNetworkSetView',
          component: () => import('../../components/projectcalico/GlobalNetworkSetView.vue'),
        },
        {
          path: ':name/edit',
          name: 'projectcalicoGlobalNetworkSetEdit',
          component: () => import('../../components/projectcalico/GlobalNetworkSetEdit.vue'),
        },
        {
          path: 'create',
          name: 'projectcalicoGlobalNetworkSetCreate',
          component: () => import('../../components/projectcalico/GlobalNetworkSetNew.vue'),
        }
      ]
    },
    {
      path: 'hostendpoints',
      name: 'projectcalicoHostEndpoints',
      children: [
        {
          path: '',
          name: 'projectcalicoHostEndpointTable',
          component: () => import('../../components/projectcalico/HostEndpointTable.vue'),
        },
        {
          path: ':name/view',
          name: 'projectcalicoHostEndpointView',
          component: () => import('../../components/projectcalico/HostEndpointView.vue'),
        },
        {
          path: ':name/edit',
          name: 'projectcalicoHostEndpointEdit',
          component: () => import('../../components/projectcalico/HostEndpointEdit.vue'),
        },
        {
          path: 'create',
          name: 'projectcalicoHostEndpointCreate',
          component: () => import('../../components/projectcalico/HostEndpointNew.vue'),
        }
      ]
    },
    {
      path: 'ipamblocks',
      name: 'projectcalicoIPAMBlocks',
      children: [
        {
          path: '',
          name: 'projectcalicoIPAMBlockTable',
          component: () => import('../../components/projectcalico/IPAMBlockTable.vue'),
        },
        {
          path: ':name/view',
          name: 'projectcalicoIPAMBlockView',
          component: () => import('../../components/projectcalico/IPAMBlockView.vue'),
        },
        {
          path: ':name/edit',
          name: 'projectcalicoIPAMBlockEdit',
          component: () => import('../../components/projectcalico/IPAMBlockEdit.vue'),
        },
        {
          path: 'create',
          name: 'projectcalicoIPAMBlockCreate',
          component: () => import('../../components/projectcalico/IPAMBlockNew.vue'),
        }
      ]
    },
    {
      path: 'ipamconfigs',
      name: 'projectcalicoIPAMConfigs',
      children: [
        {
          path: '',
          name: 'projectcalicoIPAMConfigTable',
          component: () => import('../../components/projectcalico/IPAMConfigTable.vue'),
        },
        {
          path: ':name/view',
          name: 'projectcalicoIPAMConfigView',
          component: () => import('../../components/projectcalico/IPAMConfigView.vue'),
        },
        {
          path: ':name/edit',
          name: 'projectcalicoIPAMConfigEdit',
          component: () => import('../../components/projectcalico/IPAMConfigEdit.vue'),
        },
        {
          path: 'create',
          name: 'projectcalicoIPAMConfigCreate',
          component: () => import('../../components/projectcalico/IPAMConfigNew.vue'),
        }
      ]
    },
    {
      path: 'ipamhandles',
      name: 'projectcalicoIPAMHandles',
      children: [
        {
          path: '',
          name: 'projectcalicoIPAMHandleTable',
          component: () => import('../../components/projectcalico/IPAMHandleTable.vue'),
        },
        {
          path: ':name/view',
          name: 'projectcalicoIPAMHandleView',
          component: () => import('../../components/projectcalico/IPAMHandleView.vue'),
        },
        {
          path: ':name/edit',
          name: 'projectcalicoIPAMHandleEdit',
          component: () => import('../../components/projectcalico/IPAMHandleEdit.vue'),
        },
        {
          path: 'create',
          name: 'projectcalicoIPAMHandleCreate',
          component: () => import('../../components/projectcalico/IPAMHandleNew.vue'),
        }
      ]
    },
    {
      path: 'ippools',
      name: 'projectcalicoIPPools',
      children: [
        {
          path: '',
          name: 'projectcalicoIPPoolTable',
          component: () => import('../../components/projectcalico/IPPoolTable.vue'),
        },
        {
          path: ':name/view',
          name: 'projectcalicoIPPoolView',
          component: () => import('../../components/projectcalico/IPPoolView.vue'),
        },
        {
          path: ':name/edit',
          name: 'projectcalicoIPPoolEdit',
          component: () => import('../../components/projectcalico/IPPoolEdit.vue'),
        },
        {
          path: 'create',
          name: 'projectcalicoIPPoolCreate',
          component: () => import('../../components/projectcalico/IPPoolNew.vue'),
        }
      ]
    },
    {
      path: 'ipreservations',
      name: 'projectcalicoIPReservations',
      children: [
        {
          path: '',
          name: 'projectcalicoIPReservationTable',
          component: () => import('../../components/projectcalico/IPReservationTable.vue'),
        },
        {
          path: ':name/view',
          name: 'projectcalicoIPReservationView',
          component: () => import('../../components/projectcalico/IPReservationView.vue'),
        },
        {
          path: ':name/edit',
          name: 'projectcalicoIPReservationEdit',
          component: () => import('../../components/projectcalico/IPReservationEdit.vue'),
        },
        {
          path: 'create',
          name: 'projectcalicoIPReservationCreate',
          component: () => import('../../components/projectcalico/IPReservationNew.vue'),
        }
      ]
    },
    {
      path: 'kubecontrollersconfigurations',
      name: 'projectcalicoKubeControllersConfigurations',
      children: [
        {
          path: '',
          name: 'projectcalicoKubeControllersConfigurationTable',
          component: () => import('../../components/projectcalico/KubeControllersConfigurationTable.vue'),
        },
        {
          path: ':name/view',
          name: 'projectcalicoKubeControllersConfigurationView',
          component: () => import('../../components/projectcalico/KubeControllersConfigurationView.vue'),
        },
        {
          path: ':name/edit',
          name: 'projectcalicoKubeControllersConfigurationEdit',
          component: () => import('../../components/projectcalico/KubeControllersConfigurationEdit.vue'),
        },
        {
          path: 'create',
          name: 'projectcalicoKubeControllersConfigurationCreate',
          component: () => import('../../components/projectcalico/KubeControllersConfigurationNew.vue'),
        }
      ]
    },
    {
      path: 'networkpolicies',
      name: 'projectcalicoNetworkPolicys',
      children: [
        {
          path: '',
          name: 'projectcalicoNetworkPolicyAllTable',
          component: () => import('../../components/projectcalico/NetworkPolicyAllTable.vue'),
        },
        {
          path: ':namespace',
          name: 'projectcalicoNetworkPolicyTable',
          component: () => import('../../components/projectcalico/NetworkPolicyTable.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'projectcalicoNetworkPolicyView',
          component: () => import('../../components/projectcalico/NetworkPolicyView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'projectcalicoNetworkPolicyEdit',
          component: () => import('../../components/projectcalico/NetworkPolicyEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'projectcalicoNetworkPolicyCreate',
          component: () => import('../../components/projectcalico/NetworkPolicyNew.vue'),
        }
      ]
    },
    {
      path: 'networksets',
      name: 'projectcalicoNetworkSets',
      children: [
        {
          path: '',
          name: 'projectcalicoNetworkSetAllTable',
          component: () => import('../../components/projectcalico/NetworkSetAllTable.vue'),
        },
        {
          path: ':namespace',
          name: 'projectcalicoNetworkSetTable',
          component: () => import('../../components/projectcalico/NetworkSetTable.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'projectcalicoNetworkSetView',
          component: () => import('../../components/projectcalico/NetworkSetView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'projectcalicoNetworkSetEdit',
          component: () => import('../../components/projectcalico/NetworkSetEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'projectcalicoNetworkSetCreate',
          component: () => import('../../components/projectcalico/NetworkSetNew.vue'),
        }
      ]
    },
  ],
}
export default route
