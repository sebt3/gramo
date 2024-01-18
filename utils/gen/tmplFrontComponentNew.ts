import HB from 'handlebars';
export const templateComponentNew = HB.compile(
`<script setup lang="ts">
import customResourceDefinition from '@/queries/core/CustomResourceDefinition.graphql'
import {{ miniName }}New from '@/queries/{{ mini }}/{{ name }}New.graphql'
import OpenApiEdit from '../core/OpenApiEdit.vue';
import MetadataNew from '../core/MetadataNew.vue';
import { ref, useQuery, useMutation, use{{ name }}, sanitizeData, getProperties } from './{{ name }}.js'
const name = ref('');
const data = ref({});
{{#if namespaced}}
const { router, navigation, setNamespacedItemFromRoute, notifySuccess, notifyError, notifyWorking } = use{{ name }}();setNamespacedItemFromRoute();
{{else}}
const { router, navigation, setItemFromRoute, notifySuccess, notifyError, notifyWorking } = use{{ name }}();setItemFromRoute();
{{/if}}
const { result, loading } = useQuery(customResourceDefinition, {"name": '{{ plural }}.{{ apiGroup }}'});
const { mutate, onDone, onError } = useMutation({{ miniName }}New);
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
{{#if namespaced}}
  mutate({"namespace": navigation.currentNamespace.value, "name": name.value, "spec": sanitizeData(data.value)});
{{else}}
  mutate({"name": name.value, "spec": sanitizeData(data.value)});
{{/if}}
}
</script>
<template>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Metadata</div>
      </q-card-section>
      <q-card-section>
        <MetadataNew v-model:name="name" :namespaced="{{namespaced}}" />
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
`, {noEscape: true, preventIndent: true});