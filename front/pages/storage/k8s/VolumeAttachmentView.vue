<script setup lang="ts">
import k8sVolumeAttachmentQuery from '@/queries/k8s/VolumeAttachment.details.graphql'
import VolumeAttachmentDelete from '@/queries/k8s/VolumeAttachment.delete.graphql'
import k8sVolumeAttachmentMeta from '@/components/k8s/VolumeAttachmentMeta.vue';
import k8sVolumeAttachmentView from '@/components/k8s/VolumeAttachmentView.vue';
import k8sVolumeAttachmentStatus from '@/components/k8s/VolumeAttachmentStatus.vue';
import { useQuery, useMutation, useVolumeAttachment, VolumeAttachmentReadExcludes } from '../../../libs/k8s/VolumeAttachment.js'
const { onErrorHandler, notifySuccess, notifyError, onNotVolumeAttachmentFound, navigation, setItemFromRoute } = useVolumeAttachment();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sVolumeAttachmentQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": VolumeAttachmentReadExcludes
  },
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotVolumeAttachmentFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(VolumeAttachmentDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
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
      <k8sVolumeAttachmentView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sVolumeAttachment[0]!=undefined && result.k8sVolumeAttachment[0]!=null"
        :model="result.k8sVolumeAttachment[0]"
        />
    </div>
  </div>
</template>
