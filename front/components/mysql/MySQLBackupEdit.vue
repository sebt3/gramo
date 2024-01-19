<script setup lang="ts">
import mysqlMySQLBackupQuery from '@/queries/mysql/MySQLBackupView.graphql'
import mySQLBackupEdit from '@/queries/mysql/MySQLBackupEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useMySQLBackup, sanitizeData, getProperties } from './MySQLBackup.js'
const data = ref({});
const { patchDone, patchError, notifyWorking, onNotMySQLBackupFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useMySQLBackup();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(mysqlMySQLBackupQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchMySQLBackup, onDone: onPatchMySQLBackup, onError: onPatchError } = useMutation(mySQLBackupEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchMySQLBackup({"namespace": result.value.mysqlMySQLBackup.metadata.namespace, "name": result.value.mysqlMySQLBackup.metadata.name, "spec": sanitizeData(data.value)});
}
onError(onErrorHandler);onResult(onNotMySQLBackupFound);onPatchMySQLBackup(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.mysqlMySQLBackup!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">MySQLBackup</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.mysqlMySQLBackup.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.mysqlMySQLBackup!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.mysqlMySQLBackup!=null && result.mysqlMySQLBackup.status != null">
          <DefaultStatusView :status="result.mysqlMySQLBackup.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && result.mysqlMySQLBackup!=null" class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="data"
          :in="result.mysqlMySQLBackup"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>
