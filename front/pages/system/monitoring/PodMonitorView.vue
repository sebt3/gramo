<script setup lang="ts">
import monitoringPodMonitorQuery from '@/queries/monitoring/PodMonitor.details.graphql'
import PodMonitorDelete from '@/queries/monitoring/PodMonitor.delete.graphql'
import monitoringPodMonitorMeta from '@/components/monitoring/PodMonitorMeta.vue';
import monitoringPodMonitorView from '@/components/monitoring/PodMonitorView.vue';
import { useQuery, useMutation, usePodMonitor, PodMonitorReadExcludes } from '../../../libs/monitoring/PodMonitor.js'
const { onErrorHandler, notifySuccess, notifyError, onNotPodMonitorFound, navigation, setNamespacedItemFromRoute } = usePodMonitor();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(monitoringPodMonitorQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": PodMonitorReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotPodMonitorFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(PodMonitorDelete);
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
      <monitoringPodMonitorMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].monitoringPodMonitor[0]!=undefined && result.k8sNamespace[0].monitoringPodMonitor[0]!=null"
        :model="result.k8sNamespace[0].monitoringPodMonitor[0]"
       />
    </div>
    <div class="col-md-12">
      <monitoringPodMonitorView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].monitoringPodMonitor[0]!=undefined && result.k8sNamespace[0].monitoringPodMonitor[0]!=null"
        :model="result.k8sNamespace[0].monitoringPodMonitor[0]"
        />
    </div>
  </div>
</template>
