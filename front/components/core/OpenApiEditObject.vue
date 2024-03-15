<!-- eslint-disable vue/valid-v-model -->
<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
const  OpenApiEditObject   = defineAsyncComponent(() => import( './OpenApiEditObject.vue'));
const  OpenApiEditUndefObject   = defineAsyncComponent(() => import( './OpenApiEditUndefObject.vue'));
const  OpenApiEditArray   = defineAsyncComponent(() => import( './OpenApiEditArray.vue'));
const  OpenApiEditBoolean   = defineAsyncComponent(() => import( './OpenApiEditBoolean.vue'));
const  OpenApiEditString   = defineAsyncComponent(() => import( './OpenApiEditString.vue'));
const  OpenApiEditEnum   = defineAsyncComponent(() => import( './OpenApiEditEnum.vue'));
const  OpenApiEditNumber   = defineAsyncComponent(() => import( './OpenApiEditNumber.vue'));

import { ref, watch } from 'vue'
import {getProperties,getItems,getType, getFullData} from '../../libs/core/openapiSetup';
import { OpenAPIV3 } from "openapi-types";
const props = withDefaults(defineProps<{
  name: string
  data: object|undefined
  defaultdata?: object
  description?: string,
  properties: Map<string, OpenAPIV3.SchemaObject>
  readOnly?: boolean
  showdefault?: boolean
  level?: number
}>(), {
  level: 0,
  readOnly: false,
  showdefault: false
});
const out_handler= props.readOnly?props.data||{}:{};
if(!props.readOnly) getFullData(props.properties,out_handler,props.data);
const out = ref(out_handler)
const emit = defineEmits(['update:data'])
watch(out,(newValue) => emit('update:data', newValue),{ deep: true })
/// TODO: fix this
const isDefault = (key) => props.defaultdata!= undefined && out[key] == props.defaultdata[key];
</script>
<template>
   <q-expansion-item :label="name" :default-opened="level<0"
    v-if="name!='' && (!readOnly||showdefault||[...properties.entries()].filter(([key,value]) => (showdefault || !isDefault(key)) && (Object.keys(out).includes(key)||!readOnly)).length>0)">
    <div class="q-gutter-md column q-ml-sm">
      <div v-for="[key, value] in new Map([...properties.entries()].filter(([key,value]) =>  (showdefault || !isDefault(key)) && (Object.keys(out).includes(key)||!readOnly)))" v-bind:key="key"
        :style="getType(value)=='string'?key=='name'?'order: 1':'order: 2':['number','integer'].includes(getType(value))?'order: 3':getType(value)=='boolean'?'order: 1':getType(value)=='array'?'order: 5':'order: 4'">
        <div v-if="value.type == 'object' && value.properties != undefined && Object.keys(value.properties).length>0 && (Object.keys(out).includes(key)||!readOnly)" :key="`${key}-obj`">
          <OpenApiEditObject v-model:data="out[key]" :level="level+1" :showdefault="showdefault" :name="key" :defaultdata="value.default" :description="value.description" :properties="getProperties(value)" :read-only="readOnly" />
        </div>
        <div v-if="value.type == 'object' && (value.properties == undefined || Object.keys(value.properties).length<1) && (Object.keys(out).includes(key)||!readOnly)" :key="`${key}-unknown`">
          <OpenApiEditUndefObject v-model:data="out[key]" :level="level+1" :name="key" :defaultdata="value.default" :description="value.description" :properties="getProperties(value)" :read-only="readOnly" />
        </div>
        <div v-else-if="value.type == 'array' && (Object.keys(out).includes(key)||!readOnly)">
          <OpenApiEditArray v-model:data="out[key]" :level="level+1" :name="key" :defaultdata="value.default" :description="value.description" :items="getItems(value)" :read-only="readOnly" :showdefault="showdefault" />
        </div>
        <div v-else-if="value.type == 'boolean' && (Object.keys(out).includes(key)||!readOnly)">
          <OpenApiEditBoolean v-model:data="out[key]" :name="key" :defaultdata="value.default" :description="value.description" :read-only="readOnly" />
        </div>
        <div v-else-if="value.type == 'number' && (Object.keys(out).includes(key)||!readOnly)">
          <OpenApiEditNumber v-model:data="out[key]" :name="key" :defaultdata="value.default" :description="value.description" :read-only="readOnly" />
        </div>
        <div v-else-if="value.type == 'integer' && (Object.keys(out).includes(key)||!readOnly)">
          <OpenApiEditNumber v-model:data="out[key]" :name="key" :defaultdata="value.default" :description="value.description" :read-only="readOnly" />
        </div>
        <div v-else-if="value.type == 'string' && Array.isArray(value.enum) && (Object.keys(out).includes(key)||!readOnly)">
          <OpenApiEditEnum v-model:data="out[key]" :name="key" :defaultdata="value.default" :description="value.description" :read-only="readOnly" :enum="value.enum" />
        </div>
        <div v-else-if="value.type == 'string' && !Array.isArray(value.enum) && (Object.keys(out).includes(key)||!readOnly)">
          <OpenApiEditString v-model:data="out[key]" :name="key" :defaultdata="value.default" :description="value.description" :read-only="readOnly" />
        </div>
      </div>
    </div>
  </q-expansion-item>
  <div class="q-gutter-md column q-ml-sm" v-if="name==''">
      <div v-for="[key, value] in new Map([...properties.entries()].filter(([key]) => (showdefault || !isDefault(key)) && (Object.keys(out).includes(key)||!readOnly)))" v-bind:key="key"
        :style="getType(value)=='string'?key=='name'?'order: 1':'order: 2':['number','integer'].includes(getType(value))?'order: 3':getType(value)=='boolean'?'order: 1':getType(value)=='array'?'order: 5':'order: 4'">
        <div v-if="value.type == 'object' && (Object.keys(out).includes(key)||!readOnly)" :key="key">
          <OpenApiEditObject :level="level" v-model:data="out[key]" :name="key" :defaultdata="value.default" :description="value.description" :properties="getProperties(value)" :read-only="readOnly" :showdefault="showdefault" />
        </div>
        <div v-else-if="value.type == 'array' && (Object.keys(out).includes(key)||!readOnly)">
          <OpenApiEditArray :level="level" v-model:data="out[key]" :name="key" :defaultdata="value.default" :description="value.description" :items="getItems(value)" :read-only="readOnly" :showdefault="showdefault" />
        </div>
        <div v-else-if="value.type == 'boolean' && (Object.keys(out).includes(key)||!readOnly)">
          <OpenApiEditBoolean v-model:data="out[key]" :name="key" :defaultdata="value.default" :description="value.description" :read-only="readOnly" />
        </div>
        <div v-else-if="value.type == 'number' && (Object.keys(out).includes(key)||!readOnly)">
          <OpenApiEditNumber v-model:data="out[key]" :name="key" :defaultdata="value.default" :description="value.description" :read-only="readOnly" />
        </div>
        <div v-else-if="value.type == 'integer' && (Object.keys(out).includes(key)||!readOnly)">
          <OpenApiEditNumber v-model:data="out[key]" :name="key" :defaultdata="value.default" :description="value.description" :read-only="readOnly" />
        </div>
        <div v-else-if="value.type == 'string' && Array.isArray(value.enum) && (Object.keys(out).includes(key)||!readOnly)">
          <OpenApiEditEnum v-model:data="out[key]" :name="key" :defaultdata="value.default" :description="value.description" :read-only="readOnly" :enum="value.enum" />
        </div>
        <div v-else-if="value.type == 'string' && !Array.isArray(value.enum) && (Object.keys(out).includes(key)||!readOnly)">
          <OpenApiEditString v-model:data="out[key]" :name="key" :defaultdata="value.default" :description="value.description" :read-only="readOnly" />
        </div>
      </div>
    </div>
</template>
