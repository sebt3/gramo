<script setup lang="ts">
import projectcalicoKubeControllersConfigurationsQuery from '@/queries/projectcalico/KubeControllersConfigurationTable.graphql'
import kubeControllersConfigurationDelete from '@/queries/projectcalico/KubeControllersConfigurationDelete.graphql'
import TableHeader from '../core/TableHeader.vue';
import { ref, useQuery, useMutation, useKubeControllersConfiguration, kubeControllersConfigurationColumns } from './KubeControllersConfiguration.js'
let filter = ref('');
const { actionNew, toEdit, actionDelete, pagination, deleteDone, deleteError, onErrorHandler } = useKubeControllersConfiguration();
const { result, refetch, onError } = useQuery(projectcalicoKubeControllersConfigurationsQuery, {}, { pollInterval: 500 });
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(kubeControllersConfigurationDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <q-card class="q-ma-sm" bordered>
    <TableHeader title="Projectcalico KubeControllersConfigurations" itemtype='projectcalico KubeControllersConfiguration' v-model:model-filter="filter" @refresh="refetch()" @create="actionNew()" />
    <q-card-section class="q-pa-none">
    <q-table v-if="result !== undefined && result['projectcalicoKubeControllersConfigurations'] !== undefined" :rows="result.projectcalicoKubeControllersConfigurations" :columns="kubeControllersConfigurationColumns" class="no-shadow" v-model:pagination="pagination" :filter="filter" hide-bottom>
        <template v-slot:body-cell-Name="props">
          <q-td :props="props">
            <router-link :to="{ name: 'projectcalicoKubeControllersConfigurationView', params: { name: props.row.metadata.name }}">{{ props.row.metadata.name }}</router-link>
          </q-td>
        </template>
        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn icon="edit" size="sm" class="q-ml-sm" flat dense @click="toEdit(props.row.metadata.name)">
              <q-tooltip>Edit KubeControllersConfiguration {{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
            <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense @click="actionDelete(deletor,props.row)">
              <q-tooltip>Delete KubeControllersConfiguration {{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>
