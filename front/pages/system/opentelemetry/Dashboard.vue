<script setup lang="ts">
import systemQuery from '@/queries/opentelemetry/system.read.graphql'
import pieChart from '@/components/charts/pieChart.vue';
import opentelemetryInstrumentationList from '@/components/opentelemetry/InstrumentationList.vue';
import { InstrumentationListExcludes } from '../../../libs/opentelemetry/Instrumentation.js'
import opentelemetryOpAMPBridgeList from '@/components/opentelemetry/OpAMPBridgeList.vue';
import { OpAMPBridgeListExcludes } from '../../../libs/opentelemetry/OpAMPBridge.js'
import opentelemetryOpenTelemetryCollectorList from '@/components/opentelemetry/OpenTelemetryCollectorList.vue';
import { OpenTelemetryCollectorListExcludes } from '../../../libs/opentelemetry/OpenTelemetryCollector.js'
import { ref, useCore, useNavigationStoreRef, useQuery } from '../../../libs/core';
const { onErrorHandler, setNamespaceFromRoute, isNamespaced } = useCore();
const ready = ref(false);
const InstrumentationByTs = ref([]);
const OpAMPBridgeByTs = ref([]);
const OpenTelemetryCollectorByTs = ref([]);
if (isNamespaced()) setNamespaceFromRoute();
const navigation = useNavigationStoreRef();
const { result, refetch, onResult, onError } = useQuery(systemQuery, {
  "Instrumentation": {
    "filters": [],
    "excludes": InstrumentationListExcludes
  },
  "OpAMPBridge": {
    "filters": [],
    "excludes": OpAMPBridgeListExcludes
  },
  "OpenTelemetryCollector": {
    "filters": [],
    "excludes": OpenTelemetryCollectorListExcludes
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
    InstrumentationByTs.value.length = 0;
    InstrumentationByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.opentelemetryInstrumentation.length}}).filter(n => n.value>0))
    OpAMPBridgeByTs.value.length = 0;
    OpAMPBridgeByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.opentelemetryOpAMPBridge.length}}).filter(n => n.value>0))
    OpenTelemetryCollectorByTs.value.length = 0;
    OpenTelemetryCollectorByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.opentelemetryOpenTelemetryCollector.length}}).filter(n => n.value>0))
    ready.value = true;
  }
})
</script>
<template>
  <div class="row q-mb-sm q-ml-sm" v-if="isNamespaced()">
    <div class="col-lg-4" v-if="ready && InstrumentationByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Instrumentation per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="InstrumentationByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && OpAMPBridgeByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">OpAMPBridge per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="OpAMPBridgeByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && OpenTelemetryCollectorByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">OpenTelemetryCollector per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="OpenTelemetryCollectorByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <opentelemetryInstrumentationList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['opentelemetryInstrumentation']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.opentelemetryInstrumentation).flat()"
  />
  <opentelemetryOpAMPBridgeList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['opentelemetryOpAMPBridge']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.opentelemetryOpAMPBridge).flat()"
  />
  <opentelemetryOpenTelemetryCollectorList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['opentelemetryOpenTelemetryCollector']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.opentelemetryOpenTelemetryCollector).flat()"
  />
</template>