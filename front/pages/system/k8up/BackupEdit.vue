<script setup lang="ts">
import k8upBackupQuery from '@/queries/k8up/Backup.read.graphql'
import BackupEdit from '@/queries/k8up/Backup.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import k8upBackupMeta from '@/components/k8up/BackupMeta.vue';
import k8upBackupEdit from '@/components/k8up/BackupEdit.vue';
import k8upBackupStatus from '@/components/k8up/BackupStatus.vue';
import { useQuery, useMutation, sanitizeData, useBackup, BackupSimpleExcludes } from '../../../libs/k8up/Backup.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotBackupFound, navigation, editor, setNamespacedItemFromRoute } = useBackup();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8upBackupQuery, {
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
    "name": result.k8sNamespace[0].k8upBackup[0].metadata.name,
    "namespace": result.k8sNamespace[0].k8upBackup[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotBackupFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].k8upBackup[0])});onPatchBackup(patchDone);onPatchError(patchError);
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
      <k8upBackupEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8upBackup[0]!=undefined && result.k8sNamespace[0].k8upBackup[0]!=null"
        :model="result.k8sNamespace[0].k8upBackup[0]"
       />
    </div>
  </div>
</template>

