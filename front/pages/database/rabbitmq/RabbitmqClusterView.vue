<script setup lang="ts">
import rabbitmqRabbitmqClusterQuery from '@/queries/rabbitmq/RabbitmqCluster.details.graphql'
import RabbitmqClusterDelete from '@/queries/rabbitmq/RabbitmqCluster.delete.graphql'
import rabbitmqRabbitmqClusterMeta from '@/components/rabbitmq/RabbitmqClusterMeta.vue';
import rabbitmqRabbitmqClusterView from '@/components/rabbitmq/RabbitmqClusterView.vue';
import rabbitmqRabbitmqClusterStatus from '@/components/rabbitmq/RabbitmqClusterStatus.vue';
import { useQuery, useMutation, useRabbitmqCluster, RabbitmqClusterReadExcludes } from '../../../libs/rabbitmq/RabbitmqCluster.js'
const { onErrorHandler, notifySuccess, notifyError, onNotRabbitmqClusterFound, navigation, setNamespacedItemFromRoute } = useRabbitmqCluster();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(rabbitmqRabbitmqClusterQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": RabbitmqClusterReadExcludes
  },
  "namespace": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentNamespace
      }
    ]
  }
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotRabbitmqClusterFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(RabbitmqClusterDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <rabbitmqRabbitmqClusterMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].rabbitmqRabbitmqCluster[0]!=undefined && result.k8sNamespace[0].rabbitmqRabbitmqCluster[0]!=null"
        :model="result.k8sNamespace[0].rabbitmqRabbitmqCluster[0]"
       />
    </div>
    <div class="col-md-6">
      <rabbitmqRabbitmqClusterStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].rabbitmqRabbitmqCluster[0]!=undefined && result.k8sNamespace[0].rabbitmqRabbitmqCluster[0]!=null"
        :model="result.k8sNamespace[0].rabbitmqRabbitmqCluster[0]"
       />
    </div>
    <div class="col-md-12">
      <rabbitmqRabbitmqClusterView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].rabbitmqRabbitmqCluster[0]!=undefined && result.k8sNamespace[0].rabbitmqRabbitmqCluster[0]!=null"
        :model="result.k8sNamespace[0].rabbitmqRabbitmqCluster[0]"
        />
    </div>
  </div>
</template>
