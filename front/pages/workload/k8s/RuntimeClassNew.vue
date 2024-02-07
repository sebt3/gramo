<script setup lang="ts">
import RuntimeClassNew from '@/queries/k8s/RuntimeClass.create.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MetadataNew from '@/components/core/MetadataNew.vue';
import { ref, useQuery, useMutation, useRuntimeClass, RuntimeClassDefinition, sanitizeData, getProperties } from '@/libs/k8s/RuntimeClass.js'
const name = ref('');
const handler  = ref({});
const overhead  = ref({});
const scheduling  = ref({});
const { router, navigation, setItemFromRoute, notifySuccess, notifyError, notifyWorking } = useRuntimeClass();setItemFromRoute();
const { mutate, onDone, onError } = useMutation(RuntimeClassNew);
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
    "handler": sanitizeData(handler.value),
    "overhead": sanitizeData(overhead.value),
    "scheduling": sanitizeData(scheduling.value),
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
          v-model:out="handler"
          :properties="getProperties(RuntimeClassDefinition.properties.handler)"
        />
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="overhead"
          :properties="getProperties(RuntimeClassDefinition.properties.overhead)"
        />
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="scheduling"
          :properties="getProperties(RuntimeClassDefinition.properties.scheduling)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>