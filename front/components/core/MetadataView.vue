<script setup lang="ts">
import { metadataType } from "./interfaces"
import { elude } from "."
defineProps<{metadata: metadataType}>();
function getColor(name) {
  const vynil = /^vynil.solidite.fr/;
  const k8s = /kubernetes.io/;
  if (k8s.test(name)) return 'primary'
  if (vynil.test(name)) return 'secondary'
  return 'info'
}
</script>
<template>
  <div class="q-gutter-md">
    <div v-if="metadata.namespace != undefined && metadata.namespace!=''">
      <q-field label="Namespace" stack-label borderless>
        <template v-slot:prepend><q-icon name="dashboard" /></template>
        <template v-slot:control><div class="self-center full-width no-outline" tabindex="0">{{ metadata.namespace }}</div></template>
      </q-field>
    </div><div>
      <q-field label="Name" stack-label borderless>
        <template v-slot:prepend><q-icon name="smart_button" /></template>
        <template v-slot:control><div class="self-center full-width no-outline" tabindex="0">{{ metadata.name }}</div></template>
      </q-field>
    </div>
    <div v-if="metadata.annotations != undefined && metadata.annotations.length>0">
      <q-field label="Annotations" stack-label borderless>
        <template v-slot:prepend><q-icon name="short_text" /></template>
        <template v-slot:control><div class="self-center full-width no-outline" tabindex="0">
          <span v-for="note in metadata.annotations" v-bind:key="note.name">
            <q-badge align="middle" :label="note.name"  :color="getColor(note.name)" class="q-mb-sm q-mr-sm">
              <q-badge align="middle" :label="elude(note.value as unknown as string)" :color="getColor(note.name)" class="bg-grey-1" outline />
            </q-badge>
          </span>
        </div></template>
      </q-field>
    </div><div v-if="metadata.labels != undefined && metadata.labels.length>0">
      <q-field label="Labels" stack-label borderless>
        <template v-slot:prepend><q-icon name="label" /></template>
        <template v-slot:control><div class="self-center full-width no-outline" tabindex="0">
          <span v-for="label in metadata.labels" v-bind:key="label.name">
            <q-badge align="middle" :label="label.name"  :color="getColor(label.name)" class="q-mb-sm q-mr-sm">
              <q-badge align="middle" :label="label.value" :color="getColor(label.name)" class="bg-grey-1" outline />
            </q-badge>
          </span>
        </div></template>
      </q-field>
    </div>
  </div>
</template>
