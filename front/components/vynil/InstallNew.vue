<script setup lang="ts">
import customResourceDefinition from '@/queries/core/CustomResourceDefinition.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import { ref, useInstall, useQuery } from './Install.js'
const name = ref('');
const data = ref({});
const { setNamespacedItemFromRoute, notifyWorking } = useInstall();setNamespacedItemFromRoute();
const { result, loading } = useQuery(customResourceDefinition, {"name": 'installs.vynil.solidite.fr'});
function onSubmit (evt) {
  notifyWorking('Create in progress');
  console.log(evt, result.value.vynilPackage.options, result.value.vynilInstall.options)
}
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-4">
      <q-card bordered v-if="!loading && result!=null && result.vynilInstall!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h5 q-mt-none q-mb-none q-pt-none q-pb-none">Install</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.vynilInstall.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-md-4">
      <q-card bordered v-if="!loading && result!=null && result.vynilInstall!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h5 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section>
          <div class="q-gutter-md">
            <q-field label="Status" stack-label borderless>
              <template v-slot:prepend><q-icon name="done" /></template>
              <template v-slot:control>
                <q-chip class="float-right text-white text-capitalize" :label="result.vynilInstall.status.status" color="warning" v-if="['planning','installing'].includes(result.vynilInstall.status.status)"></q-chip>
                <q-chip class="float-right text-white text-capitalize" :label="result.vynilInstall.status.status" color="positive" v-if="result.vynilInstall.status.status=='installed'"></q-chip>
                <q-chip class="float-right text-white text-capitalize" :label="result.vynilInstall.status.status" color="negative" v-if="result.vynilInstall.status.status=='errors'"></q-chip>
                <q-chip class="float-right text-white text-capitalize" :label="result.vynilInstall.status.status" color="info" v-if="!['installed','planning','installing','errors'].includes(result.vynilInstall.status.status)"></q-chip>
              </template>
            </q-field>
            <q-field label="Errors" stack-label borderless v-if="result.vynilInstall.status.errors.length>0">
              <template v-slot:prepend><q-icon name="error" /></template>
              <template v-slot:control><div class="self-center full-width no-outline" tabindex="0">
                <div v-for="err in result.vynilInstall.status.errors" v-bind:key="err">{{ err }}</div>
              </div></template>
            </q-field>
          </div>
        </q-card-section>
      </q-card>
    </div><div class="col-md-4">
      <q-card bordered v-if="!loading && result!=null && result.vynilInstall!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h5 q-mt-none q-mb-none q-pt-none q-pb-none">Package</div>
        </q-card-section>
        <q-card-section>
          <div class="q-gutter-md">
            <q-field label="Distribution" stack-label borderless>
              <template v-slot:prepend><q-icon name="alt_route" /></template>
              <template v-slot:control><div class="self-center full-width no-outline" tabindex="0">{{ result.vynilInstall.distrib.metadata.name }}</div></template>
            </q-field>
            <q-field label="Category" stack-label borderless>
              <template v-slot:prepend><q-icon name="category" /></template>
              <template v-slot:control><div class="self-center full-width no-outline" tabindex="0">{{ result.vynilInstall.category.name }}</div></template>
            </q-field>
            <q-field label="Name" stack-label borderless>
              <template v-slot:prepend><q-icon name="smart_button" /></template>
              <template v-slot:control><div class="self-center full-width no-outline" tabindex="0">{{ result.vynilInstall.component.name }}</div></template>
            </q-field>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card v-if="!loading">
      <q-card-section>
        <div class="text-h5 q-mt-none q-mb-none">Options</div>
      </q-card-section>
      <q-card-section>
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
