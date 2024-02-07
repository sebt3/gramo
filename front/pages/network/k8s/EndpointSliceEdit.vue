<script setup lang="ts">
import k8sEndpointSliceQuery from '@/queries/k8s/EndpointSlice.read.graphql'
import EndpointSliceEdit from '@/queries/k8s/EndpointSlice.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import k8sEndpointSliceMeta from '@/components/k8s/EndpointSliceMeta.vue';
import k8sEndpointSliceEdit from '@/components/k8s/EndpointSliceEdit.vue';
import { useQuery, useMutation, sanitizeData, useEndpointSlice, EndpointSliceSimpleExcludes } from '../../../libs/k8s/EndpointSlice.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotEndpointSliceFound, navigation, editor, setNamespacedItemFromRoute } = useEndpointSlice();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sEndpointSliceQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": EndpointSliceSimpleExcludes
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
const { mutate: patchEndpointSlice, onDone: onPatchEndpointSlice, onError: onPatchError } = useMutation(EndpointSliceEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchEndpointSlice({
    "name": result.k8sNamespace[0].k8sEndpointSlice[0].metadata.name,
    "namespace": result.k8sNamespace[0].k8sEndpointSlice[0].metadata.namespace,
    "addressType": sanitizeData(editor.value.obj['addressType']),
    "endpoints": sanitizeData(editor.value.obj['endpoints']),
    "ports": sanitizeData(editor.value.obj['ports']),
  });
}
onError(onErrorHandler);onResult(res => {onNotEndpointSliceFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].k8sEndpointSlice[0])});onPatchEndpointSlice(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sEndpointSliceMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sEndpointSlice[0]!=undefined && result.k8sNamespace[0].k8sEndpointSlice[0]!=null"
        :model="result.k8sNamespace[0].k8sEndpointSlice[0]"
       />
    </div>
    <div class="col-md-12">
      <k8sEndpointSliceEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sEndpointSlice[0]!=undefined && result.k8sNamespace[0].k8sEndpointSlice[0]!=null"
        :model="result.k8sNamespace[0].k8sEndpointSlice[0]"
       />
    </div>
  </div>
</template>

