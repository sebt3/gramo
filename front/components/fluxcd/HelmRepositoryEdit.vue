<script setup lang="ts">
import fluxcdHelmRepositoryQuery from '@/queries/fluxcd/HelmRepositoryView.graphql'
import helmRepositoryEdit from '@/queries/fluxcd/HelmRepositoryEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useHelmRepository, sanitizeData, getProperties } from './HelmRepository.js'
const data = ref({});
const { patchDone, patchError, notifyWorking, onNotHelmRepositoryFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useHelmRepository();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(fluxcdHelmRepositoryQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchHelmRepository, onDone: onPatchHelmRepository, onError: onPatchError } = useMutation(helmRepositoryEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchHelmRepository({"namespace": navigation.currentNamespace, "name": result.value.fluxcdHelmRepository.metadata.name, "spec": sanitizeData(data.value)});
}
onError(onErrorHandler);onResult(onNotHelmRepositoryFound);onPatchHelmRepository(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.fluxcdHelmRepository!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">HelmRepository</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.fluxcdHelmRepository.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.fluxcdHelmRepository!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.fluxcdHelmRepository!=null && result.fluxcdHelmRepository.status != null">
          <DefaultStatusView :status="result.fluxcdHelmRepository.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && result.fluxcdHelmRepository!=null" class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="data"
          :in="result.fluxcdHelmRepository"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>
