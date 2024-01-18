<script setup lang="ts">
import k8upSnapshotsQuery from '@/queries/k8up/SnapshotTable.graphql'
import snapshotDelete from '@/queries/k8up/SnapshotDelete.graphql'
import TableHeader from '../core/TableHeader.vue';
import { ref, useQuery, useMutation, useSnapshot, snapshotColumns } from './Snapshot.js'
let filter = ref('');
const { actionNew, toEdit, actionDelete, pagination, deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute } = useSnapshot();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(k8upSnapshotsQuery, {"namespace": navigation.currentNamespace}, { pollInterval: 500 });
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(snapshotDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <q-card class="q-ma-sm" bordered>
    <TableHeader title="K8up Snapshots" itemtype='k8up Snapshot' v-model:model-filter="filter" @refresh="refetch()" @create="actionNew(navigation.currentNamespace.value)" />
    <q-card-section class="q-pa-none">
    <q-table v-if="result !== undefined && result['namespace'] !== undefined && result['namespace']['k8upSnapshots'] !== undefined" :rows="result.namespace.k8upSnapshots" :columns="snapshotColumns" class="no-shadow" v-model:pagination="pagination" :filter="filter" hide-bottom>
        <template v-slot:body-cell-Name="props">
          <q-td :props="props">
            <router-link :to="{ name: 'k8upSnapshotView', params: { namespace: props.row.metadata.namespace, name: props.row.metadata.name }}">{{ props.row.metadata.name }}</router-link>
          </q-td>
        </template>
        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn icon="edit" size="sm" class="q-ml-sm" flat dense @click="toEdit(props.row.metadata.namespace, props.row.metadata.name)">
              <q-tooltip>Edit Snapshot {{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
            <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense @click="actionDelete(deletor,props.row)">
              <q-tooltip>Delete Snapshot {{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>
