<script setup lang="ts">
import jaegertracingJaegerQuery from '@/queries/jaegertracing/Jaeger.read.graphql'
import JaegerEdit from '@/queries/jaegertracing/Jaeger.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import jaegertracingJaegerMeta from '@/components/jaegertracing/JaegerMeta.vue';
import jaegertracingJaegerEdit from '@/components/jaegertracing/JaegerEdit.vue';
import jaegertracingJaegerStatus from '@/components/jaegertracing/JaegerStatus.vue';
import { useQuery, useMutation, sanitizeData, useJaeger, JaegerSimpleExcludes } from '../../../libs/jaegertracing/Jaeger.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotJaegerFound, navigation, editor, setNamespacedItemFromRoute } = useJaeger();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(jaegertracingJaegerQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": JaegerSimpleExcludes
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
const { mutate: patchJaeger, onDone: onPatchJaeger, onError: onPatchError } = useMutation(JaegerEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchJaeger({
    "name": result.k8sNamespace[0].jaegertracingJaeger[0].metadata.name,
    "namespace": result.k8sNamespace[0].jaegertracingJaeger[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotJaegerFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].jaegertracingJaeger[0])});onPatchJaeger(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <jaegertracingJaegerMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].jaegertracingJaeger[0]!=undefined && result.k8sNamespace[0].jaegertracingJaeger[0]!=null"
        :model="result.k8sNamespace[0].jaegertracingJaeger[0]"
       />
    </div>
    <div class="col-md-6">
      <jaegertracingJaegerStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].jaegertracingJaeger[0]!=undefined && result.k8sNamespace[0].jaegertracingJaeger[0]!=null"
        :model="result.k8sNamespace[0].jaegertracingJaeger[0]"
       />
    </div>
    <div class="col-md-12">
      <jaegertracingJaegerEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].jaegertracingJaeger[0]!=undefined && result.k8sNamespace[0].jaegertracingJaeger[0]!=null"
        :model="result.k8sNamespace[0].jaegertracingJaeger[0]"
       />
    </div>
  </div>
</template>

