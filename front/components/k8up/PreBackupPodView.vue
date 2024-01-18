<script setup lang="ts">
import k8upPreBackupPodQuery from '@/queries/k8up/PreBackupPodView.graphql'
import preBackupPodDelete from '@/queries/k8up/PreBackupPodDelete.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, usePreBackupPod, getProperties } from './PreBackupPod.js'
const { onErrorHandler, notifySuccess, notifyError, onNotPreBackupPodFound, navigation, setNamespacedItemFromRoute, toEdit, actionDelete } = usePreBackupPod();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8upPreBackupPodQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem }, { pollInterval: 500 });onError(onErrorHandler); onResult(onNotPreBackupPodFound);
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(preBackupPodDelete);
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
      <q-card bordered v-if="!loading && result!=undefined && result.k8upPreBackupPod!=undefined && result.k8upPreBackupPod!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">PreBackupPod
            <q-btn-group push class="float-right text-capitalize shadow-3">
              <q-btn icon="edit" @click="toEdit(result.k8upPreBackupPod.metadata.namespace, result.k8upPreBackupPod.metadata.name)">
                <q-tooltip>Edit</q-tooltip>
              </q-btn>
              <q-btn icon="delete" @click="actionDelete(deletor, result.k8upPreBackupPod)">
                <q-tooltip>Delete</q-tooltip>
              </q-btn>
            </q-btn-group>
          </div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8upPreBackupPod.metadata" />
        </q-card-section>
      </q-card>
      <q-card bordered v-if="!loading && result!=undefined && result.k8upPreBackupPod!=undefined && result.k8upPreBackupPod!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8upPreBackupPod!=null && result.k8upPreBackupPod.status != null">
          <DefaultStatusView :status="result.k8upPreBackupPod.status" />
        </q-card-section>
      </q-card>
    </div><div class="col-md-6">
      <q-card bordered v-if="!loading && result!=undefined && result.k8upPreBackupPod!=undefined && result.k8upPreBackupPod!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
        </q-card-section>
        <q-card-section>
          <OpenApiEdit
            :in="result.k8upPreBackupPod"
            :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            :read-only="true"
            :show-default="false"
          />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
