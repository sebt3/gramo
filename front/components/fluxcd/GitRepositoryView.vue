<script setup lang="ts">
import fluxcdGitRepositoryQuery from '@/queries/fluxcd/GitRepositoryView.graphql'
import gitRepositoryDelete from '@/queries/fluxcd/GitRepositoryDelete.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import TableHeader from '../core/TableHeader.vue';
import { ref, useQuery, useMutation, useGitRepository, packageColumns, getProperties } from './GitRepository.js'
let filter = ref('');
const { onErrorHandler, notifySuccess, notifyError, onNotGitRepositoryFound, navigation, pagination, setNamespacedItemFromRoute, toEdit, actionDelete } = useGitRepository();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(fluxcdGitRepositoryQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem }, { pollInterval: 500 });onError(onErrorHandler); onResult(onNotGitRepositoryFound);
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(gitRepositoryDelete);
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
      <q-card bordered v-if="!loading && result!=undefined && result.fluxcdGitRepository!=undefined && result.fluxcdGitRepository!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">GitRepository
            <q-btn-group push class="float-right text-capitalize shadow-3">
              <q-btn icon="edit" @click="toEdit(result.fluxcdGitRepository.metadata.namespace, result.fluxcdGitRepository.metadata.name)">
                <q-tooltip>Edit</q-tooltip>
              </q-btn>
              <q-btn icon="delete" @click="actionDelete(deletor, result.fluxcdGitRepository)">
                <q-tooltip>Delete</q-tooltip>
              </q-btn>
            </q-btn-group>
          </div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.fluxcdGitRepository.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-md-4">
      <q-card bordered v-if="!loading && result!=undefined && result.fluxcdGitRepository!=undefined && result.fluxcdGitRepository!=null" class="q-ma-sm">
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
      <q-card bordered v-if="!loading && result!=undefined && result.fluxcdGitRepository!=undefined && result.fluxcdGitRepository!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
        </q-card-section>
        <q-card-section>
          <OpenApiEdit
            :in="result.fluxcdGitRepository"
            :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            :read-only="true"
            :show-default="false"
          />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-card v-if="!loading && result!=undefined && result.fluxcdGitRepository!=undefined && result.fluxcdGitRepository!=null" class="q-ma-sm">
    <q-card-section>
      <TableHeader title="Packages" v-model:model-filter="filter" itemtype='Package' :usecreate="false" :userefresh="false" />
      <q-table :rows="result.fluxcdGitRepository.packages" :columns="packageColumns" class="no-shadow" v-model:pagination="pagination" :filter="filter" hide-bottom></q-table>
    </q-card-section>
  </q-card>
</template>
