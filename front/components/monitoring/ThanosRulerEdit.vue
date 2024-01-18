<script setup lang="ts">
import monitoringThanosRulerQuery from '@/queries/monitoring/ThanosRulerView.graphql'
import thanosRulerEdit from '@/queries/monitoring/ThanosRulerEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useThanosRuler, sanitizeData, getProperties } from './ThanosRuler.js'
const data = ref({});
const { patchDone, patchError, notifyWorking, onNotThanosRulerFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useThanosRuler();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(monitoringThanosRulerQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchThanosRuler, onDone: onPatchThanosRuler, onError: onPatchError } = useMutation(thanosRulerEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchThanosRuler({"namespace": result.value.monitoringThanosRuler.metadata.namespace, "name": result.value.monitoringThanosRuler.metadata.name, "spec": sanitizeData(data.value)});
}
onError(onErrorHandler);onResult(onNotThanosRulerFound);onPatchThanosRuler(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.monitoringThanosRuler!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">ThanosRuler</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.monitoringThanosRuler.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.monitoringThanosRuler!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.monitoringThanosRuler!=null && result.monitoringThanosRuler.status != null">
          <DefaultStatusView :status="result.monitoringThanosRuler.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && result.monitoringThanosRuler!=null" class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="data"
          :in="result.monitoringThanosRuler"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>
