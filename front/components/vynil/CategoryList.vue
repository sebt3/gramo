<script setup lang="ts">
// noGramoGenerator
import TableHeader from '@/components/core/TableHeader.vue';
import { QTableColumn } from 'quasar'
import { ref, useCore, tableColumnAlign } from '../../libs/core'
const { pagination } = useCore();
const DistribColumns:Array<QTableColumn> = [
  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left}
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
    <TableHeader title="Categories" class="bg-teal" :usecreate="false" :userefresh="useAction" itemtype='vynil Category' v-model:model-filter="filter" @refresh="$emit('refresh')" />
    <q-card-section class="q-pa-none">
    <q-table :rows="model" class="bg-teal-1 no-shadow" hide-header :columns="DistribColumns" v-model:pagination="pagination" :filter="filter" hide-bottom>
        <template v-slot:body-cell-Name="props">
          <q-td :props="props">
            {{ props.row.name }}
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
  <q-card bordered class="q-ma-sm" v-else>
    <q-card-section class="bg-teal text-grey-2">
      <div class="text-h6 q-mt-none q-mb-none q-pt-none q-pb-none">Category
      </div>
    </q-card-section>
    <q-card-section  class="bg-teal-2">
        <q-field label="Name" stack-label borderless>
        <template v-slot:prepend><q-icon name="smart_button" /></template>
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0">{{ model.name }}</div>
        </template>
      </q-field>
    </q-card-section>
  </q-card>
</template>
