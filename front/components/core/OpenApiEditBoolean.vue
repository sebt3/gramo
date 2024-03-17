<script setup lang="ts">
const emit = defineEmits(['update:data'])
const props = withDefaults(defineProps<{
  name: string
  data: boolean|null|undefined
  defaultdata?: boolean,
  description?: string,
  readOnly?: boolean
}>(), {
  readOnly: false
});
import { defineAsyncComponent, ref, computed, watch } from 'vue'
import { elude } from "../../libs/core/"
const max_len   = 150;
const value     = ref(props.data)
const isDefault = computed(() => value.value == props.defaultdata || (props.defaultdata ==undefined && value.value == null))
if (!props.readOnly) watch(value,(newValue) => emit('update:data', newValue));
const OpenApiNamedIcon = defineAsyncComponent(() => import( './OpenApiNamedIcon.vue'));
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
