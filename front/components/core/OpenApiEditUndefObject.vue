<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
const  OpenApiEditString   = defineAsyncComponent(() => import( './OpenApiEditString.vue'));
import { ref, watch } from 'vue'
import { OpenAPIV3 } from "openapi-types";
const prompt = ref(false);
const newName = ref('');
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
  showdefault: true
});
const out_handler= Object.assign({},props.data);
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
  <q-dialog v-model="prompt" persistent v-if="!readOnly">
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-subtitle">New property name</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input dense v-model="newName" autofocus @keyup.enter="prompt = false" />
      </q-card-section>
      <q-card-actions align="right" class="text-primary">
        <q-btn flat :label="$t('core.cancel')" v-close-popup />
        <q-btn flat :label="$t('core.add')" v-close-popup @click="onAdd" />
      </q-card-actions>
    </q-card>
  </q-dialog>
   <q-expansion-item :label="name" :default-opened="level<2" v-if="showdefault||!readOnly||(data!=undefined&&Object.keys(data).length>0)">
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
    <div class="q-gutter-md column q-ml-sm" :key="`${Object.keys(out)}`" v-if="out!=undefined">
      <div v-for="[key] in new Map(Object.entries(out))" v-bind:key="key">
        <OpenApiEditString v-if="out[key]!=undefined && typeof out[key] === 'string'" v-model:data="out[key]" :name="key" :read-only="readOnly" :use-delete="!readOnly" @delete="(k)=>{out[k]=undefined;console.log(k,out[k])}" />
      </div>
    </div>
  </q-expansion-item>
</template>
