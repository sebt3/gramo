<script setup lang="ts">
import monitoringPrometheusQuery from '@/queries/monitoring/PrometheusView.graphql'
import prometheusEdit from '@/queries/monitoring/PrometheusEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, usePrometheus, sanitizeData, getProperties } from './Prometheus.js'
const data = ref({});
const { patchDone, patchError, notifyWorking, onNotPrometheusFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = usePrometheus();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(monitoringPrometheusQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchPrometheus, onDone: onPatchPrometheus, onError: onPatchError } = useMutation(prometheusEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchPrometheus({"namespace": result.value.monitoringPrometheus.metadata.namespace, "name": result.value.monitoringPrometheus.metadata.name, "spec": sanitizeData(data.value)});
}
onError(onErrorHandler);onResult(onNotPrometheusFound);onPatchPrometheus(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.monitoringPrometheus!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Prometheus</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.monitoringPrometheus.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.monitoringPrometheus!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.monitoringPrometheus!=null && result.monitoringPrometheus.status != null">
          <DefaultStatusView :status="result.monitoringPrometheus.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && result.monitoringPrometheus!=null" class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="data"
          :in="result.monitoringPrometheus"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>
