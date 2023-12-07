<script setup lang="ts">
import customResourceDefinition from '@/queries/core/CustomResourceDefinition.graphql'
import distribNew from '@/queries/vynil/DistribNew.graphql'
import OpenApiEdit from '../core/OpenApiEdit.vue';
import { ref, useQuery, useMutation, useDistrib, sanitizeData, getProperties } from './Distrib.js'
const name = ref('');
const data = ref({});
const { router, setItemFromRoute, notifySuccess, notifyError, notifyWorking } = useDistrib();setItemFromRoute();
const { result, loading } = useQuery(customResourceDefinition, {"name": 'distribs.vynil.solidite.fr'});
const { mutate, onDone, onError } = useMutation(distribNew);
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
  mutate({"name": name.value, "spec": sanitizeData(data.value)});
}
</script>
<template>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Metadata</div>
      </q-card-section>
      <q-card-section>
        <q-input v-model="name" label="Name"></q-input>
      </q-card-section>
    </q-card>
    <q-card bordered class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
      </q-card-section>
      <q-card-section v-if="!loading">
        <OpenApiEdit
          v-model:out="data"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>
