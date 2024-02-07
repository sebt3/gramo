<script setup lang="ts">
import monitoringServiceMonitorQuery from '@/queries/monitoring/ServiceMonitor.read.graphql'
import ServiceMonitorEdit from '@/queries/monitoring/ServiceMonitor.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import monitoringServiceMonitorMeta from '@/components/monitoring/ServiceMonitorMeta.vue';
import monitoringServiceMonitorEdit from '@/components/monitoring/ServiceMonitorEdit.vue';
import { useQuery, useMutation, sanitizeData, useServiceMonitor, ServiceMonitorSimpleExcludes } from '../../../libs/monitoring/ServiceMonitor.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotServiceMonitorFound, navigation, editor, setNamespacedItemFromRoute } = useServiceMonitor();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(monitoringServiceMonitorQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ServiceMonitorSimpleExcludes
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
const { mutate: patchServiceMonitor, onDone: onPatchServiceMonitor, onError: onPatchError } = useMutation(ServiceMonitorEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchServiceMonitor({
    "name": result.k8sNamespace[0].monitoringServiceMonitor[0].metadata.name,
    "namespace": result.k8sNamespace[0].monitoringServiceMonitor[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotServiceMonitorFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].monitoringServiceMonitor[0])});onPatchServiceMonitor(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <monitoringServiceMonitorMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].monitoringServiceMonitor[0]!=undefined && result.k8sNamespace[0].monitoringServiceMonitor[0]!=null"
        :model="result.k8sNamespace[0].monitoringServiceMonitor[0]"
       />
    </div>
    <div class="col-md-12">
      <monitoringServiceMonitorEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].monitoringServiceMonitor[0]!=undefined && result.k8sNamespace[0].monitoringServiceMonitor[0]!=null"
        :model="result.k8sNamespace[0].monitoringServiceMonitor[0]"
       />
    </div>
  </div>
</template>

