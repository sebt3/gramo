<script setup lang="ts">
import { ref, computed } from 'vue'
import type { CSSProperties } from 'vue';
import { getCssVar } from 'quasar'
import OpenApiItemView from './OpenApiItemView.vue';
import {getProperties,getItems,getType} from './openapiSetup';
import { OpenAPIV3 } from "openapi-types";
const props = withDefaults(defineProps<{
  name: string
  apitype: string
  data: any
  defaultdata: object
  properties?: Map<string, OpenAPIV3.SchemaObject>
  shownondefault: boolean
  items?: OpenAPIV3.SchemaObject
}>(), {
  apitype: 'string',
  shownondefault: false
});
const value = ref(props.data==undefined?props.defaultdata:props.data)
const isDefault = computed(() => props.data==undefined || props.defaultdata==props.data)
const blockquoteBorderColor = ref({"border-left-color": getCssVar('primary')} as CSSProperties)
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
  <div v-if="apitype == 'object'">
    <div class="text-overline q-mb-md">{{ name }}</div>
    <blockquote :style="blockquoteBorderColor">
      <div class="q-gutter-md column">
        <div v-for="[key, value] in Object.entries(properties||{})" v-bind:key="key" :style="getType(value)=='string'?key=='name'?'order: 1':'order: 2':['number','integer'].includes(getType(value))?'order: 3':getType(value)=='boolean'?'order: 1':getType(value)=='array'?'order: 5':'order: 4'">
          <OpenApiItemView
            v-if="shownondefault || (data != undefined && data[key]!=undefined)"
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
    </blockquote>
  </div>
  <div v-else-if="apitype == 'array'">
    <div class="text-overline q-mb-md">{{ name }}</div>
    <div v-if="items != undefined && items.type == 'object'" class="q-gutter-md">
      <q-card v-for="item in value" v-bind:key="item">
        <q-card-section>
          <div class="q-gutter-md column" v-if="items.properties != undefined">
            <div v-for="[key, value] in Object.entries(getProperties(items)||{})" v-bind:key="key" :style="value.type=='string'?key=='name'?'order: 1':'order: 2':['number','integer'].includes(getType(value))?'order: 3':value.type=='boolean'?'order: 1':value.type=='array'?'order: 5':'order: 4'">
              <OpenApiItemView
                v-if="shownondefault || item[key]!=undefined"
                :key="key"
                :name="key"
                :data="item[key]"
                :defaultdata="value.default"
                :apitype="value.type"
                :properties="getProperties(value)"
                :items="getItems(value)"
                :shownondefault="shownondefault"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <blockquote :style="blockquoteBorderColor" v-if="items != undefined && items.type != 'object'">
      <q-field v-for="item in value" v-bind:key="item" borderless>
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0">{{ item }}</div>
        </template>
      </q-field>
    </blockquote>
  </div>
  <div v-else>
    <q-field :label="name" stack-label borderless :label-color="isDefault?'':'secondary'">
      <template v-if="['name', 'namespace', 'app-group', 'enable', 'domain', 'domain-name', 'issuer', 'ingress-class', 'pullPolicy', 'registry', 'repository', 'tag', 'key', 'engine', 'username', 'dbname'].includes(name)" v-slot:prepend>
        <q-icon :color="isDefault?'':'secondary'" v-if="name == 'name'" name="smart_button" />
        <q-icon :color="isDefault?'':'secondary'" v-if="name == 'namespace'" name="dashboard" />
        <q-icon :color="isDefault?'':'secondary'" v-if="name == 'enable'" name="done" />
        <q-icon :color="isDefault?'':'secondary'" v-if="name == 'app-group'" name="workspaces" />
        <q-icon :color="isDefault?'':'secondary'" v-if="name == 'domain-name'" name="link" />
        <q-icon :color="isDefault?'':'secondary'" v-if="name == 'issuer'" name="local_police" />
        <q-icon :color="isDefault?'':'secondary'" v-if="name == 'ingress-class'" name="alt_route" />
        <q-icon :color="isDefault?'':'secondary'" v-if="name == 'pullPolicy'" name="downloading" />
        <q-icon :color="isDefault?'':'secondary'" v-if="name == 'registry'" name="store" />
        <q-icon :color="isDefault?'':'secondary'" v-if="name == 'repository'" name="image" />
        <q-icon :color="isDefault?'':'secondary'" v-if="name == 'tag'" name="sell" />
        <q-icon :color="isDefault?'':'secondary'" v-if="name == 'dbname'" name="storage" />
        <q-icon :color="isDefault?'':'secondary'" v-if="name == 'engine'" name="settings" />
        <q-icon :color="isDefault?'':'secondary'" v-if="name == 'username'" name="person" />
        <q-icon :color="isDefault?'':'secondary'" v-if="['domain', 'key'].includes(name)" :name="name" />
      </template>
      <template v-slot:control>
        <div v-if="apitype != 'boolean'" class="self-center full-width no-outline" tabindex="0">{{ value }}</div>
        <q-toggle v-if="apitype == 'boolean'" v-model="value" checked-icon="check" color="green" unchecked-icon="clear" disable />
      </template>
    </q-field>
  </div>
</template>
