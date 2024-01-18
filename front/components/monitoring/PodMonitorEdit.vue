<script setup lang="ts">
import monitoringPodMonitorQuery from '@/queries/monitoring/PodMonitorView.graphql'
import podMonitorEdit from '@/queries/monitoring/PodMonitorEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, usePodMonitor, sanitizeData, getProperties } from './PodMonitor.js'
const data = ref({});
const { patchDone, patchError, notifyWorking, onNotPodMonitorFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = usePodMonitor();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(monitoringPodMonitorQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchPodMonitor, onDone: onPatchPodMonitor, onError: onPatchError } = useMutation(podMonitorEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchPodMonitor({"namespace": result.value.monitoringPodMonitor.metadata.namespace, "name": result.value.monitoringPodMonitor.metadata.name, "spec": sanitizeData(data.value)});
}
onError(onErrorHandler);onResult(onNotPodMonitorFound);onPatchPodMonitor(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.monitoringPodMonitor!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">PodMonitor</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.monitoringPodMonitor.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.monitoringPodMonitor!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.monitoringPodMonitor!=null && result.monitoringPodMonitor.status != null">
          <DefaultStatusView :status="result.monitoringPodMonitor.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && result.monitoringPodMonitor!=null" class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="data"
          :in="result.monitoringPodMonitor"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>
