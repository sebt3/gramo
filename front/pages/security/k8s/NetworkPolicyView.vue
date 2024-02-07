<script setup lang="ts">
import k8sNetworkPolicyQuery from '@/queries/k8s/NetworkPolicy.details.graphql'
import NetworkPolicyDelete from '@/queries/k8s/NetworkPolicy.delete.graphql'
import k8sNetworkPolicyMeta from '@/components/k8s/NetworkPolicyMeta.vue';
import k8sNetworkPolicyView from '@/components/k8s/NetworkPolicyView.vue';
import k8sNetworkPolicyStatus from '@/components/k8s/NetworkPolicyStatus.vue';
import { useQuery, useMutation, useNetworkPolicy, NetworkPolicyReadExcludes } from '../../../libs/k8s/NetworkPolicy.js'
const { onErrorHandler, notifySuccess, notifyError, onNotNetworkPolicyFound, navigation, setNamespacedItemFromRoute } = useNetworkPolicy();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sNetworkPolicyQuery, {
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
    <div class="col-md-6">
      <k8sNetworkPolicyMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sNetworkPolicy[0]!=undefined && result.k8sNamespace[0].k8sNetworkPolicy[0]!=null"
        :model="result.k8sNamespace[0].k8sNetworkPolicy[0]"
       />
    </div>
    <div class="col-md-6">
      <k8sNetworkPolicyStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sNetworkPolicy[0]!=undefined && result.k8sNamespace[0].k8sNetworkPolicy[0]!=null"
        :model="result.k8sNamespace[0].k8sNetworkPolicy[0]"
       />
    </div>
    <div class="col-md-12">
      <k8sNetworkPolicyView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sNetworkPolicy[0]!=undefined && result.k8sNamespace[0].k8sNetworkPolicy[0]!=null"
        :model="result.k8sNamespace[0].k8sNetworkPolicy[0]"
        />
    </div>
  </div>
</template>
