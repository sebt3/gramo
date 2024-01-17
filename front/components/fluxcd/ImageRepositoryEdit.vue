<script setup lang="ts">
import fluxcdImageRepositoryQuery from '@/queries/fluxcd/ImageRepositoryView.graphql'
import imageRepositoryEdit from '@/queries/fluxcd/ImageRepositoryEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useImageRepository, sanitizeData, getProperties } from './ImageRepository.js'
const data = ref({});
const { patchDone, patchError, notifyWorking, onNotImageRepositoryFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useImageRepository();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(fluxcdImageRepositoryQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchImageRepository, onDone: onPatchImageRepository, onError: onPatchError } = useMutation(imageRepositoryEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchImageRepository({"namespace": navigation.currentNamespace, "name": result.value.fluxcdImageRepository.metadata.name, "spec": sanitizeData(data.value)});
}
onError(onErrorHandler);onResult(onNotImageRepositoryFound);onPatchImageRepository(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.fluxcdImageRepository!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">ImageRepository</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.fluxcdImageRepository.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.fluxcdImageRepository!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.fluxcdImageRepository!=null && result.fluxcdImageRepository.status != null">
          <DefaultStatusView :status="result.fluxcdImageRepository.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && result.fluxcdImageRepository!=null" class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="data"
          :in="result.fluxcdImageRepository"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>
