<script setup lang="ts">
import k8upRestoreQuery from '@/queries/k8up/Restore.read.graphql'
import RestoreEdit from '@/queries/k8up/Restore.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import k8upRestoreMeta from '@/components/k8up/RestoreMeta.vue';
import k8upRestoreEdit from '@/components/k8up/RestoreEdit.vue';
import k8upRestoreStatus from '@/components/k8up/RestoreStatus.vue';
import { useQuery, useMutation, sanitizeData, useRestore, RestoreSimpleExcludes } from '../../../libs/k8up/Restore.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotRestoreFound, navigation, editor, setNamespacedItemFromRoute } = useRestore();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8upRestoreQuery, {
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
    "name": result.k8sNamespace[0].k8upRestore[0].metadata.name,
    "namespace": result.k8sNamespace[0].k8upRestore[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotRestoreFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].k8upRestore[0])});onPatchRestore(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8upRestoreMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8upRestore[0]!=undefined && result.k8sNamespace[0].k8upRestore[0]!=null"
        :model="result.k8sNamespace[0].k8upRestore[0]"
       />
    </div>
    <div class="col-md-6">
      <k8upRestoreStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8upRestore[0]!=undefined && result.k8sNamespace[0].k8upRestore[0]!=null"
        :model="result.k8sNamespace[0].k8upRestore[0]"
       />
    </div>
    <div class="col-md-12">
      <k8upRestoreEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8upRestore[0]!=undefined && result.k8sNamespace[0].k8upRestore[0]!=null"
        :model="result.k8sNamespace[0].k8upRestore[0]"
       />
    </div>
  </div>
</template>

