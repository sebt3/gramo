<script setup lang="ts">
import k8upArchiveQuery from '@/queries/k8up/Archive.read.graphql'
import ArchiveDelete from '@/queries/k8up/Archive.delete.graphql'
import k8upArchiveList from '@/components/k8up/ArchiveList.vue';
import { useQuery, useMutation, useArchive, ArchiveListExcludes } from '../../../libs/k8up/Archive.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useArchive();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(k8upArchiveQuery, {
  "obj": {
    "filters": [],
    "excludes": ArchiveListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ArchiveDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <k8upArchiveList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.k8upArchive).flat()"
  />
</template>