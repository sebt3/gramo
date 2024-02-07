<script setup lang="ts">
import k8sStorageClassQuery from '@/queries/k8s/StorageClass.read.graphql'
import StorageClassDelete from '@/queries/k8s/StorageClass.delete.graphql'
import k8sStorageClassList from '@/components/k8s/StorageClassList.vue';
import { useQuery, useMutation, useStorageClass, StorageClassListExcludes } from '../../../libs/k8s/StorageClass.js'
const { actionNew, toEdit, actionDelete, pagination, deleteDone, deleteError, onErrorHandler } = useStorageClass();
const { result, refetch, onError } = useQuery(k8sStorageClassQuery, {
  "obj": {}
}, { pollInterval: 2000 });
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(StorageClassDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <k8sStorageClassList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sStorageClass'] !== undefined"
    :model="result.k8sStorageClass"
  />
</template>