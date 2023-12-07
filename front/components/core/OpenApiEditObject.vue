<script setup lang="ts">
import OpenApiEditObject from './OpenApiEditObject.vue';
import OpenApiEditArray from './OpenApiEditArray.vue';
import OpenApiEditBoolean from './OpenApiEditBoolean.vue';
import OpenApiEditString from './OpenApiEditString.vue';
import OpenApiEditNumber from './OpenApiEditNumber.vue';

import { ref, watch } from 'vue'
import type { CSSProperties } from 'vue';
import { getCssVar } from 'quasar'
import {getProperties,getItems,getType, getFullData} from './openapiSetup';
import { OpenAPIV3 } from "openapi-types";
const props = withDefaults(defineProps<{
  name: string
  data: object
  defaultdata?: object
  properties: Map<string, OpenAPIV3.SchemaObject>
  readOnly?: boolean
  showDefault?: boolean
}>(), {
  readOnly: false,
  showDefault: true
});

const blockquoteBorderColor = ref({"border-left-color": getCssVar('primary')} as CSSProperties)
const out_handler= {};
getFullData(props.properties,out_handler,props.data);
const out = ref(out_handler)
const emit = defineEmits(['update:data'])
watch(out,(newValue) => emit('update:data', newValue),{ deep: true })
/// TODO: fix this
const isDefault = (key) => (props.defaultdata ==undefined && out[key] == null) || (props.defaultdata!= undefined && out[key] == props.defaultdata[key]);
</script>
<style scoped>
blockquote {
  margin-inline-end: 0;
  margin-inline-start: 5px;
  padding-inline-start: 5px;
  border-left-width: 3px;
  border-left-style: solid;
}
</style>
<template>
  <div class="text-overline q-mb-md">{{ name }}</div>
  <blockquote :style="blockquoteBorderColor">
    <div class="q-gutter-md column">
      <div v-for="[key, value] in new Map([...properties.entries()].filter(([key]) => showDefault || !isDefault(key)))" v-bind:key="key"
        :style="getType(value)=='string'?key=='name'?'order: 1':'order: 2':['number','integer'].includes(getType(value))?'order: 3':getType(value)=='boolean'?'order: 1':getType(value)=='array'?'order: 5':'order: 4'">
        <div v-if="value.type == 'object'" :key="key">
          <OpenApiEditObject v-model:data="out[key]" :name="key" :defaultdata="value.default" :properties="getProperties(value)" :read-only="readOnly" :show-default="showDefault" />
        </div>
        <div v-else-if="value.type == 'array'">
          <OpenApiEditArray v-model:data="out[key]" :name="key" :defaultdata="value.default" :items="getItems(value)" :read-only="readOnly" :show-default="showDefault" />
        </div>
        <div v-else-if="value.type == 'boolean'">
          <OpenApiEditBoolean v-model:data="out[key]" :name="key" :defaultdata="value.default" :read-only="readOnly" />
        </div>
        <div v-else-if="value.type == 'number'">
          <OpenApiEditNumber v-model:data="out[key]" :name="key" :defaultdata="value.default" :read-only="readOnly" />
        </div>
        <div v-else-if="value.type == 'string'">
          <OpenApiEditString v-model:data="out[key]" :name="key" :defaultdata="value.default" :read-only="readOnly" />
        </div>
      </div>
    </div>
  </blockquote>
</template>
