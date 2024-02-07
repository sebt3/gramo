<script setup lang="ts">
import projectcalicoIPAMBlockQuery from '@/queries/projectcalico/IPAMBlock.read.graphql'
import IPAMBlockDelete from '@/queries/projectcalico/IPAMBlock.delete.graphql'
import projectcalicoIPAMBlockList from '@/components/projectcalico/IPAMBlockList.vue';
import { useQuery, useMutation, useIPAMBlock, IPAMBlockListExcludes } from '../../../libs/projectcalico/IPAMBlock.js'
const { actionNew, toEdit, actionDelete, pagination, deleteDone, deleteError, onErrorHandler } = useIPAMBlock();
const { result, refetch, onError } = useQuery(projectcalicoIPAMBlockQuery, {
  "obj": {}
}, { pollInterval: 2000 });
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(IPAMBlockDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <projectcalicoIPAMBlockList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['projectcalicoIPAMBlock'] !== undefined"
    :model="result.projectcalicoIPAMBlock"
  />
</template>