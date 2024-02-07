<script setup lang="ts">
import k8sReplicationControllerQuery from '@/queries/k8s/ReplicationController.read.graphql'
import ReplicationControllerEdit from '@/queries/k8s/ReplicationController.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import k8sReplicationControllerMeta from '@/components/k8s/ReplicationControllerMeta.vue';
import k8sReplicationControllerEdit from '@/components/k8s/ReplicationControllerEdit.vue';
import k8sReplicationControllerStatus from '@/components/k8s/ReplicationControllerStatus.vue';
import { useQuery, useMutation, sanitizeData, useReplicationController, ReplicationControllerSimpleExcludes } from '../../../libs/k8s/ReplicationController.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotReplicationControllerFound, navigation, editor, setNamespacedItemFromRoute } = useReplicationController();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sReplicationControllerQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ReplicationControllerSimpleExcludes
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
const { mutate: patchReplicationController, onDone: onPatchReplicationController, onError: onPatchError } = useMutation(ReplicationControllerEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchReplicationController({
    "name": result.k8sNamespace[0].k8sReplicationController[0].metadata.name,
    "namespace": result.k8sNamespace[0].k8sReplicationController[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotReplicationControllerFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].k8sReplicationController[0])});onPatchReplicationController(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sReplicationControllerMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sReplicationController[0]!=undefined && result.k8sNamespace[0].k8sReplicationController[0]!=null"
        :model="result.k8sNamespace[0].k8sReplicationController[0]"
       />
    </div>
    <div class="col-md-6">
      <k8sReplicationControllerStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sReplicationController[0]!=undefined && result.k8sNamespace[0].k8sReplicationController[0]!=null"
        :model="result.k8sNamespace[0].k8sReplicationController[0]"
       />
    </div>
    <div class="col-md-12">
      <k8sReplicationControllerEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sReplicationController[0]!=undefined && result.k8sNamespace[0].k8sReplicationController[0]!=null"
        :model="result.k8sNamespace[0].k8sReplicationController[0]"
       />
    </div>
  </div>
</template>

