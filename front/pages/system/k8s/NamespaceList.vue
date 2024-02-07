<script setup lang="ts">
import k8sNamespaceQuery from '@/queries/k8s/Namespace.read.graphql'
import NamespaceDelete from '@/queries/k8s/Namespace.delete.graphql'
import k8sNamespaceList from '@/components/k8s/NamespaceList.vue';
import { useQuery, useMutation, useNamespace, NamespaceListExcludes } from '../../../libs/k8s/Namespace.js'
const { actionNew, toEdit, actionDelete, pagination, deleteDone, deleteError, onErrorHandler } = useNamespace();
const { result, refetch, onError } = useQuery(k8sNamespaceQuery, {
  "obj": {}
}, { pollInterval: 2000 });
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(NamespaceDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <k8sNamespaceList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace"
  />
</template>