<script setup lang="ts">
import { onMounted } from "vue";
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoViewer from '@/components/core/MonacoViewer.vue';
import { useRuntimeClass, getProperties, RuntimeClassDefinition } from '../../libs/k8s/RuntimeClass.js'
const { onlyReadProperties, viewer, viewerUpdate, setItemFromRoute } = useRuntimeClass();setItemFromRoute();
const props = defineProps<{model: object}>();
onMounted(() => {
  viewerUpdate(onlyReadProperties(props.model));
})
</script>
<template>
  <q-card bordered class="q-ma-sm">
    <q-tabs v-model="viewer.tab" class="bg-primary text-grey-4" active-color="white">
      <q-tab label="Simple" name="simple" />
      <q-tab label="overhead" name="overhead" v-if="model['overhead']!=null" />
      <q-tab label="scheduling" name="scheduling" v-if="model['scheduling']!=null" />
      <q-tab label="full Yaml" name="yaml" />
    </q-tabs>
    <q-tab-panels v-model="viewer.tab" animated>
      <q-tab-panel name="simple">
        <OpenApiEdit
          :in="model['overhead']"
          :properties="getProperties(RuntimeClassDefinition.properties.overhead)"
          :read-only="true"
          :show-default="false"
        />
        <OpenApiEdit
          :in="model['scheduling']"
          :properties="getProperties(RuntimeClassDefinition.properties.scheduling)"
          :read-only="true"
          :show-default="false"
        />
      </q-tab-panel>
      <q-tab-panel name="overhead" v-if="model['overhead']!=null">
        <MonacoViewer :text="viewer.props.overhead" :key="viewer.props.overhead" />
      </q-tab-panel>
      <q-tab-panel name="scheduling" v-if="model['scheduling']!=null">
        <MonacoViewer :text="viewer.props.scheduling" :key="viewer.props.scheduling" />
      </q-tab-panel>
      <q-tab-panel name="yaml">
        <MonacoViewer :text="viewer.full" :key="viewer.full" />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>
