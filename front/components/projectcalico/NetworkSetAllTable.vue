<script setup lang="ts">
import projectcalicoAllNetworkSetsQuery from '@/queries/projectcalico/NetworkSetAllTable.graphql'
import TableHeader from '../core/TableHeader.vue';
import { ref, useQuery, useNetworkSet, networkSetAllColumns } from './NetworkSet.js'
let filterNetworkSet = ref('');
const { toEdit: toNetworkSetEdit, actionDelete: actionNetworkSetDelete, onErrorHandler, navigation, pagination } = useNetworkSet();
const { result, refetch, onError } = useQuery(projectcalicoAllNetworkSetsQuery, {}, { pollInterval: 500 });onError(onErrorHandler);
</script>
<template>
  <q-card class="q-ma-sm" bordered>
    <TableHeader title="Projectcalico NetworkSets" v-model:model-filter="filterNetworkSet" itemtype='projectcalico NetworkSet' @refresh="refetch()" :usecreate="false" />
    <q-card-section class="q-pa-none">
      <q-table v-if="result !== undefined" :rows="result.namespaces.map(x=>x.projectcalicoNetworkSets).flat()" :columns="networkSetAllColumns" class="no-shadow" v-model:pagination="pagination" :filter="filterNetworkSet" hide-bottom>
        <template v-slot:body-cell-Namespace="props">
          <q-td :props="props">
            <router-link :to="{ name: 'projectcalicoNetworkSetTable', params: { namespace: props.row.metadata.namespace }}">{{ props.row.metadata.namespace }}</router-link>
          </q-td>
        </template>
        <template v-slot:body-cell-Name="props">
          <q-td :props="props">
            <router-link :to="{ name: 'projectcalicoNetworkSetView', params: { namespace: props.row.metadata.namespace, name: props.row.metadata.name }}">{{ props.row.metadata.name }}</router-link>
          </q-td>
        </template>
        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn icon="edit" size="sm" class="q-ml-sm" flat dense @click="toNetworkSetEdit(navigation.currentNamespace.value, props.row.metadata.name)">
              <q-tooltip>Edit networkSet {{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
            <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense @click="actionNetworkSetDelete(props.row)">
              <q-tooltip>Delete networkSet {{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>
