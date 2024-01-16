<script setup lang="ts">
import fluxcdImageUpdateAutomationQuery from '@/queries/fluxcd/ImageUpdateAutomationView.graphql'
import imageUpdateAutomationEdit from '@/queries/fluxcd/ImageUpdateAutomationEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import { ref, useQuery, useMutation, useImageUpdateAutomation, sanitizeData, getProperties } from './ImageUpdateAutomation.js'
const data = ref({});
const { patchDone, patchError, notifyWorking, onNotImageUpdateAutomationFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useImageUpdateAutomation();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(fluxcdImageUpdateAutomationQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchImageUpdateAutomation, onDone: onPatchImageUpdateAutomation, onError: onPatchError } = useMutation(imageUpdateAutomationEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchImageUpdateAutomation({"namespace": navigation.currentNamespace, "name": result.value.fluxcdImageUpdateAutomation.metadata.name, "spec": sanitizeData(data.value)});
}
onError(onErrorHandler);onResult(onNotImageUpdateAutomationFound);onPatchImageUpdateAutomation(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.fluxcdImageUpdateAutomation!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">ImageUpdateAutomation</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.fluxcdImageUpdateAutomation.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.fluxcdImageUpdateAutomation!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section>
          <div class="q-gutter-md">
          TODO
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && result.fluxcdImageUpdateAutomation!=null" class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="data"
          :in="result.fluxcdImageUpdateAutomation"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>
