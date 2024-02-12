<script setup lang="ts">
import OpenApiEditObject from './OpenApiEditObject.vue';
import OpenApiEditArray from './OpenApiEditArray.vue';
import OpenApiEditBoolean from './OpenApiEditBoolean.vue';
import OpenApiEditString from './OpenApiEditString.vue';
import OpenApiEditNumber from './OpenApiEditNumber.vue';

import { ref, watch } from 'vue'
import {getProperties,getItems,getType, getFullData} from '../../libs/core/openapiSetup';
import { OpenAPIV3 } from "openapi-types";
const prompt = ref(false);
const newName = ref('');
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
const out_handler= props.data;
getFullData(props.properties,out_handler,props.data);
const out = ref(out_handler)
const emit = defineEmits(['update:data'])
watch(out,(newValue) => emit('update:data', newValue),{ deep: true })
function handleAdd(evt) {
  prompt.value = true;
  evt.preventDefault();
  evt.stopPropagation();
}
function onAdd() {
  out.value[newName.value] = '';
}
</script>
<template>
  <q-dialog v-model="prompt" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-subtitle">New property name</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input dense v-model="newName" autofocus @keyup.enter="prompt = false" />
      </q-card-section>
      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn flat label="Add" v-close-popup @click="onAdd" />
      </q-card-actions>
    </q-card>
  </q-dialog>
   <q-expansion-item :label="name" :default-opened="name=='stringData' && !readOnly">
    <template v-slot:header="{expanded}">
      <q-item-section>
        {{name}}
      </q-item-section>
      <q-item-section v-if="expanded && !readOnly" side>
        <q-btn icon="add" flat @click="handleAdd">
          <q-tooltip>add</q-tooltip>
        </q-btn>
      </q-item-section>
    </template>
    <div class="q-gutter-md column q-ml-sm" :key="`${Object.keys(out)}`">
      <div v-for="[key, value] in new Map(Object.entries(out))" v-bind:key="key"
        :style="getType(value)=='string'?key=='name'?'order: 1':'order: 2':['number','integer'].includes(getType(value))?'order: 3':getType(value)=='boolean'?'order: 1':getType(value)=='array'?'order: 5':'order: 4'">
        <OpenApiEditString v-if="out[key]!=undefined" v-model:data="out[key]" :name="key" :read-only="readOnly" :use-delete="!readOnly" @delete="(k)=>{out[k]=undefined;console.log(k,out[k])}" />
      </div>
    </div>
  </q-expansion-item>
</template>
