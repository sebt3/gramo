<script setup lang="ts">
import { onMounted } from "vue";
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoViewer from '@/components/core/MonacoViewer.vue';
import { usePodTemplate, getProperties, PodTemplateDefinition } from '../../libs/k8s/PodTemplate.js'
const { onlyReadProperties, viewer, viewerUpdate, setNamespacedItemFromRoute } = usePodTemplate();setNamespacedItemFromRoute();
const props = defineProps<{model: object}>();
onMounted(() => {
  viewerUpdate(onlyReadProperties(props.model));
})
</script>
<template>
  <q-card bordered class="q-ma-sm">
    <q-tabs v-model="viewer.tab" class="bg-primary text-grey-4" active-color="white">
      <q-tab label="Simple" name="simple" />
      <q-tab label="template" name="template" v-if="model['template']!=null" />
      <q-tab label="full Yaml" name="yaml" />
    </q-tabs>
    <q-tab-panels v-model="viewer.tab" animated>
      <q-tab-panel name="simple">
        <OpenApiEdit
          :in="model['template']"
          :properties="getProperties(PodTemplateDefinition.properties.template)"
          :read-only="true"
          :show-default="false"
        />
      </q-tab-panel>
      <q-tab-panel name="template" v-if="model['template']!=null">
        <MonacoViewer :text="viewer.props.template" :key="viewer.props.template" />
      </q-tab-panel>
      <q-tab-panel name="yaml">
        <MonacoViewer :text="viewer.full" :key="viewer.full" />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>
