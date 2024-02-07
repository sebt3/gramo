<script setup lang="ts">
import k8sPriorityClassQuery from '@/queries/k8s/PriorityClass.details.graphql'
import PriorityClassDelete from '@/queries/k8s/PriorityClass.delete.graphql'
import k8sPriorityClassMeta from '@/components/k8s/PriorityClassMeta.vue';
import k8sPriorityClassView from '@/components/k8s/PriorityClassView.vue';
import { useQuery, useMutation, usePriorityClass, PriorityClassReadExcludes } from '../../../libs/k8s/PriorityClass.js'
const { onErrorHandler, notifySuccess, notifyError, onNotPriorityClassFound, navigation, setItemFromRoute } = usePriorityClass();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sPriorityClassQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": PriorityClassReadExcludes
  },
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotPriorityClassFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(PriorityClassDelete);
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
      <k8sPriorityClassMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sPriorityClass[0]!=undefined && result.k8sPriorityClass[0]!=null"
        :model="result.k8sPriorityClass[0]"
       />
    </div>
    <div class="col-md-12">
      <k8sPriorityClassView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sPriorityClass[0]!=undefined && result.k8sPriorityClass[0]!=null"
        :model="result.k8sPriorityClass[0]"
        />
    </div>
  </div>
</template>
