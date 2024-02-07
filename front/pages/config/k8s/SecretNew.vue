<script setup lang="ts">
import SecretNew from '@/queries/k8s/Secret.create.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MetadataNew from '@/components/core/MetadataNew.vue';
import { ref, useQuery, useMutation, useSecret, SecretDefinition, sanitizeData, getProperties } from '@/libs/k8s/Secret.js'
const name = ref('');
const data  = ref({});
const immutable  = ref({});
const stringData  = ref({});
const type  = ref({});
const { router, navigation, setNamespacedItemFromRoute, notifySuccess, notifyError, notifyWorking } = useSecret();setNamespacedItemFromRoute();
const { mutate, onDone, onError } = useMutation(SecretNew);
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
    "data": sanitizeData(data.value),
    "immutable": sanitizeData(immutable.value),
    "stringData": sanitizeData(stringData.value),
    "type": sanitizeData(type.value),
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
          v-model:out="data"
          :properties="getProperties(SecretDefinition.properties.data)"
        />
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="immutable"
          :properties="getProperties(SecretDefinition.properties.immutable)"
        />
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="stringData"
          :properties="getProperties(SecretDefinition.properties.stringData)"
        />
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="type"
          :properties="getProperties(SecretDefinition.properties.type)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>