<script setup lang="ts">
import opentelemetryOpenTelemetryCollectorQuery from '@/queries/opentelemetry/OpenTelemetryCollector.read.graphql'
import OpenTelemetryCollectorEdit from '@/queries/opentelemetry/OpenTelemetryCollector.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import opentelemetryOpenTelemetryCollectorMeta from '@/components/opentelemetry/OpenTelemetryCollectorMeta.vue';
import opentelemetryOpenTelemetryCollectorEdit from '@/components/opentelemetry/OpenTelemetryCollectorEdit.vue';
import opentelemetryOpenTelemetryCollectorStatus from '@/components/opentelemetry/OpenTelemetryCollectorStatus.vue';
import { useQuery, useMutation, sanitizeData, useOpenTelemetryCollector, OpenTelemetryCollectorSimpleExcludes } from '../../../libs/opentelemetry/OpenTelemetryCollector.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotOpenTelemetryCollectorFound, navigation, editor, setNamespacedItemFromRoute } = useOpenTelemetryCollector();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(opentelemetryOpenTelemetryCollectorQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": OpenTelemetryCollectorSimpleExcludes
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
const { mutate: patchOpenTelemetryCollector, onDone: onPatchOpenTelemetryCollector, onError: onPatchError } = useMutation(OpenTelemetryCollectorEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchOpenTelemetryCollector({
    "name": result.k8sNamespace[0].opentelemetryOpenTelemetryCollector[0].metadata.name,
    "namespace": result.k8sNamespace[0].opentelemetryOpenTelemetryCollector[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotOpenTelemetryCollectorFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].opentelemetryOpenTelemetryCollector[0])});onPatchOpenTelemetryCollector(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <opentelemetryOpenTelemetryCollectorMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].opentelemetryOpenTelemetryCollector[0]!=undefined && result.k8sNamespace[0].opentelemetryOpenTelemetryCollector[0]!=null"
        :model="result.k8sNamespace[0].opentelemetryOpenTelemetryCollector[0]"
       />
    </div>
    <div class="col-md-6">
      <opentelemetryOpenTelemetryCollectorStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].opentelemetryOpenTelemetryCollector[0]!=undefined && result.k8sNamespace[0].opentelemetryOpenTelemetryCollector[0]!=null"
        :model="result.k8sNamespace[0].opentelemetryOpenTelemetryCollector[0]"
       />
    </div>
    <div class="col-md-12">
      <opentelemetryOpenTelemetryCollectorEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].opentelemetryOpenTelemetryCollector[0]!=undefined && result.k8sNamespace[0].opentelemetryOpenTelemetryCollector[0]!=null"
        :model="result.k8sNamespace[0].opentelemetryOpenTelemetryCollector[0]"
       />
    </div>
  </div>
</template>

