<script setup lang="ts">
import projectcalicoHostEndpointQuery from '@/queries/projectcalico/HostEndpointView.graphql'
import hostEndpointDelete from '@/queries/projectcalico/HostEndpointDelete.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useHostEndpoint, getProperties } from './HostEndpoint.js'
const { onErrorHandler, notifySuccess, notifyError, onNotHostEndpointFound, navigation, setItemFromRoute, toEdit, actionDelete } = useHostEndpoint();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoHostEndpointQuery, { "name": navigation.currentItem }, { pollInterval: 500 });onError(onErrorHandler); onResult(onNotHostEndpointFound);
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(hostEndpointDelete);
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
      <q-card bordered v-if="!loading && result!=undefined && result.projectcalicoHostEndpoint!=undefined && result.projectcalicoHostEndpoint!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">HostEndpoint
            <q-btn-group push class="float-right text-capitalize shadow-3">
              <q-btn icon="edit" @click="toEdit(result.projectcalicoHostEndpoint.metadata.name)">
                <q-tooltip>Edit</q-tooltip>
              </q-btn>
              <q-btn icon="delete" @click="actionDelete(deletor, result.projectcalicoHostEndpoint)">
                <q-tooltip>Delete</q-tooltip>
              </q-btn>
            </q-btn-group>
          </div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.projectcalicoHostEndpoint.metadata" />
        </q-card-section>
      </q-card>
      <q-card bordered v-if="!loading && result!=undefined && result.projectcalicoHostEndpoint!=undefined && result.projectcalicoHostEndpoint!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.projectcalicoHostEndpoint!=null && result.projectcalicoHostEndpoint.status != null">
          <DefaultStatusView :status="result.projectcalicoHostEndpoint.status" />
        </q-card-section>
      </q-card>
    </div><div class="col-md-6">
      <q-card bordered v-if="!loading && result!=undefined && result.projectcalicoHostEndpoint!=undefined && result.projectcalicoHostEndpoint!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
        </q-card-section>
        <q-card-section>
          <OpenApiEdit
            :in="result.projectcalicoHostEndpoint"
            :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            :read-only="true"
            :show-default="false"
          />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
