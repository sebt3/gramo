<script setup lang="ts">
import OpenApiNamedIcon from './OpenApiNamedIcon.vue';
import { elude } from "../../libs/core/"
import { ref, computed, watch } from 'vue'
const props = withDefaults(defineProps<{
  name: string
  data: boolean|null|undefined
  defaultdata?: boolean,
  description?: string,
  readOnly?: boolean
}>(), {
  readOnly: false
});
const max_len=150;
const value=ref(props.data)
const emit = defineEmits(['update:data'])
watch(value,(newValue) => emit('update:data', newValue))
const isDefault=computed(() => value.value == props.defaultdata || (props.defaultdata ==undefined && value.value == null))
</script>
<template>
  <q-field :label="name" stack-label borderless :bottom-slots="description?true:false"  :label-color="isDefault?'':'secondary'">
    <template v-slot:hint v-if="description">
      <div>{{ description?elude(description,max_len):'---' }}<q-tooltip v-if="description&&description.length>max_len"><div v-html="description.replaceAll('\n','<br>')"></div></q-tooltip></div>
    </template>
    <template v-slot:prepend>
      <OpenApiNamedIcon :name="name" :is-default="isDefault" />
    </template>
    <template v-slot:control>
      <q-toggle v-model="value" checked-icon="check" color="green" unchecked-icon="clear" :disable="readOnly" />
    </template>
  </q-field>
</template>
