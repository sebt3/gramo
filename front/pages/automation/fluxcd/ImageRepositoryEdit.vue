<script setup lang="ts">
import fluxcdImageRepositoryQuery from '@/queries/fluxcd/ImageRepository.read.graphql'
import ImageRepositoryEdit from '@/queries/fluxcd/ImageRepository.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import fluxcdImageRepositoryMeta from '@/components/fluxcd/ImageRepositoryMeta.vue';
import fluxcdImageRepositoryEdit from '@/components/fluxcd/ImageRepositoryEdit.vue';
import fluxcdImageRepositoryStatus from '@/components/fluxcd/ImageRepositoryStatus.vue';
import { useQuery, useMutation, sanitizeData, useImageRepository, ImageRepositorySimpleExcludes } from '../../../libs/fluxcd/ImageRepository.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotImageRepositoryFound, navigation, editor, setNamespacedItemFromRoute } = useImageRepository();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(fluxcdImageRepositoryQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ImageRepositorySimpleExcludes
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
const { mutate: patchImageRepository, onDone: onPatchImageRepository, onError: onPatchError } = useMutation(ImageRepositoryEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchImageRepository({
    "name": result.k8sNamespace[0].fluxcdImageRepository[0].metadata.name,
    "namespace": result.k8sNamespace[0].fluxcdImageRepository[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotImageRepositoryFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].fluxcdImageRepository[0])});onPatchImageRepository(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <fluxcdImageRepositoryMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdImageRepository[0]!=undefined && result.k8sNamespace[0].fluxcdImageRepository[0]!=null"
        :model="result.k8sNamespace[0].fluxcdImageRepository[0]"
       />
    </div>
    <div class="col-md-6">
      <fluxcdImageRepositoryStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdImageRepository[0]!=undefined && result.k8sNamespace[0].fluxcdImageRepository[0]!=null"
        :model="result.k8sNamespace[0].fluxcdImageRepository[0]"
       />
    </div>
    <div class="col-md-12">
      <fluxcdImageRepositoryEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdImageRepository[0]!=undefined && result.k8sNamespace[0].fluxcdImageRepository[0]!=null"
        :model="result.k8sNamespace[0].fluxcdImageRepository[0]"
       />
    </div>
  </div>
</template>

