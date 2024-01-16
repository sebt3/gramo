<script setup lang="ts">
import fluxcdImageUpdateAutomationsQuery from '@/queries/fluxcd/ImageUpdateAutomationTable.graphql'
import imageUpdateAutomationDelete from '@/queries/fluxcd/ImageUpdateAutomationDelete.graphql'
import TableHeader from '../core/TableHeader.vue';
import { ref, useQuery, useMutation, useImageUpdateAutomation, imageUpdateAutomationColumns } from './ImageUpdateAutomation.js'
let filter = ref('');
const { actionNew, toEdit, actionDelete, pagination, deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute } = useImageUpdateAutomation();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(fluxcdImageUpdateAutomationsQuery, {"namespace": navigation.currentNamespace}, { pollInterval: 500 });
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(imageUpdateAutomationDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <q-card class="q-ma-sm" bordered>
    <TableHeader title="Fluxcd ImageUpdateAutomations" itemtype='fluxcd ImageUpdateAutomation' v-model:model-filter="filter" @refresh="refetch()" @create="actionNew(navigation.currentNamespace.value)" />
    <q-card-section class="q-pa-none">
    <q-table v-if="result !== undefined && result['namespace'] !== undefined && result['namespace']['fluxcdImageUpdateAutomations'] !== undefined" :rows="result.namespace.fluxcdImageUpdateAutomations" :columns="imageUpdateAutomationColumns" class="no-shadow" v-model:pagination="pagination" :filter="filter" hide-bottom>
        <template v-slot:body-cell-Name="props">
          <q-td :props="props">
            <router-link :to="{ name: 'fluxcdImageUpdateAutomationView', params: { namespace: props.row.metadata.namespace, name: props.row.metadata.name }}">{{ props.row.metadata.name }}</router-link>
          </q-td>
        </template>
        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn icon="edit" size="sm" class="q-ml-sm" flat dense @click="toEdit(props.row.metadata.namespace, props.row.metadata.name)">
              <q-tooltip>Edit ImageUpdateAutomation {{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
            <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense @click="actionDelete(deletor,props.row)">
              <q-tooltip>Delete ImageUpdateAutomation {{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>
