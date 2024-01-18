<script setup lang="ts">
import redisRedisQuery from '@/queries/redis/RedisView.graphql'
import redisEdit from '@/queries/redis/RedisEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useRedis, sanitizeData, getProperties } from './Redis.js'
const data = ref({});
const { patchDone, patchError, notifyWorking, onNotRedisFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useRedis();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(redisRedisQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchRedis, onDone: onPatchRedis, onError: onPatchError } = useMutation(redisEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchRedis({"namespace": result.value.redisRedis.metadata.namespace, "name": result.value.redisRedis.metadata.name, "spec": sanitizeData(data.value)});
}
onError(onErrorHandler);onResult(onNotRedisFound);onPatchRedis(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.redisRedis!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Redis</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.redisRedis.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.redisRedis!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.redisRedis!=null && result.redisRedis.status != null">
          <DefaultStatusView :status="result.redisRedis.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && result.redisRedis!=null" class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="data"
          :in="result.redisRedis"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>
