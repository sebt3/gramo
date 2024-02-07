<script setup lang="ts">
import fluxcdKustomizationQuery from '@/queries/fluxcd/Kustomization.read.graphql'
import KustomizationEdit from '@/queries/fluxcd/Kustomization.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import fluxcdKustomizationMeta from '@/components/fluxcd/KustomizationMeta.vue';
import fluxcdKustomizationEdit from '@/components/fluxcd/KustomizationEdit.vue';
import fluxcdKustomizationStatus from '@/components/fluxcd/KustomizationStatus.vue';
import { useQuery, useMutation, sanitizeData, useKustomization, KustomizationSimpleExcludes } from '../../../libs/fluxcd/Kustomization.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotKustomizationFound, navigation, editor, setNamespacedItemFromRoute } = useKustomization();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(fluxcdKustomizationQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": KustomizationSimpleExcludes
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
const { mutate: patchKustomization, onDone: onPatchKustomization, onError: onPatchError } = useMutation(KustomizationEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchKustomization({
    "name": result.k8sNamespace[0].fluxcdKustomization[0].metadata.name,
    "namespace": result.k8sNamespace[0].fluxcdKustomization[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotKustomizationFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].fluxcdKustomization[0])});onPatchKustomization(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <fluxcdKustomizationMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdKustomization[0]!=undefined && result.k8sNamespace[0].fluxcdKustomization[0]!=null"
        :model="result.k8sNamespace[0].fluxcdKustomization[0]"
       />
    </div>
    <div class="col-md-6">
      <fluxcdKustomizationStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdKustomization[0]!=undefined && result.k8sNamespace[0].fluxcdKustomization[0]!=null"
        :model="result.k8sNamespace[0].fluxcdKustomization[0]"
       />
    </div>
    <div class="col-md-12">
      <fluxcdKustomizationEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdKustomization[0]!=undefined && result.k8sNamespace[0].fluxcdKustomization[0]!=null"
        :model="result.k8sNamespace[0].fluxcdKustomization[0]"
       />
    </div>
  </div>
</template>

