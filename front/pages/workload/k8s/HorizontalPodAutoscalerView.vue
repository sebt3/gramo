<script setup lang="ts">
import k8sHorizontalPodAutoscalerQuery from '@/queries/k8s/HorizontalPodAutoscaler.details.graphql'
import HorizontalPodAutoscalerDelete from '@/queries/k8s/HorizontalPodAutoscaler.delete.graphql'
import k8sHorizontalPodAutoscalerMeta from '@/components/k8s/HorizontalPodAutoscalerMeta.vue';
import k8sHorizontalPodAutoscalerView from '@/components/k8s/HorizontalPodAutoscalerView.vue';
import k8sHorizontalPodAutoscalerStatus from '@/components/k8s/HorizontalPodAutoscalerStatus.vue';
import { useQuery, useMutation, useHorizontalPodAutoscaler, HorizontalPodAutoscalerReadExcludes } from '../../../libs/k8s/HorizontalPodAutoscaler.js'
const { onErrorHandler, notifySuccess, notifyError, onNotHorizontalPodAutoscalerFound, navigation, setNamespacedItemFromRoute } = useHorizontalPodAutoscaler();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sHorizontalPodAutoscalerQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": HorizontalPodAutoscalerReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotHorizontalPodAutoscalerFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(HorizontalPodAutoscalerDelete);
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
      <k8sHorizontalPodAutoscalerMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sHorizontalPodAutoscaler[0]!=undefined && result.k8sNamespace[0].k8sHorizontalPodAutoscaler[0]!=null"
        :model="result.k8sNamespace[0].k8sHorizontalPodAutoscaler[0]"
       />
    </div>
    <div class="col-md-6">
      <k8sHorizontalPodAutoscalerStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sHorizontalPodAutoscaler[0]!=undefined && result.k8sNamespace[0].k8sHorizontalPodAutoscaler[0]!=null"
        :model="result.k8sNamespace[0].k8sHorizontalPodAutoscaler[0]"
       />
    </div>
    <div class="col-md-12">
      <k8sHorizontalPodAutoscalerView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sHorizontalPodAutoscaler[0]!=undefined && result.k8sNamespace[0].k8sHorizontalPodAutoscaler[0]!=null"
        :model="result.k8sNamespace[0].k8sHorizontalPodAutoscaler[0]"
        />
    </div>
  </div>
</template>
