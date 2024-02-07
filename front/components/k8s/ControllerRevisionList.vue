<script setup lang="ts">
import TableHeader from '@/components/core/TableHeader.vue';
import { ref, useControllerRevision, ControllerRevisionColumns, ControllerRevisionAllColumns } from '../../libs/k8s/ControllerRevision.js'
const { actionNew, toEdit, actionDelete, pagination, navigation, isNamespaced } = useControllerRevision();
let filter = ref('');
defineEmits(['refresh']);
withDefaults(defineProps<{model: object[], deletor:any, useAction?:boolean}>(),{
  useAction: false,
});
</script>
<template>
  <q-card class="q-ma-sm" bordered>
    <TableHeader title="k8s ControllerRevisions" itemtype='k8s ControllerRevision' v-model:model-filter="filter" @refresh="$emit('refresh')" @create="actionNew(navigation.currentNamespace.value)" />
    <q-card-section class="q-pa-none">
    <q-table :rows="model" :columns="!isNamespaced()?ControllerRevisionAllColumns:ControllerRevisionColumns.filter(c=>c.name!='Action'||useAction)" class="no-shadow" v-model:pagination="pagination" :filter="filter" hide-bottom>
        <template v-slot:body-cell-Namespace="props" v-if="!isNamespaced()">
          <q-td :props="props">
            <router-link :to="{ name: 'k8sControllerRevisionTable', params: { namespace: props.row.metadata.namespace }}">{{ props.row.metadata.namespace }}</router-link>
          </q-td>
        </template>
        <template v-slot:body-cell-Name="props">
          <q-td :props="props">
            <router-link :to="{ name: 'k8sControllerRevisionView', params: { namespace: props.row.metadata.namespace, name: props.row.metadata.name }}">{{ props.row.metadata.name }}</router-link>
          </q-td>
        </template>
        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn icon="edit" size="sm" class="q-ml-sm" flat dense @click="toEdit(props.row.metadata.namespace, props.row.metadata.name)">
              <q-tooltip>Edit ControllerRevision {{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
            <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense @click="actionDelete(deletor,props.row)">
              <q-tooltip>Delete ControllerRevision {{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>
