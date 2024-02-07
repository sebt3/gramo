<script setup lang="ts">
import k8sReplicationControllerQuery from '@/queries/k8s/ReplicationController.read.graphql'
import ReplicationControllerDelete from '@/queries/k8s/ReplicationController.delete.graphql'
import k8sReplicationControllerList from '@/components/k8s/ReplicationControllerList.vue';
import { useQuery, useMutation, useReplicationController, ReplicationControllerListExcludes } from '../../../libs/k8s/ReplicationController.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useReplicationController();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(k8sReplicationControllerQuery, {
  "obj": {
    "filters": [],
    "excludes": ReplicationControllerListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ReplicationControllerDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <k8sReplicationControllerList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.k8sReplicationController).flat()"
  />
</template>