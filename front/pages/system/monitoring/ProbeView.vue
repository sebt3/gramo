<script setup lang="ts">
import monitoringProbeQuery from '@/queries/monitoring/Probe.details.graphql'
import ProbeDelete from '@/queries/monitoring/Probe.delete.graphql'
import monitoringProbeMeta from '@/components/monitoring/ProbeMeta.vue';
import monitoringProbeView from '@/components/monitoring/ProbeView.vue';
import { useQuery, useMutation, useProbe, ProbeReadExcludes } from '../../../libs/monitoring/Probe.js'
const { onErrorHandler, notifySuccess, notifyError, onNotProbeFound, navigation, setNamespacedItemFromRoute } = useProbe();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(monitoringProbeQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ProbeReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotProbeFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ProbeDelete);
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
      <monitoringProbeMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].monitoringProbe[0]!=undefined && result.k8sNamespace[0].monitoringProbe[0]!=null"
        :model="result.k8sNamespace[0].monitoringProbe[0]"
       />
    </div>
    <div class="col-md-12">
      <monitoringProbeView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].monitoringProbe[0]!=undefined && result.k8sNamespace[0].monitoringProbe[0]!=null"
        :model="result.k8sNamespace[0].monitoringProbe[0]"
        />
    </div>
  </div>
</template>
