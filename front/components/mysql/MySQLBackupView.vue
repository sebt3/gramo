<script setup lang="ts">
import mysqlMySQLBackupQuery from '@/queries/mysql/MySQLBackupView.graphql'
import mySQLBackupDelete from '@/queries/mysql/MySQLBackupDelete.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useMySQLBackup, getProperties } from './MySQLBackup.js'
const { onErrorHandler, notifySuccess, notifyError, onNotMySQLBackupFound, navigation, setNamespacedItemFromRoute, toEdit, actionDelete } = useMySQLBackup();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(mysqlMySQLBackupQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem }, { pollInterval: 500 });onError(onErrorHandler); onResult(onNotMySQLBackupFound);
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(mySQLBackupDelete);
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
      <q-card bordered v-if="!loading && result!=undefined && result.mysqlMySQLBackup!=undefined && result.mysqlMySQLBackup!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">MySQLBackup
            <q-btn-group push class="float-right text-capitalize shadow-3">
              <q-btn icon="edit" @click="toEdit(result.mysqlMySQLBackup.metadata.namespace, result.mysqlMySQLBackup.metadata.name)">
                <q-tooltip>Edit</q-tooltip>
              </q-btn>
              <q-btn icon="delete" @click="actionDelete(deletor, result.mysqlMySQLBackup)">
                <q-tooltip>Delete</q-tooltip>
              </q-btn>
            </q-btn-group>
          </div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.mysqlMySQLBackup.metadata" />
        </q-card-section>
      </q-card>
      <q-card bordered v-if="!loading && result!=undefined && result.mysqlMySQLBackup!=undefined && result.mysqlMySQLBackup!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.mysqlMySQLBackup!=null && result.mysqlMySQLBackup.status != null">
          <DefaultStatusView :status="result.mysqlMySQLBackup.status" />
        </q-card-section>
      </q-card>
    </div><div class="col-md-6">
      <q-card bordered v-if="!loading && result!=undefined && result.mysqlMySQLBackup!=undefined && result.mysqlMySQLBackup!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
        </q-card-section>
        <q-card-section>
          <OpenApiEdit
            :in="result.mysqlMySQLBackup"
            :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            :read-only="true"
            :show-default="false"
          />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
