<script setup lang="ts">
import projectcalicoCalicoNodeStatusQuery from '@/queries/projectcalico/CalicoNodeStatus.read.graphql'
import CalicoNodeStatusDelete from '@/queries/projectcalico/CalicoNodeStatus.delete.graphql'
import projectcalicoCalicoNodeStatusList from '@/components/projectcalico/CalicoNodeStatusList.vue';
import { useQuery, useMutation, useCalicoNodeStatus, CalicoNodeStatusListExcludes } from '../../../libs/projectcalico/CalicoNodeStatus.js'
const { actionNew, toEdit, actionDelete, pagination, deleteDone, deleteError, onErrorHandler } = useCalicoNodeStatus();
const { result, refetch, onError } = useQuery(projectcalicoCalicoNodeStatusQuery, {
  "obj": {}
}, { pollInterval: 2000 });
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(CalicoNodeStatusDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <projectcalicoCalicoNodeStatusList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['projectcalicoCalicoNodeStatus'] !== undefined"
    :model="result.projectcalicoCalicoNodeStatus"
  />
</template>