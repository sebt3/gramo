<script setup lang="ts">
import networkQuery from '@/queries/traefik/network.read.graphql'
import pieChart from '@/components/charts/pieChart.vue';
import traefikIngressRouteList from '@/components/traefik/IngressRouteList.vue';
import { IngressRouteListExcludes } from '../../../libs/traefik/IngressRoute.js'
import traefikIngressRouteTCPList from '@/components/traefik/IngressRouteTCPList.vue';
import { IngressRouteTCPListExcludes } from '../../../libs/traefik/IngressRouteTCP.js'
import traefikIngressRouteUDPList from '@/components/traefik/IngressRouteUDPList.vue';
import { IngressRouteUDPListExcludes } from '../../../libs/traefik/IngressRouteUDP.js'
import traefikMiddlewareList from '@/components/traefik/MiddlewareList.vue';
import { MiddlewareListExcludes } from '../../../libs/traefik/Middleware.js'
import traefikMiddlewareTCPList from '@/components/traefik/MiddlewareTCPList.vue';
import { MiddlewareTCPListExcludes } from '../../../libs/traefik/MiddlewareTCP.js'
import traefikServersTransportList from '@/components/traefik/ServersTransportList.vue';
import { ServersTransportListExcludes } from '../../../libs/traefik/ServersTransport.js'
import traefikTLSOptionList from '@/components/traefik/TLSOptionList.vue';
import { TLSOptionListExcludes } from '../../../libs/traefik/TLSOption.js'
import traefikTLSStoreList from '@/components/traefik/TLSStoreList.vue';
import { TLSStoreListExcludes } from '../../../libs/traefik/TLSStore.js'
import traefikTraefikServiceList from '@/components/traefik/TraefikServiceList.vue';
import { TraefikServiceListExcludes } from '../../../libs/traefik/TraefikService.js'
import { ref, useCore, useNavigationStoreRef, useQuery } from '../../../libs/core';
const { onErrorHandler, setNamespaceFromRoute, isNamespaced } = useCore();
const ready = ref(false);
const IngressRouteByTs = ref([]);
const IngressRouteTCPByTs = ref([]);
const IngressRouteUDPByTs = ref([]);
const MiddlewareByTs = ref([]);
const MiddlewareTCPByTs = ref([]);
const ServersTransportByTs = ref([]);
const TLSOptionByTs = ref([]);
const TLSStoreByTs = ref([]);
const TraefikServiceByTs = ref([]);
if (isNamespaced()) setNamespaceFromRoute();
const navigation = useNavigationStoreRef();
const { result, refetch, onResult, onError } = useQuery(networkQuery, {
  "IngressRoute": {
    "filters": [],
    "excludes": IngressRouteListExcludes
  },
  "IngressRouteTCP": {
    "filters": [],
    "excludes": IngressRouteTCPListExcludes
  },
  "IngressRouteUDP": {
    "filters": [],
    "excludes": IngressRouteUDPListExcludes
  },
  "Middleware": {
    "filters": [],
    "excludes": MiddlewareListExcludes
  },
  "MiddlewareTCP": {
    "filters": [],
    "excludes": MiddlewareTCPListExcludes
  },
  "ServersTransport": {
    "filters": [],
    "excludes": ServersTransportListExcludes
  },
  "TLSOption": {
    "filters": [],
    "excludes": TLSOptionListExcludes
  },
  "TLSStore": {
    "filters": [],
    "excludes": TLSStoreListExcludes
  },
  "TraefikService": {
    "filters": [],
    "excludes": TraefikServiceListExcludes
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
    IngressRouteByTs.value.length = 0;
    IngressRouteByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.traefikIngressRoute.length}}).filter(n => n.value>0))
    IngressRouteTCPByTs.value.length = 0;
    IngressRouteTCPByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.traefikIngressRouteTCP.length}}).filter(n => n.value>0))
    IngressRouteUDPByTs.value.length = 0;
    IngressRouteUDPByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.traefikIngressRouteUDP.length}}).filter(n => n.value>0))
    MiddlewareByTs.value.length = 0;
    MiddlewareByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.traefikMiddleware.length}}).filter(n => n.value>0))
    MiddlewareTCPByTs.value.length = 0;
    MiddlewareTCPByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.traefikMiddlewareTCP.length}}).filter(n => n.value>0))
    ServersTransportByTs.value.length = 0;
    ServersTransportByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.traefikServersTransport.length}}).filter(n => n.value>0))
    TLSOptionByTs.value.length = 0;
    TLSOptionByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.traefikTLSOption.length}}).filter(n => n.value>0))
    TLSStoreByTs.value.length = 0;
    TLSStoreByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.traefikTLSStore.length}}).filter(n => n.value>0))
    TraefikServiceByTs.value.length = 0;
    TraefikServiceByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.traefikTraefikService.length}}).filter(n => n.value>0))
    ready.value = true;
  }
})
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-lg-4" v-if="ready && IngressRouteByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">IngressRoute per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="IngressRouteByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && IngressRouteTCPByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">IngressRouteTCP per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="IngressRouteTCPByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && IngressRouteUDPByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">IngressRouteUDP per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="IngressRouteUDPByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && MiddlewareByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Middleware per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="MiddlewareByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && MiddlewareTCPByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">MiddlewareTCP per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="MiddlewareTCPByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && ServersTransportByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">ServersTransport per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="ServersTransportByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && TLSOptionByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">TLSOption per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="TLSOptionByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && TLSStoreByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">TLSStore per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="TLSStoreByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && TraefikServiceByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">TraefikService per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="TraefikServiceByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <traefikIngressRouteList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['traefikIngressRoute']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.traefikIngressRoute).flat()"
  />
  <traefikIngressRouteTCPList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['traefikIngressRouteTCP']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.traefikIngressRouteTCP).flat()"
  />
  <traefikIngressRouteUDPList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['traefikIngressRouteUDP']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.traefikIngressRouteUDP).flat()"
  />
  <traefikMiddlewareList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['traefikMiddleware']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.traefikMiddleware).flat()"
  />
  <traefikMiddlewareTCPList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['traefikMiddlewareTCP']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.traefikMiddlewareTCP).flat()"
  />
  <traefikServersTransportList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['traefikServersTransport']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.traefikServersTransport).flat()"
  />
  <traefikTLSOptionList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['traefikTLSOption']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.traefikTLSOption).flat()"
  />
  <traefikTLSStoreList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['traefikTLSStore']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.traefikTLSStore).flat()"
  />
  <traefikTraefikServiceList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['traefikTraefikService']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.traefikTraefikService).flat()"
  />
</template>