<script setup lang="ts">
import projectcalicoIPPoolQuery from '@/queries/projectcalico/IPPool.read.graphql'
import IPPoolDelete from '@/queries/projectcalico/IPPool.delete.graphql'
import projectcalicoIPPoolList from '@/components/projectcalico/IPPoolList.vue';
import { useQuery, useMutation, useIPPool, IPPoolListExcludes } from '../../../libs/projectcalico/IPPool.js'
const { actionNew, toEdit, actionDelete, pagination, deleteDone, deleteError, onErrorHandler } = useIPPool();
const { result, refetch, onError } = useQuery(projectcalicoIPPoolQuery, {
  "obj": {}
}, { pollInterval: 2000 });
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(IPPoolDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <projectcalicoIPPoolList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['projectcalicoIPPool'] !== undefined"
    :model="result.projectcalicoIPPool"
  />
</template>