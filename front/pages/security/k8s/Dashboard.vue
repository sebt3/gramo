<script setup lang="ts">
import securityQuery from '@/queries/k8s/security.read.graphql'
import pieChart from '@/components/charts/pieChart.vue';
import k8sServiceAccountList from '@/components/k8s/ServiceAccountList.vue';
import { ServiceAccountListExcludes } from '../../../libs/k8s/ServiceAccount.js'
import k8sCertificateSigningRequestList from '@/components/k8s/CertificateSigningRequestList.vue';
import { CertificateSigningRequestListExcludes } from '../../../libs/k8s/CertificateSigningRequest.js'
import k8sNetworkPolicyList from '@/components/k8s/NetworkPolicyList.vue';
import { NetworkPolicyListExcludes } from '../../../libs/k8s/NetworkPolicy.js'
import k8sRoleList from '@/components/k8s/RoleList.vue';
import { RoleListExcludes } from '../../../libs/k8s/Role.js'
import k8sClusterRoleBindingList from '@/components/k8s/ClusterRoleBindingList.vue';
import { ClusterRoleBindingListExcludes } from '../../../libs/k8s/ClusterRoleBinding.js'
import k8sRoleBindingList from '@/components/k8s/RoleBindingList.vue';
import { RoleBindingListExcludes } from '../../../libs/k8s/RoleBinding.js'
import k8sClusterRoleList from '@/components/k8s/ClusterRoleList.vue';
import { ClusterRoleListExcludes } from '../../../libs/k8s/ClusterRole.js'
import { ref, useCore, useNavigationStoreRef, useQuery } from '../../../libs/core';
const { onErrorHandler, setNamespaceFromRoute, isNamespaced } = useCore();
const ready = ref(false);
const ServiceAccountByTs = ref([]);
const NetworkPolicyByTs = ref([]);
const RoleByTs = ref([]);
const RoleBindingByTs = ref([]);
if (isNamespaced()) setNamespaceFromRoute();
const navigation = useNavigationStoreRef();
const { result, refetch, onResult, onError } = useQuery(securityQuery, {
  "ServiceAccount": {
    "filters": [],
    "excludes": ServiceAccountListExcludes
  },
  "CertificateSigningRequest": {
    "filters": [],
    "excludes": CertificateSigningRequestListExcludes
  },
  "NetworkPolicy": {
    "filters": [],
    "excludes": NetworkPolicyListExcludes
  },
  "Role": {
    "filters": [],
    "excludes": RoleListExcludes
  },
  "ClusterRoleBinding": {
    "filters": [],
    "excludes": ClusterRoleBindingListExcludes
  },
  "RoleBinding": {
    "filters": [],
    "excludes": RoleBindingListExcludes
  },
  "ClusterRole": {
    "filters": [],
    "excludes": ClusterRoleListExcludes
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
    ServiceAccountByTs.value.length = 0;
    ServiceAccountByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.k8sServiceAccount.length}}).filter(n => n.value>0))
    NetworkPolicyByTs.value.length = 0;
    NetworkPolicyByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.k8sNetworkPolicy.length}}).filter(n => n.value>0))
    RoleByTs.value.length = 0;
    RoleByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.k8sRole.length}}).filter(n => n.value>0))
    RoleBindingByTs.value.length = 0;
    RoleBindingByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.k8sRoleBinding.length}}).filter(n => n.value>0))
    ready.value = true;
  }
})
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-lg-4" v-if="ready && ServiceAccountByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">ServiceAccount per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="ServiceAccountByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
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
    <div class="col-lg-4" v-if="ready && RoleByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Role per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="RoleByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && RoleBindingByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">RoleBinding per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="RoleBindingByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <k8sServiceAccountList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['k8sServiceAccount']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.k8sServiceAccount).flat()"
  />
  <k8sCertificateSigningRequestList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && Array.isArray(result['k8sCertificateSigningRequest']) && result['k8sCertificateSigningRequest'].length>0"
    :model="result.k8sCertificateSigningRequest"
  />
  <k8sNetworkPolicyList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['k8sNetworkPolicy']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.k8sNetworkPolicy).flat()"
  />
  <k8sRoleList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['k8sRole']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.k8sRole).flat()"
  />
  <k8sClusterRoleBindingList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && Array.isArray(result['k8sClusterRoleBinding']) && result['k8sClusterRoleBinding'].length>0"
    :model="result.k8sClusterRoleBinding"
  />
  <k8sRoleBindingList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['k8sRoleBinding']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.k8sRoleBinding).flat()"
  />
  <k8sClusterRoleList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && Array.isArray(result['k8sClusterRole']) && result['k8sClusterRole'].length>0"
    :model="result.k8sClusterRole"
  />
</template>