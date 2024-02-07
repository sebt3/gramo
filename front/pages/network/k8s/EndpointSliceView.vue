<script setup lang="ts">
import k8sEndpointSliceQuery from '@/queries/k8s/EndpointSlice.details.graphql'
import EndpointSliceDelete from '@/queries/k8s/EndpointSlice.delete.graphql'
import k8sEndpointSliceMeta from '@/components/k8s/EndpointSliceMeta.vue';
import k8sEndpointSliceView from '@/components/k8s/EndpointSliceView.vue';
import { ServiceListExcludes } from '../../../libs/k8s/custom.js'
import k8sServiceMeta from '@/components/k8s/ServiceMeta.vue';
import { useQuery, useMutation, useEndpointSlice, EndpointSliceReadExcludes } from '../../../libs/k8s/EndpointSlice.js'
const { onErrorHandler, notifySuccess, notifyError, onNotEndpointSliceFound, navigation, setNamespacedItemFromRoute } = useEndpointSlice();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sEndpointSliceQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": EndpointSliceReadExcludes
  },
  "parentService": {"filters": [], "excludes": ServiceListExcludes},
  "namespace": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentNamespace
      }
    ]
  }
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotEndpointSliceFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(EndpointSliceDelete);
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
      <k8sEndpointSliceMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sEndpointSlice[0]!=undefined && result.k8sNamespace[0].k8sEndpointSlice[0]!=null"
        :model="result.k8sNamespace[0].k8sEndpointSlice[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sEndpointSlice[0]!=undefined && result.k8sNamespace[0].k8sEndpointSlice[0]!=null && result.k8sNamespace[0].k8sEndpointSlice[0].parentService!=null && result.k8sNamespace[0].k8sEndpointSlice[0].parentService.length>0">
      <k8sServiceMeta
        :model="result.k8sNamespace[0].k8sEndpointSlice[0].parentService[0]"
       />
    </div>
    <div class="col-md-12">
      <k8sEndpointSliceView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sEndpointSlice[0]!=undefined && result.k8sNamespace[0].k8sEndpointSlice[0]!=null"
        :model="result.k8sNamespace[0].k8sEndpointSlice[0]"
        />
    </div>
  </div>
</template>
