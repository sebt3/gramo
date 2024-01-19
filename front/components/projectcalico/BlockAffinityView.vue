<script setup lang="ts">
import projectcalicoBlockAffinityQuery from '@/queries/projectcalico/BlockAffinityView.graphql'
import blockAffinityDelete from '@/queries/projectcalico/BlockAffinityDelete.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useBlockAffinity, getProperties } from './BlockAffinity.js'
const { onErrorHandler, notifySuccess, notifyError, onNotBlockAffinityFound, navigation, setItemFromRoute, toEdit, actionDelete } = useBlockAffinity();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoBlockAffinityQuery, { "name": navigation.currentItem }, { pollInterval: 500 });onError(onErrorHandler); onResult(onNotBlockAffinityFound);
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(blockAffinityDelete);
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
      <q-card bordered v-if="!loading && result!=undefined && result.projectcalicoBlockAffinity!=undefined && result.projectcalicoBlockAffinity!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">BlockAffinity
            <q-btn-group push class="float-right text-capitalize shadow-3">
              <q-btn icon="edit" @click="toEdit(result.projectcalicoBlockAffinity.metadata.name)">
                <q-tooltip>Edit</q-tooltip>
              </q-btn>
              <q-btn icon="delete" @click="actionDelete(deletor, result.projectcalicoBlockAffinity)">
                <q-tooltip>Delete</q-tooltip>
              </q-btn>
            </q-btn-group>
          </div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.projectcalicoBlockAffinity.metadata" />
        </q-card-section>
      </q-card>
      <q-card bordered v-if="!loading && result!=undefined && result.projectcalicoBlockAffinity!=undefined && result.projectcalicoBlockAffinity!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.projectcalicoBlockAffinity!=null && result.projectcalicoBlockAffinity.status != null">
          <DefaultStatusView :status="result.projectcalicoBlockAffinity.status" />
        </q-card-section>
      </q-card>
    </div><div class="col-md-6">
      <q-card bordered v-if="!loading && result!=undefined && result.projectcalicoBlockAffinity!=undefined && result.projectcalicoBlockAffinity!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
        </q-card-section>
        <q-card-section>
          <OpenApiEdit
            :in="result.projectcalicoBlockAffinity"
            :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            :read-only="true"
            :show-default="false"
          />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
