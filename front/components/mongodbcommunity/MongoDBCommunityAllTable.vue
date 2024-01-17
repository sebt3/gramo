<script setup lang="ts">
import mongodbcommunityAllMongoDBCommunitysQuery from '@/queries/mongodbcommunity/MongoDBCommunityAllTable.graphql'
import TableHeader from '../core/TableHeader.vue';
import { ref, useQuery, useMongoDBCommunity, mongoDBCommunityAllColumns } from './MongoDBCommunity.js'
let filter = ref('');
const { onErrorHandler, toView, toEdit, actionDelete, navigation, pagination } = useMongoDBCommunity();
const { result, refetch, onError } = useQuery(mongodbcommunityAllMongoDBCommunitysQuery, {}, { pollInterval: 500 });onError(onErrorHandler);
</script>
<template>
  <q-card class="q-ma-sm" bordered>
    <TableHeader title="Mongodbcommunity MongoDBCommunitys" v-model:model-filter="filter" itemtype='mongodbcommunity MongoDBCommunity' @refresh="refetch()" :usecreate="false" />
    <q-card-section class="q-pa-none">
      <q-table v-if="result !== undefined" :rows="result.namespaces.map(x=>x.mongodbcommunityMongoDBCommunitys).flat()" :columns="mongoDBCommunityAllColumns" class="no-shadow" v-model:pagination="pagination" :filter="filter" hide-bottom>
        <template v-slot:body-cell-Namespace="props">
          <q-td :props="props">
            <router-link :to="{ name: 'mongodbcommunityMongoDBCommunityTable', params: { namespace: props.row.metadata.namespace }}">{{ props.row.metadata.namespace }}</router-link>
          </q-td>
        </template>
        <template v-slot:body-cell-Name="props">
          <q-td :props="props">
            <router-link :to="{ name: 'mongodbcommunityMongoDBCommunityView', params: { namespace: props.row.metadata.namespace, name: props.row.metadata.name }}">{{ props.row.metadata.name }}</router-link>
          </q-td>
        </template>
        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn icon="edit" size="sm" class="q-ml-sm" flat dense @click="toEdit(navigation.currentNamespace.value, props.row.metadata.name)">
              <q-tooltip>Edit mongoDBCommunity {{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
            <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense @click="actionDelete(props.row)">
              <q-tooltip>Delete mongoDBCommunity {{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>
