<script setup lang="ts">
import k8sRuntimeClassQuery from '@/queries/k8s/RuntimeClass.details.graphql'
import RuntimeClassDelete from '@/queries/k8s/RuntimeClass.delete.graphql'
import k8sRuntimeClassMeta from '@/components/k8s/RuntimeClassMeta.vue';
import k8sRuntimeClassView from '@/components/k8s/RuntimeClassView.vue';
import { useQuery, useMutation, useRuntimeClass, RuntimeClassReadExcludes } from '../../../libs/k8s/RuntimeClass.js'
const { onErrorHandler, notifySuccess, notifyError, onNotRuntimeClassFound, navigation, setItemFromRoute } = useRuntimeClass();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sRuntimeClassQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": RuntimeClassReadExcludes
  },
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotRuntimeClassFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(RuntimeClassDelete);
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
      <k8sRuntimeClassMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sRuntimeClass[0]!=undefined && result.k8sRuntimeClass[0]!=null"
        :model="result.k8sRuntimeClass[0]"
       />
    </div>
    <div class="col-md-12">
      <k8sRuntimeClassView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sRuntimeClass[0]!=undefined && result.k8sRuntimeClass[0]!=null"
        :model="result.k8sRuntimeClass[0]"
        />
    </div>
  </div>
</template>
