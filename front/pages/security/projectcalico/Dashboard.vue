<script setup lang="ts">
import securityQuery from '@/queries/projectcalico/security.read.graphql'
import pieChart from '@/components/charts/pieChart.vue';
import projectcalicoNetworkPolicyList from '@/components/projectcalico/NetworkPolicyList.vue';
import { NetworkPolicyListExcludes } from '../../../libs/projectcalico/NetworkPolicy.js'
import { ref, useCore, useNavigationStoreRef, useQuery } from '../../../libs/core';
const { onErrorHandler, setNamespaceFromRoute, isNamespaced } = useCore();
const ready = ref(false);
const NetworkPolicyByTs = ref([]);
if (isNamespaced()) setNamespaceFromRoute();
const navigation = useNavigationStoreRef();
const { result, refetch, onResult, onError } = useQuery(securityQuery, {
  "NetworkPolicy": {
    "filters": [],
    "excludes": NetworkPolicyListExcludes
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
    NetworkPolicyByTs.value.length = 0;
    NetworkPolicyByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.projectcalicoNetworkPolicy.length}}).filter(n => n.value>0))
    ready.value = true;
  }
})
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-lg-4" v-if="ready && NetworkPolicyByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">NetworkPolicy per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="NetworkPolicyByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <projectcalicoNetworkPolicyList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['projectcalicoNetworkPolicy']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.projectcalicoNetworkPolicy).flat()"
  />
</template>