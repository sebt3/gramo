<script setup lang="ts">
import k8sCSIStorageCapacityQuery from '@/queries/k8s/CSIStorageCapacity.details.graphql'
import CSIStorageCapacityDelete from '@/queries/k8s/CSIStorageCapacity.delete.graphql'
import k8sCSIStorageCapacityMeta from '@/components/k8s/CSIStorageCapacityMeta.vue';
import k8sCSIStorageCapacityView from '@/components/k8s/CSIStorageCapacityView.vue';
import { useQuery, useMutation, useCSIStorageCapacity, CSIStorageCapacityReadExcludes } from '../../../libs/k8s/CSIStorageCapacity.js'
const { onErrorHandler, notifySuccess, notifyError, onNotCSIStorageCapacityFound, navigation, setNamespacedItemFromRoute } = useCSIStorageCapacity();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sCSIStorageCapacityQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": CSIStorageCapacityReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotCSIStorageCapacityFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(CSIStorageCapacityDelete);
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
    <div class="col-md-3">
      <k8sCSIStorageCapacityMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sCSIStorageCapacity[0]!=undefined && result.k8sNamespace[0].k8sCSIStorageCapacity[0]!=null"
        :model="result.k8sNamespace[0].k8sCSIStorageCapacity[0]"
       />
    </div>
    <div class="col-md-12">
      <k8sCSIStorageCapacityView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sCSIStorageCapacity[0]!=undefined && result.k8sNamespace[0].k8sCSIStorageCapacity[0]!=null"
        :model="result.k8sNamespace[0].k8sCSIStorageCapacity[0]"
        />
    </div>
  </div>
</template>
