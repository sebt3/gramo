<script setup lang="ts">
import projectcalicoHostEndpointQuery from '@/queries/projectcalico/HostEndpoint.read.graphql'
import HostEndpointDelete from '@/queries/projectcalico/HostEndpoint.delete.graphql'
import projectcalicoHostEndpointList from '@/components/projectcalico/HostEndpointList.vue';
import { useQuery, useMutation, useHostEndpoint, HostEndpointListExcludes } from '../../../libs/projectcalico/HostEndpoint.js'
const { actionNew, toEdit, actionDelete, pagination, deleteDone, deleteError, onErrorHandler } = useHostEndpoint();
const { result, refetch, onError } = useQuery(projectcalicoHostEndpointQuery, {
  "obj": {}
}, { pollInterval: 2000 });
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(HostEndpointDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <projectcalicoHostEndpointList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['projectcalicoHostEndpoint'] !== undefined"
    :model="result.projectcalicoHostEndpoint"
  />
</template>