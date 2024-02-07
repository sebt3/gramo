<script setup lang="ts">
import redisRedisClusterQuery from '@/queries/redis/RedisCluster.read.graphql'
import RedisClusterEdit from '@/queries/redis/RedisCluster.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import redisRedisClusterMeta from '@/components/redis/RedisClusterMeta.vue';
import redisRedisClusterEdit from '@/components/redis/RedisClusterEdit.vue';
import redisRedisClusterStatus from '@/components/redis/RedisClusterStatus.vue';
import { useQuery, useMutation, sanitizeData, useRedisCluster, RedisClusterSimpleExcludes } from '../../../libs/redis/RedisCluster.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotRedisClusterFound, navigation, editor, setNamespacedItemFromRoute } = useRedisCluster();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(redisRedisClusterQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": RedisClusterSimpleExcludes
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
const { mutate: patchRedisCluster, onDone: onPatchRedisCluster, onError: onPatchError } = useMutation(RedisClusterEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchRedisCluster({
    "name": result.k8sNamespace[0].redisRedisCluster[0].metadata.name,
    "namespace": result.k8sNamespace[0].redisRedisCluster[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotRedisClusterFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].redisRedisCluster[0])});onPatchRedisCluster(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <redisRedisClusterMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].redisRedisCluster[0]!=undefined && result.k8sNamespace[0].redisRedisCluster[0]!=null"
        :model="result.k8sNamespace[0].redisRedisCluster[0]"
       />
    </div>
    <div class="col-md-6">
      <redisRedisClusterStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].redisRedisCluster[0]!=undefined && result.k8sNamespace[0].redisRedisCluster[0]!=null"
        :model="result.k8sNamespace[0].redisRedisCluster[0]"
       />
    </div>
    <div class="col-md-12">
      <redisRedisClusterEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].redisRedisCluster[0]!=undefined && result.k8sNamespace[0].redisRedisCluster[0]!=null"
        :model="result.k8sNamespace[0].redisRedisCluster[0]"
       />
    </div>
  </div>
</template>

