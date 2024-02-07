<script setup lang="ts">
import monitoringProbeQuery from '@/queries/monitoring/Probe.read.graphql'
import ProbeEdit from '@/queries/monitoring/Probe.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import monitoringProbeMeta from '@/components/monitoring/ProbeMeta.vue';
import monitoringProbeEdit from '@/components/monitoring/ProbeEdit.vue';
import { useQuery, useMutation, sanitizeData, useProbe, ProbeSimpleExcludes } from '../../../libs/monitoring/Probe.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotProbeFound, navigation, editor, setNamespacedItemFromRoute } = useProbe();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(monitoringProbeQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ProbeSimpleExcludes
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
const { mutate: patchProbe, onDone: onPatchProbe, onError: onPatchError } = useMutation(ProbeEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchProbe({
    "name": result.k8sNamespace[0].monitoringProbe[0].metadata.name,
    "namespace": result.k8sNamespace[0].monitoringProbe[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotProbeFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].monitoringProbe[0])});onPatchProbe(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <monitoringProbeMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].monitoringProbe[0]!=undefined && result.k8sNamespace[0].monitoringProbe[0]!=null"
        :model="result.k8sNamespace[0].monitoringProbe[0]"
       />
    </div>
    <div class="col-md-12">
      <monitoringProbeEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].monitoringProbe[0]!=undefined && result.k8sNamespace[0].monitoringProbe[0]!=null"
        :model="result.k8sNamespace[0].monitoringProbe[0]"
       />
    </div>
  </div>
</template>

