<script setup lang="ts">
import mysqlAllMySQLBackupsQuery from '@/queries/mysql/MySQLBackupAllTable.graphql'
import TableHeader from '../core/TableHeader.vue';
import { ref, useQuery, useMySQLBackup, mySQLBackupAllColumns } from './MySQLBackup.js'
let filterMySQLBackup = ref('');
const { toEdit: toMySQLBackupEdit, actionDelete: actionMySQLBackupDelete, onErrorHandler, navigation, pagination } = useMySQLBackup();
const { result, refetch, onError } = useQuery(mysqlAllMySQLBackupsQuery, {}, { pollInterval: 500 });onError(onErrorHandler);
</script>
<template>
  <q-card class="q-ma-sm" bordered>
    <TableHeader title="Mysql MySQLBackups" v-model:model-filter="filterMySQLBackup" itemtype='mysql MySQLBackup' @refresh="refetch()" :usecreate="false" />
    <q-card-section class="q-pa-none">
      <q-table v-if="result !== undefined" :rows="result.namespaces.map(x=>x.mysqlMySQLBackups).flat()" :columns="mySQLBackupAllColumns" class="no-shadow" v-model:pagination="pagination" :filter="filterMySQLBackup" hide-bottom>
        <template v-slot:body-cell-Namespace="props">
          <q-td :props="props">
            <router-link :to="{ name: 'mysqlMySQLBackupTable', params: { namespace: props.row.metadata.namespace }}">{{ props.row.metadata.namespace }}</router-link>
          </q-td>
        </template>
        <template v-slot:body-cell-Name="props">
          <q-td :props="props">
            <router-link :to="{ name: 'mysqlMySQLBackupView', params: { namespace: props.row.metadata.namespace, name: props.row.metadata.name }}">{{ props.row.metadata.name }}</router-link>
          </q-td>
        </template>
        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn icon="edit" size="sm" class="q-ml-sm" flat dense @click="toMySQLBackupEdit(navigation.currentNamespace.value, props.row.metadata.name)">
              <q-tooltip>Edit mySQLBackup {{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
            <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense @click="actionMySQLBackupDelete(props.row)">
              <q-tooltip>Delete mySQLBackup {{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>
