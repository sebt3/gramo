<script setup lang="ts">
import k8sHorizontalPodAutoscalerQuery from '@/queries/k8s/HorizontalPodAutoscaler.read.graphql'
import HorizontalPodAutoscalerDelete from '@/queries/k8s/HorizontalPodAutoscaler.delete.graphql'
import k8sHorizontalPodAutoscalerList from '@/components/k8s/HorizontalPodAutoscalerList.vue';
import { useQuery, useMutation, useHorizontalPodAutoscaler, HorizontalPodAutoscalerListExcludes } from '../../../libs/k8s/HorizontalPodAutoscaler.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useHorizontalPodAutoscaler();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(k8sHorizontalPodAutoscalerQuery, {
  "obj": {
    "filters": [],
    "excludes": HorizontalPodAutoscalerListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(HorizontalPodAutoscalerDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <k8sHorizontalPodAutoscalerList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.k8sHorizontalPodAutoscaler).flat()"
  />
</template>