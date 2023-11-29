<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'
import { useQuery } from '@vue/apollo-composable'
import TableHeader from '../core/TableHeader.vue';
import { setupTableWidget, tableColumnAlign } from '../core/TableSetup'
import vynilInstallsQuery from '@/queries/vynil/InstallTable.graphql'
import { useNavigationStore } from '@/stores/navigation'
import { useRouter } from 'vue-router'
const router = useRouter();
const $q = useQuasar()
const navigation = storeToRefs(useNavigationStore())
const { pagination, setNamespaceFromRoute } = setupTableWidget();setNamespaceFromRoute();let filter = ref('');
const { result, refetch, onError } = useQuery(vynilInstallsQuery, {"namespace": navigation.currentNamespace})
onError(({ graphQLErrors, networkError }) => {
  if (networkError) console.log('[Network error]:', networkError);
  if (graphQLErrors)console.log('[graphQL error]:', graphQLErrors);
});

const columns = [
  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
  {name: 'Distribution', label: 'Distribution', field: row => row.distrib.metadata.name, sortable: true, align: tableColumnAlign.left},
  {name: 'Category', label: 'Category', field: row => row.category.name, sortable: true, align: tableColumnAlign.left},
  {name: 'Component', label: 'Component', field: row => row.component.name, sortable: true, align: tableColumnAlign.left},
  {name: 'Status', label: 'Status', field: row => row.status.status, align: tableColumnAlign.left},
  {name: 'Action', label: '', field: 'Action', sortable: false, align: tableColumnAlign.right}
];

async function actionRefresh() { await refetch() }
function actionNew() {
  //router.push({ name: 'vynilInstallCreate', params: {namespace}})
}
function toView(namespace, name) {
  router.push({ name: 'vynilInstallView', params: {name, namespace}})
}
function toEdit(namespace, name) {
  router.push({ name: 'vynilInstallEdit', params: {name, namespace}})
}
function actionDelete(row) {
  $q.dialog({
    title: 'Confirm <span class="text-red">delete</span>',
    message: `<em>You are</em> about to <span class="text-red">delete</span> Install <strong>${row.metadata.name}</strong>`,
    persistent: true, cancel: true, html: true, ok: {color: 'negative'}
  }).onOk(() => {
    console.log('>>>> OK')
  })
}
</script>
<template>
  <q-card class="q-ma-sm" bordered>
    <TableHeader title="Vynil Installs" v-model:model-filter="filter" itemtype='vynil Install' @refresh="actionRefresh()" @create="actionNew()" />
    <q-card-section class="q-pa-none">
      <q-table v-if="result !== undefined && result['namespace'] !== undefined && result['namespace']['vynilInstalls'] !== undefined" :rows="result.namespace.vynilInstalls" :columns="columns" class="no-shadow" v-model:pagination="pagination" :filter="filter" hide-bottom>
        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn icon="visibility" size="sm" class="q-ml-sm" flat dense @click="toView(navigation.currentNamespace.value, props.row.metadata.name)">
              <q-tooltip>View install {{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
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
