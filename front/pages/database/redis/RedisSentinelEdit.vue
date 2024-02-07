<script setup lang="ts">
import redisRedisSentinelQuery from '@/queries/redis/RedisSentinel.read.graphql'
import RedisSentinelEdit from '@/queries/redis/RedisSentinel.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import redisRedisSentinelMeta from '@/components/redis/RedisSentinelMeta.vue';
import redisRedisSentinelEdit from '@/components/redis/RedisSentinelEdit.vue';
import redisRedisSentinelStatus from '@/components/redis/RedisSentinelStatus.vue';
import { useQuery, useMutation, sanitizeData, useRedisSentinel, RedisSentinelSimpleExcludes } from '../../../libs/redis/RedisSentinel.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotRedisSentinelFound, navigation, editor, setNamespacedItemFromRoute } = useRedisSentinel();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(redisRedisSentinelQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": RedisSentinelSimpleExcludes
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
const { mutate: patchRedisSentinel, onDone: onPatchRedisSentinel, onError: onPatchError } = useMutation(RedisSentinelEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchRedisSentinel({
    "name": result.k8sNamespace[0].redisRedisSentinel[0].metadata.name,
    "namespace": result.k8sNamespace[0].redisRedisSentinel[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotRedisSentinelFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].redisRedisSentinel[0])});onPatchRedisSentinel(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <redisRedisSentinelMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].redisRedisSentinel[0]!=undefined && result.k8sNamespace[0].redisRedisSentinel[0]!=null"
        :model="result.k8sNamespace[0].redisRedisSentinel[0]"
       />
    </div>
    <div class="col-md-6">
      <redisRedisSentinelStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].redisRedisSentinel[0]!=undefined && result.k8sNamespace[0].redisRedisSentinel[0]!=null"
        :model="result.k8sNamespace[0].redisRedisSentinel[0]"
       />
    </div>
    <div class="col-md-12">
      <redisRedisSentinelEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].redisRedisSentinel[0]!=undefined && result.k8sNamespace[0].redisRedisSentinel[0]!=null"
        :model="result.k8sNamespace[0].redisRedisSentinel[0]"
       />
    </div>
  </div>
</template>

