<script setup lang="ts">
import fluxcdHelmRepositoryQuery from '@/queries/fluxcd/HelmRepository.read.graphql'
import HelmRepositoryDelete from '@/queries/fluxcd/HelmRepository.delete.graphql'
import fluxcdHelmRepositoryList from '@/components/fluxcd/HelmRepositoryList.vue';
import { useQuery, useMutation, useHelmRepository, HelmRepositoryListExcludes } from '../../../libs/fluxcd/HelmRepository.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useHelmRepository();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(fluxcdHelmRepositoryQuery, {
  "obj": {
    "filters": [],
    "excludes": HelmRepositoryListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(HelmRepositoryDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <fluxcdHelmRepositoryList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.fluxcdHelmRepository).flat()"
  />
</template>