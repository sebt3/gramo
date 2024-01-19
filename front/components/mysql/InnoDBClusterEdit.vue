<script setup lang="ts">
import mysqlInnoDBClusterQuery from '@/queries/mysql/InnoDBClusterView.graphql'
import innoDBClusterEdit from '@/queries/mysql/InnoDBClusterEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useInnoDBCluster, sanitizeData, getProperties } from './InnoDBCluster.js'
const data = ref({});
const { patchDone, patchError, notifyWorking, onNotInnoDBClusterFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useInnoDBCluster();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(mysqlInnoDBClusterQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchInnoDBCluster, onDone: onPatchInnoDBCluster, onError: onPatchError } = useMutation(innoDBClusterEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchInnoDBCluster({"namespace": result.value.mysqlInnoDBCluster.metadata.namespace, "name": result.value.mysqlInnoDBCluster.metadata.name, "spec": sanitizeData(data.value)});
}
onError(onErrorHandler);onResult(onNotInnoDBClusterFound);onPatchInnoDBCluster(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.mysqlInnoDBCluster!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">InnoDBCluster</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.mysqlInnoDBCluster.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.mysqlInnoDBCluster!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.mysqlInnoDBCluster!=null && result.mysqlInnoDBCluster.status != null">
          <DefaultStatusView :status="result.mysqlInnoDBCluster.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && result.mysqlInnoDBCluster!=null" class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="data"
          :in="result.mysqlInnoDBCluster"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>
