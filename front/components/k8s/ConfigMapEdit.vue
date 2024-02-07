<script setup lang="ts">
import { onMounted } from "vue";
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { useConfigMap, getProperties, ConfigMapDefinition } from '../../libs/k8s/ConfigMap.js'
const { onlyReadProperties, editor, setNamespacedItemFromRoute } = useConfigMap();setNamespacedItemFromRoute();
const emit = defineEmits(['update:model'])
const props = defineProps<{model: object}>();
</script>
<template>
  <q-card bordered class="q-ma-sm">
    <q-tabs v-model="editor.tab" class="bg-primary text-grey-4" active-color="white">
      <q-tab label="Simple" name="simple" />
      <q-tab label="full Yaml" name="yaml" />
    </q-tabs>
    <q-tab-panels v-model="editor.tab" animated>
      <q-tab-panel name="simple">
        <OpenApiEdit
          :in="model['binaryData']"
          @update:out="(v)=>editor.setkey('binaryData', v)"
          :properties="getProperties(ConfigMapDefinition.properties.binaryData)"
        />
        <OpenApiEdit
          :in="model['data']"
          @update:out="(v)=>editor.setkey('data', v)"
          :properties="getProperties(ConfigMapDefinition.properties.data)"
        />
      </q-tab-panel>
      <q-tab-panel name="yaml">
          <MonacoEditor
            :text="editor.yaml" :key="editor.yaml"
            @update:text="v=>editor.setYaml(v)"
            :properties="getProperties({properties: Object.fromEntries(Object.entries(ConfigMapDefinition).filter(([n])=>!['metadata','status'].includes(n)))})"
            />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>
