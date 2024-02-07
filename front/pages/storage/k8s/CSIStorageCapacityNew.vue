<script setup lang="ts">
import CSIStorageCapacityNew from '@/queries/k8s/CSIStorageCapacity.create.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MetadataNew from '@/components/core/MetadataNew.vue';
import { ref, useQuery, useMutation, useCSIStorageCapacity, CSIStorageCapacityDefinition, sanitizeData, getProperties } from '@/libs/k8s/CSIStorageCapacity.js'
const name = ref('');
const capacity  = ref({});
const maximumVolumeSize  = ref({});
const nodeTopology  = ref({});
const storageClassName  = ref({});
const { router, navigation, setNamespacedItemFromRoute, notifySuccess, notifyError, notifyWorking } = useCSIStorageCapacity();setNamespacedItemFromRoute();
const { mutate, onDone, onError } = useMutation(CSIStorageCapacityNew);
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
    "capacity": sanitizeData(capacity.value),
    "maximumVolumeSize": sanitizeData(maximumVolumeSize.value),
    "nodeTopology": sanitizeData(nodeTopology.value),
    "storageClassName": sanitizeData(storageClassName.value),
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
          v-model:out="capacity"
          :properties="getProperties(CSIStorageCapacityDefinition.properties.capacity)"
        />
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="maximumVolumeSize"
          :properties="getProperties(CSIStorageCapacityDefinition.properties.maximumVolumeSize)"
        />
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="nodeTopology"
          :properties="getProperties(CSIStorageCapacityDefinition.properties.nodeTopology)"
        />
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="storageClassName"
          :properties="getProperties(CSIStorageCapacityDefinition.properties.storageClassName)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>