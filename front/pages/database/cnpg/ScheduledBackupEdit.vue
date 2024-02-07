<script setup lang="ts">
import cnpgScheduledBackupQuery from '@/queries/cnpg/ScheduledBackup.read.graphql'
import ScheduledBackupEdit from '@/queries/cnpg/ScheduledBackup.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import cnpgScheduledBackupMeta from '@/components/cnpg/ScheduledBackupMeta.vue';
import cnpgScheduledBackupEdit from '@/components/cnpg/ScheduledBackupEdit.vue';
import cnpgScheduledBackupStatus from '@/components/cnpg/ScheduledBackupStatus.vue';
import { useQuery, useMutation, sanitizeData, useScheduledBackup, ScheduledBackupSimpleExcludes } from '../../../libs/cnpg/ScheduledBackup.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotScheduledBackupFound, navigation, editor, setNamespacedItemFromRoute } = useScheduledBackup();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(cnpgScheduledBackupQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ScheduledBackupSimpleExcludes
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
const { mutate: patchScheduledBackup, onDone: onPatchScheduledBackup, onError: onPatchError } = useMutation(ScheduledBackupEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchScheduledBackup({
    "name": result.k8sNamespace[0].cnpgScheduledBackup[0].metadata.name,
    "namespace": result.k8sNamespace[0].cnpgScheduledBackup[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotScheduledBackupFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].cnpgScheduledBackup[0])});onPatchScheduledBackup(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <cnpgScheduledBackupMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].cnpgScheduledBackup[0]!=undefined && result.k8sNamespace[0].cnpgScheduledBackup[0]!=null"
        :model="result.k8sNamespace[0].cnpgScheduledBackup[0]"
       />
    </div>
    <div class="col-md-6">
      <cnpgScheduledBackupStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].cnpgScheduledBackup[0]!=undefined && result.k8sNamespace[0].cnpgScheduledBackup[0]!=null"
        :model="result.k8sNamespace[0].cnpgScheduledBackup[0]"
       />
    </div>
    <div class="col-md-12">
      <cnpgScheduledBackupEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].cnpgScheduledBackup[0]!=undefined && result.k8sNamespace[0].cnpgScheduledBackup[0]!=null"
        :model="result.k8sNamespace[0].cnpgScheduledBackup[0]"
       />
    </div>
  </div>
</template>

