<script setup lang="ts">
import postgresqlScheduledBackupQuery from '@/queries/postgresql/ScheduledBackupView.graphql'
import scheduledBackupDelete from '@/queries/postgresql/ScheduledBackupDelete.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useScheduledBackup, getProperties } from './ScheduledBackup.js'
const { onErrorHandler, notifySuccess, notifyError, onNotScheduledBackupFound, navigation, setNamespacedItemFromRoute, toEdit, actionDelete } = useScheduledBackup();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(postgresqlScheduledBackupQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem }, { pollInterval: 500 });onError(onErrorHandler); onResult(onNotScheduledBackupFound);
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(scheduledBackupDelete);
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
      <q-card bordered v-if="!loading && result!=undefined && result.postgresqlScheduledBackup!=undefined && result.postgresqlScheduledBackup!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">ScheduledBackup
            <q-btn-group push class="float-right text-capitalize shadow-3">
              <q-btn icon="edit" @click="toEdit(result.postgresqlScheduledBackup.metadata.namespace, result.postgresqlScheduledBackup.metadata.name)">
                <q-tooltip>Edit</q-tooltip>
              </q-btn>
              <q-btn icon="delete" @click="actionDelete(deletor, result.postgresqlScheduledBackup)">
                <q-tooltip>Delete</q-tooltip>
              </q-btn>
            </q-btn-group>
          </div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.postgresqlScheduledBackup.metadata" />
        </q-card-section>
      </q-card>
      <q-card bordered v-if="!loading && result!=undefined && result.postgresqlScheduledBackup!=undefined && result.postgresqlScheduledBackup!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.postgresqlScheduledBackup!=null && result.postgresqlScheduledBackup.status != null">
          <DefaultStatusView :status="result.postgresqlScheduledBackup.status" />
        </q-card-section>
      </q-card>
    </div><div class="col-md-6">
      <q-card bordered v-if="!loading && result!=undefined && result.postgresqlScheduledBackup!=undefined && result.postgresqlScheduledBackup!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
        </q-card-section>
        <q-card-section>
          <OpenApiEdit
            :in="result.postgresqlScheduledBackup"
            :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            :read-only="true"
            :show-default="false"
          />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
