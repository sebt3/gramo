<script setup lang="ts">
import mariadbRestoreQuery from '@/queries/mariadb/Restore.read.graphql'
import RestoreDelete from '@/queries/mariadb/Restore.delete.graphql'
import mariadbRestoreList from '@/components/mariadb/RestoreList.vue';
import { useQuery, useMutation, useRestore, RestoreListExcludes } from '../../../libs/mariadb/Restore.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useRestore();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(mariadbRestoreQuery, {
  "obj": {
    "filters": [],
    "excludes": RestoreListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(RestoreDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <mariadbRestoreList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.mariadbRestore).flat()"
  />
</template>