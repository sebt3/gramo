<script setup lang="ts">
import OpenApiItemView from './OpenApiItemView.vue';
import {getProperties, getItems, getType} from './openapiSetup';
import { OpenAPIV3 } from "openapi-types";
withDefaults(defineProps<{
  data: object
  properties?: Map<string, OpenAPIV3.SchemaObject>
  shownondefault: boolean
}>(), {
  shownondefault: false
});
</script>
<template>
  <div class="q-gutter-md column">
    <div v-for="[key, value] in properties" v-bind:key="key" :style="value.type=='string'?key=='name'?'order: 1':'order: 2':['number','integer'].includes(getType(value))?'order: 3':value.type=='boolean'?'order: 1':value.type=='array'?'order: 5':'order: 4'">
      <OpenApiItemView
        v-if="shownondefault || (data!=undefined && data[key] != undefined)"
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
