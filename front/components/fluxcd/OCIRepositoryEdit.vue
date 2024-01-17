<script setup lang="ts">
import fluxcdOCIRepositoryQuery from '@/queries/fluxcd/OCIRepositoryView.graphql'
import oCIRepositoryEdit from '@/queries/fluxcd/OCIRepositoryEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useOCIRepository, sanitizeData, getProperties } from './OCIRepository.js'
const data = ref({});
const { patchDone, patchError, notifyWorking, onNotOCIRepositoryFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useOCIRepository();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(fluxcdOCIRepositoryQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchOCIRepository, onDone: onPatchOCIRepository, onError: onPatchError } = useMutation(oCIRepositoryEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchOCIRepository({"namespace": navigation.currentNamespace, "name": result.value.fluxcdOCIRepository.metadata.name, "spec": sanitizeData(data.value)});
}
onError(onErrorHandler);onResult(onNotOCIRepositoryFound);onPatchOCIRepository(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.fluxcdOCIRepository!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">OCIRepository</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.fluxcdOCIRepository.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.fluxcdOCIRepository!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.fluxcdOCIRepository!=null && result.fluxcdOCIRepository.status != null">
          <DefaultStatusView :status="result.fluxcdOCIRepository.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && result.fluxcdOCIRepository!=null" class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="data"
          :in="result.fluxcdOCIRepository"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>
