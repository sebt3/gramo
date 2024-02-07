<script setup lang="ts">
import opentelemetryOpAMPBridgeQuery from '@/queries/opentelemetry/OpAMPBridge.read.graphql'
import OpAMPBridgeEdit from '@/queries/opentelemetry/OpAMPBridge.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import opentelemetryOpAMPBridgeMeta from '@/components/opentelemetry/OpAMPBridgeMeta.vue';
import opentelemetryOpAMPBridgeEdit from '@/components/opentelemetry/OpAMPBridgeEdit.vue';
import opentelemetryOpAMPBridgeStatus from '@/components/opentelemetry/OpAMPBridgeStatus.vue';
import { useQuery, useMutation, sanitizeData, useOpAMPBridge, OpAMPBridgeSimpleExcludes } from '../../../libs/opentelemetry/OpAMPBridge.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotOpAMPBridgeFound, navigation, editor, setNamespacedItemFromRoute } = useOpAMPBridge();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(opentelemetryOpAMPBridgeQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": OpAMPBridgeSimpleExcludes
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
const { mutate: patchOpAMPBridge, onDone: onPatchOpAMPBridge, onError: onPatchError } = useMutation(OpAMPBridgeEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchOpAMPBridge({
    "name": result.k8sNamespace[0].opentelemetryOpAMPBridge[0].metadata.name,
    "namespace": result.k8sNamespace[0].opentelemetryOpAMPBridge[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotOpAMPBridgeFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].opentelemetryOpAMPBridge[0])});onPatchOpAMPBridge(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <opentelemetryOpAMPBridgeMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].opentelemetryOpAMPBridge[0]!=undefined && result.k8sNamespace[0].opentelemetryOpAMPBridge[0]!=null"
        :model="result.k8sNamespace[0].opentelemetryOpAMPBridge[0]"
       />
    </div>
    <div class="col-md-6">
      <opentelemetryOpAMPBridgeStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].opentelemetryOpAMPBridge[0]!=undefined && result.k8sNamespace[0].opentelemetryOpAMPBridge[0]!=null"
        :model="result.k8sNamespace[0].opentelemetryOpAMPBridge[0]"
       />
    </div>
    <div class="col-md-12">
      <opentelemetryOpAMPBridgeEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].opentelemetryOpAMPBridge[0]!=undefined && result.k8sNamespace[0].opentelemetryOpAMPBridge[0]!=null"
        :model="result.k8sNamespace[0].opentelemetryOpAMPBridge[0]"
       />
    </div>
  </div>
</template>

