<script setup lang="ts">
import vynilDistribsQuery from '@/queries/vynil/DistribTable.graphql'
import distribDelete from '@/queries/vynil/DistribDelete.graphql'
import TableHeader from '../core/TableHeader.vue';
import { ref, useQuery, useMutation, useDistrib, distribColumns } from './Distrib.js'
let filter = ref('');
const { actionNew, toEdit, actionDelete, pagination, deleteDone, deleteError, onErrorHandler } = useDistrib();
const { result, refetch, onError } = useQuery(vynilDistribsQuery, {}, { pollInterval: 500 });
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(distribDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <q-card class="q-ma-sm" bordered>
    <TableHeader title="Vynil Distribs" itemtype='vynil Distrib' v-model:model-filter="filter" @refresh="refetch()" @create="actionNew()" />
    <q-card-section class="q-pa-none">
      <q-table v-if="result !== undefined && result['vynilDistribs'] !== undefined" :rows="result.vynilDistribs" :columns="distribColumns" class="no-shadow" v-model:pagination="pagination" :filter="filter" hide-bottom>
        <template v-slot:body-cell-Name="props">
          <q-td :props="props">
            <router-link :to="{ name: 'vynilDistribView', params: { name: props.row.metadata.name }}">{{ props.row.metadata.name }}</router-link>
          </q-td>
        </template>
        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn icon="edit" size="sm" class="q-ml-sm" flat dense @click="toEdit(props.row.metadata.name)">
              <q-tooltip>Edit Distrib {{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
            <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense @click="actionDelete(deletor,props.row)">
              <q-tooltip>Delete Distrib {{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>
