<script setup lang="ts">
import monitoringAlertmanagerConfigQuery from '@/queries/monitoring/AlertmanagerConfig.read.graphql'
import AlertmanagerConfigEdit from '@/queries/monitoring/AlertmanagerConfig.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import monitoringAlertmanagerConfigMeta from '@/components/monitoring/AlertmanagerConfigMeta.vue';
import monitoringAlertmanagerConfigEdit from '@/components/monitoring/AlertmanagerConfigEdit.vue';
import { useQuery, useMutation, sanitizeData, useAlertmanagerConfig, AlertmanagerConfigSimpleExcludes } from '../../../libs/monitoring/AlertmanagerConfig.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotAlertmanagerConfigFound, navigation, editor, setNamespacedItemFromRoute } = useAlertmanagerConfig();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(monitoringAlertmanagerConfigQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": AlertmanagerConfigSimpleExcludes
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
const { mutate: patchAlertmanagerConfig, onDone: onPatchAlertmanagerConfig, onError: onPatchError } = useMutation(AlertmanagerConfigEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchAlertmanagerConfig({
    "name": result.k8sNamespace[0].monitoringAlertmanagerConfig[0].metadata.name,
    "namespace": result.k8sNamespace[0].monitoringAlertmanagerConfig[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotAlertmanagerConfigFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].monitoringAlertmanagerConfig[0])});onPatchAlertmanagerConfig(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <monitoringAlertmanagerConfigMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].monitoringAlertmanagerConfig[0]!=undefined && result.k8sNamespace[0].monitoringAlertmanagerConfig[0]!=null"
        :model="result.k8sNamespace[0].monitoringAlertmanagerConfig[0]"
       />
    </div>
    <div class="col-md-12">
      <monitoringAlertmanagerConfigEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].monitoringAlertmanagerConfig[0]!=undefined && result.k8sNamespace[0].monitoringAlertmanagerConfig[0]!=null"
        :model="result.k8sNamespace[0].monitoringAlertmanagerConfig[0]"
       />
    </div>
  </div>
</template>

