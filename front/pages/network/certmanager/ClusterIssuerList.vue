<script setup lang="ts">
import certmanagerClusterIssuerQuery from '@/queries/certmanager/ClusterIssuer.read.graphql'
import ClusterIssuerDelete from '@/queries/certmanager/ClusterIssuer.delete.graphql'
import certmanagerClusterIssuerList from '@/components/certmanager/ClusterIssuerList.vue';
import { useQuery, useMutation, useClusterIssuer, ClusterIssuerListExcludes } from '../../../libs/certmanager/ClusterIssuer.js'
const { actionNew, toEdit, actionDelete, pagination, deleteDone, deleteError, onErrorHandler } = useClusterIssuer();
const { result, refetch, onError } = useQuery(certmanagerClusterIssuerQuery, {
  "obj": {}
}, { pollInterval: 2000 });
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ClusterIssuerDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <certmanagerClusterIssuerList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['certmanagerClusterIssuer'] !== undefined"
    :model="result.certmanagerClusterIssuer"
  />
</template>