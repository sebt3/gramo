<script setup lang="ts">
import mariadbBackupQuery from '@/queries/mariadb/Backup.read.graphql'
import BackupDelete from '@/queries/mariadb/Backup.delete.graphql'
import mariadbBackupList from '@/components/mariadb/BackupList.vue';
import { useQuery, useMutation, useBackup, BackupListExcludes } from '../../../libs/mariadb/Backup.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useBackup();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(mariadbBackupQuery, {
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
  <mariadbBackupList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.mariadbBackup).flat()"
  />
</template>