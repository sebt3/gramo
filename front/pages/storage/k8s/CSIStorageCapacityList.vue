<script setup lang="ts">
import k8sCSIStorageCapacityQuery from '@/queries/k8s/CSIStorageCapacity.read.graphql'
import CSIStorageCapacityDelete from '@/queries/k8s/CSIStorageCapacity.delete.graphql'
import k8sCSIStorageCapacityList from '@/components/k8s/CSIStorageCapacityList.vue';
import { useQuery, useMutation, useCSIStorageCapacity, CSIStorageCapacityListExcludes } from '../../../libs/k8s/CSIStorageCapacity.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useCSIStorageCapacity();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(k8sCSIStorageCapacityQuery, {
  "obj": {
    "filters": [],
    "excludes": CSIStorageCapacityListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(CSIStorageCapacityDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <k8sCSIStorageCapacityList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.k8sCSIStorageCapacity).flat()"
  />
</template>