<script setup lang="ts">
import postgresqlPoolerQuery from '@/queries/postgresql/PoolerView.graphql'
import poolerEdit from '@/queries/postgresql/PoolerEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, usePooler, sanitizeData, getProperties } from './Pooler.js'
const data = ref({});
const { patchDone, patchError, notifyWorking, onNotPoolerFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = usePooler();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(postgresqlPoolerQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchPooler, onDone: onPatchPooler, onError: onPatchError } = useMutation(poolerEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchPooler({"namespace": result.value.postgresqlPooler.metadata.namespace, "name": result.value.postgresqlPooler.metadata.name, "spec": sanitizeData(data.value)});
}
onError(onErrorHandler);onResult(onNotPoolerFound);onPatchPooler(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.postgresqlPooler!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Pooler</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.postgresqlPooler.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.postgresqlPooler!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.postgresqlPooler!=null && result.postgresqlPooler.status != null">
          <DefaultStatusView :status="result.postgresqlPooler.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && result.postgresqlPooler!=null" class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="data"
          :in="result.postgresqlPooler"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>
