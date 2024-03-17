<script setup lang="ts">
const emit = defineEmits(['update:out'])
import { OpenAPIV3 } from "openapi-types";
const props = withDefaults(defineProps<{
  out?: any
  in?: any
  properties: Map<string, OpenAPIV3.SchemaObject>
  readOnly?: boolean
  showdefault?: boolean
  required?: string[]
}>(), {
  readOnly: false,
  showdefault: false
});
import { defineAsyncComponent, ref, watch } from 'vue'
import { getProperties,getItems,getType } from '../../libs/core/openapiSetup';
const localOut  = Object.assign({},props.in!=undefined?props.in:props.out!=undefined?props.out:{});
const data      = ref(localOut)
const isDefault = (key) => (props.properties.has(key) && props.properties.get(key).default == undefined && props.in != undefined && props.in[key] == undefined) || (props.properties.has(key) && props.properties.get(key).default!= undefined  && props.in != undefined && props.in[key] != undefined && props.in[key] == props.properties.get(key).default[key])
if (!props.readOnly) watch(data, (newValue) => emit('update:out', newValue),{ deep: true });
const OpenApiEditObject      = defineAsyncComponent(() => import( './OpenApiEditObject.vue'));
const OpenApiEditArray       = defineAsyncComponent(() => import( './OpenApiEditArray.vue'));
const OpenApiEditUndefObject = defineAsyncComponent(() => import( './OpenApiEditUndefObject.vue'));
const OpenApiEditBoolean     = defineAsyncComponent(() => import( './OpenApiEditBoolean.vue'));
const OpenApiEditString      = defineAsyncComponent(() => import( './OpenApiEditString.vue'));
const OpenApiEditNumber      = defineAsyncComponent(() => import( './OpenApiEditNumber.vue'));
</script>
<template>
  <div class="q-gutter-md column">
    <div v-for="[key, value] in new Map([...properties.entries()].filter(([key]) => showdefault || !isDefault(key)))" v-bind:key="key" :style="getType(value)=='string'?key=='name'?'order: 1':'order: 2':['number','integer'].includes(getType(value))?'order: 3':getType(value)=='boolean'?'order: 1':getType(value)=='array'?'order: 5':'order: 4'">
      <div v-if="value.type == 'object' && value.properties != undefined && Object.keys(value.properties).length>0" :key="`${key}-obj`">
        <OpenApiEditObject v-model:data="data[key]" :level="0" :showdefault="showdefault" :name="key" :defaultdata="value.default" :description="value.description" :properties="getProperties(value)" :required="value.required" :read-only="readOnly" />
      </div>
      <div v-if="value.type == 'object' && (value.properties == undefined || Object.keys(value.properties).length<1)" :key="`${key}-unknown`">
        <OpenApiEditUndefObject v-model:data="data[key]" :name="key" :level="0" :defaultdata="value.default" :description="value.description" :properties="getProperties(value)" :read-only="readOnly" />
      </div>
      <div v-else-if="value.type == 'array' && (!readOnly|| Array.isArray(data[key]))">
        <OpenApiEditArray v-model:data="data[key]" :level="0" :showdefault="showdefault" :name="key" :defaultdata="value.default" :description="value.description" :items="getItems(value)" :read-only="readOnly" />
      </div>
      <div v-else-if="value.type == 'boolean' && (!readOnly|| typeof data[key] === 'boolean')">
        <OpenApiEditBoolean v-model:data="data[key]" :name="key" :defaultdata="value.default" :description="value.description" :read-only="readOnly" />
      </div>
      <div v-else-if="value.type == 'number' && (!readOnly|| typeof data[key] === 'number')">
        <OpenApiEditNumber v-model:data="data[key]" :name="key" :required="Array.isArray(required) && required.includes(key)" :defaultdata="value.default" :description="value.description" :read-only="readOnly" />
      </div>
      <div v-else-if="value.type == 'integer' && (!readOnly|| typeof data[key] === 'number')">
        <OpenApiEditNumber v-model:data="data[key]" :name="key" :required="Array.isArray(required) && required.includes(key)" :defaultdata="value.default" :description="value.description" :read-only="readOnly" />
      </div>
      <div v-else-if="value.type == 'string' && (!readOnly|| typeof data[key] === 'string')">
        <OpenApiEditString v-model:data="data[key]" :name="key" :required="Array.isArray(required) && required.includes(key)" :defaultdata="value.default" :description="value.description" :read-only="readOnly" />
      </div>
    </div>
  </div>
</template>
