<script setup lang="ts">
import projectcalicoGlobalNetworkSetQuery from '@/queries/projectcalico/GlobalNetworkSet.details.graphql'
import GlobalNetworkSetDelete from '@/queries/projectcalico/GlobalNetworkSet.delete.graphql'
import projectcalicoGlobalNetworkSetMeta from '@/components/projectcalico/GlobalNetworkSetMeta.vue';
import projectcalicoGlobalNetworkSetView from '@/components/projectcalico/GlobalNetworkSetView.vue';
import { useQuery, useMutation, useGlobalNetworkSet, GlobalNetworkSetReadExcludes } from '../../../libs/projectcalico/GlobalNetworkSet.js'
const { onErrorHandler, notifySuccess, notifyError, onNotGlobalNetworkSetFound, navigation, setItemFromRoute } = useGlobalNetworkSet();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoGlobalNetworkSetQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": GlobalNetworkSetReadExcludes
  },
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotGlobalNetworkSetFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(GlobalNetworkSetDelete);
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
      <projectcalicoGlobalNetworkSetMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.projectcalicoGlobalNetworkSet[0]!=undefined && result.projectcalicoGlobalNetworkSet[0]!=null"
        :model="result.projectcalicoGlobalNetworkSet[0]"
       />
    </div>
    <div class="col-md-12">
      <projectcalicoGlobalNetworkSetView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.projectcalicoGlobalNetworkSet[0]!=undefined && result.projectcalicoGlobalNetworkSet[0]!=null"
        :model="result.projectcalicoGlobalNetworkSet[0]"
        />
    </div>
  </div>
</template>
