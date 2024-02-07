<script setup lang="ts">
import k8sReplicaSetQuery from '@/queries/k8s/ReplicaSet.read.graphql'
import ReplicaSetDelete from '@/queries/k8s/ReplicaSet.delete.graphql'
import k8sReplicaSetList from '@/components/k8s/ReplicaSetList.vue';
import { useQuery, useMutation, useReplicaSet, ReplicaSetListExcludes } from '../../../libs/k8s/ReplicaSet.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useReplicaSet();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(k8sReplicaSetQuery, {
  "obj": {
    "filters": [],
    "excludes": ReplicaSetListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ReplicaSetDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <k8sReplicaSetList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.k8sReplicaSet).flat()"
  />
</template>