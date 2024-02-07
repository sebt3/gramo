<script setup lang="ts">
import k8sStorageClassQuery from '@/queries/k8s/StorageClass.read.graphql'
import StorageClassEdit from '@/queries/k8s/StorageClass.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import k8sStorageClassMeta from '@/components/k8s/StorageClassMeta.vue';
import k8sStorageClassEdit from '@/components/k8s/StorageClassEdit.vue';
import { useQuery, useMutation, sanitizeData, useStorageClass, StorageClassSimpleExcludes } from '../../../libs/k8s/StorageClass.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotStorageClassFound, navigation, editor, setItemFromRoute } = useStorageClass();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sStorageClassQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": StorageClassSimpleExcludes
  },
});
const { mutate: patchStorageClass, onDone: onPatchStorageClass, onError: onPatchError } = useMutation(StorageClassEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchStorageClass({
    "name": result.k8sStorageClass[0].metadata.name,
    "allowVolumeExpansion": sanitizeData(editor.value.obj['allowVolumeExpansion']),
    "allowedTopologies": sanitizeData(editor.value.obj['allowedTopologies']),
    "mountOptions": sanitizeData(editor.value.obj['mountOptions']),
    "parameters": sanitizeData(editor.value.obj['parameters']),
    "provisioner": sanitizeData(editor.value.obj['provisioner']),
    "reclaimPolicy": sanitizeData(editor.value.obj['reclaimPolicy']),
    "volumeBindingMode": sanitizeData(editor.value.obj['volumeBindingMode']),
  });
}
onError(onErrorHandler);onResult(res => {onNotStorageClassFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sStorageClass[0])});onPatchStorageClass(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sStorageClassMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sStorageClass[0]!=undefined && result.k8sStorageClass[0]!=null"
        :model="result.k8sStorageClass[0]"
       />
    </div>
    <div class="col-md-12">
      <k8sStorageClassEdit
        v-if="!loading && result!=undefined && result.k8sStorageClass[0]!=undefined && result.k8sStorageClass[0]!=null"
        :model="result.k8sStorageClass[0]"
       />
    </div>
  </div>
</template>

