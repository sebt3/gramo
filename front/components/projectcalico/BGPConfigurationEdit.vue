<script setup lang="ts">
import projectcalicoBGPConfigurationQuery from '@/queries/projectcalico/BGPConfigurationView.graphql'
import bGPConfigurationEdit from '@/queries/projectcalico/BGPConfigurationEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useBGPConfiguration, sanitizeData, getProperties } from './BGPConfiguration.js'
const data = ref({});
const { patchDone, patchError, notifyWorking, onNotBGPConfigurationFound, setItemFromRoute, navigation, onErrorHandler } = useBGPConfiguration();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoBGPConfigurationQuery, {"name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchBGPConfiguration, onDone: onPatchBGPConfiguration, onError: onPatchError } = useMutation(bGPConfigurationEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchBGPConfiguration({"name": result.value.projectcalicoBGPConfiguration.metadata.name, "spec": sanitizeData(data.value)});
}
onError(onErrorHandler);onResult(onNotBGPConfigurationFound);onPatchBGPConfiguration(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.projectcalicoBGPConfiguration!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">BGPConfiguration</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.projectcalicoBGPConfiguration.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.projectcalicoBGPConfiguration!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.projectcalicoBGPConfiguration!=null && result.projectcalicoBGPConfiguration.status != null">
          <DefaultStatusView :status="result.projectcalicoBGPConfiguration.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && result.projectcalicoBGPConfiguration!=null" class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="data"
          :in="result.projectcalicoBGPConfiguration"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>
