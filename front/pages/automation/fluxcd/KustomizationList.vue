<script setup lang="ts">
import fluxcdKustomizationQuery from '@/queries/fluxcd/Kustomization.read.graphql'
import KustomizationDelete from '@/queries/fluxcd/Kustomization.delete.graphql'
import fluxcdKustomizationList from '@/components/fluxcd/KustomizationList.vue';
import { useQuery, useMutation, useKustomization, KustomizationListExcludes } from '../../../libs/fluxcd/Kustomization.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useKustomization();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(fluxcdKustomizationQuery, {
  "obj": {
    "filters": [],
    "excludes": KustomizationListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(KustomizationDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <fluxcdKustomizationList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.fluxcdKustomization).flat()"
  />
</template>