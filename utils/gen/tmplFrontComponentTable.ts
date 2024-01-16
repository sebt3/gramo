import HB from 'handlebars';
export const templateComponentTable = HB.compile(
`<script setup lang="ts">
import {{ mini }}{{ name }}sQuery from '@/queries/{{ mini }}/{{ name }}Table.graphql'
import {{ miniName }}Delete from '@/queries/{{ mini }}/{{ name }}Delete.graphql'
import TableHeader from '../core/TableHeader.vue';
import { ref, useQuery, useMutation, use{{ name }}, {{ miniName }}Columns } from './{{ name }}.js'
let filter = ref('');
{{#if namespaced}}
const { actionNew, toEdit, actionDelete, pagination, deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute } = use{{ name }}();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery({{ mini }}{{ name }}sQuery, {"namespace": navigation.currentNamespace}, { pollInterval: 500 });
{{else}}
const { actionNew, toEdit, actionDelete, pagination, deleteDone, deleteError, onErrorHandler } = use{{ name }}();
const { result, refetch, onError } = useQuery({{ mini }}{{ name }}sQuery, {}, { pollInterval: 500 });
{{/if}}
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation({{ miniName }}Delete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <q-card class="q-ma-sm" bordered>
{{#if namespaced}}
    <TableHeader title="{{ short }} {{ name }}s" itemtype='{{ mini }} {{ name }}' v-model:model-filter="filter" @refresh="refetch()" @create="actionNew(navigation.currentNamespace.value)" />
{{else}}
    <TableHeader title="{{ short }} {{ name }}s" itemtype='{{ mini }} {{ name }}' v-model:model-filter="filter" @refresh="refetch()" @create="actionNew()" />
{{/if}}
    <q-card-section class="q-pa-none">
{{#if namespaced}}
    <q-table v-if="result !== undefined && result['namespace'] !== undefined && result['namespace']['{{ mini }}{{ name }}s'] !== undefined" :rows="result.namespace.{{ mini }}{{ name }}s" :columns="{{ miniName }}Columns" class="no-shadow" v-model:pagination="pagination" :filter="filter" hide-bottom>
{{else}}
    <q-table v-if="result !== undefined && result['{{ mini }}{{ name }}s'] !== undefined" :rows="result.{{ mini }}{{ name }}s" :columns="{{ miniName }}Columns" class="no-shadow" v-model:pagination="pagination" :filter="filter" hide-bottom>
{{/if}}
        <template v-slot:body-cell-Name="props">
          <q-td :props="props">
{{#if namespaced}}
            <router-link :to="{ name: '{{ mini }}{{ name }}View', params: { namespace: props.row.metadata.namespace, name: props.row.metadata.name }}">\\{{ props.row.metadata.name }}</router-link>
{{else}}
            <router-link :to="{ name: '{{ mini }}{{ name }}View', params: { name: props.row.metadata.name }}">\\{{ props.row.metadata.name }}</router-link>
{{/if}}
          </q-td>
        </template>
        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
{{#if namespaced}}
            <q-btn icon="edit" size="sm" class="q-ml-sm" flat dense @click="toEdit(props.row.metadata.namespace, props.row.metadata.name)">
{{else}}
            <q-btn icon="edit" size="sm" class="q-ml-sm" flat dense @click="toEdit(props.row.metadata.name)">
{{/if}}
              <q-tooltip>Edit {{ name }} \\{{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
            <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense @click="actionDelete(deletor,props.row)">
              <q-tooltip>Delete {{ name }} \\{{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>
`, {noEscape: true, preventIndent: true});