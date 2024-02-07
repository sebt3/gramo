<script setup lang="ts">
import mongodbMongoDBCommunityQuery from '@/queries/mongodb/MongoDBCommunity.read.graphql'
import MongoDBCommunityEdit from '@/queries/mongodb/MongoDBCommunity.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import mongodbMongoDBCommunityMeta from '@/components/mongodb/MongoDBCommunityMeta.vue';
import mongodbMongoDBCommunityEdit from '@/components/mongodb/MongoDBCommunityEdit.vue';
import mongodbMongoDBCommunityStatus from '@/components/mongodb/MongoDBCommunityStatus.vue';
import { useQuery, useMutation, sanitizeData, useMongoDBCommunity, MongoDBCommunitySimpleExcludes } from '../../../libs/mongodb/MongoDBCommunity.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotMongoDBCommunityFound, navigation, editor, setNamespacedItemFromRoute } = useMongoDBCommunity();setNamespacedItemFromRoute();
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
});
const { mutate: patchMongoDBCommunity, onDone: onPatchMongoDBCommunity, onError: onPatchError } = useMutation(MongoDBCommunityEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchMongoDBCommunity({
    "name": result.k8sNamespace[0].mongodbMongoDBCommunity[0].metadata.name,
    "namespace": result.k8sNamespace[0].mongodbMongoDBCommunity[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotMongoDBCommunityFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].mongodbMongoDBCommunity[0])});onPatchMongoDBCommunity(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <mongodbMongoDBCommunityMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mongodbMongoDBCommunity[0]!=undefined && result.k8sNamespace[0].mongodbMongoDBCommunity[0]!=null"
        :model="result.k8sNamespace[0].mongodbMongoDBCommunity[0]"
       />
    </div>
    <div class="col-md-6">
      <mongodbMongoDBCommunityStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mongodbMongoDBCommunity[0]!=undefined && result.k8sNamespace[0].mongodbMongoDBCommunity[0]!=null"
        :model="result.k8sNamespace[0].mongodbMongoDBCommunity[0]"
       />
    </div>
    <div class="col-md-12">
      <mongodbMongoDBCommunityEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mongodbMongoDBCommunity[0]!=undefined && result.k8sNamespace[0].mongodbMongoDBCommunity[0]!=null"
        :model="result.k8sNamespace[0].mongodbMongoDBCommunity[0]"
       />
    </div>
  </div>
</template>

