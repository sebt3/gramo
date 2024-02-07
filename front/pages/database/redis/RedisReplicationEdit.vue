<script setup lang="ts">
import redisRedisReplicationQuery from '@/queries/redis/RedisReplication.read.graphql'
import RedisReplicationEdit from '@/queries/redis/RedisReplication.patch.graphql'
import redisRedisReplicationMeta from '@/components/redis/RedisReplicationMeta.vue';
import redisRedisReplicationEdit from '@/components/redis/RedisReplicationEdit.vue';
import redisRedisReplicationStatus from '@/components/redis/RedisReplicationStatus.vue';
import { useQuery, useMutation, useRedisReplication, RedisReplicationSimpleExcludes } from '../../../libs/redis/RedisReplication.js'
const { onErrorHandler, notifySuccess, notifyError, onNotRedisReplicationFound, navigation, setNamespacedItemFromRoute } = useRedisReplication();setNamespacedItemFromRoute();
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
});onError(onErrorHandler); onResult(res => {onNotRedisReplicationFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(RedisReplicationDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import redisRedisReplicationQuery from '@/queries/redis/RedisReplication.read.graphql'
import RedisReplicationEdit from '@/queries/redis/RedisReplication.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useRedisReplication, sanitizeData, getProperties } from '../../../libs/redis/RedisReplication.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotRedisReplicationFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useRedisReplication();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(redisRedisReplicationQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchRedisReplication, onDone: onPatchRedisReplication, onError: onPatchError } = useMutation(RedisReplicationEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchRedisReplication({ "namespace": result.value.redisRedisReplication.metadata.namespace, "name": result.value.redisRedisReplication.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotRedisReplicationFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.redisRedisReplication.metadata.obj.spec})});onPatchRedisReplication(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <redisRedisReplicationMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].redisRedisReplication[0]!=undefined && result.k8sNamespace[0].redisRedisReplication[0]!=null"
        :model="result.k8sNamespace[0].redisRedisReplication[0]"
       />
      <redisRedisReplicationStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].redisRedisReplication[0]!=undefined && result.k8sNamespace[0].redisRedisReplication[0]!=null"
        :model="result.k8sNamespace[0].redisRedisReplication[0]"
       />
    </div><div class="col-md-6">
      <redisRedisReplicationView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].redisRedisReplication[0]!=undefined && result.k8sNamespace[0].redisRedisReplication[0]!=null"
        :model="result.k8sNamespace[0].redisRedisReplication[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].redisRedisReplication!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">RedisReplication</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNamespace[0].redisRedisReplication.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].redisRedisReplication!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNamespace[0].redisRedisReplication!=null && result.k8sNamespace[0].redisRedisReplication.status != null">
          <DefaultStatusView :status="result.k8sNamespace[0].redisRedisReplication.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNamespace[0].redisRedisReplication!=null" class="q-ma-sm">
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