<script setup lang="ts">
import secretgeneratorStringSecretQuery from '@/queries/secretgenerator/StringSecretView.graphql'
import stringSecretEdit from '@/queries/secretgenerator/StringSecretEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useStringSecret, sanitizeData, getProperties } from './StringSecret.js'
const data = ref({});
const { patchDone, patchError, notifyWorking, onNotStringSecretFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useStringSecret();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(secretgeneratorStringSecretQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchStringSecret, onDone: onPatchStringSecret, onError: onPatchError } = useMutation(stringSecretEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchStringSecret({"namespace": navigation.currentNamespace, "name": result.value.secretgeneratorStringSecret.metadata.name, "spec": sanitizeData(data.value)});
}
onError(onErrorHandler);onResult(onNotStringSecretFound);onPatchStringSecret(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.secretgeneratorStringSecret!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">StringSecret</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.secretgeneratorStringSecret.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.secretgeneratorStringSecret!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.secretgeneratorStringSecret!=null && result.secretgeneratorStringSecret.status != null">
          <DefaultStatusView :status="result.secretgeneratorStringSecret.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && result.secretgeneratorStringSecret!=null" class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="data"
          :in="result.secretgeneratorStringSecret"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>
