<script setup lang="ts">
import fluxcdImageUpdateAutomationQuery from '@/queries/fluxcd/ImageUpdateAutomation.read.graphql'
import ImageUpdateAutomationDelete from '@/queries/fluxcd/ImageUpdateAutomation.delete.graphql'
import fluxcdImageUpdateAutomationList from '@/components/fluxcd/ImageUpdateAutomationList.vue';
import { useQuery, useMutation, useImageUpdateAutomation, ImageUpdateAutomationListExcludes } from '../../../libs/fluxcd/ImageUpdateAutomation.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useImageUpdateAutomation();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(fluxcdImageUpdateAutomationQuery, {
  "obj": {
    "filters": [],
    "excludes": ImageUpdateAutomationListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ImageUpdateAutomationDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <fluxcdImageUpdateAutomationList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.fluxcdImageUpdateAutomation).flat()"
  />
</template>