<script setup lang="ts">
import monitoringPrometheusAgentQuery from '@/queries/monitoring/PrometheusAgent.read.graphql'
import PrometheusAgentEdit from '@/queries/monitoring/PrometheusAgent.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import monitoringPrometheusAgentMeta from '@/components/monitoring/PrometheusAgentMeta.vue';
import monitoringPrometheusAgentEdit from '@/components/monitoring/PrometheusAgentEdit.vue';
import monitoringPrometheusAgentStatus from '@/components/monitoring/PrometheusAgentStatus.vue';
import { useQuery, useMutation, sanitizeData, usePrometheusAgent, PrometheusAgentSimpleExcludes } from '../../../libs/monitoring/PrometheusAgent.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotPrometheusAgentFound, navigation, editor, setNamespacedItemFromRoute } = usePrometheusAgent();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(monitoringPrometheusAgentQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": PrometheusAgentSimpleExcludes
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
const { mutate: patchPrometheusAgent, onDone: onPatchPrometheusAgent, onError: onPatchError } = useMutation(PrometheusAgentEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchPrometheusAgent({
    "name": result.k8sNamespace[0].monitoringPrometheusAgent[0].metadata.name,
    "namespace": result.k8sNamespace[0].monitoringPrometheusAgent[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotPrometheusAgentFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].monitoringPrometheusAgent[0])});onPatchPrometheusAgent(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <monitoringPrometheusAgentMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].monitoringPrometheusAgent[0]!=undefined && result.k8sNamespace[0].monitoringPrometheusAgent[0]!=null"
        :model="result.k8sNamespace[0].monitoringPrometheusAgent[0]"
       />
    </div>
    <div class="col-md-6">
      <monitoringPrometheusAgentStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].monitoringPrometheusAgent[0]!=undefined && result.k8sNamespace[0].monitoringPrometheusAgent[0]!=null"
        :model="result.k8sNamespace[0].monitoringPrometheusAgent[0]"
       />
    </div>
    <div class="col-md-12">
      <monitoringPrometheusAgentEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].monitoringPrometheusAgent[0]!=undefined && result.k8sNamespace[0].monitoringPrometheusAgent[0]!=null"
        :model="result.k8sNamespace[0].monitoringPrometheusAgent[0]"
       />
    </div>
  </div>
</template>

