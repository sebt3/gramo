<script setup lang="ts">
import monitoringAlertmanagerQuery from '@/queries/monitoring/AlertmanagerView.graphql'
import alertmanagerEdit from '@/queries/monitoring/AlertmanagerEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useAlertmanager, sanitizeData, getProperties } from './Alertmanager.js'
const data = ref({});
const { patchDone, patchError, notifyWorking, onNotAlertmanagerFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useAlertmanager();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(monitoringAlertmanagerQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchAlertmanager, onDone: onPatchAlertmanager, onError: onPatchError } = useMutation(alertmanagerEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchAlertmanager({"namespace": result.value.monitoringAlertmanager.metadata.namespace, "name": result.value.monitoringAlertmanager.metadata.name, "spec": sanitizeData(data.value)});
}
onError(onErrorHandler);onResult(onNotAlertmanagerFound);onPatchAlertmanager(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.monitoringAlertmanager!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Alertmanager</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.monitoringAlertmanager.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.monitoringAlertmanager!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.monitoringAlertmanager!=null && result.monitoringAlertmanager.status != null">
          <DefaultStatusView :status="result.monitoringAlertmanager.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && result.monitoringAlertmanager!=null" class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="data"
          :in="result.monitoringAlertmanager"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>
