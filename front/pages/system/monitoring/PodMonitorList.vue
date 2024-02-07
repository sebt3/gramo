<script setup lang="ts">
import monitoringPodMonitorQuery from '@/queries/monitoring/PodMonitor.read.graphql'
import PodMonitorDelete from '@/queries/monitoring/PodMonitor.delete.graphql'
import monitoringPodMonitorList from '@/components/monitoring/PodMonitorList.vue';
import { useQuery, useMutation, usePodMonitor, PodMonitorListExcludes } from '../../../libs/monitoring/PodMonitor.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = usePodMonitor();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(monitoringPodMonitorQuery, {
  "obj": {
    "filters": [],
    "excludes": PodMonitorListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(PodMonitorDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <monitoringPodMonitorList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.monitoringPodMonitor).flat()"
  />
</template>