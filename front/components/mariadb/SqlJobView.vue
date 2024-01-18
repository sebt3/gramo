<script setup lang="ts">
import mariadbSqlJobQuery from '@/queries/mariadb/SqlJobView.graphql'
import sqlJobDelete from '@/queries/mariadb/SqlJobDelete.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useSqlJob, getProperties } from './SqlJob.js'
const { onErrorHandler, notifySuccess, notifyError, onNotSqlJobFound, navigation, setNamespacedItemFromRoute, toEdit, actionDelete } = useSqlJob();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(mariadbSqlJobQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem }, { pollInterval: 500 });onError(onErrorHandler); onResult(onNotSqlJobFound);
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(sqlJobDelete);
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
      <q-card bordered v-if="!loading && result!=undefined && result.mariadbSqlJob!=undefined && result.mariadbSqlJob!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">SqlJob
            <q-btn-group push class="float-right text-capitalize shadow-3">
              <q-btn icon="edit" @click="toEdit(result.mariadbSqlJob.metadata.namespace, result.mariadbSqlJob.metadata.name)">
                <q-tooltip>Edit</q-tooltip>
              </q-btn>
              <q-btn icon="delete" @click="actionDelete(deletor, result.mariadbSqlJob)">
                <q-tooltip>Delete</q-tooltip>
              </q-btn>
            </q-btn-group>
          </div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.mariadbSqlJob.metadata" />
        </q-card-section>
      </q-card>
      <q-card bordered v-if="!loading && result!=undefined && result.mariadbSqlJob!=undefined && result.mariadbSqlJob!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.mariadbSqlJob!=null && result.mariadbSqlJob.status != null">
          <DefaultStatusView :status="result.mariadbSqlJob.status" />
        </q-card-section>
      </q-card>
    </div><div class="col-md-6">
      <q-card bordered v-if="!loading && result!=undefined && result.mariadbSqlJob!=undefined && result.mariadbSqlJob!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
        </q-card-section>
        <q-card-section>
          <OpenApiEdit
            :in="result.mariadbSqlJob"
            :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            :read-only="true"
            :show-default="false"
          />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
