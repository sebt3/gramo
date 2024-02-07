<script setup lang="ts">
import networkQuery from '@/queries/certmanager/network.read.graphql'
import pieChart from '@/components/charts/pieChart.vue';
import certmanagerChallengeList from '@/components/certmanager/ChallengeList.vue';
import { ChallengeListExcludes } from '../../../libs/certmanager/Challenge.js'
import certmanagerOrderList from '@/components/certmanager/OrderList.vue';
import { OrderListExcludes } from '../../../libs/certmanager/Order.js'
import certmanagerCertificateList from '@/components/certmanager/CertificateList.vue';
import { CertificateListExcludes } from '../../../libs/certmanager/Certificate.js'
import certmanagerCertificateRequestList from '@/components/certmanager/CertificateRequestList.vue';
import { CertificateRequestListExcludes } from '../../../libs/certmanager/CertificateRequest.js'
import certmanagerClusterIssuerList from '@/components/certmanager/ClusterIssuerList.vue';
import { ClusterIssuerListExcludes } from '../../../libs/certmanager/ClusterIssuer.js'
import certmanagerIssuerList from '@/components/certmanager/IssuerList.vue';
import { IssuerListExcludes } from '../../../libs/certmanager/Issuer.js'
import { ref, useCore, useNavigationStoreRef, useQuery } from '../../../libs/core';
const { onErrorHandler, setNamespaceFromRoute, isNamespaced } = useCore();
const ready = ref(false);
const ChallengeByTs = ref([]);
const OrderByTs = ref([]);
const CertificateByTs = ref([]);
const CertificateRequestByTs = ref([]);
const IssuerByTs = ref([]);
if (isNamespaced()) setNamespaceFromRoute();
const navigation = useNavigationStoreRef();
const { result, refetch, onResult, onError } = useQuery(networkQuery, {
  "Challenge": {
    "filters": [],
    "excludes": ChallengeListExcludes
  },
  "Order": {
    "filters": [],
    "excludes": OrderListExcludes
  },
  "Certificate": {
    "filters": [],
    "excludes": CertificateListExcludes
  },
  "CertificateRequest": {
    "filters": [],
    "excludes": CertificateRequestListExcludes
  },
  "ClusterIssuer": {
    "filters": [],
    "excludes": ClusterIssuerListExcludes
  },
  "Issuer": {
    "filters": [],
    "excludes": IssuerListExcludes
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
    ChallengeByTs.value.length = 0;
    ChallengeByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.certmanagerChallenge.length}}).filter(n => n.value>0))
    OrderByTs.value.length = 0;
    OrderByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.certmanagerOrder.length}}).filter(n => n.value>0))
    CertificateByTs.value.length = 0;
    CertificateByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.certmanagerCertificate.length}}).filter(n => n.value>0))
    CertificateRequestByTs.value.length = 0;
    CertificateRequestByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.certmanagerCertificateRequest.length}}).filter(n => n.value>0))
    IssuerByTs.value.length = 0;
    IssuerByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.certmanagerIssuer.length}}).filter(n => n.value>0))
    ready.value = true;
  }
})
</script>
<template>
  <div class="row q-mb-sm q-ml-sm" v-if="isNamespaced()">
    <div class="col-lg-4" v-if="ready && ChallengeByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Challenge per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="ChallengeByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && OrderByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Order per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="OrderByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && CertificateByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Certificate per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="CertificateByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && CertificateRequestByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">CertificateRequest per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="CertificateRequestByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && IssuerByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Issuer per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="IssuerByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <certmanagerChallengeList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['certmanagerChallenge']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.certmanagerChallenge).flat()"
  />
  <certmanagerOrderList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['certmanagerOrder']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.certmanagerOrder).flat()"
  />
  <certmanagerCertificateList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['certmanagerCertificate']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.certmanagerCertificate).flat()"
  />
  <certmanagerCertificateRequestList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['certmanagerCertificateRequest']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.certmanagerCertificateRequest).flat()"
  />
  <certmanagerClusterIssuerList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && Array.isArray(result['certmanagerClusterIssuer']) && result['certmanagerClusterIssuer'].length>0"
    :model="result.certmanagerClusterIssuer"
  />
  <certmanagerIssuerList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['certmanagerIssuer']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.certmanagerIssuer).flat()"
  />
</template>