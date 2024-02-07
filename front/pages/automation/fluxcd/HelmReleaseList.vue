<script setup lang="ts">
import fluxcdHelmReleaseQuery from '@/queries/fluxcd/HelmRelease.read.graphql'
import HelmReleaseDelete from '@/queries/fluxcd/HelmRelease.delete.graphql'
import fluxcdHelmReleaseList from '@/components/fluxcd/HelmReleaseList.vue';
import { useQuery, useMutation, useHelmRelease, HelmReleaseListExcludes } from '../../../libs/fluxcd/HelmRelease.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useHelmRelease();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(fluxcdHelmReleaseQuery, {
  "obj": {
    "filters": [],
    "excludes": HelmReleaseListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(HelmReleaseDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <fluxcdHelmReleaseList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.fluxcdHelmRelease).flat()"
  />
</template>