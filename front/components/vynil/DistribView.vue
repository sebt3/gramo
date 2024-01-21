<script setup lang="ts">
import vynilDistribQuery from '@/queries/vynil/DistribView.graphql'
import distribDelete from '@/queries/vynil/DistribDelete.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import TableHeader from '../core/TableHeader.vue';
import MonacoViewer from '../core/MonacoViewer.vue';
import { ref, useQuery, useMutation, useDistrib, packageColumns, getProperties } from './Distrib.js'
let filter = ref('');
const { viewer, viewerUpdate, onErrorHandler, notifySuccess, notifyError, onNotDistribFound, navigation, pagination, setItemFromRoute, toEdit, actionDelete } = useDistrib();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(vynilDistribQuery, { "name": navigation.currentItem }, { pollInterval: 500 });onError(onErrorHandler);
onResult(res => {onNotDistribFound(res);viewerUpdate(res, res.loading?{}:res.data.vynilDistrib.metadata.obj)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(distribDelete);
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
      <q-card bordered v-if="!loading && result!=undefined && result.vynilDistrib!=undefined && result.vynilDistrib!=null" class="q-ma-sm">
        <q-card-section class="bg-primary text-grey-4">
          <div class="text-h6 q-mt-none q-mb-none q-pt-none q-pb-none">Distrib
            <q-btn-group push class="float-right text-capitalize shadow-3">
              <q-btn icon="edit" @click="toEdit(result.vynilDistrib.metadata.name)">
                <q-tooltip>Edit</q-tooltip>
              </q-btn>
              <q-btn icon="delete" @click="actionDelete(deletor, result.vynilDistrib)">
                <q-tooltip>Delete</q-tooltip>
              </q-btn>
            </q-btn-group>
          </div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.vynilDistrib.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-md-4">
      <q-card bordered v-if="!loading && result!=undefined && result.vynilDistrib!=undefined && result.vynilDistrib!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section>
          <div class="q-gutter-md">
            <q-field label="Status" stack-label borderless>
              <template v-slot:prepend><q-icon name="done" /></template>
              <template v-slot:control>
                <q-chip class="float-right text-white text-capitalize" label="Ok" color="positive" v-if="result.vynilDistrib.status.errors.length==0"></q-chip>
                <q-chip class="float-right text-white text-capitalize" label="Errors" color="negative" v-if="result.vynilDistrib.status.errors.length>0"></q-chip>
              </template>
            </q-field>
            <q-field label="Errors" stack-label borderless v-if="result.vynilDistrib.status.errors.length>0">
              <template v-slot:prepend><q-icon name="error" /></template>
              <template v-slot:control><div class="self-center full-width no-outline" tabindex="0">
                <div v-for="err in result.vynilDistrib.status.errors" v-bind:key="err">{{ err }}</div>
              </div></template>
            </q-field>
          </div>
        </q-card-section>
      </q-card>
    </div><div class="col-md-4">
      <q-card bordered v-if="!loading && result!=undefined && result.vynilDistrib!=undefined && result.vynilDistrib!=null" class="q-ma-sm">
        <q-tabs v-model="viewer.tab" class="bg-primary text-white">
          <q-tab label="Options" name="simple" />
          <q-tab label="Specifications" name="spec" />
          <q-tab label="full Yaml" name="yaml" />
        </q-tabs>
        <q-tab-panels v-model="viewer.tab" animated>
          <q-tab-panel name="simple">
            <OpenApiEdit
              :in="result.vynilDistrib"
              :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
              :read-only="true"
              :show-default="false"
            />
          </q-tab-panel>
          <q-tab-panel name="spec">
            <MonacoViewer :text="viewer.spec" :key="viewer.spec" />
          </q-tab-panel>
          <q-tab-panel name="yaml">
            <MonacoViewer :text="viewer.full" :key="viewer.spec" />
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
  <q-card v-if="!loading && result!=undefined && result.vynilDistrib!=undefined && result.vynilDistrib!=null" class="q-ma-sm">
    <q-card-section>
      <TableHeader title="Packages" v-model:model-filter="filter" itemtype='Package' :usecreate="false" :userefresh="false" />
      <q-table :rows="result.vynilDistrib.packages" :columns="packageColumns" class="no-shadow" v-model:pagination="pagination" :filter="filter" hide-bottom></q-table>
    </q-card-section>
  </q-card>
</template>