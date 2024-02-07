<script setup lang="ts">
import k8upCheckQuery from '@/queries/k8up/Check.details.graphql'
import CheckDelete from '@/queries/k8up/Check.delete.graphql'
import k8upCheckMeta from '@/components/k8up/CheckMeta.vue';
import k8upCheckView from '@/components/k8up/CheckView.vue';
import k8upCheckStatus from '@/components/k8up/CheckStatus.vue';
import { useQuery, useMutation, useCheck, CheckReadExcludes } from '../../../libs/k8up/Check.js'
const { onErrorHandler, notifySuccess, notifyError, onNotCheckFound, navigation, setNamespacedItemFromRoute } = useCheck();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8upCheckQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": CheckReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotCheckFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(CheckDelete);
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
      <k8upCheckMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8upCheck[0]!=undefined && result.k8sNamespace[0].k8upCheck[0]!=null"
        :model="result.k8sNamespace[0].k8upCheck[0]"
       />
    </div>
    <div class="col-md-6">
      <k8upCheckStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8upCheck[0]!=undefined && result.k8sNamespace[0].k8upCheck[0]!=null"
        :model="result.k8sNamespace[0].k8upCheck[0]"
       />
    </div>
    <div class="col-md-12">
      <k8upCheckView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8upCheck[0]!=undefined && result.k8sNamespace[0].k8upCheck[0]!=null"
        :model="result.k8sNamespace[0].k8upCheck[0]"
        />
    </div>
  </div>
</template>
