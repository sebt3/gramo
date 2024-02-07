<script setup lang="ts">
import fluxcdOCIRepositoryQuery from '@/queries/fluxcd/OCIRepository.read.graphql'
import OCIRepositoryDelete from '@/queries/fluxcd/OCIRepository.delete.graphql'
import fluxcdOCIRepositoryList from '@/components/fluxcd/OCIRepositoryList.vue';
import { useQuery, useMutation, useOCIRepository, OCIRepositoryListExcludes } from '../../../libs/fluxcd/OCIRepository.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useOCIRepository();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(fluxcdOCIRepositoryQuery, {
  "obj": {
    "filters": [],
    "excludes": OCIRepositoryListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(OCIRepositoryDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <fluxcdOCIRepositoryList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.fluxcdOCIRepository).flat()"
  />
</template>