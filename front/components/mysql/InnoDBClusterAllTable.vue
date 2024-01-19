<script setup lang="ts">
import mysqlAllInnoDBClustersQuery from '@/queries/mysql/InnoDBClusterAllTable.graphql'
import TableHeader from '../core/TableHeader.vue';
import { ref, useQuery, useInnoDBCluster, innoDBClusterAllColumns } from './InnoDBCluster.js'
let filterInnoDBCluster = ref('');
const { toEdit: toInnoDBClusterEdit, actionDelete: actionInnoDBClusterDelete, onErrorHandler, navigation, pagination } = useInnoDBCluster();
const { result, refetch, onError } = useQuery(mysqlAllInnoDBClustersQuery, {}, { pollInterval: 500 });onError(onErrorHandler);
</script>
<template>
  <q-card class="q-ma-sm" bordered>
    <TableHeader title="Mysql InnoDBClusters" v-model:model-filter="filterInnoDBCluster" itemtype='mysql InnoDBCluster' @refresh="refetch()" :usecreate="false" />
    <q-card-section class="q-pa-none">
      <q-table v-if="result !== undefined" :rows="result.namespaces.map(x=>x.mysqlInnoDBClusters).flat()" :columns="innoDBClusterAllColumns" class="no-shadow" v-model:pagination="pagination" :filter="filterInnoDBCluster" hide-bottom>
        <template v-slot:body-cell-Namespace="props">
          <q-td :props="props">
            <router-link :to="{ name: 'mysqlInnoDBClusterTable', params: { namespace: props.row.metadata.namespace }}">{{ props.row.metadata.namespace }}</router-link>
          </q-td>
        </template>
        <template v-slot:body-cell-Name="props">
          <q-td :props="props">
            <router-link :to="{ name: 'mysqlInnoDBClusterView', params: { namespace: props.row.metadata.namespace, name: props.row.metadata.name }}">{{ props.row.metadata.name }}</router-link>
          </q-td>
        </template>
        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn icon="edit" size="sm" class="q-ml-sm" flat dense @click="toInnoDBClusterEdit(navigation.currentNamespace.value, props.row.metadata.name)">
              <q-tooltip>Edit innoDBCluster {{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
            <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense @click="actionInnoDBClusterDelete(props.row)">
              <q-tooltip>Delete innoDBCluster {{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>
