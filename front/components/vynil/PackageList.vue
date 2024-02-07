<script setup lang="ts">
// noGramoGenerator
import TableHeader from '@/components/core/TableHeader.vue';
import { QTableColumn } from 'quasar'
import { ref, useCore, tableColumnAlign } from '../../libs/core'
const { pagination } = useCore();
const DistribColumns:Array<QTableColumn> = [
    {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
    {name: 'Category', label: 'Category', field: row => row.providedByCategory.name, sortable: true, align: tableColumnAlign.left},
    {name: 'Description', label: 'Description', field: row => row.description, sortable: true, align: tableColumnAlign.left}
] as QTableColumn[];
const filter = ref('');
defineEmits(['refresh']);
withDefaults(defineProps<{model: object[], deletor?:any, useAction?:boolean}>(),{
  deletor: ()=>null,
  useAction: false,
});
</script>
<template>
  <q-card class="q-ma-sm" bordered v-if="model.length>1">
    <TableHeader title="Packages" :usecreate="false" :userefresh="useAction" itemtype='vynil Package' v-model:model-filter="filter" @refresh="$emit('refresh')" />
    <q-card-section class="q-pa-none">
    <q-table :rows="model" :columns="DistribColumns" class="no-shadow" v-model:pagination="pagination" :filter="filter" hide-bottom>
        <template v-slot:body-cell-Name="props">
          <q-td :props="props">
            {{ props.row.name }}
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
  <q-card bordered class="q-ma-sm" v-else>
    <q-card-section class="bg-secondary text-grey-4">
      <div class="text-h6 q-mt-none q-mb-none q-pt-none q-pb-none">Package
      </div>
    </q-card-section>
    <q-card-section>
        <q-field label="Distribution" stack-label borderless>
          <template v-slot:prepend><q-icon name="alt_route" /></template>
          <template v-slot:control><div class="self-center full-width no-outline" tabindex="0">{{ model[0].providedByDistrib.metadata.name }}</div></template>
        </q-field>
        <q-field label="Category" stack-label borderless>
          <template v-slot:prepend><q-icon name="category" /></template>
          <template v-slot:control><div class="self-center full-width no-outline" tabindex="0">{{ model[0].providedByCategory.name }}</div></template>
        </q-field>
        <q-field label="Name" stack-label borderless>
        <template v-slot:prepend><q-icon name="smart_button" /></template>
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0">{{ model[0].name }}</div>
        </template>
      </q-field>
    </q-card-section>
  </q-card>
</template>
