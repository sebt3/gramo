<script setup lang="ts">
import k8sCustomResourceDefinitionQuery from '@/queries/k8s/CustomResourceDefinition.read.graphql'
import CustomResourceDefinitionDelete from '@/queries/k8s/CustomResourceDefinition.delete.graphql'
import k8sCustomResourceDefinitionList from '@/components/k8s/CustomResourceDefinitionList.vue';
import { useQuery, useMutation, useCustomResourceDefinition, CustomResourceDefinitionListExcludes } from '../../../libs/k8s/CustomResourceDefinition.js'
const { actionNew, toEdit, actionDelete, pagination, deleteDone, deleteError, onErrorHandler } = useCustomResourceDefinition();
const { result, refetch, onError } = useQuery(k8sCustomResourceDefinitionQuery, {
  "obj": {}
}, { pollInterval: 2000 });
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(CustomResourceDefinitionDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <k8sCustomResourceDefinitionList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sCustomResourceDefinition'] !== undefined"
    :model="result.k8sCustomResourceDefinition"
  />
</template>