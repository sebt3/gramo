<script setup lang="ts">
import OpenApiNamedIcon from './OpenApiNamedIcon.vue';

import { ref, computed, watch } from 'vue'
const props = withDefaults(defineProps<{
  name: string
  data: number|null
  defaultdata?: number,
  readOnly?: boolean
}>(), {
  readOnly: false
});
const value=ref(props.data)
const emit = defineEmits(['update:data'])
watch(value,(newValue) => emit('update:data', newValue))
const isDefault=computed(() => value.value == props.defaultdata || (props.defaultdata ==undefined && value.value == null))
</script>
<template>
  <div v-if="readOnly">
    <q-field :label="name" stack-label borderless :label-color="isDefault?'':'secondary'">
    <template v-slot:prepend>
      <OpenApiNamedIcon :name="name" :is-default="isDefault" />
    </template>
    <template v-slot:control>
      <div class="self-center full-width no-outline" tabindex="0">{{ value }}</div>
    </template>
  </q-field>
  </div>
  <div v-else>
    <q-input v-model="value" :label="name" :label-color="isDefault?'':'secondary'" :type="'number'">
    <template v-slot:prepend>
      <OpenApiNamedIcon :name="name" :is-default="isDefault" />
    </template>
  </q-input>
  </div>
</template>
