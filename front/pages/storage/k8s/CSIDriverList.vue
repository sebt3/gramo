<script setup lang="ts">
import k8sCSIDriverQuery from '@/queries/k8s/CSIDriver.read.graphql'
import CSIDriverDelete from '@/queries/k8s/CSIDriver.delete.graphql'
import k8sCSIDriverList from '@/components/k8s/CSIDriverList.vue';
import { useQuery, useMutation, useCSIDriver, CSIDriverListExcludes } from '../../../libs/k8s/CSIDriver.js'
const { actionNew, toEdit, actionDelete, pagination, deleteDone, deleteError, onErrorHandler } = useCSIDriver();
const { result, refetch, onError } = useQuery(k8sCSIDriverQuery, {
  "obj": {}
}, { pollInterval: 2000 });
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(CSIDriverDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <k8sCSIDriverList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sCSIDriver'] !== undefined"
    :model="result.k8sCSIDriver"
  />
</template>