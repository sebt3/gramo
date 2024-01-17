<script setup lang="ts">
import secretgeneratorBasicAuthQuery from '@/queries/secretgenerator/BasicAuthView.graphql'
import basicAuthDelete from '@/queries/secretgenerator/BasicAuthDelete.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useBasicAuth, getProperties } from './BasicAuth.js'
const { onErrorHandler, notifySuccess, notifyError, onNotBasicAuthFound, navigation, setNamespacedItemFromRoute, toEdit, actionDelete } = useBasicAuth();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(secretgeneratorBasicAuthQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem }, { pollInterval: 500 });onError(onErrorHandler); onResult(onNotBasicAuthFound);
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(basicAuthDelete);
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
      <q-card bordered v-if="!loading && result!=undefined && result.secretgeneratorBasicAuth!=undefined && result.secretgeneratorBasicAuth!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">BasicAuth
            <q-btn-group push class="float-right text-capitalize shadow-3">
              <q-btn icon="edit" @click="toEdit(result.secretgeneratorBasicAuth.metadata.namespace, result.secretgeneratorBasicAuth.metadata.name)">
                <q-tooltip>Edit</q-tooltip>
              </q-btn>
              <q-btn icon="delete" @click="actionDelete(deletor, result.secretgeneratorBasicAuth)">
                <q-tooltip>Delete</q-tooltip>
              </q-btn>
            </q-btn-group>
          </div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.secretgeneratorBasicAuth.metadata" />
        </q-card-section>
      </q-card>
      <q-card bordered v-if="!loading && result!=undefined && result.secretgeneratorBasicAuth!=undefined && result.secretgeneratorBasicAuth!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.secretgeneratorBasicAuth!=null && result.secretgeneratorBasicAuth.status != null">
          <DefaultStatusView :status="result.secretgeneratorBasicAuth.status" />
        </q-card-section>
      </q-card>
    </div><div class="col-md-6">
      <q-card bordered v-if="!loading && result!=undefined && result.secretgeneratorBasicAuth!=undefined && result.secretgeneratorBasicAuth!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
        </q-card-section>
        <q-card-section>
          <OpenApiEdit
            :in="result.secretgeneratorBasicAuth"
            :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            :read-only="true"
            :show-default="false"
          />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
