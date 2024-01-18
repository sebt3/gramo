<script setup lang="ts">
import mariadbMariaDBQuery from '@/queries/mariadb/MariaDBView.graphql'
import mariaDBEdit from '@/queries/mariadb/MariaDBEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useMariaDB, sanitizeData, getProperties } from './MariaDB.js'
const data = ref({});
const { patchDone, patchError, notifyWorking, onNotMariaDBFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useMariaDB();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(mariadbMariaDBQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchMariaDB, onDone: onPatchMariaDB, onError: onPatchError } = useMutation(mariaDBEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchMariaDB({"namespace": result.value.mariadbMariaDB.metadata.namespace, "name": result.value.mariadbMariaDB.metadata.name, "spec": sanitizeData(data.value)});
}
onError(onErrorHandler);onResult(onNotMariaDBFound);onPatchMariaDB(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.mariadbMariaDB!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">MariaDB</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.mariadbMariaDB.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.mariadbMariaDB!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.mariadbMariaDB!=null && result.mariadbMariaDB.status != null">
          <DefaultStatusView :status="result.mariadbMariaDB.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && result.mariadbMariaDB!=null" class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="data"
          :in="result.mariadbMariaDB"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>
