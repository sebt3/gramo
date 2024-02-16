// noGramoGenerator
import { QTableColumn } from 'quasar'
import { tableColumnAlign } from '../core'
import { networkColor, networkIcon, } from '../../routes/custom';
export const ciliumIcon = 'apps';
export const ciliumTitle = 'cilium';
export const iconCiliumClusterwideNetworkPolicy = networkIcon;
export const colorCiliumClusterwideNetworkPolicy = networkColor;
export const descriptionCiliumClusterwideNetworkPolicy = '';
export const shortCiliumClusterwideNetworkPolicy = 'CiliumClusterwideNetworkPolicy';
export const iconCiliumEndpoint = networkIcon;
export const colorCiliumEndpoint = networkColor;
export const descriptionCiliumEndpoint = '';
export const shortCiliumEndpoint = 'CiliumEndpoint';
export const iconCiliumExternalWorkload = networkIcon;
export const colorCiliumExternalWorkload = networkColor;
export const descriptionCiliumExternalWorkload = '';
export const shortCiliumExternalWorkload = 'CiliumExternalWorkload';
export const iconCiliumIdentity = networkIcon;
export const colorCiliumIdentity = networkColor;
export const descriptionCiliumIdentity = '';
export const shortCiliumIdentity = 'CiliumIdentity';
export const iconCiliumLocalRedirectPolicy = networkIcon;
export const colorCiliumLocalRedirectPolicy = networkColor;
export const descriptionCiliumLocalRedirectPolicy = '';
export const shortCiliumLocalRedirectPolicy = 'CiliumLocalRedirectPolicy';
export const iconCiliumNetworkPolicy = networkIcon;
export const colorCiliumNetworkPolicy = networkColor;
export const descriptionCiliumNetworkPolicy = '';
export const shortCiliumNetworkPolicy = 'CiliumNetworkPolicy';
export const iconCiliumNode = networkIcon;
export const colorCiliumNode = networkColor;
export const descriptionCiliumNode = '';
export const shortCiliumNode = 'CiliumNode';
export const iconCiliumCIDRGroup = networkIcon;
export const colorCiliumCIDRGroup = networkColor;
export const descriptionCiliumCIDRGroup = '';
export const shortCiliumCIDRGroup = 'CiliumCIDRGroup';
export const iconCiliumL2AnnouncementPolicy = networkIcon;
export const colorCiliumL2AnnouncementPolicy = networkColor;
export const descriptionCiliumL2AnnouncementPolicy = '';
export const shortCiliumL2AnnouncementPolicy = 'CiliumL2AnnouncementPolicy';
export const iconCiliumLoadBalancerIPPool = networkIcon;
export const colorCiliumLoadBalancerIPPool = networkColor;
export const descriptionCiliumLoadBalancerIPPool = '';
export const shortCiliumLoadBalancerIPPool = 'CiliumLoadBalancerIPPool';
export const iconCiliumNodeConfig = networkIcon;
export const colorCiliumNodeConfig = networkColor;
export const descriptionCiliumNodeConfig = '';
export const shortCiliumNodeConfig = 'CiliumNodeConfig';
export const iconCiliumPodIPPool = networkIcon;
export const colorCiliumPodIPPool = networkColor;
export const descriptionCiliumPodIPPool = '';
export const shortCiliumPodIPPool = 'CiliumPodIPPool';
export const extraCiliumClusterwideNetworkPolicyColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraCiliumEndpointColumns:Array<QTableColumn> = [
  {name: 'Endpoint ID', label: 'Endpoint ID', field: row => row.status.id, sortable: true, align: tableColumnAlign.left},
  {name: 'Identity ID', label: 'Identity ID', field: row => row.status.identity.id, sortable: true, align: tableColumnAlign.left},
  {name: 'Ingress Enforcement', label: 'Ingress Enforcement', field: row => row.status.policy.ingress.state, sortable: true, align: tableColumnAlign.left},
  {name: 'Egress Enforcement', label: 'Egress Enforcement', field: row => row.status.policy.egress.state, sortable: true, align: tableColumnAlign.left},
  {name: 'Visibility Policy', label: 'Visibility Policy', field: row => row.status['visibility-policy-status'], sortable: true, align: tableColumnAlign.left},
  {name: 'Endpoint State', label: 'Endpoint State', field: row => row.status.state, sortable: true, align: tableColumnAlign.left},
];
export const extraCiliumExternalWorkloadColumns:Array<QTableColumn> = [
  {name: 'Cilium ID', label: 'Cilium ID', field: row => row.status.id, sortable: true, align: tableColumnAlign.left},
  {name: 'IP', label: 'IP', field: row => row.status.ip, sortable: true, align: tableColumnAlign.left},
];
export const extraCiliumIdentityColumns:Array<QTableColumn> = [
  {name: 'Namespace', label: 'Namespace', field: row => row.metadata.labels['io.kubernetes.pod.namespace'], sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: 'Age', field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
];
export const extraCiliumLocalRedirectPolicyColumns:Array<QTableColumn> = [
  {name: 'Age', label: 'Age', field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
];
export const extraCiliumNetworkPolicyColumns:Array<QTableColumn> = [
  {name: 'Age', label: 'Age', field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
];
export const extraCiliumNodeColumns:Array<QTableColumn> = [
  {name: 'Age', label: 'Age', field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
];
export const extraCiliumCIDRGroupColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraCiliumL2AnnouncementPolicyColumns:Array<QTableColumn> = [
  {name: 'Age', label: 'Age', field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
];
export const extraCiliumLoadBalancerIPPoolColumns:Array<QTableColumn> = [
  {name: 'Disabled', label: 'Disabled', field: row => row.spec.disabled, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: 'Age', field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
];
export const extraCiliumNodeConfigColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraCiliumPodIPPoolColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const CiliumClusterwideNetworkPolicyListExcludes = [
];
export const CiliumClusterwideNetworkPolicyReadExcludes = [
];
export const CiliumClusterwideNetworkPolicySimpleExcludes = [
];
export const CiliumEndpointListExcludes = [
  { path: 'status/id', include: true },
  { path: 'status/identity/id', include: true },
  { path: 'status/policy/ingress/state', include: true },
  { path: 'status/policy/egress/state', include: true },
  { path: 'status/visibility-policy-status', include: true },
  { path: 'status/state', include: true },
];
export const CiliumEndpointReadExcludes = [
];
export const CiliumEndpointSimpleExcludes = [
];
export const CiliumExternalWorkloadListExcludes = [
  { path: 'status/id', include: true },
  { path: 'status/ip', include: true },
];
export const CiliumExternalWorkloadReadExcludes = [
];
export const CiliumExternalWorkloadSimpleExcludes = [
];
export const CiliumIdentityListExcludes = [
];
export const CiliumIdentityReadExcludes = [
];
export const CiliumIdentitySimpleExcludes = [
];
export const CiliumLocalRedirectPolicyListExcludes = [
];
export const CiliumLocalRedirectPolicyReadExcludes = [
];
export const CiliumLocalRedirectPolicySimpleExcludes = [
];
export const CiliumNetworkPolicyListExcludes = [
];
export const CiliumNetworkPolicyReadExcludes = [
];
export const CiliumNetworkPolicySimpleExcludes = [
];
export const CiliumNodeListExcludes = [
];
export const CiliumNodeReadExcludes = [
];
export const CiliumNodeSimpleExcludes = [
];
export const CiliumCIDRGroupListExcludes = [
];
export const CiliumCIDRGroupReadExcludes = [
];
export const CiliumCIDRGroupSimpleExcludes = [
];
export const CiliumL2AnnouncementPolicyListExcludes = [
];
export const CiliumL2AnnouncementPolicyReadExcludes = [
];
export const CiliumL2AnnouncementPolicySimpleExcludes = [
];
export const CiliumLoadBalancerIPPoolListExcludes = [
  { path: 'spec/disabled', include: true },
];
export const CiliumLoadBalancerIPPoolReadExcludes = [
];
export const CiliumLoadBalancerIPPoolSimpleExcludes = [
];
export const CiliumNodeConfigListExcludes = [
];
export const CiliumNodeConfigReadExcludes = [
];
export const CiliumNodeConfigSimpleExcludes = [
];
export const CiliumPodIPPoolListExcludes = [
];
export const CiliumPodIPPoolReadExcludes = [
];
export const CiliumPodIPPoolSimpleExcludes = [
];
