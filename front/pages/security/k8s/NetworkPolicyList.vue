<script setup lang="ts">
import k8sNetworkPolicyQuery from '@/queries/k8s/NetworkPolicy.read.graphql'
import NetworkPolicyDelete from '@/queries/k8s/NetworkPolicy.delete.graphql'
import k8sNetworkPolicyList from '@/components/k8s/NetworkPolicyList.vue';
import { useQuery, useMutation, useNetworkPolicy, NetworkPolicyListExcludes } from '../../../libs/k8s/NetworkPolicy.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useNetworkPolicy();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(k8sNetworkPolicyQuery, {
  "obj": {
    "filters": [],
    "excludes": NetworkPolicyListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(NetworkPolicyDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <k8sNetworkPolicyList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.k8sNetworkPolicy).flat()"
  />
</template>