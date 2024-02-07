<script setup lang="ts">
import { onMounted } from "vue";
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoViewer from '@/components/core/MonacoViewer.vue';
import { useRabbitmqCluster, getProperties, RabbitmqClusterDefinition } from '../../libs/rabbitmq/RabbitmqCluster.js'
const { onlyReadProperties, viewer, viewerUpdate, setNamespacedItemFromRoute } = useRabbitmqCluster();setNamespacedItemFromRoute();
const props = defineProps<{model: object}>();
onMounted(() => {
  viewerUpdate(onlyReadProperties(props.model));
})
</script>
<template>
  <q-card bordered class="q-ma-sm">
    <q-tabs v-model="viewer.tab" class="bg-primary text-grey-4" active-color="white">
      <q-tab label="Simple" name="simple" />
      <q-tab label="spec" name="spec" v-if="model['spec']!=null" />
      <q-tab label="full Yaml" name="yaml" />
    </q-tabs>
    <q-tab-panels v-model="viewer.tab" animated>
      <q-tab-panel name="simple">
        <OpenApiEdit
          :in="model['spec']"
          :properties="getProperties(RabbitmqClusterDefinition.properties.spec)"
          :read-only="true"
          :show-default="false"
        />
      </q-tab-panel>
      <q-tab-panel name="spec" v-if="model['spec']!=null">
        <MonacoViewer :text="viewer.props.spec" :key="viewer.props.spec" />
      </q-tab-panel>
      <q-tab-panel name="yaml">
        <MonacoViewer :text="viewer.full" :key="viewer.full" />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>
