<script setup lang="ts">
import rabbitmqRabbitmqClusterQuery from '@/queries/rabbitmq/RabbitmqClusterView.graphql'
import rabbitmqClusterDelete from '@/queries/rabbitmq/RabbitmqClusterDelete.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import MonacoViewer from '../core/MonacoViewer.vue';
import { useQuery, useMutation, useRabbitmqCluster, getProperties } from './RabbitmqCluster.js'
const { viewer, viewerUpdate, onErrorHandler, notifySuccess, notifyError, onNotRabbitmqClusterFound, navigation, setNamespacedItemFromRoute, toEdit, actionDelete } = useRabbitmqCluster();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(rabbitmqRabbitmqClusterQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem }, { pollInterval: 500 });onError(onErrorHandler); onResult(res => {onNotRabbitmqClusterFound(res);viewerUpdate(res, res.loading?{}:res.data.rabbitmqRabbitmqCluster.metadata.obj)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(rabbitmqClusterDelete);
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
      <q-card bordered v-if="!loading && result!=undefined && result.rabbitmqRabbitmqCluster!=undefined && result.rabbitmqRabbitmqCluster!=null" class="q-ma-sm">
        <q-card-section class="bg-primary text-grey-4">
          <div class="text-h6 q-mt-none q-mb-none q-pt-none q-pb-none">RabbitmqCluster
            <q-btn-group push class="float-right text-capitalize shadow-3">
              <q-btn icon="edit" @click="toEdit(result.rabbitmqRabbitmqCluster.metadata.namespace, result.rabbitmqRabbitmqCluster.metadata.name)">
                <q-tooltip>Edit</q-tooltip>
              </q-btn>
              <q-btn icon="delete" @click="actionDelete(deletor, result.rabbitmqRabbitmqCluster)">
                <q-tooltip>Delete</q-tooltip>
              </q-btn>
            </q-btn-group>
          </div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.rabbitmqRabbitmqCluster.metadata" />
        </q-card-section>
      </q-card>
      <q-card bordered v-if="!loading && result!=undefined && result.rabbitmqRabbitmqCluster!=undefined && result.rabbitmqRabbitmqCluster!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.rabbitmqRabbitmqCluster!=null && result.rabbitmqRabbitmqCluster.status != null">
          <DefaultStatusView :status="result.rabbitmqRabbitmqCluster.status" />
        </q-card-section>
      </q-card>
    </div><div class="col-md-6">
      <q-card bordered v-if="!loading && result!=undefined && result.rabbitmqRabbitmqCluster!=undefined && result.rabbitmqRabbitmqCluster!=null" class="q-ma-sm">
        <q-tabs v-model="viewer.tab" class="bg-primary text-grey-4" active-color="white">
          <q-tab label="Options" name="simple" />
          <q-tab label="Specifications" name="spec" />
          <q-tab label="full Yaml" name="yaml" />
        </q-tabs>
        <q-tab-panels v-model="viewer.tab" animated>
          <q-tab-panel name="simple">
            <OpenApiEdit
              :in="result.rabbitmqRabbitmqCluster"
              :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
              :read-only="true"
              :show-default="false"
            />
          </q-tab-panel>
          <q-tab-panel name="spec">
            <MonacoViewer :text="viewer.spec" :key="viewer.spec" />
          </q-tab-panel>
          <q-tab-panel name="yaml">
            <MonacoViewer :text="viewer.full" :key="viewer.spec" />
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>
