<script setup lang="ts">
import redisRedisQuery from '@/queries/redis/Redis.read.graphql'
import RedisEdit from '@/queries/redis/Redis.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import redisRedisMeta from '@/components/redis/RedisMeta.vue';
import redisRedisEdit from '@/components/redis/RedisEdit.vue';
import redisRedisStatus from '@/components/redis/RedisStatus.vue';
import { useQuery, useMutation, sanitizeData, useRedis, RedisSimpleExcludes } from '../../../libs/redis/Redis.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotRedisFound, navigation, editor, setNamespacedItemFromRoute } = useRedis();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(redisRedisQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": RedisSimpleExcludes
  },
  "namespace": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentNamespace
      }
    ]
  }
});
const { mutate: patchRedis, onDone: onPatchRedis, onError: onPatchError } = useMutation(RedisEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchRedis({
    "name": result.k8sNamespace[0].redisRedis[0].metadata.name,
    "namespace": result.k8sNamespace[0].redisRedis[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotRedisFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].redisRedis[0])});onPatchRedis(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <redisRedisMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].redisRedis[0]!=undefined && result.k8sNamespace[0].redisRedis[0]!=null"
        :model="result.k8sNamespace[0].redisRedis[0]"
       />
    </div>
    <div class="col-md-6">
      <redisRedisStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].redisRedis[0]!=undefined && result.k8sNamespace[0].redisRedis[0]!=null"
        :model="result.k8sNamespace[0].redisRedis[0]"
       />
    </div>
    <div class="col-md-12">
      <redisRedisEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].redisRedis[0]!=undefined && result.k8sNamespace[0].redisRedis[0]!=null"
        :model="result.k8sNamespace[0].redisRedis[0]"
       />
    </div>
  </div>
</template>

