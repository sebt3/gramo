<script setup lang="ts">
import redisRedisQuery from '@/queries/redis/Redis.read.graphql'
import RedisDelete from '@/queries/redis/Redis.delete.graphql'
import redisRedisList from '@/components/redis/RedisList.vue';
import { useQuery, useMutation, useRedis, RedisListExcludes } from '../../../libs/redis/Redis.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useRedis();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(redisRedisQuery, {
  "obj": {
    "filters": [],
    "excludes": RedisListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(RedisDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <redisRedisList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.redisRedis).flat()"
  />
</template>