import { queries as customQueries, resolvers as customResolvers, mutations as customMutations } from './custom.js';
import { mutations as BGPConfigurationMutations, resolvers as BGPConfigurationResolvers, queries as BGPConfigurationQueries } from './BGPConfiguration.js';
import { mutations as BGPPeerMutations, resolvers as BGPPeerResolvers, queries as BGPPeerQueries } from './BGPPeer.js';
import { mutations as BlockAffinityMutations, resolvers as BlockAffinityResolvers, queries as BlockAffinityQueries } from './BlockAffinity.js';
import { mutations as CalicoNodeStatusMutations, resolvers as CalicoNodeStatusResolvers, queries as CalicoNodeStatusQueries } from './CalicoNodeStatus.js';
import { mutations as ClusterInformationMutations, resolvers as ClusterInformationResolvers, queries as ClusterInformationQueries } from './ClusterInformation.js';
import { mutations as FelixConfigurationMutations, resolvers as FelixConfigurationResolvers, queries as FelixConfigurationQueries } from './FelixConfiguration.js';
import { mutations as GlobalNetworkPolicyMutations, resolvers as GlobalNetworkPolicyResolvers, queries as GlobalNetworkPolicyQueries } from './GlobalNetworkPolicy.js';
import { mutations as GlobalNetworkSetMutations, resolvers as GlobalNetworkSetResolvers, queries as GlobalNetworkSetQueries } from './GlobalNetworkSet.js';
import { mutations as HostEndpointMutations, resolvers as HostEndpointResolvers, queries as HostEndpointQueries } from './HostEndpoint.js';
import { mutations as IPAMBlockMutations, resolvers as IPAMBlockResolvers, queries as IPAMBlockQueries } from './IPAMBlock.js';
import { mutations as IPAMConfigMutations, resolvers as IPAMConfigResolvers, queries as IPAMConfigQueries } from './IPAMConfig.js';
import { mutations as IPAMHandleMutations, resolvers as IPAMHandleResolvers, queries as IPAMHandleQueries } from './IPAMHandle.js';
import { mutations as IPPoolMutations, resolvers as IPPoolResolvers, queries as IPPoolQueries } from './IPPool.js';
import { mutations as IPReservationMutations, resolvers as IPReservationResolvers, queries as IPReservationQueries } from './IPReservation.js';
import { mutations as KubeControllersConfigurationMutations, resolvers as KubeControllersConfigurationResolvers, queries as KubeControllersConfigurationQueries } from './KubeControllersConfiguration.js';
import { mutations as NetworkPolicyMutations, resolvers as NetworkPolicyResolvers } from './NetworkPolicy.js';
import { mutations as NetworkSetMutations, resolvers as NetworkSetResolvers } from './NetworkSet.js';
export const queries = {
    ...BGPConfigurationQueries,
    ...BGPPeerQueries,
    ...BlockAffinityQueries,
    ...CalicoNodeStatusQueries,
    ...ClusterInformationQueries,
    ...FelixConfigurationQueries,
    ...GlobalNetworkPolicyQueries,
    ...GlobalNetworkSetQueries,
    ...HostEndpointQueries,
    ...IPAMBlockQueries,
    ...IPAMConfigQueries,
    ...IPAMHandleQueries,
    ...IPPoolQueries,
    ...IPReservationQueries,
    ...KubeControllersConfigurationQueries,
    ...customQueries
};

export const resolvers = {
    ...BGPConfigurationResolvers,
    ...BGPPeerResolvers,
    ...BlockAffinityResolvers,
    ...CalicoNodeStatusResolvers,
    ...ClusterInformationResolvers,
    ...FelixConfigurationResolvers,
    ...GlobalNetworkPolicyResolvers,
    ...GlobalNetworkSetResolvers,
    ...HostEndpointResolvers,
    ...IPAMBlockResolvers,
    ...IPAMConfigResolvers,
    ...IPAMHandleResolvers,
    ...IPPoolResolvers,
    ...IPReservationResolvers,
    ...KubeControllersConfigurationResolvers,
    ...NetworkPolicyResolvers,
    ...NetworkSetResolvers,
    ...customResolvers
};

export const mutations = {
    ...BGPConfigurationMutations,
    ...BGPPeerMutations,
    ...BlockAffinityMutations,
    ...CalicoNodeStatusMutations,
    ...ClusterInformationMutations,
    ...FelixConfigurationMutations,
    ...GlobalNetworkPolicyMutations,
    ...GlobalNetworkSetMutations,
    ...HostEndpointMutations,
    ...IPAMBlockMutations,
    ...IPAMConfigMutations,
    ...IPAMHandleMutations,
    ...IPPoolMutations,
    ...IPReservationMutations,
    ...KubeControllersConfigurationMutations,
    ...NetworkPolicyMutations,
    ...NetworkSetMutations,
    ...customMutations
};
