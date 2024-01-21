import HB from 'handlebars';
export const templateComponentView = HB.compile(
`<script setup lang="ts">
import {{ mini }}{{ name }}Query from '@/queries/{{ mini }}/{{ name }}View.graphql'
import {{ miniName }}Delete from '@/queries/{{ mini }}/{{ name }}Delete.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import MonacoViewer from '../core/MonacoViewer.vue';
import { useQuery, useMutation, use{{ name }}, getProperties } from './{{ name }}.js'
{{#if namespaced}}
const { viewer, viewerUpdate, onErrorHandler, notifySuccess, notifyError, onNot{{ name }}Found, navigation, setNamespacedItemFromRoute, toEdit, actionDelete } = use{{ name }}();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery({{ mini }}{{ name }}Query, {"namespace": navigation.currentNamespace, "name": navigation.currentItem }, { pollInterval: 500 });onError(onErrorHandler); onResult(res => {onNot{{ name }}Found(res);viewerUpdate(res, res.loading?{}:res.data.{{ mini }}{{ name }}.metadata.obj)});
{{else}}
const { viewer, viewerUpdate, onErrorHandler, notifySuccess, notifyError, onNot{{ name }}Found, navigation, setItemFromRoute, toEdit, actionDelete } = use{{ name }}();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery({{ mini }}{{ name }}Query, { "name": navigation.currentItem }, { pollInterval: 500 });onError(onErrorHandler); onResult(res => {onNot{{ name }}Found(res);viewerUpdate(res, res.loading?{}:res.data.{{ mini }}{{ name }}.metadata.obj)});
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
    <div class="col-md-6">
      <q-card bordered v-if="!loading && result!=undefined && result.{{ mini }}{{ name }}!=undefined && result.{{ mini }}{{ name }}!=null" class="q-ma-sm">
        <q-card-section class="bg-primary text-grey-4">
          <div class="text-h6 q-mt-none q-mb-none q-pt-none q-pb-none">{{ name }}
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
      <q-card bordered v-if="!loading && result!=undefined && result.{{ mini }}{{ name }}!=undefined && result.{{ mini }}{{ name }}!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.{{ mini }}{{ name }}!=null && result.{{ mini }}{{ name }}.status != null">
          <DefaultStatusView :status="result.{{ mini }}{{ name }}.status" />
        </q-card-section>
      </q-card>
    </div><div class="col-md-6">
      <q-card bordered v-if="!loading && result!=undefined && result.{{ mini }}{{ name }}!=undefined && result.{{ mini }}{{ name }}!=null" class="q-ma-sm">
        <q-tabs v-model="viewer.tab" class="bg-primary text-grey-4" active-color="white">
          <q-tab label="Options" name="simple" />
          <q-tab label="Specifications" name="spec" />
          <q-tab label="full Yaml" name="yaml" />
        </q-tabs>
        <q-tab-panels v-model="viewer.tab" animated>
          <q-tab-panel name="simple">
            <OpenApiEdit
              :in="result.{{ mini }}{{ name }}"
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
</template>
`, {noEscape: true, preventIndent: true});