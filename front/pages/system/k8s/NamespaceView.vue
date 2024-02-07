<script setup lang="ts">
import k8sNamespaceQuery from '@/queries/k8s/Namespace.details.graphql'
import NamespaceDelete from '@/queries/k8s/Namespace.delete.graphql'
import k8sNamespaceMeta from '@/components/k8s/NamespaceMeta.vue';
import k8sNamespaceView from '@/components/k8s/NamespaceView.vue';
import k8sNamespaceStatus from '@/components/k8s/NamespaceStatus.vue';
import { useQuery, useMutation, useNamespace, NamespaceReadExcludes } from '../../../libs/k8s/Namespace.js'
const { onErrorHandler, notifySuccess, notifyError, onNotNamespaceFound, navigation, setItemFromRoute } = useNamespace();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sNamespaceQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": NamespaceReadExcludes
  },
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotNamespaceFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(NamespaceDelete);
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
      <k8sNamespaceMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace[0]!=undefined && result.k8sNamespace[0]!=null"
        :model="result.k8sNamespace[0]"
       />
    </div>
    <div class="col-md-6">
      <k8sNamespaceStatus
        v-if="!loading && result!=undefined && result.k8sNamespace[0]!=undefined && result.k8sNamespace[0]!=null"
        :model="result.k8sNamespace[0]"
       />
    </div>
    <div class="col-md-12">
      <k8sNamespaceView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace[0]!=undefined && result.k8sNamespace[0]!=null"
        :model="result.k8sNamespace[0]"
        />
    </div>
  </div>
</template>
