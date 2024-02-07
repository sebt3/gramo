<script setup lang="ts">
import monitoringServiceMonitorQuery from '@/queries/monitoring/ServiceMonitor.details.graphql'
import ServiceMonitorDelete from '@/queries/monitoring/ServiceMonitor.delete.graphql'
import monitoringServiceMonitorMeta from '@/components/monitoring/ServiceMonitorMeta.vue';
import monitoringServiceMonitorView from '@/components/monitoring/ServiceMonitorView.vue';
import { useQuery, useMutation, useServiceMonitor, ServiceMonitorReadExcludes } from '../../../libs/monitoring/ServiceMonitor.js'
const { onErrorHandler, notifySuccess, notifyError, onNotServiceMonitorFound, navigation, setNamespacedItemFromRoute } = useServiceMonitor();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(monitoringServiceMonitorQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ServiceMonitorReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotServiceMonitorFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ServiceMonitorDelete);
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
      <monitoringServiceMonitorMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].monitoringServiceMonitor[0]!=undefined && result.k8sNamespace[0].monitoringServiceMonitor[0]!=null"
        :model="result.k8sNamespace[0].monitoringServiceMonitor[0]"
       />
    </div>
    <div class="col-md-12">
      <monitoringServiceMonitorView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].monitoringServiceMonitor[0]!=undefined && result.k8sNamespace[0].monitoringServiceMonitor[0]!=null"
        :model="result.k8sNamespace[0].monitoringServiceMonitor[0]"
        />
    </div>
  </div>
</template>
