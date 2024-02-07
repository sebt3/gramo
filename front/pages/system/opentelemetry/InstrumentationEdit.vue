<script setup lang="ts">
import opentelemetryInstrumentationQuery from '@/queries/opentelemetry/Instrumentation.read.graphql'
import InstrumentationEdit from '@/queries/opentelemetry/Instrumentation.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import opentelemetryInstrumentationMeta from '@/components/opentelemetry/InstrumentationMeta.vue';
import opentelemetryInstrumentationEdit from '@/components/opentelemetry/InstrumentationEdit.vue';
import opentelemetryInstrumentationStatus from '@/components/opentelemetry/InstrumentationStatus.vue';
import { useQuery, useMutation, sanitizeData, useInstrumentation, InstrumentationSimpleExcludes } from '../../../libs/opentelemetry/Instrumentation.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotInstrumentationFound, navigation, editor, setNamespacedItemFromRoute } = useInstrumentation();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(opentelemetryInstrumentationQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": InstrumentationSimpleExcludes
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
const { mutate: patchInstrumentation, onDone: onPatchInstrumentation, onError: onPatchError } = useMutation(InstrumentationEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchInstrumentation({
    "name": result.k8sNamespace[0].opentelemetryInstrumentation[0].metadata.name,
    "namespace": result.k8sNamespace[0].opentelemetryInstrumentation[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotInstrumentationFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].opentelemetryInstrumentation[0])});onPatchInstrumentation(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <opentelemetryInstrumentationMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].opentelemetryInstrumentation[0]!=undefined && result.k8sNamespace[0].opentelemetryInstrumentation[0]!=null"
        :model="result.k8sNamespace[0].opentelemetryInstrumentation[0]"
       />
    </div>
    <div class="col-md-6">
      <opentelemetryInstrumentationStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].opentelemetryInstrumentation[0]!=undefined && result.k8sNamespace[0].opentelemetryInstrumentation[0]!=null"
        :model="result.k8sNamespace[0].opentelemetryInstrumentation[0]"
       />
    </div>
    <div class="col-md-12">
      <opentelemetryInstrumentationEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].opentelemetryInstrumentation[0]!=undefined && result.k8sNamespace[0].opentelemetryInstrumentation[0]!=null"
        :model="result.k8sNamespace[0].opentelemetryInstrumentation[0]"
       />
    </div>
  </div>
</template>

