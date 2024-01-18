<script setup lang="ts">
import k8upSnapshotQuery from '@/queries/k8up/SnapshotView.graphql'
import snapshotDelete from '@/queries/k8up/SnapshotDelete.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useSnapshot, getProperties } from './Snapshot.js'
const { onErrorHandler, notifySuccess, notifyError, onNotSnapshotFound, navigation, setNamespacedItemFromRoute, toEdit, actionDelete } = useSnapshot();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8upSnapshotQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem }, { pollInterval: 500 });onError(onErrorHandler); onResult(onNotSnapshotFound);
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(snapshotDelete);
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
      <q-card bordered v-if="!loading && result!=undefined && result.k8upSnapshot!=undefined && result.k8upSnapshot!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Snapshot
            <q-btn-group push class="float-right text-capitalize shadow-3">
              <q-btn icon="edit" @click="toEdit(result.k8upSnapshot.metadata.namespace, result.k8upSnapshot.metadata.name)">
                <q-tooltip>Edit</q-tooltip>
              </q-btn>
              <q-btn icon="delete" @click="actionDelete(deletor, result.k8upSnapshot)">
                <q-tooltip>Delete</q-tooltip>
              </q-btn>
            </q-btn-group>
          </div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8upSnapshot.metadata" />
        </q-card-section>
      </q-card>
      <q-card bordered v-if="!loading && result!=undefined && result.k8upSnapshot!=undefined && result.k8upSnapshot!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8upSnapshot!=null && result.k8upSnapshot.status != null">
          <DefaultStatusView :status="result.k8upSnapshot.status" />
        </q-card-section>
      </q-card>
    </div><div class="col-md-6">
      <q-card bordered v-if="!loading && result!=undefined && result.k8upSnapshot!=undefined && result.k8upSnapshot!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
        </q-card-section>
        <q-card-section>
          <OpenApiEdit
            :in="result.k8upSnapshot"
            :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            :read-only="true"
            :show-default="false"
          />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
