<script setup lang="ts">
import redisRedisSentinelQuery from '@/queries/redis/RedisSentinelView.graphql'
import redisSentinelEdit from '@/queries/redis/RedisSentinelEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useRedisSentinel, sanitizeData, getProperties } from './RedisSentinel.js'
const data = ref({});
const { patchDone, patchError, notifyWorking, onNotRedisSentinelFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useRedisSentinel();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(redisRedisSentinelQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchRedisSentinel, onDone: onPatchRedisSentinel, onError: onPatchError } = useMutation(redisSentinelEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchRedisSentinel({"namespace": result.value.redisRedisSentinel.metadata.namespace, "name": result.value.redisRedisSentinel.metadata.name, "spec": sanitizeData(data.value)});
}
onError(onErrorHandler);onResult(onNotRedisSentinelFound);onPatchRedisSentinel(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.redisRedisSentinel!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">RedisSentinel</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.redisRedisSentinel.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.redisRedisSentinel!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.redisRedisSentinel!=null && result.redisRedisSentinel.status != null">
          <DefaultStatusView :status="result.redisRedisSentinel.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && result.redisRedisSentinel!=null" class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="data"
          :in="result.redisRedisSentinel"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>
