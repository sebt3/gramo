<script setup lang="ts">
import mariadbBackupQuery from '@/queries/mariadb/Backup.read.graphql'
import BackupEdit from '@/queries/mariadb/Backup.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import mariadbBackupMeta from '@/components/mariadb/BackupMeta.vue';
import mariadbBackupEdit from '@/components/mariadb/BackupEdit.vue';
import mariadbBackupStatus from '@/components/mariadb/BackupStatus.vue';
import { useQuery, useMutation, sanitizeData, useBackup, BackupSimpleExcludes } from '../../../libs/mariadb/Backup.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotBackupFound, navigation, editor, setNamespacedItemFromRoute } = useBackup();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(mariadbBackupQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": BackupSimpleExcludes
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
const { mutate: patchBackup, onDone: onPatchBackup, onError: onPatchError } = useMutation(BackupEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchBackup({
    "name": result.k8sNamespace[0].mariadbBackup[0].metadata.name,
    "namespace": result.k8sNamespace[0].mariadbBackup[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotBackupFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].mariadbBackup[0])});onPatchBackup(patchDone);onPatchError(patchError);
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
      <mariadbBackupEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbBackup[0]!=undefined && result.k8sNamespace[0].mariadbBackup[0]!=null"
        :model="result.k8sNamespace[0].mariadbBackup[0]"
       />
    </div>
  </div>
</template>

