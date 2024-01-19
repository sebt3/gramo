<script setup lang="ts">
import projectcalicoBGPPeerQuery from '@/queries/projectcalico/BGPPeerView.graphql'
import bGPPeerEdit from '@/queries/projectcalico/BGPPeerEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useBGPPeer, sanitizeData, getProperties } from './BGPPeer.js'
const data = ref({});
const { patchDone, patchError, notifyWorking, onNotBGPPeerFound, setItemFromRoute, navigation, onErrorHandler } = useBGPPeer();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoBGPPeerQuery, {"name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchBGPPeer, onDone: onPatchBGPPeer, onError: onPatchError } = useMutation(bGPPeerEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchBGPPeer({"name": result.value.projectcalicoBGPPeer.metadata.name, "spec": sanitizeData(data.value)});
}
onError(onErrorHandler);onResult(onNotBGPPeerFound);onPatchBGPPeer(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.projectcalicoBGPPeer!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">BGPPeer</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.projectcalicoBGPPeer.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.projectcalicoBGPPeer!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.projectcalicoBGPPeer!=null && result.projectcalicoBGPPeer.status != null">
          <DefaultStatusView :status="result.projectcalicoBGPPeer.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && result.projectcalicoBGPPeer!=null" class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="data"
          :in="result.projectcalicoBGPPeer"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>
