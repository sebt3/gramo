<script setup lang="ts">
import monitoringPrometheusRuleQuery from '@/queries/monitoring/PrometheusRule.read.graphql'
import PrometheusRuleDelete from '@/queries/monitoring/PrometheusRule.delete.graphql'
import monitoringPrometheusRuleList from '@/components/monitoring/PrometheusRuleList.vue';
import { useQuery, useMutation, usePrometheusRule, PrometheusRuleListExcludes } from '../../../libs/monitoring/PrometheusRule.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = usePrometheusRule();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(monitoringPrometheusRuleQuery, {
  "obj": {
    "filters": [],
    "excludes": PrometheusRuleListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(PrometheusRuleDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <monitoringPrometheusRuleList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.monitoringPrometheusRule).flat()"
  />
</template>