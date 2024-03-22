<script setup lang="ts">
const emit = defineEmits(['on-submit'])
const props = defineProps<{
  model: object,
  parent:object
}>();
const { getProperties, sanitizeData, getTargetVersion, defineAsyncComponent, usecrdObject, onMounted } = await import('../../libs/core/crdObject.js')
const { $q, onlyWriteProperties, editor } = usecrdObject();
const { colorCustomResourceDefinition } = await import('../../libs/k8s/custom.js')
const targetVersion = getTargetVersion(props.parent['spec']['versions'])
const schema = props.parent['spec']['versions'].filter(v=>v.name==targetVersion)[0].schema.openAPIV3Schema
onMounted(() => {
  editor.value.updateFromQuery(onlyWriteProperties(props.model));
})
function onSubmit() {
  emit('on-submit', sanitizeData(editor.value.obj));
}
const setkey = (key:string, v) => editor.value.setKey(key, v)
const setYaml = (v) => editor.value.setYaml(v)
const OpenApiEdit  = defineAsyncComponent(() => import( '@/components/openapi/OpenApiEdit.vue'));
const MonacoEditor = defineAsyncComponent(() => import( '@/components/core/MonacoEditor.vue'));
</script>
<template>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
  <q-card bordered class="q-ma-sm">
    <q-tabs v-model="editor.tab" :class="`bg-${ colorCustomResourceDefinition } text-grey-2`" active-color="white" :align="'justify'">
      <q-tab :label="$t('edit.tabs.simple')" name="simple" />
      <q-tab :label="$t('edit.tabs.yaml')" name="yaml" />
      <q-btn-group push class="float-right text-capitalize shadow-3 q-mr-sm">
        <q-btn type="submit" icon="save" :label="$t('core.submit')">
          <q-tooltip>{{ $t('edit.submitTooltip') }}</q-tooltip>
        </q-btn>
      </q-btn-group>
    </q-tabs>
    <q-tab-panels v-model="editor.tab" animated>
      <q-tab-panel name="simple" :class="`bg-${ colorCustomResourceDefinition }-${$q.dark.isActive?'10':'1'}`">
        <OpenApiEdit v-if="editor.ready" :showdefault="true"
          @update:out="(v)=>setkey('spec', sanitizeData(v))"
          :in="editor.obj['spec']"
          :properties="getProperties(schema.properties.spec)"
        />
      </q-tab-panel>
      <q-tab-panel name="yaml" :class="`bg-${ colorCustomResourceDefinition }-${$q.dark.isActive?'10':'1'}`">
          <MonacoEditor
            :text="editor.yaml" :key="editor.yaml"
            @update:text="v=>setYaml(v)"
            :properties="getProperties(schema.properties.spec)"
            />
      </q-tab-panel>
    </q-tab-panels>
      <q-card-actions :class="`bg-${ colorCustomResourceDefinition }-${$q.dark.isActive?'10':'1'}`">
        <q-btn :label="$t('core.submit')" icon="save" type="submit" color="primary"/>
      </q-card-actions>
  </q-card>
  </q-form>
</template>
