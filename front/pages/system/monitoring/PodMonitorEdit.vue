<script setup lang="ts">
import monitoringPodMonitorQuery from '@/queries/monitoring/PodMonitor.read.graphql'
import PodMonitorEdit from '@/queries/monitoring/PodMonitor.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import monitoringPodMonitorMeta from '@/components/monitoring/PodMonitorMeta.vue';
import monitoringPodMonitorEdit from '@/components/monitoring/PodMonitorEdit.vue';
import { useQuery, useMutation, sanitizeData, usePodMonitor, PodMonitorSimpleExcludes } from '../../../libs/monitoring/PodMonitor.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotPodMonitorFound, navigation, editor, setNamespacedItemFromRoute } = usePodMonitor();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(monitoringPodMonitorQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": PodMonitorSimpleExcludes
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
const { mutate: patchPodMonitor, onDone: onPatchPodMonitor, onError: onPatchError } = useMutation(PodMonitorEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchPodMonitor({
    "name": result.k8sNamespace[0].monitoringPodMonitor[0].metadata.name,
    "namespace": result.k8sNamespace[0].monitoringPodMonitor[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotPodMonitorFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].monitoringPodMonitor[0])});onPatchPodMonitor(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <monitoringPodMonitorMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].monitoringPodMonitor[0]!=undefined && result.k8sNamespace[0].monitoringPodMonitor[0]!=null"
        :model="result.k8sNamespace[0].monitoringPodMonitor[0]"
       />
    </div>
    <div class="col-md-12">
      <monitoringPodMonitorEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].monitoringPodMonitor[0]!=undefined && result.k8sNamespace[0].monitoringPodMonitor[0]!=null"
        :model="result.k8sNamespace[0].monitoringPodMonitor[0]"
       />
    </div>
  </div>
</template>

