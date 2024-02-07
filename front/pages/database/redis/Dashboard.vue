<script setup lang="ts">
import databaseQuery from '@/queries/redis/database.read.graphql'
import pieChart from '@/components/charts/pieChart.vue';
import redisRedisList from '@/components/redis/RedisList.vue';
import { RedisListExcludes } from '../../../libs/redis/Redis.js'
import redisRedisClusterList from '@/components/redis/RedisClusterList.vue';
import { RedisClusterListExcludes } from '../../../libs/redis/RedisCluster.js'
import redisRedisReplicationList from '@/components/redis/RedisReplicationList.vue';
import { RedisReplicationListExcludes } from '../../../libs/redis/RedisReplication.js'
import redisRedisSentinelList from '@/components/redis/RedisSentinelList.vue';
import { RedisSentinelListExcludes } from '../../../libs/redis/RedisSentinel.js'
import { ref, useCore, useNavigationStoreRef, useQuery } from '../../../libs/core';
const { onErrorHandler, setNamespaceFromRoute, isNamespaced } = useCore();
const ready = ref(false);
const RedisByTs = ref([]);
const RedisClusterByTs = ref([]);
const RedisReplicationByTs = ref([]);
const RedisSentinelByTs = ref([]);
if (isNamespaced()) setNamespaceFromRoute();
const navigation = useNavigationStoreRef();
const { result, refetch, onResult, onError } = useQuery(databaseQuery, {
  "Redis": {
    "filters": [],
    "excludes": RedisListExcludes
  },
  "RedisCluster": {
    "filters": [],
    "excludes": RedisClusterListExcludes
  },
  "RedisReplication": {
    "filters": [],
    "excludes": RedisReplicationListExcludes
  },
  "RedisSentinel": {
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
onError(onErrorHandler);
onResult((res) => {
  if ( !res.loading ) {
    ready.value = false;
    RedisByTs.value.length = 0;
    RedisByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.redisRedis.length}}).filter(n => n.value>0))
    RedisClusterByTs.value.length = 0;
    RedisClusterByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.redisRedisCluster.length}}).filter(n => n.value>0))
    RedisReplicationByTs.value.length = 0;
    RedisReplicationByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.redisRedisReplication.length}}).filter(n => n.value>0))
    RedisSentinelByTs.value.length = 0;
    RedisSentinelByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.redisRedisSentinel.length}}).filter(n => n.value>0))
    ready.value = true;
  }
})
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-lg-4" v-if="ready && RedisByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Redis per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="RedisByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && RedisClusterByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">RedisCluster per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="RedisClusterByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && RedisReplicationByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">RedisReplication per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="RedisReplicationByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && RedisSentinelByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">RedisSentinel per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="RedisSentinelByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <redisRedisList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['redisRedis']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.redisRedis).flat()"
  />
  <redisRedisClusterList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['redisRedisCluster']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.redisRedisCluster).flat()"
  />
  <redisRedisReplicationList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['redisRedisReplication']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.redisRedisReplication).flat()"
  />
  <redisRedisSentinelList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['redisRedisSentinel']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.redisRedisSentinel).flat()"
  />
</template>