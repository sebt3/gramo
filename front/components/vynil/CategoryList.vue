<script setup lang="ts">
// noGramoGenerator
const { defineAsyncComponent } = await import('vue')
const TableHeader = defineAsyncComponent(() => import( '@/components/core/TableHeader.vue'));
import { QTableColumn } from 'quasar'
const { tableColumnAlign } = await import('../../libs/core/navigation.js')
const { ref } = await import('vue')
const { useQuasar } = await import("quasar")
const $q = useQuasar()
const { i18n } = await import("../../libs/i18n")
const pagination = ref({rowsPerPage: 0})
const DistribColumns:Array<QTableColumn> = [
  {name: 'Name', label: i18n.global.t('meta.name'), field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left}
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
    <TableHeader :title="$t('vynil.cat')" class="bg-teal" :usecreate="false" :userefresh="useAction" itemtype='vynil Category' v-model:model-filter="filter" @refresh="$emit('refresh')" />
    <q-card-section class="q-pa-none">
    <q-table :rows="model" :class="`bg-teal-${$q.dark.isActive?'10':'1'} no-shadow`" hide-header :columns="DistribColumns" v-model:pagination="pagination" :filter="filter" hide-bottom>
        <template v-slot:body-cell-Name="props">
          <q-td :props="props">
            {{ props.row.name }}
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>
