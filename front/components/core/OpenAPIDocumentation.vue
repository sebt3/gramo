<script setup lang="ts">
import { OpenAPIV3 } from "openapi-types";
const props = withDefaults(defineProps<{
  type: string
  name?: string
  properties?: Map<string, OpenAPIV3.SchemaObject>
  items?: OpenAPIV3.SchemaObject
  ownRequired?: string[]
  required?: boolean
  description?: string
  level?: number
}>(),{
  level: 0
});
import { defineAsyncComponent } from 'vue'
import { i18n } from "../../libs/i18n"
import { getProperties,getItems, getType } from '../../libs/core/openapiSetup';
const OpenAPIDocumentation = defineAsyncComponent(() => import( '@/components/core/OpenAPIDocumentation.vue'));
</script>
<template>
  <div v-if="type=='root'" class="q-gutter-md">
    <div v-for="[key, value] in props.properties" :key="key" :style="getType(value)=='string'?key=='name'?'order: 1':'order: 2':['number','integer'].includes(getType(value))?'order: 3':getType(value)=='boolean'?'order: 1':getType(value)=='array'?'order: 5':'order: 4'">
      <OpenAPIDocumentation :type="value.type" :name="key" :properties="getProperties(value)" :ownRequired="value.required"  :required="Array.isArray(ownRequired)&&ownRequired.includes(key)" :description="value.description" />
      <OpenAPIDocumentation v-if="value.type=='array'" :type="value.type" :name="key" :items="getItems(value)" :required="Array.isArray(ownRequired)&&ownRequired.includes(key)" :description="value.description" />
    </div>
  </div>
  <div v-else-if="type=='object'">
    <q-expansion-item :label="name" :caption="i18n.global.t(required?'documentation.typeRequiered':'documentation.typeOptionnal',{type})" :default-opened="false">
      <div v-if="description" class="q-mb-sm q-ml-lg" :style="'order: 1'"><i>{{ description }}</i></div>
      <div  class="q-gutter-md q-ml-sm">
        <div v-for="[key, value] in props.properties" :key="key" :style="getType(value)=='string'?key=='name'?'order: 1':'order: 2':['number','integer'].includes(getType(value))?'order: 3':getType(value)=='boolean'?'order: 1':getType(value)=='array'?'order: 5':'order: 4'">
          <OpenAPIDocumentation v-if="value.type!='array'" :type="value.type" :name="key" :properties="getProperties(value)" :ownRequired="value.required"  :required="Array.isArray(ownRequired)&&ownRequired.includes(key)" :description="value.description" />
          <OpenAPIDocumentation v-if="value.type=='array'" :type="value.type" :name="key" :items="getItems(value)"  :required="Array.isArray(ownRequired)&&ownRequired.includes(key)" :description="value.description" />
        </div>
      </div>
    </q-expansion-item>
  </div>
  <div v-else-if="type=='array'">
    <q-expansion-item :label="name" :caption="i18n.global.t(required?'documentation.typeRequiered':'documentation.typeOptionnal',{type})" :default-opened="false">
      <div v-if="description" class="q-mb-sm q-ml-lg" :style="'order: 1'"><i>{{ description }}</i></div>
      <div  class="q-gutter-md q-ml-sm">
          <OpenAPIDocumentation v-if="items.type!='array'" :type="items.type" :name="i18n.global.t('documentation.items')" :properties="getProperties(items)" :ownRequired="items.required"  :description="items.description" />
          <OpenAPIDocumentation v-if="items.type=='array'" :type="items.type" :name="key" :items="getItems(items)" :description="items.description" />
      </div>
    </q-expansion-item>
  </div>
  <div v-else class="q-mb-lg">
    <q-field bottom-slots :label="name" stack-label>
      <template v-slot:control>
        <div class="self-center full-width no-outline" tabindex="0">{{description}}</div>
      </template>
      <template v-slot:hint>
        {{ i18n.global.t(required?'documentation.typeRequiered':'documentation.typeOptionnal',{type}) }}
      </template>
    </q-field>
  </div>
</template>
