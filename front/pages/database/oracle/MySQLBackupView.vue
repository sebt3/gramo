<script setup lang="ts">
import oracleMySQLBackupQuery from '@/queries/oracle/MySQLBackup.details.graphql'
import MySQLBackupDelete from '@/queries/oracle/MySQLBackup.delete.graphql'
import oracleMySQLBackupMeta from '@/components/oracle/MySQLBackupMeta.vue';
import oracleMySQLBackupView from '@/components/oracle/MySQLBackupView.vue';
import oracleMySQLBackupStatus from '@/components/oracle/MySQLBackupStatus.vue';
import { useQuery, useMutation, useMySQLBackup, MySQLBackupReadExcludes } from '../../../libs/oracle/MySQLBackup.js'
const { onErrorHandler, notifySuccess, notifyError, onNotMySQLBackupFound, navigation, setNamespacedItemFromRoute } = useMySQLBackup();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(oracleMySQLBackupQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": MySQLBackupReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotMySQLBackupFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(MySQLBackupDelete);
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
      <oracleMySQLBackupMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].oracleMySQLBackup[0]!=undefined && result.k8sNamespace[0].oracleMySQLBackup[0]!=null"
        :model="result.k8sNamespace[0].oracleMySQLBackup[0]"
       />
    </div>
    <div class="col-md-6">
      <oracleMySQLBackupStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].oracleMySQLBackup[0]!=undefined && result.k8sNamespace[0].oracleMySQLBackup[0]!=null"
        :model="result.k8sNamespace[0].oracleMySQLBackup[0]"
       />
    </div>
    <div class="col-md-12">
      <oracleMySQLBackupView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].oracleMySQLBackup[0]!=undefined && result.k8sNamespace[0].oracleMySQLBackup[0]!=null"
        :model="result.k8sNamespace[0].oracleMySQLBackup[0]"
        />
    </div>
  </div>
</template>
