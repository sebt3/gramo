<script setup lang="ts">
import fluxcdImageUpdateAutomationQuery from '@/queries/fluxcd/ImageUpdateAutomation.read.graphql'
import ImageUpdateAutomationEdit from '@/queries/fluxcd/ImageUpdateAutomation.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import fluxcdImageUpdateAutomationMeta from '@/components/fluxcd/ImageUpdateAutomationMeta.vue';
import fluxcdImageUpdateAutomationEdit from '@/components/fluxcd/ImageUpdateAutomationEdit.vue';
import fluxcdImageUpdateAutomationStatus from '@/components/fluxcd/ImageUpdateAutomationStatus.vue';
import { useQuery, useMutation, sanitizeData, useImageUpdateAutomation, ImageUpdateAutomationSimpleExcludes } from '../../../libs/fluxcd/ImageUpdateAutomation.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotImageUpdateAutomationFound, navigation, editor, setNamespacedItemFromRoute } = useImageUpdateAutomation();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(fluxcdImageUpdateAutomationQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ImageUpdateAutomationSimpleExcludes
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
const { mutate: patchImageUpdateAutomation, onDone: onPatchImageUpdateAutomation, onError: onPatchError } = useMutation(ImageUpdateAutomationEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchImageUpdateAutomation({
    "name": result.k8sNamespace[0].fluxcdImageUpdateAutomation[0].metadata.name,
    "namespace": result.k8sNamespace[0].fluxcdImageUpdateAutomation[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotImageUpdateAutomationFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].fluxcdImageUpdateAutomation[0])});onPatchImageUpdateAutomation(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <fluxcdImageUpdateAutomationMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdImageUpdateAutomation[0]!=undefined && result.k8sNamespace[0].fluxcdImageUpdateAutomation[0]!=null"
        :model="result.k8sNamespace[0].fluxcdImageUpdateAutomation[0]"
       />
    </div>
    <div class="col-md-6">
      <fluxcdImageUpdateAutomationStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdImageUpdateAutomation[0]!=undefined && result.k8sNamespace[0].fluxcdImageUpdateAutomation[0]!=null"
        :model="result.k8sNamespace[0].fluxcdImageUpdateAutomation[0]"
       />
    </div>
    <div class="col-md-12">
      <fluxcdImageUpdateAutomationEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdImageUpdateAutomation[0]!=undefined && result.k8sNamespace[0].fluxcdImageUpdateAutomation[0]!=null"
        :model="result.k8sNamespace[0].fluxcdImageUpdateAutomation[0]"
       />
    </div>
  </div>
</template>

