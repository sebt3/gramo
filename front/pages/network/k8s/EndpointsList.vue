<script setup lang="ts">
import k8sEndpointsQuery from '@/queries/k8s/Endpoints.read.graphql'
import EndpointsDelete from '@/queries/k8s/Endpoints.delete.graphql'
import k8sEndpointsList from '@/components/k8s/EndpointsList.vue';
import { useQuery, useMutation, useEndpoints, EndpointsListExcludes } from '../../../libs/k8s/Endpoints.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useEndpoints();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(k8sEndpointsQuery, {
  "obj": {
    "filters": [],
    "excludes": EndpointsListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(EndpointsDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <k8sEndpointsList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.k8sEndpoints).flat()"
  />
</template>