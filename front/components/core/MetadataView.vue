<script setup lang="ts">
const { metadataType } = await import("../../libs/core/interfaces")
const { elude } = await import("../../libs/core/")
const { i18n } = await import("../../libs/i18n")
defineProps<{
  metadata: metadataType,
  to?: object,
  nameTo?: object
}>();
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
      <q-field :label="i18n.global.t('meta.namespace')" stack-label borderless>
        <template v-slot:prepend><q-icon name="dashboard" /></template>
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0" v-if="to"><router-link :to="to">{{ metadata.namespace }}</router-link></div>
          <div class="self-center full-width no-outline" tabindex="0" v-else>{{ metadata.namespace }}</div>
        </template>
      </q-field>
    </div><div>
      <q-field :label="i18n.global.t('meta.name')" stack-label borderless>
        <template v-slot:prepend><q-icon name="smart_button" /></template>
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0" v-if="nameTo"><router-link :to="nameTo">{{ metadata.name }}</router-link></div>
          <div class="self-center full-width no-outline" tabindex="0" v-else>{{ metadata.name }}</div>
        </template>
      </q-field>
    </div>
    <div v-if="metadata.annotations != undefined && Object.entries(metadata.annotations).length>0 && !nameTo">
      <q-field :label="i18n.global.t('meta.annotations')" stack-label borderless>
        <template v-slot:prepend><q-icon name="short_text" /></template>
        <template v-slot:control><div class="self-center full-width no-outline" tabindex="0">
          <span v-for="note in Object.entries(metadata.annotations).map(([name,value])=>{return {name,value}})" v-bind:key="note.name">
            <q-badge align="middle" :label="note.name"  :color="getColor(note.name)" class="q-mb-sm q-mr-sm">
              <q-badge align="middle" :label="elude(note.value as unknown as string)" :color="getColor(note.name)" class="bg-grey-1" outline />
            </q-badge>
          </span>
        </div></template>
      </q-field>
    </div><div v-if="metadata.labels != undefined && Object.entries(metadata.labels).length>0 && !nameTo">
      <q-field :label="i18n.global.t('meta.labels')" stack-label borderless>
        <template v-slot:prepend><q-icon name="label" /></template>
        <template v-slot:control><div class="self-center full-width no-outline" tabindex="0">
          <span v-for="label in Object.entries(metadata.labels).map(([name,value])=>{return {name,value}})" v-bind:key="label.name">
            <q-badge align="middle" :label="label.name"  :color="getColor(label.name)" class="q-mb-sm q-mr-sm">
              <q-badge align="middle" :label="label.value" :color="getColor(label.name)" class="bg-grey-1" outline />
            </q-badge>
          </span>
        </div></template>
      </q-field>
    </div>
  </div>
</template>
