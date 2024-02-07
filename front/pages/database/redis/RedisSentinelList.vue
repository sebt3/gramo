<script setup lang="ts">
import redisRedisSentinelQuery from '@/queries/redis/RedisSentinel.read.graphql'
import RedisSentinelDelete from '@/queries/redis/RedisSentinel.delete.graphql'
import redisRedisSentinelList from '@/components/redis/RedisSentinelList.vue';
import { useQuery, useMutation, useRedisSentinel, RedisSentinelListExcludes } from '../../../libs/redis/RedisSentinel.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useRedisSentinel();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(redisRedisSentinelQuery, {
  "obj": {
    "filters": [],
    "excludes": RedisSentinelListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(RedisSentinelDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <redisRedisSentinelList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.redisRedisSentinel).flat()"
  />
</template>