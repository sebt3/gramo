<script setup lang="ts">
import redisRedisClusterQuery from '@/queries/redis/RedisCluster.read.graphql'
import RedisClusterDelete from '@/queries/redis/RedisCluster.delete.graphql'
import redisRedisClusterList from '@/components/redis/RedisClusterList.vue';
import { useQuery, useMutation, useRedisCluster, RedisClusterListExcludes } from '../../../libs/redis/RedisCluster.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useRedisCluster();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(redisRedisClusterQuery, {
  "obj": {
    "filters": [],
    "excludes": RedisClusterListExcludes
  },
  "namespace": {
    "filters": isNamespaced()?[
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentNamespace
      }
    ]:[]
  }
}, { pollInterval: 2000 });
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(RedisClusterDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <redisRedisClusterList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.redisRedisCluster).flat()"
  />
</template>