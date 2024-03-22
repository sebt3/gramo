<script setup lang="ts">
// noGramoGenerator
const { defineAsyncComponent } = await import('vue')
const TableHeader = defineAsyncComponent(() => import( '@/components/core/TableHeader.vue'));
const { i18n } = await import("../../libs/i18n")
import { QTableColumn } from 'quasar'
const { tableColumnAlign } = await import('../../libs/core/navigation.js')
const { ref } = await import('vue')
const { useQuasar } = await import("quasar")
const $q = useQuasar()
const pagination = ref({rowsPerPage: 0})
const PackageColumns:Array<QTableColumn> = [
    {name: 'Name', label: i18n.global.t('meta.name'), field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
    {name: 'Category', label: i18n.global.t('vynil.cat'), field: row => row.consumevynilCategory.name, sortable: true, align: tableColumnAlign.left},
    {name: 'Description', label: i18n.global.t('vynil.desc'), field: row => row.description, sortable: true, align: tableColumnAlign.left}
] as QTableColumn[];
const filter = ref('');
defineEmits(['refresh']);
withDefaults(defineProps<{model: object[], parent?:object, deletor?:any, useAction?:boolean}>(),{
  deletor: ()=>null,
  useAction: false,
});
</script>
<template>
  <q-card class="q-ma-sm" bordered>
    <TableHeader :title="i18n.global.t('vynil.pck')" class="bg-teal" :usecreate="false" :userefresh="useAction" itemtype='vynil Package' v-model:model-filter="filter" @refresh="$emit('refresh')" />
    <q-card-section class="q-pa-none">
    <q-table :class="`bg-teal-${$q.dark.isActive?'10':'1'} no-shadow`" :rows="model" :columns="PackageColumns" v-model:pagination="pagination" :filter="filter" hide-bottom>
        <template v-slot:body-cell-Name="props">
          <q-td :props="props">
            {{ props.row.name }}
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>
