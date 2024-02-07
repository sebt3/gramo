<script setup lang="ts">
import k8upSnapshotQuery from '@/queries/k8up/Snapshot.read.graphql'
import SnapshotDelete from '@/queries/k8up/Snapshot.delete.graphql'
import k8upSnapshotList from '@/components/k8up/SnapshotList.vue';
import { useQuery, useMutation, useSnapshot, SnapshotListExcludes } from '../../../libs/k8up/Snapshot.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useSnapshot();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(k8upSnapshotQuery, {
  "obj": {
    "filters": [],
    "excludes": SnapshotListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(SnapshotDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <k8upSnapshotList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.k8upSnapshot).flat()"
  />
</template>