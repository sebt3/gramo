<script setup lang="ts">
import projectcalicoBGPPeerQuery from '@/queries/projectcalico/BGPPeerView.graphql'
import bGPPeerDelete from '@/queries/projectcalico/BGPPeerDelete.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useBGPPeer, getProperties } from './BGPPeer.js'
const { onErrorHandler, notifySuccess, notifyError, onNotBGPPeerFound, navigation, setItemFromRoute, toEdit, actionDelete } = useBGPPeer();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoBGPPeerQuery, { "name": navigation.currentItem }, { pollInterval: 500 });onError(onErrorHandler); onResult(onNotBGPPeerFound);
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(bGPPeerDelete);
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
      <q-card bordered v-if="!loading && result!=undefined && result.projectcalicoBGPPeer!=undefined && result.projectcalicoBGPPeer!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">BGPPeer
            <q-btn-group push class="float-right text-capitalize shadow-3">
              <q-btn icon="edit" @click="toEdit(result.projectcalicoBGPPeer.metadata.name)">
                <q-tooltip>Edit</q-tooltip>
              </q-btn>
              <q-btn icon="delete" @click="actionDelete(deletor, result.projectcalicoBGPPeer)">
                <q-tooltip>Delete</q-tooltip>
              </q-btn>
            </q-btn-group>
          </div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.projectcalicoBGPPeer.metadata" />
        </q-card-section>
      </q-card>
      <q-card bordered v-if="!loading && result!=undefined && result.projectcalicoBGPPeer!=undefined && result.projectcalicoBGPPeer!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.projectcalicoBGPPeer!=null && result.projectcalicoBGPPeer.status != null">
          <DefaultStatusView :status="result.projectcalicoBGPPeer.status" />
        </q-card-section>
      </q-card>
    </div><div class="col-md-6">
      <q-card bordered v-if="!loading && result!=undefined && result.projectcalicoBGPPeer!=undefined && result.projectcalicoBGPPeer!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
        </q-card-section>
        <q-card-section>
          <OpenApiEdit
            :in="result.projectcalicoBGPPeer"
            :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            :read-only="true"
            :show-default="false"
          />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
