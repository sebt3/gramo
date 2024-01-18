<script setup lang="ts">
import k8upCheckQuery from '@/queries/k8up/CheckView.graphql'
import checkEdit from '@/queries/k8up/CheckEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useCheck, sanitizeData, getProperties } from './Check.js'
const data = ref({});
const { patchDone, patchError, notifyWorking, onNotCheckFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useCheck();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8upCheckQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchCheck, onDone: onPatchCheck, onError: onPatchError } = useMutation(checkEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchCheck({"namespace": result.value.k8upCheck.metadata.namespace, "name": result.value.k8upCheck.metadata.name, "spec": sanitizeData(data.value)});
}
onError(onErrorHandler);onResult(onNotCheckFound);onPatchCheck(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8upCheck!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Check</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8upCheck.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8upCheck!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8upCheck!=null && result.k8upCheck.status != null">
          <DefaultStatusView :status="result.k8upCheck.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && result.k8upCheck!=null" class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="data"
          :in="result.k8upCheck"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>
