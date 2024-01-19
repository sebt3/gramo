<script setup lang="ts">
import projectcalicoFelixConfigurationQuery from '@/queries/projectcalico/FelixConfigurationView.graphql'
import felixConfigurationEdit from '@/queries/projectcalico/FelixConfigurationEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useFelixConfiguration, sanitizeData, getProperties } from './FelixConfiguration.js'
const data = ref({});
const { patchDone, patchError, notifyWorking, onNotFelixConfigurationFound, setItemFromRoute, navigation, onErrorHandler } = useFelixConfiguration();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoFelixConfigurationQuery, {"name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchFelixConfiguration, onDone: onPatchFelixConfiguration, onError: onPatchError } = useMutation(felixConfigurationEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchFelixConfiguration({"name": result.value.projectcalicoFelixConfiguration.metadata.name, "spec": sanitizeData(data.value)});
}
onError(onErrorHandler);onResult(onNotFelixConfigurationFound);onPatchFelixConfiguration(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.projectcalicoFelixConfiguration!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">FelixConfiguration</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.projectcalicoFelixConfiguration.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.projectcalicoFelixConfiguration!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.projectcalicoFelixConfiguration!=null && result.projectcalicoFelixConfiguration.status != null">
          <DefaultStatusView :status="result.projectcalicoFelixConfiguration.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && result.projectcalicoFelixConfiguration!=null" class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="data"
          :in="result.projectcalicoFelixConfiguration"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>
