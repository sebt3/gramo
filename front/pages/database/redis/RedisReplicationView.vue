<script setup lang="ts">
import redisRedisReplicationQuery from '@/queries/redis/RedisReplication.details.graphql'
import RedisReplicationDelete from '@/queries/redis/RedisReplication.delete.graphql'
import redisRedisReplicationMeta from '@/components/redis/RedisReplicationMeta.vue';
import redisRedisReplicationView from '@/components/redis/RedisReplicationView.vue';
import redisRedisReplicationStatus from '@/components/redis/RedisReplicationStatus.vue';
import { useQuery, useMutation, useRedisReplication, RedisReplicationReadExcludes } from '../../../libs/redis/RedisReplication.js'
const { onErrorHandler, notifySuccess, notifyError, onNotRedisReplicationFound, navigation, setNamespacedItemFromRoute } = useRedisReplication();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(redisRedisReplicationQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": RedisReplicationReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotRedisReplicationFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(RedisReplicationDelete);
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
      <redisRedisReplicationMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].redisRedisReplication[0]!=undefined && result.k8sNamespace[0].redisRedisReplication[0]!=null"
        :model="result.k8sNamespace[0].redisRedisReplication[0]"
       />
    </div>
    <div class="col-md-6">
      <redisRedisReplicationStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].redisRedisReplication[0]!=undefined && result.k8sNamespace[0].redisRedisReplication[0]!=null"
        :model="result.k8sNamespace[0].redisRedisReplication[0]"
       />
    </div>
    <div class="col-md-12">
      <redisRedisReplicationView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].redisRedisReplication[0]!=undefined && result.k8sNamespace[0].redisRedisReplication[0]!=null"
        :model="result.k8sNamespace[0].redisRedisReplication[0]"
        />
    </div>
  </div>
</template>
