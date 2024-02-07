<script setup lang="ts">
import { onMounted } from "vue";
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoViewer from '@/components/core/MonacoViewer.vue';
import { useSecret, getProperties, SecretDefinition } from '../../libs/k8s/Secret.js'
const { onlyReadProperties, viewer, viewerUpdate, setNamespacedItemFromRoute } = useSecret();setNamespacedItemFromRoute();
const props = defineProps<{model: object}>();
onMounted(() => {
  viewerUpdate(onlyReadProperties(props.model));
})
</script>
<template>
  <q-card bordered class="q-ma-sm">
    <q-tabs v-model="viewer.tab" class="bg-primary text-grey-4" active-color="white">
      <q-tab label="Simple" name="simple" />
      <q-tab label="data" name="data" v-if="model['data']!=null" />
      <q-tab label="stringData" name="stringData" v-if="model['stringData']!=null" />
      <q-tab label="full Yaml" name="yaml" />
    </q-tabs>
    <q-tab-panels v-model="viewer.tab" animated>
      <q-tab-panel name="simple">
        <OpenApiEdit
          :in="model['data']"
          :properties="getProperties(SecretDefinition.properties.data)"
          :read-only="true"
          :show-default="false"
        />
        <OpenApiEdit
          :in="model['stringData']"
          :properties="getProperties(SecretDefinition.properties.stringData)"
          :read-only="true"
          :show-default="false"
        />
      </q-tab-panel>
      <q-tab-panel name="data" v-if="model['data']!=null">
        <MonacoViewer :text="viewer.props.data" :key="viewer.props.data" />
      </q-tab-panel>
      <q-tab-panel name="stringData" v-if="model['stringData']!=null">
        <MonacoViewer :text="viewer.props.stringData" :key="viewer.props.stringData" />
      </q-tab-panel>
      <q-tab-panel name="yaml">
        <MonacoViewer :text="viewer.full" :key="viewer.full" />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>
