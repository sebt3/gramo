<script setup lang="ts">
import mariadbBackupQuery from '@/queries/mariadb/BackupView.graphql'
import backupEdit from '@/queries/mariadb/BackupEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useBackup, sanitizeData, getProperties } from './Backup.js'
const data = ref({});
const { patchDone, patchError, notifyWorking, onNotBackupFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useBackup();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(mariadbBackupQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchBackup, onDone: onPatchBackup, onError: onPatchError } = useMutation(backupEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchBackup({"namespace": result.value.mariadbBackup.metadata.namespace, "name": result.value.mariadbBackup.metadata.name, "spec": sanitizeData(data.value)});
}
onError(onErrorHandler);onResult(onNotBackupFound);onPatchBackup(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.mariadbBackup!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Backup</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.mariadbBackup.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.mariadbBackup!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.mariadbBackup!=null && result.mariadbBackup.status != null">
          <DefaultStatusView :status="result.mariadbBackup.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && result.mariadbBackup!=null" class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="data"
          :in="result.mariadbBackup"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>
