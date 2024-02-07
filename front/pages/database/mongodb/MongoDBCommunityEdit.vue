<script setup lang="ts">
import mongodbMongoDBCommunityQuery from '@/queries/mongodb/MongoDBCommunity.read.graphql'
import MongoDBCommunityEdit from '@/queries/mongodb/MongoDBCommunity.patch.graphql'
import mongodbMongoDBCommunityMeta from '@/components/mongodb/MongoDBCommunityMeta.vue';
import mongodbMongoDBCommunityEdit from '@/components/mongodb/MongoDBCommunityEdit.vue';
import mongodbMongoDBCommunityStatus from '@/components/mongodb/MongoDBCommunityStatus.vue';
import { useQuery, useMutation, useMongoDBCommunity, MongoDBCommunitySimpleExcludes } from '../../../libs/mongodb/MongoDBCommunity.js'
const { onErrorHandler, notifySuccess, notifyError, onNotMongoDBCommunityFound, navigation, setNamespacedItemFromRoute } = useMongoDBCommunity();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(mongodbMongoDBCommunityQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": MongoDBCommunitySimpleExcludes
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
});onError(onErrorHandler); onResult(res => {onNotMongoDBCommunityFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(MongoDBCommunityDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import mongodbMongoDBCommunityQuery from '@/queries/mongodb/MongoDBCommunity.read.graphql'
import MongoDBCommunityEdit from '@/queries/mongodb/MongoDBCommunity.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useMongoDBCommunity, sanitizeData, getProperties } from '../../../libs/mongodb/MongoDBCommunity.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotMongoDBCommunityFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useMongoDBCommunity();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(mongodbMongoDBCommunityQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchMongoDBCommunity, onDone: onPatchMongoDBCommunity, onError: onPatchError } = useMutation(MongoDBCommunityEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchMongoDBCommunity({ "namespace": result.value.mongodbMongoDBCommunity.metadata.namespace, "name": result.value.mongodbMongoDBCommunity.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotMongoDBCommunityFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.mongodbMongoDBCommunity.metadata.obj.spec})});onPatchMongoDBCommunity(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <mongodbMongoDBCommunityMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mongodbMongoDBCommunity[0]!=undefined && result.k8sNamespace[0].mongodbMongoDBCommunity[0]!=null"
        :model="result.k8sNamespace[0].mongodbMongoDBCommunity[0]"
       />
      <mongodbMongoDBCommunityStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mongodbMongoDBCommunity[0]!=undefined && result.k8sNamespace[0].mongodbMongoDBCommunity[0]!=null"
        :model="result.k8sNamespace[0].mongodbMongoDBCommunity[0]"
       />
      <k8sSecretList
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mongodbMongoDBCommunity[0]!=undefined && result.k8sNamespace[0].mongodbMongoDBCommunity[0]!=null && result.k8sNamespace[0].mongodbMongoDBCommunity[0].childSecret!=null && result.k8sNamespace[0].mongodbMongoDBCommunity[0].childSecret.length>0"
        :model="result.k8sNamespace[0].mongodbMongoDBCommunity[0].childSecret"
       />
      <k8sServiceList
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mongodbMongoDBCommunity[0]!=undefined && result.k8sNamespace[0].mongodbMongoDBCommunity[0]!=null && result.k8sNamespace[0].mongodbMongoDBCommunity[0].childService!=null && result.k8sNamespace[0].mongodbMongoDBCommunity[0].childService.length>0"
        :model="result.k8sNamespace[0].mongodbMongoDBCommunity[0].childService"
       />
      <k8sStatefulSetList
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mongodbMongoDBCommunity[0]!=undefined && result.k8sNamespace[0].mongodbMongoDBCommunity[0]!=null && result.k8sNamespace[0].mongodbMongoDBCommunity[0].childStatefulSet!=null && result.k8sNamespace[0].mongodbMongoDBCommunity[0].childStatefulSet.length>0"
        :model="result.k8sNamespace[0].mongodbMongoDBCommunity[0].childStatefulSet"
       />
    </div><div class="col-md-6">
      <mongodbMongoDBCommunityView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mongodbMongoDBCommunity[0]!=undefined && result.k8sNamespace[0].mongodbMongoDBCommunity[0]!=null"
        :model="result.k8sNamespace[0].mongodbMongoDBCommunity[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].mongodbMongoDBCommunity!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">MongoDBCommunity</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNamespace[0].mongodbMongoDBCommunity.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].mongodbMongoDBCommunity!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNamespace[0].mongodbMongoDBCommunity!=null && result.k8sNamespace[0].mongodbMongoDBCommunity.status != null">
          <DefaultStatusView :status="result.k8sNamespace[0].mongodbMongoDBCommunity.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNamespace[0].mongodbMongoDBCommunity!=null" class="q-ma-sm">
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