<script setup lang="ts">
import monitoringThanosRulerQuery from '@/queries/monitoring/ThanosRulerView.graphql'
import thanosRulerDelete from '@/queries/monitoring/ThanosRulerDelete.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useThanosRuler, getProperties } from './ThanosRuler.js'
const { onErrorHandler, notifySuccess, notifyError, onNotThanosRulerFound, navigation, setNamespacedItemFromRoute, toEdit, actionDelete } = useThanosRuler();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(monitoringThanosRulerQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem }, { pollInterval: 500 });onError(onErrorHandler); onResult(onNotThanosRulerFound);
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(thanosRulerDelete);
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
      <q-card bordered v-if="!loading && result!=undefined && result.monitoringThanosRuler!=undefined && result.monitoringThanosRuler!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">ThanosRuler
            <q-btn-group push class="float-right text-capitalize shadow-3">
              <q-btn icon="edit" @click="toEdit(result.monitoringThanosRuler.metadata.namespace, result.monitoringThanosRuler.metadata.name)">
                <q-tooltip>Edit</q-tooltip>
              </q-btn>
              <q-btn icon="delete" @click="actionDelete(deletor, result.monitoringThanosRuler)">
                <q-tooltip>Delete</q-tooltip>
              </q-btn>
            </q-btn-group>
          </div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.monitoringThanosRuler.metadata" />
        </q-card-section>
      </q-card>
      <q-card bordered v-if="!loading && result!=undefined && result.monitoringThanosRuler!=undefined && result.monitoringThanosRuler!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.monitoringThanosRuler!=null && result.monitoringThanosRuler.status != null">
          <DefaultStatusView :status="result.monitoringThanosRuler.status" />
        </q-card-section>
      </q-card>
    </div><div class="col-md-6">
      <q-card bordered v-if="!loading && result!=undefined && result.monitoringThanosRuler!=undefined && result.monitoringThanosRuler!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
        </q-card-section>
        <q-card-section>
          <OpenApiEdit
            :in="result.monitoringThanosRuler"
            :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            :read-only="true"
            :show-default="false"
          />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
