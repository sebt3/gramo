<script setup lang="ts">
import fluxcdImagePolicyQuery from '@/queries/fluxcd/ImagePolicyView.graphql'
import imagePolicyDelete from '@/queries/fluxcd/ImagePolicyDelete.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useImagePolicy, getProperties } from './ImagePolicy.js'
const { onErrorHandler, notifySuccess, notifyError, onNotImagePolicyFound, navigation, setNamespacedItemFromRoute, toEdit, actionDelete } = useImagePolicy();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(fluxcdImagePolicyQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem }, { pollInterval: 500 });onError(onErrorHandler); onResult(onNotImagePolicyFound);
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(imagePolicyDelete);
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
      <q-card bordered v-if="!loading && result!=undefined && result.fluxcdImagePolicy!=undefined && result.fluxcdImagePolicy!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">ImagePolicy
            <q-btn-group push class="float-right text-capitalize shadow-3">
              <q-btn icon="edit" @click="toEdit(result.fluxcdImagePolicy.metadata.namespace, result.fluxcdImagePolicy.metadata.name)">
                <q-tooltip>Edit</q-tooltip>
              </q-btn>
              <q-btn icon="delete" @click="actionDelete(deletor, result.fluxcdImagePolicy)">
                <q-tooltip>Delete</q-tooltip>
              </q-btn>
            </q-btn-group>
          </div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.fluxcdImagePolicy.metadata" />
        </q-card-section>
      </q-card>
      <q-card bordered v-if="!loading && result!=undefined && result.fluxcdImagePolicy!=undefined && result.fluxcdImagePolicy!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.fluxcdImagePolicy!=null && result.fluxcdImagePolicy.status != null">
          <DefaultStatusView :status="result.fluxcdImagePolicy.status" />
        </q-card-section>
      </q-card>
    </div><div class="col-md-6">
      <q-card bordered v-if="!loading && result!=undefined && result.fluxcdImagePolicy!=undefined && result.fluxcdImagePolicy!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
        </q-card-section>
        <q-card-section>
          <OpenApiEdit
            :in="result.fluxcdImagePolicy"
            :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            :read-only="true"
            :show-default="false"
          />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
