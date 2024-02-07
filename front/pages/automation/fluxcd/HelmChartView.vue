<script setup lang="ts">
import fluxcdHelmChartQuery from '@/queries/fluxcd/HelmChart.details.graphql'
import HelmChartDelete from '@/queries/fluxcd/HelmChart.delete.graphql'
import fluxcdHelmChartMeta from '@/components/fluxcd/HelmChartMeta.vue';
import fluxcdHelmChartView from '@/components/fluxcd/HelmChartView.vue';
import fluxcdHelmChartStatus from '@/components/fluxcd/HelmChartStatus.vue';
import { useQuery, useMutation, useHelmChart, HelmChartReadExcludes } from '../../../libs/fluxcd/HelmChart.js'
const { onErrorHandler, notifySuccess, notifyError, onNotHelmChartFound, navigation, setNamespacedItemFromRoute } = useHelmChart();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(fluxcdHelmChartQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": HelmChartReadExcludes
  },
  "namespace": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentNamespace
      }
    ]
  }
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotHelmChartFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(HelmChartDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <fluxcdHelmChartMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdHelmChart[0]!=undefined && result.k8sNamespace[0].fluxcdHelmChart[0]!=null"
        :model="result.k8sNamespace[0].fluxcdHelmChart[0]"
       />
    </div>
    <div class="col-md-6">
      <fluxcdHelmChartStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdHelmChart[0]!=undefined && result.k8sNamespace[0].fluxcdHelmChart[0]!=null"
        :model="result.k8sNamespace[0].fluxcdHelmChart[0]"
       />
    </div>
    <div class="col-md-12">
      <fluxcdHelmChartView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdHelmChart[0]!=undefined && result.k8sNamespace[0].fluxcdHelmChart[0]!=null"
        :model="result.k8sNamespace[0].fluxcdHelmChart[0]"
        />
    </div>
  </div>
</template>
