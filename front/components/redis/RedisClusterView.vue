<script setup lang="ts">
import redisRedisClusterQuery from '@/queries/redis/RedisClusterView.graphql'
import redisClusterDelete from '@/queries/redis/RedisClusterDelete.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useRedisCluster, getProperties } from './RedisCluster.js'
const { onErrorHandler, notifySuccess, notifyError, onNotRedisClusterFound, navigation, setNamespacedItemFromRoute, toEdit, actionDelete } = useRedisCluster();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(redisRedisClusterQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem }, { pollInterval: 500 });onError(onErrorHandler); onResult(onNotRedisClusterFound);
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(redisClusterDelete);
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
      <q-card bordered v-if="!loading && result!=undefined && result.redisRedisCluster!=undefined && result.redisRedisCluster!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">RedisCluster
            <q-btn-group push class="float-right text-capitalize shadow-3">
              <q-btn icon="edit" @click="toEdit(result.redisRedisCluster.metadata.namespace, result.redisRedisCluster.metadata.name)">
                <q-tooltip>Edit</q-tooltip>
              </q-btn>
              <q-btn icon="delete" @click="actionDelete(deletor, result.redisRedisCluster)">
                <q-tooltip>Delete</q-tooltip>
              </q-btn>
            </q-btn-group>
          </div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.redisRedisCluster.metadata" />
        </q-card-section>
      </q-card>
      <q-card bordered v-if="!loading && result!=undefined && result.redisRedisCluster!=undefined && result.redisRedisCluster!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.redisRedisCluster!=null && result.redisRedisCluster.status != null">
          <DefaultStatusView :status="result.redisRedisCluster.status" />
        </q-card-section>
      </q-card>
    </div><div class="col-md-6">
      <q-card bordered v-if="!loading && result!=undefined && result.redisRedisCluster!=undefined && result.redisRedisCluster!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
        </q-card-section>
        <q-card-section>
          <OpenApiEdit
            :in="result.redisRedisCluster"
            :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            :read-only="true"
            :show-default="false"
          />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
