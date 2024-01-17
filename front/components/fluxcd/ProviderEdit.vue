<script setup lang="ts">
import fluxcdProviderQuery from '@/queries/fluxcd/ProviderView.graphql'
import providerEdit from '@/queries/fluxcd/ProviderEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useProvider, sanitizeData, getProperties } from './Provider.js'
const data = ref({});
const { patchDone, patchError, notifyWorking, onNotProviderFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useProvider();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(fluxcdProviderQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchProvider, onDone: onPatchProvider, onError: onPatchError } = useMutation(providerEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchProvider({"namespace": navigation.currentNamespace, "name": result.value.fluxcdProvider.metadata.name, "spec": sanitizeData(data.value)});
}
onError(onErrorHandler);onResult(onNotProviderFound);onPatchProvider(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.fluxcdProvider!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Provider</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.fluxcdProvider.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.fluxcdProvider!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.fluxcdProvider!=null && result.fluxcdProvider.status != null">
          <DefaultStatusView :status="result.fluxcdProvider.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && result.fluxcdProvider!=null" class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="data"
          :in="result.fluxcdProvider"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>
