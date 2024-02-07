<script setup lang="ts">
import fluxcdReceiverQuery from '@/queries/fluxcd/Receiver.read.graphql'
import ReceiverEdit from '@/queries/fluxcd/Receiver.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import fluxcdReceiverMeta from '@/components/fluxcd/ReceiverMeta.vue';
import fluxcdReceiverEdit from '@/components/fluxcd/ReceiverEdit.vue';
import fluxcdReceiverStatus from '@/components/fluxcd/ReceiverStatus.vue';
import { useQuery, useMutation, sanitizeData, useReceiver, ReceiverSimpleExcludes } from '../../../libs/fluxcd/Receiver.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotReceiverFound, navigation, editor, setNamespacedItemFromRoute } = useReceiver();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(fluxcdReceiverQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ReceiverSimpleExcludes
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
const { mutate: patchReceiver, onDone: onPatchReceiver, onError: onPatchError } = useMutation(ReceiverEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchReceiver({
    "name": result.k8sNamespace[0].fluxcdReceiver[0].metadata.name,
    "namespace": result.k8sNamespace[0].fluxcdReceiver[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotReceiverFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].fluxcdReceiver[0])});onPatchReceiver(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <fluxcdReceiverMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdReceiver[0]!=undefined && result.k8sNamespace[0].fluxcdReceiver[0]!=null"
        :model="result.k8sNamespace[0].fluxcdReceiver[0]"
       />
    </div>
    <div class="col-md-6">
      <fluxcdReceiverStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdReceiver[0]!=undefined && result.k8sNamespace[0].fluxcdReceiver[0]!=null"
        :model="result.k8sNamespace[0].fluxcdReceiver[0]"
       />
    </div>
    <div class="col-md-12">
      <fluxcdReceiverEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdReceiver[0]!=undefined && result.k8sNamespace[0].fluxcdReceiver[0]!=null"
        :model="result.k8sNamespace[0].fluxcdReceiver[0]"
       />
    </div>
  </div>
</template>

