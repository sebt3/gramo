<script setup lang="ts">
import redisRedisClusterQuery from '@/queries/redis/RedisClusterView.graphql'
import redisClusterEdit from '@/queries/redis/RedisClusterEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import MonacoEditor from '../core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useRedisCluster, sanitizeData, getProperties } from './RedisCluster.js'
const data = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotRedisClusterFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useRedisCluster();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(redisRedisClusterQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchRedisCluster, onDone: onPatchRedisCluster, onError: onPatchError } = useMutation(redisClusterEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchRedisCluster({"namespace": result.value.redisRedisCluster.metadata.namespace, "name": result.value.redisRedisCluster.metadata.name, "spec": sanitizeData(data.value)});
}
onError(onErrorHandler);onResult(res => {onNotRedisClusterFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.redisRedisCluster.metadata.obj.spec})});onPatchRedisCluster(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.redisRedisCluster!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">RedisCluster</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.redisRedisCluster.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.redisRedisCluster!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.redisRedisCluster!=null && result.redisRedisCluster.status != null">
          <DefaultStatusView :status="result.redisRedisCluster.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.redisRedisCluster!=null" class="q-ma-sm">
      <q-tabs v-model="editor.tab" class="bg-primary text-white">
        <q-tab label="Editor" name="simple" />
        <q-tab label="Yaml" name="spec" />
      </q-tabs>
      <q-tab-panels v-model="editor.tab" animated>
        <q-tab-panel name="simple">
          <OpenApiEdit
          :in="Object.keys(editor.spec).includes('spec')?editor.spec['spec']:{}"
          @update:out="v=>{data=v;editor.setSpec({spec: v})}"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            />
        </q-tab-panel>
        <q-tab-panel name="spec">
          <MonacoEditor
          :text="editor.yaml" :key="editor.yaml"
          @update:text="v=>editor.setYaml(v)"
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
