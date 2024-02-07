<script setup lang="ts">
import { onMounted } from "vue";
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { useEndpoints, getProperties, EndpointsDefinition } from '../../libs/k8s/Endpoints.js'
const { onlyReadProperties, editor, setNamespacedItemFromRoute } = useEndpoints();setNamespacedItemFromRoute();
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
      </q-tab-panel>
      <q-tab-panel name="yaml">
          <MonacoEditor
            :text="editor.yaml" :key="editor.yaml"
            @update:text="v=>editor.setYaml(v)"
            :properties="getProperties({properties: Object.fromEntries(Object.entries(EndpointsDefinition).filter(([n])=>!['metadata','status'].includes(n)))})"
            />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>
