<script setup lang="ts">
import projectcalicoIPPoolQuery from '@/queries/projectcalico/IPPool.details.graphql'
import IPPoolDelete from '@/queries/projectcalico/IPPool.delete.graphql'
import projectcalicoIPPoolMeta from '@/components/projectcalico/IPPoolMeta.vue';
import projectcalicoIPPoolView from '@/components/projectcalico/IPPoolView.vue';
import { useQuery, useMutation, useIPPool, IPPoolReadExcludes } from '../../../libs/projectcalico/IPPool.js'
const { onErrorHandler, notifySuccess, notifyError, onNotIPPoolFound, navigation, setItemFromRoute } = useIPPool();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoIPPoolQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": IPPoolReadExcludes
  },
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotIPPoolFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(IPPoolDelete);
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
      <projectcalicoIPPoolMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.projectcalicoIPPool[0]!=undefined && result.projectcalicoIPPool[0]!=null"
        :model="result.projectcalicoIPPool[0]"
       />
    </div>
    <div class="col-md-12">
      <projectcalicoIPPoolView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.projectcalicoIPPool[0]!=undefined && result.projectcalicoIPPool[0]!=null"
        :model="result.projectcalicoIPPool[0]"
        />
    </div>
  </div>
</template>
