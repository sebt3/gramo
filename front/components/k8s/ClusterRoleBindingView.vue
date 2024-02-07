<script setup lang="ts">
import { onMounted } from "vue";
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoViewer from '@/components/core/MonacoViewer.vue';
import { useClusterRoleBinding, getProperties, ClusterRoleBindingDefinition } from '../../libs/k8s/ClusterRoleBinding.js'
const { onlyReadProperties, viewer, viewerUpdate, setItemFromRoute } = useClusterRoleBinding();setItemFromRoute();
const props = defineProps<{model: object}>();
onMounted(() => {
  viewerUpdate(onlyReadProperties(props.model));
})
</script>
<template>
  <q-card bordered class="q-ma-sm">
    <q-tabs v-model="viewer.tab" class="bg-primary text-grey-4" active-color="white">
      <q-tab label="Simple" name="simple" />
      <q-tab label="roleRef" name="roleRef" v-if="model['roleRef']!=null" />
      <q-tab label="full Yaml" name="yaml" />
    </q-tabs>
    <q-tab-panels v-model="viewer.tab" animated>
      <q-tab-panel name="simple">
        <OpenApiEdit
          :in="model['roleRef']"
          :properties="getProperties(ClusterRoleBindingDefinition.properties.roleRef)"
          :read-only="true"
          :show-default="false"
        />
      </q-tab-panel>
      <q-tab-panel name="roleRef" v-if="model['roleRef']!=null">
        <MonacoViewer :text="viewer.props.roleRef" :key="viewer.props.roleRef" />
      </q-tab-panel>
      <q-tab-panel name="yaml">
        <MonacoViewer :text="viewer.full" :key="viewer.full" />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>
