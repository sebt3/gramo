<script setup lang="ts">
import mariadbSqlJobQuery from '@/queries/mariadb/SqlJobView.graphql'
import sqlJobEdit from '@/queries/mariadb/SqlJobEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useSqlJob, sanitizeData, getProperties } from './SqlJob.js'
const data = ref({});
const { patchDone, patchError, notifyWorking, onNotSqlJobFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useSqlJob();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(mariadbSqlJobQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchSqlJob, onDone: onPatchSqlJob, onError: onPatchError } = useMutation(sqlJobEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchSqlJob({"namespace": result.value.mariadbSqlJob.metadata.namespace, "name": result.value.mariadbSqlJob.metadata.name, "spec": sanitizeData(data.value)});
}
onError(onErrorHandler);onResult(onNotSqlJobFound);onPatchSqlJob(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.mariadbSqlJob!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">SqlJob</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.mariadbSqlJob.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.mariadbSqlJob!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.mariadbSqlJob!=null && result.mariadbSqlJob.status != null">
          <DefaultStatusView :status="result.mariadbSqlJob.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && result.mariadbSqlJob!=null" class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="data"
          :in="result.mariadbSqlJob"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>
