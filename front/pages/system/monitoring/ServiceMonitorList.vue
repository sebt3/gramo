<script setup lang="ts">
import monitoringServiceMonitorQuery from '@/queries/monitoring/ServiceMonitor.read.graphql'
import ServiceMonitorDelete from '@/queries/monitoring/ServiceMonitor.delete.graphql'
import monitoringServiceMonitorList from '@/components/monitoring/ServiceMonitorList.vue';
import { useQuery, useMutation, useServiceMonitor, ServiceMonitorListExcludes } from '../../../libs/monitoring/ServiceMonitor.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useServiceMonitor();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(monitoringServiceMonitorQuery, {
  "obj": {
    "filters": [],
    "excludes": ServiceMonitorListExcludes
  },
  "namespace": {
    "filters": isNamespaced()?[
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentNamespace
      }
    ]:[]
  }
}, { pollInterval: 2000 });
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ServiceMonitorDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <monitoringServiceMonitorList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.monitoringServiceMonitor).flat()"
  />
</template>