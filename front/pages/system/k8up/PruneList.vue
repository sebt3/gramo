<script setup lang="ts">
import k8upPruneQuery from '@/queries/k8up/Prune.read.graphql'
import PruneDelete from '@/queries/k8up/Prune.delete.graphql'
import k8upPruneList from '@/components/k8up/PruneList.vue';
import { useQuery, useMutation, usePrune, PruneListExcludes } from '../../../libs/k8up/Prune.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = usePrune();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(k8upPruneQuery, {
  "obj": {
    "filters": [],
    "excludes": PruneListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(PruneDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <k8upPruneList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.k8upPrune).flat()"
  />
</template>