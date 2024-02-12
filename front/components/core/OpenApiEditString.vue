<script setup lang="ts">
import OpenApiNamedIcon from './OpenApiNamedIcon.vue';
import { ref, computed, watch } from 'vue'
const props = withDefaults(defineProps<{
  name: string
  data: string|null
  defaultdata?: string,
  readOnly?: boolean,
  useDelete?: boolean
}>(), {
  readOnly: false,
  useDelete: false,
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
      <div class="self-center full-width no-outline" v-if="value?.includes('\n')"><pre>{{ value }}</pre></div>
      <div class="self-center full-width no-outline" v-else>{{ value }}</div>
    </template>
  </q-field>
  </div>
  <div v-else>
    <q-input v-model="value" :label="name" :label-color="isDefault?'':'secondary'" :type="value?.includes('\n')?'textarea':'text'">
      <template v-slot:prepend>
      <OpenApiNamedIcon :name="name" :is-default="isDefault" v-if="!useDelete" />
      <q-btn icon="delete" flat
          @click="$emit('delete', name)"
          v-else>
          <q-tooltip>Delete</q-tooltip>
        </q-btn>
    </template>
  </q-input>
  </div>
</template>
