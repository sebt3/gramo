<script setup lang="ts">
import monitoringProbeQuery from '@/queries/monitoring/ProbeView.graphql'
import probeEdit from '@/queries/monitoring/ProbeEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useProbe, sanitizeData, getProperties } from './Probe.js'
const data = ref({});
const { patchDone, patchError, notifyWorking, onNotProbeFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useProbe();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(monitoringProbeQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchProbe, onDone: onPatchProbe, onError: onPatchError } = useMutation(probeEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchProbe({"namespace": result.value.monitoringProbe.metadata.namespace, "name": result.value.monitoringProbe.metadata.name, "spec": sanitizeData(data.value)});
}
onError(onErrorHandler);onResult(onNotProbeFound);onPatchProbe(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.monitoringProbe!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Probe</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.monitoringProbe.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.monitoringProbe!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.monitoringProbe!=null && result.monitoringProbe.status != null">
          <DefaultStatusView :status="result.monitoringProbe.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && result.monitoringProbe!=null" class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="data"
          :in="result.monitoringProbe"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>
