<script setup lang="ts">
import cnpgScheduledBackupQuery from '@/queries/cnpg/ScheduledBackup.details.graphql'
import ScheduledBackupDelete from '@/queries/cnpg/ScheduledBackup.delete.graphql'
import cnpgScheduledBackupMeta from '@/components/cnpg/ScheduledBackupMeta.vue';
import cnpgScheduledBackupView from '@/components/cnpg/ScheduledBackupView.vue';
import cnpgScheduledBackupStatus from '@/components/cnpg/ScheduledBackupStatus.vue';
import { useQuery, useMutation, useScheduledBackup, ScheduledBackupReadExcludes } from '../../../libs/cnpg/ScheduledBackup.js'
const { onErrorHandler, notifySuccess, notifyError, onNotScheduledBackupFound, navigation, setNamespacedItemFromRoute } = useScheduledBackup();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(cnpgScheduledBackupQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ScheduledBackupReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotScheduledBackupFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ScheduledBackupDelete);
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
      <cnpgScheduledBackupView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].cnpgScheduledBackup[0]!=undefined && result.k8sNamespace[0].cnpgScheduledBackup[0]!=null"
        :model="result.k8sNamespace[0].cnpgScheduledBackup[0]"
        />
    </div>
  </div>
</template>
