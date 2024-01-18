<script setup lang="ts">
import mariadbConnectionQuery from '@/queries/mariadb/ConnectionView.graphql'
import connectionEdit from '@/queries/mariadb/ConnectionEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useConnection, sanitizeData, getProperties } from './Connection.js'
const data = ref({});
const { patchDone, patchError, notifyWorking, onNotConnectionFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useConnection();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(mariadbConnectionQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchConnection, onDone: onPatchConnection, onError: onPatchError } = useMutation(connectionEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchConnection({"namespace": result.value.mariadbConnection.metadata.namespace, "name": result.value.mariadbConnection.metadata.name, "spec": sanitizeData(data.value)});
}
onError(onErrorHandler);onResult(onNotConnectionFound);onPatchConnection(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.mariadbConnection!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Connection</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.mariadbConnection.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.mariadbConnection!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.mariadbConnection!=null && result.mariadbConnection.status != null">
          <DefaultStatusView :status="result.mariadbConnection.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && result.mariadbConnection!=null" class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="data"
          :in="result.mariadbConnection"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>
