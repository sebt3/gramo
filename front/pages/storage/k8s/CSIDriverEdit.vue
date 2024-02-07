<script setup lang="ts">
import k8sCSIDriverQuery from '@/queries/k8s/CSIDriver.read.graphql'
import CSIDriverEdit from '@/queries/k8s/CSIDriver.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import k8sCSIDriverMeta from '@/components/k8s/CSIDriverMeta.vue';
import k8sCSIDriverEdit from '@/components/k8s/CSIDriverEdit.vue';
import { useQuery, useMutation, sanitizeData, useCSIDriver, CSIDriverSimpleExcludes } from '../../../libs/k8s/CSIDriver.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotCSIDriverFound, navigation, editor, setItemFromRoute } = useCSIDriver();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sCSIDriverQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": CSIDriverSimpleExcludes
  },
});
const { mutate: patchCSIDriver, onDone: onPatchCSIDriver, onError: onPatchError } = useMutation(CSIDriverEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchCSIDriver({
    "name": result.k8sCSIDriver[0].metadata.name,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotCSIDriverFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sCSIDriver[0])});onPatchCSIDriver(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sCSIDriverMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sCSIDriver[0]!=undefined && result.k8sCSIDriver[0]!=null"
        :model="result.k8sCSIDriver[0]"
       />
    </div>
    <div class="col-md-12">
      <k8sCSIDriverEdit
        v-if="!loading && result!=undefined && result.k8sCSIDriver[0]!=undefined && result.k8sCSIDriver[0]!=null"
        :model="result.k8sCSIDriver[0]"
       />
    </div>
  </div>
</template>

