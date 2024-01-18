<script setup lang="ts">
import mariadbUsersQuery from '@/queries/mariadb/UserTable.graphql'
import userDelete from '@/queries/mariadb/UserDelete.graphql'
import TableHeader from '../core/TableHeader.vue';
import { ref, useQuery, useMutation, useUser, userColumns } from './User.js'
let filter = ref('');
const { actionNew, toEdit, actionDelete, pagination, deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute } = useUser();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(mariadbUsersQuery, {"namespace": navigation.currentNamespace}, { pollInterval: 500 });
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(userDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <q-card class="q-ma-sm" bordered>
    <TableHeader title="Mariadb Users" itemtype='mariadb User' v-model:model-filter="filter" @refresh="refetch()" @create="actionNew(navigation.currentNamespace.value)" />
    <q-card-section class="q-pa-none">
    <q-table v-if="result !== undefined && result['namespace'] !== undefined && result['namespace']['mariadbUsers'] !== undefined" :rows="result.namespace.mariadbUsers" :columns="userColumns" class="no-shadow" v-model:pagination="pagination" :filter="filter" hide-bottom>
        <template v-slot:body-cell-Name="props">
          <q-td :props="props">
            <router-link :to="{ name: 'mariadbUserView', params: { namespace: props.row.metadata.namespace, name: props.row.metadata.name }}">{{ props.row.metadata.name }}</router-link>
          </q-td>
        </template>
        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn icon="edit" size="sm" class="q-ml-sm" flat dense @click="toEdit(props.row.metadata.namespace, props.row.metadata.name)">
              <q-tooltip>Edit User {{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
            <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense @click="actionDelete(deletor,props.row)">
              <q-tooltip>Delete User {{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>
