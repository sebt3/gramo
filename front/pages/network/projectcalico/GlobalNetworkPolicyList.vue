<script setup lang="ts">
import projectcalicoGlobalNetworkPolicyQuery from '@/queries/projectcalico/GlobalNetworkPolicy.read.graphql'
import GlobalNetworkPolicyDelete from '@/queries/projectcalico/GlobalNetworkPolicy.delete.graphql'
import projectcalicoGlobalNetworkPolicyList from '@/components/projectcalico/GlobalNetworkPolicyList.vue';
import { useQuery, useMutation, useGlobalNetworkPolicy, GlobalNetworkPolicyListExcludes } from '../../../libs/projectcalico/GlobalNetworkPolicy.js'
const { actionNew, toEdit, actionDelete, pagination, deleteDone, deleteError, onErrorHandler } = useGlobalNetworkPolicy();
const { result, refetch, onError } = useQuery(projectcalicoGlobalNetworkPolicyQuery, {
  "obj": {}
}, { pollInterval: 2000 });
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(GlobalNetworkPolicyDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <projectcalicoGlobalNetworkPolicyList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['projectcalicoGlobalNetworkPolicy'] !== undefined"
    :model="result.projectcalicoGlobalNetworkPolicy"
  />
</template>