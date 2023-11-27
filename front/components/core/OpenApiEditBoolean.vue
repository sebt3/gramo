<script setup lang="ts">
import OpenApiNamedIcon from './OpenApiNamedIcon.vue';

import { ref, computed, watch } from 'vue'
const props = withDefaults(defineProps<{
  name: string
  data: boolean|null
  defaultdata?: boolean,
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
  <q-field :label="name" stack-label borderless :label-color="isDefault?'':'secondary'">
    <template v-if="['name', 'namespace', 'app-group', 'enable', 'domain', 'domain-name', 'issuer', 'ingress-class', 'pullPolicy', 'registry', 'repository', 'tag', 'key', 'engine', 'username', 'dbname'].includes(name)" v-slot:prepend>
      <OpenApiNamedIcon :name="name" :is-default="isDefault" />
    </template>
    <template v-slot:control>
      <q-toggle v-model="value" checked-icon="check" color="green" unchecked-icon="clear" :disable="readOnly" />
    </template>
  </q-field>
</template>
