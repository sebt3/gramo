import HB from 'handlebars';
export const templateComponentAllTable = HB.compile(
`<script setup lang="ts">
import {{ mini }}All{{ name }}sQuery from '@/queries/{{ mini }}/{{ name }}AllTable.graphql'
import TableHeader from '../core/TableHeader.vue';
import { ref, useQuery, use{{ name }}, {{ miniName }}AllColumns } from './{{ name }}.js'
let filter{{ name }} = ref('');
const { toEdit: to{{ name }}Edit, actionDelete: action{{ name }}Delete, onErrorHandler, navigation, pagination } = use{{ name }}();
const { result, refetch, onError } = useQuery({{ mini }}All{{ name }}sQuery, {}, { pollInterval: 500 });onError(onErrorHandler);
</script>
<template>
  <q-card class="q-ma-sm" bordered>
    <TableHeader title="{{ short }} {{ name }}s" v-model:model-filter="filter{{ name }}" itemtype='{{ mini }} {{ name }}' @refresh="refetch()" :usecreate="false" />
    <q-card-section class="q-pa-none">
      <q-table v-if="result !== undefined" :rows="result.namespaces.map(x=>x.{{ mini }}{{ name }}s).flat()" :columns="{{ miniName }}AllColumns" class="no-shadow" v-model:pagination="pagination" :filter="filter{{ name }}" hide-bottom>
        <template v-slot:body-cell-Namespace="props">
          <q-td :props="props">
            <router-link :to="{ name: '{{ mini }}{{ name }}Table', params: { namespace: props.row.metadata.namespace }}">\\{{ props.row.metadata.namespace }}</router-link>
          </q-td>
        </template>
        <template v-slot:body-cell-Name="props">
          <q-td :props="props">
            <router-link :to="{ name: '{{ mini }}{{ name }}View', params: { namespace: props.row.metadata.namespace, name: props.row.metadata.name }}">\\{{ props.row.metadata.name }}</router-link>
          </q-td>
        </template>
        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn icon="edit" size="sm" class="q-ml-sm" flat dense @click="to{{ name }}Edit(navigation.currentNamespace.value, props.row.metadata.name)">
              <q-tooltip>Edit {{ miniName }} \\{{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
            <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense @click="action{{ name }}Delete(props.row)">
              <q-tooltip>Delete {{ miniName }} \\{{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>
`, {noEscape: true, preventIndent: true});