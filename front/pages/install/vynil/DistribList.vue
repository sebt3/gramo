<script setup lang="ts">
import vynilDistribQuery from '@/queries/vynil/Distrib.read.graphql'
import DistribDelete from '@/queries/vynil/Distrib.delete.graphql'
import vynilDistribList from '@/components/vynil/DistribList.vue';
import { useQuery, useMutation, useDistrib, DistribListExcludes } from '../../../libs/vynil/Distrib.js'
const { actionNew, toEdit, actionDelete, pagination, deleteDone, deleteError, onErrorHandler } = useDistrib();
const { result, refetch, onError } = useQuery(vynilDistribQuery, {
  "obj": {}
}, { pollInterval: 2000 });
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(DistribDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <vynilDistribList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['vynilDistrib'] !== undefined"
    :model="result.vynilDistrib"
  />
</template>