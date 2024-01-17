<script setup lang="ts">
import fluxcdHelmChartQuery from '@/queries/fluxcd/HelmChartView.graphql'
import helmChartEdit from '@/queries/fluxcd/HelmChartEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useHelmChart, sanitizeData, getProperties } from './HelmChart.js'
const data = ref({});
const { patchDone, patchError, notifyWorking, onNotHelmChartFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useHelmChart();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(fluxcdHelmChartQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchHelmChart, onDone: onPatchHelmChart, onError: onPatchError } = useMutation(helmChartEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchHelmChart({"namespace": navigation.currentNamespace, "name": result.value.fluxcdHelmChart.metadata.name, "spec": sanitizeData(data.value)});
}
onError(onErrorHandler);onResult(onNotHelmChartFound);onPatchHelmChart(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.fluxcdHelmChart!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">HelmChart</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.fluxcdHelmChart.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.fluxcdHelmChart!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.fluxcdHelmChart!=null && result.fluxcdHelmChart.status != null">
          <DefaultStatusView :status="result.fluxcdHelmChart.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && result.fluxcdHelmChart!=null" class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="data"
          :in="result.fluxcdHelmChart"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>
