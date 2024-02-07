<script setup lang="ts">
import k8sClusterRoleQuery from '@/queries/k8s/ClusterRole.read.graphql'
import ClusterRoleDelete from '@/queries/k8s/ClusterRole.delete.graphql'
import k8sClusterRoleList from '@/components/k8s/ClusterRoleList.vue';
import { useQuery, useMutation, useClusterRole, ClusterRoleListExcludes } from '../../../libs/k8s/ClusterRole.js'
const { actionNew, toEdit, actionDelete, pagination, deleteDone, deleteError, onErrorHandler } = useClusterRole();
const { result, refetch, onError } = useQuery(k8sClusterRoleQuery, {
  "obj": {}
}, { pollInterval: 2000 });
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ClusterRoleDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <k8sClusterRoleList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sClusterRole'] !== undefined"
    :model="result.k8sClusterRole"
  />
</template>