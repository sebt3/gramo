<script setup lang="ts">
const { OpenAPIV3 } = await import("openapi-types");
const emit = defineEmits(['update:data'])
const props = withDefaults(defineProps<{
  name: string
  data: Array<any>|undefined
  defaultdata?: Array<any>
  description?: string
  items?: OpenAPIV3.SchemaObject
  readOnly?: boolean
  showdefault?: boolean
  level?: number
}>(), {
  level: 0,
  readOnly: false,
  showdefault: false
});
const { defineAsyncComponent, ref, watch } = await import('vue')
const { getProperties } = await import('../../libs/core/openapiSetup');
const out          = ref(Object.assign([], props.data))
const handleDelete = (key) => {out.value.splice(key,1)}
const handleAdd    = (evt) => {
  out.value.push(props.items?.type == 'object'?{}:'')
  evt.preventDefault();
  evt.stopPropagation();
}
if (!props.readOnly) watch(out, (newValue) => emit('update:data', newValue),{ deep: true });
const OpenApiEditUndefObject = defineAsyncComponent(() => import( './OpenApiEditUndefObject.vue'));
const OpenApiEditObject      = defineAsyncComponent(() => import( './OpenApiEditObject.vue'));
</script>
<template>
  <div v-if="items != undefined" class="q-gutter-sm">
    <q-expansion-item header-style="border: 1px solid rgba(0, 0, 0, 0.12);" :label="name"  :default-opened="level<0" v-if="showdefault||!readOnly||(Array.isArray(data)&&data.length>0)">
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
    <q-list bordered separator>
      <q-item v-for="(item, key) in data" v-bind:key="item">
        <q-item-section v-if="!readOnly"  side :key="`${key}-icon`">
          <q-btn icon="delete" flat @click="handleDelete(key)"><q-tooltip>delete</q-tooltip></q-btn>
        </q-item-section>
        <q-item-section v-if="items.type == 'object' && items.properties != undefined && Object.keys(items.properties).length>0">
          <OpenApiEditObject v-model:data="out[key]" name="" :level="level+1" :defaultdata="items.default" :properties="getProperties(items)" :read-only="readOnly" :required="items.required" :showdefault="showdefault" />
        </q-item-section>
        <q-item-section v-if="items.type == 'object' && (items.properties == undefined || Object.keys(items.properties).length<1)">
          <OpenApiEditUndefObject v-model:data="out[key]" name="" :level="level+1" :defaultdata="items.default" :properties="getProperties(items)" :read-only="readOnly" />
        </q-item-section>
        <q-item-section v-if="['string','number'].includes(items.type as string)&&readOnly">{{item}}</q-item-section>
        <q-item-section v-if="['string','number'].includes(items.type as string)&&!readOnly" :key="`${key}-edit`">
          <q-input v-model="out[key]" type="text" />
        </q-item-section>
      </q-item>
    </q-list>
    </q-expansion-item>
  </div>
</template>
