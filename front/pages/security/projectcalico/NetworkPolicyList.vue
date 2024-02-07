<script setup lang="ts">
import projectcalicoNetworkPolicyQuery from '@/queries/projectcalico/NetworkPolicy.read.graphql'
import NetworkPolicyDelete from '@/queries/projectcalico/NetworkPolicy.delete.graphql'
import projectcalicoNetworkPolicyList from '@/components/projectcalico/NetworkPolicyList.vue';
import { useQuery, useMutation, useNetworkPolicy, NetworkPolicyListExcludes } from '../../../libs/projectcalico/NetworkPolicy.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useNetworkPolicy();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(projectcalicoNetworkPolicyQuery, {
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
  <projectcalicoNetworkPolicyList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.projectcalicoNetworkPolicy).flat()"
  />
</template>