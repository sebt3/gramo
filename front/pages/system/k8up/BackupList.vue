<script setup lang="ts">
import k8upBackupQuery from '@/queries/k8up/Backup.read.graphql'
import BackupDelete from '@/queries/k8up/Backup.delete.graphql'
import k8upBackupList from '@/components/k8up/BackupList.vue';
import { useQuery, useMutation, useBackup, BackupListExcludes } from '../../../libs/k8up/Backup.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useBackup();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(k8upBackupQuery, {
  "obj": {
    "filters": [],
    "excludes": BackupListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(BackupDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <k8upBackupList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.k8upBackup).flat()"
  />
</template>