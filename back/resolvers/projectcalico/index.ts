
import { queries as BGPConfigurationQueries } from './query.BGPConfiguration.js';
import { mutations as BGPConfigurationMutations } from './mutation.BGPConfiguration.js';
import { queries as BGPPeerQueries } from './query.BGPPeer.js';
import { mutations as BGPPeerMutations } from './mutation.BGPPeer.js';
import { queries as BlockAffinityQueries } from './query.BlockAffinity.js';
import { mutations as BlockAffinityMutations } from './mutation.BlockAffinity.js';
import { queries as CalicoNodeStatusQueries } from './query.CalicoNodeStatus.js';
import { mutations as CalicoNodeStatusMutations } from './mutation.CalicoNodeStatus.js';
import { queries as ClusterInformationQueries } from './query.ClusterInformation.js';
import { mutations as ClusterInformationMutations } from './mutation.ClusterInformation.js';
import { queries as FelixConfigurationQueries } from './query.FelixConfiguration.js';
import { mutations as FelixConfigurationMutations } from './mutation.FelixConfiguration.js';
import { queries as GlobalNetworkPolicyQueries } from './query.GlobalNetworkPolicy.js';
import { mutations as GlobalNetworkPolicyMutations } from './mutation.GlobalNetworkPolicy.js';
import { queries as GlobalNetworkSetQueries } from './query.GlobalNetworkSet.js';
import { mutations as GlobalNetworkSetMutations } from './mutation.GlobalNetworkSet.js';
import { queries as HostEndpointQueries } from './query.HostEndpoint.js';
import { mutations as HostEndpointMutations } from './mutation.HostEndpoint.js';
import { queries as IPAMBlockQueries } from './query.IPAMBlock.js';
import { mutations as IPAMBlockMutations } from './mutation.IPAMBlock.js';
import { queries as IPAMConfigQueries } from './query.IPAMConfig.js';
import { mutations as IPAMConfigMutations } from './mutation.IPAMConfig.js';
import { queries as IPAMHandleQueries } from './query.IPAMHandle.js';
import { mutations as IPAMHandleMutations } from './mutation.IPAMHandle.js';
import { queries as IPPoolQueries } from './query.IPPool.js';
import { mutations as IPPoolMutations } from './mutation.IPPool.js';
import { queries as IPReservationQueries } from './query.IPReservation.js';
import { mutations as IPReservationMutations } from './mutation.IPReservation.js';
import { queries as KubeControllersConfigurationQueries } from './query.KubeControllersConfiguration.js';
import { mutations as KubeControllersConfigurationMutations } from './mutation.KubeControllersConfiguration.js';
import { queries as NetworkPolicyQueries } from './query.NetworkPolicy.js';
import { mutations as NetworkPolicyMutations } from './mutation.NetworkPolicy.js';
import { queries as NetworkSetQueries } from './query.NetworkSet.js';
import { mutations as NetworkSetMutations } from './mutation.NetworkSet.js';
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
    ...NetworkPolicyQueries,
    ...NetworkSetQueries,
};

export const resolvers = {
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
};
