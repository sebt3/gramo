<script setup lang="ts">
import redisRedisReplicationQuery from '@/queries/redis/RedisReplicationView.graphql'
import redisReplicationDelete from '@/queries/redis/RedisReplicationDelete.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useRedisReplication, getProperties } from './RedisReplication.js'
const { onErrorHandler, notifySuccess, notifyError, onNotRedisReplicationFound, navigation, setNamespacedItemFromRoute, toEdit, actionDelete } = useRedisReplication();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(redisRedisReplicationQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem }, { pollInterval: 500 });onError(onErrorHandler); onResult(onNotRedisReplicationFound);
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(redisReplicationDelete);
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
      <q-card bordered v-if="!loading && result!=undefined && result.redisRedisReplication!=undefined && result.redisRedisReplication!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">RedisReplication
            <q-btn-group push class="float-right text-capitalize shadow-3">
              <q-btn icon="edit" @click="toEdit(result.redisRedisReplication.metadata.namespace, result.redisRedisReplication.metadata.name)">
                <q-tooltip>Edit</q-tooltip>
              </q-btn>
              <q-btn icon="delete" @click="actionDelete(deletor, result.redisRedisReplication)">
                <q-tooltip>Delete</q-tooltip>
              </q-btn>
            </q-btn-group>
          </div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.redisRedisReplication.metadata" />
        </q-card-section>
      </q-card>
      <q-card bordered v-if="!loading && result!=undefined && result.redisRedisReplication!=undefined && result.redisRedisReplication!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.redisRedisReplication!=null && result.redisRedisReplication.status != null">
          <DefaultStatusView :status="result.redisRedisReplication.status" />
        </q-card-section>
      </q-card>
    </div><div class="col-md-6">
      <q-card bordered v-if="!loading && result!=undefined && result.redisRedisReplication!=undefined && result.redisRedisReplication!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
        </q-card-section>
        <q-card-section>
          <OpenApiEdit
            :in="result.redisRedisReplication"
            :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            :read-only="true"
            :show-default="false"
          />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
