<script setup lang="ts">
import vynilInstallsQuery from '@/queries/vynil/InstallTable.graphql'
import installDelete from '@/queries/vynil/InstallDelete.graphql'
import TableHeader from '../core/TableHeader.vue';
import { ref, useQuery, useMutation, useInstall, installColumns } from './Install.js'
let filter = ref('');
const { deleteDone, deleteError, toView, toEdit, actionDelete, actionNew, navigation, pagination, onErrorHandler, setNamespaceFromRoute } = useInstall();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(vynilInstallsQuery, {"namespace": navigation.currentNamespace}, { pollInterval: 500 });
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(installDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <q-card class="q-ma-sm" bordered>
    <TableHeader title="Vynil Installs" v-model:model-filter="filter" itemtype='vynil Install' @refresh="refetch()" @create="actionNew(navigation.currentNamespace.value)" />
    <q-card-section class="q-pa-none">
      <q-table v-if="result !== undefined && result['namespace']['vynilInstalls'] !== undefined && result['namespace'] !== undefined" :rows="result.namespace.vynilInstalls" :columns="installColumns" class="no-shadow" v-model:pagination="pagination" :filter="filter" hide-bottom>
        <template v-slot:body-cell-Distribution="props">
          <q-td :props="props">
            <router-link :to="{ name: 'vynilDistribView', params: { name: props.row.distrib.metadata.name }}">{{ props.row.distrib.metadata.name }}</router-link>
          </q-td>
        </template>
        <template v-slot:body-cell-Name="props">
          <q-td :props="props">
            <router-link :to="{ name: 'vynilInstallView', params: { name: props.row.metadata.name, namespace: props.row.metadata.namespace }}">{{ props.row.metadata.name }}</router-link>
          </q-td>
        </template>
        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn icon="edit" size="sm" class="q-ml-sm" flat dense @click="toEdit(navigation.currentNamespace.value, props.row.metadata.name)" v-if="props.row.metadata.labels == undefined || props.row.metadata.labels.filter(l=>l.name == 'vynil.solidite.fr/owner-name').length==0">
              <q-tooltip>Edit install {{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
            <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense @click="actionDelete(deletor,props.row)" v-if="props.row.metadata.labels == undefined || props.row.metadata.labels.filter(l=>l.name == 'vynil.solidite.fr/owner-name').length==0">
              <q-tooltip>Delete install {{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
            <q-btn icon="arrow_upward" size="sm" class="q-ml-sm" flat dense @click="toView(props.row.metadata.labels.filter(l=>l.name == 'vynil.solidite.fr/owner-namespace')[0].value,props.row.metadata.labels.filter(l=>l.name == 'vynil.solidite.fr/owner-name')[0].value)" v-if="props.row.metadata.labels != undefined && props.row.metadata.labels.filter(l=>l.name == 'vynil.solidite.fr/owner-name').length>0">
              <q-tooltip>view parent install {{ props.row.metadata.labels.filter(l=>l.name == 'vynil.solidite.fr/owner-namespace')[0].value }}.{{ props.row.metadata.labels.filter(l=>l.name == 'vynil.solidite.fr/owner-name')[0].value }}</q-tooltip>
            </q-btn>
          </q-td>
        </template>
        <template v-slot:body-cell-Status="props">
          <q-td :props="props">
            <q-chip class="float-right text-white text-capitalize" :label="props.row.status.status" :color="['planning','installing'].includes(props.row.status.status)?'warning':props.row.status.status=='installed'?'positive':'info'" v-if="props.row.status.status!='errors'"></q-chip>
            <q-chip class="float-right text-white text-capitalize" :label="props.row.status.status" color="negative" v-if="props.row.status.status=='errors'">
              <q-tooltip>{{ props.row.status.errors[0] }}</q-tooltip>
            </q-chip>
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>
