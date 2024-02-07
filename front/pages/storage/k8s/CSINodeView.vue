<script setup lang="ts">
import k8sCSINodeQuery from '@/queries/k8s/CSINode.details.graphql'
import CSINodeDelete from '@/queries/k8s/CSINode.delete.graphql'
import k8sCSINodeMeta from '@/components/k8s/CSINodeMeta.vue';
import k8sCSINodeView from '@/components/k8s/CSINodeView.vue';
import { useQuery, useMutation, useCSINode, CSINodeReadExcludes } from '../../../libs/k8s/CSINode.js'
const { onErrorHandler, notifySuccess, notifyError, onNotCSINodeFound, navigation, setItemFromRoute } = useCSINode();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sCSINodeQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": CSINodeReadExcludes
  },
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotCSINodeFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(CSINodeDelete);
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
      <k8sCSINodeMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sCSINode[0]!=undefined && result.k8sCSINode[0]!=null"
        :model="result.k8sCSINode[0]"
       />
    </div>
    <div class="col-md-12">
      <k8sCSINodeView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sCSINode[0]!=undefined && result.k8sCSINode[0]!=null"
        :model="result.k8sCSINode[0]"
        />
    </div>
  </div>
</template>
