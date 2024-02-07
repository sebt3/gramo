<script setup lang="ts">
import oracleMySQLBackupQuery from '@/queries/oracle/MySQLBackup.read.graphql'
import MySQLBackupEdit from '@/queries/oracle/MySQLBackup.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import oracleMySQLBackupMeta from '@/components/oracle/MySQLBackupMeta.vue';
import oracleMySQLBackupEdit from '@/components/oracle/MySQLBackupEdit.vue';
import oracleMySQLBackupStatus from '@/components/oracle/MySQLBackupStatus.vue';
import { useQuery, useMutation, sanitizeData, useMySQLBackup, MySQLBackupSimpleExcludes } from '../../../libs/oracle/MySQLBackup.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotMySQLBackupFound, navigation, editor, setNamespacedItemFromRoute } = useMySQLBackup();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(oracleMySQLBackupQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": MySQLBackupSimpleExcludes
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
});
const { mutate: patchMySQLBackup, onDone: onPatchMySQLBackup, onError: onPatchError } = useMutation(MySQLBackupEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchMySQLBackup({
    "name": result.k8sNamespace[0].oracleMySQLBackup[0].metadata.name,
    "namespace": result.k8sNamespace[0].oracleMySQLBackup[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotMySQLBackupFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].oracleMySQLBackup[0])});onPatchMySQLBackup(patchDone);onPatchError(patchError);
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
      <oracleMySQLBackupEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].oracleMySQLBackup[0]!=undefined && result.k8sNamespace[0].oracleMySQLBackup[0]!=null"
        :model="result.k8sNamespace[0].oracleMySQLBackup[0]"
       />
    </div>
  </div>
</template>

