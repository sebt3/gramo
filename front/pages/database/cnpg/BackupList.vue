<script setup lang="ts">
import cnpgBackupQuery from '@/queries/cnpg/Backup.read.graphql'
import BackupDelete from '@/queries/cnpg/Backup.delete.graphql'
import cnpgBackupList from '@/components/cnpg/BackupList.vue';
import { useQuery, useMutation, useBackup, BackupListExcludes } from '../../../libs/cnpg/Backup.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useBackup();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(cnpgBackupQuery, {
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
  <cnpgBackupList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.cnpgBackup).flat()"
  />
</template>