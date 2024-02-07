<script setup lang="ts">
import cnpgBackupQuery from '@/queries/cnpg/Backup.details.graphql'
import BackupDelete from '@/queries/cnpg/Backup.delete.graphql'
import cnpgBackupMeta from '@/components/cnpg/BackupMeta.vue';
import cnpgBackupView from '@/components/cnpg/BackupView.vue';
import cnpgBackupStatus from '@/components/cnpg/BackupStatus.vue';
import { useQuery, useMutation, useBackup, BackupReadExcludes } from '../../../libs/cnpg/Backup.js'
const { onErrorHandler, notifySuccess, notifyError, onNotBackupFound, navigation, setNamespacedItemFromRoute } = useBackup();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(cnpgBackupQuery, {
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
      <cnpgBackupMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].cnpgBackup[0]!=undefined && result.k8sNamespace[0].cnpgBackup[0]!=null"
        :model="result.k8sNamespace[0].cnpgBackup[0]"
       />
    </div>
    <div class="col-md-6">
      <cnpgBackupStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].cnpgBackup[0]!=undefined && result.k8sNamespace[0].cnpgBackup[0]!=null"
        :model="result.k8sNamespace[0].cnpgBackup[0]"
       />
    </div>
    <div class="col-md-12">
      <cnpgBackupView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].cnpgBackup[0]!=undefined && result.k8sNamespace[0].cnpgBackup[0]!=null"
        :model="result.k8sNamespace[0].cnpgBackup[0]"
        />
    </div>
  </div>
</template>
