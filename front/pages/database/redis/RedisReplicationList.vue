<script setup lang="ts">
import redisRedisReplicationQuery from '@/queries/redis/RedisReplication.read.graphql'
import RedisReplicationDelete from '@/queries/redis/RedisReplication.delete.graphql'
import redisRedisReplicationList from '@/components/redis/RedisReplicationList.vue';
import { useQuery, useMutation, useRedisReplication, RedisReplicationListExcludes } from '../../../libs/redis/RedisReplication.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useRedisReplication();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(redisRedisReplicationQuery, {
  "obj": {
    "filters": [],
    "excludes": RedisReplicationListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(RedisReplicationDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <redisRedisReplicationList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.redisRedisReplication).flat()"
  />
</template>