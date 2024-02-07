<script setup lang="ts">
import mariadbRestoreQuery from '@/queries/mariadb/Restore.details.graphql'
import RestoreDelete from '@/queries/mariadb/Restore.delete.graphql'
import mariadbRestoreMeta from '@/components/mariadb/RestoreMeta.vue';
import mariadbRestoreView from '@/components/mariadb/RestoreView.vue';
import mariadbRestoreStatus from '@/components/mariadb/RestoreStatus.vue';
import { useQuery, useMutation, useRestore, RestoreReadExcludes } from '../../../libs/mariadb/Restore.js'
const { onErrorHandler, notifySuccess, notifyError, onNotRestoreFound, navigation, setNamespacedItemFromRoute } = useRestore();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(mariadbRestoreQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": RestoreReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotRestoreFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(RestoreDelete);
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
      <mariadbRestoreMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbRestore[0]!=undefined && result.k8sNamespace[0].mariadbRestore[0]!=null"
        :model="result.k8sNamespace[0].mariadbRestore[0]"
       />
    </div>
    <div class="col-md-6">
      <mariadbRestoreStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbRestore[0]!=undefined && result.k8sNamespace[0].mariadbRestore[0]!=null"
        :model="result.k8sNamespace[0].mariadbRestore[0]"
       />
    </div>
    <div class="col-md-12">
      <mariadbRestoreView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbRestore[0]!=undefined && result.k8sNamespace[0].mariadbRestore[0]!=null"
        :model="result.k8sNamespace[0].mariadbRestore[0]"
        />
    </div>
  </div>
</template>
