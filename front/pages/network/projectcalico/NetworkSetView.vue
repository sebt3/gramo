<script setup lang="ts">
import projectcalicoNetworkSetQuery from '@/queries/projectcalico/NetworkSet.details.graphql'
import NetworkSetDelete from '@/queries/projectcalico/NetworkSet.delete.graphql'
import projectcalicoNetworkSetMeta from '@/components/projectcalico/NetworkSetMeta.vue';
import projectcalicoNetworkSetView from '@/components/projectcalico/NetworkSetView.vue';
import { useQuery, useMutation, useNetworkSet, NetworkSetReadExcludes } from '../../../libs/projectcalico/NetworkSet.js'
const { onErrorHandler, notifySuccess, notifyError, onNotNetworkSetFound, navigation, setNamespacedItemFromRoute } = useNetworkSet();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoNetworkSetQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": NetworkSetReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotNetworkSetFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(NetworkSetDelete);
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
      <projectcalicoNetworkSetMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].projectcalicoNetworkSet[0]!=undefined && result.k8sNamespace[0].projectcalicoNetworkSet[0]!=null"
        :model="result.k8sNamespace[0].projectcalicoNetworkSet[0]"
       />
    </div>
    <div class="col-md-12">
      <projectcalicoNetworkSetView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].projectcalicoNetworkSet[0]!=undefined && result.k8sNamespace[0].projectcalicoNetworkSet[0]!=null"
        :model="result.k8sNamespace[0].projectcalicoNetworkSet[0]"
        />
    </div>
  </div>
</template>
