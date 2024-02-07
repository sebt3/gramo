<script setup lang="ts">
import projectcalicoCalicoNodeStatusQuery from '@/queries/projectcalico/CalicoNodeStatus.details.graphql'
import CalicoNodeStatusDelete from '@/queries/projectcalico/CalicoNodeStatus.delete.graphql'
import projectcalicoCalicoNodeStatusMeta from '@/components/projectcalico/CalicoNodeStatusMeta.vue';
import projectcalicoCalicoNodeStatusView from '@/components/projectcalico/CalicoNodeStatusView.vue';
import projectcalicoCalicoNodeStatusStatus from '@/components/projectcalico/CalicoNodeStatusStatus.vue';
import { useQuery, useMutation, useCalicoNodeStatus, CalicoNodeStatusReadExcludes } from '../../../libs/projectcalico/CalicoNodeStatus.js'
const { onErrorHandler, notifySuccess, notifyError, onNotCalicoNodeStatusFound, navigation, setItemFromRoute } = useCalicoNodeStatus();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoCalicoNodeStatusQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": CalicoNodeStatusReadExcludes
  },
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotCalicoNodeStatusFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(CalicoNodeStatusDelete);
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
      <projectcalicoCalicoNodeStatusMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.projectcalicoCalicoNodeStatus[0]!=undefined && result.projectcalicoCalicoNodeStatus[0]!=null"
        :model="result.projectcalicoCalicoNodeStatus[0]"
       />
    </div>
    <div class="col-md-6">
      <projectcalicoCalicoNodeStatusStatus
        v-if="!loading && result!=undefined && result.projectcalicoCalicoNodeStatus[0]!=undefined && result.projectcalicoCalicoNodeStatus[0]!=null"
        :model="result.projectcalicoCalicoNodeStatus[0]"
       />
    </div>
    <div class="col-md-12">
      <projectcalicoCalicoNodeStatusView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.projectcalicoCalicoNodeStatus[0]!=undefined && result.projectcalicoCalicoNodeStatus[0]!=null"
        :model="result.projectcalicoCalicoNodeStatus[0]"
        />
    </div>
  </div>
</template>
