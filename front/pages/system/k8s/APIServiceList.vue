<script setup lang="ts">
import k8sAPIServiceQuery from '@/queries/k8s/APIService.read.graphql'
import APIServiceDelete from '@/queries/k8s/APIService.delete.graphql'
import k8sAPIServiceList from '@/components/k8s/APIServiceList.vue';
import { useQuery, useMutation, useAPIService, APIServiceListExcludes } from '../../../libs/k8s/APIService.js'
const { actionNew, toEdit, actionDelete, pagination, deleteDone, deleteError, onErrorHandler } = useAPIService();
const { result, refetch, onError } = useQuery(k8sAPIServiceQuery, {
  "obj": {}
}, { pollInterval: 2000 });
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(APIServiceDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <k8sAPIServiceList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sAPIService'] !== undefined"
    :model="result.k8sAPIService"
  />
</template>