<script setup lang="ts">
import monitoringServiceMonitorQuery from '@/queries/monitoring/ServiceMonitorView.graphql'
import serviceMonitorDelete from '@/queries/monitoring/ServiceMonitorDelete.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useServiceMonitor, getProperties } from './ServiceMonitor.js'
const { onErrorHandler, notifySuccess, notifyError, onNotServiceMonitorFound, navigation, setNamespacedItemFromRoute, toEdit, actionDelete } = useServiceMonitor();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(monitoringServiceMonitorQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem }, { pollInterval: 500 });onError(onErrorHandler); onResult(onNotServiceMonitorFound);
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(serviceMonitorDelete);
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
      <q-card bordered v-if="!loading && result!=undefined && result.monitoringServiceMonitor!=undefined && result.monitoringServiceMonitor!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">ServiceMonitor
            <q-btn-group push class="float-right text-capitalize shadow-3">
              <q-btn icon="edit" @click="toEdit(result.monitoringServiceMonitor.metadata.namespace, result.monitoringServiceMonitor.metadata.name)">
                <q-tooltip>Edit</q-tooltip>
              </q-btn>
              <q-btn icon="delete" @click="actionDelete(deletor, result.monitoringServiceMonitor)">
                <q-tooltip>Delete</q-tooltip>
              </q-btn>
            </q-btn-group>
          </div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.monitoringServiceMonitor.metadata" />
        </q-card-section>
      </q-card>
      <q-card bordered v-if="!loading && result!=undefined && result.monitoringServiceMonitor!=undefined && result.monitoringServiceMonitor!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.monitoringServiceMonitor!=null && result.monitoringServiceMonitor.status != null">
          <DefaultStatusView :status="result.monitoringServiceMonitor.status" />
        </q-card-section>
      </q-card>
    </div><div class="col-md-6">
      <q-card bordered v-if="!loading && result!=undefined && result.monitoringServiceMonitor!=undefined && result.monitoringServiceMonitor!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
        </q-card-section>
        <q-card-section>
          <OpenApiEdit
            :in="result.monitoringServiceMonitor"
            :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            :read-only="true"
            :show-default="false"
          />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
