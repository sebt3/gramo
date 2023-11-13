<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { useQuery } from '@vue/apollo-composable'
import { useNavigationStore } from '../../stores/navigation'
import vynilInstallsQuery from '../../queries/vynil/Installs.graphql'
const navigation = storeToRefs(useNavigationStore())
const route = useRoute();
const { show_filter, filter } = setupFilters()
const { columns, pagination } = setupTable()
if (route.params.namespace != undefined && route.params.namespace != '') {
  const { setCurrentNamespace } = useNavigationStore()
  setCurrentNamespace(route.params.namespace)
}
const { vynilInstalls, vynilInstallsRefetch } = setupQuery(navigation.namespace)
async function actionRefresh() {
  await vynilInstallsRefetch();
}
function actionNew() {
  const dest = navigation.currentNamespace.value=='default'?'media':'default'
  navigation.currentNamespace.value = dest
}
function actionEdit(row) {
  console.log(row, );
}
function actionDelete(row) {
  console.log(row);
}
function setupQuery(namespace) {
  const { result, variables, refetch } = useQuery(vynilInstallsQuery, {
    "namespace": namespace,
  })
  return {vynilInstalls: result, vynilInstallsVars: variables, vynilInstallsRefetch: refetch}
}
function setupFilters() {
  const show_filter = ref(false)
  const filter = ref('')
  return {
    show_filter,
    filter
  }
}
function setupTable() {
  const pagination = ref({rowsPerPage: 0})
  const columns = [
    {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: 'left'},
    {name: 'Distribution', label: 'Distribution', field: row => row.distrib.metadata.name, sortable: true, align: 'left'},
    {name: 'Category', label: 'Category', field: row => row.category.name, sortable: true, align: 'left'},
    {name: 'Component', label: 'Component', field: row => row.component.name, sortable: true, align: 'left'},
    {name: 'Status', label: 'Status', field: row => row.status.status, align: 'left'},
    {name: 'Action', label: '', field: 'Action', sortable: false, align: 'right'}
  ];
  return {
    columns,
    pagination
  }
}
</script>
<template>
  <q-card class="no-shadow" bordered>
    <q-card-section>
      <div class="text-h6 text-grey-8">
        Vynil Installs
        <q-btn-group push class="float-right text-capitalize shadow-3">
          <q-input v-if="show_filter" v-model="filter" filled borderless dense debounce="300" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search"/>
            </template>
          </q-input>
          <q-btn icon="filter_list" @click="show_filter=!show_filter" />
          <q-btn icon="refresh" @click="actionRefresh()" />
          <q-btn label="Add" color="positive" icon="add" @click="actionNew()" />
        </q-btn-group>
      </div>
    </q-card-section>
    <q-card-section class="q-pa-none">
      <q-table v-if="vynilInstalls !== undefined && vynilInstalls['vynilInstalls'] !== undefined" :rows="vynilInstalls.vynilInstalls" :columns="columns" class="no-shadow" v-model:pagination="pagination" :filter="filter" hide-bottom>
        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn icon="edit" size="sm" flat dense @click="actionEdit(props.row)" />
            <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense @click="actionDelete(props.row)" />
          </q-td>
        </template>
        <template v-slot:body-cell-Status="props">
          <q-td :props="props">
            <q-chip class="float-right text-white text-capitalize" :label="props.row.status.status" color="positive"
                    v-if="props.row.status.status=='installed'"></q-chip>
            <q-chip class="float-right text-white text-capitalize" :label="props.row.status.status" color="warning"
                    v-if="props.row.status.status=='warning'"></q-chip>
            <q-chip class="float-right text-white text-capitalize" :label="props.row.status.status" color="negative"
                    v-if="props.row.status.status=='errors'"></q-chip>
            <q-chip class="float-right text-white text-capitalize" :label="props.row.status.status" color="info"
                    v-if="!['installed','warning','errors'].includes(props.row.status.status)"></q-chip>
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>

