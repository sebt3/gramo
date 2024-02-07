<script setup lang="ts">
//import OpenApiItemEdit from './OpenApiItemEdit.vue';
import { ref, computed, watch } from 'vue'
import {getProperties,getItems,getType} from '../../libs/core/openapiSetup';
import { OpenAPIV3 } from "openapi-types";
const props = withDefaults(defineProps<{
  name: string
  data: Array<any>
  defaultdata?: Array<any>
  items?: OpenAPIV3.SchemaObject
  readOnly?: boolean
  showDefault?: boolean
}>(), {
  readOnly: false,
  showDefault: true
});
// TODO ....
</script>
<template>
  <div class="text-overline q-mb-md">{{ name }}</div>
  <div v-if="items != undefined && items.type == 'object'" class="q-gutter-md">
<!--    <q-card v-for="item in value" v-bind:key="item">
      <q-card-section>
        <div class="q-gutter-md column" v-if="items.properties != undefined">
          <div v-for="[key, value] in getProperties(items)" v-bind:key="key" :style="value.type=='string'?key=='name'?'order: 1':'order: 2':['number','integer'].includes(getType(value))?'order: 3':value.type=='boolean'?'order: 1':value.type=='array'?'order: 5':'order: 4'">
            <OpenApiItemEdit
              :key="key"
              :name="key"
              :data="item[key]"
              :defaultdata="value.default"
              :apitype="value.type"
              :properties="getProperties(value)"
              :items="getItems(value)"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>-->
  </div>
</template>
