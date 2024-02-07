<script setup lang="ts">
import StorageClassNew from '@/queries/k8s/StorageClass.create.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MetadataNew from '@/components/core/MetadataNew.vue';
import { ref, useQuery, useMutation, useStorageClass, StorageClassDefinition, sanitizeData, getProperties } from '@/libs/k8s/StorageClass.js'
const name = ref('');
const allowVolumeExpansion  = ref({});
const allowedTopologies  = ref({});
const mountOptions  = ref({});
const parameters  = ref({});
const provisioner  = ref({});
const reclaimPolicy  = ref({});
const volumeBindingMode  = ref({});
const { router, navigation, setItemFromRoute, notifySuccess, notifyError, notifyWorking } = useStorageClass();setItemFromRoute();
const { mutate, onDone, onError } = useMutation(StorageClassNew);
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
    "name": name.value,
    "allowVolumeExpansion": sanitizeData(allowVolumeExpansion.value),
    "allowedTopologies": sanitizeData(allowedTopologies.value),
    "mountOptions": sanitizeData(mountOptions.value),
    "parameters": sanitizeData(parameters.value),
    "provisioner": sanitizeData(provisioner.value),
    "reclaimPolicy": sanitizeData(reclaimPolicy.value),
    "volumeBindingMode": sanitizeData(volumeBindingMode.value),
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
        <MetadataNew v-model:name="name" :namespaced="false" />
      </q-card-section>
    </q-card>
    <q-card bordered class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="allowVolumeExpansion"
          :properties="getProperties(StorageClassDefinition.properties.allowVolumeExpansion)"
        />
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="allowedTopologies"
          :properties="getProperties(StorageClassDefinition.properties.allowedTopologies)"
        />
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="mountOptions"
          :properties="getProperties(StorageClassDefinition.properties.mountOptions)"
        />
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="parameters"
          :properties="getProperties(StorageClassDefinition.properties.parameters)"
        />
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="provisioner"
          :properties="getProperties(StorageClassDefinition.properties.provisioner)"
        />
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="reclaimPolicy"
          :properties="getProperties(StorageClassDefinition.properties.reclaimPolicy)"
        />
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="volumeBindingMode"
          :properties="getProperties(StorageClassDefinition.properties.volumeBindingMode)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>