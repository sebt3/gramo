<script setup lang="ts">
import redisRedisSentinelQuery from '@/queries/redis/RedisSentinel.details.graphql'
import RedisSentinelDelete from '@/queries/redis/RedisSentinel.delete.graphql'
import redisRedisSentinelMeta from '@/components/redis/RedisSentinelMeta.vue';
import redisRedisSentinelView from '@/components/redis/RedisSentinelView.vue';
import redisRedisSentinelStatus from '@/components/redis/RedisSentinelStatus.vue';
import { useQuery, useMutation, useRedisSentinel, RedisSentinelReadExcludes } from '../../../libs/redis/RedisSentinel.js'
const { onErrorHandler, notifySuccess, notifyError, onNotRedisSentinelFound, navigation, setNamespacedItemFromRoute } = useRedisSentinel();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(redisRedisSentinelQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": RedisSentinelReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotRedisSentinelFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(RedisSentinelDelete);
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
      <redisRedisSentinelMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].redisRedisSentinel[0]!=undefined && result.k8sNamespace[0].redisRedisSentinel[0]!=null"
        :model="result.k8sNamespace[0].redisRedisSentinel[0]"
       />
    </div>
    <div class="col-md-6">
      <redisRedisSentinelStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].redisRedisSentinel[0]!=undefined && result.k8sNamespace[0].redisRedisSentinel[0]!=null"
        :model="result.k8sNamespace[0].redisRedisSentinel[0]"
       />
    </div>
    <div class="col-md-12">
      <redisRedisSentinelView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].redisRedisSentinel[0]!=undefined && result.k8sNamespace[0].redisRedisSentinel[0]!=null"
        :model="result.k8sNamespace[0].redisRedisSentinel[0]"
        />
    </div>
  </div>
</template>
