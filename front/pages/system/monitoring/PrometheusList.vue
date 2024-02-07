<script setup lang="ts">
import monitoringPrometheusQuery from '@/queries/monitoring/Prometheus.read.graphql'
import PrometheusDelete from '@/queries/monitoring/Prometheus.delete.graphql'
import monitoringPrometheusList from '@/components/monitoring/PrometheusList.vue';
import { useQuery, useMutation, usePrometheus, PrometheusListExcludes } from '../../../libs/monitoring/Prometheus.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = usePrometheus();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(monitoringPrometheusQuery, {
  "obj": {
    "filters": [],
    "excludes": PrometheusListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(PrometheusDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <monitoringPrometheusList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.monitoringPrometheus).flat()"
  />
</template>