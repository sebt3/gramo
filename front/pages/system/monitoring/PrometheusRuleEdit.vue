<script setup lang="ts">
import monitoringPrometheusRuleQuery from '@/queries/monitoring/PrometheusRule.read.graphql'
import PrometheusRuleEdit from '@/queries/monitoring/PrometheusRule.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import monitoringPrometheusRuleMeta from '@/components/monitoring/PrometheusRuleMeta.vue';
import monitoringPrometheusRuleEdit from '@/components/monitoring/PrometheusRuleEdit.vue';
import { useQuery, useMutation, sanitizeData, usePrometheusRule, PrometheusRuleSimpleExcludes } from '../../../libs/monitoring/PrometheusRule.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotPrometheusRuleFound, navigation, editor, setNamespacedItemFromRoute } = usePrometheusRule();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(monitoringPrometheusRuleQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": PrometheusRuleSimpleExcludes
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
});
const { mutate: patchPrometheusRule, onDone: onPatchPrometheusRule, onError: onPatchError } = useMutation(PrometheusRuleEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchPrometheusRule({
    "name": result.k8sNamespace[0].monitoringPrometheusRule[0].metadata.name,
    "namespace": result.k8sNamespace[0].monitoringPrometheusRule[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotPrometheusRuleFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].monitoringPrometheusRule[0])});onPatchPrometheusRule(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <monitoringPrometheusRuleMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].monitoringPrometheusRule[0]!=undefined && result.k8sNamespace[0].monitoringPrometheusRule[0]!=null"
        :model="result.k8sNamespace[0].monitoringPrometheusRule[0]"
       />
    </div>
    <div class="col-md-12">
      <monitoringPrometheusRuleEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].monitoringPrometheusRule[0]!=undefined && result.k8sNamespace[0].monitoringPrometheusRule[0]!=null"
        :model="result.k8sNamespace[0].monitoringPrometheusRule[0]"
       />
    </div>
  </div>
</template>

