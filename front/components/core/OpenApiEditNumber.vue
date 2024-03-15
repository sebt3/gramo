<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
const  OpenApiNamedIcon   = defineAsyncComponent(() => import( './OpenApiNamedIcon.vue'));
import { elude } from "../../libs/core/"
import { ref, computed, watch } from 'vue'
const props = withDefaults(defineProps<{
  name: string
  data: number|string|null|undefined
  defaultdata?: number,
  description?: string,
  readOnly?: boolean
}>(), {
  readOnly: false
});
const max_len=150;
const value=ref(props.data)
const emit = defineEmits(['update:data'])
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
    <q-input v-model="value"  @blur="emit('update:data',value)" :label="name" :bottom-slots="description?true:false" :placeholder="defaultdata" :label-color="isDefault?'':'secondary'" type="number">
    <template v-slot:hint v-if="description">
      <div>{{ description?elude(description,max_len):'---' }}<q-tooltip v-if="description&&description.length>max_len"><div v-html="description.replaceAll('\n','<br>')"></div></q-tooltip></div>
    </template>
    <template v-slot:prepend>
      <OpenApiNamedIcon :name="name" :is-default="isDefault" />
    </template>
  </q-input>
  </div>
</template>
