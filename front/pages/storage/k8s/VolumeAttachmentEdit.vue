<script setup lang="ts">
import k8sVolumeAttachmentQuery from '@/queries/k8s/VolumeAttachment.read.graphql'
import VolumeAttachmentEdit from '@/queries/k8s/VolumeAttachment.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import k8sVolumeAttachmentMeta from '@/components/k8s/VolumeAttachmentMeta.vue';
import k8sVolumeAttachmentEdit from '@/components/k8s/VolumeAttachmentEdit.vue';
import k8sVolumeAttachmentStatus from '@/components/k8s/VolumeAttachmentStatus.vue';
import { useQuery, useMutation, sanitizeData, useVolumeAttachment, VolumeAttachmentSimpleExcludes } from '../../../libs/k8s/VolumeAttachment.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotVolumeAttachmentFound, navigation, editor, setItemFromRoute } = useVolumeAttachment();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sVolumeAttachmentQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": VolumeAttachmentSimpleExcludes
  },
});
const { mutate: patchVolumeAttachment, onDone: onPatchVolumeAttachment, onError: onPatchError } = useMutation(VolumeAttachmentEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchVolumeAttachment({
    "name": result.k8sVolumeAttachment[0].metadata.name,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotVolumeAttachmentFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sVolumeAttachment[0])});onPatchVolumeAttachment(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sVolumeAttachmentMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sVolumeAttachment[0]!=undefined && result.k8sVolumeAttachment[0]!=null"
        :model="result.k8sVolumeAttachment[0]"
       />
    </div>
    <div class="col-md-6">
      <k8sVolumeAttachmentStatus
        v-if="!loading && result!=undefined && result.k8sVolumeAttachment[0]!=undefined && result.k8sVolumeAttachment[0]!=null"
        :model="result.k8sVolumeAttachment[0]"
       />
    </div>
    <div class="col-md-12">
      <k8sVolumeAttachmentEdit
        v-if="!loading && result!=undefined && result.k8sVolumeAttachment[0]!=undefined && result.k8sVolumeAttachment[0]!=null"
        :model="result.k8sVolumeAttachment[0]"
       />
    </div>
  </div>
</template>

