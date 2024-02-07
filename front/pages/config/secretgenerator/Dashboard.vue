<script setup lang="ts">
import configQuery from '@/queries/secretgenerator/config.read.graphql'
import pieChart from '@/components/charts/pieChart.vue';
import secretgeneratorBasicAuthList from '@/components/secretgenerator/BasicAuthList.vue';
import { BasicAuthListExcludes } from '../../../libs/secretgenerator/BasicAuth.js'
import secretgeneratorSSHKeyPairList from '@/components/secretgenerator/SSHKeyPairList.vue';
import { SSHKeyPairListExcludes } from '../../../libs/secretgenerator/SSHKeyPair.js'
import secretgeneratorStringSecretList from '@/components/secretgenerator/StringSecretList.vue';
import { StringSecretListExcludes } from '../../../libs/secretgenerator/StringSecret.js'
import { ref, useCore, useNavigationStoreRef, useQuery } from '../../../libs/core';
const { onErrorHandler, setNamespaceFromRoute, isNamespaced } = useCore();
const ready = ref(false);
const BasicAuthByTs = ref([]);
const SSHKeyPairByTs = ref([]);
const StringSecretByTs = ref([]);
if (isNamespaced()) setNamespaceFromRoute();
const navigation = useNavigationStoreRef();
const { result, refetch, onResult, onError } = useQuery(configQuery, {
  "BasicAuth": {
    "filters": [],
    "excludes": BasicAuthListExcludes
  },
  "SSHKeyPair": {
    "filters": [],
    "excludes": SSHKeyPairListExcludes
  },
  "StringSecret": {
    "filters": [],
    "excludes": StringSecretListExcludes
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
    BasicAuthByTs.value.length = 0;
    BasicAuthByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.secretgeneratorBasicAuth.length}}).filter(n => n.value>0))
    SSHKeyPairByTs.value.length = 0;
    SSHKeyPairByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.secretgeneratorSSHKeyPair.length}}).filter(n => n.value>0))
    StringSecretByTs.value.length = 0;
    StringSecretByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.secretgeneratorStringSecret.length}}).filter(n => n.value>0))
    ready.value = true;
  }
})
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-lg-4" v-if="ready && BasicAuthByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">BasicAuth per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="BasicAuthByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && SSHKeyPairByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">SSHKeyPair per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="SSHKeyPairByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && StringSecretByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">StringSecret per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="StringSecretByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <secretgeneratorBasicAuthList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['secretgeneratorBasicAuth']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.secretgeneratorBasicAuth).flat()"
  />
  <secretgeneratorSSHKeyPairList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['secretgeneratorSSHKeyPair']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.secretgeneratorSSHKeyPair).flat()"
  />
  <secretgeneratorStringSecretList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['secretgeneratorStringSecret']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.secretgeneratorStringSecret).flat()"
  />
</template>