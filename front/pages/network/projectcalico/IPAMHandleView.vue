<script setup lang="ts">
import projectcalicoIPAMHandleQuery from '@/queries/projectcalico/IPAMHandle.details.graphql'
import IPAMHandleDelete from '@/queries/projectcalico/IPAMHandle.delete.graphql'
import projectcalicoIPAMHandleMeta from '@/components/projectcalico/IPAMHandleMeta.vue';
import projectcalicoIPAMHandleView from '@/components/projectcalico/IPAMHandleView.vue';
import { useQuery, useMutation, useIPAMHandle, IPAMHandleReadExcludes } from '../../../libs/projectcalico/IPAMHandle.js'
const { onErrorHandler, notifySuccess, notifyError, onNotIPAMHandleFound, navigation, setItemFromRoute } = useIPAMHandle();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoIPAMHandleQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": IPAMHandleReadExcludes
  },
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotIPAMHandleFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(IPAMHandleDelete);
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
      <projectcalicoIPAMHandleMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.projectcalicoIPAMHandle[0]!=undefined && result.projectcalicoIPAMHandle[0]!=null"
        :model="result.projectcalicoIPAMHandle[0]"
       />
    </div>
    <div class="col-md-12">
      <projectcalicoIPAMHandleView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.projectcalicoIPAMHandle[0]!=undefined && result.projectcalicoIPAMHandle[0]!=null"
        :model="result.projectcalicoIPAMHandle[0]"
        />
    </div>
  </div>
</template>
