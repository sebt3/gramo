import HB from 'handlebars';
export const templateComponentView = HB.compile(
`<script setup lang="ts">
import {{ mini }}{{ name }}Query from '@/queries/{{ mini }}/{{ name }}View.graphql'
import {{ miniName }}Delete from '@/queries/{{ mini }}/{{ name }}Delete.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import TableHeader from '../core/TableHeader.vue';
import { ref, useQuery, useMutation, use{{ name }}, packageColumns, getProperties } from './{{ name }}.js'
let filter = ref('');
{{#if namespaced}}
const { onErrorHandler, notifySuccess, notifyError, onNot{{ name }}Found, navigation, pagination, setNamespacedItemFromRoute, toEdit, actionDelete } = use{{ name }}();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery({{ mini }}{{ name }}Query, {"namespace": navigation.currentNamespace, "name": navigation.currentItem }, { pollInterval: 500 });onError(onErrorHandler); onResult(onNot{{ name }}Found);
{{else}}
const { onErrorHandler, notifySuccess, notifyError, onNot{{ name }}Found, navigation, pagination, setItemFromRoute, toEdit, actionDelete } = use{{ name }}();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery({{ mini }}{{ name }}Query, { "name": navigation.currentItem }, { pollInterval: 500 });onError(onErrorHandler); onResult(onNot{{ name }}Found);
{{/if}}
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation({{ miniName }}Delete);
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
      <q-card bordered v-if="!loading && result!=undefined && result.{{ mini }}{{ name }}!=undefined && result.{{ mini }}{{ name }}!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">{{ name }}
            <q-btn-group push class="float-right text-capitalize shadow-3">
{{#if namespaced}}
              <q-btn icon="edit" @click="toEdit(result.{{ mini }}{{ name }}.metadata.namespace, result.{{ mini }}{{ name }}.metadata.name)">
{{else}}
              <q-btn icon="edit" @click="toEdit(result.{{ mini }}{{ name }}.metadata.name)">
{{/if}}
                <q-tooltip>Edit</q-tooltip>
              </q-btn>
              <q-btn icon="delete" @click="actionDelete(deletor, result.{{ mini }}{{ name }})">
                <q-tooltip>Delete</q-tooltip>
              </q-btn>
            </q-btn-group>
          </div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.{{ mini }}{{ name }}.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-md-4">
      <q-card bordered v-if="!loading && result!=undefined && result.{{ mini }}{{ name }}!=undefined && result.{{ mini }}{{ name }}!=null" class="q-ma-sm">
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
      <q-card bordered v-if="!loading && result!=undefined && result.{{ mini }}{{ name }}!=undefined && result.{{ mini }}{{ name }}!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
        </q-card-section>
        <q-card-section>
          <OpenApiEdit
            :in="result.{{ mini }}{{ name }}"
            :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            :read-only="true"
            :show-default="false"
          />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-card v-if="!loading && result!=undefined && result.{{ mini }}{{ name }}!=undefined && result.{{ mini }}{{ name }}!=null" class="q-ma-sm">
    <q-card-section>
      <TableHeader title="Packages" v-model:model-filter="filter" itemtype='Package' :usecreate="false" :userefresh="false" />
      <q-table :rows="result.{{ mini }}{{ name }}.packages" :columns="packageColumns" class="no-shadow" v-model:pagination="pagination" :filter="filter" hide-bottom></q-table>
    </q-card-section>
  </q-card>
</template>
`, {noEscape: true, preventIndent: true});