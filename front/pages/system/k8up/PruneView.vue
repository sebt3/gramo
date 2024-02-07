<script setup lang="ts">
import k8upPruneQuery from '@/queries/k8up/Prune.details.graphql'
import PruneDelete from '@/queries/k8up/Prune.delete.graphql'
import k8upPruneMeta from '@/components/k8up/PruneMeta.vue';
import k8upPruneView from '@/components/k8up/PruneView.vue';
import k8upPruneStatus from '@/components/k8up/PruneStatus.vue';
import { useQuery, useMutation, usePrune, PruneReadExcludes } from '../../../libs/k8up/Prune.js'
const { onErrorHandler, notifySuccess, notifyError, onNotPruneFound, navigation, setNamespacedItemFromRoute } = usePrune();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8upPruneQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": PruneReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotPruneFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(PruneDelete);
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
      <k8upPruneMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8upPrune[0]!=undefined && result.k8sNamespace[0].k8upPrune[0]!=null"
        :model="result.k8sNamespace[0].k8upPrune[0]"
       />
    </div>
    <div class="col-md-6">
      <k8upPruneStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8upPrune[0]!=undefined && result.k8sNamespace[0].k8upPrune[0]!=null"
        :model="result.k8sNamespace[0].k8upPrune[0]"
       />
    </div>
    <div class="col-md-12">
      <k8upPruneView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8upPrune[0]!=undefined && result.k8sNamespace[0].k8upPrune[0]!=null"
        :model="result.k8sNamespace[0].k8upPrune[0]"
        />
    </div>
  </div>
</template>
