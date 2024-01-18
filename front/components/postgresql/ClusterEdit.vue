<script setup lang="ts">
import postgresqlClusterQuery from '@/queries/postgresql/ClusterView.graphql'
import clusterEdit from '@/queries/postgresql/ClusterEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useCluster, sanitizeData, getProperties } from './Cluster.js'
const data = ref({});
const { patchDone, patchError, notifyWorking, onNotClusterFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useCluster();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(postgresqlClusterQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchCluster, onDone: onPatchCluster, onError: onPatchError } = useMutation(clusterEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchCluster({"namespace": result.value.postgresqlCluster.metadata.namespace, "name": result.value.postgresqlCluster.metadata.name, "spec": sanitizeData(data.value)});
}
onError(onErrorHandler);onResult(onNotClusterFound);onPatchCluster(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.postgresqlCluster!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Cluster</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.postgresqlCluster.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.postgresqlCluster!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.postgresqlCluster!=null && result.postgresqlCluster.status != null">
          <DefaultStatusView :status="result.postgresqlCluster.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && result.postgresqlCluster!=null" class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="data"
          :in="result.postgresqlCluster"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>
