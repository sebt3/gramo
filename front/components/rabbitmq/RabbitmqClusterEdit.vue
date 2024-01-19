<script setup lang="ts">
import rabbitmqRabbitmqClusterQuery from '@/queries/rabbitmq/RabbitmqClusterView.graphql'
import rabbitmqClusterEdit from '@/queries/rabbitmq/RabbitmqClusterEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useRabbitmqCluster, sanitizeData, getProperties } from './RabbitmqCluster.js'
const data = ref({});
const { patchDone, patchError, notifyWorking, onNotRabbitmqClusterFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useRabbitmqCluster();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(rabbitmqRabbitmqClusterQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchRabbitmqCluster, onDone: onPatchRabbitmqCluster, onError: onPatchError } = useMutation(rabbitmqClusterEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchRabbitmqCluster({"namespace": result.value.rabbitmqRabbitmqCluster.metadata.namespace, "name": result.value.rabbitmqRabbitmqCluster.metadata.name, "spec": sanitizeData(data.value)});
}
onError(onErrorHandler);onResult(onNotRabbitmqClusterFound);onPatchRabbitmqCluster(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.rabbitmqRabbitmqCluster!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">RabbitmqCluster</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.rabbitmqRabbitmqCluster.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.rabbitmqRabbitmqCluster!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.rabbitmqRabbitmqCluster!=null && result.rabbitmqRabbitmqCluster.status != null">
          <DefaultStatusView :status="result.rabbitmqRabbitmqCluster.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && result.rabbitmqRabbitmqCluster!=null" class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="data"
          :in="result.rabbitmqRabbitmqCluster"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>
