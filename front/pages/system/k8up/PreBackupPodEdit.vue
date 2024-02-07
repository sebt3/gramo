<script setup lang="ts">
import k8upPreBackupPodQuery from '@/queries/k8up/PreBackupPod.read.graphql'
import PreBackupPodEdit from '@/queries/k8up/PreBackupPod.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import k8upPreBackupPodMeta from '@/components/k8up/PreBackupPodMeta.vue';
import k8upPreBackupPodEdit from '@/components/k8up/PreBackupPodEdit.vue';
import { useQuery, useMutation, sanitizeData, usePreBackupPod, PreBackupPodSimpleExcludes } from '../../../libs/k8up/PreBackupPod.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotPreBackupPodFound, navigation, editor, setNamespacedItemFromRoute } = usePreBackupPod();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8upPreBackupPodQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": PreBackupPodSimpleExcludes
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
const { mutate: patchPreBackupPod, onDone: onPatchPreBackupPod, onError: onPatchError } = useMutation(PreBackupPodEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchPreBackupPod({
    "name": result.k8sNamespace[0].k8upPreBackupPod[0].metadata.name,
    "namespace": result.k8sNamespace[0].k8upPreBackupPod[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotPreBackupPodFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].k8upPreBackupPod[0])});onPatchPreBackupPod(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8upPreBackupPodMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8upPreBackupPod[0]!=undefined && result.k8sNamespace[0].k8upPreBackupPod[0]!=null"
        :model="result.k8sNamespace[0].k8upPreBackupPod[0]"
       />
    </div>
    <div class="col-md-12">
      <k8upPreBackupPodEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8upPreBackupPod[0]!=undefined && result.k8sNamespace[0].k8upPreBackupPod[0]!=null"
        :model="result.k8sNamespace[0].k8upPreBackupPod[0]"
       />
    </div>
  </div>
</template>

