<script setup lang="ts">
import fluxcdHelmReleaseQuery from '@/queries/fluxcd/HelmRelease.read.graphql'
import HelmReleaseEdit from '@/queries/fluxcd/HelmRelease.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import fluxcdHelmReleaseMeta from '@/components/fluxcd/HelmReleaseMeta.vue';
import fluxcdHelmReleaseEdit from '@/components/fluxcd/HelmReleaseEdit.vue';
import fluxcdHelmReleaseStatus from '@/components/fluxcd/HelmReleaseStatus.vue';
import { useQuery, useMutation, sanitizeData, useHelmRelease, HelmReleaseSimpleExcludes } from '../../../libs/fluxcd/HelmRelease.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotHelmReleaseFound, navigation, editor, setNamespacedItemFromRoute } = useHelmRelease();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(fluxcdHelmReleaseQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": HelmReleaseSimpleExcludes
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
const { mutate: patchHelmRelease, onDone: onPatchHelmRelease, onError: onPatchError } = useMutation(HelmReleaseEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchHelmRelease({
    "name": result.k8sNamespace[0].fluxcdHelmRelease[0].metadata.name,
    "namespace": result.k8sNamespace[0].fluxcdHelmRelease[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotHelmReleaseFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].fluxcdHelmRelease[0])});onPatchHelmRelease(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <fluxcdHelmReleaseMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdHelmRelease[0]!=undefined && result.k8sNamespace[0].fluxcdHelmRelease[0]!=null"
        :model="result.k8sNamespace[0].fluxcdHelmRelease[0]"
       />
    </div>
    <div class="col-md-6">
      <fluxcdHelmReleaseStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdHelmRelease[0]!=undefined && result.k8sNamespace[0].fluxcdHelmRelease[0]!=null"
        :model="result.k8sNamespace[0].fluxcdHelmRelease[0]"
       />
    </div>
    <div class="col-md-12">
      <fluxcdHelmReleaseEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdHelmRelease[0]!=undefined && result.k8sNamespace[0].fluxcdHelmRelease[0]!=null"
        :model="result.k8sNamespace[0].fluxcdHelmRelease[0]"
       />
    </div>
  </div>
</template>

