<script setup lang="ts">
import rabbitmqRabbitmqClusterQuery from '@/queries/rabbitmq/RabbitmqCluster.read.graphql'
import RabbitmqClusterDelete from '@/queries/rabbitmq/RabbitmqCluster.delete.graphql'
import rabbitmqRabbitmqClusterList from '@/components/rabbitmq/RabbitmqClusterList.vue';
import { useQuery, useMutation, useRabbitmqCluster, RabbitmqClusterListExcludes } from '../../../libs/rabbitmq/RabbitmqCluster.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useRabbitmqCluster();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(rabbitmqRabbitmqClusterQuery, {
  "obj": {
    "filters": [],
    "excludes": RabbitmqClusterListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(RabbitmqClusterDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <rabbitmqRabbitmqClusterList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.rabbitmqRabbitmqCluster).flat()"
  />
</template>