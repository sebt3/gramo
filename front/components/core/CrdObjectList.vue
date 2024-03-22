<script setup lang="ts">
// noGramoGenerator
defineEmits(['refresh']);
const props = withDefaults(defineProps<{model: object[]|null, parent:object, useAction?:boolean, origin?:string}>(),{
  useAction: true,
});
import clusteredObjectDelete  from '@/queries/core/clusteredObject.delete.graphql'
import namespacedObjectDelete from '@/queries/core/namespacedObject.delete.graphql'
import { QTableColumn } from 'quasar'
const { tableColumnAlign } = await import('../../libs/core/navigation.js')
const { ref, i18n, defineAsyncComponent, usecrdObject, useMutation } = await import('../../libs/core/crdObject.js')
const { colorCustomResourceDefinition } = await import('../../libs/k8s/custom.js')
const { useRouter } = await import('vue-router')
const router = useRouter();
const haveNamespace = props.parent.spec.scope=="Namespaced";
const pagination = ref({rowsPerPage: 0});
const { $q, navigation, actionDelete, notifySuccess, notifyError } = usecrdObject();
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(haveNamespace?namespacedObjectDelete:clusteredObjectDelete);
const ObjectColumns:Array<QTableColumn> = (haveNamespace?[
  {name: 'Namespace', label: i18n.global.t('meta.namespace'), field: row => row.metadata.namespace, sortable: true, align: tableColumnAlign.left},
  {name: 'Name', label: i18n.global.t('meta.name'), field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
  {name: 'Action', label: i18n.global.t('core.action'), field: 'Action', sortable: false, align: tableColumnAlign.right}
]:[
  {name: 'Name', label: i18n.global.t('meta.name'), field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
  {name: 'Action', label: i18n.global.t('core.action'), field: 'Action', sortable: false, align: tableColumnAlign.right}
]) as QTableColumn[];
const filter = ref('');
onDeleteDone(() => {notifySuccess(i18n.global.t('delete.notifyDone')) })
onDeleteError((err) => {
  notifyError(i18n.global.t('delete.notifyError'));
  console.log('deletion error',err);
})
const TableHeader = defineAsyncComponent(() => import( '@/components/core/TableHeader.vue'));
</script>
<template>
  <q-card class="q-ma-sm" bordered>
    <TableHeader :title="$t('k8s.Object')" :class="`bg-${colorCustomResourceDefinition}`" :usecreate="true" :userefresh="useAction" itemtype='Object' v-model:model-filter="filter" @refresh="$emit('refresh')" @create="router.push({ name: props.parent.spec.scope=='Namespaced'?'CrdObjectNamespacedCreate':'CrdObjectClusterCreate',  params: props.parent.spec.scope=='Namespaced'?{ name: props.parent.metadata.name, namespace: navigation.currentNamespace.value }:{ name: props.parent.metadata.name }})" />
    <q-card-section class="q-pa-none">
    <q-table :rows="model" :class="`bg-${colorCustomResourceDefinition}-${$q.dark.isActive?'10':'1'} no-shadow`" :columns="ObjectColumns.filter(c=>c.name!='Action'||useAction)" v-model:pagination="pagination" :filter="filter" hide-bottom v-if="model!=null">
      <template v-slot:body-cell-Name="props">
        <q-td :props="props">
          <router-link :to="{ name: parent.spec.scope=='Namespaced'?(origin?`CrdObjectNamespacedViewFrom${origin}`:'CrdObjectNamespacedView'):(origin?`CrdObjectClusterViewFrom${origin}`:'CrdObjectClusterView'),  params: parent.spec.scope=='Namespaced'?{ name: parent.metadata.name, namespace: props.row.metadata.namespace, object: props.row.metadata.name }:{ name: parent.metadata.name, object: props.row.metadata.name }}">{{ props.row.metadata.name }}</router-link>
        </q-td>
      </template>
      <template v-slot:body-cell-Action="props" v-if="useAction">
        <q-td :props="props">
          <q-btn icon="edit" size="sm" class="q-ml-sm" flat dense
            @click="router.push({ name: (origin?`CrdObjectNamespacedEditFrom${origin}`:'CrdObjectNamespacedEdit'), params: {name: parent.metadata.name, namespace: props.row.metadata.namespace, object: props.row.metadata.name}})"
            v-if="parent.spec.scope=='Namespaced'">
            <q-tooltip>{{ $t('core.editTooltip', {short: parent.metadata.name, name: props.row.metadata.name}) }}</q-tooltip>
          </q-btn>
          <q-btn icon="edit" size="sm" class="q-ml-sm" flat dense
            @click="router.push({ name: (origin?`CrdObjectClusterEditFrom${origin}`:'CrdObjectClusterEdit'), params: {name: parent.metadata.name, object: props.row.metadata.name}})"
            v-else>
            <q-tooltip>{{ $t('core.editTooltip', {short: parent.metadata.name, name: props.row.metadata.name}) }}</q-tooltip>
          </q-btn>
          <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense
            @click="actionDelete(deletor, props.row.metadata, parent)">
            <q-tooltip>{{ $t('core.deleteTooltip', {short: parent.metadata.name, name: props.row.metadata.name}) }}</q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
    </q-card-section>
  </q-card>
</template>
