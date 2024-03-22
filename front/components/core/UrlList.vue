<script setup lang="ts">
// noGramoGenerator
const { defineAsyncComponent } = await import('vue')
const TableHeader = defineAsyncComponent(() => import( '@/components/core/TableHeader.vue'));
import { QTableColumn } from 'quasar'
const { tableColumnAlign } = await import('../../libs/core/navigation.js')
const { ref } = await import('vue')
const { useQuasar } = await import("quasar")
const { i18n } = await import("../../libs/i18n")
const $q = useQuasar()
const pagination = ref({rowsPerPage: 0})
const DistribColumns:Array<QTableColumn> = [
  {name: 'Name', label: i18n.global.t('meta.name'), field: row => row.host, sortable: true, align: tableColumnAlign.left}
] as QTableColumn[];
const filter = ref('');
defineEmits(['refresh']);
withDefaults(defineProps<{model: object[], useAction?:boolean}>(),{
  useAction: false,
});
</script>
<template>
  <q-card class="q-ma-sm" bordered>
    <TableHeader :title="i18n.global.t('core.urls')" class="bg-teal" :usecreate="false" :userefresh="useAction" itemtype='coreUrl' v-model:model-filter="filter" @refresh="$emit('refresh')" />
    <q-card-section class="q-pa-none">
    <q-table :rows="model" :class="`bg-teal-${$q.dark.isActive?'10':'1'} no-shadow`" hide-header :columns="DistribColumns" v-model:pagination="pagination" :filter="filter" hide-bottom>
        <template v-slot:body-cell-Name="props">
          <q-td :props="props">
            <a target="_" :href="`${props.row.proto}://${props.row.host}${props.row.path}`">{{ `${props.row.proto}://${props.row.host}${props.row.path}` }}</a>
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>
