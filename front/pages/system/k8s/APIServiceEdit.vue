<script setup lang="ts">
import k8sAPIServiceQuery from '@/queries/k8s/APIService.read.graphql'
import APIServiceEdit from '@/queries/k8s/APIService.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import k8sAPIServiceMeta from '@/components/k8s/APIServiceMeta.vue';
import k8sAPIServiceEdit from '@/components/k8s/APIServiceEdit.vue';
import k8sAPIServiceStatus from '@/components/k8s/APIServiceStatus.vue';
import { useQuery, useMutation, sanitizeData, useAPIService, APIServiceSimpleExcludes } from '../../../libs/k8s/APIService.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotAPIServiceFound, navigation, editor, setItemFromRoute } = useAPIService();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sAPIServiceQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": APIServiceSimpleExcludes
  },
});
const { mutate: patchAPIService, onDone: onPatchAPIService, onError: onPatchError } = useMutation(APIServiceEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchAPIService({
    "name": result.k8sAPIService[0].metadata.name,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotAPIServiceFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sAPIService[0])});onPatchAPIService(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sAPIServiceMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sAPIService[0]!=undefined && result.k8sAPIService[0]!=null"
        :model="result.k8sAPIService[0]"
       />
    </div>
    <div class="col-md-6">
      <k8sAPIServiceStatus
        v-if="!loading && result!=undefined && result.k8sAPIService[0]!=undefined && result.k8sAPIService[0]!=null"
        :model="result.k8sAPIService[0]"
       />
    </div>
    <div class="col-md-12">
      <k8sAPIServiceEdit
        v-if="!loading && result!=undefined && result.k8sAPIService[0]!=undefined && result.k8sAPIService[0]!=null"
        :model="result.k8sAPIService[0]"
       />
    </div>
  </div>
</template>

