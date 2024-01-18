<script setup lang="ts">
import secretgeneratorBasicAuthQuery from '@/queries/secretgenerator/BasicAuthView.graphql'
import basicAuthEdit from '@/queries/secretgenerator/BasicAuthEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useBasicAuth, sanitizeData, getProperties } from './BasicAuth.js'
const data = ref({});
const { patchDone, patchError, notifyWorking, onNotBasicAuthFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useBasicAuth();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(secretgeneratorBasicAuthQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchBasicAuth, onDone: onPatchBasicAuth, onError: onPatchError } = useMutation(basicAuthEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchBasicAuth({"namespace": result.value.secretgeneratorBasicAuth.metadata.namespace, "name": result.value.secretgeneratorBasicAuth.metadata.name, "spec": sanitizeData(data.value)});
}
onError(onErrorHandler);onResult(onNotBasicAuthFound);onPatchBasicAuth(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.secretgeneratorBasicAuth!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">BasicAuth</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.secretgeneratorBasicAuth.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.secretgeneratorBasicAuth!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.secretgeneratorBasicAuth!=null && result.secretgeneratorBasicAuth.status != null">
          <DefaultStatusView :status="result.secretgeneratorBasicAuth.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && result.secretgeneratorBasicAuth!=null" class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="data"
          :in="result.secretgeneratorBasicAuth"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>
