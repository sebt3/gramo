<script setup lang="ts">
import oracleMySQLBackupQuery from '@/queries/oracle/MySQLBackup.read.graphql'
import MySQLBackupDelete from '@/queries/oracle/MySQLBackup.delete.graphql'
import oracleMySQLBackupList from '@/components/oracle/MySQLBackupList.vue';
import { useQuery, useMutation, useMySQLBackup, MySQLBackupListExcludes } from '../../../libs/oracle/MySQLBackup.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useMySQLBackup();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(oracleMySQLBackupQuery, {
  "obj": {
    "filters": [],
    "excludes": MySQLBackupListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(MySQLBackupDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <oracleMySQLBackupList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.oracleMySQLBackup).flat()"
  />
</template>