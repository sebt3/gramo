<script setup lang="ts">
import projectcalicoIPAMHandleQuery from '@/queries/projectcalico/IPAMHandle.read.graphql'
import IPAMHandleDelete from '@/queries/projectcalico/IPAMHandle.delete.graphql'
import projectcalicoIPAMHandleList from '@/components/projectcalico/IPAMHandleList.vue';
import { useQuery, useMutation, useIPAMHandle, IPAMHandleListExcludes } from '../../../libs/projectcalico/IPAMHandle.js'
const { actionNew, toEdit, actionDelete, pagination, deleteDone, deleteError, onErrorHandler } = useIPAMHandle();
const { result, refetch, onError } = useQuery(projectcalicoIPAMHandleQuery, {
  "obj": {}
}, { pollInterval: 2000 });
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(IPAMHandleDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <projectcalicoIPAMHandleList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['projectcalicoIPAMHandle'] !== undefined"
    :model="result.projectcalicoIPAMHandle"
  />
</template>