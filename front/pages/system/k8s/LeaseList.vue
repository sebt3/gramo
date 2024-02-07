<script setup lang="ts">
import k8sLeaseQuery from '@/queries/k8s/Lease.read.graphql'
import LeaseDelete from '@/queries/k8s/Lease.delete.graphql'
import k8sLeaseList from '@/components/k8s/LeaseList.vue';
import { useQuery, useMutation, useLease, LeaseListExcludes } from '../../../libs/k8s/Lease.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useLease();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(k8sLeaseQuery, {
  "obj": {
    "filters": [],
    "excludes": LeaseListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(LeaseDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <k8sLeaseList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.k8sLease).flat()"
  />
</template>