<script setup lang="ts">
import k8sVolumeAttachmentQuery from '@/queries/k8s/VolumeAttachment.read.graphql'
import VolumeAttachmentDelete from '@/queries/k8s/VolumeAttachment.delete.graphql'
import k8sVolumeAttachmentList from '@/components/k8s/VolumeAttachmentList.vue';
import { useQuery, useMutation, useVolumeAttachment, VolumeAttachmentListExcludes } from '../../../libs/k8s/VolumeAttachment.js'
const { actionNew, toEdit, actionDelete, pagination, deleteDone, deleteError, onErrorHandler } = useVolumeAttachment();
const { result, refetch, onError } = useQuery(k8sVolumeAttachmentQuery, {
  "obj": {}
}, { pollInterval: 2000 });
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(VolumeAttachmentDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <k8sVolumeAttachmentList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sVolumeAttachment'] !== undefined"
    :model="result.k8sVolumeAttachment"
  />
</template>