<script setup lang="ts">
import fluxcdImagePolicyQuery from '@/queries/fluxcd/ImagePolicy.read.graphql'
import ImagePolicyEdit from '@/queries/fluxcd/ImagePolicy.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import fluxcdImagePolicyMeta from '@/components/fluxcd/ImagePolicyMeta.vue';
import fluxcdImagePolicyEdit from '@/components/fluxcd/ImagePolicyEdit.vue';
import fluxcdImagePolicyStatus from '@/components/fluxcd/ImagePolicyStatus.vue';
import { useQuery, useMutation, sanitizeData, useImagePolicy, ImagePolicySimpleExcludes } from '../../../libs/fluxcd/ImagePolicy.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotImagePolicyFound, navigation, editor, setNamespacedItemFromRoute } = useImagePolicy();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(fluxcdImagePolicyQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ImagePolicySimpleExcludes
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
const { mutate: patchImagePolicy, onDone: onPatchImagePolicy, onError: onPatchError } = useMutation(ImagePolicyEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchImagePolicy({
    "name": result.k8sNamespace[0].fluxcdImagePolicy[0].metadata.name,
    "namespace": result.k8sNamespace[0].fluxcdImagePolicy[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotImagePolicyFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].fluxcdImagePolicy[0])});onPatchImagePolicy(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <fluxcdImagePolicyMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdImagePolicy[0]!=undefined && result.k8sNamespace[0].fluxcdImagePolicy[0]!=null"
        :model="result.k8sNamespace[0].fluxcdImagePolicy[0]"
       />
    </div>
    <div class="col-md-6">
      <fluxcdImagePolicyStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdImagePolicy[0]!=undefined && result.k8sNamespace[0].fluxcdImagePolicy[0]!=null"
        :model="result.k8sNamespace[0].fluxcdImagePolicy[0]"
       />
    </div>
    <div class="col-md-12">
      <fluxcdImagePolicyEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdImagePolicy[0]!=undefined && result.k8sNamespace[0].fluxcdImagePolicy[0]!=null"
        :model="result.k8sNamespace[0].fluxcdImagePolicy[0]"
       />
    </div>
  </div>
</template>

