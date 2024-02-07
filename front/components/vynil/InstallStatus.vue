<script setup lang="ts">
// noGramoGenerator
defineProps<{model: object}>();
</script>
<template>
  <q-card bordered v-if="model.status != null" class="q-ma-sm">
    <q-card-section>
      <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
    </q-card-section>
    <q-card-section>
      <div class="q-gutter-md">
            <q-field label="Status" stack-label borderless>
              <template v-slot:prepend><q-icon name="done" /></template>
              <template v-slot:control>
                <q-chip class="float-right text-white text-capitalize" :label="model.status.status" color="warning" v-if="['planning','installing'].includes(model.status.status)"></q-chip>
                <q-chip class="float-right text-white text-capitalize" :label="model.status.status" color="positive" v-if="model.status.status=='installed'"></q-chip>
                <q-chip class="float-right text-white text-capitalize" :label="model.status.status" color="negative" v-if="model.status.status=='errors'"></q-chip>
                <q-chip class="float-right text-white text-capitalize" :label="model.status.status" color="info" v-if="!['installed','planning','installing','errors'].includes(model.status.status)"></q-chip>
              </template>
            </q-field>
            <q-field label="Errors" stack-label borderless v-if="model.status.errors.length>0">
              <template v-slot:prepend><q-icon name="error" /></template>
              <template v-slot:control><div class="self-center full-width no-outline" tabindex="0">
                <div v-for="err in model.status.errors" v-bind:key="err">{{ err }}</div>
              </div></template>
            </q-field>
          </div>
    </q-card-section>
  </q-card>
</template>
