<script setup lang="ts">
import networkQuery from '@/queries/k8s/network.read.graphql'
import pieChart from '@/components/charts/pieChart.vue';
import k8sEndpointsList from '@/components/k8s/EndpointsList.vue';
import { EndpointsListExcludes } from '../../../libs/k8s/Endpoints.js'
import k8sServiceList from '@/components/k8s/ServiceList.vue';
import { ServiceListExcludes } from '../../../libs/k8s/Service.js'
import k8sIngressList from '@/components/k8s/IngressList.vue';
import { IngressListExcludes } from '../../../libs/k8s/Ingress.js'
import k8sEndpointSliceList from '@/components/k8s/EndpointSliceList.vue';
import { EndpointSliceListExcludes } from '../../../libs/k8s/EndpointSlice.js'
import { ref, useCore, useNavigationStoreRef, useQuery } from '../../../libs/core';
const { onErrorHandler, setNamespaceFromRoute, isNamespaced } = useCore();
const ready = ref(false);
const EndpointsByTs = ref([]);
const ServiceByTs = ref([]);
const IngressByTs = ref([]);
const EndpointSliceByTs = ref([]);
if (isNamespaced()) setNamespaceFromRoute();
const navigation = useNavigationStoreRef();
const { result, refetch, onResult, onError } = useQuery(networkQuery, {
  "Endpoints": {
    "filters": [],
    "excludes": EndpointsListExcludes
  },
  "Service": {
    "filters": [],
    "excludes": ServiceListExcludes
  },
  "Ingress": {
    "filters": [],
    "excludes": IngressListExcludes
  },
  "EndpointSlice": {
    "filters": [],
    "excludes": EndpointSliceListExcludes
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
    EndpointsByTs.value.length = 0;
    EndpointsByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.k8sEndpoints.length}}).filter(n => n.value>0))
    ServiceByTs.value.length = 0;
    ServiceByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.k8sService.length}}).filter(n => n.value>0))
    IngressByTs.value.length = 0;
    IngressByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.k8sIngress.length}}).filter(n => n.value>0))
    EndpointSliceByTs.value.length = 0;
    EndpointSliceByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.k8sEndpointSlice.length}}).filter(n => n.value>0))
    ready.value = true;
  }
})
</script>
<template>
  <div class="row q-mb-sm q-ml-sm" v-if="isNamespaced()">
    <div class="col-lg-4" v-if="ready && EndpointsByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Endpoints per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="EndpointsByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && ServiceByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Service per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="ServiceByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && IngressByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Ingress per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="IngressByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && EndpointSliceByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">EndpointSlice per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="EndpointSliceByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <k8sEndpointsList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['k8sEndpoints']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.k8sEndpoints).flat()"
  />
  <k8sServiceList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['k8sService']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.k8sService).flat()"
  />
  <k8sIngressList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['k8sIngress']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.k8sIngress).flat()"
  />
  <k8sEndpointSliceList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['k8sEndpointSlice']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.k8sEndpointSlice).flat()"
  />
</template>