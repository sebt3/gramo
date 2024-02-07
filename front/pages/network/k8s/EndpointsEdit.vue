<script setup lang="ts">
import k8sEndpointsQuery from '@/queries/k8s/Endpoints.read.graphql'
import EndpointsEdit from '@/queries/k8s/Endpoints.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import k8sEndpointsMeta from '@/components/k8s/EndpointsMeta.vue';
import k8sEndpointsEdit from '@/components/k8s/EndpointsEdit.vue';
import { useQuery, useMutation, sanitizeData, useEndpoints, EndpointsSimpleExcludes } from '../../../libs/k8s/Endpoints.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotEndpointsFound, navigation, editor, setNamespacedItemFromRoute } = useEndpoints();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sEndpointsQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": EndpointsSimpleExcludes
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
const { mutate: patchEndpoints, onDone: onPatchEndpoints, onError: onPatchError } = useMutation(EndpointsEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchEndpoints({
    "name": result.k8sNamespace[0].k8sEndpoints[0].metadata.name,
    "namespace": result.k8sNamespace[0].k8sEndpoints[0].metadata.namespace,
    "subsets": sanitizeData(editor.value.obj['subsets']),
  });
}
onError(onErrorHandler);onResult(res => {onNotEndpointsFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].k8sEndpoints[0])});onPatchEndpoints(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sEndpointsMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sEndpoints[0]!=undefined && result.k8sNamespace[0].k8sEndpoints[0]!=null"
        :model="result.k8sNamespace[0].k8sEndpoints[0]"
       />
    </div>
    <div class="col-md-12">
      <k8sEndpointsEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sEndpoints[0]!=undefined && result.k8sNamespace[0].k8sEndpoints[0]!=null"
        :model="result.k8sNamespace[0].k8sEndpoints[0]"
       />
    </div>
  </div>
</template>

