<script setup lang="ts">
import k8sReplicationControllerQuery from '@/queries/k8s/ReplicationController.details.graphql'
import ReplicationControllerDelete from '@/queries/k8s/ReplicationController.delete.graphql'
import k8sReplicationControllerMeta from '@/components/k8s/ReplicationControllerMeta.vue';
import k8sReplicationControllerView from '@/components/k8s/ReplicationControllerView.vue';
import k8sReplicationControllerStatus from '@/components/k8s/ReplicationControllerStatus.vue';
import { useQuery, useMutation, useReplicationController, ReplicationControllerReadExcludes } from '../../../libs/k8s/ReplicationController.js'
const { onErrorHandler, notifySuccess, notifyError, onNotReplicationControllerFound, navigation, setNamespacedItemFromRoute } = useReplicationController();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sReplicationControllerQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ReplicationControllerReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotReplicationControllerFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ReplicationControllerDelete);
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
      <k8sReplicationControllerMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sReplicationController[0]!=undefined && result.k8sNamespace[0].k8sReplicationController[0]!=null"
        :model="result.k8sNamespace[0].k8sReplicationController[0]"
       />
    </div>
    <div class="col-md-6">
      <k8sReplicationControllerStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sReplicationController[0]!=undefined && result.k8sNamespace[0].k8sReplicationController[0]!=null"
        :model="result.k8sNamespace[0].k8sReplicationController[0]"
       />
    </div>
    <div class="col-md-12">
      <k8sReplicationControllerView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sReplicationController[0]!=undefined && result.k8sNamespace[0].k8sReplicationController[0]!=null"
        :model="result.k8sNamespace[0].k8sReplicationController[0]"
        />
    </div>
  </div>
</template>
