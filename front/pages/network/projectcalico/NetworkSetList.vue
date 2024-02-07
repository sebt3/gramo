<script setup lang="ts">
import projectcalicoNetworkSetQuery from '@/queries/projectcalico/NetworkSet.read.graphql'
import NetworkSetDelete from '@/queries/projectcalico/NetworkSet.delete.graphql'
import projectcalicoNetworkSetList from '@/components/projectcalico/NetworkSetList.vue';
import { useQuery, useMutation, useNetworkSet, NetworkSetListExcludes } from '../../../libs/projectcalico/NetworkSet.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useNetworkSet();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(projectcalicoNetworkSetQuery, {
  "obj": {
    "filters": [],
    "excludes": NetworkSetListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(NetworkSetDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <projectcalicoNetworkSetList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.projectcalicoNetworkSet).flat()"
  />
</template>