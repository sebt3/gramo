<script setup lang="ts">
import fluxcdReceiverQuery from '@/queries/fluxcd/ReceiverView.graphql'
import receiverEdit from '@/queries/fluxcd/ReceiverEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useReceiver, sanitizeData, getProperties } from './Receiver.js'
const data = ref({});
const { patchDone, patchError, notifyWorking, onNotReceiverFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useReceiver();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(fluxcdReceiverQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchReceiver, onDone: onPatchReceiver, onError: onPatchError } = useMutation(receiverEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchReceiver({"namespace": navigation.currentNamespace, "name": result.value.fluxcdReceiver.metadata.name, "spec": sanitizeData(data.value)});
}
onError(onErrorHandler);onResult(onNotReceiverFound);onPatchReceiver(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.fluxcdReceiver!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Receiver</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.fluxcdReceiver.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.fluxcdReceiver!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.fluxcdReceiver!=null && result.fluxcdReceiver.status != null">
          <DefaultStatusView :status="result.fluxcdReceiver.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && result.fluxcdReceiver!=null" class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="data"
          :in="result.fluxcdReceiver"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>
