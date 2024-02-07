<script setup lang="ts">
import oracleInnoDBClusterQuery from '@/queries/oracle/InnoDBCluster.read.graphql'
import InnoDBClusterDelete from '@/queries/oracle/InnoDBCluster.delete.graphql'
import oracleInnoDBClusterList from '@/components/oracle/InnoDBClusterList.vue';
import { useQuery, useMutation, useInnoDBCluster, InnoDBClusterListExcludes } from '../../../libs/oracle/InnoDBCluster.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useInnoDBCluster();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(oracleInnoDBClusterQuery, {
  "obj": {
    "filters": [],
    "excludes": InnoDBClusterListExcludes
  },
  "namespace": {
    "filters": isNamespaced()?[
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentNamespace
      }
    ]:[]
  }
}, { pollInterval: 2000 });
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(InnoDBClusterDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <oracleInnoDBClusterList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.oracleInnoDBCluster).flat()"
  />
</template>