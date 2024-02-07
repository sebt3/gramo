<script setup lang="ts">
import networkQuery from '@/queries/projectcalico/network.read.graphql'
import pieChart from '@/components/charts/pieChart.vue';
import projectcalicoBGPConfigurationList from '@/components/projectcalico/BGPConfigurationList.vue';
import { BGPConfigurationListExcludes } from '../../../libs/projectcalico/BGPConfiguration.js'
import projectcalicoBGPPeerList from '@/components/projectcalico/BGPPeerList.vue';
import { BGPPeerListExcludes } from '../../../libs/projectcalico/BGPPeer.js'
import projectcalicoBlockAffinityList from '@/components/projectcalico/BlockAffinityList.vue';
import { BlockAffinityListExcludes } from '../../../libs/projectcalico/BlockAffinity.js'
import projectcalicoCalicoNodeStatusList from '@/components/projectcalico/CalicoNodeStatusList.vue';
import { CalicoNodeStatusListExcludes } from '../../../libs/projectcalico/CalicoNodeStatus.js'
import projectcalicoClusterInformationList from '@/components/projectcalico/ClusterInformationList.vue';
import { ClusterInformationListExcludes } from '../../../libs/projectcalico/ClusterInformation.js'
import projectcalicoFelixConfigurationList from '@/components/projectcalico/FelixConfigurationList.vue';
import { FelixConfigurationListExcludes } from '../../../libs/projectcalico/FelixConfiguration.js'
import projectcalicoGlobalNetworkPolicyList from '@/components/projectcalico/GlobalNetworkPolicyList.vue';
import { GlobalNetworkPolicyListExcludes } from '../../../libs/projectcalico/GlobalNetworkPolicy.js'
import projectcalicoGlobalNetworkSetList from '@/components/projectcalico/GlobalNetworkSetList.vue';
import { GlobalNetworkSetListExcludes } from '../../../libs/projectcalico/GlobalNetworkSet.js'
import projectcalicoHostEndpointList from '@/components/projectcalico/HostEndpointList.vue';
import { HostEndpointListExcludes } from '../../../libs/projectcalico/HostEndpoint.js'
import projectcalicoIPAMBlockList from '@/components/projectcalico/IPAMBlockList.vue';
import { IPAMBlockListExcludes } from '../../../libs/projectcalico/IPAMBlock.js'
import projectcalicoIPAMConfigList from '@/components/projectcalico/IPAMConfigList.vue';
import { IPAMConfigListExcludes } from '../../../libs/projectcalico/IPAMConfig.js'
import projectcalicoIPAMHandleList from '@/components/projectcalico/IPAMHandleList.vue';
import { IPAMHandleListExcludes } from '../../../libs/projectcalico/IPAMHandle.js'
import projectcalicoIPPoolList from '@/components/projectcalico/IPPoolList.vue';
import { IPPoolListExcludes } from '../../../libs/projectcalico/IPPool.js'
import projectcalicoIPReservationList from '@/components/projectcalico/IPReservationList.vue';
import { IPReservationListExcludes } from '../../../libs/projectcalico/IPReservation.js'
import projectcalicoKubeControllersConfigurationList from '@/components/projectcalico/KubeControllersConfigurationList.vue';
import { KubeControllersConfigurationListExcludes } from '../../../libs/projectcalico/KubeControllersConfiguration.js'
import projectcalicoNetworkSetList from '@/components/projectcalico/NetworkSetList.vue';
import { NetworkSetListExcludes } from '../../../libs/projectcalico/NetworkSet.js'
import { ref, useCore, useNavigationStoreRef, useQuery } from '../../../libs/core';
const { onErrorHandler, setNamespaceFromRoute, isNamespaced } = useCore();
const ready = ref(false);
const NetworkSetByTs = ref([]);
if (isNamespaced()) setNamespaceFromRoute();
const navigation = useNavigationStoreRef();
const { result, refetch, onResult, onError } = useQuery(networkQuery, {
  "BGPConfiguration": {
    "filters": [],
    "excludes": BGPConfigurationListExcludes
  },
  "BGPPeer": {
    "filters": [],
    "excludes": BGPPeerListExcludes
  },
  "BlockAffinity": {
    "filters": [],
    "excludes": BlockAffinityListExcludes
  },
  "CalicoNodeStatus": {
    "filters": [],
    "excludes": CalicoNodeStatusListExcludes
  },
  "ClusterInformation": {
    "filters": [],
    "excludes": ClusterInformationListExcludes
  },
  "FelixConfiguration": {
    "filters": [],
    "excludes": FelixConfigurationListExcludes
  },
  "GlobalNetworkPolicy": {
    "filters": [],
    "excludes": GlobalNetworkPolicyListExcludes
  },
  "GlobalNetworkSet": {
    "filters": [],
    "excludes": GlobalNetworkSetListExcludes
  },
  "HostEndpoint": {
    "filters": [],
    "excludes": HostEndpointListExcludes
  },
  "IPAMBlock": {
    "filters": [],
    "excludes": IPAMBlockListExcludes
  },
  "IPAMConfig": {
    "filters": [],
    "excludes": IPAMConfigListExcludes
  },
  "IPAMHandle": {
    "filters": [],
    "excludes": IPAMHandleListExcludes
  },
  "IPPool": {
    "filters": [],
    "excludes": IPPoolListExcludes
  },
  "IPReservation": {
    "filters": [],
    "excludes": IPReservationListExcludes
  },
  "KubeControllersConfiguration": {
    "filters": [],
    "excludes": KubeControllersConfigurationListExcludes
  },
  "NetworkSet": {
    "filters": [],
    "excludes": NetworkSetListExcludes
  },
  "namespace": {
    "filters": isNamespaced()?[
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentNamespace
      }
    ]:[]
  }
}, { pollInterval: 2000 });
onError(onErrorHandler);
onResult((res) => {
  if ( !res.loading ) {
    ready.value = false;
    NetworkSetByTs.value.length = 0;
    NetworkSetByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.projectcalicoNetworkSet.length}}).filter(n => n.value>0))
    ready.value = true;
  }
})
</script>
<template>
  <div class="row q-mb-sm q-ml-sm" v-if="isNamespaced()">
    <div class="col-lg-4" v-if="ready && NetworkSetByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">NetworkSet per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="NetworkSetByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <projectcalicoBGPConfigurationList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && Array.isArray(result['projectcalicoBGPConfiguration']) && result['projectcalicoBGPConfiguration'].length>0"
    :model="result.projectcalicoBGPConfiguration"
  />
  <projectcalicoBGPPeerList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && Array.isArray(result['projectcalicoBGPPeer']) && result['projectcalicoBGPPeer'].length>0"
    :model="result.projectcalicoBGPPeer"
  />
  <projectcalicoBlockAffinityList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && Array.isArray(result['projectcalicoBlockAffinity']) && result['projectcalicoBlockAffinity'].length>0"
    :model="result.projectcalicoBlockAffinity"
  />
  <projectcalicoCalicoNodeStatusList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && Array.isArray(result['projectcalicoCalicoNodeStatus']) && result['projectcalicoCalicoNodeStatus'].length>0"
    :model="result.projectcalicoCalicoNodeStatus"
  />
  <projectcalicoClusterInformationList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && Array.isArray(result['projectcalicoClusterInformation']) && result['projectcalicoClusterInformation'].length>0"
    :model="result.projectcalicoClusterInformation"
  />
  <projectcalicoFelixConfigurationList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && Array.isArray(result['projectcalicoFelixConfiguration']) && result['projectcalicoFelixConfiguration'].length>0"
    :model="result.projectcalicoFelixConfiguration"
  />
  <projectcalicoGlobalNetworkPolicyList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && Array.isArray(result['projectcalicoGlobalNetworkPolicy']) && result['projectcalicoGlobalNetworkPolicy'].length>0"
    :model="result.projectcalicoGlobalNetworkPolicy"
  />
  <projectcalicoGlobalNetworkSetList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && Array.isArray(result['projectcalicoGlobalNetworkSet']) && result['projectcalicoGlobalNetworkSet'].length>0"
    :model="result.projectcalicoGlobalNetworkSet"
  />
  <projectcalicoHostEndpointList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && Array.isArray(result['projectcalicoHostEndpoint']) && result['projectcalicoHostEndpoint'].length>0"
    :model="result.projectcalicoHostEndpoint"
  />
  <projectcalicoIPAMBlockList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && Array.isArray(result['projectcalicoIPAMBlock']) && result['projectcalicoIPAMBlock'].length>0"
    :model="result.projectcalicoIPAMBlock"
  />
  <projectcalicoIPAMConfigList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && Array.isArray(result['projectcalicoIPAMConfig']) && result['projectcalicoIPAMConfig'].length>0"
    :model="result.projectcalicoIPAMConfig"
  />
  <projectcalicoIPAMHandleList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && Array.isArray(result['projectcalicoIPAMHandle']) && result['projectcalicoIPAMHandle'].length>0"
    :model="result.projectcalicoIPAMHandle"
  />
  <projectcalicoIPPoolList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && Array.isArray(result['projectcalicoIPPool']) && result['projectcalicoIPPool'].length>0"
    :model="result.projectcalicoIPPool"
  />
  <projectcalicoIPReservationList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && Array.isArray(result['projectcalicoIPReservation']) && result['projectcalicoIPReservation'].length>0"
    :model="result.projectcalicoIPReservation"
  />
  <projectcalicoKubeControllersConfigurationList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && Array.isArray(result['projectcalicoKubeControllersConfiguration']) && result['projectcalicoKubeControllersConfiguration'].length>0"
    :model="result.projectcalicoKubeControllersConfiguration"
  />
  <projectcalicoNetworkSetList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['projectcalicoNetworkSet']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.projectcalicoNetworkSet).flat()"
  />
</template>