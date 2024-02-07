<script setup lang="ts">
import mariadbBackupQuery from '@/queries/mariadb/Backup.details.graphql'
import BackupDelete from '@/queries/mariadb/Backup.delete.graphql'
import mariadbBackupMeta from '@/components/mariadb/BackupMeta.vue';
import mariadbBackupView from '@/components/mariadb/BackupView.vue';
import mariadbBackupStatus from '@/components/mariadb/BackupStatus.vue';
import { useQuery, useMutation, useBackup, BackupReadExcludes } from '../../../libs/mariadb/Backup.js'
const { onErrorHandler, notifySuccess, notifyError, onNotBackupFound, navigation, setNamespacedItemFromRoute } = useBackup();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(mariadbBackupQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": BackupReadExcludes
  },
  "namespace": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentNamespace
      }
    ]
  }
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotBackupFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(BackupDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <mariadbBackupMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbBackup[0]!=undefined && result.k8sNamespace[0].mariadbBackup[0]!=null"
        :model="result.k8sNamespace[0].mariadbBackup[0]"
       />
    </div>
    <div class="col-md-6">
      <mariadbBackupStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbBackup[0]!=undefined && result.k8sNamespace[0].mariadbBackup[0]!=null"
        :model="result.k8sNamespace[0].mariadbBackup[0]"
       />
    </div>
    <div class="col-md-12">
      <mariadbBackupView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbBackup[0]!=undefined && result.k8sNamespace[0].mariadbBackup[0]!=null"
        :model="result.k8sNamespace[0].mariadbBackup[0]"
        />
    </div>
  </div>
</template>
