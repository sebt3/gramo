<script setup lang="ts">
import fluxcdImagePolicyQuery from '@/queries/fluxcd/ImagePolicyView.graphql'
import imagePolicyEdit from '@/queries/fluxcd/ImagePolicyEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import { ref, useQuery, useMutation, useImagePolicy, sanitizeData, getProperties } from './ImagePolicy.js'
const data = ref({});
const { patchDone, patchError, notifyWorking, onNotImagePolicyFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useImagePolicy();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(fluxcdImagePolicyQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchImagePolicy, onDone: onPatchImagePolicy, onError: onPatchError } = useMutation(imagePolicyEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchImagePolicy({"namespace": navigation.currentNamespace, "name": result.value.fluxcdImagePolicy.metadata.name, "spec": sanitizeData(data.value)});
}
onError(onErrorHandler);onResult(onNotImagePolicyFound);onPatchImagePolicy(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.fluxcdImagePolicy!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">ImagePolicy</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.fluxcdImagePolicy.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.fluxcdImagePolicy!=null" class="q-ma-sm">
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
    <q-card bordered v-if="!loading && result.fluxcdImagePolicy!=null" class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="data"
          :in="result.fluxcdImagePolicy"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>
