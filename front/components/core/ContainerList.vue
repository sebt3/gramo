<script setup lang="ts">
import { onMounted } from "vue";
import { usePod } from '../../libs/k8s/Pod.js'
import { colorPod, iconPod } from '../../libs/k8s/custom.js'
import { QTableColumn } from 'quasar'
import { ref, useCore, tableColumnAlign } from '../../libs/core'
import { useQuasar } from 'quasar'
const $q = useQuasar()
const {  onlyReadProperties, viewerUpdate, setNamespacedItemFromRoute } = usePod();setNamespacedItemFromRoute();
defineEmits(['refresh','on-delete']);
const props=withDefaults(defineProps<{model: object[], useAction?:boolean, useRefresh?: boolean, showNamespace?:boolean}>(),{
  useAction: false,
  useRefresh: true,
  showNamespace: false,
});
console.log('ContainerList',props.model)
const tab=ref('list')
const container=ref(props.model.map(c=>c['name'])[0])
const { pagination } = useCore();
const ContainerColumns:Array<QTableColumn> = ((props.showNamespace?[{name: 'Namespace', label: 'Namespace', field: row => row.namespace, sortable: true, align: tableColumnAlign.left}]:[]) as QTableColumn[]).concat([
  {name: 'Init', label: 'Init?', field: row => row.init?'init':'main', sortable: true, align: tableColumnAlign.left},
  {name: 'Name', label: 'Name', field: row => row.name, sortable: true, align: tableColumnAlign.left},
  {name: 'Image', label: 'Image', field: row => row.spec.image, sortable: true, align: tableColumnAlign.left},
  {name: 'Status', label: 'Status', field: () => null, sortable: true, align: tableColumnAlign.left},
  {name: 'Action', label: 'Action', field: () => null, sortable: true, align: tableColumnAlign.left},
] as QTableColumn[]);
const filter = ref('');
onMounted(() => {
  viewerUpdate(onlyReadProperties(props.model));
})
function switchToLog(obj) {
  container.value=obj['name']
  tab.value='logs'
}
</script>
<template>
  <q-card bordered class="q-ma-sm">
    <q-tabs v-model="tab" :class="`bg-${ colorPod } text-grey-2`" active-color="white" align="justify">
      <q-avatar :icon="iconPod" />
      <q-tab label="Containers" name="list" />
      <q-tab label="Logs" name="logs" />
    </q-tabs>
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="list" :class="`bg-${ colorPod }-${$q.dark.isActive?'10':'1'}`">
        <q-table :rows="model" :class="`no-shadow bg-${ colorPod }-${$q.dark.isActive?'10':'1'}`" :columns="ContainerColumns" v-model:pagination="pagination" :filter="filter" hide-bottom>
          <template v-slot:body-cell-Status="props">
            <q-td :props="props">
              <q-chip class="float-right text-white text-capitalize" v-if="typeof props.row.status.state.terminated==='object'"
                :label="props.row.status.state.terminated.reason" :color="props.row.status.state.terminated.exitCode==0?'positive':'negative'">
                <q-tooltip>exit code :{{ props.row.status.state.terminated.exitCode }}</q-tooltip>
              </q-chip>
              <q-chip class="float-right text-white text-capitalize" v-if="typeof props.row.status.state.running==='object'"
                label="Running" color="positive">
                <q-tooltip>Started at:{{ props.row.status.state.running.startedAt }}</q-tooltip>
              </q-chip>
            </q-td>
          </template>
          <template v-slot:body-cell-Action="props">
            <q-td :props="props">
              <q-btn icon="output" size="sm" class="q-ml-sm" flat dense @click="switchToLog(props.row)">
                <q-tooltip>View {{ props.row.name }} logs</q-tooltip>
              </q-btn>
            </q-td>
          </template>
        </q-table>
      </q-tab-panel>
      <q-tab-panel name="logs" :class="`bg-${ colorPod }-${$q.dark.isActive?'10':'1'}`">
        <q-toolbar :class="`bg-${ colorPod } text-white q-my-md shadow-2`">
          <q-space />
          <q-select v-model="container" :options="model.map(o=>o['name'])" label="Container" label-color="white"  style="min-width: 350px">
          </q-select>
          <q-space />
        </q-toolbar>
        <pre v-if="model.filter(c=>c['name']==container).length>0" class="bg-black text-white">
{{ model.filter(c=>c['name']==container)[0]['getcoreLog']['lines'].join('\n') }}
        </pre>
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>
