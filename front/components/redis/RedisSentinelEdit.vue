<script setup lang="ts">
import redisRedisSentinelQuery from '@/queries/redis/RedisSentinelView.graphql'
import redisSentinelEdit from '@/queries/redis/RedisSentinelEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import MonacoEditor from '../core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useRedisSentinel, sanitizeData, getProperties } from './RedisSentinel.js'
const data = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotRedisSentinelFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useRedisSentinel();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(redisRedisSentinelQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchRedisSentinel, onDone: onPatchRedisSentinel, onError: onPatchError } = useMutation(redisSentinelEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchRedisSentinel({"namespace": result.value.redisRedisSentinel.metadata.namespace, "name": result.value.redisRedisSentinel.metadata.name, "spec": sanitizeData(data.value)});
}
onError(onErrorHandler);onResult(res => {onNotRedisSentinelFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.redisRedisSentinel.metadata.obj.spec})});onPatchRedisSentinel(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.redisRedisSentinel!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">RedisSentinel</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.redisRedisSentinel.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.redisRedisSentinel!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.redisRedisSentinel!=null && result.redisRedisSentinel.status != null">
          <DefaultStatusView :status="result.redisRedisSentinel.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.redisRedisSentinel!=null" class="q-ma-sm">
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
