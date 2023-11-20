<script setup lang="ts">
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useQuery } from '@vue/apollo-composable'
import TableHeader from '../core/TableHeader.vue';
import { setupTableWidget, tableColumnAlign } from '../core/TableSetup'
import vynilDistribsQuery from '../../queries/vynil/Distribs.graphql'
import { useRouter } from 'vue-router'
const router = useRouter();
const $q = useQuasar()
const { pagination } = setupTableWidget();let filter = ref('');
const { result, refetch } = useQuery(vynilDistribsQuery);
const columns = [
  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
  {name: 'Url', label: 'Url', field: row => row.url, sortable: true, align: tableColumnAlign.left},
  {name: 'Schedule', label: 'Schedule', field: row => row.schedule, sortable: false, align: tableColumnAlign.left},
  {name: 'Packages', label: 'Package', field: row => row.packages.length, sortable: true, align: tableColumnAlign.left},
  {name: 'Errors', label: 'Errors', field: row => row.status.errors.length, sortable: false, align: tableColumnAlign.left},
  {name: 'Updated', label: 'Updated', field: row => row.status.last_updated, sortable: false, align: tableColumnAlign.left},
  {name: 'Action', label: '', field: 'Action', sortable: false, align: tableColumnAlign.right}
];

async function actionRefresh() { await refetch() }
function actionNew() {
  //router.push({ name: 'vynilDistribCreate'})
}
function toView(name) {
  router.push({ name: 'vynilDistribView', params: {name}})
}
function toEdit(name) {
  //router.push({ name: 'vynilDistribEdit', params: {name}})
}
function actionDelete(row) {
  $q.dialog({
    title: 'Confirm <span class="text-red">delete</span>',
    message: `<em>You are</em> about to <span class="text-red">delete</span> Distrib <strong>${row.metadata.name}</strong>`,
    persistent: true, cancel: true, html: true, ok: {color: 'negative'}
  }).onOk(() => {
    console.log('>>>> OK')
  })
}
</script>
<template>
  <q-card class="q-ma-sm" bordered>
    <TableHeader title="Vynil Distribs" @setup="(f) => {filter = f;}" itemtype='vynil Distrib' @refresh="actionRefresh()" @create="actionNew()" />
    <q-card-section class="q-pa-none">
      <q-table v-if="result !== undefined && result['vynilDistribs'] !== undefined" :rows="result.vynilDistribs" :columns="columns" class="no-shadow" v-model:pagination="pagination" :filter="filter" hide-bottom>
        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn icon="visibility" size="sm" class="q-ml-sm" flat dense @click="toView(props.row.metadata.name)">
              <q-tooltip>View Distrib {{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
            <q-btn icon="edit" size="sm" class="q-ml-sm" flat dense @click="toEdit(props.row.metadata.name)">
              <q-tooltip>Edit Distrib {{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
            <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense @click="actionDelete(props.row)">
              <q-tooltip>Delete Distrib {{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>
