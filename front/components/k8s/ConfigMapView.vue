<script setup lang="ts">
import { onMounted } from "vue";
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoViewer from '@/components/core/MonacoViewer.vue';
import { useConfigMap, getProperties, ConfigMapDefinition } from '../../libs/k8s/ConfigMap.js'
const { onlyReadProperties, viewer, viewerUpdate, setNamespacedItemFromRoute } = useConfigMap();setNamespacedItemFromRoute();
const props = defineProps<{model: object}>();
onMounted(() => {
  viewerUpdate(onlyReadProperties(props.model));
})
</script>
<template>
  <q-card bordered class="q-ma-sm">
    <q-tabs v-model="viewer.tab" class="bg-primary text-grey-4" active-color="white">
      <q-tab label="Simple" name="simple" />
      <q-tab label="binaryData" name="binaryData" v-if="model['binaryData']!=null" />
      <q-tab label="data" name="data" v-if="model['data']!=null" />
      <q-tab label="full Yaml" name="yaml" />
    </q-tabs>
    <q-tab-panels v-model="viewer.tab" animated>
      <q-tab-panel name="simple">
        <OpenApiEdit
          :in="model['binaryData']"
          :properties="getProperties(ConfigMapDefinition.properties.binaryData)"
          :read-only="true"
          :show-default="false"
        />
        <OpenApiEdit
          :in="model['data']"
          :properties="getProperties(ConfigMapDefinition.properties.data)"
          :read-only="true"
          :show-default="false"
        />
      </q-tab-panel>
      <q-tab-panel name="binaryData" v-if="model['binaryData']!=null">
        <MonacoViewer :text="viewer.props.binaryData" :key="viewer.props.binaryData" />
      </q-tab-panel>
      <q-tab-panel name="data" v-if="model['data']!=null">
        <MonacoViewer :text="viewer.props.data" :key="viewer.props.data" />
      </q-tab-panel>
      <q-tab-panel name="yaml">
        <MonacoViewer :text="viewer.full" :key="viewer.full" />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>
