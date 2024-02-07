<script setup lang="ts">
import k8sCSINodeQuery from '@/queries/k8s/CSINode.read.graphql'
import CSINodeEdit from '@/queries/k8s/CSINode.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import k8sCSINodeMeta from '@/components/k8s/CSINodeMeta.vue';
import k8sCSINodeEdit from '@/components/k8s/CSINodeEdit.vue';
import { useQuery, useMutation, sanitizeData, useCSINode, CSINodeSimpleExcludes } from '../../../libs/k8s/CSINode.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotCSINodeFound, navigation, editor, setItemFromRoute } = useCSINode();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sCSINodeQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": CSINodeSimpleExcludes
  },
});
const { mutate: patchCSINode, onDone: onPatchCSINode, onError: onPatchError } = useMutation(CSINodeEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchCSINode({
    "name": result.k8sCSINode[0].metadata.name,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotCSINodeFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sCSINode[0])});onPatchCSINode(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sCSINodeMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sCSINode[0]!=undefined && result.k8sCSINode[0]!=null"
        :model="result.k8sCSINode[0]"
       />
    </div>
    <div class="col-md-12">
      <k8sCSINodeEdit
        v-if="!loading && result!=undefined && result.k8sCSINode[0]!=undefined && result.k8sCSINode[0]!=null"
        :model="result.k8sCSINode[0]"
       />
    </div>
  </div>
</template>

