<script setup lang="ts">
import OpenApiNamedIcon from './OpenApiNamedIcon.vue';
import { ref, computed, watch } from 'vue'
const props = withDefaults(defineProps<{
  name: string
  data: string|null
  defaultdata?: string
  enum: string[]
  readOnly?: boolean
}>(), {
  readOnly: false,
});
const value=ref(props.data)
const emit = defineEmits(['update:data', 'delete'])
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
      <div class="self-center full-width no-outline" v-if="value!=null && value.includes('\n')"><pre>{{ value }}</pre></div>
      <div class="self-center full-width no-outline" v-else-if="value!=null">{{ value }}</div>
    </template>
  </q-field>
  </div>
  <div v-else>
    <q-select v-model="value" :options="props.enum" :label="name" :label-color="isDefault?'':'secondary'">
      <template v-slot:prepend>
        <OpenApiNamedIcon :name="name" :is-default="isDefault" />
      </template>
    </q-select>
  </div>
</template>
