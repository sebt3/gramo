<script setup lang="ts">
const props = defineProps<{status: object}>();
console.log(props)
</script>
<template>
  <div class="q-gutter-md">
    <div v-if="Object.keys(status).includes('conditions')">
      <q-field label="Conditions" stack-label borderless>
        <template v-slot:prepend><q-icon name="dashboard" /></template>
        <template v-slot:control><div class="self-center full-width no-outline" tabindex="0">{{ status['conditions'] }}</div></template>
      </q-field>
    </div>
  </div>
</template>
