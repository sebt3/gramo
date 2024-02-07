<script setup lang="ts">
import k8upScheduleQuery from '@/queries/k8up/Schedule.details.graphql'
import ScheduleDelete from '@/queries/k8up/Schedule.delete.graphql'
import k8upScheduleMeta from '@/components/k8up/ScheduleMeta.vue';
import k8upScheduleView from '@/components/k8up/ScheduleView.vue';
import k8upScheduleStatus from '@/components/k8up/ScheduleStatus.vue';
import { useQuery, useMutation, useSchedule, ScheduleReadExcludes } from '../../../libs/k8up/Schedule.js'
const { onErrorHandler, notifySuccess, notifyError, onNotScheduleFound, navigation, setNamespacedItemFromRoute } = useSchedule();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8upScheduleQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ScheduleReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotScheduleFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ScheduleDelete);
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
      <k8upScheduleMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8upSchedule[0]!=undefined && result.k8sNamespace[0].k8upSchedule[0]!=null"
        :model="result.k8sNamespace[0].k8upSchedule[0]"
       />
    </div>
    <div class="col-md-6">
      <k8upScheduleStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8upSchedule[0]!=undefined && result.k8sNamespace[0].k8upSchedule[0]!=null"
        :model="result.k8sNamespace[0].k8upSchedule[0]"
       />
    </div>
    <div class="col-md-12">
      <k8upScheduleView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8upSchedule[0]!=undefined && result.k8sNamespace[0].k8upSchedule[0]!=null"
        :model="result.k8sNamespace[0].k8upSchedule[0]"
        />
    </div>
  </div>
</template>
