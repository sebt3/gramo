<script setup lang="ts">
import cnpgScheduledBackupQuery from '@/queries/cnpg/ScheduledBackup.read.graphql'
import ScheduledBackupDelete from '@/queries/cnpg/ScheduledBackup.delete.graphql'
import cnpgScheduledBackupList from '@/components/cnpg/ScheduledBackupList.vue';
import { useQuery, useMutation, useScheduledBackup, ScheduledBackupListExcludes } from '../../../libs/cnpg/ScheduledBackup.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useScheduledBackup();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(cnpgScheduledBackupQuery, {
  "obj": {
    "filters": [],
    "excludes": ScheduledBackupListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ScheduledBackupDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <cnpgScheduledBackupList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.cnpgScheduledBackup).flat()"
  />
</template>