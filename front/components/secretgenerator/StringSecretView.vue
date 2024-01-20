<script setup lang="ts">
import secretgeneratorStringSecretQuery from '@/queries/secretgenerator/StringSecretView.graphql'
import stringSecretDelete from '@/queries/secretgenerator/StringSecretDelete.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import MonacoViewer from '../core/MonacoViewer.vue';
import { ref, useQuery, useMutation, useStringSecret, getProperties } from './StringSecret.js'
const { viewer, viewerUpdate, onErrorHandler, notifySuccess, notifyError, onNotStringSecretFound, navigation, setNamespacedItemFromRoute, toEdit, actionDelete } = useStringSecret();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(secretgeneratorStringSecretQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem }, { pollInterval: 500 });onError(onErrorHandler); onResult(res => {onNotStringSecretFound(res);viewerUpdate(res, res.data.secretgeneratorStringSecret.metadata.obj)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(stringSecretDelete);
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
      <q-card bordered v-if="!loading && result!=undefined && result.secretgeneratorStringSecret!=undefined && result.secretgeneratorStringSecret!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">StringSecret
            <q-btn-group push class="float-right text-capitalize shadow-3">
              <q-btn icon="edit" @click="toEdit(result.secretgeneratorStringSecret.metadata.namespace, result.secretgeneratorStringSecret.metadata.name)">
                <q-tooltip>Edit</q-tooltip>
              </q-btn>
              <q-btn icon="delete" @click="actionDelete(deletor, result.secretgeneratorStringSecret)">
                <q-tooltip>Delete</q-tooltip>
              </q-btn>
            </q-btn-group>
          </div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.secretgeneratorStringSecret.metadata" />
        </q-card-section>
      </q-card>
      <q-card bordered v-if="!loading && result!=undefined && result.secretgeneratorStringSecret!=undefined && result.secretgeneratorStringSecret!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.secretgeneratorStringSecret!=null && result.secretgeneratorStringSecret.status != null">
          <DefaultStatusView :status="result.secretgeneratorStringSecret.status" />
        </q-card-section>
      </q-card>
    </div><div class="col-md-6">
      <q-card bordered v-if="!loading && result!=undefined && result.secretgeneratorStringSecret!=undefined && result.secretgeneratorStringSecret!=null" class="q-ma-sm">
        <q-tabs v-model="viewer.tab" class="bg-primary text-white">
          <q-tab label="Options" name="simple" />
          <q-tab label="Specifications" name="spec" />
          <q-tab label="full Yaml" name="yaml" />
        </q-tabs>
        <q-tab-panels v-model="viewer.tab" animated>
          <q-tab-panel name="simple">
            <OpenApiEdit
              :in="result.secretgeneratorStringSecret"
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
