<script setup lang="ts">
import monitoringPrometheusRuleQuery from '@/queries/monitoring/PrometheusRule.details.graphql'
import PrometheusRuleDelete from '@/queries/monitoring/PrometheusRule.delete.graphql'
import monitoringPrometheusRuleMeta from '@/components/monitoring/PrometheusRuleMeta.vue';
import monitoringPrometheusRuleView from '@/components/monitoring/PrometheusRuleView.vue';
import { useQuery, useMutation, usePrometheusRule, PrometheusRuleReadExcludes } from '../../../libs/monitoring/PrometheusRule.js'
const { onErrorHandler, notifySuccess, notifyError, onNotPrometheusRuleFound, navigation, setNamespacedItemFromRoute } = usePrometheusRule();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(monitoringPrometheusRuleQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": PrometheusRuleReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotPrometheusRuleFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(PrometheusRuleDelete);
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
      <monitoringPrometheusRuleMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].monitoringPrometheusRule[0]!=undefined && result.k8sNamespace[0].monitoringPrometheusRule[0]!=null"
        :model="result.k8sNamespace[0].monitoringPrometheusRule[0]"
       />
    </div>
    <div class="col-md-12">
      <monitoringPrometheusRuleView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].monitoringPrometheusRule[0]!=undefined && result.k8sNamespace[0].monitoringPrometheusRule[0]!=null"
        :model="result.k8sNamespace[0].monitoringPrometheusRule[0]"
        />
    </div>
  </div>
</template>
