<script setup lang="ts">
import zalandoClusterKopfPeeringQuery from '@/queries/zalando/ClusterKopfPeering.read.graphql'
import ClusterKopfPeeringDelete from '@/queries/zalando/ClusterKopfPeering.delete.graphql'
import zalandoClusterKopfPeeringList from '@/components/zalando/ClusterKopfPeeringList.vue';
import { useQuery, useMutation, useClusterKopfPeering, ClusterKopfPeeringListExcludes } from '../../../libs/zalando/ClusterKopfPeering.js'
const { actionNew, toEdit, actionDelete, pagination, deleteDone, deleteError, onErrorHandler } = useClusterKopfPeering();
const { result, refetch, onError } = useQuery(zalandoClusterKopfPeeringQuery, {
  "obj": {}
}, { pollInterval: 2000 });
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ClusterKopfPeeringDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <zalandoClusterKopfPeeringList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['zalandoClusterKopfPeering'] !== undefined"
    :model="result.zalandoClusterKopfPeering"
  />
</template>