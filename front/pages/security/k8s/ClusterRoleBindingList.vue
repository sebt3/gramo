<script setup lang="ts">
import k8sClusterRoleBindingQuery from '@/queries/k8s/ClusterRoleBinding.read.graphql'
import ClusterRoleBindingDelete from '@/queries/k8s/ClusterRoleBinding.delete.graphql'
import k8sClusterRoleBindingList from '@/components/k8s/ClusterRoleBindingList.vue';
import { useQuery, useMutation, useClusterRoleBinding, ClusterRoleBindingListExcludes } from '../../../libs/k8s/ClusterRoleBinding.js'
const { actionNew, toEdit, actionDelete, pagination, deleteDone, deleteError, onErrorHandler } = useClusterRoleBinding();
const { result, refetch, onError } = useQuery(k8sClusterRoleBindingQuery, {
  "obj": {}
}, { pollInterval: 2000 });
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ClusterRoleBindingDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <k8sClusterRoleBindingList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sClusterRoleBinding'] !== undefined"
    :model="result.k8sClusterRoleBinding"
  />
</template>