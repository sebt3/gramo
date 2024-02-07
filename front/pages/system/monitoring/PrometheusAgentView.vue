<script setup lang="ts">
import monitoringPrometheusAgentQuery from '@/queries/monitoring/PrometheusAgent.details.graphql'
import PrometheusAgentDelete from '@/queries/monitoring/PrometheusAgent.delete.graphql'
import monitoringPrometheusAgentMeta from '@/components/monitoring/PrometheusAgentMeta.vue';
import monitoringPrometheusAgentView from '@/components/monitoring/PrometheusAgentView.vue';
import monitoringPrometheusAgentStatus from '@/components/monitoring/PrometheusAgentStatus.vue';
import { useQuery, useMutation, usePrometheusAgent, PrometheusAgentReadExcludes } from '../../../libs/monitoring/PrometheusAgent.js'
const { onErrorHandler, notifySuccess, notifyError, onNotPrometheusAgentFound, navigation, setNamespacedItemFromRoute } = usePrometheusAgent();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(monitoringPrometheusAgentQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": PrometheusAgentReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotPrometheusAgentFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(PrometheusAgentDelete);
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
      <monitoringPrometheusAgentMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].monitoringPrometheusAgent[0]!=undefined && result.k8sNamespace[0].monitoringPrometheusAgent[0]!=null"
        :model="result.k8sNamespace[0].monitoringPrometheusAgent[0]"
       />
    </div>
    <div class="col-md-6">
      <monitoringPrometheusAgentStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].monitoringPrometheusAgent[0]!=undefined && result.k8sNamespace[0].monitoringPrometheusAgent[0]!=null"
        :model="result.k8sNamespace[0].monitoringPrometheusAgent[0]"
       />
    </div>
    <div class="col-md-12">
      <monitoringPrometheusAgentView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].monitoringPrometheusAgent[0]!=undefined && result.k8sNamespace[0].monitoringPrometheusAgent[0]!=null"
        :model="result.k8sNamespace[0].monitoringPrometheusAgent[0]"
        />
    </div>
  </div>
</template>
