<script setup lang="ts">
import k8sNodeQuery from '@/queries/k8s/Node.read.graphql'
import NodeDelete from '@/queries/k8s/Node.delete.graphql'
import k8sNodeList from '@/components/k8s/NodeList.vue';
import { useQuery, useMutation, useNode, NodeListExcludes } from '../../../libs/k8s/Node.js'
const { actionNew, toEdit, actionDelete, pagination, deleteDone, deleteError, onErrorHandler } = useNode();
const { result, refetch, onError } = useQuery(k8sNodeQuery, {
  "obj": {}
}, { pollInterval: 2000 });
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(NodeDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <k8sNodeList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNode'] !== undefined"
    :model="result.k8sNode"
  />
</template>