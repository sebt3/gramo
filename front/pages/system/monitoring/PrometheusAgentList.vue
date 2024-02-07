<script setup lang="ts">
import monitoringPrometheusAgentQuery from '@/queries/monitoring/PrometheusAgent.read.graphql'
import PrometheusAgentDelete from '@/queries/monitoring/PrometheusAgent.delete.graphql'
import monitoringPrometheusAgentList from '@/components/monitoring/PrometheusAgentList.vue';
import { useQuery, useMutation, usePrometheusAgent, PrometheusAgentListExcludes } from '../../../libs/monitoring/PrometheusAgent.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = usePrometheusAgent();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(monitoringPrometheusAgentQuery, {
  "obj": {
    "filters": [],
    "excludes": PrometheusAgentListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(PrometheusAgentDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <monitoringPrometheusAgentList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.monitoringPrometheusAgent).flat()"
  />
</template>