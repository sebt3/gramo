<script setup lang="ts">
import vynilAllInstallsQuery from '@/queries/vynil/InstallAllTable.graphql'
import TableHeader from '../core/TableHeader.vue';
import { ref, useQuery, useInstall, installAllColumns } from './Install.js'
let filter = ref('');
const { onErrorHandler, toView, toEdit, actionDelete, navigation, pagination } = useInstall();
const { result, refetch, onError } = useQuery(vynilAllInstallsQuery, {}, { pollInterval: 500 });onError(onErrorHandler);
</script>
<template>
  <q-card class="q-ma-sm" bordered>
    <TableHeader title="Vynil Installs" v-model:model-filter="filter" itemtype='vynil Install' @refresh="refetch()" :usecreate="false" />
    <q-card-section class="q-pa-none">
      <q-table v-if="result !== undefined" :rows="result.namespaces.map(x=>x.vynilInstalls).flat()" :columns="installAllColumns" class="no-shadow" v-model:pagination="pagination" :filter="filter" hide-bottom>
        <template v-slot:body-cell-Namespace="props">
          <q-td :props="props">
            <router-link :to="{ name: 'vynilInstallTable', params: { namespace: props.row.metadata.namespace }}">{{ props.row.metadata.namespace }}</router-link>
          </q-td>
        </template>
        <template v-slot:body-cell-Name="props">
          <q-td :props="props">
            <router-link :to="{ name: 'vynilInstallView', params: { namespace: props.row.metadata.namespace, name: props.row.metadata.name }}">{{ props.row.metadata.name }}</router-link>
          </q-td>
        </template>
        <template v-slot:body-cell-Distribution="props">
          <q-td :props="props">
            <router-link :to="{ name: 'vynilDistribView', params: { name: props.row.distrib.metadata.name }}">{{ props.row.distrib.metadata.name }}</router-link>
          </q-td>
        </template>
        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn icon="edit" size="sm" class="q-ml-sm" flat dense @click="toEdit(navigation.currentNamespace.value, props.row.metadata.name)" v-if="props.row.metadata.labels == undefined || props.row.metadata.labels.filter(l=>l.name == 'vynil.solidite.fr/owner-name').length==0">
              <q-tooltip>Edit install {{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
            <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense @click="actionDelete(props.row)" v-if="props.row.metadata.labels == undefined || props.row.metadata.labels.filter(l=>l.name == 'vynil.solidite.fr/owner-name').length==0">
              <q-tooltip>Delete install {{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
            <q-btn icon="arrow_upward" size="sm" class="q-ml-sm" flat dense @click="toView(props.row.metadata.labels.filter(l=>l.name == 'vynil.solidite.fr/owner-namespace')[0].value,props.row.metadata.labels.filter(l=>l.name == 'vynil.solidite.fr/owner-name')[0].value)" v-if="props.row.metadata.labels != undefined && props.row.metadata.labels.filter(l=>l.name == 'vynil.solidite.fr/owner-name').length>0">
              <q-tooltip>view parent install {{ props.row.metadata.labels.filter(l=>l.name == 'vynil.solidite.fr/owner-namespace')[0].value }}.{{ props.row.metadata.labels.filter(l=>l.name == 'vynil.solidite.fr/owner-name')[0].value }}</q-tooltip>
            </q-btn>
          </q-td>
        </template>
        <template v-slot:body-cell-Status="props">
          <q-td :props="props">
            <q-chip class="float-right text-white text-capitalize" :label="props.row.status.status" color="warning" v-if="['planning','installing'].includes(props.row.status.status)"></q-chip>
            <q-chip class="float-right text-white text-capitalize" :label="props.row.status.status" color="positive" v-if="props.row.status.status=='installed'"></q-chip>
            <q-chip class="float-right text-white text-capitalize" :label="props.row.status.status" color="negative" v-if="props.row.status.status=='errors'">
              <q-tooltip>{{ props.row.status.errors[0] }}</q-tooltip>
            </q-chip>
            <q-chip class="float-right text-white text-capitalize" :label="props.row.status.status" color="info" v-if="!['installed','planning','installing','errors'].includes(props.row.status.status)"></q-chip>
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>
