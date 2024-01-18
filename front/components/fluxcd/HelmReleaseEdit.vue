<script setup lang="ts">
import fluxcdHelmReleaseQuery from '@/queries/fluxcd/HelmReleaseView.graphql'
import helmReleaseEdit from '@/queries/fluxcd/HelmReleaseEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useHelmRelease, sanitizeData, getProperties } from './HelmRelease.js'
const data = ref({});
const { patchDone, patchError, notifyWorking, onNotHelmReleaseFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useHelmRelease();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(fluxcdHelmReleaseQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchHelmRelease, onDone: onPatchHelmRelease, onError: onPatchError } = useMutation(helmReleaseEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchHelmRelease({"namespace": result.value.fluxcdHelmRelease.metadata.namespace, "name": result.value.fluxcdHelmRelease.metadata.name, "spec": sanitizeData(data.value)});
}
onError(onErrorHandler);onResult(onNotHelmReleaseFound);onPatchHelmRelease(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.fluxcdHelmRelease!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">HelmRelease</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.fluxcdHelmRelease.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.fluxcdHelmRelease!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.fluxcdHelmRelease!=null && result.fluxcdHelmRelease.status != null">
          <DefaultStatusView :status="result.fluxcdHelmRelease.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && result.fluxcdHelmRelease!=null" class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="data"
          :in="result.fluxcdHelmRelease"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>
