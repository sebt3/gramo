<script setup lang="ts">
import systemQuery from '@/queries/jaegertracing/system.read.graphql'
import pieChart from '@/components/charts/pieChart.vue';
import jaegertracingJaegerList from '@/components/jaegertracing/JaegerList.vue';
import { JaegerListExcludes } from '../../../libs/jaegertracing/Jaeger.js'
import { ref, useCore, useNavigationStoreRef, useQuery } from '../../../libs/core';
const { onErrorHandler, setNamespaceFromRoute, isNamespaced } = useCore();
const ready = ref(false);
const JaegerByTs = ref([]);
if (isNamespaced()) setNamespaceFromRoute();
const navigation = useNavigationStoreRef();
const { result, refetch, onResult, onError } = useQuery(systemQuery, {
  "Jaeger": {
    "filters": [],
    "excludes": JaegerListExcludes
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
    JaegerByTs.value.length = 0;
    JaegerByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.jaegertracingJaeger.length}}).filter(n => n.value>0))
    ready.value = true;
  }
})
</script>
<template>
  <div class="row q-mb-sm q-ml-sm" v-if="isNamespaced()">
    <div class="col-lg-4" v-if="ready && JaegerByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Jaeger per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="JaegerByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <jaegertracingJaegerList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['jaegertracingJaeger']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.jaegertracingJaeger).flat()"
  />
</template>