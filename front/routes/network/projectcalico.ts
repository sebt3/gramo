import {menuLinksProps} from '../interfaces';
import { iconBGPConfiguration, iconBGPPeer, iconBlockAffinity, iconCalicoNodeStatus, iconClusterInformation, iconFelixConfiguration, iconGlobalNetworkPolicy, iconGlobalNetworkSet, iconHostEndpoint, iconIPAMBlock, iconIPAMConfig, iconIPAMHandle, iconIPPool, iconIPReservation, iconKubeControllersConfiguration, iconNetworkSet,  projectcalicoIcon, projectcalicoTitle }from '../../libs/projectcalico/custom.js'
import {  } from '../custom.js';
import { useCRDStore } from '../../stores'
const crds = useCRDStore().crds;
export const link:menuLinksProps = {
  name: 'networkprojectcalico',
  title: projectcalicoTitle, icon: projectcalicoIcon,
  link: '/network/projectcalico/',
  level: 1,
  children: [
  crds['bgpconfigurations.crd.projectcalico.org'] == undefined?[]:[{
    name: 'projectcalicoBGPConfigurations',
    title: 'BGPConfiguration', caption: 'List BGPConfiguration', icon: iconBGPConfiguration,
    link: '/network/projectcalico/BGPConfiguration/', level: 2, children: []
  }],
  crds['bgppeers.crd.projectcalico.org'] == undefined?[]:[{
    name: 'projectcalicoBGPPeers',
    title: 'BGPPeer', caption: 'List BGPPeer', icon: iconBGPPeer,
    link: '/network/projectcalico/BGPPeer/', level: 2, children: []
  }],
  crds['blockaffinities.crd.projectcalico.org'] == undefined?[]:[{
    name: 'projectcalicoBlockAffinitys',
    title: 'BlockAffinity', caption: 'List BlockAffinity', icon: iconBlockAffinity,
    link: '/network/projectcalico/BlockAffinity/', level: 2, children: []
  }],
  crds['caliconodestatuses.crd.projectcalico.org'] == undefined?[]:[{
    name: 'projectcalicoCalicoNodeStatuss',
    title: 'CalicoNodeStatus', caption: 'List CalicoNodeStatus', icon: iconCalicoNodeStatus,
    link: '/network/projectcalico/CalicoNodeStatus/', level: 2, children: []
  }],
  crds['clusterinformations.crd.projectcalico.org'] == undefined?[]:[{
    name: 'projectcalicoClusterInformations',
    title: 'ClusterInformation', caption: 'List ClusterInformation', icon: iconClusterInformation,
    link: '/network/projectcalico/ClusterInformation/', level: 2, children: []
  }],
  crds['felixconfigurations.crd.projectcalico.org'] == undefined?[]:[{
    name: 'projectcalicoFelixConfigurations',
    title: 'FelixConfiguration', caption: 'List FelixConfiguration', icon: iconFelixConfiguration,
    link: '/network/projectcalico/FelixConfiguration/', level: 2, children: []
  }],
  crds['globalnetworkpolicies.crd.projectcalico.org'] == undefined?[]:[{
    name: 'projectcalicoGlobalNetworkPolicys',
    title: 'GlobalNetworkPolicy', caption: 'List GlobalNetworkPolicy', icon: iconGlobalNetworkPolicy,
    link: '/network/projectcalico/GlobalNetworkPolicy/', level: 2, children: []
  }],
  crds['globalnetworksets.crd.projectcalico.org'] == undefined?[]:[{
    name: 'projectcalicoGlobalNetworkSets',
    title: 'GlobalNetworkSet', caption: 'List GlobalNetworkSet', icon: iconGlobalNetworkSet,
    link: '/network/projectcalico/GlobalNetworkSet/', level: 2, children: []
  }],
  crds['hostendpoints.crd.projectcalico.org'] == undefined?[]:[{
    name: 'projectcalicoHostEndpoints',
    title: 'HostEndpoint', caption: 'List HostEndpoint', icon: iconHostEndpoint,
    link: '/network/projectcalico/HostEndpoint/', level: 2, children: []
  }],
  crds['ipamblocks.crd.projectcalico.org'] == undefined?[]:[{
    name: 'projectcalicoIPAMBlocks',
    title: 'IPAMBlock', caption: 'List IPAMBlock', icon: iconIPAMBlock,
    link: '/network/projectcalico/IPAMBlock/', level: 2, children: []
  }],
  crds['ipamconfigs.crd.projectcalico.org'] == undefined?[]:[{
    name: 'projectcalicoIPAMConfigs',
    title: 'IPAMConfig', caption: 'List IPAMConfig', icon: iconIPAMConfig,
    link: '/network/projectcalico/IPAMConfig/', level: 2, children: []
  }],
  crds['ipamhandles.crd.projectcalico.org'] == undefined?[]:[{
    name: 'projectcalicoIPAMHandles',
    title: 'IPAMHandle', caption: 'List IPAMHandle', icon: iconIPAMHandle,
    link: '/network/projectcalico/IPAMHandle/', level: 2, children: []
  }],
  crds['ippools.crd.projectcalico.org'] == undefined?[]:[{
    name: 'projectcalicoIPPools',
    title: 'IPPool', caption: 'List IPPool', icon: iconIPPool,
    link: '/network/projectcalico/IPPool/', level: 2, children: []
  }],
  crds['ipreservations.crd.projectcalico.org'] == undefined?[]:[{
    name: 'projectcalicoIPReservations',
    title: 'IPReservation', caption: 'List IPReservation', icon: iconIPReservation,
    link: '/network/projectcalico/IPReservation/', level: 2, children: []
  }],
  crds['kubecontrollersconfigurations.crd.projectcalico.org'] == undefined?[]:[{
    name: 'projectcalicoKubeControllersConfigurations',
    title: 'KubeControllersConfiguration', caption: 'List KubeControllersConfiguration', icon: iconKubeControllersConfiguration,
    link: '/network/projectcalico/KubeControllersConfiguration/', level: 2, children: []
  }],
  crds['networksets.crd.projectcalico.org'] == undefined?[]:[{
    name: 'projectcalicoNetworkSets',
    title: 'NetworkSet', caption: 'List NetworkSet', icon: iconNetworkSet,
    link: '/network/projectcalico/NetworkSet/', level: 2, children: []
  }],
  ].flat()
}
export const descriptions = {
  networkprojectcalico:                {breadcrumb: projectcalicoTitle, icon: projectcalicoIcon, ns: false},
  networkprojectcalicoDashboard:       {breadcrumb: 'Dashboard', icon: projectcalicoIcon, ns: false},
  projectcalicoBGPConfiguration:        {breadcrumb: 'BGPConfiguration', icon: iconBGPConfiguration, ns: false},
  projectcalicoBGPConfigurationTable:    {breadcrumb: 'List', icon: 'list', ns: false },
  projectcalicoBGPConfigurationView:     {breadcrumb: 'View', icon: iconBGPConfiguration, ns: false },
  projectcalicoBGPConfigurationEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: false },
  projectcalicoBGPConfigurationCreate:   {breadcrumb: 'Create', icon: 'add', ns: false },
  projectcalicoBGPPeer:        {breadcrumb: 'BGPPeer', icon: iconBGPPeer, ns: false},
  projectcalicoBGPPeerTable:    {breadcrumb: 'List', icon: 'list', ns: false },
  projectcalicoBGPPeerView:     {breadcrumb: 'View', icon: iconBGPPeer, ns: false },
  projectcalicoBGPPeerEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: false },
  projectcalicoBGPPeerCreate:   {breadcrumb: 'Create', icon: 'add', ns: false },
  projectcalicoBlockAffinity:        {breadcrumb: 'BlockAffinity', icon: iconBlockAffinity, ns: false},
  projectcalicoBlockAffinityTable:    {breadcrumb: 'List', icon: 'list', ns: false },
  projectcalicoBlockAffinityView:     {breadcrumb: 'View', icon: iconBlockAffinity, ns: false },
  projectcalicoBlockAffinityEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: false },
  projectcalicoBlockAffinityCreate:   {breadcrumb: 'Create', icon: 'add', ns: false },
  projectcalicoCalicoNodeStatus:        {breadcrumb: 'CalicoNodeStatus', icon: iconCalicoNodeStatus, ns: false},
  projectcalicoCalicoNodeStatusTable:    {breadcrumb: 'List', icon: 'list', ns: false },
  projectcalicoCalicoNodeStatusView:     {breadcrumb: 'View', icon: iconCalicoNodeStatus, ns: false },
  projectcalicoCalicoNodeStatusEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: false },
  projectcalicoCalicoNodeStatusCreate:   {breadcrumb: 'Create', icon: 'add', ns: false },
  projectcalicoClusterInformation:        {breadcrumb: 'ClusterInformation', icon: iconClusterInformation, ns: false},
  projectcalicoClusterInformationTable:    {breadcrumb: 'List', icon: 'list', ns: false },
  projectcalicoClusterInformationView:     {breadcrumb: 'View', icon: iconClusterInformation, ns: false },
  projectcalicoClusterInformationEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: false },
  projectcalicoClusterInformationCreate:   {breadcrumb: 'Create', icon: 'add', ns: false },
  projectcalicoFelixConfiguration:        {breadcrumb: 'FelixConfiguration', icon: iconFelixConfiguration, ns: false},
  projectcalicoFelixConfigurationTable:    {breadcrumb: 'List', icon: 'list', ns: false },
  projectcalicoFelixConfigurationView:     {breadcrumb: 'View', icon: iconFelixConfiguration, ns: false },
  projectcalicoFelixConfigurationEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: false },
  projectcalicoFelixConfigurationCreate:   {breadcrumb: 'Create', icon: 'add', ns: false },
  projectcalicoGlobalNetworkPolicy:        {breadcrumb: 'GlobalNetworkPolicy', icon: iconGlobalNetworkPolicy, ns: false},
  projectcalicoGlobalNetworkPolicyTable:    {breadcrumb: 'List', icon: 'list', ns: false },
  projectcalicoGlobalNetworkPolicyView:     {breadcrumb: 'View', icon: iconGlobalNetworkPolicy, ns: false },
  projectcalicoGlobalNetworkPolicyEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: false },
  projectcalicoGlobalNetworkPolicyCreate:   {breadcrumb: 'Create', icon: 'add', ns: false },
  projectcalicoGlobalNetworkSet:        {breadcrumb: 'GlobalNetworkSet', icon: iconGlobalNetworkSet, ns: false},
  projectcalicoGlobalNetworkSetTable:    {breadcrumb: 'List', icon: 'list', ns: false },
  projectcalicoGlobalNetworkSetView:     {breadcrumb: 'View', icon: iconGlobalNetworkSet, ns: false },
  projectcalicoGlobalNetworkSetEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: false },
  projectcalicoGlobalNetworkSetCreate:   {breadcrumb: 'Create', icon: 'add', ns: false },
  projectcalicoHostEndpoint:        {breadcrumb: 'HostEndpoint', icon: iconHostEndpoint, ns: false},
  projectcalicoHostEndpointTable:    {breadcrumb: 'List', icon: 'list', ns: false },
  projectcalicoHostEndpointView:     {breadcrumb: 'View', icon: iconHostEndpoint, ns: false },
  projectcalicoHostEndpointEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: false },
  projectcalicoHostEndpointCreate:   {breadcrumb: 'Create', icon: 'add', ns: false },
  projectcalicoIPAMBlock:        {breadcrumb: 'IPAMBlock', icon: iconIPAMBlock, ns: false},
  projectcalicoIPAMBlockTable:    {breadcrumb: 'List', icon: 'list', ns: false },
  projectcalicoIPAMBlockView:     {breadcrumb: 'View', icon: iconIPAMBlock, ns: false },
  projectcalicoIPAMBlockEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: false },
  projectcalicoIPAMBlockCreate:   {breadcrumb: 'Create', icon: 'add', ns: false },
  projectcalicoIPAMConfig:        {breadcrumb: 'IPAMConfig', icon: iconIPAMConfig, ns: false},
  projectcalicoIPAMConfigTable:    {breadcrumb: 'List', icon: 'list', ns: false },
  projectcalicoIPAMConfigView:     {breadcrumb: 'View', icon: iconIPAMConfig, ns: false },
  projectcalicoIPAMConfigEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: false },
  projectcalicoIPAMConfigCreate:   {breadcrumb: 'Create', icon: 'add', ns: false },
  projectcalicoIPAMHandle:        {breadcrumb: 'IPAMHandle', icon: iconIPAMHandle, ns: false},
  projectcalicoIPAMHandleTable:    {breadcrumb: 'List', icon: 'list', ns: false },
  projectcalicoIPAMHandleView:     {breadcrumb: 'View', icon: iconIPAMHandle, ns: false },
  projectcalicoIPAMHandleEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: false },
  projectcalicoIPAMHandleCreate:   {breadcrumb: 'Create', icon: 'add', ns: false },
  projectcalicoIPPool:        {breadcrumb: 'IPPool', icon: iconIPPool, ns: false},
  projectcalicoIPPoolTable:    {breadcrumb: 'List', icon: 'list', ns: false },
  projectcalicoIPPoolView:     {breadcrumb: 'View', icon: iconIPPool, ns: false },
  projectcalicoIPPoolEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: false },
  projectcalicoIPPoolCreate:   {breadcrumb: 'Create', icon: 'add', ns: false },
  projectcalicoIPReservation:        {breadcrumb: 'IPReservation', icon: iconIPReservation, ns: false},
  projectcalicoIPReservationTable:    {breadcrumb: 'List', icon: 'list', ns: false },
  projectcalicoIPReservationView:     {breadcrumb: 'View', icon: iconIPReservation, ns: false },
  projectcalicoIPReservationEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: false },
  projectcalicoIPReservationCreate:   {breadcrumb: 'Create', icon: 'add', ns: false },
  projectcalicoKubeControllersConfiguration:        {breadcrumb: 'KubeControllersConfiguration', icon: iconKubeControllersConfiguration, ns: false},
  projectcalicoKubeControllersConfigurationTable:    {breadcrumb: 'List', icon: 'list', ns: false },
  projectcalicoKubeControllersConfigurationView:     {breadcrumb: 'View', icon: iconKubeControllersConfiguration, ns: false },
  projectcalicoKubeControllersConfigurationEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: false },
  projectcalicoKubeControllersConfigurationCreate:   {breadcrumb: 'Create', icon: 'add', ns: false },
  projectcalicoNetworkSet:        {breadcrumb: 'NetworkSet', icon: iconNetworkSet, ns: false},
  projectcalicoNetworkSetAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  projectcalicoNetworkSetTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  projectcalicoNetworkSetView:     {breadcrumb: 'View', icon: iconNetworkSet, ns: true },
  projectcalicoNetworkSetEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  projectcalicoNetworkSetCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
}
export const route = {
  path: 'projectcalico',
  name: 'networkprojectcalico',
  redirect: {path: link.link as string},
  children: [
    {
      path: '',
      name: 'networkprojectcalicoDashboard',
      component: () => import('../../pages/network/projectcalico/Dashboard.vue'),
    },
    {
      path: 'BGPConfiguration',
      name: 'projectcalicoBGPConfiguration',
      children: [
        {
          path: '',
          name: 'projectcalicoBGPConfigurationTable',
          component: () => import('../../pages/network/projectcalico/BGPConfigurationList.vue'),
        },
        {
          path: 'view/:name',
          name: 'projectcalicoBGPConfigurationView',
          component: () => import('../../pages/network/projectcalico/BGPConfigurationView.vue'),
        },
        {
          path: 'edit/:name',
          name: 'projectcalicoBGPConfigurationEdit',
          component: () => import('../../pages/network/projectcalico/BGPConfigurationEdit.vue'),
        },
        {
          path: 'create',
          name: 'projectcalicoBGPConfigurationCreate',
          component: () => import('../../pages/network/projectcalico/BGPConfigurationNew.vue'),
        }
      ]
    },
    {
      path: 'BGPPeer',
      name: 'projectcalicoBGPPeer',
      children: [
        {
          path: '',
          name: 'projectcalicoBGPPeerTable',
          component: () => import('../../pages/network/projectcalico/BGPPeerList.vue'),
        },
        {
          path: 'view/:name',
          name: 'projectcalicoBGPPeerView',
          component: () => import('../../pages/network/projectcalico/BGPPeerView.vue'),
        },
        {
          path: 'edit/:name',
          name: 'projectcalicoBGPPeerEdit',
          component: () => import('../../pages/network/projectcalico/BGPPeerEdit.vue'),
        },
        {
          path: 'create',
          name: 'projectcalicoBGPPeerCreate',
          component: () => import('../../pages/network/projectcalico/BGPPeerNew.vue'),
        }
      ]
    },
    {
      path: 'BlockAffinity',
      name: 'projectcalicoBlockAffinity',
      children: [
        {
          path: '',
          name: 'projectcalicoBlockAffinityTable',
          component: () => import('../../pages/network/projectcalico/BlockAffinityList.vue'),
        },
        {
          path: 'view/:name',
          name: 'projectcalicoBlockAffinityView',
          component: () => import('../../pages/network/projectcalico/BlockAffinityView.vue'),
        },
        {
          path: 'edit/:name',
          name: 'projectcalicoBlockAffinityEdit',
          component: () => import('../../pages/network/projectcalico/BlockAffinityEdit.vue'),
        },
        {
          path: 'create',
          name: 'projectcalicoBlockAffinityCreate',
          component: () => import('../../pages/network/projectcalico/BlockAffinityNew.vue'),
        }
      ]
    },
    {
      path: 'CalicoNodeStatus',
      name: 'projectcalicoCalicoNodeStatus',
      children: [
        {
          path: '',
          name: 'projectcalicoCalicoNodeStatusTable',
          component: () => import('../../pages/network/projectcalico/CalicoNodeStatusList.vue'),
        },
        {
          path: 'view/:name',
          name: 'projectcalicoCalicoNodeStatusView',
          component: () => import('../../pages/network/projectcalico/CalicoNodeStatusView.vue'),
        },
        {
          path: 'edit/:name',
          name: 'projectcalicoCalicoNodeStatusEdit',
          component: () => import('../../pages/network/projectcalico/CalicoNodeStatusEdit.vue'),
        },
        {
          path: 'create',
          name: 'projectcalicoCalicoNodeStatusCreate',
          component: () => import('../../pages/network/projectcalico/CalicoNodeStatusNew.vue'),
        }
      ]
    },
    {
      path: 'ClusterInformation',
      name: 'projectcalicoClusterInformation',
      children: [
        {
          path: '',
          name: 'projectcalicoClusterInformationTable',
          component: () => import('../../pages/network/projectcalico/ClusterInformationList.vue'),
        },
        {
          path: 'view/:name',
          name: 'projectcalicoClusterInformationView',
          component: () => import('../../pages/network/projectcalico/ClusterInformationView.vue'),
        },
        {
          path: 'edit/:name',
          name: 'projectcalicoClusterInformationEdit',
          component: () => import('../../pages/network/projectcalico/ClusterInformationEdit.vue'),
        },
        {
          path: 'create',
          name: 'projectcalicoClusterInformationCreate',
          component: () => import('../../pages/network/projectcalico/ClusterInformationNew.vue'),
        }
      ]
    },
    {
      path: 'FelixConfiguration',
      name: 'projectcalicoFelixConfiguration',
      children: [
        {
          path: '',
          name: 'projectcalicoFelixConfigurationTable',
          component: () => import('../../pages/network/projectcalico/FelixConfigurationList.vue'),
        },
        {
          path: 'view/:name',
          name: 'projectcalicoFelixConfigurationView',
          component: () => import('../../pages/network/projectcalico/FelixConfigurationView.vue'),
        },
        {
          path: 'edit/:name',
          name: 'projectcalicoFelixConfigurationEdit',
          component: () => import('../../pages/network/projectcalico/FelixConfigurationEdit.vue'),
        },
        {
          path: 'create',
          name: 'projectcalicoFelixConfigurationCreate',
          component: () => import('../../pages/network/projectcalico/FelixConfigurationNew.vue'),
        }
      ]
    },
    {
      path: 'GlobalNetworkPolicy',
      name: 'projectcalicoGlobalNetworkPolicy',
      children: [
        {
          path: '',
          name: 'projectcalicoGlobalNetworkPolicyTable',
          component: () => import('../../pages/network/projectcalico/GlobalNetworkPolicyList.vue'),
        },
        {
          path: 'view/:name',
          name: 'projectcalicoGlobalNetworkPolicyView',
          component: () => import('../../pages/network/projectcalico/GlobalNetworkPolicyView.vue'),
        },
        {
          path: 'edit/:name',
          name: 'projectcalicoGlobalNetworkPolicyEdit',
          component: () => import('../../pages/network/projectcalico/GlobalNetworkPolicyEdit.vue'),
        },
        {
          path: 'create',
          name: 'projectcalicoGlobalNetworkPolicyCreate',
          component: () => import('../../pages/network/projectcalico/GlobalNetworkPolicyNew.vue'),
        }
      ]
    },
    {
      path: 'GlobalNetworkSet',
      name: 'projectcalicoGlobalNetworkSet',
      children: [
        {
          path: '',
          name: 'projectcalicoGlobalNetworkSetTable',
          component: () => import('../../pages/network/projectcalico/GlobalNetworkSetList.vue'),
        },
        {
          path: 'view/:name',
          name: 'projectcalicoGlobalNetworkSetView',
          component: () => import('../../pages/network/projectcalico/GlobalNetworkSetView.vue'),
        },
        {
          path: 'edit/:name',
          name: 'projectcalicoGlobalNetworkSetEdit',
          component: () => import('../../pages/network/projectcalico/GlobalNetworkSetEdit.vue'),
        },
        {
          path: 'create',
          name: 'projectcalicoGlobalNetworkSetCreate',
          component: () => import('../../pages/network/projectcalico/GlobalNetworkSetNew.vue'),
        }
      ]
    },
    {
      path: 'HostEndpoint',
      name: 'projectcalicoHostEndpoint',
      children: [
        {
          path: '',
          name: 'projectcalicoHostEndpointTable',
          component: () => import('../../pages/network/projectcalico/HostEndpointList.vue'),
        },
        {
          path: 'view/:name',
          name: 'projectcalicoHostEndpointView',
          component: () => import('../../pages/network/projectcalico/HostEndpointView.vue'),
        },
        {
          path: 'edit/:name',
          name: 'projectcalicoHostEndpointEdit',
          component: () => import('../../pages/network/projectcalico/HostEndpointEdit.vue'),
        },
        {
          path: 'create',
          name: 'projectcalicoHostEndpointCreate',
          component: () => import('../../pages/network/projectcalico/HostEndpointNew.vue'),
        }
      ]
    },
    {
      path: 'IPAMBlock',
      name: 'projectcalicoIPAMBlock',
      children: [
        {
          path: '',
          name: 'projectcalicoIPAMBlockTable',
          component: () => import('../../pages/network/projectcalico/IPAMBlockList.vue'),
        },
        {
          path: 'view/:name',
          name: 'projectcalicoIPAMBlockView',
          component: () => import('../../pages/network/projectcalico/IPAMBlockView.vue'),
        },
        {
          path: 'edit/:name',
          name: 'projectcalicoIPAMBlockEdit',
          component: () => import('../../pages/network/projectcalico/IPAMBlockEdit.vue'),
        },
        {
          path: 'create',
          name: 'projectcalicoIPAMBlockCreate',
          component: () => import('../../pages/network/projectcalico/IPAMBlockNew.vue'),
        }
      ]
    },
    {
      path: 'IPAMConfig',
      name: 'projectcalicoIPAMConfig',
      children: [
        {
          path: '',
          name: 'projectcalicoIPAMConfigTable',
          component: () => import('../../pages/network/projectcalico/IPAMConfigList.vue'),
        },
        {
          path: 'view/:name',
          name: 'projectcalicoIPAMConfigView',
          component: () => import('../../pages/network/projectcalico/IPAMConfigView.vue'),
        },
        {
          path: 'edit/:name',
          name: 'projectcalicoIPAMConfigEdit',
          component: () => import('../../pages/network/projectcalico/IPAMConfigEdit.vue'),
        },
        {
          path: 'create',
          name: 'projectcalicoIPAMConfigCreate',
          component: () => import('../../pages/network/projectcalico/IPAMConfigNew.vue'),
        }
      ]
    },
    {
      path: 'IPAMHandle',
      name: 'projectcalicoIPAMHandle',
      children: [
        {
          path: '',
          name: 'projectcalicoIPAMHandleTable',
          component: () => import('../../pages/network/projectcalico/IPAMHandleList.vue'),
        },
        {
          path: 'view/:name',
          name: 'projectcalicoIPAMHandleView',
          component: () => import('../../pages/network/projectcalico/IPAMHandleView.vue'),
        },
        {
          path: 'edit/:name',
          name: 'projectcalicoIPAMHandleEdit',
          component: () => import('../../pages/network/projectcalico/IPAMHandleEdit.vue'),
        },
        {
          path: 'create',
          name: 'projectcalicoIPAMHandleCreate',
          component: () => import('../../pages/network/projectcalico/IPAMHandleNew.vue'),
        }
      ]
    },
    {
      path: 'IPPool',
      name: 'projectcalicoIPPool',
      children: [
        {
          path: '',
          name: 'projectcalicoIPPoolTable',
          component: () => import('../../pages/network/projectcalico/IPPoolList.vue'),
        },
        {
          path: 'view/:name',
          name: 'projectcalicoIPPoolView',
          component: () => import('../../pages/network/projectcalico/IPPoolView.vue'),
        },
        {
          path: 'edit/:name',
          name: 'projectcalicoIPPoolEdit',
          component: () => import('../../pages/network/projectcalico/IPPoolEdit.vue'),
        },
        {
          path: 'create',
          name: 'projectcalicoIPPoolCreate',
          component: () => import('../../pages/network/projectcalico/IPPoolNew.vue'),
        }
      ]
    },
    {
      path: 'IPReservation',
      name: 'projectcalicoIPReservation',
      children: [
        {
          path: '',
          name: 'projectcalicoIPReservationTable',
          component: () => import('../../pages/network/projectcalico/IPReservationList.vue'),
        },
        {
          path: 'view/:name',
          name: 'projectcalicoIPReservationView',
          component: () => import('../../pages/network/projectcalico/IPReservationView.vue'),
        },
        {
          path: 'edit/:name',
          name: 'projectcalicoIPReservationEdit',
          component: () => import('../../pages/network/projectcalico/IPReservationEdit.vue'),
        },
        {
          path: 'create',
          name: 'projectcalicoIPReservationCreate',
          component: () => import('../../pages/network/projectcalico/IPReservationNew.vue'),
        }
      ]
    },
    {
      path: 'KubeControllersConfiguration',
      name: 'projectcalicoKubeControllersConfiguration',
      children: [
        {
          path: '',
          name: 'projectcalicoKubeControllersConfigurationTable',
          component: () => import('../../pages/network/projectcalico/KubeControllersConfigurationList.vue'),
        },
        {
          path: 'view/:name',
          name: 'projectcalicoKubeControllersConfigurationView',
          component: () => import('../../pages/network/projectcalico/KubeControllersConfigurationView.vue'),
        },
        {
          path: 'edit/:name',
          name: 'projectcalicoKubeControllersConfigurationEdit',
          component: () => import('../../pages/network/projectcalico/KubeControllersConfigurationEdit.vue'),
        },
        {
          path: 'create',
          name: 'projectcalicoKubeControllersConfigurationCreate',
          component: () => import('../../pages/network/projectcalico/KubeControllersConfigurationNew.vue'),
        }
      ]
    },
    {
      path: 'NetworkSet',
      name: 'projectcalicoNetworkSet',
      children: [
        {
          path: '',
          name: 'projectcalicoNetworkSetAllTable',
          component: () => import('../../pages/network/projectcalico/NetworkSetList.vue'),
        },
        {
          path: ':namespace',
          name: 'projectcalicoNetworkSetTable',
          component: () => import('../../pages/network/projectcalico/NetworkSetList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'projectcalicoNetworkSetView',
          component: () => import('../../pages/network/projectcalico/NetworkSetView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'projectcalicoNetworkSetEdit',
          component: () => import('../../pages/network/projectcalico/NetworkSetEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'projectcalicoNetworkSetCreate',
          component: () => import('../../pages/network/projectcalico/NetworkSetNew.vue'),
        }
      ]
    },
  ],
}
export default route
