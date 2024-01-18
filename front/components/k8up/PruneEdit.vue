<script setup lang="ts">
import k8upPruneQuery from '@/queries/k8up/PruneView.graphql'
import pruneEdit from '@/queries/k8up/PruneEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, usePrune, sanitizeData, getProperties } from './Prune.js'
const data = ref({});
const { patchDone, patchError, notifyWorking, onNotPruneFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = usePrune();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8upPruneQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchPrune, onDone: onPatchPrune, onError: onPatchError } = useMutation(pruneEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchPrune({"namespace": result.value.k8upPrune.metadata.namespace, "name": result.value.k8upPrune.metadata.name, "spec": sanitizeData(data.value)});
}
onError(onErrorHandler);onResult(onNotPruneFound);onPatchPrune(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8upPrune!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Prune</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8upPrune.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8upPrune!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8upPrune!=null && result.k8upPrune.status != null">
          <DefaultStatusView :status="result.k8upPrune.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && result.k8upPrune!=null" class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="data"
          :in="result.k8upPrune"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>
