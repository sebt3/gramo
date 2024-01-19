<script setup lang="ts">
import mysqlInnoDBClusterQuery from '@/queries/mysql/InnoDBClusterView.graphql'
import innoDBClusterDelete from '@/queries/mysql/InnoDBClusterDelete.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useInnoDBCluster, getProperties } from './InnoDBCluster.js'
const { onErrorHandler, notifySuccess, notifyError, onNotInnoDBClusterFound, navigation, setNamespacedItemFromRoute, toEdit, actionDelete } = useInnoDBCluster();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(mysqlInnoDBClusterQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem }, { pollInterval: 500 });onError(onErrorHandler); onResult(onNotInnoDBClusterFound);
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(innoDBClusterDelete);
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
      <q-card bordered v-if="!loading && result!=undefined && result.mysqlInnoDBCluster!=undefined && result.mysqlInnoDBCluster!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">InnoDBCluster
            <q-btn-group push class="float-right text-capitalize shadow-3">
              <q-btn icon="edit" @click="toEdit(result.mysqlInnoDBCluster.metadata.namespace, result.mysqlInnoDBCluster.metadata.name)">
                <q-tooltip>Edit</q-tooltip>
              </q-btn>
              <q-btn icon="delete" @click="actionDelete(deletor, result.mysqlInnoDBCluster)">
                <q-tooltip>Delete</q-tooltip>
              </q-btn>
            </q-btn-group>
          </div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.mysqlInnoDBCluster.metadata" />
        </q-card-section>
      </q-card>
      <q-card bordered v-if="!loading && result!=undefined && result.mysqlInnoDBCluster!=undefined && result.mysqlInnoDBCluster!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.mysqlInnoDBCluster!=null && result.mysqlInnoDBCluster.status != null">
          <DefaultStatusView :status="result.mysqlInnoDBCluster.status" />
        </q-card-section>
      </q-card>
    </div><div class="col-md-6">
      <q-card bordered v-if="!loading && result!=undefined && result.mysqlInnoDBCluster!=undefined && result.mysqlInnoDBCluster!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
        </q-card-section>
        <q-card-section>
          <OpenApiEdit
            :in="result.mysqlInnoDBCluster"
            :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            :read-only="true"
            :show-default="false"
          />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
