<script setup lang="ts">
// noGramoGenerator
import { defineAsyncComponent } from 'vue'
const  TableHeader   = defineAsyncComponent(() => import( '@/components/core/TableHeader.vue'));
import { QTableColumn } from 'quasar'
import { ref, useCore, tableColumnAlign } from '../../libs/core'
import { useQuasar } from 'quasar'
const $q = useQuasar()
const { pagination } = useCore();
const DistribColumns:Array<QTableColumn> = [
    {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
    {name: 'Category', label: 'Category', field: row => row.consumevynilCategory.name, sortable: true, align: tableColumnAlign.left},
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
  <q-card class="q-ma-sm" bordered>
    <TableHeader title="Packages" class="bg-teal" :usecreate="false" :userefresh="useAction" itemtype='vynil Package' v-model:model-filter="filter" @refresh="$emit('refresh')" />
    <q-card-section class="q-pa-none">
    <q-table :class="`bg-teal-${$q.dark.isActive?'10':'1'} no-shadow`" :rows="model" :columns="DistribColumns" v-model:pagination="pagination" :filter="filter" hide-bottom>
        <template v-slot:body-cell-Name="props">
          <q-td :props="props">
            {{ props.row.name }}
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>
