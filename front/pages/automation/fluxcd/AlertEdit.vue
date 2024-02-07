<script setup lang="ts">
import fluxcdAlertQuery from '@/queries/fluxcd/Alert.read.graphql'
import AlertEdit from '@/queries/fluxcd/Alert.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import fluxcdAlertMeta from '@/components/fluxcd/AlertMeta.vue';
import fluxcdAlertEdit from '@/components/fluxcd/AlertEdit.vue';
import fluxcdAlertStatus from '@/components/fluxcd/AlertStatus.vue';
import { useQuery, useMutation, sanitizeData, useAlert, AlertSimpleExcludes } from '../../../libs/fluxcd/Alert.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotAlertFound, navigation, editor, setNamespacedItemFromRoute } = useAlert();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(fluxcdAlertQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": AlertSimpleExcludes
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
const { mutate: patchAlert, onDone: onPatchAlert, onError: onPatchError } = useMutation(AlertEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchAlert({
    "name": result.k8sNamespace[0].fluxcdAlert[0].metadata.name,
    "namespace": result.k8sNamespace[0].fluxcdAlert[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotAlertFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].fluxcdAlert[0])});onPatchAlert(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <fluxcdAlertMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdAlert[0]!=undefined && result.k8sNamespace[0].fluxcdAlert[0]!=null"
        :model="result.k8sNamespace[0].fluxcdAlert[0]"
       />
    </div>
    <div class="col-md-6">
      <fluxcdAlertStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdAlert[0]!=undefined && result.k8sNamespace[0].fluxcdAlert[0]!=null"
        :model="result.k8sNamespace[0].fluxcdAlert[0]"
       />
    </div>
    <div class="col-md-12">
      <fluxcdAlertEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdAlert[0]!=undefined && result.k8sNamespace[0].fluxcdAlert[0]!=null"
        :model="result.k8sNamespace[0].fluxcdAlert[0]"
       />
    </div>
  </div>
</template>

