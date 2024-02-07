<script setup lang="ts">
import { onMounted } from "vue";
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { useClusterRoleBinding, getProperties, ClusterRoleBindingDefinition } from '../../libs/k8s/ClusterRoleBinding.js'
const { onlyReadProperties, editor, setItemFromRoute } = useClusterRoleBinding();setItemFromRoute();
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
          :in="model['roleRef']"
          @update:out="(v)=>editor.setkey('roleRef', v)"
          :properties="getProperties(ClusterRoleBindingDefinition.properties.roleRef)"
        />
      </q-tab-panel>
      <q-tab-panel name="yaml">
          <MonacoEditor
            :text="editor.yaml" :key="editor.yaml"
            @update:text="v=>editor.setYaml(v)"
            :properties="getProperties({properties: Object.fromEntries(Object.entries(ClusterRoleBindingDefinition).filter(([n])=>!['metadata','status'].includes(n)))})"
            />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>
