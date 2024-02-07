<script setup lang="ts">
import mariadbRestoreQuery from '@/queries/mariadb/Restore.read.graphql'
import RestoreEdit from '@/queries/mariadb/Restore.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import mariadbRestoreMeta from '@/components/mariadb/RestoreMeta.vue';
import mariadbRestoreEdit from '@/components/mariadb/RestoreEdit.vue';
import mariadbRestoreStatus from '@/components/mariadb/RestoreStatus.vue';
import { useQuery, useMutation, sanitizeData, useRestore, RestoreSimpleExcludes } from '../../../libs/mariadb/Restore.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotRestoreFound, navigation, editor, setNamespacedItemFromRoute } = useRestore();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(mariadbRestoreQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": RestoreSimpleExcludes
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
const { mutate: patchRestore, onDone: onPatchRestore, onError: onPatchError } = useMutation(RestoreEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchRestore({
    "name": result.k8sNamespace[0].mariadbRestore[0].metadata.name,
    "namespace": result.k8sNamespace[0].mariadbRestore[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotRestoreFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].mariadbRestore[0])});onPatchRestore(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <mariadbRestoreMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbRestore[0]!=undefined && result.k8sNamespace[0].mariadbRestore[0]!=null"
        :model="result.k8sNamespace[0].mariadbRestore[0]"
       />
    </div>
    <div class="col-md-6">
      <mariadbRestoreStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbRestore[0]!=undefined && result.k8sNamespace[0].mariadbRestore[0]!=null"
        :model="result.k8sNamespace[0].mariadbRestore[0]"
       />
    </div>
    <div class="col-md-12">
      <mariadbRestoreEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbRestore[0]!=undefined && result.k8sNamespace[0].mariadbRestore[0]!=null"
        :model="result.k8sNamespace[0].mariadbRestore[0]"
       />
    </div>
  </div>
</template>

