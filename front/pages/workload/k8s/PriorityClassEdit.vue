<script setup lang="ts">
import k8sPriorityClassQuery from '@/queries/k8s/PriorityClass.read.graphql'
import PriorityClassEdit from '@/queries/k8s/PriorityClass.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import k8sPriorityClassMeta from '@/components/k8s/PriorityClassMeta.vue';
import k8sPriorityClassEdit from '@/components/k8s/PriorityClassEdit.vue';
import { useQuery, useMutation, sanitizeData, usePriorityClass, PriorityClassSimpleExcludes } from '../../../libs/k8s/PriorityClass.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotPriorityClassFound, navigation, editor, setItemFromRoute } = usePriorityClass();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sPriorityClassQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": PriorityClassSimpleExcludes
  },
});
const { mutate: patchPriorityClass, onDone: onPatchPriorityClass, onError: onPatchError } = useMutation(PriorityClassEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchPriorityClass({
    "name": result.k8sPriorityClass[0].metadata.name,
    "description": sanitizeData(editor.value.obj['description']),
    "globalDefault": sanitizeData(editor.value.obj['globalDefault']),
    "preemptionPolicy": sanitizeData(editor.value.obj['preemptionPolicy']),
    "value": sanitizeData(editor.value.obj['value']),
  });
}
onError(onErrorHandler);onResult(res => {onNotPriorityClassFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sPriorityClass[0])});onPatchPriorityClass(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sPriorityClassMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sPriorityClass[0]!=undefined && result.k8sPriorityClass[0]!=null"
        :model="result.k8sPriorityClass[0]"
       />
    </div>
    <div class="col-md-12">
      <k8sPriorityClassEdit
        v-if="!loading && result!=undefined && result.k8sPriorityClass[0]!=undefined && result.k8sPriorityClass[0]!=null"
        :model="result.k8sPriorityClass[0]"
       />
    </div>
  </div>
</template>

