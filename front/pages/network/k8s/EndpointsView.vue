<script setup lang="ts">
import k8sEndpointsQuery from '@/queries/k8s/Endpoints.details.graphql'
import EndpointsDelete from '@/queries/k8s/Endpoints.delete.graphql'
import k8sEndpointsMeta from '@/components/k8s/EndpointsMeta.vue';
import k8sEndpointsView from '@/components/k8s/EndpointsView.vue';
import { useQuery, useMutation, useEndpoints, EndpointsReadExcludes } from '../../../libs/k8s/Endpoints.js'
const { onErrorHandler, notifySuccess, notifyError, onNotEndpointsFound, navigation, setNamespacedItemFromRoute } = useEndpoints();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sEndpointsQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": EndpointsReadExcludes
  },
  "namespace": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentNamespace
      }
    ]
  }
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotEndpointsFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(EndpointsDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-3">
      <k8sEndpointsMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sEndpoints[0]!=undefined && result.k8sNamespace[0].k8sEndpoints[0]!=null"
        :model="result.k8sNamespace[0].k8sEndpoints[0]"
       />
    </div>
    <div class="col-md-12">
      <k8sEndpointsView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sEndpoints[0]!=undefined && result.k8sNamespace[0].k8sEndpoints[0]!=null"
        :model="result.k8sNamespace[0].k8sEndpoints[0]"
        />
    </div>
  </div>
</template>
