<script setup lang="ts">
import systemQuery from '@/queries/k8s/system.read.graphql'
import pieChart from '@/components/charts/pieChart.vue';
import k8sNamespaceList from '@/components/k8s/NamespaceList.vue';
import { NamespaceListExcludes } from '../../../libs/k8s/Namespace.js'
import k8sNodeList from '@/components/k8s/NodeList.vue';
import { NodeListExcludes } from '../../../libs/k8s/Node.js'
import k8sAPIServiceList from '@/components/k8s/APIServiceList.vue';
import { APIServiceListExcludes } from '../../../libs/k8s/APIService.js'
import k8sMutatingWebhookConfigurationList from '@/components/k8s/MutatingWebhookConfigurationList.vue';
import { MutatingWebhookConfigurationListExcludes } from '../../../libs/k8s/MutatingWebhookConfiguration.js'
import k8sValidatingWebhookConfigurationList from '@/components/k8s/ValidatingWebhookConfigurationList.vue';
import { ValidatingWebhookConfigurationListExcludes } from '../../../libs/k8s/ValidatingWebhookConfiguration.js'
import k8sCustomResourceDefinitionList from '@/components/k8s/CustomResourceDefinitionList.vue';
import { CustomResourceDefinitionListExcludes } from '../../../libs/k8s/CustomResourceDefinition.js'
import k8sLeaseList from '@/components/k8s/LeaseList.vue';
import { LeaseListExcludes } from '../../../libs/k8s/Lease.js'
import { ref, useCore, useNavigationStoreRef, useQuery } from '../../../libs/core';
const { onErrorHandler, setNamespaceFromRoute, isNamespaced } = useCore();
const ready = ref(false);
const LeaseByTs = ref([]);
if (isNamespaced()) setNamespaceFromRoute();
const navigation = useNavigationStoreRef();
const { result, refetch, onResult, onError } = useQuery(systemQuery, {
  "Namespace": {
    "filters": [],
    "excludes": NamespaceListExcludes
  },
  "Node": {
    "filters": [],
    "excludes": NodeListExcludes
  },
  "APIService": {
    "filters": [],
    "excludes": APIServiceListExcludes
  },
  "MutatingWebhookConfiguration": {
    "filters": [],
    "excludes": MutatingWebhookConfigurationListExcludes
  },
  "ValidatingWebhookConfiguration": {
    "filters": [],
    "excludes": ValidatingWebhookConfigurationListExcludes
  },
  "CustomResourceDefinition": {
    "filters": [],
    "excludes": CustomResourceDefinitionListExcludes
  },
  "Lease": {
    "filters": [],
    "excludes": LeaseListExcludes
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
    LeaseByTs.value.length = 0;
    LeaseByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.k8sLease.length}}).filter(n => n.value>0))
    ready.value = true;
  }
})
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-lg-4" v-if="ready && LeaseByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Lease per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="LeaseByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <k8sNamespaceList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].length>0"
    :model="result.k8sNamespace"
  />
  <k8sNodeList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && Array.isArray(result['k8sNode']) && result['k8sNode'].length>0"
    :model="result.k8sNode"
  />
  <k8sAPIServiceList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && Array.isArray(result['k8sAPIService']) && result['k8sAPIService'].length>0"
    :model="result.k8sAPIService"
  />
  <k8sMutatingWebhookConfigurationList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && Array.isArray(result['k8sMutatingWebhookConfiguration']) && result['k8sMutatingWebhookConfiguration'].length>0"
    :model="result.k8sMutatingWebhookConfiguration"
  />
  <k8sValidatingWebhookConfigurationList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && Array.isArray(result['k8sValidatingWebhookConfiguration']) && result['k8sValidatingWebhookConfiguration'].length>0"
    :model="result.k8sValidatingWebhookConfiguration"
  />
  <k8sCustomResourceDefinitionList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && Array.isArray(result['k8sCustomResourceDefinition']) && result['k8sCustomResourceDefinition'].length>0"
    :model="result.k8sCustomResourceDefinition"
  />
  <k8sLeaseList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['k8sLease']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.k8sLease).flat()"
  />
</template>