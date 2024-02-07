<script setup lang="ts">
import k8sPersistentVolumeQuery from '@/queries/k8s/PersistentVolume.read.graphql'
import PersistentVolumeDelete from '@/queries/k8s/PersistentVolume.delete.graphql'
import k8sPersistentVolumeList from '@/components/k8s/PersistentVolumeList.vue';
import { useQuery, useMutation, usePersistentVolume, PersistentVolumeListExcludes } from '../../../libs/k8s/PersistentVolume.js'
const { actionNew, toEdit, actionDelete, pagination, deleteDone, deleteError, onErrorHandler } = usePersistentVolume();
const { result, refetch, onError } = useQuery(k8sPersistentVolumeQuery, {
  "obj": {}
}, { pollInterval: 2000 });
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(PersistentVolumeDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <k8sPersistentVolumeList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sPersistentVolume'] !== undefined"
    :model="result.k8sPersistentVolume"
  />
</template>