<script setup lang="ts">
import k8sRuntimeClassQuery from '@/queries/k8s/RuntimeClass.read.graphql'
import RuntimeClassEdit from '@/queries/k8s/RuntimeClass.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import k8sRuntimeClassMeta from '@/components/k8s/RuntimeClassMeta.vue';
import k8sRuntimeClassEdit from '@/components/k8s/RuntimeClassEdit.vue';
import { useQuery, useMutation, sanitizeData, useRuntimeClass, RuntimeClassSimpleExcludes } from '../../../libs/k8s/RuntimeClass.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotRuntimeClassFound, navigation, editor, setItemFromRoute } = useRuntimeClass();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sRuntimeClassQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": RuntimeClassSimpleExcludes
  },
});
const { mutate: patchRuntimeClass, onDone: onPatchRuntimeClass, onError: onPatchError } = useMutation(RuntimeClassEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchRuntimeClass({
    "name": result.k8sRuntimeClass[0].metadata.name,
    "handler": sanitizeData(editor.value.obj['handler']),
    "overhead": sanitizeData(editor.value.obj['overhead']),
    "scheduling": sanitizeData(editor.value.obj['scheduling']),
  });
}
onError(onErrorHandler);onResult(res => {onNotRuntimeClassFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sRuntimeClass[0])});onPatchRuntimeClass(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sRuntimeClassMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sRuntimeClass[0]!=undefined && result.k8sRuntimeClass[0]!=null"
        :model="result.k8sRuntimeClass[0]"
       />
    </div>
    <div class="col-md-12">
      <k8sRuntimeClassEdit
        v-if="!loading && result!=undefined && result.k8sRuntimeClass[0]!=undefined && result.k8sRuntimeClass[0]!=null"
        :model="result.k8sRuntimeClass[0]"
       />
    </div>
  </div>
</template>

