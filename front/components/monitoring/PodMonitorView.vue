<script setup lang="ts">
import monitoringPodMonitorQuery from '@/queries/monitoring/PodMonitorView.graphql'
import podMonitorDelete from '@/queries/monitoring/PodMonitorDelete.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, usePodMonitor, getProperties } from './PodMonitor.js'
const { onErrorHandler, notifySuccess, notifyError, onNotPodMonitorFound, navigation, setNamespacedItemFromRoute, toEdit, actionDelete } = usePodMonitor();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(monitoringPodMonitorQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem }, { pollInterval: 500 });onError(onErrorHandler); onResult(onNotPodMonitorFound);
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(podMonitorDelete);
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
      <q-card bordered v-if="!loading && result!=undefined && result.monitoringPodMonitor!=undefined && result.monitoringPodMonitor!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">PodMonitor
            <q-btn-group push class="float-right text-capitalize shadow-3">
              <q-btn icon="edit" @click="toEdit(result.monitoringPodMonitor.metadata.namespace, result.monitoringPodMonitor.metadata.name)">
                <q-tooltip>Edit</q-tooltip>
              </q-btn>
              <q-btn icon="delete" @click="actionDelete(deletor, result.monitoringPodMonitor)">
                <q-tooltip>Delete</q-tooltip>
              </q-btn>
            </q-btn-group>
          </div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.monitoringPodMonitor.metadata" />
        </q-card-section>
      </q-card>
      <q-card bordered v-if="!loading && result!=undefined && result.monitoringPodMonitor!=undefined && result.monitoringPodMonitor!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.monitoringPodMonitor!=null && result.monitoringPodMonitor.status != null">
          <DefaultStatusView :status="result.monitoringPodMonitor.status" />
        </q-card-section>
      </q-card>
    </div><div class="col-md-6">
      <q-card bordered v-if="!loading && result!=undefined && result.monitoringPodMonitor!=undefined && result.monitoringPodMonitor!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
        </q-card-section>
        <q-card-section>
          <OpenApiEdit
            :in="result.monitoringPodMonitor"
            :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            :read-only="true"
            :show-default="false"
          />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
