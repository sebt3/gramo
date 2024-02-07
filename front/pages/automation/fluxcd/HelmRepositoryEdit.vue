<script setup lang="ts">
import fluxcdHelmRepositoryQuery from '@/queries/fluxcd/HelmRepository.read.graphql'
import HelmRepositoryEdit from '@/queries/fluxcd/HelmRepository.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import fluxcdHelmRepositoryMeta from '@/components/fluxcd/HelmRepositoryMeta.vue';
import fluxcdHelmRepositoryEdit from '@/components/fluxcd/HelmRepositoryEdit.vue';
import fluxcdHelmRepositoryStatus from '@/components/fluxcd/HelmRepositoryStatus.vue';
import { useQuery, useMutation, sanitizeData, useHelmRepository, HelmRepositorySimpleExcludes } from '../../../libs/fluxcd/HelmRepository.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotHelmRepositoryFound, navigation, editor, setNamespacedItemFromRoute } = useHelmRepository();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(fluxcdHelmRepositoryQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": HelmRepositorySimpleExcludes
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
const { mutate: patchHelmRepository, onDone: onPatchHelmRepository, onError: onPatchError } = useMutation(HelmRepositoryEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchHelmRepository({
    "name": result.k8sNamespace[0].fluxcdHelmRepository[0].metadata.name,
    "namespace": result.k8sNamespace[0].fluxcdHelmRepository[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotHelmRepositoryFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].fluxcdHelmRepository[0])});onPatchHelmRepository(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <fluxcdHelmRepositoryMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdHelmRepository[0]!=undefined && result.k8sNamespace[0].fluxcdHelmRepository[0]!=null"
        :model="result.k8sNamespace[0].fluxcdHelmRepository[0]"
       />
    </div>
    <div class="col-md-6">
      <fluxcdHelmRepositoryStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdHelmRepository[0]!=undefined && result.k8sNamespace[0].fluxcdHelmRepository[0]!=null"
        :model="result.k8sNamespace[0].fluxcdHelmRepository[0]"
       />
    </div>
    <div class="col-md-12">
      <fluxcdHelmRepositoryEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdHelmRepository[0]!=undefined && result.k8sNamespace[0].fluxcdHelmRepository[0]!=null"
        :model="result.k8sNamespace[0].fluxcdHelmRepository[0]"
       />
    </div>
  </div>
</template>

