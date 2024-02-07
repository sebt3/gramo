<script setup lang="ts">
import projectcalicoGlobalNetworkSetQuery from '@/queries/projectcalico/GlobalNetworkSet.read.graphql'
import GlobalNetworkSetDelete from '@/queries/projectcalico/GlobalNetworkSet.delete.graphql'
import projectcalicoGlobalNetworkSetList from '@/components/projectcalico/GlobalNetworkSetList.vue';
import { useQuery, useMutation, useGlobalNetworkSet, GlobalNetworkSetListExcludes } from '../../../libs/projectcalico/GlobalNetworkSet.js'
const { actionNew, toEdit, actionDelete, pagination, deleteDone, deleteError, onErrorHandler } = useGlobalNetworkSet();
const { result, refetch, onError } = useQuery(projectcalicoGlobalNetworkSetQuery, {
  "obj": {}
}, { pollInterval: 2000 });
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(GlobalNetworkSetDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <projectcalicoGlobalNetworkSetList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['projectcalicoGlobalNetworkSet'] !== undefined"
    :model="result.projectcalicoGlobalNetworkSet"
  />
</template>