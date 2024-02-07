<script setup lang="ts">
import k8upPreBackupPodQuery from '@/queries/k8up/PreBackupPod.read.graphql'
import PreBackupPodDelete from '@/queries/k8up/PreBackupPod.delete.graphql'
import k8upPreBackupPodList from '@/components/k8up/PreBackupPodList.vue';
import { useQuery, useMutation, usePreBackupPod, PreBackupPodListExcludes } from '../../../libs/k8up/PreBackupPod.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = usePreBackupPod();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(k8upPreBackupPodQuery, {
  "obj": {
    "filters": [],
    "excludes": PreBackupPodListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(PreBackupPodDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <k8upPreBackupPodList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.k8upPreBackupPod).flat()"
  />
</template>