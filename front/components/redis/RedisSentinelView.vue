<script setup lang="ts">
import redisRedisSentinelQuery from '@/queries/redis/RedisSentinelView.graphql'
import redisSentinelDelete from '@/queries/redis/RedisSentinelDelete.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useRedisSentinel, getProperties } from './RedisSentinel.js'
const { onErrorHandler, notifySuccess, notifyError, onNotRedisSentinelFound, navigation, setNamespacedItemFromRoute, toEdit, actionDelete } = useRedisSentinel();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(redisRedisSentinelQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem }, { pollInterval: 500 });onError(onErrorHandler); onResult(onNotRedisSentinelFound);
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(redisSentinelDelete);
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
      <q-card bordered v-if="!loading && result!=undefined && result.redisRedisSentinel!=undefined && result.redisRedisSentinel!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">RedisSentinel
            <q-btn-group push class="float-right text-capitalize shadow-3">
              <q-btn icon="edit" @click="toEdit(result.redisRedisSentinel.metadata.namespace, result.redisRedisSentinel.metadata.name)">
                <q-tooltip>Edit</q-tooltip>
              </q-btn>
              <q-btn icon="delete" @click="actionDelete(deletor, result.redisRedisSentinel)">
                <q-tooltip>Delete</q-tooltip>
              </q-btn>
            </q-btn-group>
          </div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.redisRedisSentinel.metadata" />
        </q-card-section>
      </q-card>
      <q-card bordered v-if="!loading && result!=undefined && result.redisRedisSentinel!=undefined && result.redisRedisSentinel!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.redisRedisSentinel!=null && result.redisRedisSentinel.status != null">
          <DefaultStatusView :status="result.redisRedisSentinel.status" />
        </q-card-section>
      </q-card>
    </div><div class="col-md-6">
      <q-card bordered v-if="!loading && result!=undefined && result.redisRedisSentinel!=undefined && result.redisRedisSentinel!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
        </q-card-section>
        <q-card-section>
          <OpenApiEdit
            :in="result.redisRedisSentinel"
            :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            :read-only="true"
            :show-default="false"
          />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
