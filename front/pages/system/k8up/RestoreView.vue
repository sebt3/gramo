<script setup lang="ts">
import k8upRestoreQuery from '@/queries/k8up/Restore.details.graphql'
import RestoreDelete from '@/queries/k8up/Restore.delete.graphql'
import k8upRestoreMeta from '@/components/k8up/RestoreMeta.vue';
import k8upRestoreView from '@/components/k8up/RestoreView.vue';
import k8upRestoreStatus from '@/components/k8up/RestoreStatus.vue';
import { useQuery, useMutation, useRestore, RestoreReadExcludes } from '../../../libs/k8up/Restore.js'
const { onErrorHandler, notifySuccess, notifyError, onNotRestoreFound, navigation, setNamespacedItemFromRoute } = useRestore();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8upRestoreQuery, {
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
      <k8upRestoreMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8upRestore[0]!=undefined && result.k8sNamespace[0].k8upRestore[0]!=null"
        :model="result.k8sNamespace[0].k8upRestore[0]"
       />
    </div>
    <div class="col-md-6">
      <k8upRestoreStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8upRestore[0]!=undefined && result.k8sNamespace[0].k8upRestore[0]!=null"
        :model="result.k8sNamespace[0].k8upRestore[0]"
       />
    </div>
    <div class="col-md-12">
      <k8upRestoreView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8upRestore[0]!=undefined && result.k8sNamespace[0].k8upRestore[0]!=null"
        :model="result.k8sNamespace[0].k8upRestore[0]"
        />
    </div>
  </div>
</template>
