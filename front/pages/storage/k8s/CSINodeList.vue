<script setup lang="ts">
import k8sCSINodeQuery from '@/queries/k8s/CSINode.read.graphql'
import CSINodeDelete from '@/queries/k8s/CSINode.delete.graphql'
import k8sCSINodeList from '@/components/k8s/CSINodeList.vue';
import { useQuery, useMutation, useCSINode, CSINodeListExcludes } from '../../../libs/k8s/CSINode.js'
const { actionNew, toEdit, actionDelete, pagination, deleteDone, deleteError, onErrorHandler } = useCSINode();
const { result, refetch, onError } = useQuery(k8sCSINodeQuery, {
  "obj": {}
}, { pollInterval: 2000 });
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(CSINodeDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <k8sCSINodeList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sCSINode'] !== undefined"
    :model="result.k8sCSINode"
  />
</template>