<script setup lang="ts">
import k8sRuntimeClassQuery from '@/queries/k8s/RuntimeClass.read.graphql'
import RuntimeClassDelete from '@/queries/k8s/RuntimeClass.delete.graphql'
import k8sRuntimeClassList from '@/components/k8s/RuntimeClassList.vue';
import { useQuery, useMutation, useRuntimeClass, RuntimeClassListExcludes } from '../../../libs/k8s/RuntimeClass.js'
const { actionNew, toEdit, actionDelete, pagination, deleteDone, deleteError, onErrorHandler } = useRuntimeClass();
const { result, refetch, onError } = useQuery(k8sRuntimeClassQuery, {
  "obj": {}
}, { pollInterval: 2000 });
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(RuntimeClassDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <k8sRuntimeClassList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sRuntimeClass'] !== undefined"
    :model="result.k8sRuntimeClass"
  />
</template>