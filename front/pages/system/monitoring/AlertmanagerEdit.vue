<script setup lang="ts">
import monitoringAlertmanagerQuery from '@/queries/monitoring/Alertmanager.read.graphql'
import AlertmanagerEdit from '@/queries/monitoring/Alertmanager.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import monitoringAlertmanagerMeta from '@/components/monitoring/AlertmanagerMeta.vue';
import monitoringAlertmanagerEdit from '@/components/monitoring/AlertmanagerEdit.vue';
import monitoringAlertmanagerStatus from '@/components/monitoring/AlertmanagerStatus.vue';
import { useQuery, useMutation, sanitizeData, useAlertmanager, AlertmanagerSimpleExcludes } from '../../../libs/monitoring/Alertmanager.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotAlertmanagerFound, navigation, editor, setNamespacedItemFromRoute } = useAlertmanager();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(monitoringAlertmanagerQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": AlertmanagerSimpleExcludes
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
const { mutate: patchAlertmanager, onDone: onPatchAlertmanager, onError: onPatchError } = useMutation(AlertmanagerEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchAlertmanager({
    "name": result.k8sNamespace[0].monitoringAlertmanager[0].metadata.name,
    "namespace": result.k8sNamespace[0].monitoringAlertmanager[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotAlertmanagerFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].monitoringAlertmanager[0])});onPatchAlertmanager(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <monitoringAlertmanagerMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].monitoringAlertmanager[0]!=undefined && result.k8sNamespace[0].monitoringAlertmanager[0]!=null"
        :model="result.k8sNamespace[0].monitoringAlertmanager[0]"
       />
    </div>
    <div class="col-md-6">
      <monitoringAlertmanagerStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].monitoringAlertmanager[0]!=undefined && result.k8sNamespace[0].monitoringAlertmanager[0]!=null"
        :model="result.k8sNamespace[0].monitoringAlertmanager[0]"
       />
    </div>
    <div class="col-md-12">
      <monitoringAlertmanagerEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].monitoringAlertmanager[0]!=undefined && result.k8sNamespace[0].monitoringAlertmanager[0]!=null"
        :model="result.k8sNamespace[0].monitoringAlertmanager[0]"
       />
    </div>
  </div>
</template>

