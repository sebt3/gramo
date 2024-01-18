<script setup lang="ts">
import redisRedisReplicationQuery from '@/queries/redis/RedisReplicationView.graphql'
import redisReplicationEdit from '@/queries/redis/RedisReplicationEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useRedisReplication, sanitizeData, getProperties } from './RedisReplication.js'
const data = ref({});
const { patchDone, patchError, notifyWorking, onNotRedisReplicationFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useRedisReplication();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(redisRedisReplicationQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchRedisReplication, onDone: onPatchRedisReplication, onError: onPatchError } = useMutation(redisReplicationEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchRedisReplication({"namespace": result.value.redisRedisReplication.metadata.namespace, "name": result.value.redisRedisReplication.metadata.name, "spec": sanitizeData(data.value)});
}
onError(onErrorHandler);onResult(onNotRedisReplicationFound);onPatchRedisReplication(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.redisRedisReplication!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">RedisReplication</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.redisRedisReplication.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.redisRedisReplication!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.redisRedisReplication!=null && result.redisRedisReplication.status != null">
          <DefaultStatusView :status="result.redisRedisReplication.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && result.redisRedisReplication!=null" class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="data"
          :in="result.redisRedisReplication"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>
