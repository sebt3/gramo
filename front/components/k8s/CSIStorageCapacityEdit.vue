<script setup lang="ts">
import { onMounted } from "vue";
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { useCSIStorageCapacity, getProperties, CSIStorageCapacityDefinition } from '../../libs/k8s/CSIStorageCapacity.js'
const { onlyReadProperties, editor, setNamespacedItemFromRoute } = useCSIStorageCapacity();setNamespacedItemFromRoute();
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
          :in="model['capacity']"
          @update:out="(v)=>editor.setkey('capacity', v)"
          :properties="getProperties(CSIStorageCapacityDefinition.properties.capacity)"
        />
        <OpenApiEdit
          :in="model['maximumVolumeSize']"
          @update:out="(v)=>editor.setkey('maximumVolumeSize', v)"
          :properties="getProperties(CSIStorageCapacityDefinition.properties.maximumVolumeSize)"
        />
        <OpenApiEdit
          :in="model['nodeTopology']"
          @update:out="(v)=>editor.setkey('nodeTopology', v)"
          :properties="getProperties(CSIStorageCapacityDefinition.properties.nodeTopology)"
        />
      </q-tab-panel>
      <q-tab-panel name="yaml">
          <MonacoEditor
            :text="editor.yaml" :key="editor.yaml"
            @update:text="v=>editor.setYaml(v)"
            :properties="getProperties({properties: Object.fromEntries(Object.entries(CSIStorageCapacityDefinition).filter(([n])=>!['metadata','status'].includes(n)))})"
            />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>
