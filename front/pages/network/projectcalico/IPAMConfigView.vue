<script setup lang="ts">
import projectcalicoIPAMConfigQuery from '@/queries/projectcalico/IPAMConfig.details.graphql'
import IPAMConfigDelete from '@/queries/projectcalico/IPAMConfig.delete.graphql'
import projectcalicoIPAMConfigMeta from '@/components/projectcalico/IPAMConfigMeta.vue';
import projectcalicoIPAMConfigView from '@/components/projectcalico/IPAMConfigView.vue';
import { useQuery, useMutation, useIPAMConfig, IPAMConfigReadExcludes } from '../../../libs/projectcalico/IPAMConfig.js'
const { onErrorHandler, notifySuccess, notifyError, onNotIPAMConfigFound, navigation, setItemFromRoute } = useIPAMConfig();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoIPAMConfigQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": IPAMConfigReadExcludes
  },
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotIPAMConfigFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(IPAMConfigDelete);
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
      <projectcalicoIPAMConfigMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.projectcalicoIPAMConfig[0]!=undefined && result.projectcalicoIPAMConfig[0]!=null"
        :model="result.projectcalicoIPAMConfig[0]"
       />
    </div>
    <div class="col-md-12">
      <projectcalicoIPAMConfigView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.projectcalicoIPAMConfig[0]!=undefined && result.projectcalicoIPAMConfig[0]!=null"
        :model="result.projectcalicoIPAMConfig[0]"
        />
    </div>
  </div>
</template>
