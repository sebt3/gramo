<script setup lang="ts">
import redisRedisQuery from '@/queries/redis/Redis.details.graphql'
import RedisDelete from '@/queries/redis/Redis.delete.graphql'
import redisRedisMeta from '@/components/redis/RedisMeta.vue';
import redisRedisView from '@/components/redis/RedisView.vue';
import redisRedisStatus from '@/components/redis/RedisStatus.vue';
import { ServiceListExcludes } from '../../../libs/k8s/custom.js'
import k8sServiceList from '@/components/k8s/ServiceList.vue';
import { StatefulSetListExcludes } from '../../../libs/k8s/custom.js'
import k8sStatefulSetList from '@/components/k8s/StatefulSetList.vue';
import { useQuery, useMutation, useRedis, RedisReadExcludes } from '../../../libs/redis/Redis.js'
const { onErrorHandler, notifySuccess, notifyError, onNotRedisFound, navigation, setNamespacedItemFromRoute } = useRedis();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(redisRedisQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": RedisReadExcludes
  },
  "childService": {"filters": [], "excludes": ServiceListExcludes},
  "childStatefulSet": {"filters": [], "excludes": StatefulSetListExcludes},
  "namespace": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentNamespace
      }
    ]
  }
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotRedisFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(RedisDelete);
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
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].redisRedis[0]!=undefined && result.k8sNamespace[0].redisRedis[0]!=null && result.k8sNamespace[0].redisRedis[0].childService!=null && result.k8sNamespace[0].redisRedis[0].childService.length>0">
      <k8sServiceList
        :model="result.k8sNamespace[0].redisRedis[0].childService"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].redisRedis[0]!=undefined && result.k8sNamespace[0].redisRedis[0]!=null && result.k8sNamespace[0].redisRedis[0].childStatefulSet!=null && result.k8sNamespace[0].redisRedis[0].childStatefulSet.length>0">
      <k8sStatefulSetList
        :model="result.k8sNamespace[0].redisRedis[0].childStatefulSet"
       />
    </div>
    <div class="col-md-12">
      <redisRedisView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].redisRedis[0]!=undefined && result.k8sNamespace[0].redisRedis[0]!=null"
        :model="result.k8sNamespace[0].redisRedis[0]"
        />
    </div>
  </div>
</template>
