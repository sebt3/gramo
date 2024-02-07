<script setup lang="ts">
import redisRedisReplicationQuery from '@/queries/redis/RedisReplication.read.graphql'
import RedisReplicationEdit from '@/queries/redis/RedisReplication.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import redisRedisReplicationMeta from '@/components/redis/RedisReplicationMeta.vue';
import redisRedisReplicationEdit from '@/components/redis/RedisReplicationEdit.vue';
import redisRedisReplicationStatus from '@/components/redis/RedisReplicationStatus.vue';
import { useQuery, useMutation, sanitizeData, useRedisReplication, RedisReplicationSimpleExcludes } from '../../../libs/redis/RedisReplication.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotRedisReplicationFound, navigation, editor, setNamespacedItemFromRoute } = useRedisReplication();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(redisRedisReplicationQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": RedisReplicationSimpleExcludes
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
});
const { mutate: patchRedisReplication, onDone: onPatchRedisReplication, onError: onPatchError } = useMutation(RedisReplicationEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchRedisReplication({
    "name": result.k8sNamespace[0].redisRedisReplication[0].metadata.name,
    "namespace": result.k8sNamespace[0].redisRedisReplication[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotRedisReplicationFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].redisRedisReplication[0])});onPatchRedisReplication(patchDone);onPatchError(patchError);
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
      <redisRedisReplicationEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].redisRedisReplication[0]!=undefined && result.k8sNamespace[0].redisRedisReplication[0]!=null"
        :model="result.k8sNamespace[0].redisRedisReplication[0]"
       />
    </div>
  </div>
</template>

