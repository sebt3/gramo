<script setup lang="ts">
import EndpointSliceNew from '@/queries/k8s/EndpointSlice.create.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MetadataNew from '@/components/core/MetadataNew.vue';
import { ref, useQuery, useMutation, useEndpointSlice, EndpointSliceDefinition, sanitizeData, getProperties } from '@/libs/k8s/EndpointSlice.js'
const name = ref('');
const addressType  = ref({});
const endpoints  = ref({});
const ports  = ref({});
const { router, navigation, setNamespacedItemFromRoute, notifySuccess, notifyError, notifyWorking } = useEndpointSlice();setNamespacedItemFromRoute();
const { mutate, onDone, onError } = useMutation(EndpointSliceNew);
onDone(() => {
  notifySuccess('Creation proceded');
  router.go(-1);
})
onError((err) => {
  notifyError('Creation failed');
  console.log('mutation error',err);
})
function onSubmit() {
  notifyWorking('Create in progress');
  mutate({
    "namespace": navigation.currentNamespace.value,
    "name": name.value,
    "addressType": sanitizeData(addressType.value),
    "endpoints": sanitizeData(endpoints.value),
    "ports": sanitizeData(ports.value),
  });
}
</script>
<template>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Metadata</div>
      </q-card-section>
      <q-card-section>
        <MetadataNew v-model:name="name" :namespaced="true" />
      </q-card-section>
    </q-card>
    <q-card bordered class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="addressType"
          :properties="getProperties(EndpointSliceDefinition.properties.addressType)"
        />
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="endpoints"
          :properties="getProperties(EndpointSliceDefinition.properties.endpoints)"
        />
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="ports"
          :properties="getProperties(EndpointSliceDefinition.properties.ports)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>