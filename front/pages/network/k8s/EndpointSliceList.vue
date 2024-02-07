<script setup lang="ts">
import k8sEndpointSliceQuery from '@/queries/k8s/EndpointSlice.read.graphql'
import EndpointSliceDelete from '@/queries/k8s/EndpointSlice.delete.graphql'
import k8sEndpointSliceList from '@/components/k8s/EndpointSliceList.vue';
import { useQuery, useMutation, useEndpointSlice, EndpointSliceListExcludes } from '../../../libs/k8s/EndpointSlice.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useEndpointSlice();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(k8sEndpointSliceQuery, {
  "obj": {
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(EndpointSliceDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <k8sEndpointSliceList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.k8sEndpointSlice).flat()"
  />
</template>