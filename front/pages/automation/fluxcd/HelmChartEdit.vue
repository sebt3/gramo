<script setup lang="ts">
import fluxcdHelmChartQuery from '@/queries/fluxcd/HelmChart.read.graphql'
import HelmChartEdit from '@/queries/fluxcd/HelmChart.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import fluxcdHelmChartMeta from '@/components/fluxcd/HelmChartMeta.vue';
import fluxcdHelmChartEdit from '@/components/fluxcd/HelmChartEdit.vue';
import fluxcdHelmChartStatus from '@/components/fluxcd/HelmChartStatus.vue';
import { useQuery, useMutation, sanitizeData, useHelmChart, HelmChartSimpleExcludes } from '../../../libs/fluxcd/HelmChart.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotHelmChartFound, navigation, editor, setNamespacedItemFromRoute } = useHelmChart();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(fluxcdHelmChartQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": HelmChartSimpleExcludes
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
});
const { mutate: patchHelmChart, onDone: onPatchHelmChart, onError: onPatchError } = useMutation(HelmChartEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchHelmChart({
    "name": result.k8sNamespace[0].fluxcdHelmChart[0].metadata.name,
    "namespace": result.k8sNamespace[0].fluxcdHelmChart[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotHelmChartFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].fluxcdHelmChart[0])});onPatchHelmChart(patchDone);onPatchError(patchError);
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
      <fluxcdHelmChartEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdHelmChart[0]!=undefined && result.k8sNamespace[0].fluxcdHelmChart[0]!=null"
        :model="result.k8sNamespace[0].fluxcdHelmChart[0]"
       />
    </div>
  </div>
</template>

