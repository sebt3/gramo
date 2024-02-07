<script setup lang="ts">
import projectcalicoIPAMBlockQuery from '@/queries/projectcalico/IPAMBlock.details.graphql'
import IPAMBlockDelete from '@/queries/projectcalico/IPAMBlock.delete.graphql'
import projectcalicoIPAMBlockMeta from '@/components/projectcalico/IPAMBlockMeta.vue';
import projectcalicoIPAMBlockView from '@/components/projectcalico/IPAMBlockView.vue';
import { useQuery, useMutation, useIPAMBlock, IPAMBlockReadExcludes } from '../../../libs/projectcalico/IPAMBlock.js'
const { onErrorHandler, notifySuccess, notifyError, onNotIPAMBlockFound, navigation, setItemFromRoute } = useIPAMBlock();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoIPAMBlockQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": IPAMBlockReadExcludes
  },
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotIPAMBlockFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(IPAMBlockDelete);
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
      <projectcalicoIPAMBlockMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.projectcalicoIPAMBlock[0]!=undefined && result.projectcalicoIPAMBlock[0]!=null"
        :model="result.projectcalicoIPAMBlock[0]"
       />
    </div>
    <div class="col-md-12">
      <projectcalicoIPAMBlockView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.projectcalicoIPAMBlock[0]!=undefined && result.projectcalicoIPAMBlock[0]!=null"
        :model="result.projectcalicoIPAMBlock[0]"
        />
    </div>
  </div>
</template>
