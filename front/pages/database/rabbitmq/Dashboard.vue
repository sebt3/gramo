<script setup lang="ts">
import databaseQuery from '@/queries/rabbitmq/database.read.graphql'
import pieChart from '@/components/charts/pieChart.vue';
import rabbitmqRabbitmqClusterList from '@/components/rabbitmq/RabbitmqClusterList.vue';
import { RabbitmqClusterListExcludes } from '../../../libs/rabbitmq/RabbitmqCluster.js'
import { ref, useCore, useNavigationStoreRef, useQuery } from '../../../libs/core';
const { onErrorHandler, setNamespaceFromRoute, isNamespaced } = useCore();
const ready = ref(false);
const RabbitmqClusterByTs = ref([]);
if (isNamespaced()) setNamespaceFromRoute();
const navigation = useNavigationStoreRef();
const { result, refetch, onResult, onError } = useQuery(databaseQuery, {
  "RabbitmqCluster": {
    "filters": [],
    "excludes": RabbitmqClusterListExcludes
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
    RabbitmqClusterByTs.value.length = 0;
    RabbitmqClusterByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.rabbitmqRabbitmqCluster.length}}).filter(n => n.value>0))
    ready.value = true;
  }
})
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-lg-4" v-if="ready && RabbitmqClusterByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">RabbitmqCluster per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="RabbitmqClusterByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <rabbitmqRabbitmqClusterList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['rabbitmqRabbitmqCluster']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.rabbitmqRabbitmqCluster).flat()"
  />
</template>