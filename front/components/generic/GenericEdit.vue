<script setup lang="ts">
const emit = defineEmits(['on-submit'])
const props = defineProps<{model: object, group:string, short:string}>();
const { loader } = await import("../../libs/core/importer")
const { namespaced, colorItem, useItem, onMounted, defineAsyncComponent, sanitizeData, getProperties, itemDefinition } = await loader(props.group,props.short)
const { useRouter } = await import('vue-router')
const router = useRouter();
const { setNamespacedItemFromRoute, setItemFromRoute } = await import('../../libs/core/navigation.js')
const { $q, writeProperties, onlyWriteProperties, editor } = useItem(router);
if (namespaced) setNamespacedItemFromRoute();
else setItemFromRoute();
onMounted(() => editor.value.updateFromQuery(onlyWriteProperties(props.model)) )
const onSubmit = () => {emit('on-submit', sanitizeData(editor.value.obj));console.log('emited')}
const setkey   = (key:string, v) => editor.value.setKey(key, v)
const setYaml  = (v) => editor.value.setYaml(v)
const OpenApiEdit      = defineAsyncComponent(() => import( '@/components/openapi/OpenApiEdit.vue'));
const MonacoEditor     = defineAsyncComponent(() => import( '@/components/core/MonacoEditor.vue'));
console.log(props.model)
</script>
<template>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
  <q-card bordered class="q-ma-sm">
    <q-tabs v-model="editor.tab" :class="`bg-${ colorItem } text-grey-2`" active-color="white" :align="'justify'">
      <q-tab :label="$t('edit.tabs.simple')" name="simple" />
      <q-tab :label="$t('edit.tabs.yaml')" name="yaml" />
      <q-btn-group push class="float-right text-capitalize shadow-3 q-mr-sm">
        <q-btn type="submit" icon="save" :label="$t('core.submit')">
          <q-tooltip>{{ $t('edit.submitTooltip') }}</q-tooltip>
        </q-btn>
      </q-btn-group>
    </q-tabs>
    <q-tab-panels v-model="editor.tab" animated>
      <q-tab-panel name="simple" :class="`bg-${ colorItem }-${$q.dark.isActive?'10':'1'}`">
        <OpenApiEdit v-if="editor.ready && props.group=='vynil' && props.short=='Install'" :showdefault="true"
          @update:out="(v)=>setkey('spec', {...model['spec'],options:sanitizeData(v)})"
          :in="editor.obj['spec']['options']"
          :properties="new Map(Object.entries(model.consumevynilPackage.options))"
        />
        <OpenApiEdit v-else-if="editor.ready && writeProperties.length==1 && writeProperties.includes('spec')" :showdefault="true"
          @update:out="(v)=>setkey('spec', sanitizeData(v))"
          :in="editor.obj['spec']"
          :properties="getProperties(itemDefinition.properties.spec)"
          :required="itemDefinition.properties.spec.required"
        />
        <OpenApiEdit v-else-if="editor.ready" :showdefault="true"
          @update:out="(v)=>setkey(null, sanitizeData(v))"
          :in="editor.obj"
          :properties="getProperties(itemDefinition,([k])=>writeProperties.includes(k))"
          :required="itemDefinition.required"
        />
      </q-tab-panel>
      <q-tab-panel name="yaml" :class="`bg-${ colorItem }-${$q.dark.isActive?'10':'1'}`">
          <MonacoEditor  v-if="editor.ready && props.group=='vynil' && props.short=='Install'"
            :text="editor.yaml" :key="`install${editor.yaml}`"
            :showDoc="editor.showDoc"
            @update:text="v=>setYaml(v)"
            :properties="getProperties({properties: model.consumevynilPackage.options})"
            />
          <MonacoEditor v-else-if="editor.ready"
            :text="editor.yaml" :key="`else${editor.yaml}`"
            :showDoc="editor.showDoc"
            @update:text="v=>setYaml(v)"
            :properties="getProperties(itemDefinition,([k])=>writeProperties.includes(k))"
            :required="itemDefinition.required"
            />
      </q-tab-panel>
    </q-tab-panels>
      <q-card-actions :class="`bg-${ colorItem }-${$q.dark.isActive?'10':'1'} row`">
        <div class="col"><q-btn :label="$t('core.submit')" icon="save" type="submit" color="primary" /></div>
        <div class="col text-right" v-if="editor.tab=='yaml'"><q-btn :label="$t('edit.showDoc')" icon="article" color="secondary" @click="()=>{editor.showDoc=!editor.showDoc}" /></div>
      </q-card-actions>
  </q-card>
  </q-form>
</template>
