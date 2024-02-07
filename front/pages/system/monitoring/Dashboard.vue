<script setup lang="ts">
import systemQuery from '@/queries/monitoring/system.read.graphql'
import pieChart from '@/components/charts/pieChart.vue';
import monitoringAlertmanagerList from '@/components/monitoring/AlertmanagerList.vue';
import { AlertmanagerListExcludes } from '../../../libs/monitoring/Alertmanager.js'
import monitoringPodMonitorList from '@/components/monitoring/PodMonitorList.vue';
import { PodMonitorListExcludes } from '../../../libs/monitoring/PodMonitor.js'
import monitoringProbeList from '@/components/monitoring/ProbeList.vue';
import { ProbeListExcludes } from '../../../libs/monitoring/Probe.js'
import monitoringPrometheusList from '@/components/monitoring/PrometheusList.vue';
import { PrometheusListExcludes } from '../../../libs/monitoring/Prometheus.js'
import monitoringPrometheusRuleList from '@/components/monitoring/PrometheusRuleList.vue';
import { PrometheusRuleListExcludes } from '../../../libs/monitoring/PrometheusRule.js'
import monitoringServiceMonitorList from '@/components/monitoring/ServiceMonitorList.vue';
import { ServiceMonitorListExcludes } from '../../../libs/monitoring/ServiceMonitor.js'
import monitoringThanosRulerList from '@/components/monitoring/ThanosRulerList.vue';
import { ThanosRulerListExcludes } from '../../../libs/monitoring/ThanosRuler.js'
import monitoringAlertmanagerConfigList from '@/components/monitoring/AlertmanagerConfigList.vue';
import { AlertmanagerConfigListExcludes } from '../../../libs/monitoring/AlertmanagerConfig.js'
import monitoringPrometheusAgentList from '@/components/monitoring/PrometheusAgentList.vue';
import { PrometheusAgentListExcludes } from '../../../libs/monitoring/PrometheusAgent.js'
import { ref, useCore, useNavigationStoreRef, useQuery } from '../../../libs/core';
const { onErrorHandler, setNamespaceFromRoute, isNamespaced } = useCore();
const ready = ref(false);
const AlertmanagerByTs = ref([]);
const PodMonitorByTs = ref([]);
const ProbeByTs = ref([]);
const PrometheusByTs = ref([]);
const PrometheusRuleByTs = ref([]);
const ServiceMonitorByTs = ref([]);
const ThanosRulerByTs = ref([]);
const AlertmanagerConfigByTs = ref([]);
const PrometheusAgentByTs = ref([]);
if (isNamespaced()) setNamespaceFromRoute();
const navigation = useNavigationStoreRef();
const { result, refetch, onResult, onError } = useQuery(systemQuery, {
  "Alertmanager": {
    "filters": [],
    "excludes": AlertmanagerListExcludes
  },
  "PodMonitor": {
    "filters": [],
    "excludes": PodMonitorListExcludes
  },
  "Probe": {
    "filters": [],
    "excludes": ProbeListExcludes
  },
  "Prometheus": {
    "filters": [],
    "excludes": PrometheusListExcludes
  },
  "PrometheusRule": {
    "filters": [],
    "excludes": PrometheusRuleListExcludes
  },
  "ServiceMonitor": {
    "filters": [],
    "excludes": ServiceMonitorListExcludes
  },
  "ThanosRuler": {
    "filters": [],
    "excludes": ThanosRulerListExcludes
  },
  "AlertmanagerConfig": {
    "filters": [],
    "excludes": AlertmanagerConfigListExcludes
  },
  "PrometheusAgent": {
    "filters": [],
    "excludes": PrometheusAgentListExcludes
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
    AlertmanagerByTs.value.length = 0;
    AlertmanagerByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.monitoringAlertmanager.length}}).filter(n => n.value>0))
    PodMonitorByTs.value.length = 0;
    PodMonitorByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.monitoringPodMonitor.length}}).filter(n => n.value>0))
    ProbeByTs.value.length = 0;
    ProbeByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.monitoringProbe.length}}).filter(n => n.value>0))
    PrometheusByTs.value.length = 0;
    PrometheusByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.monitoringPrometheus.length}}).filter(n => n.value>0))
    PrometheusRuleByTs.value.length = 0;
    PrometheusRuleByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.monitoringPrometheusRule.length}}).filter(n => n.value>0))
    ServiceMonitorByTs.value.length = 0;
    ServiceMonitorByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.monitoringServiceMonitor.length}}).filter(n => n.value>0))
    ThanosRulerByTs.value.length = 0;
    ThanosRulerByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.monitoringThanosRuler.length}}).filter(n => n.value>0))
    AlertmanagerConfigByTs.value.length = 0;
    AlertmanagerConfigByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.monitoringAlertmanagerConfig.length}}).filter(n => n.value>0))
    PrometheusAgentByTs.value.length = 0;
    PrometheusAgentByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.monitoringPrometheusAgent.length}}).filter(n => n.value>0))
    ready.value = true;
  }
})
</script>
<template>
  <div class="row q-mb-sm q-ml-sm" v-if="isNamespaced()">
    <div class="col-lg-4" v-if="ready && AlertmanagerByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Alertmanager per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="AlertmanagerByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && PodMonitorByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">PodMonitor per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="PodMonitorByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && ProbeByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Probe per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="ProbeByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && PrometheusByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Prometheus per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="PrometheusByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && PrometheusRuleByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">PrometheusRule per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="PrometheusRuleByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && ServiceMonitorByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">ServiceMonitor per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="ServiceMonitorByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && ThanosRulerByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">ThanosRuler per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="ThanosRulerByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && AlertmanagerConfigByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">AlertmanagerConfig per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="AlertmanagerConfigByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && PrometheusAgentByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">PrometheusAgent per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="PrometheusAgentByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <monitoringAlertmanagerList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['monitoringAlertmanager']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.monitoringAlertmanager).flat()"
  />
  <monitoringPodMonitorList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['monitoringPodMonitor']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.monitoringPodMonitor).flat()"
  />
  <monitoringProbeList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['monitoringProbe']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.monitoringProbe).flat()"
  />
  <monitoringPrometheusList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['monitoringPrometheus']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.monitoringPrometheus).flat()"
  />
  <monitoringPrometheusRuleList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['monitoringPrometheusRule']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.monitoringPrometheusRule).flat()"
  />
  <monitoringServiceMonitorList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['monitoringServiceMonitor']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.monitoringServiceMonitor).flat()"
  />
  <monitoringThanosRulerList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['monitoringThanosRuler']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.monitoringThanosRuler).flat()"
  />
  <monitoringAlertmanagerConfigList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['monitoringAlertmanagerConfig']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.monitoringAlertmanagerConfig).flat()"
  />
  <monitoringPrometheusAgentList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['monitoringPrometheusAgent']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.monitoringPrometheusAgent).flat()"
  />
</template>