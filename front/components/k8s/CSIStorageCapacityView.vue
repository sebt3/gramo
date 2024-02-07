<script setup lang="ts">
import { onMounted } from "vue";
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoViewer from '@/components/core/MonacoViewer.vue';
import { useCSIStorageCapacity, getProperties, CSIStorageCapacityDefinition } from '../../libs/k8s/CSIStorageCapacity.js'
const { onlyReadProperties, viewer, viewerUpdate, setNamespacedItemFromRoute } = useCSIStorageCapacity();setNamespacedItemFromRoute();
const props = defineProps<{model: object}>();
onMounted(() => {
  viewerUpdate(onlyReadProperties(props.model));
})
</script>
<template>
  <q-card bordered class="q-ma-sm">
    <q-tabs v-model="viewer.tab" class="bg-primary text-grey-4" active-color="white">
      <q-tab label="Simple" name="simple" />
      <q-tab label="capacity" name="capacity" v-if="model['capacity']!=null" />
      <q-tab label="maximumVolumeSize" name="maximumVolumeSize" v-if="model['maximumVolumeSize']!=null" />
      <q-tab label="nodeTopology" name="nodeTopology" v-if="model['nodeTopology']!=null" />
      <q-tab label="full Yaml" name="yaml" />
    </q-tabs>
    <q-tab-panels v-model="viewer.tab" animated>
      <q-tab-panel name="simple">
        <OpenApiEdit
          :in="model['capacity']"
          :properties="getProperties(CSIStorageCapacityDefinition.properties.capacity)"
          :read-only="true"
          :show-default="false"
        />
        <OpenApiEdit
          :in="model['maximumVolumeSize']"
          :properties="getProperties(CSIStorageCapacityDefinition.properties.maximumVolumeSize)"
          :read-only="true"
          :show-default="false"
        />
        <OpenApiEdit
          :in="model['nodeTopology']"
          :properties="getProperties(CSIStorageCapacityDefinition.properties.nodeTopology)"
          :read-only="true"
          :show-default="false"
        />
      </q-tab-panel>
      <q-tab-panel name="capacity" v-if="model['capacity']!=null">
        <MonacoViewer :text="viewer.props.capacity" :key="viewer.props.capacity" />
      </q-tab-panel>
      <q-tab-panel name="maximumVolumeSize" v-if="model['maximumVolumeSize']!=null">
        <MonacoViewer :text="viewer.props.maximumVolumeSize" :key="viewer.props.maximumVolumeSize" />
      </q-tab-panel>
      <q-tab-panel name="nodeTopology" v-if="model['nodeTopology']!=null">
        <MonacoViewer :text="viewer.props.nodeTopology" :key="viewer.props.nodeTopology" />
      </q-tab-panel>
      <q-tab-panel name="yaml">
        <MonacoViewer :text="viewer.full" :key="viewer.full" />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>
