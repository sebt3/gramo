<script setup lang="ts">
import projectcalicoNetworkPolicyQuery from '@/queries/projectcalico/NetworkPolicy.details.graphql'
import NetworkPolicyDelete from '@/queries/projectcalico/NetworkPolicy.delete.graphql'
import projectcalicoNetworkPolicyMeta from '@/components/projectcalico/NetworkPolicyMeta.vue';
import projectcalicoNetworkPolicyView from '@/components/projectcalico/NetworkPolicyView.vue';
import { useQuery, useMutation, useNetworkPolicy, NetworkPolicyReadExcludes } from '../../../libs/projectcalico/NetworkPolicy.js'
const { onErrorHandler, notifySuccess, notifyError, onNotNetworkPolicyFound, navigation, setNamespacedItemFromRoute } = useNetworkPolicy();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoNetworkPolicyQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": NetworkPolicyReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotNetworkPolicyFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(NetworkPolicyDelete);
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
      <projectcalicoNetworkPolicyMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].projectcalicoNetworkPolicy[0]!=undefined && result.k8sNamespace[0].projectcalicoNetworkPolicy[0]!=null"
        :model="result.k8sNamespace[0].projectcalicoNetworkPolicy[0]"
       />
    </div>
    <div class="col-md-12">
      <projectcalicoNetworkPolicyView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].projectcalicoNetworkPolicy[0]!=undefined && result.k8sNamespace[0].projectcalicoNetworkPolicy[0]!=null"
        :model="result.k8sNamespace[0].projectcalicoNetworkPolicy[0]"
        />
    </div>
  </div>
</template>
