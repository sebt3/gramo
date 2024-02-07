<script setup lang="ts">
import MetadataView from '@/components/core/MetadataView.vue';
import { ref, useRuntimeClass } from '../../libs/k8s/RuntimeClass.js'
const { actionNew, toEdit, actionDelete } = useRuntimeClass();
const to=ref({})
withDefaults(defineProps<{model: object, deletor?:any, useActions?:boolean}>(), {
  deletor: ()=>null,
  useActions: false
});
</script>
<template>
  <q-card bordered class="q-ma-sm">
    <q-card-section class="bg-primary text-grey-4">
      <div class="text-h6 q-mt-none q-mb-none q-pt-none q-pb-none">RuntimeClass
        <q-btn-group push class="float-right text-capitalize shadow-3" v-if="useActions">
          <q-btn icon="edit" @click="toEdit(model.metadata.name)">
            <q-tooltip>Edit</q-tooltip>
          </q-btn>
          <q-btn icon="delete" @click="actionDelete(deletor, model)">
            <q-tooltip>Delete</q-tooltip>
          </q-btn>
        </q-btn-group>
      </div>
    </q-card-section>
    <q-card-section  v-if="useActions">
      <MetadataView
        :metadata="model.metadata"
        :to="{ name: 'k8sRuntimeClassTable', params: {  } }"
        />
    </q-card-section>
    <q-card-section  v-else>
      <MetadataView
        :metadata="model.metadata"
        :to="{ name: 'k8sRuntimeClassTable', params: {  } }"
        :nameTo="{ name: 'k8sRuntimeClassView', params: {  name: model.metadata.name } }"
        />
    </q-card-section>
  </q-card>
</template>
