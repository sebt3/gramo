<script setup lang="ts">
import k8sCSIDriverQuery from '@/queries/k8s/CSIDriver.details.graphql'
import CSIDriverDelete from '@/queries/k8s/CSIDriver.delete.graphql'
import k8sCSIDriverMeta from '@/components/k8s/CSIDriverMeta.vue';
import k8sCSIDriverView from '@/components/k8s/CSIDriverView.vue';
import { useQuery, useMutation, useCSIDriver, CSIDriverReadExcludes } from '../../../libs/k8s/CSIDriver.js'
const { onErrorHandler, notifySuccess, notifyError, onNotCSIDriverFound, navigation, setItemFromRoute } = useCSIDriver();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sCSIDriverQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": CSIDriverReadExcludes
  },
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotCSIDriverFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(CSIDriverDelete);
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
      <k8sCSIDriverMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sCSIDriver[0]!=undefined && result.k8sCSIDriver[0]!=null"
        :model="result.k8sCSIDriver[0]"
       />
    </div>
    <div class="col-md-12">
      <k8sCSIDriverView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sCSIDriver[0]!=undefined && result.k8sCSIDriver[0]!=null"
        :model="result.k8sCSIDriver[0]"
        />
    </div>
  </div>
</template>
