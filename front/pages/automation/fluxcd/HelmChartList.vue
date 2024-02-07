<script setup lang="ts">
import fluxcdHelmChartQuery from '@/queries/fluxcd/HelmChart.read.graphql'
import HelmChartDelete from '@/queries/fluxcd/HelmChart.delete.graphql'
import fluxcdHelmChartList from '@/components/fluxcd/HelmChartList.vue';
import { useQuery, useMutation, useHelmChart, HelmChartListExcludes } from '../../../libs/fluxcd/HelmChart.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useHelmChart();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(fluxcdHelmChartQuery, {
  "obj": {
    "filters": [],
    "excludes": HelmChartListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(HelmChartDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <fluxcdHelmChartList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.fluxcdHelmChart).flat()"
  />
</template>