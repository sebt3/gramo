<script setup lang="ts">
import k8upPreBackupPodQuery from '@/queries/k8up/PreBackupPod.details.graphql'
import PreBackupPodDelete from '@/queries/k8up/PreBackupPod.delete.graphql'
import k8upPreBackupPodMeta from '@/components/k8up/PreBackupPodMeta.vue';
import k8upPreBackupPodView from '@/components/k8up/PreBackupPodView.vue';
import { useQuery, useMutation, usePreBackupPod, PreBackupPodReadExcludes } from '../../../libs/k8up/PreBackupPod.js'
const { onErrorHandler, notifySuccess, notifyError, onNotPreBackupPodFound, navigation, setNamespacedItemFromRoute } = usePreBackupPod();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8upPreBackupPodQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": PreBackupPodReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotPreBackupPodFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(PreBackupPodDelete);
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
    <div class="col-md-3">
      <k8upPreBackupPodMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8upPreBackupPod[0]!=undefined && result.k8sNamespace[0].k8upPreBackupPod[0]!=null"
        :model="result.k8sNamespace[0].k8upPreBackupPod[0]"
       />
    </div>
    <div class="col-md-12">
      <k8upPreBackupPodView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8upPreBackupPod[0]!=undefined && result.k8sNamespace[0].k8upPreBackupPod[0]!=null"
        :model="result.k8sNamespace[0].k8upPreBackupPod[0]"
        />
    </div>
  </div>
</template>
