<script setup lang="ts">
import OpenApiEditObject from './OpenApiEditObject.vue';
import OpenApiEditArray from './OpenApiEditArray.vue';
import OpenApiEditBoolean from './OpenApiEditBoolean.vue';
import OpenApiEditString from './OpenApiEditString.vue';
import OpenApiEditNumber from './OpenApiEditNumber.vue';
import { ref, watch } from 'vue'
import { OpenAPIV3 } from "openapi-types";
import {getProperties,getItems,getType, getFullData} from './openapiSetup';
const props = withDefaults(defineProps<{
  out?: any
  in?: any
  properties: Map<string, OpenAPIV3.SchemaObject>
  readOnly?: boolean
  showDefault?: boolean
}>(), {
  in: {},
  readOnly: false,
  showDefault: true
});
const localOut = props.out!=undefined?props.out:{};
getFullData(props.properties,localOut,props.in);
const data = ref(localOut)
const emit = defineEmits(['update:out'])
watch(data,(newValue) => emit('update:out', newValue),{ deep: true })
const isDefault = (key) => (props.properties.has(key) && props.properties.get(key).default == undefined && props.in[key] == undefined) || (props.properties.has(key) && props.properties.get(key).default!= undefined && props.in[key] != undefined && props.in[key] == props.properties.get(key).default[key])
</script>
<template>
  <div class="q-gutter-md column">
    <div v-for="[key, value] in new Map([...properties.entries()].filter(([key]) => showDefault || !isDefault(key)))" v-bind:key="key" :style="getType(value)=='string'?key=='name'?'order: 1':'order: 2':['number','integer'].includes(getType(value))?'order: 3':getType(value)=='boolean'?'order: 1':getType(value)=='array'?'order: 5':'order: 4'">
      <div v-if="value.type == 'object'" :key="key">
        <OpenApiEditObject v-model:data="data[key]" :name="key" :defaultdata="value.default" :properties="getProperties(value)" :read-only="readOnly" />
      </div>
      <div v-else-if="value.type == 'array'">
        <OpenApiEditArray v-model:data="data[key]" :name="key" :defaultdata="value.default" :items="getItems(value)" :read-only="readOnly" />
      </div>
      <div v-else-if="value.type == 'boolean'">
        <OpenApiEditBoolean v-model:data="data[key]" :name="key" :defaultdata="value.default" :read-only="readOnly" />
      </div>
      <div v-else-if="value.type == 'number'">
        <OpenApiEditNumber v-model:data="data[key]" :name="key" :defaultdata="value.default" :read-only="readOnly" />
      </div>
      <div v-else-if="value.type == 'string'">
        <OpenApiEditString v-model:data="data[key]" :name="key" :defaultdata="value.default" :read-only="readOnly" />
      </div>
    </div>
  </div>
</template>
