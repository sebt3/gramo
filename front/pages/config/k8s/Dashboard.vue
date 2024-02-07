<script setup lang="ts">
import configQuery from '@/queries/k8s/config.read.graphql'
import pieChart from '@/components/charts/pieChart.vue';
import k8sConfigMapList from '@/components/k8s/ConfigMapList.vue';
import { ConfigMapListExcludes } from '../../../libs/k8s/ConfigMap.js'
import k8sSecretList from '@/components/k8s/SecretList.vue';
import { SecretListExcludes } from '../../../libs/k8s/Secret.js'
import { ref, useCore, useNavigationStoreRef, useQuery } from '../../../libs/core';
const { onErrorHandler, setNamespaceFromRoute, isNamespaced } = useCore();
const ready = ref(false);
const ConfigMapByTs = ref([]);
const SecretByTs = ref([]);
if (isNamespaced()) setNamespaceFromRoute();
const navigation = useNavigationStoreRef();
const { result, refetch, onResult, onError } = useQuery(configQuery, {
  "ConfigMap": {
    "filters": [],
    "excludes": ConfigMapListExcludes
  },
  "Secret": {
    "filters": [],
    "excludes": SecretListExcludes
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
    ConfigMapByTs.value.length = 0;
    ConfigMapByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.k8sConfigMap.length}}).filter(n => n.value>0))
    SecretByTs.value.length = 0;
    SecretByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.k8sSecret.length}}).filter(n => n.value>0))
    ready.value = true;
  }
})
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-lg-4" v-if="ready && ConfigMapByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">ConfigMap per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="ConfigMapByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && SecretByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Secret per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="SecretByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <k8sConfigMapList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['k8sConfigMap']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.k8sConfigMap).flat()"
  />
  <k8sSecretList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['k8sSecret']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.k8sSecret).flat()"
  />
</template>