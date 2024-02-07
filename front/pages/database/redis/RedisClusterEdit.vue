<script setup lang="ts">
import redisRedisClusterQuery from '@/queries/redis/RedisCluster.read.graphql'
import RedisClusterEdit from '@/queries/redis/RedisCluster.patch.graphql'
import redisRedisClusterMeta from '@/components/redis/RedisClusterMeta.vue';
import redisRedisClusterEdit from '@/components/redis/RedisClusterEdit.vue';
import redisRedisClusterStatus from '@/components/redis/RedisClusterStatus.vue';
import { useQuery, useMutation, useRedisCluster, RedisClusterSimpleExcludes } from '../../../libs/redis/RedisCluster.js'
const { onErrorHandler, notifySuccess, notifyError, onNotRedisClusterFound, navigation, setNamespacedItemFromRoute } = useRedisCluster();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(redisRedisClusterQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": RedisClusterSimpleExcludes
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
});onError(onErrorHandler); onResult(res => {onNotRedisClusterFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(RedisClusterDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import redisRedisClusterQuery from '@/queries/redis/RedisCluster.read.graphql'
import RedisClusterEdit from '@/queries/redis/RedisCluster.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useRedisCluster, sanitizeData, getProperties } from '../../../libs/redis/RedisCluster.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotRedisClusterFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useRedisCluster();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(redisRedisClusterQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchRedisCluster, onDone: onPatchRedisCluster, onError: onPatchError } = useMutation(RedisClusterEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchRedisCluster({ "namespace": result.value.redisRedisCluster.metadata.namespace, "name": result.value.redisRedisCluster.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotRedisClusterFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.redisRedisCluster.metadata.obj.spec})});onPatchRedisCluster(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <redisRedisClusterMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].redisRedisCluster[0]!=undefined && result.k8sNamespace[0].redisRedisCluster[0]!=null"
        :model="result.k8sNamespace[0].redisRedisCluster[0]"
       />
      <redisRedisClusterStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].redisRedisCluster[0]!=undefined && result.k8sNamespace[0].redisRedisCluster[0]!=null"
        :model="result.k8sNamespace[0].redisRedisCluster[0]"
       />
    </div><div class="col-md-6">
      <redisRedisClusterView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].redisRedisCluster[0]!=undefined && result.k8sNamespace[0].redisRedisCluster[0]!=null"
        :model="result.k8sNamespace[0].redisRedisCluster[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].redisRedisCluster!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">RedisCluster</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNamespace[0].redisRedisCluster.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].redisRedisCluster!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNamespace[0].redisRedisCluster!=null && result.k8sNamespace[0].redisRedisCluster.status != null">
          <DefaultStatusView :status="result.k8sNamespace[0].redisRedisCluster.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNamespace[0].redisRedisCluster!=null" class="q-ma-sm">
      <q-tabs v-model="editor.tab" class="bg-primary text-white">
        <q-tab label="Editor" name="simple" />
        <q-tab label="Yaml" name="spec" />
      </q-tabs>
      <q-tab-panels v-model="editor.tab" animated>
        <q-tab-panel name="simple">
          <OpenApiEdit
          :in="Object.keys(editor.spec).includes('spec')?editor.spec['spec']:{}"
          @update:out="v=>{ spec=v;editor.setspecSpec({ spec: v})}"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            />
        </q-tab-panel>
        <q-tab-panel name="spec">
          <MonacoEditor
          :text="editor.yamlspec" :key="editor.yamlspec"
          @update:text="v=>editor.setspecYaml(v)"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
          />
        </q-tab-panel>
      </q-tab-panels>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>