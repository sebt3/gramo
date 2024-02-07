<script setup lang="ts">
import redisRedisClusterQuery from '@/queries/redis/RedisCluster.details.graphql'
import RedisClusterDelete from '@/queries/redis/RedisCluster.delete.graphql'
import redisRedisClusterMeta from '@/components/redis/RedisClusterMeta.vue';
import redisRedisClusterView from '@/components/redis/RedisClusterView.vue';
import redisRedisClusterStatus from '@/components/redis/RedisClusterStatus.vue';
import { useQuery, useMutation, useRedisCluster, RedisClusterReadExcludes } from '../../../libs/redis/RedisCluster.js'
const { onErrorHandler, notifySuccess, notifyError, onNotRedisClusterFound, navigation, setNamespacedItemFromRoute } = useRedisCluster();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(redisRedisClusterQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": RedisClusterReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotRedisClusterFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(RedisClusterDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
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
      <redisRedisClusterView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].redisRedisCluster[0]!=undefined && result.k8sNamespace[0].redisRedisCluster[0]!=null"
        :model="result.k8sNamespace[0].redisRedisCluster[0]"
        />
    </div>
  </div>
</template>
