<script setup lang="ts">
import TableHeader from '@/components/core/TableHeader.vue';
import { ref, useBlockAffinity, BlockAffinityColumns } from '../../libs/projectcalico/BlockAffinity.js'
const { actionNew, toEdit, actionDelete, pagination } = useBlockAffinity();
let filter = ref('');
defineEmits(['refresh']);
withDefaults(defineProps<{model: object[], deletor?:any, useAction?:boolean}>(),{
  deletor: ()=>null,
  useAction: false,
});
</script>
<template>
  <q-card class="q-ma-sm" bordered>
    <TableHeader title="projectcalico BlockAffinitys" :usecreate="useAction" :userefresh="useAction" itemtype='projectcalico BlockAffinity' v-model:model-filter="filter" @refresh="$emit('refresh')" @create="actionNew()" />
    <q-card-section class="q-pa-none">
    <q-table :rows="model" :columns="BlockAffinityColumns.filter(c=>c.name!='Action'||useAction)" class="no-shadow" v-model:pagination="pagination" :filter="filter" hide-bottom>
        <template v-slot:body-cell-Name="props">
          <q-td :props="props">
            <router-link :to="{ name: 'projectcalicoBlockAffinityView', params: { name: props.row.metadata.name }}">{{ props.row.metadata.name }}</router-link>
          </q-td>
        </template>
        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn icon="edit" size="sm" class="q-ml-sm" flat dense @click="toEdit(props.row.metadata.name)">
              <q-tooltip>Edit BlockAffinity {{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
            <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense @click="actionDelete(deletor,props.row)">
              <q-tooltip>Delete BlockAffinity {{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>
