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
  {name: 'Name', label: 'Name', field: row => row.host, sortable: true, align: tableColumnAlign.left}
] as QTableColumn[];
const filter = ref('');
defineEmits(['refresh']);
withDefaults(defineProps<{model: object[], useAction?:boolean}>(),{
  useAction: false,
});
</script>
<template>
  <q-card class="q-ma-sm" bordered>
    <TableHeader title="Urls" class="bg-teal" :usecreate="false" :userefresh="useAction" itemtype='vynil Category' v-model:model-filter="filter" @refresh="$emit('refresh')" />
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
