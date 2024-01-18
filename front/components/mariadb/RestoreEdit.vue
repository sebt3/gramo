<script setup lang="ts">
import mariadbRestoreQuery from '@/queries/mariadb/RestoreView.graphql'
import restoreEdit from '@/queries/mariadb/RestoreEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useRestore, sanitizeData, getProperties } from './Restore.js'
const data = ref({});
const { patchDone, patchError, notifyWorking, onNotRestoreFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useRestore();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(mariadbRestoreQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchRestore, onDone: onPatchRestore, onError: onPatchError } = useMutation(restoreEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchRestore({"namespace": result.value.mariadbRestore.metadata.namespace, "name": result.value.mariadbRestore.metadata.name, "spec": sanitizeData(data.value)});
}
onError(onErrorHandler);onResult(onNotRestoreFound);onPatchRestore(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.mariadbRestore!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Restore</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.mariadbRestore.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.mariadbRestore!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.mariadbRestore!=null && result.mariadbRestore.status != null">
          <DefaultStatusView :status="result.mariadbRestore.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && result.mariadbRestore!=null" class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="data"
          :in="result.mariadbRestore"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>
