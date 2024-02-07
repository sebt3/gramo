<script setup lang="ts">
import PriorityClassNew from '@/queries/k8s/PriorityClass.create.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MetadataNew from '@/components/core/MetadataNew.vue';
import { ref, useQuery, useMutation, usePriorityClass, PriorityClassDefinition, sanitizeData, getProperties } from '@/libs/k8s/PriorityClass.js'
const name = ref('');
const description  = ref({});
const globalDefault  = ref({});
const preemptionPolicy  = ref({});
const value  = ref({});
const { router, navigation, setItemFromRoute, notifySuccess, notifyError, notifyWorking } = usePriorityClass();setItemFromRoute();
const { mutate, onDone, onError } = useMutation(PriorityClassNew);
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
    "description": sanitizeData(description.value),
    "globalDefault": sanitizeData(globalDefault.value),
    "preemptionPolicy": sanitizeData(preemptionPolicy.value),
    "value": sanitizeData(value.value),
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
          v-model:out="description"
          :properties="getProperties(PriorityClassDefinition.properties.description)"
        />
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="globalDefault"
          :properties="getProperties(PriorityClassDefinition.properties.globalDefault)"
        />
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="preemptionPolicy"
          :properties="getProperties(PriorityClassDefinition.properties.preemptionPolicy)"
        />
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="value"
          :properties="getProperties(PriorityClassDefinition.properties.value)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>