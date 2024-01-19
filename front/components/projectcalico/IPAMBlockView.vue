<script setup lang="ts">
import projectcalicoIPAMBlockQuery from '@/queries/projectcalico/IPAMBlockView.graphql'
import iPAMBlockDelete from '@/queries/projectcalico/IPAMBlockDelete.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useIPAMBlock, getProperties } from './IPAMBlock.js'
const { onErrorHandler, notifySuccess, notifyError, onNotIPAMBlockFound, navigation, setItemFromRoute, toEdit, actionDelete } = useIPAMBlock();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoIPAMBlockQuery, { "name": navigation.currentItem }, { pollInterval: 500 });onError(onErrorHandler); onResult(onNotIPAMBlockFound);
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(iPAMBlockDelete);
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
      <q-card bordered v-if="!loading && result!=undefined && result.projectcalicoIPAMBlock!=undefined && result.projectcalicoIPAMBlock!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">IPAMBlock
            <q-btn-group push class="float-right text-capitalize shadow-3">
              <q-btn icon="edit" @click="toEdit(result.projectcalicoIPAMBlock.metadata.name)">
                <q-tooltip>Edit</q-tooltip>
              </q-btn>
              <q-btn icon="delete" @click="actionDelete(deletor, result.projectcalicoIPAMBlock)">
                <q-tooltip>Delete</q-tooltip>
              </q-btn>
            </q-btn-group>
          </div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.projectcalicoIPAMBlock.metadata" />
        </q-card-section>
      </q-card>
      <q-card bordered v-if="!loading && result!=undefined && result.projectcalicoIPAMBlock!=undefined && result.projectcalicoIPAMBlock!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.projectcalicoIPAMBlock!=null && result.projectcalicoIPAMBlock.status != null">
          <DefaultStatusView :status="result.projectcalicoIPAMBlock.status" />
        </q-card-section>
      </q-card>
    </div><div class="col-md-6">
      <q-card bordered v-if="!loading && result!=undefined && result.projectcalicoIPAMBlock!=undefined && result.projectcalicoIPAMBlock!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
        </q-card-section>
        <q-card-section>
          <OpenApiEdit
            :in="result.projectcalicoIPAMBlock"
            :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            :read-only="true"
            :show-default="false"
          />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
