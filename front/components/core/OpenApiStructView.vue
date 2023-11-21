<script setup lang="ts">
import OpenApiItemView from './OpenApiItemView.vue';
import {getProperties, getItems, getType} from './openapiSetup';
import { OpenAPIV3 } from "openapi-types";
withDefaults(defineProps<{
  data?: any
  properties?: Map<string, OpenAPIV3.SchemaObject>
  shownondefault?: boolean
}>(), {
  shownondefault: false
});
</script>
<template>
  <div class="q-gutter-md column" v-if="properties!=undefined">
    <div v-for="[key, value] in Object.entries(properties).filter(([key, value])=>shownondefault || (data!=undefined && data[key] != undefined  && data[key] != value.default))" v-bind:key="key" :style="getType(value)=='string'?key=='name'?'order: 1':'order: 2':['number','integer'].includes(getType(value))?'order: 3':getType(value)=='boolean'?'order: 1':getType(value)=='array'?'order: 5':'order: 4'">
      <OpenApiItemView
        :key="key"
        :name="key"
        :data="data==undefined?undefined:data[key]"
        :defaultdata="value.default"
        :apitype="value.type"
        :properties="getProperties(value)"
        :items="getItems(value)"
        :shownondefault="shownondefault"
      />
    </div>
  </div>
</template>
