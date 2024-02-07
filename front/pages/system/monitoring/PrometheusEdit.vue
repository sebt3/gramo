<script setup lang="ts">
import monitoringPrometheusQuery from '@/queries/monitoring/Prometheus.read.graphql'
import PrometheusEdit from '@/queries/monitoring/Prometheus.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import monitoringPrometheusMeta from '@/components/monitoring/PrometheusMeta.vue';
import monitoringPrometheusEdit from '@/components/monitoring/PrometheusEdit.vue';
import monitoringPrometheusStatus from '@/components/monitoring/PrometheusStatus.vue';
import { useQuery, useMutation, sanitizeData, usePrometheus, PrometheusSimpleExcludes } from '../../../libs/monitoring/Prometheus.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotPrometheusFound, navigation, editor, setNamespacedItemFromRoute } = usePrometheus();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(monitoringPrometheusQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": PrometheusSimpleExcludes
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
const { mutate: patchPrometheus, onDone: onPatchPrometheus, onError: onPatchError } = useMutation(PrometheusEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchPrometheus({
    "name": result.k8sNamespace[0].monitoringPrometheus[0].metadata.name,
    "namespace": result.k8sNamespace[0].monitoringPrometheus[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotPrometheusFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].monitoringPrometheus[0])});onPatchPrometheus(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <monitoringPrometheusMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].monitoringPrometheus[0]!=undefined && result.k8sNamespace[0].monitoringPrometheus[0]!=null"
        :model="result.k8sNamespace[0].monitoringPrometheus[0]"
       />
    </div>
    <div class="col-md-6">
      <monitoringPrometheusStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].monitoringPrometheus[0]!=undefined && result.k8sNamespace[0].monitoringPrometheus[0]!=null"
        :model="result.k8sNamespace[0].monitoringPrometheus[0]"
       />
    </div>
    <div class="col-md-12">
      <monitoringPrometheusEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].monitoringPrometheus[0]!=undefined && result.k8sNamespace[0].monitoringPrometheus[0]!=null"
        :model="result.k8sNamespace[0].monitoringPrometheus[0]"
       />
    </div>
  </div>
</template>

