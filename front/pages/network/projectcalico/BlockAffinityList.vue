<script setup lang="ts">
import projectcalicoBlockAffinityQuery from '@/queries/projectcalico/BlockAffinity.read.graphql'
import BlockAffinityDelete from '@/queries/projectcalico/BlockAffinity.delete.graphql'
import projectcalicoBlockAffinityList from '@/components/projectcalico/BlockAffinityList.vue';
import { useQuery, useMutation, useBlockAffinity, BlockAffinityListExcludes } from '../../../libs/projectcalico/BlockAffinity.js'
const { actionNew, toEdit, actionDelete, pagination, deleteDone, deleteError, onErrorHandler } = useBlockAffinity();
const { result, refetch, onError } = useQuery(projectcalicoBlockAffinityQuery, {
  "obj": {}
}, { pollInterval: 2000 });
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(BlockAffinityDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <projectcalicoBlockAffinityList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['projectcalicoBlockAffinity'] !== undefined"
    :model="result.projectcalicoBlockAffinity"
  />
</template>