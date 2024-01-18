<script setup lang="ts">
import monitoringPrometheusRuleQuery from '@/queries/monitoring/PrometheusRuleView.graphql'
import prometheusRuleEdit from '@/queries/monitoring/PrometheusRuleEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, usePrometheusRule, sanitizeData, getProperties } from './PrometheusRule.js'
const data = ref({});
const { patchDone, patchError, notifyWorking, onNotPrometheusRuleFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = usePrometheusRule();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(monitoringPrometheusRuleQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchPrometheusRule, onDone: onPatchPrometheusRule, onError: onPatchError } = useMutation(prometheusRuleEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchPrometheusRule({"namespace": result.value.monitoringPrometheusRule.metadata.namespace, "name": result.value.monitoringPrometheusRule.metadata.name, "spec": sanitizeData(data.value)});
}
onError(onErrorHandler);onResult(onNotPrometheusRuleFound);onPatchPrometheusRule(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.monitoringPrometheusRule!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">PrometheusRule</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.monitoringPrometheusRule.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.monitoringPrometheusRule!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.monitoringPrometheusRule!=null && result.monitoringPrometheusRule.status != null">
          <DefaultStatusView :status="result.monitoringPrometheusRule.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && result.monitoringPrometheusRule!=null" class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="data"
          :in="result.monitoringPrometheusRule"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>
