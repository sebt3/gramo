<script setup lang="ts">
import k8sDaemonSetQuery from '@/queries/k8s/DaemonSet.read.graphql'
import DaemonSetDelete from '@/queries/k8s/DaemonSet.delete.graphql'
import k8sDaemonSetList from '@/components/k8s/DaemonSetList.vue';
import { useQuery, useMutation, useDaemonSet, DaemonSetListExcludes } from '../../../libs/k8s/DaemonSet.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useDaemonSet();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(k8sDaemonSetQuery, {
  "obj": {
    "filters": [],
    "excludes": DaemonSetListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(DaemonSetDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <k8sDaemonSetList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.k8sDaemonSet).flat()"
  />
</template>