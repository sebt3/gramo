<script setup lang="ts">
import k8sPersistentVolumeClaimQuery from '@/queries/k8s/PersistentVolumeClaim.read.graphql'
import PersistentVolumeClaimDelete from '@/queries/k8s/PersistentVolumeClaim.delete.graphql'
import k8sPersistentVolumeClaimList from '@/components/k8s/PersistentVolumeClaimList.vue';
import { useQuery, useMutation, usePersistentVolumeClaim, PersistentVolumeClaimListExcludes } from '../../../libs/k8s/PersistentVolumeClaim.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = usePersistentVolumeClaim();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(k8sPersistentVolumeClaimQuery, {
  "obj": {
    "filters": [],
    "excludes": PersistentVolumeClaimListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(PersistentVolumeClaimDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <k8sPersistentVolumeClaimList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.k8sPersistentVolumeClaim).flat()"
  />
</template>