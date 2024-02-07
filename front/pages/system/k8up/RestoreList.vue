<script setup lang="ts">
import k8upRestoreQuery from '@/queries/k8up/Restore.read.graphql'
import RestoreDelete from '@/queries/k8up/Restore.delete.graphql'
import k8upRestoreList from '@/components/k8up/RestoreList.vue';
import { useQuery, useMutation, useRestore, RestoreListExcludes } from '../../../libs/k8up/Restore.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useRestore();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(k8upRestoreQuery, {
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
  <k8upRestoreList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.k8upRestore).flat()"
  />
</template>