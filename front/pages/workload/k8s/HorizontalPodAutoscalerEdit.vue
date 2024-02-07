<script setup lang="ts">
import k8sHorizontalPodAutoscalerQuery from '@/queries/k8s/HorizontalPodAutoscaler.read.graphql'
import HorizontalPodAutoscalerEdit from '@/queries/k8s/HorizontalPodAutoscaler.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import k8sHorizontalPodAutoscalerMeta from '@/components/k8s/HorizontalPodAutoscalerMeta.vue';
import k8sHorizontalPodAutoscalerEdit from '@/components/k8s/HorizontalPodAutoscalerEdit.vue';
import k8sHorizontalPodAutoscalerStatus from '@/components/k8s/HorizontalPodAutoscalerStatus.vue';
import { useQuery, useMutation, sanitizeData, useHorizontalPodAutoscaler, HorizontalPodAutoscalerSimpleExcludes } from '../../../libs/k8s/HorizontalPodAutoscaler.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotHorizontalPodAutoscalerFound, navigation, editor, setNamespacedItemFromRoute } = useHorizontalPodAutoscaler();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sHorizontalPodAutoscalerQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": HorizontalPodAutoscalerSimpleExcludes
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
const { mutate: patchHorizontalPodAutoscaler, onDone: onPatchHorizontalPodAutoscaler, onError: onPatchError } = useMutation(HorizontalPodAutoscalerEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchHorizontalPodAutoscaler({
    "name": result.k8sNamespace[0].k8sHorizontalPodAutoscaler[0].metadata.name,
    "namespace": result.k8sNamespace[0].k8sHorizontalPodAutoscaler[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotHorizontalPodAutoscalerFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].k8sHorizontalPodAutoscaler[0])});onPatchHorizontalPodAutoscaler(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sHorizontalPodAutoscalerMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sHorizontalPodAutoscaler[0]!=undefined && result.k8sNamespace[0].k8sHorizontalPodAutoscaler[0]!=null"
        :model="result.k8sNamespace[0].k8sHorizontalPodAutoscaler[0]"
       />
    </div>
    <div class="col-md-6">
      <k8sHorizontalPodAutoscalerStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sHorizontalPodAutoscaler[0]!=undefined && result.k8sNamespace[0].k8sHorizontalPodAutoscaler[0]!=null"
        :model="result.k8sNamespace[0].k8sHorizontalPodAutoscaler[0]"
       />
    </div>
    <div class="col-md-12">
      <k8sHorizontalPodAutoscalerEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sHorizontalPodAutoscaler[0]!=undefined && result.k8sNamespace[0].k8sHorizontalPodAutoscaler[0]!=null"
        :model="result.k8sNamespace[0].k8sHorizontalPodAutoscaler[0]"
       />
    </div>
  </div>
</template>

