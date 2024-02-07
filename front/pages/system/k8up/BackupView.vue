<script setup lang="ts">
import k8upBackupQuery from '@/queries/k8up/Backup.details.graphql'
import BackupDelete from '@/queries/k8up/Backup.delete.graphql'
import k8upBackupMeta from '@/components/k8up/BackupMeta.vue';
import k8upBackupView from '@/components/k8up/BackupView.vue';
import k8upBackupStatus from '@/components/k8up/BackupStatus.vue';
import { useQuery, useMutation, useBackup, BackupReadExcludes } from '../../../libs/k8up/Backup.js'
const { onErrorHandler, notifySuccess, notifyError, onNotBackupFound, navigation, setNamespacedItemFromRoute } = useBackup();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8upBackupQuery, {
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
      <k8upBackupMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8upBackup[0]!=undefined && result.k8sNamespace[0].k8upBackup[0]!=null"
        :model="result.k8sNamespace[0].k8upBackup[0]"
       />
    </div>
    <div class="col-md-6">
      <k8upBackupStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8upBackup[0]!=undefined && result.k8sNamespace[0].k8upBackup[0]!=null"
        :model="result.k8sNamespace[0].k8upBackup[0]"
       />
    </div>
    <div class="col-md-12">
      <k8upBackupView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8upBackup[0]!=undefined && result.k8sNamespace[0].k8upBackup[0]!=null"
        :model="result.k8sNamespace[0].k8upBackup[0]"
        />
    </div>
  </div>
</template>
