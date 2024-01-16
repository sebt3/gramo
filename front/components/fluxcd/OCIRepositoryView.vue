<script setup lang="ts">
import fluxcdOCIRepositoryQuery from '@/queries/fluxcd/OCIRepositoryView.graphql'
import oCIRepositoryDelete from '@/queries/fluxcd/OCIRepositoryDelete.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import TableHeader from '../core/TableHeader.vue';
import { ref, useQuery, useMutation, useOCIRepository, packageColumns, getProperties } from './OCIRepository.js'
let filter = ref('');
const { onErrorHandler, notifySuccess, notifyError, onNotOCIRepositoryFound, navigation, pagination, setNamespacedItemFromRoute, toEdit, actionDelete } = useOCIRepository();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(fluxcdOCIRepositoryQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem }, { pollInterval: 500 });onError(onErrorHandler); onResult(onNotOCIRepositoryFound);
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(oCIRepositoryDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-4">
      <q-card bordered v-if="!loading && result!=undefined && result.fluxcdOCIRepository!=undefined && result.fluxcdOCIRepository!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">OCIRepository
            <q-btn-group push class="float-right text-capitalize shadow-3">
              <q-btn icon="edit" @click="toEdit(result.fluxcdOCIRepository.metadata.namespace, result.fluxcdOCIRepository.metadata.name)">
                <q-tooltip>Edit</q-tooltip>
              </q-btn>
              <q-btn icon="delete" @click="actionDelete(deletor, result.fluxcdOCIRepository)">
                <q-tooltip>Delete</q-tooltip>
              </q-btn>
            </q-btn-group>
          </div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.fluxcdOCIRepository.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-md-4">
      <q-card bordered v-if="!loading && result!=undefined && result.fluxcdOCIRepository!=undefined && result.fluxcdOCIRepository!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section>
          <div class="q-gutter-md">
            TODO
          </div>
        </q-card-section>
      </q-card>
    </div><div class="col-md-4">
      <q-card bordered v-if="!loading && result!=undefined && result.fluxcdOCIRepository!=undefined && result.fluxcdOCIRepository!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
        </q-card-section>
        <q-card-section>
          <OpenApiEdit
            :in="result.fluxcdOCIRepository"
            :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            :read-only="true"
            :show-default="false"
          />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-card v-if="!loading && result!=undefined && result.fluxcdOCIRepository!=undefined && result.fluxcdOCIRepository!=null" class="q-ma-sm">
    <q-card-section>
      <TableHeader title="Packages" v-model:model-filter="filter" itemtype='Package' :usecreate="false" :userefresh="false" />
      <q-table :rows="result.fluxcdOCIRepository.packages" :columns="packageColumns" class="no-shadow" v-model:pagination="pagination" :filter="filter" hide-bottom></q-table>
    </q-card-section>
  </q-card>
</template>
