<script setup lang="ts">
import k8sLimitRangeQuery from '@/queries/k8s/LimitRange.details.graphql'
import LimitRangeDelete from '@/queries/k8s/LimitRange.delete.graphql'
import k8sLimitRangeMeta from '@/components/k8s/LimitRangeMeta.vue';
import k8sLimitRangeView from '@/components/k8s/LimitRangeView.vue';
import { useQuery, useMutation, useLimitRange, LimitRangeReadExcludes } from '../../../libs/k8s/LimitRange.js'
const { onErrorHandler, notifySuccess, notifyError, onNotLimitRangeFound, navigation, setNamespacedItemFromRoute } = useLimitRange();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sLimitRangeQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": LimitRangeReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotLimitRangeFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(LimitRangeDelete);
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
      <k8sLimitRangeMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sLimitRange[0]!=undefined && result.k8sNamespace[0].k8sLimitRange[0]!=null"
        :model="result.k8sNamespace[0].k8sLimitRange[0]"
       />
    </div>
    <div class="col-md-12">
      <k8sLimitRangeView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sLimitRange[0]!=undefined && result.k8sNamespace[0].k8sLimitRange[0]!=null"
        :model="result.k8sNamespace[0].k8sLimitRange[0]"
        />
    </div>
  </div>
</template>
