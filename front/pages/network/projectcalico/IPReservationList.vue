<script setup lang="ts">
import projectcalicoIPReservationQuery from '@/queries/projectcalico/IPReservation.read.graphql'
import IPReservationDelete from '@/queries/projectcalico/IPReservation.delete.graphql'
import projectcalicoIPReservationList from '@/components/projectcalico/IPReservationList.vue';
import { useQuery, useMutation, useIPReservation, IPReservationListExcludes } from '../../../libs/projectcalico/IPReservation.js'
const { actionNew, toEdit, actionDelete, pagination, deleteDone, deleteError, onErrorHandler } = useIPReservation();
const { result, refetch, onError } = useQuery(projectcalicoIPReservationQuery, {
  "obj": {}
}, { pollInterval: 2000 });
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(IPReservationDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <projectcalicoIPReservationList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['projectcalicoIPReservation'] !== undefined"
    :model="result.projectcalicoIPReservation"
  />
</template>