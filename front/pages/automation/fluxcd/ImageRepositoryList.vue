<script setup lang="ts">
import fluxcdImageRepositoryQuery from '@/queries/fluxcd/ImageRepository.read.graphql'
import ImageRepositoryDelete from '@/queries/fluxcd/ImageRepository.delete.graphql'
import fluxcdImageRepositoryList from '@/components/fluxcd/ImageRepositoryList.vue';
import { useQuery, useMutation, useImageRepository, ImageRepositoryListExcludes } from '../../../libs/fluxcd/ImageRepository.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useImageRepository();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(fluxcdImageRepositoryQuery, {
  "obj": {
    "filters": [],
    "excludes": ImageRepositoryListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ImageRepositoryDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <fluxcdImageRepositoryList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.fluxcdImageRepository).flat()"
  />
</template>