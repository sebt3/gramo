<script setup lang="ts">
import cnpgClusterQuery from '@/queries/cnpg/Cluster.read.graphql'
import ClusterDelete from '@/queries/cnpg/Cluster.delete.graphql'
import cnpgClusterList from '@/components/cnpg/ClusterList.vue';
import { useQuery, useMutation, useCluster, ClusterListExcludes } from '../../../libs/cnpg/Cluster.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useCluster();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(cnpgClusterQuery, {
  "obj": {
    "filters": [],
    "excludes": ClusterListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ClusterDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <cnpgClusterList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.cnpgCluster).flat()"
  />
</template>