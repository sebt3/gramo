<script setup lang="ts">
import monitoringThanosRulerQuery from '@/queries/monitoring/ThanosRuler.read.graphql'
import ThanosRulerEdit from '@/queries/monitoring/ThanosRuler.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import monitoringThanosRulerMeta from '@/components/monitoring/ThanosRulerMeta.vue';
import monitoringThanosRulerEdit from '@/components/monitoring/ThanosRulerEdit.vue';
import monitoringThanosRulerStatus from '@/components/monitoring/ThanosRulerStatus.vue';
import { useQuery, useMutation, sanitizeData, useThanosRuler, ThanosRulerSimpleExcludes } from '../../../libs/monitoring/ThanosRuler.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotThanosRulerFound, navigation, editor, setNamespacedItemFromRoute } = useThanosRuler();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(monitoringThanosRulerQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ThanosRulerSimpleExcludes
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
const { mutate: patchThanosRuler, onDone: onPatchThanosRuler, onError: onPatchError } = useMutation(ThanosRulerEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchThanosRuler({
    "name": result.k8sNamespace[0].monitoringThanosRuler[0].metadata.name,
    "namespace": result.k8sNamespace[0].monitoringThanosRuler[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotThanosRulerFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].monitoringThanosRuler[0])});onPatchThanosRuler(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <monitoringThanosRulerMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].monitoringThanosRuler[0]!=undefined && result.k8sNamespace[0].monitoringThanosRuler[0]!=null"
        :model="result.k8sNamespace[0].monitoringThanosRuler[0]"
       />
    </div>
    <div class="col-md-6">
      <monitoringThanosRulerStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].monitoringThanosRuler[0]!=undefined && result.k8sNamespace[0].monitoringThanosRuler[0]!=null"
        :model="result.k8sNamespace[0].monitoringThanosRuler[0]"
       />
    </div>
    <div class="col-md-12">
      <monitoringThanosRulerEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].monitoringThanosRuler[0]!=undefined && result.k8sNamespace[0].monitoringThanosRuler[0]!=null"
        :model="result.k8sNamespace[0].monitoringThanosRuler[0]"
       />
    </div>
  </div>
</template>

