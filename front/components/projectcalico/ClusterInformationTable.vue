<script setup lang="ts">
import projectcalicoClusterInformationsQuery from '@/queries/projectcalico/ClusterInformationTable.graphql'
import clusterInformationDelete from '@/queries/projectcalico/ClusterInformationDelete.graphql'
import TableHeader from '../core/TableHeader.vue';
import { ref, useQuery, useMutation, useClusterInformation, clusterInformationColumns } from './ClusterInformation.js'
let filter = ref('');
const { actionNew, toEdit, actionDelete, pagination, deleteDone, deleteError, onErrorHandler } = useClusterInformation();
const { result, refetch, onError } = useQuery(projectcalicoClusterInformationsQuery, {}, { pollInterval: 500 });
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(clusterInformationDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <q-card class="q-ma-sm" bordered>
    <TableHeader title="Projectcalico ClusterInformations" itemtype='projectcalico ClusterInformation' v-model:model-filter="filter" @refresh="refetch()" @create="actionNew()" />
    <q-card-section class="q-pa-none">
    <q-table v-if="result !== undefined && result['projectcalicoClusterInformations'] !== undefined" :rows="result.projectcalicoClusterInformations" :columns="clusterInformationColumns" class="no-shadow" v-model:pagination="pagination" :filter="filter" hide-bottom>
        <template v-slot:body-cell-Name="props">
          <q-td :props="props">
            <router-link :to="{ name: 'projectcalicoClusterInformationView', params: { name: props.row.metadata.name }}">{{ props.row.metadata.name }}</router-link>
          </q-td>
        </template>
        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn icon="edit" size="sm" class="q-ml-sm" flat dense @click="toEdit(props.row.metadata.name)">
              <q-tooltip>Edit ClusterInformation {{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
            <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense @click="actionDelete(deletor,props.row)">
              <q-tooltip>Delete ClusterInformation {{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>
