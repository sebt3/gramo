<script setup lang="ts">
import { onMounted } from "vue";
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoViewer from '@/components/core/MonacoViewer.vue';
import { useStorageClass, getProperties, StorageClassDefinition } from '../../libs/k8s/StorageClass.js'
const { onlyReadProperties, viewer, viewerUpdate, setItemFromRoute } = useStorageClass();setItemFromRoute();
const props = defineProps<{model: object}>();
onMounted(() => {
  viewerUpdate(onlyReadProperties(props.model));
})
</script>
<template>
  <q-card bordered class="q-ma-sm">
    <q-tabs v-model="viewer.tab" class="bg-primary text-grey-4" active-color="white">
      <q-tab label="Simple" name="simple" />
      <q-tab label="parameters" name="parameters" v-if="model['parameters']!=null" />
      <q-tab label="full Yaml" name="yaml" />
    </q-tabs>
    <q-tab-panels v-model="viewer.tab" animated>
      <q-tab-panel name="simple">
        <OpenApiEdit
          :in="model['parameters']"
          :properties="getProperties(StorageClassDefinition.properties.parameters)"
          :read-only="true"
          :show-default="false"
        />
      </q-tab-panel>
      <q-tab-panel name="parameters" v-if="model['parameters']!=null">
        <MonacoViewer :text="viewer.props.parameters" :key="viewer.props.parameters" />
      </q-tab-panel>
      <q-tab-panel name="yaml">
        <MonacoViewer :text="viewer.full" :key="viewer.full" />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>
