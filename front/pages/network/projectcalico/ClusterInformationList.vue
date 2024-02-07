<script setup lang="ts">
import projectcalicoClusterInformationQuery from '@/queries/projectcalico/ClusterInformation.read.graphql'
import ClusterInformationDelete from '@/queries/projectcalico/ClusterInformation.delete.graphql'
import projectcalicoClusterInformationList from '@/components/projectcalico/ClusterInformationList.vue';
import { useQuery, useMutation, useClusterInformation, ClusterInformationListExcludes } from '../../../libs/projectcalico/ClusterInformation.js'
const { actionNew, toEdit, actionDelete, pagination, deleteDone, deleteError, onErrorHandler } = useClusterInformation();
const { result, refetch, onError } = useQuery(projectcalicoClusterInformationQuery, {
  "obj": {}
}, { pollInterval: 2000 });
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ClusterInformationDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <projectcalicoClusterInformationList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['projectcalicoClusterInformation'] !== undefined"
    :model="result.projectcalicoClusterInformation"
  />
</template>