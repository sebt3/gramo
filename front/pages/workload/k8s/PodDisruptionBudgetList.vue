<script setup lang="ts">
import k8sPodDisruptionBudgetQuery from '@/queries/k8s/PodDisruptionBudget.read.graphql'
import PodDisruptionBudgetDelete from '@/queries/k8s/PodDisruptionBudget.delete.graphql'
import k8sPodDisruptionBudgetList from '@/components/k8s/PodDisruptionBudgetList.vue';
import { useQuery, useMutation, usePodDisruptionBudget, PodDisruptionBudgetListExcludes } from '../../../libs/k8s/PodDisruptionBudget.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = usePodDisruptionBudget();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(k8sPodDisruptionBudgetQuery, {
  "obj": {
    "filters": [],
    "excludes": PodDisruptionBudgetListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(PodDisruptionBudgetDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <k8sPodDisruptionBudgetList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.k8sPodDisruptionBudget).flat()"
  />
</template>