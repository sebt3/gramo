<script setup lang="ts">
import secretgeneratorStringSecretQuery from '@/queries/secretgenerator/StringSecretView.graphql'
import stringSecretDelete from '@/queries/secretgenerator/StringSecretDelete.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useStringSecret, getProperties } from './StringSecret.js'
const { onErrorHandler, notifySuccess, notifyError, onNotStringSecretFound, navigation, setNamespacedItemFromRoute, toEdit, actionDelete } = useStringSecret();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(secretgeneratorStringSecretQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem }, { pollInterval: 500 });onError(onErrorHandler); onResult(onNotStringSecretFound);
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
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
        </q-card-section>
        <q-card-section>
          <OpenApiEdit
            :in="result.secretgeneratorStringSecret"
            :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            :read-only="true"
            :show-default="false"
          />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
