<script setup lang="ts">
import fluxcdOCIRepositoryQuery from '@/queries/fluxcd/OCIRepository.read.graphql'
import OCIRepositoryEdit from '@/queries/fluxcd/OCIRepository.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import fluxcdOCIRepositoryMeta from '@/components/fluxcd/OCIRepositoryMeta.vue';
import fluxcdOCIRepositoryEdit from '@/components/fluxcd/OCIRepositoryEdit.vue';
import fluxcdOCIRepositoryStatus from '@/components/fluxcd/OCIRepositoryStatus.vue';
import { useQuery, useMutation, sanitizeData, useOCIRepository, OCIRepositorySimpleExcludes } from '../../../libs/fluxcd/OCIRepository.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotOCIRepositoryFound, navigation, editor, setNamespacedItemFromRoute } = useOCIRepository();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(fluxcdOCIRepositoryQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": OCIRepositorySimpleExcludes
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
const { mutate: patchOCIRepository, onDone: onPatchOCIRepository, onError: onPatchError } = useMutation(OCIRepositoryEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchOCIRepository({
    "name": result.k8sNamespace[0].fluxcdOCIRepository[0].metadata.name,
    "namespace": result.k8sNamespace[0].fluxcdOCIRepository[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotOCIRepositoryFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].fluxcdOCIRepository[0])});onPatchOCIRepository(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <fluxcdOCIRepositoryMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdOCIRepository[0]!=undefined && result.k8sNamespace[0].fluxcdOCIRepository[0]!=null"
        :model="result.k8sNamespace[0].fluxcdOCIRepository[0]"
       />
    </div>
    <div class="col-md-6">
      <fluxcdOCIRepositoryStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdOCIRepository[0]!=undefined && result.k8sNamespace[0].fluxcdOCIRepository[0]!=null"
        :model="result.k8sNamespace[0].fluxcdOCIRepository[0]"
       />
    </div>
    <div class="col-md-12">
      <fluxcdOCIRepositoryEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdOCIRepository[0]!=undefined && result.k8sNamespace[0].fluxcdOCIRepository[0]!=null"
        :model="result.k8sNamespace[0].fluxcdOCIRepository[0]"
       />
    </div>
  </div>
</template>

