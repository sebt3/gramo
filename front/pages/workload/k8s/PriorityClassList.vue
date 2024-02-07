<script setup lang="ts">
import k8sPriorityClassQuery from '@/queries/k8s/PriorityClass.read.graphql'
import PriorityClassDelete from '@/queries/k8s/PriorityClass.delete.graphql'
import k8sPriorityClassList from '@/components/k8s/PriorityClassList.vue';
import { useQuery, useMutation, usePriorityClass, PriorityClassListExcludes } from '../../../libs/k8s/PriorityClass.js'
const { actionNew, toEdit, actionDelete, pagination, deleteDone, deleteError, onErrorHandler } = usePriorityClass();
const { result, refetch, onError } = useQuery(k8sPriorityClassQuery, {
  "obj": {}
}, { pollInterval: 2000 });
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(PriorityClassDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <k8sPriorityClassList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sPriorityClass'] !== undefined"
    :model="result.k8sPriorityClass"
  />
</template>