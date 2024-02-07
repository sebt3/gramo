<script setup lang="ts">
import k8sNodeQuery from '@/queries/k8s/Node.read.graphql'
import NodeEdit from '@/queries/k8s/Node.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import k8sNodeMeta from '@/components/k8s/NodeMeta.vue';
import k8sNodeEdit from '@/components/k8s/NodeEdit.vue';
import k8sNodeStatus from '@/components/k8s/NodeStatus.vue';
import { useQuery, useMutation, sanitizeData, useNode, NodeSimpleExcludes } from '../../../libs/k8s/Node.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotNodeFound, navigation, editor, setItemFromRoute } = useNode();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sNodeQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": NodeSimpleExcludes
  },
});
const { mutate: patchNode, onDone: onPatchNode, onError: onPatchError } = useMutation(NodeEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchNode({
    "name": result.k8sNode[0].metadata.name,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotNodeFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNode[0])});onPatchNode(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sNodeMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNode[0]!=undefined && result.k8sNode[0]!=null"
        :model="result.k8sNode[0]"
       />
    </div>
    <div class="col-md-6">
      <k8sNodeStatus
        v-if="!loading && result!=undefined && result.k8sNode[0]!=undefined && result.k8sNode[0]!=null"
        :model="result.k8sNode[0]"
       />
    </div>
    <div class="col-md-12">
      <k8sNodeEdit
        v-if="!loading && result!=undefined && result.k8sNode[0]!=undefined && result.k8sNode[0]!=null"
        :model="result.k8sNode[0]"
       />
    </div>
  </div>
</template>

