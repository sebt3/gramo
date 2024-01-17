<script setup lang="ts">
import secretgeneratorSSHKeyPairQuery from '@/queries/secretgenerator/SSHKeyPairView.graphql'
import sSHKeyPairDelete from '@/queries/secretgenerator/SSHKeyPairDelete.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useSSHKeyPair, getProperties } from './SSHKeyPair.js'
const { onErrorHandler, notifySuccess, notifyError, onNotSSHKeyPairFound, navigation, setNamespacedItemFromRoute, toEdit, actionDelete } = useSSHKeyPair();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(secretgeneratorSSHKeyPairQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem }, { pollInterval: 500 });onError(onErrorHandler); onResult(onNotSSHKeyPairFound);
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(sSHKeyPairDelete);
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
      <q-card bordered v-if="!loading && result!=undefined && result.secretgeneratorSSHKeyPair!=undefined && result.secretgeneratorSSHKeyPair!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">SSHKeyPair
            <q-btn-group push class="float-right text-capitalize shadow-3">
              <q-btn icon="edit" @click="toEdit(result.secretgeneratorSSHKeyPair.metadata.namespace, result.secretgeneratorSSHKeyPair.metadata.name)">
                <q-tooltip>Edit</q-tooltip>
              </q-btn>
              <q-btn icon="delete" @click="actionDelete(deletor, result.secretgeneratorSSHKeyPair)">
                <q-tooltip>Delete</q-tooltip>
              </q-btn>
            </q-btn-group>
          </div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.secretgeneratorSSHKeyPair.metadata" />
        </q-card-section>
      </q-card>
      <q-card bordered v-if="!loading && result!=undefined && result.secretgeneratorSSHKeyPair!=undefined && result.secretgeneratorSSHKeyPair!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.secretgeneratorSSHKeyPair!=null && result.secretgeneratorSSHKeyPair.status != null">
          <DefaultStatusView :status="result.secretgeneratorSSHKeyPair.status" />
        </q-card-section>
      </q-card>
    </div><div class="col-md-6">
      <q-card bordered v-if="!loading && result!=undefined && result.secretgeneratorSSHKeyPair!=undefined && result.secretgeneratorSSHKeyPair!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
        </q-card-section>
        <q-card-section>
          <OpenApiEdit
            :in="result.secretgeneratorSSHKeyPair"
            :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            :read-only="true"
            :show-default="false"
          />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
