<script setup lang="ts">
import rabbitmqAllRabbitmqClustersQuery from '@/queries/rabbitmq/RabbitmqClusterAllTable.graphql'
import TableHeader from '../core/TableHeader.vue';
import { ref, useQuery, useRabbitmqCluster, rabbitmqClusterAllColumns } from './RabbitmqCluster.js'
let filterRabbitmqCluster = ref('');
const { toEdit: toRabbitmqClusterEdit, actionDelete: actionRabbitmqClusterDelete, onErrorHandler, navigation, pagination } = useRabbitmqCluster();
const { result, refetch, onError } = useQuery(rabbitmqAllRabbitmqClustersQuery, {}, { pollInterval: 500 });onError(onErrorHandler);
</script>
<template>
  <q-card class="q-ma-sm" bordered>
    <TableHeader title="Rabbitmq RabbitmqClusters" v-model:model-filter="filterRabbitmqCluster" itemtype='rabbitmq RabbitmqCluster' @refresh="refetch()" :usecreate="false" />
    <q-card-section class="q-pa-none">
      <q-table v-if="result !== undefined" :rows="result.namespaces.map(x=>x.rabbitmqRabbitmqClusters).flat()" :columns="rabbitmqClusterAllColumns" class="no-shadow" v-model:pagination="pagination" :filter="filterRabbitmqCluster" hide-bottom>
        <template v-slot:body-cell-Namespace="props">
          <q-td :props="props">
            <router-link :to="{ name: 'rabbitmqRabbitmqClusterTable', params: { namespace: props.row.metadata.namespace }}">{{ props.row.metadata.namespace }}</router-link>
          </q-td>
        </template>
        <template v-slot:body-cell-Name="props">
          <q-td :props="props">
            <router-link :to="{ name: 'rabbitmqRabbitmqClusterView', params: { namespace: props.row.metadata.namespace, name: props.row.metadata.name }}">{{ props.row.metadata.name }}</router-link>
          </q-td>
        </template>
        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn icon="edit" size="sm" class="q-ml-sm" flat dense @click="toRabbitmqClusterEdit(navigation.currentNamespace.value, props.row.metadata.name)">
              <q-tooltip>Edit rabbitmqCluster {{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
            <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense @click="actionRabbitmqClusterDelete(props.row)">
              <q-tooltip>Delete rabbitmqCluster {{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>
