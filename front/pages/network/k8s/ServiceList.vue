<script setup lang="ts">
import k8sServiceQuery from '@/queries/k8s/Service.read.graphql'
import ServiceDelete from '@/queries/k8s/Service.delete.graphql'
import k8sServiceList from '@/components/k8s/ServiceList.vue';
import { useQuery, useMutation, useService, ServiceListExcludes } from '../../../libs/k8s/Service.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useService();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(k8sServiceQuery, {
  "obj": {
    "filters": [],
    "excludes": ServiceListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ServiceDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <k8sServiceList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.k8sService).flat()"
  />
</template>